#!/usr/bin/env node
/**
 * HTML Structure Analyzer
 * Analizza l'HTML estratto e identifica le sezioni principali
 * 
 * Input: docs/extraction/source/raw.html
 * Output: docs/extraction/structure.json
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_FILE = path.join(__dirname, '..', 'docs', 'extraction', 'source', 'raw.html');
const OUTPUT_FILE = path.join(__dirname, '..', 'docs', 'extraction', 'structure.json');

async function analyzeHTML() {
  console.log('🔍 Analyzing HTML structure...\n');
  
  const html = await fs.readFile(INPUT_FILE, 'utf-8');
  const $ = cheerio.load(html);
  
  const structure = {
    head: {
      title: $('title').text(),
      meta: [],
      links: [],
      scripts: []
    },
    body: {
      classes: $('body').attr('class')?.split(' ') || [],
      sections: []
    },
    navigation: {
      menu: []
    },
    components: []
  };
  
  // Extract meta tags
  $('meta').each((i, el) => {
    const name = $(el).attr('name') || $(el).attr('property');
    const content = $(el).attr('content');
    if (name && content) {
      structure.head.meta.push({ name, content });
    }
  });
  
  // Extract external stylesheets
  $('link[rel="stylesheet"]').each((i, el) => {
    structure.head.links.push({
      href: $(el).attr('href'),
      id: $(el).attr('id')
    });
  });
  
  // Extract external scripts
  $('script[src]').each((i, el) => {
    structure.head.scripts.push({
      src: $(el).attr('src'),
      id: $(el).attr('id')
    });
  });
  
  // Find banner
  const $banner = $('.header-top-banner').first();
  if ($banner.length) {
    const $container = $banner.find('.header-top-banner--container, .header-top-banner__container').first();
    
    structure.components.push({
      type: 'Banner',
      name: 'header-top-banner',
      selector: '.header-top-banner',
      text: $banner.find('p').text().trim(),
      buttonText: $banner.find('span').text().trim(),
      href: $banner.attr('href'),
      classes: $banner.attr('class')?.split(' ') || [],
      containerClasses: $container.attr('class')?.split(' ') || [],
      styles: extractStyles($banner)
    });
  }
  
  // Find header
  const $header = $('#header, header').first();
  if ($header.length) {
    const headerComponent = {
      type: 'Header',
      name: 'main-header',
      selector: '#header',
      classes: $header.attr('class')?.split(' ') || [],
      logo: {
        src: $header.find('img, source').attr('src') || $header.find('img, source').attr('srcset'),
        alt: $header.find('img').attr('alt'),
        link: $header.find('a').first().attr('href')
      },
      navigation: [],
      cta: null
    };
    
    // Extract navigation items
    $header.find('.navigation__item, .navigation-item, nav > ul > li, nav a').each((i, el) => {
      const $el = $(el);
      const text = $el.text().trim();
      const href = $el.attr('href') || $el.find('a').attr('href');
      
      if (text && href && text.length < 50) {
        // Check if has dropdown
        const $dropdown = $el.find('.navigation__item__content, .dropdown, .sub-menu, ul').first();
        if ($dropdown.length) {
          const items = [];
          $dropdown.find('a').each((j, item) => {
            items.push({
              text: $(item).text().trim(),
              href: $(item).attr('href'),
              src: $(item).find('img').attr('src'),
              description: $(item).find('p, .text-caption').text().trim()
            });
          });
          
          headerComponent.navigation.push({
            text,
            href,
            hasDropdown: true,
            items: items.slice(0, 10) // Limit to 10 items
          });
        } else {
          headerComponent.navigation.push({
            text,
            href,
            hasDropdown: false
          });
        }
      }
    });
    
    // Extract CTA button
    const $cta = $header.find('a.button, button, .cta, .buy-button').first();
    if ($cta.length) {
      headerComponent.cta = {
        text: $cta.text().trim(),
        href: $cta.attr('href'),
        classes: $cta.attr('class')?.split(' ') || []
      };
    }
    
    structure.components.push(headerComponent);
  }
  
  // Find main content sections
  $('main section, .homepage section, #main > section, .content > section').each((i, el) => {
    const $section = $(el);
    const classes = $section.attr('class')?.split(' ') || [];
    const id = $section.attr('id');
    
    // Determine section type based on class
    let sectionType = 'Unknown';
    if (classes.some(c => c.includes('hero') || c.includes('banner'))) {
      sectionType = 'Hero';
    } else if (classes.some(c => c.includes('product') || c.includes('feature'))) {
      sectionType = 'Products';
    } else if (classes.some(c => c.includes('faq') || c.includes('accordion'))) {
      sectionType = 'FAQ';
    } else if (classes.some(c => c.includes('footer'))) {
      sectionType = 'Footer';
    } else if (classes.some(c => c.includes('testimonial') || c.includes('review'))) {
      sectionType = 'Testimonials';
    }
    
    structure.body.sections.push({
      type: sectionType,
      id,
      classes,
      index: i,
      html: $section.html()?.slice(0, 2000) // Limit HTML
    });
  });
  
  // Find hero/landing section
  const $hero = $('.hero, .banner, .homepage-hero, .hero-section, [class*="hero"]').first();
  if ($hero.length && !structure.components.find(c => c.type === 'Hero')) {
    structure.components.push({
      type: 'Hero',
      name: 'hero-section',
      selector: extractSelector($hero),
      classes: $hero.attr('class')?.split(' ') || [],
      title: $hero.find('h1, h2, .title').first().text().trim(),
      subtitle: $hero.find('p, .subtitle').first().text().trim(),
      backgroundImage: $hero.css('background-image') || $hero.find('img').attr('src'),
      cta: $hero.find('a, button').first().text().trim()
    });
  }
  
  // Find product grids
  $('.products, .product-grid, .product-list, [class*="product"]').each((i, el) => {
    if (i === 0 && !structure.components.find(c => c.type === 'Products')) {
      const $grid = $(el);
      const products = [];
      
      $grid.find('article, .product, .product-card, [class*="product-item"]').each((j, product) => {
        const $product = $(product);
        products.push({
          name: $product.find('h2, h3, h4, .name, .title').text().trim(),
          description: $product.find('p, .description').text().trim(),
          image: $product.find('img').attr('src'),
          link: $product.find('a').attr('href'),
          price: $product.find('.price').text().trim()
        });
      });
      
      if (products.length > 0) {
        structure.components.push({
          type: 'Products',
          name: 'product-grid',
          selector: extractSelector($grid),
          classes: $grid.attr('class')?.split(' ') || [],
          products: products.slice(0, 20) // Limit to 20 products
        });
      }
    }
  });
  
  // Find footer
  const $footer = $('footer, .footer, #footer').first();
  if ($footer.length) {
    structure.components.push({
      type: 'Footer',
      name: 'main-footer',
      selector: extractSelector($footer),
      classes: $footer.attr('class')?.split(' ') || [],
      links: extractLinks($footer, $)
    });
  }
  
  // Extract all unique classes for CSS analysis
  const allClasses = new Set();
  $('[class]').each((i, el) => {
    const classes = $(el).attr('class')?.split(' ') || [];
    classes.forEach(c => {
      if (c.trim() && c.length > 2 && !c.includes(':')) {
        allClasses.add(c.trim());
      }
    });
  });
  
  structure.allClasses = Array.from(allClasses).slice(0, 500); // Limit to 500 classes
  
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(structure, null, 2));
  
  console.log('✅ HTML Structure Analyzed!\n');
  console.log('📊 Statistics:');
  console.log(`  Components: ${structure.components.length}`);
  console.log(`  Sections: ${structure.body.sections.length}`);
  console.log(`  Classes: ${structure.allClasses.length}`);
  console.log(`  Navigation Items: ${structure.components.find(c => c.type === 'Header')?.navigation?.length || 0}`);
  console.log(`\n📁 Output: ${OUTPUT_FILE}`);
  
  return structure;
}

function extractStyles($el) {
  const styles = {};
  const style = $el.attr('style');
  if (style) {
    style.split(';').forEach(s => {
      const [key, value] = s.split(':');
      if (key && value) {
        styles[key.trim()] = value.trim();
      }
    });
  }
  return styles;
}

function extractSelector($el) {
  const id = $el.attr('id');
  if (id) return `#${id}`;
  
  const classes = $el.attr('class')?.split(' ') || [];
  if (classes.length > 0) {
    return `.${classes.slice(0, 2).join('.')}`;
  }
  
  return $el.get(0)?.tagName || 'div';
}

function extractLinks($container, $) {
  const links = [];
  $container.find('a').each((i, el) => {
    const text = $(el).text().trim();
    const href = $(el).attr('href');
    if (text && href && text.length < 100) {
      links.push({ text, href });
    }
  });
  return links.slice(0, 50); // Limit to 50 links
}

analyzeHTML().catch(console.error);