# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Static site development:**
- `npm run serve:static` - Serve root directory at http://localhost:8080
- `npm run serve:frontend` - Serve frontend at http://localhost:5000
- `npm run dev` - Run both backend and static server concurrently

**Backend:**
- `npm run server` - Start Express backend at http://localhost:3001
- Backend entry point: `backend/src/index.js`

**Alternative serving:**
- Open `index.html` directly in browser
- Use `npx http-server .` for quick static serving

## Architecture Overview

**Project type:** Hybrid static site + minimal React app
- Static HTML pages at root (`index.html`, `works.html`, `About ME.html`, `Contact.html`)
- Minimal Express backend (`backend/src/index.js`) - basic health check only
- Separate React demo app in `frontend/` subdirectory
- Standalone browser scripts in `js/` directory (not bundled)

**Key directories:**
- `/` - Main static site pages and assets
- `backend/` - Express server (minimal, runs on port 3001)
- `frontend/` - React application (separate from main site)
- `js/` - Standalone browser scripts (hover effects, video management)
- `styles/` - CSS files including video styles
- `Sources/` - Fonts and media (use Git LFS for videos)
- `scripts/` - Development utilities (static server, GCS CORS config)

## Video Management System

**Config-driven video rendering from Google Cloud Storage:**

1. **Core files:**
   - `js/video-config.json` - Central video configuration mapping
   - `js/video-manager.js` - Runtime script that injects `<video>` elements
   - `styles/video.css` - Video container styles

2. **HTML placeholders:**
   - Background: `<div class="video-bg" data-video-key="home-bg"></div>`
   - Content slot: `<div class="video-slot" data-video-key="work-hero-01"></div>`
   - `data-video-key` must exist in `js/video-config.json`

3. **Video requirements:**
   - All videos render as `muted autoplay loop playsinline`
   - No user controls
   - Use `object-fit: cover` (configurable per video)
   - Set `crossorigin="anonymous"` for GCS with CORS

4. **Adding new videos:**
   - Upload to GCS under logical path (e.g., `bg/`, `works/`)
   - Add entry to `js/video-config.json` with sources/poster
   - Insert placeholder div with matching `data-video-key`
   - Verify autoplay works (Safari/iOS needs muted + playsinline)

## Code Conventions

**Style:**
- 2 spaces indentation
- UTF-8 encoding, LF line endings
- JavaScript: `const`/`let`, arrow functions for callbacks
- React: PascalCase components in `frontend/src/`
- HTML/CSS: semantic tags, kebab-case classes, lowercase-hyphen filenames
- No linters configured; use Prettier-style formatting

**Dependencies:**
- Animation: GSAP, anime.js, Lenis smooth scroll, Locomotive Scroll
- 3D: Three.js, OGL
- Effects: hover-effect, Splitting.js
- UI: magic-ui components

**Security:**
- Never commit secrets or `.env` files
- Use environment variables (e.g., `PORT`)
- Large media goes in `Sources/` with Git LFS tracking