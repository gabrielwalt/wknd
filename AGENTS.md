# AGENTS — Development Guide for WKND Adventures

Guidelines for making changes to the WKND Adventures site. The site is **generated from JSON data + template modules**, not hand-written HTML.

## Quick Start

**Golden Rule**: Edit JSON and templates, not HTML files.

```bash
# ✓ Correct workflow
edit data/pages/adventures.json   # Change content
edit templates/blocks/hero.mjs    # Change structure
npm run generate                   # Regenerate HTML

# ✗ Wrong
edit adventures.html              # Changes will be lost
```

## Documentation

Before making changes, understand the system. Start with the **docs/** folder:

1. **[docs/README.md](docs/README.md)** — Navigation hub, quick overview
2. **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — How the system works
3. **[docs/DATA_FORMAT.md](docs/DATA_FORMAT.md)** — JSON schema reference
4. **[docs/GENERATION.md](docs/GENERATION.md)** — Build process and workflows
5. **[docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)** — CSS tokens and layout
6. **[docs/VISUAL_GUIDE.md](docs/VISUAL_GUIDE.md)** — Design philosophy
7. **[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)** — Maintenance principles

**For code details**, see JSDoc comments in the source files:
- `templates/blocks/*.mjs` — Block type parameters and examples
- `templates/components/*.mjs` — Component parameters
- `templates/partials/*.mjs` — Partial parameters
- `css/tokens.css` — CSS design values

## Common Tasks

### Update Page Content

**File to edit**: `data/pages/pagename.json`

```bash
# 1. Edit JSON
edit data/pages/adventures.json

# 2. Regenerate
npm run generate

# 3. Preview in browser (file is ready to open)

# 4. Commit
git add data/ *.html blog/ fragments/
git commit -m "Update adventures page: [what changed]"
```

See [docs/DATA_FORMAT.md](docs/DATA_FORMAT.md) for JSON schema.

### Update Blog Post

**File to edit**: `data/blog/slug.json`

```bash
edit data/blog/patagonia-trek.json
npm run generate
git add data/ blog/
git commit -m "Update blog post: patagonia-trek"
```

Article body uses typed blocks (p, h2, h3, figure, blockquote, pull-quote, ul, html).  
See [docs/DATA_FORMAT.md](docs/DATA_FORMAT.md) for schema.

### Change Navigation

**File to edit**: `data/site.json`

```bash
edit data/site.json          # Add/remove/update megamenus
npm run generate
git add data/ *.html blog/   # Navbar updates everywhere
git commit -m "Nav: add new page link"
```

### Modify Page Structure (Add/Remove Sections)

**File to edit**: `data/pages/pagename.json` (sections array)

```json
{
  "sections": [
    {
      "type": "featured-article",
      "heading": "New Section",
      "body": "...",
      "image": { "src": "...", "alt": "..." },
      "button": { "label": "Read", "href": "..." }
    }
  ]
}
```

Valid block types: `featured-article`, `faq-list`, `tab-section`, `article-card-grid`, `feature-cards`, `cta-section`, `cta-section-inverse`, `prose-narrow`, `gallery`, `ticker`, `card-grid`, `intro`, `fragment-include`, `editorial-index`

See `templates/blocks/` for JSDoc on each block's parameters.

### Update Page Design (Template Change)

**Files to edit**: `templates/blocks/*.mjs` or `templates/components/*.mjs`

```bash
# 1. Edit template
edit templates/blocks/featured-article.mjs

# 2. Regenerate (applies change to all pages using this block)
npm run generate

# 3. Verify diffs
git diff *.html blog/

# 4. Commit both template and generated files
git add templates/ *.html blog/ fragments/
git commit -m "Update featured-article block: add new prop"
```

When editing a template:
- Add/update **JSDoc** if you change parameters
- Regenerate after every template change
- All pages using that block automatically get the change

### Add New Page

1. Create `data/pages/newpage.json`:
```json
{
  "meta": {
    "title": "Page Title — WKND Adventures",
    "description": "Short description for search engines",
    "depth": 0
  },
  "hero": {
    "variant": "full",
    "image": { "src": "images/section/photo.jpg", "alt": "..." },
    "heading": "Page Title",
    "lead": "Subtitle text"
  },
  "sections": [ /* ... */ ]
}
```

2. Update `data/site.json` to add link in nav
3. `npm run generate` → creates `newpage.html`
4. Commit

See [docs/DATA_FORMAT.md](docs/DATA_FORMAT.md) for full schema.

### Add New Block Type

1. Create `templates/blocks/blockname.mjs`:
```javascript
/**
 * Renders a [description]
 * @param {Object} data
 * @param {string} data.heading - Title (required)
 * @param {string} [data.optional] - Optional field
 * @returns {string} HTML: <section class="...">
 *
 * Used for [what purpose]
 * Example in data/pages/*.json:
 * { "type": "blockname", "heading": "...", ... }
 */
export function blockName(data) {
  const { heading, optional, depth = 0 } = data;
  return `<section>...</section>`;
}
```

2. Add import and export in `templates/page.mjs`:
```javascript
import { blockName } from './blocks/blockname.mjs';

const blockRenderers = {
  // ...
  'blockname': blockName,
};
```

3. Use in page JSON: `{ "type": "blockname", ... }`
4. Regenerate and commit

## CSS and JS

These are **not** generated — edit directly:

- `css/styles.css` — Styling (imports modules)
- `css/tokens.css` — Design tokens (colors, spacing, typography)
- `js/site.js` — Client-side behavior

Changes take effect immediately; no regeneration needed.

See [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) for CSS reference.

## Build & Deploy

```bash
# Generate HTML from JSON + templates
npm run generate
# ↓ Creates/updates all .html files in source tree

# Build for deployment (minify, output to dist/)
npm run build:pages
# ↓ Runs generate, then minifies CSS/JS/HTML → dist/

# Deploy to GitHub Pages
npm run deploy:pages
# ↓ Runs build:pages, then pushes dist/ to gh-pages
```

See [docs/GENERATION.md](docs/GENERATION.md) for detailed workflows.

## Maintenance & Documentation

### When You Make Changes

**Update documentation if**:

| Change | Update |
|---|---|
| Add new template param | JSDoc in the template file (most important) |
| Change JSON schema | `docs/DATA_FORMAT.md` + JSDoc |
| Add/modify npm script | `docs/GENERATION.md` |
| Change CSS architecture | `docs/DESIGN_SYSTEM.md` |
| Change design language | `docs/VISUAL_GUIDE.md` |
| Add new workflow | `docs/CONTRIBUTING.md` |

**Don't** write separate docs if code comments or JSDoc already cover it. Instead, **link to the code**.

Example: Don't explain button props in docs. Instead:
> See `templates/components/button.mjs` for parameter documentation.

### Documentation Principles

1. **DRY (Don't Repeat Yourself)** — Single source of truth for each fact
2. **Code First** — JSDoc is authoritative, docs link to it
3. **Avoid Duplication** — If it's already in code, don't repeat in docs
4. **Keep Docs Close** — Maintain docs alongside code changes

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for full guidelines.

## Common Mistakes

### ❌ "I edited index.html but my changes disappeared"

You hand-edited a generated file. Always edit `data/` and templates, then regenerate.

**Fix**: `edit data/pages/index.json && npm run generate`

### ❌ "The navbar looks different on blog pages"

All navbars use `data/site.json`. The `depth` value (0 for root, 1 for blog) handles paths automatically.

**Fix**: Edit `data/site.json` once, regenerate, and it updates everywhere.

### ❌ "I changed a template but the pages didn't update"

You forgot to regenerate.

**Fix**: `npm run generate` after every template change.

### ❌ "New section doesn't appear on the page"

The section is in JSON but not in the `sections` array.

**Fix**: Check that your section object is inside `"sections": [...]`, not at the root level.

### ❌ "Images are broken on blog pages"

Blog posts use `depth: 1`, so image paths must account for `../` prefix. Store URLs root-relative in JSON; templates handle the rest via `ref()`.

**Fix**: Use `"images/..."` in JSON (not `"../images/..."`). Templates automatically resolve with correct depth.

## Quick Reference

| Task | File to Edit | Command |
|---|---|---|
| Update page text | `data/pages/pagename.json` | `npm run generate` |
| Update blog post | `data/blog/slug.json` | `npm run generate` |
| Add navigation link | `data/site.json` | `npm run generate` |
| Change page layout | `templates/blocks/blockname.mjs` | `npm run generate` |
| Update CSS | `css/styles.css` | (no command, immediate) |
| Update JS behavior | `js/site.js` | (no command, immediate) |
| Deploy | `dist/` (auto-generated) | `npm run deploy:pages` |

## Resources

- **Docs**: `docs/` folder (README.md, ARCHITECTURE.md, DATA_FORMAT.md, etc.)
- **Templates**: `templates/blocks/`, `templates/components/`, `templates/partials/`
- **Data**: `data/site.json`, `data/pages/`, `data/blog/`
- **Styles**: `css/styles.css` (imports modules), `css/tokens.css` (tokens)
- **Scripts**: `js/site.js` (client behavior)

## Summary

1. **Understand**: Start with `docs/README.md` and `docs/ARCHITECTURE.md`
2. **Edit**: Change JSON in `data/` or templates in `templates/`
3. **Generate**: `npm run generate` (every time you edit templates)
4. **Preview**: Open the HTML in a browser
5. **Commit**: Include both source files and generated HTML
6. **Maintain**: Keep JSDoc updated; link from docs to code

---

**Always regenerate after template changes. Always commit both source and generated files.**
