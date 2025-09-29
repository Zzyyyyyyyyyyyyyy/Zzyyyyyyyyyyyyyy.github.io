# Repository Guidelines

## Project Structure & Module Organization
- Root: static site pages (`index.html`, `works.html`, `About ME.html`, `styles.css`) and assets.
- `backend/`: minimal Express server (`backend/src/index.js`).
- `frontend/`: React demo (`public/index.html`, `src/index.js`).
- `js/`: standalone browser scripts (e.g., `hover-effects.js`).
- `Sources/`: fonts and media; prefer Git LFS for large files.
- Other folders (`project/`, `A_Schoolweb/`, `P5/`, `Template/`, `html/`) hold experiments and content pages.

## Build, Test, and Development Commands
- `npm install`: install root dependencies.
- `npm run server`: start Express at `http://localhost:3001`.
- `npm run client`: start the React dev server from `frontend/`.
- Static pages: open `index.html` directly or serve locally (e.g., `npx http-server .`).

## Coding Style & Naming Conventions
- Indentation: 2 spaces; UTF-8; LF line endings.
- JavaScript: use `const`/`let`; arrow functions for callbacks; keep imports at top.
- React: PascalCase components; colocate component files under `frontend/src`.
- HTML/CSS: semantic tags; kebab-case class names; for new pages use lowercase-hyphen filenames (e.g., `about-me.html`).
- No linters configured; format consistently (Prettier-style is preferred if used).

## Testing Guidelines
- No tests are configured yet.
- If adding tests: use Jest for frontend (`frontend/src/__tests__/App.test.js`) and Supertest for backend (`backend/src/__tests__/server.test.js`).
- Name specs `*.test.js`; keep tests small and focused; include at least one API integration test for the Express route.

## Commit & Pull Request Guidelines
- Commits: present tense, concise (≤72-char summary). Prefer Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
- PRs: clear description, linked issues, before/after screenshots for visual changes, and steps to verify locally.
- Keep diffs minimal; avoid reformatting unrelated files; include affected paths (e.g., `frontend/src/...`, `backend/src/...`).

## Changelog Maintenance (`CHANGELOG.md`)
All **significant changes** must be documented in `CHANGELOG.md`. This includes:

**When to update the changelog:**
- Adding new features, templates, or major functionality
- Changing project structure or folder organization
- Modifying templates or shared components
- Updating documentation that affects workflow
- Breaking changes that require user action
- Important bug fixes that affect multiple pages

**Changelog format:**
- Use **[Unreleased]** section for ongoing work
- Organize entries by category: **Added**, **Changed**, **Fixed**, **Removed**, **Deprecated**, **Security**
- Include brief description + technical context if needed
- Use bullet points with clear, concise explanations
- Reference affected files/paths when relevant

**Categories explained:**
- **Added**: New features, files, templates, documentation
- **Changed**: Modifications to existing functionality or structure
- **Fixed**: Bug fixes and corrections
- **Removed**: Deleted files, deprecated features
- **Deprecated**: Features marked for future removal
- **Security**: Security-related improvements or fixes

**Example entry:**
```markdown
### Added
- **Project Template System**: Enhanced `Template/project-template.html` with improved structure
  - Added Anti-FOUC script for instant dark theme application
  - Added comprehensive placeholder comments with `[BRACKETS]`
  - Added support for both image and video hero media
```

**When releasing/versioning:**
1. Change **[Unreleased]** to version number with date: `## [1.0.0] - 2025-01-15`
2. Add new **[Unreleased]** section above for future changes
3. Use semantic versioning: `Major.Minor.Patch`
   - **Major**: Breaking changes, major restructuring
   - **Minor**: New features, non-breaking additions
   - **Patch**: Bug fixes, minor tweaks

**Always update AGENTS.md when:**
- Adding new workflow requirements
- Changing commit conventions
- Modifying project structure rules
- Adding new documentation requirements

## Security & Configuration Tips
- Do not commit secrets or `.env` files; use environment variables (e.g., `PORT`).
- Store large media under `Sources/` and track videos with Git LFS.
- Validate third-party libraries before adding; keep `package.json` scripts lean.

## Video Management (GCS)
This repo uses a config-driven approach to render autoplaying videos from Google Cloud Storage (GCS) for backgrounds and work sections.

- Files:
  - `js/video-config.json`: central mapping of video keys to sources/posters.
  - `js/video-manager.js`: client script that injects `<video>` into placeholders.
  - `styles.css`: base classes for `.video-bg` and `.video-slot` containers.

- Placeholders (HTML):
  - Background: `<div class="video-bg" data-video-key="home-bg"></div>`
  - Work/card: `<div class="video-slot" data-video-key="work-hero-01"></div>`
  - The `data-video-key` must map to a key in `js/video-config.json`.

- Video requirements (autoplay without interaction):
  - All rendered videos must be `muted autoplay loop playsinline` and have no controls.
  - Use `object-fit: cover` by default; allow per-slot override via config.
  - Set `crossorigin="anonymous"` when loading from GCS with CORS enabled.

- `js/video-config.json` schema (example):
  ```json
  {
    "version": 1,
    "base": "https://storage.googleapis.com/<bucket-name>",
    "videos": {
      "home-bg": {
        "sources": [
          { "src": "/bg/home.mp4", "type": "video/mp4" },
          { "src": "/bg/home.webm", "type": "video/webm" }
        ],
        "poster": "/bg/home.jpg",
        "fit": "cover",
        "preload": "auto"
      },
      "work-hero-01": {
        "sources": [{ "src": "/works/hero-01.mp4", "type": "video/mp4" }],
        "preload": "metadata"
      }
    }
  }
  ```

- GCS setup checklist:
  - Public read or signed URLs; prefer public read for simplicity.
  - Correct `Content-Type` (e.g., `video/mp4`, `video/webm`) on objects.
  - CORS: allow `GET, HEAD, OPTIONS`; `Allowed-Headers` include `Range`.
  - Origins: your site domain(s); `Expose-Headers`: `Accept-Ranges, Content-Length`.
  - Caching: `Cache-Control: public, max-age=31536000, immutable` for versioned paths.

- Maintenance workflow:
  1. Upload video assets to GCS under logical prefixes (e.g., `bg/`, `works/`).
  2. Add/modify an entry in `js/video-config.json` with `sources` (and optional `poster`).
  3. Add a placeholder `<div>` with matching `data-video-key` to the page.
  4. Verify autoplay (Safari/iOS requires muted + playsinline) and layout.
  5. Optionally provide a `poster` for faster first paint.

- Notes:
  - Use kebab-case for `data-video-key` values.
  - Consider WebM alongside MP4 for better efficiency where supported.
  - Respect `prefers-reduced-motion` by swapping to poster only (planned toggle).
