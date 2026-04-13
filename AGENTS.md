# AGENTS — Development Guide for WKND Adventures

Guidelines for making changes to the WKND Adventures site. The site is now **generated from JSON data + template modules**, not hand-written HTML.

**Read [DOCUMENTATION.md](DOCUMENTATION.md) first** for architecture and workflows.

---

## Golden Rule

**Edit JSON files and templates, not HTML files.**

All `.html` files are **generated**. Hand-editing them will lose changes when you run `npm run generate`.

```bash
# ✓ DO THIS
edit data/pages/index.json
npm run generate

# ✗ DON'T DO THIS
edit index.html directly
```

---

## Making Changes

### Content Changes (Text, Images, Links)

1. Find the relevant JSON file:
   - Root page: `data/pages/pagename.json`
   - Blog post: `data/blog/slug.json`
   - Global (nav, footer): `data/site.json`

2. Edit the JSON:
   ```json
   {
     "sections": [
       {
         "type": "featured-article",
         "heading": "New Title Here",
         "body": "New description here"
       }
     ]
   }
   ```

3. Regenerate:
   ```bash
   npm run generate
   ```

4. View in browser (HTML is ready to open)

5. Commit:
   ```bash
   git add data/ *.html blog/ fragments/
   git commit -m "Update [what changed]"
   ```

### Structure Changes (Adding/Removing Sections)

1. Edit the JSON `sections` array. Add or remove a block object:
   ```json
   {
     "type": "faq-list",
     "heading": "Questions",
     "items": [
       { "question": "Q?", "answer": "A." }
     ]
   }
   ```

2. Use a valid block type from `templates/blocks/`:
   - `hero`, `featured-article`, `editorial-index`, `faq-list`
   - `tab-section`, `article-card-grid`, `feature-cards`
   - `cta-section`, `cta-section-inverse`, `prose-narrow`
   - `gallery`, `ticker`, `card-grid`, `intro`
   - `fragment-include`

3. Regenerate and verify:
   ```bash
   npm run generate
   ```

### Template Changes (Layout, Styling Structure)

1. Edit the relevant template:
   - Block: `templates/blocks/blockname.mjs`
   - Partial: `templates/partials/navbar.mjs`, `footer.mjs`, `head.mjs`
   - Component: `templates/components/button.mjs`, `article-card.mjs`, `pull-quote.mjs`

2. Regenerate:
   ```bash
   npm run generate
   ```

3. Changes apply to all pages automatically

4. Example — changing button structure:
   ```javascript
   // templates/components/button.mjs
   export function renderButton({ href, label, variant = 'primary' }) {
     const cls = variant === 'accent' ? 'accent-button' : 'button';
     return `<a href="${href}" class="${cls}"><span class="button-label">${label}</span></a>`;
   }
   // Regenerate → all buttons updated across all 20+ pages
   ```

### Adding Navigation Links

Edit `data/site.json`:

```json
{
  "nav": {
    "megamenus": [
      {
        "label": "Explore",
        "links": [
          {
            "href": "new-page.html",
            "title": "New Page",
            "desc": "Description of the new page."
          }
        ]
      }
    ]
  }
}
```

Regenerate → navbar updates on all pages.

### Adding Footer Links

Edit `data/site.json`:

```json
{
  "footer": {
    "columns": [
      {
        "heading": "Explore",
        "links": [
          { "href": "new-page.html", "label": "New Page" }
        ]
      }
    ]
  }
}
```

Regenerate → footer updates on all pages.

---

## Adding a New Page

1. Create `data/pages/pagename.json`:
   ```json
   {
     "meta": {
       "title": "Page Title — WKND Adventures",
       "description": "Short description for search engines.",
       "depth": 0
     },
     "hero": {
       "variant": "full",
       "image": {
         "src": "images/section/image.jpg",
         "alt": "Description"
       },
       "heading": "Page Title",
       "lead": "Subtitle or lead text"
     },
     "sections": [
       {
         "type": "featured-article",
         "heading": "First section heading",
         "body": "Description text..."
       }
     ]
   }
   ```

2. Add to navigation in `data/site.json`

3. Generate:
   ```bash
   npm run generate
   ```
   Creates `pagename.html`

4. Commit

---

## Adding a New Blog Post

1. Create `data/blog/slug.json`:
   ```json
   {
     "meta": {
       "title": "Article Title — WKND Adventures",
       "description": "Short description",
       "depth": 1
     },
     "hero": {
       "variant": "blog",
       "image": { "src": "../images/...", "alt": "..." },
       "breadcrumbs": [
         { "text": "Home", "href": "../index.html" },
         { "text": "Expeditions", "href": "../expeditions.html" },
         { "text": "Article Title", "href": null }
       ],
       "tag": "Expedition · Region · Activity",
       "heading": "Article Title",
       "byline": {
         "name": "Author Name",
         "meta": "Date or location",
         "avatar": "../images/contributors/author.jpg"
       }
     },
     "articleBody": [
       { "type": "p", "text": "First paragraph..." },
       { "type": "h2", "text": "Section heading" },
       { "type": "p", "text": "More content..." },
       { "type": "blockquote", "text": "Quote text" },
       { "type": "figure", "src": "../images/...", "alt": "...", "caption": "Caption" },
       { "type": "pull-quote", "text": "Pull quote", "attribution": "— Author" }
     ],
     "gearPullquote": {
       "gearHeading": "What We Carried",
       "gearItems": ["Item 1: weight", "Item 2: weight"],
       "pullQuoteText": "Main quote...",
       "pullQuoteAttribution": "— Attribution"
     },
     "gallery": {
       "heading": "In the Field",
       "images": [
         { "src": "../images/...", "alt": "..." }
       ]
     },
     "moreStories": {
       "fragmentSrc": "../fragments/field-notes-grid.html"
     }
   }
   ```

2. Update recent articles in `data/site.json` nav:
   ```json
   {
     "recentArticles": [
       {
         "href": "blog/slug.html",
         "title": "Article Title",
         "desc": "Brief description"
       }
     ]
   }
   ```

3. Generate:
   ```bash
   npm run generate
   ```
   Creates `blog/slug.html`

4. Commit

---

## Article Body Block Types

The `articleBody` array in blog posts uses typed blocks:

- `p` — Paragraph (`{ "type": "p", "text": "..." }`)
- `h2`, `h3` — Headings (`{ "type": "h2", "text": "..." }`)
- `blockquote` — Block quote (`{ "type": "blockquote", "text": "..." }`)
- `figure` — Image with caption (`{ "type": "figure", "src": "...", "alt": "...", "caption": "..." }`)
- `ul`, `ol` — Lists (`{ "type": "ul", "items": ["item1", "item2"] }`)
- `pull-quote` — Styled pull quote (`{ "type": "pull-quote", "text": "...", "attribution": "..." }`)
- `html` — Escape hatch for custom markup (`{ "type": "html", "html": "<custom>..." }`)

---

## Section Block Types

Use these `type` values in the `sections` array of any page:

| Type | Used for |
|---|---|
| `hero` | Hero section (only used in hero, not in sections) |
| `featured-article` | Featured article box with image |
| `editorial-index` | Numbered editorial sections |
| `faq-list` | FAQ accordion |
| `tab-section` | Tabbed content |
| `article-card-grid` | Grid of article cards |
| `feature-cards` | Feature card layout |
| `cta-section` | Call-to-action section (accent) |
| `cta-section-inverse` | Inverse CTA (dark) |
| `prose-narrow` | Narrow prose column |
| `gallery` | Image gallery |
| `ticker` | Ticker strip (activity list) |
| `card-grid` | Generic card grid |
| `intro` | Intro section |
| `fragment-include` | Load an HTML fragment |

---

## Understanding Depth

All pages have a `depth` value that controls relative URLs:

- **Root pages** (`index.html`, `about.html`, etc.): `"depth": 0`
- **Blog pages** (`blog/slug.html`): `"depth": 1`

Templates use `ref(url, depth)` to resolve paths automatically:

```javascript
ref('css/styles.css', 0)  // → 'css/styles.css'
ref('css/styles.css', 1)  // → '../css/styles.css'
```

**In JSON, store URLs as-is — templates handle depth.**

---

## Semantic Improvements

The generated HTML includes these improvements (automatically applied):

1. **Buttons**: Use `<span class="button-label">` instead of `<div>` (valid HTML)
2. **FAQ**: Use native `<button>` elements instead of `<div role="button">` (better accessibility)
3. **Pull quotes**: Use `<cite>` for attribution instead of `<footer>` (semantic)

These are enforced in the templates, so they apply to all pages.

---

## CSS and JS

These are **not** generated — edit directly:

- **Styling**: `css/styles.css`
- **Behavior**: `js/site.js`

Changes take effect immediately; no regeneration needed.

---

## Build Process

```bash
# Generate HTML from JSON + templates
npm run generate
# ↓ Creates/updates all .html files

# Build for deployment (minify + dist/)
npm run build:pages
# ↓ Runs generate, then minifies CSS/JS/HTML to dist/

# Deploy to GitHub Pages
npm run deploy:pages
# ↓ Runs build:pages, then pushes dist/ to gh-pages branch
```

---

## Common Mistakes

### ❌ "I edited index.html but my changes disappeared"

You hand-edited a generated file. Run `npm run generate` and your edits are overwritten.

**Fix**: Edit `data/pages/index.json` instead, then regenerate.

### ❌ "The navbar looks different on the blog page"

All navbars come from `data/site.json`. The `depth` value handles the path difference. No special logic needed.

**Fix**: Edit `data/site.json` once, regenerate, and it updates everywhere.

### ❌ "I added a button to the template but the existing buttons didn't change"

The existing HTML was already generated. You must regenerate.

**Fix**: After editing a template, always run `npm run generate`.

### ❌ "The new section doesn't appear on the page"

The section is in the JSON but was not added to the `sections` array.

**Fix**: Make sure your new section object is inside the `"sections": [...]` array, not at the root level.

### ❌ "Images are broken on blog pages (404s)"

Images on blog pages must use relative paths that account for depth.

**Fix**: Use `../images/...` in blog posts, or store URL as `images/...` in JSON and let the template handle it via `ref()`.

---

## File Inventory

### Don't Edit These (They're Generated)

- `index.html`, `about.html`, `*.html` (root pages)
- `blog/*.html` (blog posts)
- `fragments/*.html` (fragments)

### Edit These

- `data/site.json` — nav, footer, global config
- `data/pages/*.json` — root page content
- `data/blog/*.json` — blog post content
- `templates/**/*.mjs` — page structure and components
- `css/styles.css` — styling
- `js/site.js` — client behavior

---

## Verification

After making changes:

1. **Regenerate**: `npm run generate`
2. **View**: Open the generated `.html` file in a browser
3. **Check links**: Click through to verify navigation works
4. **Check images**: Ensure images load correctly
5. **Validate JSON**: Use `node -c data/pages/index.json` to check syntax

---

## Resources

- **[DOCUMENTATION.md](DOCUMENTATION.md)** — Full architecture guide
- **[templates/](templates/)** — All template modules
- **[data/](data/)** — All content JSON files
- **[package.json](package.json)** — NPM scripts

---

## Summary

1. **Content changes** → Edit JSON files in `data/`
2. **Structure changes** → Add/remove sections in JSON
3. **Template changes** → Edit `.mjs` files in `templates/`
4. **Always regenerate** → `npm run generate` after any change
5. **Never hand-edit HTML** → It will be overwritten

Questions? See [DOCUMENTATION.md](DOCUMENTATION.md).
