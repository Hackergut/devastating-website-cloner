---
name: clone-website
description: Reverse-engineer and clone a website in one shot — extracts assets, CSS, and content section-by-section and proactively dispatches parallel builder agents in worktrees as it goes. Use this whenever the user wants to clone, replicate, rebuild, reverse-engineer, or copy any website. Also triggers on phrases like "make a copy of this site", "rebuild this page", "pixel-perfect clone". Provide the target URL as an argument.
argument-hint: "<url>"
user-invocable: true
---

# Clone Website

You are about to reverse-engineer and rebuild **$ARGUMENTS** as a pixel-perfect clone.

This is not a two-phase process (inspect then build). You are a **foreman walking the job site** — as you inspect each section of the page, you write a detailed specification to a file, then hand that file to a specialist builder agent with everything they need. Extraction and construction happen in parallel, but extraction is meticulous and produces auditable artifacts.

## Pre-Flight

1. **Chrome MCP is required.** Test it immediately. If it's not available, stop and tell the user to enable it — this skill cannot work without browser automation.
2. Read `TARGET.md` for URL and scope. If the URL doesn't match `$ARGUMENTS`, update it.
3. Verify the base project builds: `npm run build`. The Next.js + shadcn/ui + Tailwind v4 scaffold should already be in place. If not, tell the user to set it up first.
4. Create the output directories if they don't exist: `docs/research/`, `docs/research/components/`, `docs/design-references/`, `scripts/`.

[Continue with the full skill content as we saw before...]
