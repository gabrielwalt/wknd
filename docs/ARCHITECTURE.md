# Architecture

## Core Model

```
JSON Data Files          ES Module Templates        Generated HTML
──────────────          ──────────────────        ──────────────
data/site.json    ──→   templates/partials/   ──→  index.html
data/pages/*.json        templates/components/      *.html
data/blog/*.json         templates/blocks/          blog/*.html
data/fragments/  ──→   templates/page.mjs
                        templates/blog-page.mjs
```

**Principle**: Content (JSON) is separate from structure (templates). Templates are ES module functions that take data objects and return HTML strings.

## Technology Stack

- **Language**: JavaScript (ES modules)
- **Runtime**: Node.js 20+
- **No dependencies**: Plain JavaScript, no template engine or build framework
- **Build tools**: PostCSS, html-minifier-terser, terser (for dist/)

## Generation Process

`scripts/generate-html.mjs` runs through this sequence:

1. Load `data/site.json` (global nav, footer, site config)
2. For each file in `data/pages/*.json`:
   - Load page data
   - Call `renderPage(pageData, siteData)` from `templates/page.mjs`
   - Write to `pagename.html`
3. For each file in `data/blog/*.json`:
   - Load post data
   - Call `renderBlogPage(postData, siteData)` from `templates/blog-page.mjs`
   - Write to `blog/slug.html`
4. Validate all generated files for broken links

**Output**: 23 HTML files (10 root + 10 blog + 3 fragments)

## Template Hierarchy

### Partials (Page Structure)
Located: `templates/partials/`

- **`head.mjs`** — `<head>` element with metadata, title, stylesheet
- **`navbar.mjs`** — Navigation bar with megamenus and subscribe button
- **`footer.mjs`** — Footer with logo, links, copyright

These are composed into every page via `page.mjs` and `blog-page.mjs`.

### Assemblers (Page Composition)
Located: `templates/`

- **`page.mjs`** — Renders complete root page: head + navbar + hero + sections + footer
- **`blog-page.mjs`** — Renders complete blog page: head + navbar + hero + article-body + gallery + footer

Both accept `(pageData, siteData)` and pass `depth` to all child components for URL resolution.

### Components (Reusable Elements)
Located: `templates/components/`

- **`button.mjs`** — Styled anchor button (primary, accent, ghost variants)
- **`article-card.mjs`** — Article card with image, metadata, text, optional byline
- **`pull-quote.mjs`** — Blockquote with `<cite>` attribution

Used by blocks and assemblers via named exports like `renderButton(data)`.

### Blocks (Page Sections)
Located: `templates/blocks/` — 15 section renderers

Common pattern:
```javascript
export function blockName(data) {
  const { prop1, prop2, depth = 0 } = data;
  // Render using ref(url, depth) for relative paths
  return `<section>...</section>`;
}
```

**Types**: hero, featured-article, editorial-index, faq-list, tab-section, article-card-grid, feature-cards, cta-section, cta-section-inverse, prose-narrow, gallery, ticker, card-grid, intro, fragment-include

See `templates/blocks/` for JSDoc on each block's parameters and usage.

### Blog Templates
Located: `templates/blog/`

- **`article-body.mjs`** — Renders typed content blocks (p, h2, h3, figure, blockquote, pull-quote, ul, html)
- **`gear-pullquote.mjs`** — Gear list + pull quote sidebar for blog articles

### Utilities
Located: `templates/utils.mjs`

- **`ref(url, depth)`** — Depth-aware URL resolver
  - `ref('index.html', 0)` → `'index.html'` (root page)
  - `ref('index.html', 1)` → `'../index.html'` (blog page)
  - Absolute URLs and http links unchanged
- **`LOGO_ICON_SVG`** — Logo icon (inline SVG)

## URL Depth Handling

All URLs in `data/site.json` and page JSON are stored **root-relative** (no `../`). At render time:

- Root pages: `depth = 0` → URLs stay as-is
- Blog pages: `depth = 1` → URLs prefixed with `../`

All templates receive `depth` in their data and use `ref()` for any relative paths. This eliminates URL brittleness.

## HTML Improvements (Applied Globally)

These are baked into the templates, so they apply to all generated pages automatically:

| Issue | Fix | Template |
|---|---|---|
| `<a href="..."><div>label</div></a>` — invalid | Change `<div>` → `<span>` | `button.mjs`, article-card-grid, prose-narrow, etc. |
| `<div role="button">` — non-semantic | Use native `<button>` | `faq-list.mjs` |
| `<footer>` for citations — semantically wrong | Use `<cite>` | `pull-quote.mjs`, `article-body.mjs` |

## File Output

Generated `.html` files are written to source tree and committed to git. This allows:
- Devs to open pages directly in browser (no build step)
- PRs show diffs of actual HTML changes
- Fragment `<script>` loading remains synchronous at runtime

## Directory Structure

```
/app/
├── data/                          ← Content source of truth
│   ├── site.json                  ← Nav, footer, global config
│   ├── pages/                     ← 10 root page data files
│   ├── blog/                      ← 10 blog post data files
│   └── fragments/                 ← Fragment card data
├── templates/                     ← HTML generation functions
│   ├── page.mjs                   ← Root page assembler
│   ├── blog-page.mjs              ← Blog page assembler
│   ├── utils.mjs                  ← ref(), LOGO_ICON_SVG
│   ├── partials/                  ← head, navbar, footer
│   ├── components/                ← button, article-card, pull-quote
│   ├── blocks/                    ← 15 section renderers
│   └── blog/                      ← article-body, gear-pullquote
├── scripts/                       ← Build automation
│   ├── generate-html.mjs          ← JSON + templates → HTML
│   └── build-pages.mjs            ← Minify and deploy
├── css/                           ← Stylesheets (not generated)
├── js/                            ← Client-side code (not generated)
├── images/                        ← Image assets
├── docs/                          ← This documentation
├── index.html, *.html             ← Generated root pages
├── blog/*.html                    ← Generated blog pages
├── fragments/*.html               ← Generated fragments
└── dist/                          ← Built for deployment
```

## Key Design Decisions

1. **Plain JavaScript modules** — No template engine, no build complexity. One input type (data) → one output (HTML string).

2. **Generated files in source tree** — Makes diffs visible in PRs and lets devs open pages directly.

3. **Typed article body blocks** — Blog articles use structured JSON blocks (not raw HTML), so semantic fixes and improvements apply globally to all posts.

4. **Depth-aware URLs via single utility** — All relative path resolution goes through `ref()`, eliminating hardcoded `../` in data.

5. **Semantic HTML by default** — Common patterns like button structure, FAQ elements, citations are fixed once in templates and propagate everywhere.

See [CONTRIBUTING.md](CONTRIBUTING.md) for maintenance principles and [DATA_FORMAT.md](DATA_FORMAT.md) for JSON schemas.
