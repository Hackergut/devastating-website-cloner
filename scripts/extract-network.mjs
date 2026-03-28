#!/usr/bin/env node
/**
 * Network & API Extraction Script
 * Intercepts all network requests: API calls, XHR, Fetch, WebSocket
 * Extracts endpoints, payloads, responses
 * 
 * Usage: node scripts/extract-network.mjs <url>
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_URL = process.argv[2] || 'https://example.com';
const TIMEOUT = parseInt(process.argv[3]) || 120000;
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'extraction', 'network');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {}
}

async function extractNetwork(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });
  
  const page = await browser.newPage();
  page.setDefaultTimeout(TIMEOUT);
  
  // Collect all network requests
  const requests = {
    api: [],
    xhr: [],
    fetch: [],
    websocket: [],
    images: [],
    scripts: [],
    styles: [],
    fonts: [],
    other: []
  };
  
  const responses = [];
  const apiEndpoints = new Set();
  
  // Intercept all requests
  await page.setRequestInterception(true);
  
  page.on('request', (request) => {
    const type = request.resourceType();
    const url = request.url();
    const method = request.method();
    const headers = request.headers();
    const postData = request.postData();
    
    const requestData = {
      url,
      method,
      type,
      headers: { ...headers },
      timestamp: new Date().toISOString()
    };
    
    if (postData) {
      requestData.postData = postData.slice(0, 10000); // Limit size
    }
    
    // Categorize request
    if (type === 'xhr' || type === 'other') {
      // Likely API call
      if (url.includes('/api/') || url.includes('/graphql') || url.includes('.json') || 
          url.includes('fetch') || method === 'POST' || method === 'PUT' || method === 'DELETE') {
        requests.api.push(requestData);
        apiEndpoints.add(url.split('?')[0]);
      } else {
        requests.xhr.push(requestData);
      }
    } else if (type === 'document') {
      requests.other.push(requestData);
    } else if (type === 'script') {
      requests.scripts.push(requestData);
    } else if (type === 'stylesheet') {
      requests.styles.push(requestData);
    } else if (type === 'image') {
      requests.images.push({ url, headers });
    } else if (type === 'font') {
      requests.fonts.push(requestData);
    } else if (type === 'websocket') {
      requests.websocket.push(requestData);
    } else {
      requests.other.push(requestData);
    }
    
    request.continue();
  });
  
  // Capture responses
  page.on('response', async (response) => {
    const url = response.url();
    const status = response.status();
    const headers = response.headers();
    
    try {
      // Only capture API responses
      if (url.includes('/api/') || url.includes('/graphql') || 
          url.includes('.json') || headers['content-type']?.includes('json')) {
        let body;
        try {
          body = await response.json();
        } catch (e) {
          try {
            body = await response.text();
            body = body.slice(0, 50000); // Limit size
          } catch (e2) {
            body = '[Unable to parse response]';
          }
        }
        
        responses.push({
          url,
          status,
          headers: { ...headers },
          body,
          timestamp: new Date().toISOString()
        });
      }
    } catch (e) {
      // Skip failed responses
    }
  });
  
  console.log('🌐 Network & API Extraction...');
  console.log(`📡 Navigating to ${url}...`);
  await ensureDir(OUTPUT_DIR);
  
  await page.goto(url, { waitUntil: 'networkidle2', timeout: TIMEOUT });
  
  // Wait for additional network activity
  await new Promise(r => setTimeout(r, 3000));
  
  // Try to trigger more API calls by scrolling
  console.log('📜 Scrolling to trigger lazy-loaded content...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  
  // Wait after scroll
  await new Promise(r => setTimeout(r, 2000));
  
  // Intercept console logs that might contain API info
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({
      type: msg.type(),
      text: msg.text(),
      timestamp: new Date().toISOString()
    });
  });
  
  // Extract GraphQL queries if present
  const graphqlQueries = await page.evaluate(() => {
    const queries = [];
    
    // Check for Apollo Client
    if (window.__APOLLO_CLIENT__) {
      const cache = window.__APOLLO_CLIENT__.cache?.extract?.();
      if (cache) {
        queries.push({
          type: 'Apollo Cache',
          data: cache
        });
      }
    }
    
    // Check for Relay
    if (window.__RELAY_STORE__) {
      queries.push({
        type: 'Relay Store',
        data: 'Present'
      });
    }
    
    return queries;
  });
  
  // Extract REST API patterns
  const apiPatterns = Array.from(apiEndpoints).map(endpoint => {
    const patterns = {
      endpoint,
      isRestAPI: endpoint.includes('/api/') || endpoint.includes('/v1/') || endpoint.includes('/v2/'),
      isGraphQL: endpoint.includes('/graphql') || endpoint.includes('graphql'),
      hasQueryParams: endpoint.includes('?'),
      hasPathParams: /\/\d+/.test(endpoint) || endpoint.includes('/:'),
      domain: new URL(endpoint).hostname,
      path: new URL(endpoint).pathname
    };
    return patterns;
  });
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'requests.json'), JSON.stringify(requests, null, 2));
  await fs.writeFile(path.join(OUTPUT_DIR, 'responses.json'), JSON.stringify(responses, null, 2));
  await fs.writeFile(path.join(OUTPUT_DIR, 'api-endpoints.json'), JSON.stringify(apiPatterns, null, 2));
  await fs.writeFile(path.join(OUTPUT_DIR, 'graphql.json'), JSON.stringify(graphqlQueries, null, 2));
  await fs.writeFile(path.join(OUTPUT_DIR, 'console-logs.json'), JSON.stringify(consoleLogs, null, 2));
  
  await browser.close();
  
  console.log('\n✅ Network Extraction Complete!\n');
  console.log('📊 Statistics:');
  console.log(`  API Calls: ${requests.api.length}`);
  console.log(`  XHR Requests: ${requests.xhr.length}`);
  console.log(`  WebSocket Connections: ${requests.websocket.length}`);
  console.log(`  Unique Endpoints: ${apiEndpoints.size}`);
  console.log(`  API Responses Captured: ${responses.length}`);
  console.log(`  Images Loaded: ${requests.images.length}`);
  console.log(`  Scripts Loaded: ${requests.scripts.length}`);
  
  console.log('\n📁 Output:');
  console.log(`  - ${OUTPUT_DIR}/requests.json`);
  console.log(`  - ${OUTPUT_DIR}/responses.json`);
  console.log(`  - ${OUTPUT_DIR}/api-endpoints.json`);
  console.log(`  - ${OUTPUT_DIR}/graphql.json`);
  console.log(`  - ${OUTPUT_DIR}/console-logs.json`);
}

extractNetwork(TARGET_URL).catch(console.error);