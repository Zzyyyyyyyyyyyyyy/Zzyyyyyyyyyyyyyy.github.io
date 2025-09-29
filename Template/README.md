# Project Template Documentation

This template system provides a standardized way to create beautiful, consistent project detail pages for your portfolio.

## Quick Start

1. **Copy the template**
   ```bash
   cp Template/project-template.html project/[category]/[project-name]/index.html
   ```

2. **Create assets folder**
   ```bash
   mkdir -p project/[category]/[project-name]/assets/images
   mkdir -p project/[category]/[project-name]/assets/videos
   ```

3. **Replace all placeholders** (search for `[BRACKETS]` in the HTML)

4. **Add your assets** to the `assets/` folders

5. **Update works.html** to link to your new project

## Folder Structure

The template expects this exact 3-level folder structure:

```
project/
├── [category-name]/              (e.g., interactive-systems)
│   ├── [project-slug]/           (e.g., web-application-frontend)
│   │   ├── index.html            (copied from Template/project-template.html)
│   │   └── assets/
│   │       ├── images/           (your hero images, gallery images)
│   │       └── videos/           (your hero videos, demo videos)
```

**Category names** (use kebab-case):
- `interactive-systems`
- `media-motion-design`
- `physical-computing-prototyping`
- `visual-fine-art`

**Project slug** (use kebab-case):
- Use lowercase with hyphens
- Be descriptive but concise
- Example: `physical-computing-wearable`, `rube-goldberg-machine`

## Template Placeholders

Replace all `[BRACKETS]` with your actual content:

### Page Metadata (in `<head>`)
- `[PROJECT_NAME]` - Short project name for browser tab title

### Project Header Section
- `[CATEGORY_NAME]` - Display name of category (e.g., "Physical Computing & Prototyping")
- `[PROJECT_TITLE]` - Full project title (e.g., "Physical Computing Wearable Device")
- `[PROJECT_TYPE]` - Type of project (e.g., "Academic Project", "Client Work", "Personal Exploration")
- `[DATE]` - Project completion date (e.g., "Fall 2024", "January 2025")
- `[YOUR_ROLE]` - Your role in the project (e.g., "Designer & Developer", "Lead Engineer")
- `[TOOL_1]`, `[TOOL_2]`, `[TOOL_3]` - Technologies used (e.g., "Arduino", "C++", "Fusion 360")

### Hero Media Section
Choose ONE option:

**Option 1: Image (default)**
```html
<img src="assets/images/[HERO_IMAGE].jpg" alt="[PROJECT_TITLE]">
```

**Option 2: Video**
```html
<!-- Comment out the image above, uncomment this block -->
<video controls preload="metadata">
    <source src="assets/videos/[HERO_VIDEO].mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
```

### Description Section
- Replace placeholder paragraphs with your project overview
- Add more `<h2>` sections as needed (Process, Results, Challenges, etc.)

### Gallery Section (Optional)
- `[IMAGE_1]`, `[IMAGE_2]`, `[IMAGE_3]` - Gallery image filenames
- Remove entire `<div class="project-gallery">` section if not needed
- Add more gallery items by copying existing `<div class="gallery-item">` blocks

### Next Project Navigation
- `[NEXT_CATEGORY]` - Category folder name of next project
- `[NEXT_PROJECT]` - Project slug of next project
- `[NEXT_PROJECT_TITLE]` - Display title of next project

## Hero Media Guidelines

### For Images
- **Format**: JPG or PNG
- **Recommended size**: 1920×1080px (16:9 aspect ratio)
- **Max file size**: 500KB (optimize before uploading)
- **Placement**: `assets/images/hero.jpg`

### For Videos
- **Format**: MP4 (H.264 codec)
- **Recommended size**: 1920×1080px at 30fps
- **Max file size**: 10MB
- **Duration**: Keep under 30 seconds for best performance
- **Settings**: Use `controls` attribute so users can play/pause
- **Placement**: `assets/videos/hero.mp4`

## Gallery Guidelines

### Image Specifications
- **Format**: JPG or PNG
- **Size**: 1200×800px minimum
- **File size**: Under 300KB each
- **Naming**: Use descriptive names (e.g., `prototype-v1.jpg`, `final-design.jpg`)

### Layout Options
- **Full width**: Add `class="gallery-item full-width"` for wide images
- **Two column**: Use default `class="gallery-item"` for side-by-side layout
- **Responsive**: Grid automatically adjusts on mobile devices

### Example Gallery Structure
```html
<div class="gallery-grid">
    <!-- Full width hero shot -->
    <div class="gallery-item full-width">
        <img src="assets/images/process-overview.jpg" alt="Design process overview">
    </div>

    <!-- Two column detail shots -->
    <div class="gallery-item">
        <img src="assets/images/detail-1.jpg" alt="Close-up detail 1">
    </div>
    <div class="gallery-item">
        <img src="assets/images/detail-2.jpg" alt="Close-up detail 2">
    </div>

    <!-- Add more as needed -->
</div>
```

## Section Indicators

The template automatically creates small ball navigation on the right side of the page based on `data-section` attributes:

**Included in navigation:**
- Project Header → "Project Info"
- Hero Media → "Preview"
- Description → "Overview"
- Gallery → "Gallery" (if present)

**Excluded from navigation:**
- Final "Let's Connect" section (intentionally excluded)

**To customize section names**, edit the `data-section-name` attribute:
```html
<div class="project-description" data-section="description" data-section-name="The Story">
```

## Customization

### Page-Specific Styles
If you need custom CSS for a specific project, add it to the `<style>` block in the `<head>`:

```html
<style>
    /* Add custom page-specific styles here if needed */
    .project-hero {
        aspect-ratio: 1 / 1; /* Make hero square instead of 16:9 */
    }
</style>
```

### Removing Sections
You can safely remove any of these optional sections:
- Gallery section (entire `<div class="project-gallery">`)
- Individual info items from project header
- Tool tags (remove unused `<span class="project-tag">` elements)

**Do NOT remove:**
- Navigation bar
- Project header (must have at least title)
- Hero media section
- Description section (must have at least one paragraph)
- Final section

## Adding Your Project to works.html

After creating your project page, update `works.html` to link to it:

1. Find the appropriate category section in `works.html`
2. Locate the existing work item or create a new one
3. Update the `onclick` attribute with your project path:

```html
<div class="work-item" onclick="location.href='project/[category]/[project-slug]/index.html'">
    <div class="work-content">
        <div class="work-video">
            <img src="project/[category]/[project-slug]/assets/images/hero.jpg" alt="Project thumbnail">
        </div>
        <div class="work-info">
            <div class="work-number">01</div>
            <h3>[PROJECT_TITLE]</h3>
            <div class="work-tags">
                <span class="work-tag">[TAG_1]</span>
                <span class="work-tag">[TAG_2]</span>
            </div>
        </div>
    </div>
</div>
```

## Best Practices

### Content Writing
- **Project title**: Keep under 60 characters for best display
- **Overview**: 2-3 paragraphs explaining what, why, and how
- **Process sections**: Break down your workflow into clear steps
- **Results**: Highlight key outcomes and learnings

### Asset Optimization
- **Compress images** before uploading (use tools like TinyPNG)
- **Optimize videos** for web (H.264, reasonable bitrate)
- **Use descriptive filenames** (avoid generic names like `IMG_1234.jpg`)
- **Keep total page size** under 5MB for fast loading

### Accessibility
- **Alt text**: Provide meaningful descriptions for all images
- **Video captions**: Consider adding subtitle tracks if video contains important dialogue
- **Heading hierarchy**: Use proper h2, h3 order in description sections
- **Link text**: Make "Next Project" titles descriptive

### Cross-Browser Testing
Test your project page in:
- Chrome/Edge (Chromium)
- Firefox
- Safari (especially for video playback)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Videos won't play
- Ensure video is H.264 encoded MP4
- Add `preload="metadata"` attribute
- Check file size (large files may timeout on slow connections)

### Section indicators not appearing
- Verify `data-section` and `data-section-name` attributes are present
- Check that `section-indicators.js` is loading (no console errors)
- Ensure sections have sufficient height to be detected

### Images not loading
- Verify paths use `assets/images/` not absolute paths
- Check file extensions match (case-sensitive on some servers)
- Confirm images are actually in the `assets/images/` folder

### Styling looks different
- Clear browser cache
- Verify `styles/project-page.css` is loading
- Check for custom styles in `<style>` block that may override defaults

### Navigation not working
- Verify relative paths use `../../../` prefix
- Check that navigation links point to correct files
- Ensure `works.html` link uses correct project path structure

## Example: Creating a New Project

Let's create a project step by step:

**1. Copy template**
```bash
cp Template/project-template.html project/interactive-systems/smart-mirror/index.html
```

**2. Create assets folders**
```bash
mkdir -p project/interactive-systems/smart-mirror/assets/images
mkdir -p project/interactive-systems/smart-mirror/assets/videos
```

**3. Open `index.html` and replace placeholders:**

```html
<title>Smart Mirror Interface - Zhengyuan Zhao</title>

<div class="project-category">Interactive Systems</div>
<h1 class="project-title">Smart Mirror Interface</h1>

<div class="project-info-item">
    <h3>PROJECT TYPE</h3>
    <p>Academic Project</p>
</div>

<div class="project-info-item">
    <h3>DATE</h3>
    <p>Spring 2024</p>
</div>

<div class="project-info-item">
    <h3>ROLE</h3>
    <p>UX Designer & Developer</p>
</div>

<div class="project-info-item">
    <h3>TOOLS</h3>
    <div class="project-tags">
        <span class="project-tag">Raspberry Pi</span>
        <span class="project-tag">React</span>
        <span class="project-tag">Node.js</span>
        <span class="project-tag">Figma</span>
    </div>
</div>
```

**4. Add hero video:**
```html
<div class="project-hero">
    <video controls preload="metadata">
        <source src="assets/videos/demo.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
```

**5. Write description:**
```html
<div class="project-description">
    <h2>Overview</h2>
    <p>The Smart Mirror Interface is an interactive display system that combines a two-way mirror with a Raspberry Pi-powered screen. It displays personalized information including weather, calendar events, news headlines, and time in an elegant, minimalist interface.</p>

    <p>This project explores the intersection of physical computing and web technologies, creating a seamless ambient display that enhances daily routines without being intrusive.</p>

    <h2>Process</h2>
    <p>The development process began with user research to understand morning routines and information needs. We prototyped the interface in Figma, focusing on glanceable information architecture and high contrast for visibility through the mirror.</p>

    <p>Technical implementation involved building a custom React application that runs on a Raspberry Pi 4, interfacing with various APIs for real-time data, and constructing the physical mirror housing using a wooden frame and two-way acrylic mirror.</p>
</div>
```

**6. Add gallery images:**
```html
<div class="gallery-grid">
    <div class="gallery-item full-width">
        <img src="assets/images/installed.jpg" alt="Smart mirror installed in bathroom">
    </div>
    <div class="gallery-item">
        <img src="assets/images/interface-day.jpg" alt="Interface in daylight">
    </div>
    <div class="gallery-item">
        <img src="assets/images/interface-night.jpg" alt="Interface at night">
    </div>
    <div class="gallery-item full-width">
        <img src="assets/images/construction.jpg" alt="Construction process">
    </div>
</div>
```

**7. Set next project:**
```html
<a href="../../media-motion-design/kinetic-typography/index.html" class="next-project">
    <div>
        <div class="next-project-text">Next Project</div>
        <div class="next-project-title">Kinetic Typography Exploration</div>
    </div>
    <div class="next-project-icon">
        <i class="fas fa-arrow-right"></i>
    </div>
</a>
```

**8. Upload assets:**
- Add `demo.mp4` to `assets/videos/`
- Add all gallery images to `assets/images/`

**9. Update works.html:**
```html
<div class="work-item" onclick="location.href='project/interactive-systems/smart-mirror/index.html'">
    <div class="work-content">
        <div class="work-video">
            <img src="project/interactive-systems/smart-mirror/assets/images/installed.jpg" alt="Smart Mirror">
        </div>
        <div class="work-info">
            <div class="work-number">05</div>
            <h3>Smart Mirror Interface</h3>
            <div class="work-tags">
                <span class="work-tag">Raspberry Pi</span>
                <span class="work-tag">React</span>
                <span class="work-tag">IoT</span>
            </div>
        </div>
    </div>
</div>
```

**10. Test:**
- Open in browser via static server
- Check all sections load
- Verify navigation works
- Test on mobile device

## Maintenance

### Updating Content
To update an existing project page:
1. Edit the `index.html` file in the project folder
2. Replace text content directly
3. Add/replace images in `assets/images/`
4. Update video files in `assets/videos/`
5. No need to touch CSS files

### Updating Styles
If you need to change styling across all project pages:
1. Edit `styles/project-page.css`
2. Changes will apply to all projects automatically
3. For project-specific overrides, use the `<style>` block in that page's HTML

### Version Control
- Commit each project separately for cleaner history
- Use meaningful commit messages: `feat: add smart mirror project page`
- Keep assets optimized before committing
- Consider using Git LFS for large video files

## Need Help?

- **Template issues**: Check `CHANGELOG.md` for recent changes
- **General guidelines**: See `AGENTS.md` for development conventions
- **Video configuration**: See `AGENTS.md` section on Video Management (GCS)
- **Styling reference**: Inspect `styles/project-page.css` for available classes

---

**Last updated**: 2025-09-29
**Template version**: 1.0.0