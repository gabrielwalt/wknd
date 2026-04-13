# WKND Adventures — Documentation

A complete reference for understanding and maintaining the WKND Adventures project.

## Quick Navigation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — How the system works: JSON data + template modules → HTML generation
- **[DATA_FORMAT.md](DATA_FORMAT.md)** — JSON schema reference for site data, pages, and blog posts
- **[GENERATION.md](GENERATION.md)** — Build process, npm scripts, and deployment
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** — CSS tokens, section styles, typography, grid system
- **[VISUAL_GUIDE.md](VISUAL_GUIDE.md)** — Design philosophy, colors, spacing, interactions
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — How to maintain the project and documentation

## Quick Start

The site is **generated from JSON data + ES module templates**.

```bash
# Make content changes
edit data/pages/*.json or data/blog/*.json

# Regenerate HTML
npm run generate

# Build for deployment (minify)
npm run build:pages
```

For detailed workflows, see [GENERATION.md](GENERATION.md).

## Key Files

- **Data**: `data/site.json`, `data/pages/`, `data/blog/`, `data/fragments/`
- **Templates**: `templates/partials/`, `templates/components/`, `templates/blocks/`, `templates/blog/`
- **Assembly**: `templates/page.mjs` (root pages), `templates/blog-page.mjs` (blog)
- **Styles**: `css/styles.css` (imports all modules)
- **Scripts**: `js/site.js` (client-side behavior)

## Code Documentation

All template functions are self-documented via JSDoc comments. See the source files in `templates/` for detailed parameter specs, examples, and notes. References from the docs below link directly to the code.

## For Different Roles

- **Developers**: Start with [ARCHITECTURE.md](ARCHITECTURE.md), then [CONTRIBUTING.md](CONTRIBUTING.md)
- **Content editors**: See [DATA_FORMAT.md](DATA_FORMAT.md) for how to structure JSON
- **Designers/stakeholders**: See [VISUAL_GUIDE.md](VISUAL_GUIDE.md) and [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
