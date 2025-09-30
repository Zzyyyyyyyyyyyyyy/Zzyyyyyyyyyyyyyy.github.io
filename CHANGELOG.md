# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Project Instructions**: Created `CLAUDE.md` with development commands, architecture overview, and code conventions
  - Static site development commands (serve:static, serve:frontend, dev)
  - Video management system documentation (video-config.json, video-manager.js)
  - Code conventions and dependency guidelines
  - Security best practices

- **Claude Code Integration**: Added custom slash commands for workflow automation
  - `/add-changelog` command for changelog entry management
  - `/code-review` command for automated code quality checks
  - Command templates stored in `.claude/commands/`

### Fixed
- **Navigation Issues**: Fixed works.html navigation and section indicators (commit 314b6548)
  - Corrected section indicator script references
  - Fixed navigation links across main pages (About ME.html, Contact.html, index.html)
  - Updated works.html with proper layout and navigation structure

### Added (Previous)
- **Project Template System**: Enhanced `Template/project-template.html` with improved structure
  - Added Anti-FOUC (Flash of Unstyled Content) script for instant dark theme application
  - Added comprehensive placeholder comments with `[BRACKETS]` for easy content replacement
  - Added support for both image and video hero media with toggle instructions
  - Added scrollbar hiding across all browsers for cleaner UI
  - Added proper relative path structure for 3-level deep project folders (`../../../`)
  - Added gallery section template with responsive grid layout
  - Added section indicators integration (small ball side navigation)
  - Changed CLIENT field to PROJECT TYPE for better project description

- **Shared CSS System**: Created `styles/project-page.css`
  - Extracted all common styles from template into reusable external CSS file
  - Includes all base styles, navigation, project sections, animations, and responsive design
  - Template now links to external CSS, keeping inline styles minimal
  - Makes future updates easier - edit one CSS file instead of every project page

- **Template Features**:
  - No-transition class during initial page load to prevent visual flicker
  - Video support in hero section with `<video>` element option
  - Clear edit sections marked with comment blocks
  - Optional gallery section that can be easily removed
  - Section indicators with 4 navigation points (header, hero, description, gallery)
  - Final section ("Let's Connect") excluded from navigation indicators
  - Standardized folder structure expectation: `project/[category]/[project-name]/`

- **Documentation**:
  - Created `CHANGELOG.md` to track all significant changes
  - Updated `AGENTS.md` with changelog maintenance guidelines

### Changed
- **Template Improvements**:
  - Updated all navigation links to use correct relative paths (`../../../`)
  - Updated font path to correct relative location (`../../../Sources/SpaceGrotesk-VariableFont_wght.ttf`)
  - Changed hero media styles to support both image and video elements
  - Enhanced CSS with better overflow handling and scrollbar hiding
  - Updated project metadata from "CLIENT" to "PROJECT TYPE" field
  - Refactored template to use external CSS file (`styles/project-page.css`)
  - Removed ~700 lines of inline CSS, replaced with single external stylesheet link

### Technical Details
- Template now assumes 3-level folder structure: `project/category-name/project-slug/index.html`
- All assets should be placed in `assets/images/` and `assets/videos/` subdirectories
- Template uses relative paths that work from this structure automatically

---

## Template Structure

The project template follows this structure:

```
project/
├── [category-name]/           (e.g., interactive-systems)
│   ├── [project-slug]/        (e.g., physical-computing-wearable)
│   │   ├── index.html         (copied from Template/project-template.html)
│   │   └── assets/
│   │       ├── images/        (hero images, gallery images)
│   │       └── videos/        (hero videos, demo videos)
```

---

## How to Use the Template

1. **Copy template**: `Template/project-template.html` → `project/[category]/[project-name]/index.html`
2. **Create assets folder**: `project/[category]/[project-name]/assets/`
3. **Edit placeholders**: Replace all `[BRACKETS]` with your content:
   - `[PROJECT_NAME]` - Page title
   - `[CATEGORY_NAME]` - Project category
   - `[PROJECT_TITLE]` - Main heading
   - `[PROJECT_TYPE]`, `[DATE]`, `[YOUR_ROLE]` - Metadata
   - `[TOOL_1]`, `[TOOL_2]`, etc. - Technology tags
   - `[HERO_IMAGE]` or `[HERO_VIDEO]` - Main visual
   - Description paragraphs - Replace placeholder text
   - `[NEXT_PROJECT]`, `[NEXT_PROJECT_TITLE]` - Navigation

4. **Choose media type**: Comment out either image or video option in hero section
5. **Optional sections**: Remove gallery section if not needed

---

## Maintenance Guidelines

### For Major Changes
- Update this `CHANGELOG.md` under **[Unreleased]** section
- When releasing, change `[Unreleased]` to version number with date
- Use semantic versioning (Major.Minor.Patch)

### For Minor Updates
- Add brief entry under appropriate category (Added/Changed/Fixed/Removed)
- Include technical context if the change affects structure or workflow

### Categories
- **Added**: New features, files, or functionality
- **Changed**: Changes to existing features or structure
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features or files
- **Fixed**: Bug fixes
- **Security**: Security improvements or fixes

---

### Testing & Validation
- **Project Links Validation Report**: All 18 project links in works.html are working correctly
  - Verified all project index.html files exist at correct paths
  - Confirmed 2 projects have working hero media (Physical Computing Wearable, Rube Goldberg Machine)
  - Identified 16 projects with placeholder hero media (ready for content)
  - Found 1 orphaned project: `interactive-systems/interactive-installation/` not linked in works.html
  - All "Next Project" links are placeholders `[NEXT_CATEGORY]/[NEXT_PROJECT]` (pending content)

### Documentation
- **Created Template/README.md**: Comprehensive documentation guide with:
  - Quick start instructions
  - Folder structure explanation
  - Complete placeholder reference
  - Hero media and gallery guidelines
  - Section indicators documentation
  - Full example walkthrough
  - Troubleshooting section
  - Best practices for content, assets, and accessibility

---

## Future Planned Changes

- [ ] Add missing `interactive-installation` project to works.html
- [ ] Update all "Next Project" links with actual project paths (circular navigation recommended)
- [ ] Add hero media content to 16 placeholder projects
- [ ] Clean up legacy project folders (old naming convention)
- [ ] Implement auto-linking system for "Next Project" navigation
- [ ] Add JSON config system for project metadata