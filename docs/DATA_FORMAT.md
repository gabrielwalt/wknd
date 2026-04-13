# Data Format

JSON schema reference for all data files. See [ARCHITECTURE.md](ARCHITECTURE.md) for how these feed into the generation system.

## Site Config (`data/site.json`)

Global navigation, footer, and site-wide configuration.

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
            "desc": "Browse activities..."
          }
        ]
      },
      {
        "label": "Stories",
        "variant": "stories",
        "pageLinks": [
          { "href": "field-notes.html", "title": "Field Notes", "desc": "..." }
        ],
        "recentArticles": [
          { "href": "blog/post.html", "title": "Post Title", "desc": "..." }
        ],
        "recentArticlesLabel": "Latest Essays"
      },
      {
        "label": "Info",
        "gridClass": "nav-megamenu-grid--4",
        "links": [ /* ... */ ]
      }
    ]
  },
  "footer": {
    "columns": [
      { "heading": "Explore", "links": [ { "href": "...", "label": "..." } ] }
    ],
    "copyrightText": "© 2026 WKND Adventures",
    "closingText": "Made for the people who go."
  }
}
```

**Note**: All `href` values are stored **root-relative** (e.g., `"adventures.html"`, not `"./adventures.html"`). The `ref()` utility in templates converts these to relative paths at render time based on page depth.

## Root Page (`data/pages/*.json`)

Example: `data/pages/adventures.json`

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
      "src": "images/adventures/photo.jpg",
      "alt": "Descriptive alt text"
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
      "heading": "Article Title",
      "tag": "Category",
      "body": "Short description...",
      "image": { "src": "images/...", "alt": "..." },
      "button": { "label": "Read", "href": "blog/post.html", "variant": "primary" }
    },
    {
      "type": "faq-list",
      "heading": "Questions?",
      "items": [
        { "question": "Q?", "answer": "A." }
      ]
    },
    {
      "type": "fragment-include",
      "heading": "Browse by Activity",
      "fragmentSrc": "fragments/activity-tabs.html"
    }
  ]
}
```

**Section types** (block types):
- See `templates/blocks/` for detailed JSDoc on each block's props
- Common: `hero`, `featured-article`, `editorial-index`, `faq-list`, `tab-section`, `article-card-grid`, `feature-cards`, `cta-section`, `cta-section-inverse`, `prose-narrow`, `gallery`, `ticker`, `card-grid`, `intro`, `fragment-include`

## Blog Post (`data/blog/*.json`)

Example: `data/blog/patagonia-trek.json`

```json
{
  "meta": {
    "title": "W Circuit: 9 Days, 115 km — WKND Adventures",
    "description": "A day-by-day journal...",
    "depth": 1
  },
  "hero": {
    "variant": "blog",
    "image": {
      "src": "../images/adventures/photo.jpg",
      "alt": "..."
    },
    "breadcrumbs": [
      { "label": "Home", "href": "../index.html" },
      { "label": "Expeditions", "href": "../expeditions.html" },
      { "label": "Patagonia Trek", "href": null }
    ],
    "tag": "Expedition · Americas · Hiking",
    "heading": "W Circuit: 9 Days, 115 km, One Life-Changing Walk",
    "byline": {
      "name": "Author Name",
      "meta": "March 2024",
      "avatarSrc": "../images/contributors/author.jpg",
      "avatarAlt": "Author portrait"
    }
  },
  "articleBody": [
    {
      "type": "p",
      "text": "Opening paragraph text..."
    },
    {
      "type": "h2",
      "text": "Section Heading"
    },
    {
      "type": "figure",
      "src": "../images/adventures/photo.jpg",
      "alt": "Alt text",
      "caption": "Optional caption"
    },
    {
      "type": "blockquote",
      "text": "\"Quoted text\""
    },
    {
      "type": "ul",
      "items": ["Item 1", "Item 2"]
    },
    {
      "type": "pull-quote",
      "text": "Key insight or memorable quote",
      "attribution": "— Author or location"
    },
    {
      "type": "html",
      "html": "<custom>markup for edge cases</custom>"
    }
  ],
  "gearPullquote": {
    "gearHeading": "What We Carried",
    "gearItems": [
      "Arc'teryx Acrux: 4.2 kg",
      "MSR Zoic 2: 1.8 kg"
    ],
    "pullQuoteText": "Key quote about the gear or experience",
    "pullQuoteAttribution": "— Author(s)"
  },
  "gallery": {
    "heading": "In the Field",
    "images": [
      { "src": "../images/adventures/photo.jpg", "alt": "..." },
      { "src": "../images/adventures/photo.jpg", "alt": "..." },
      { "src": "../images/adventures/photo.jpg", "alt": "..." }
    ],
    "wideImage": {
      "src": "../images/adventures/wide-photo.jpg",
      "alt": "..."
    }
  },
  "moreStories": {
    "fragmentSrc": "../fragments/field-notes-grid.html"
  }
}
```

**Article body types**:
- `p`, `h2`, `h3` — Text blocks
- `figure` — Image with optional caption
- `blockquote`, `pull-quote` — Quoted text
- `ul` — Unordered list
- `html` — Escape hatch for custom markup

See `templates/blog/article-body.mjs` for implementation.

## Image Paths

Blog posts use relative paths starting with `../` (since they're in `/blog/`):
- Blog image: `"../images/adventures/photo.jpg"`
- Root page image: `"images/adventures/photo.jpg"`

The `ref()` utility automatically adds `../` prefix based on page depth, so **always store paths without `../` in data**.

## Common Patterns

### Button Objects
Used in hero, featured-article, cta-section, etc.

```json
{
  "label": "Button Text",
  "href": "destination.html",
  "variant": "primary|accent|ghost"
}
```

See `templates/components/button.mjs` for rendering.

### Image Objects
Used in hero, featured-article, gallery, etc.

```json
{
  "src": "images/category/filename.jpg",
  "alt": "Descriptive alt text (required for accessibility)"
}
```

Optional `href` for gallery images:
```json
{
  "src": "...",
  "alt": "...",
  "href": "destination.html"
}
```

### Link Objects
Used in featured-article, editorial-index, fragment-include, etc.

```json
{
  "href": "destination.html",
  "label": "Link Text"
}
```

## Notes on Data Entry

- All text fields support HTML except where noted (e.g., `meta.description`)
- Always provide `alt` text for images (accessibility)
- URLs are root-relative; `ref()` handles depth at render time
- `depth: 0` for root pages, `depth: 1` for blog posts
- Blog hero breadcrumbs: last item has `"href": null` (current page)

See [GENERATION.md](GENERATION.md) to regenerate after data changes.
