# WKND Adventures — Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Directory Structure](#directory-structure)
4. [How It Works](#how-it-works)
5. [Data Format](#data-format)
6. [Component Reference](#component-reference)
7. [Template System](#template-system)
8. [Build & Generation](#build--generation)
9. [Development Workflow](#development-workflow)
10. [Semantic Improvements](#semantic-improvements)
11. [Common Tasks](#common-tasks)

---

## Project Overview

**WKND Adventures** is a static site generator for an outdoor adventure publication. The site consists of:

- **10 root pages**: index, adventures, expeditions, field-notes, gear, sustainability, about, community, destinations, faq
- **10 blog posts**: detailed expedition reports, gear guides, and adventure narratives
- **3 fragments**: reusable HTML sections loaded dynamically (activity tabs, expedition grids, field notes)

The site is **generated at build time from JSON data + ES module templates**, not hand-written HTML. This eliminates duplication, ensures consistency, and makes maintenance simple.

---

## Architecture

### The Core Model

```
JSON Data Files          ES Module Templates        Generated HTML
──────────────          ──────────────────        ──────────────
data/site.json    ──→   templates/partials/   ──→  index.html
data/pages/*.json        templates/components/      *.html
data/blog/*.json         templates/blocks/          blog/*.html
data/fragments/  ──→   templates/page.mjs
                        templates/blog-page.mjs
```

**Key principle**: Content (JSON) is separate from structure (templates). Templates are functions that take data and return HTML strings.

### Technology Stack

- **Language**: JavaScript (ES modules)
- **Runtime**: Node.js 20+
- **No dependencies**: Templates use plain JavaScript — no template engine
- **Build tools**: PostCSS, html-minifier, terser (for dist/ output)

### URL Depth Handling

All templates use a depth-aware `ref()` function for relative URLs:

```javascript
import { ref } from '../utils.mjs';

// At depth 0 (root pages):
ref('blog/post.html', 0)  // → 'blog/post.html'
ref('css/styles.css', 0)  // → 'css/styles.css'

// At depth 1 (blog pages):
ref('blog/post.html', 1)  // → '../blog/post.html'
ref('css/styles.css', 1)  // → '../css/styles.css'

// Absolute URLs unchanged:
ref('/index.html', 1)     // → '/index.html'
ref('https://...', 1)     // → 'https://...'
```

---

## Directory Structure

```
/app/
├── data/                          ← Content source of truth
│   ├── site.json                  ← Nav, footer, global config
│   ├── pages/                     ← Root page data (10 files)
│   │   ├── index.json
│   │   ├── adventures.json
│   │   ├── expeditions.json
│   │   ├── field-notes.json
│   │   ├── gear.json
│   │   ├── sustainability.json
│   │   ├── about.json
│   │   ├── community.json
│   │   ├── destinations.json
│   │   └── faq.json
│   ├── blog/                      ← Blog post data (10 files)
│   │   ├── patagonia-trek.json
│   │   ├── kayaking-norway.json
│   │   ├── alpine-cycling.json
│   │   ├── mountain-photography.json
│   │   ├── ultralight-backpacking.json
│   │   ├── desert-survival-guide.json
│   │   ├── surfing-costa-rica.json
│   │   ├── wild-swimming-guide.json
│   │   ├── winter-mountaineering.json
│   │   └── yosemite-rock-climbing.json
│   └── fragments/                 ← Fragment card data
│       ├── activity-tabs.json
│       ├── expeditions-grid.json
│       └── field-notes-grid.json
│
├── templates/                     ← HTML generation functions
│   ├── page.mjs                   ← Root page assembler
│   ├── blog-page.mjs              ← Blog page assembler
│   ├── utils.mjs                  ← Shared utilities (ref, SVG icon)
│   ├── partials/                  ← Page structure blocks
│   │   ├── head.mjs               ← <head> element
│   │   ├── navbar.mjs             ← Navigation bar
│   │   └── footer.mjs             ← Footer
│   ├── components/                ← Reusable elements
│   │   ├── button.mjs             ← Button rendering (uses <span>)
│   │   ├── article-card.mjs       ← Article card
│   │   └── pull-quote.mjs         ← Pull quote (uses <cite>)
│   ├── blocks/                    ← Section renderers (14 types)
│   │   ├── hero.mjs               ← Hero section (full, blog variants)
│   │   ├── featured-article.mjs   ← Featured article box
│   │   ├── editorial-index.mjs    ← Numbered editorial items
│   │   ├── faq-list.mjs           ← FAQ section (uses native <button>)
│   │   ├── tab-section.mjs        ← Tab container
│   │   ├── article-card-grid.mjs  ← Grid of article cards
│   │   ├── feature-cards.mjs      ← Feature card grid
│   │   ├── cta-section.mjs        ← Call-to-action section
│   │   ├── cta-section-inverse.mjs ← Inverse CTA ("Start Here")
│   │   ├── prose-narrow.mjs       ← Narrow prose column
│   │   ├── gallery.mjs            ← Image gallery
│   │   ├── ticker.mjs             ← Ticker strip
│   │   ├── card-grid.mjs          ← Generic card grid
│   │   ├── intro.mjs              ← Intro section
│   │   └── fragment-include.mjs   ← Fragment loader
│   └── blog/                      ← Blog-specific renderers
│       ├── article-body.mjs       ← Typed block renderer for article content
│       └── gear-pullquote.mjs     ← Gear list + pull quote sidebar
│
├── scripts/                       ← Build scripts
│   ├── generate-html.mjs          ← JSON + templates → HTML
│   └── build-pages.mjs            ← Minify and deploy
│
├── css/                           ← Stylesheet (not modified by generation)
│   └── styles.css
│
├── js/                            ← Client-side code (not modified)
│   └── site.js
│
├── images/                        ← Image assets
│
├── index.html                     ← Generated (root page)
├── about.html                     ← Generated
├── *.html                         ← Generated pages
│
├── blog/                          ← Generated blog directory
│   ├── patagonia-trek.html        ← Generated
│   └── *.html                     ← Generated posts
│
├── fragments/                     ← Generated fragments
│   ├── activity-tabs.html         ← Generated
│   └── *.html                     ← Generated fragments
│
├── dist/                          ← Built for deployment (minified)
│   └── [same structure, minified]
│
├── package.json                   ← NPM scripts
├── .gitignore
└── DOCUMENTATION.md               ← This file
```

---

## How It Works

### 1. Generation Process (npm run generate)

The `scripts/generate-html.mjs` script orchestrates HTML generation:

```javascript
// Step 1: Load site-wide data
const siteData = loadJSON('data/site.json');

// Step 2: Generate root pages
for each file in data/pages/*.json:
  pageData = loadJSON(file)
  html = renderPage(pageData, siteData)
  writeFile(pageName + '.html', html)

// Step 3: Generate blog pages
for each file in data/blog/*.json:
  postData = loadJSON(file)
  html = renderBlogPage(postData, siteData)
  writeFile('blog/' + slug + '.html', html)

// Step 4: Generate fragments
for each file in data/fragments/*.json:
  // Fragments currently not rendered via template
  // (loaded by JS at runtime instead)
```

**Output**: 23 HTML files (10 root + 10 blog + 3 fragments)

### 2. Page Assembly (templates/page.mjs)

The `renderPage()` function assembles a root page:

```javascript
export function renderPage(pageData, siteData) {
  const { meta, hero: heroData, sections = [] } = pageData;
  const depth = meta.depth || 0;

  // Render each section using its block renderer
  const sectionsHtml = sections.map(section => {
    const renderer = blockRenderers[section.type];
    return renderer({ ...section, depth });
  }).join('\n\n');

  // Assemble full page
  return `<!doctype html>
<html lang="en">
  ${head(meta)}
  <body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    ${navbar(siteData, depth)}
    <main id="main-content">
      ${heroData ? hero({ ...heroData, depth }) : ''}
      ${sectionsHtml}
    </main>
    ${footer(siteData, depth)}
    <script src="${depth === 0 ? 'js/site.js' : '../js/site.js'}" defer></script>
  </body>
</html>`;
}
```

**Key points**:
- `sections` are typed blocks with a `type` property
- Each block type has a dedicated renderer function
- `depth` is passed to all components for URL resolution
- Navbar and footer are global (from `siteData`)

### 3. Blog Page Assembly (templates/blog-page.mjs)

Blog pages use a similar pattern but with `renderBlogPage()`:

```javascript
export function renderBlogPage(postData, siteData) {
  const { hero: heroData, articleBody = [], gearPullquote: gearPullquoteData, ... } = postData;
  const depth = 1; // Blog pages are always at depth 1

  const articleBodyHtml = renderArticleBody(articleBody);
  // ... compose article body, gear/pullquote, gallery, etc.

  return `<!doctype html> ... ${articleBodyHtml} ... </html>`;
}
```

**Key difference**: `articleBody` is an array of typed blocks (p, h2, blockquote, figure, etc.), not HTML.

### 4. Block Rendering

Each block type is a simple function:

```javascript
// Example: featured-article.mjs
export function featuredArticle(data) {
  const { heading, tag, body, image, button } = data;
  return `<section class="section secondary-section">
  <div class="container">
    <div class="featured-article">
      <div class="featured-article-image">
        <img src="${image.src}" alt="${image.alt}" loading="lazy" />
      </div>
      <div>
        <div class="tag">${tag}</div>
        <h2 class="h2-heading">${heading}</h2>
        <p class="paragraph-lg utility-text-secondary utility-margin-bottom-lg">${body}</p>
        <div class="featured-article-footer">
          <a href="${button.href}" class="button"><span class="button-label">${button.label}</span></a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}
```

**Patterns**:
- Take `data` object as single parameter
- Extract only needed properties
- Return complete HTML string for the section
- Use `ref()` for any URLs if depth needed
- Use semantic components (e.g., `renderButton()`) for shared elements

---

## Data Format

### 1. Site-Wide Data (data/site.json)

Global nav, footer, and site configuration:

```json
{
  "nav": {
    "logoHref": "index.html",
    "subscribeHref": "community.html",
    "megamenus": [
      {
        "label": "Explore",
        "gridClass": "nav-megamenu-grid--3",
        "links": [
          {
            "href": "adventures.html",
            "title": "Adventures",
            "desc": "Hiking, climbing, surfing, cycling. Browse all activities and find your next route."
          }
          // ... more links
        ]
      },
      {
        "label": "Stories",
        "variant": "stories",
        "pageLinks": [ /* ... */ ],
        "recentArticles": [ /* ... */ ]
      }
    ]
  },
  "footer": {
    "tagline": "Bold Stories. Real Life. Wild Places...",
    "copyrightYear": 2026,
    "columns": [
      {
        "heading": "Explore",
        "links": [ /* ... */ ]
      }
      // ... more columns
    ]
  }
}
```

### 2. Root Page Data (data/pages/*.json)

Structure for a typical root page:

```json
{
  "meta": {
    "title": "Adventures — WKND Adventures",
    "description": "World-class routes, from day hikes to multi-week expeditions.",
    "depth": 0
  },
  "hero": {
    "variant": "full",
    "image": {
      "src": "images/adventures/adobestock-196967522.jpg",
      "alt": "Wild adventure landscape"
    },
    "overlay": "overlay",
    "eyebrow": "WKND Adventures",
    "heading": "Adventures",
    "lead": "Routes, guides, and trip reports for every kind of wild.",
    "buttons": [
      {
        "label": "Browse All",
        "href": "#browse-by-activity",
        "variant": "primary"
      }
    ]
  },
  "sections": [
    {
      "type": "featured-article",
      "heading": "Lofoten Islands: Arctic Surfing at the Top of the World",
      "tag": "Surfing",
      "body": "Few surf destinations on Earth compress so much drama...",
      "image": {
        "src": "images/magazine/surfer-wave-02.jpg",
        "alt": "Cold Atlantic swell rolling through the Lofoten Islands, Norway"
      },
      "button": {
        "label": "Read Adventure",
        "href": "blog/kayaking-norway.html"
      }
    },
    {
      "type": "fragment-include",
      "heading": "Browse by Activity",
      "fragmentSrc": "fragments/activity-tabs.html"
    },
    {
      "type": "faq-list",
      "heading": "Quick Answers",
      "items": [
        {
          "question": "Who is WKND Adventures for?",
          "answer": "WKND Adventures is built for anyone serious about the outdoors..."
        }
      ]
    }
    // ... more sections
  ]
}
```

**Section types** (block types):
- `hero` — Hero banner with image and buttons
- `featured-article` — Featured article box with image
- `editorial-index` — Numbered editorial sections
- `faq-list` — FAQ accordion (uses native `<button>` elements)
- `tab-section` — Tabbed content
- `article-card-grid` — Grid of article cards
- `feature-cards` — Feature card layout
- `cta-section` — Call-to-action section
- `cta-section-inverse` — Inverse CTA (e.g., "Start Here")
- `prose-narrow` — Narrow prose column
- `gallery` — Image gallery
- `ticker` — Ticker strip (activity list)
- `card-grid` — Generic card grid
- `intro` — Intro section
- `fragment-include` — Load an HTML fragment

### 3. Blog Post Data (data/blog/*.json)

Blog posts use typed content blocks:

```json
{
  "meta": {
    "title": "W Circuit: 9 Days, 115 km — WKND Adventures",
    "description": "A day-by-day journal of the W Circuit in Torres del Paine...",
    "depth": 1
  },
  "hero": {
    "variant": "blog",
    "image": {
      "src": "../images/adventures/adobestock-231698835.jpg",
      "alt": "Trekker on a high mountain trail, dramatic peaks behind"
    },
    "breadcrumbs": [
      { "text": "Home", "href": "../index.html" },
      { "text": "Expeditions", "href": "../expeditions.html" },
      { "text": "Patagonia Trek", "href": null }
    ],
    "tag": "Expedition · Americas · Hiking",
    "heading": "W Circuit: 9 Days, 115 km, One Life-Changing Walk",
    "byline": {
      "name": "",
      "meta": "",
      "avatar": "../images/contributors/alex-iby-343837.jpg"
    }
  },
  "articleBody": [
    {
      "type": "p",
      "text": "We planned this trip for eleven months..."
    },
    {
      "type": "h2",
      "text": "Days 1–2: Into the Park"
    },
    {
      "type": "blockquote",
      "text": "\"By day four we had stopped asking when it would stop raining.\""
    },
    {
      "type": "figure",
      "src": "../images/adventures/patagonia-1.jpg",
      "alt": "Torres del Paine from Laguna Amarga",
      "caption": "Torres del Paine from Laguna Amarga trailhead"
    },
    {
      "type": "ul",
      "items": ["Item 1", "Item 2"]
    },
    {
      "type": "pull-quote",
      "text": "The real journey happens in your legs, your lungs, and your ability to sit with discomfort.",
      "attribution": "— Morgan L."
    }
  ],
  "gearPullquote": {
    "gearHeading": "What We Carried",
    "gearItems": [
      "Arc'teryx Acrux: 4.2 kg",
      "MSR Zoic 2: 1.8 kg"
    ],
    "pullQuoteText": "\"The condor worked the thermals for twenty minutes above us and didn't once acknowledge we were there. That felt like the right relationship.\"",
    "pullQuoteAttribution": "— Jordan M. & Morgan L."
  },
  "gallery": {
    "heading": "In the Field",
    "images": [
      {
        "src": "../images/adventures/patagonia-2.jpg",
        "alt": "Glacial lake below Torres del Paine"
      }
    ]
  },
  "moreStories": {
    "fragmentSrc": "../fragments/field-notes-grid.html"
  }
}
```

**Article body block types**:
- `p` — Paragraph
- `h2`, `h3` — Headings
- `blockquote` — Blockquote
- `figure` — Image with caption
- `ul` — Unordered list
- `ol` — Ordered list
- `pull-quote` — Styled pull quote (uses `<cite>` for attribution)
- `html` — Escape hatch for custom markup

---

## Component Reference

**All template functions are self-documenting via JSDoc comments.** For detailed parameter listings and usage examples, see the JSDoc in the source files. This section provides a quick inventory.

### Template Inventory

The site uses **26 reusable template functions**:

| Category | Count | Location | Files |
|----------|-------|----------|-------|
| Partials (page structure) | 3 | `templates/partials/` | head, navbar, footer |
| Components (reusable UI) | 3 | `templates/components/` | button, article-card, pull-quote |
| Blocks (page sections) | 15 | `templates/blocks/` | hero, featured-article, editorial-index, faq-list, tab-section, article-card-grid, feature-cards, cta-section, cta-section-inverse, prose-narrow, gallery, ticker, card-grid, intro, fragment-include |
| Blog templates | 2 | `templates/blog/` | article-body, gear-pullquote |
| Assemblers (page composition) | 2 | `templates/` | page, blog-page |
| Utilities | 1 | `templates/` | utils (ref, LOGO_ICON_SVG) |

### Quick Block Reference

| Block Name | Purpose | JSDoc File |
|---|---|---|
| `hero` | Full-height hero with image overlay | `templates/blocks/hero.mjs` |
| `featured-article` | Featured article box with CTA button | `templates/blocks/featured-article.mjs` |
| `editorial-index` | Numbered editorial items | `templates/blocks/editorial-index.mjs` |
| `faq-list` | FAQ accordion with native `<button>` elements | `templates/blocks/faq-list.mjs` |
| `tab-section` | Tabbed content with card grids | `templates/blocks/tab-section.mjs` |
| `article-card-grid` | 3-column grid of article cards | `templates/blocks/article-card-grid.mjs` |
| `feature-cards` | 3-column feature highlights | `templates/blocks/feature-cards.mjs` |
| `cta-section` | Call-to-action with accent background | `templates/blocks/cta-section.mjs` |
| `cta-section-inverse` | CTA with dark background | `templates/blocks/cta-section-inverse.mjs` |
| `prose-narrow` | Narrow text column for articles | `templates/blocks/prose-narrow.mjs` |
| `gallery` | 3-column image gallery + wide image | `templates/blocks/gallery.mjs` |
| `ticker` | Animated text ticker (decorative) | `templates/blocks/ticker.mjs` |
| `card-grid` | 2-column flexible card layout | `templates/blocks/card-grid.mjs` |
| `intro` | Large centered introductory text | `templates/blocks/intro.mjs` |
| `fragment-include` | Load external HTML fragment at runtime | `templates/blocks/fragment-include.mjs` |

### Quick Component Reference

| Component | Purpose | JSDoc File |
|---|---|---|
| `renderButton()` | Styled anchor button | `templates/components/button.mjs` |
| `renderArticleCard()` | Article card (image + metadata + text) | `templates/components/article-card.mjs` |
| `renderPullQuote()` | Styled blockquote with `<cite>` attribution | `templates/components/pull-quote.mjs` |

### Quick Partial Reference

| Partial | Purpose | JSDoc File |
|---|---|---|
| `head()` | `<head>` element with metadata & links | `templates/partials/head.mjs` |
| `navbar()` | Site navigation with megamenus | `templates/partials/navbar.mjs` |
| `footer()` | Site footer with links & copyright | `templates/partials/footer.mjs` |

---

## Template System

### Template Functions

Every template is an ES module exporting a function:

```javascript
export function blockName(data) {
  const { prop1, prop2, depth = 0 } = data;
  return `<html>...</html>`;
}
```

**Conventions**:
- Single `data` parameter (object destructuring)
- Always extract `depth` if using URLs
- Return complete HTML string for the block
- Use `ref()` for all relative URLs

### Depth-Aware URLs (utils.mjs)

The `ref()` helper ensures correct relative paths:

```javascript
import { ref } from '../utils.mjs';

export function button({ href, label, variant = 'primary' }) {
  return `<a href="${href}" class="${cls}"><span class="button-label">${label}</span></a>`;
  // href is NOT adjusted by ref() — it comes from data already correct
}

// But in navbar (which needs depth):
export function navbar(siteData, depth) {
  return `
    <a href="${ref('index.html', depth)}">Home</a>
    <a href="${ref('adventures.html', depth)}">Adventures</a>
  `;
  // depth 0: 'index.html', 'adventures.html'
  // depth 1: '../index.html', '../adventures.html'
}
```

### Semantic Components

Reusable component renderers in `templates/components/`:

```javascript
// button.mjs
export function renderButton({ href, label, variant = 'primary' }) {
  const cls = variant === 'accent'  ? 'accent-button'
            : variant === 'ghost'   ? 'button--ghost'
            : 'button';
  return `<a href="${href}" class="${cls}"><span class="button-label">${label}</span></a>`;
}

// Used in blocks:
import { renderButton } from '../components/button.mjs';
const buttonsHtml = buttons.map(btn => renderButton(btn)).join('\n');
```

---

## Build & Generation

### Scripts

**scripts/generate-html.mjs** — Generate HTML from JSON data

```bash
npm run generate
```

Reads all JSON files and generates 23 HTML files:
- 10 root pages: `index.html`, `about.html`, etc.
- 10 blog pages: `blog/*.html`
- 3 fragments: `fragments/*.html`

**scripts/build-pages.mjs** — Minify and prepare for deployment

```bash
npm run build:pages
```

Runs `npm run generate` first, then:
1. Minifies HTML with `html-minifier-terser`
2. Minifies CSS with `cssnano`
3. Minifies JS with `terser`
4. Outputs to `dist/` directory

**Deployment**:

```bash
npm run deploy:pages
```

Runs `npm run build:pages`, then deploys `dist/` to GitHub Pages using `gh-pages`.

---

## Development Workflow

### Making Content Changes

**To update content** (text, images, links):

1. Edit the relevant JSON file in `data/`:
   - Root page: `data/pages/pagename.json`
   - Blog post: `data/blog/slug.json`
   - Site-wide: `data/site.json`

2. Regenerate HTML:
   ```bash
   npm run generate
   ```

3. Verify in browser (pages are ready to view immediately)

4. Commit changes to git:
   ```bash
   git add data/ *.html blog/ fragments/
   git commit -m "Update [content description]"
   ```

### Adding a New Page

1. Create `data/pages/pagename.json`:
   ```json
   {
     "meta": {
       "title": "Page Title — WKND Adventures",
       "description": "...",
       "depth": 0
     },
     "hero": { /* ... */ },
     "sections": [ /* ... */ ]
   }
   ```

2. Generate:
   ```bash
   npm run generate
   ```
   Creates `pagename.html`

3. Link to it from `data/site.json` nav or other pages

### Adding a New Blog Post

1. Create `data/blog/slug.json`:
   ```json
   {
     "meta": { "title": "...", "description": "...", "depth": 1 },
     "hero": { "variant": "blog", ... },
     "articleBody": [ /* typed blocks */ ],
     "gearPullquote": { /* ... */ },
     "gallery": { /* ... */ }
   }
   ```

2. Generate:
   ```bash
   npm run generate
   ```
   Creates `blog/slug.html`

3. Add to recent articles in `data/site.json` nav

### Template Changes

To modify structure or styling:

1. Edit template in `templates/`:
   - Block renderer: `templates/blocks/blockname.mjs`
   - Partial: `templates/partials/head.mjs`, `navbar.mjs`, `footer.mjs`
   - Component: `templates/components/button.mjs`, etc.

2. Regenerate:
   ```bash
   npm run generate
   ```

3. Changes apply to all pages automatically

### CSS and JS Changes

These are **not** generated. Edit directly:

- `css/styles.css` — Styling
- `js/site.js` — Client-side behavior

---

## Semantic Improvements

The generated HTML includes intentional improvements over the original. These are applied **globally through templates**, so they're consistent everywhere.

### 1. Button Structure

**Original**: `<a href="..."><div class="button-label">text</div></a>`
**Generated**: `<a href="..."><span class="button-label">text</span></a>`

**Why**: Invalid HTML. Block-level `<div>` should not be inside `<a>`. `<span>` is inline and valid.

**Location**: `templates/components/button.mjs` — applies to all buttons site-wide

### 2. FAQ Questions

**Original**: `<div class="faq-question" role="button" tabindex="0">`
**Generated**: `<button class="faq-question" aria-expanded="false">`

**Why**: Native semantic HTML. `<button>` is interactive; `<div role="button">` is ARIA emulation. Native elements are better for accessibility and keyboard behavior.

**Location**: `templates/blocks/faq-list.mjs` — applies to all FAQ sections

### 3. Pull-Quote Attribution

**Original**: `<footer>attribution text</footer>`
**Generated**: `<cite class="pull-quote-attribution">attribution text</cite>`

**Why**: `<cite>` is semantic for quotation sources. `<footer>` is for page/article footers, not citations.

**Location**: `templates/components/pull-quote.mjs` and `templates/blog/article-body.mjs` — applies to all pull quotes

---

## Common Tasks

### Task: Update the Homepage Hero

Edit `data/pages/index.json`:

```json
{
  "hero": {
    "heading": "New Heading",
    "lead": "New lead text",
    "buttons": [
      {
        "label": "New Button",
        "href": "path.html",
        "variant": "accent"
      }
    ]
  }
}
```

Run `npm run generate`.

### Task: Add an FAQ Item

Edit `data/pages/faq.json`:

```json
{
  "sections": [
    {
      "type": "faq-list",
      "items": [
        {
          "question": "New question?",
          "answer": "New answer text."
        }
      ]
    }
  ]
}
```

Run `npm run generate`.

### Task: Update Navigation Links

Edit `data/site.json`:

```json
{
  "nav": {
    "megamenus": [
      {
        "label": "Explore",
        "links": [
          { "href": "new-page.html", "title": "New Page", "desc": "..." }
        ]
      }
    ]
  }
}
```

Run `npm run generate` — updates navbar on all 20+ pages.

### Task: Change a Section's Styling

Edit the block renderer in `templates/blocks/blockname.mjs`:

```javascript
export function blockName(data) {
  // Modify the HTML class, structure, etc.
  return `<section class="new-class"> ... </section>`;
}
```

Run `npm run generate` — styling applied to all pages using that block.

### Task: Add a New Blog Post

1. Create `data/blog/my-post.json`
2. Add to recent articles in `data/site.json`
3. Run `npm run generate`
4. Commit files

### Task: Deploy to Production

```bash
npm run deploy:pages
```

This will:
1. Generate all HTML
2. Minify CSS, JS, HTML
3. Output to `dist/`
4. Push to GitHub Pages

---

## File Inventory

### Critical Files (Don't Edit)

- Generated HTML files: `*.html`, `blog/*.html` (regenerated on `npm run generate`)
- Fragments: `fragments/*.html` (regenerated on `npm run generate`)

**Rule**: Edit JSON + templates only. Never hand-edit `.html` files.

### Edit These Files

**Content**: `data/*.json`, `data/pages/*.json`, `data/blog/*.json`
**Structure**: `templates/**/*.mjs`
**Styling**: `css/styles.css`
**Behavior**: `js/site.js`

### Generated Files (Auto-Updated)

- All `.html` files at root level
- All files in `blog/`
- All files in `fragments/`

---

## Troubleshooting

### Generation Fails with JSON Error

**Symptom**: `Error loading data/pages/index.json: Unexpected token`

**Solution**: Check JSON syntax. Use `node -c data/pages/index.json` to validate.

### Missing Section on Generated Page

**Symptom**: A section that's in another page is missing from this one.

**Solution**: Check the JSON file. Make sure the section is in the `sections` array with the correct `type`.

### URLs Are Wrong (404s)

**Symptom**: Links are broken or incorrect.

**Solution**: Check `depth` in `meta.depth`. Root pages should be `"depth": 0`, blog pages `"depth": 1`. Use `ref()` in templates for relative URLs.

### CSS/JS Not Updating

**Symptom**: Changes to `css/` or `js/` don't appear.

**Solution**: These files are not regenerated. They're static. Clear browser cache and reload.

---

## Summary

WKND Adventures is a data-driven static site generator:

1. **Data** lives in JSON files (`data/`)
2. **Structure** lives in templates (`templates/`)
3. **HTML** is generated at build time (`npm run generate`)
4. **CSS and JS** are static assets (edit directly)
5. **Deployment** is automated (`npm run deploy:pages`)

This model ensures:
- **No duplication** — shared structure lives in one place
- **Consistency** — semantic improvements apply everywhere
- **Maintainability** — changes are simple and traceable
- **Version control** — both data and generated HTML are committed to git

For questions or changes, edit the JSON or templates, then regenerate.
