# WKND Adventures — Site Guide

Reference documentation for the WKND Adventures static HTML site.

---

## Quick Links

| Document | Contents |
|---|---|
| [design-system.md](design-system.md) | Design tokens · Section styles · Grid system · Buttons · Typography |
| [components.md](components.md) | HTML patterns for every block and component |
| [page-inventory.md](page-inventory.md) | Section breakdown of every page · Usage matrix |
| [image-catalog.md](image-catalog.md) | All images with descriptions and usage tracking |
| [../AGENTS.md](../AGENTS.md) | Maintenance rules and instructions for making changes consistently |

---

## Site Overview

- **20 HTML pages**: 10 root pages + 10 blog articles under `blog/`
- **Static HTML** with a single CSS bundle (`css/styles.css`) importing 13 CSS modules
- **Fonts**: Syncopate (headings, 400/700) · Instrument Sans (body, 400–700) — local woff2 files in `fonts/`
- **No build step**: edit HTML/CSS directly; preview at `localhost:3000`

---

## File Structure

```
/
├── index.html              Homepage
├── about.html              About / Team
├── adventures.html         Adventures index
├── community.html          Community / submissions
├── destinations.html       Destinations index
├── expeditions.html        Expeditions index
├── faq.html                FAQ
├── field-notes.html        Field Notes index
├── gear.html               Gear reviews
├── sustainability.html     Sustainability
├── blog/
│   ├── alpine-cycling.html
│   ├── desert-survival-guide.html
│   ├── kayaking-norway.html
│   ├── mountain-photography.html
│   ├── patagonia-trek.html
│   ├── surfing-costa-rica.html
│   ├── ultralight-backpacking.html
│   ├── wild-swimming-guide.html
│   ├── winter-mountaineering.html
│   └── yosemite-rock-climbing.html
├── css/
│   ├── styles.css          Master import (pulls in all modules below)
│   ├── tokens.css          Design tokens (colors, type, spacing, radius)
│   ├── base.css            Reset, typography, layout utilities, editorial-index, ticker
│   ├── sections.css        Section wrappers and section-context button overrides
│   ├── navbar.css          Navbar, megamenu, mobile menu, breadcrumbs
│   ├── hero.css            Hero section and overlay variants
│   ├── button.css          Button styles and button-group
│   ├── card.css            Card, feature-card
│   ├── article-card.css    Article card, featured article, article byline
│   ├── blog-content.css    Blog layout, gallery images, pull-quote, blog prose
│   ├── faq.css             FAQ accordion
│   ├── tabs.css            Tab menu and tab panes
│   ├── footer.css          Footer and inverse-footer
│   └── forms.css           Text input, form label
├── fonts/                  woff2 font files
├── images/
│   ├── activities/         Action and sport photography
│   ├── adventures/         Location and landscape photography
│   ├── magazine/           Editorial and atmospheric photography
│   └── contributors/       Author portrait photography
├── favicon.svg
├── AGENTS.md               Maintenance instructions
└── docs/
    ├── site-guide.md       This file — overview and file structure
    ├── image-catalog.md    Photo inventory with per-image usage tracking
    ├── design-system.md    Tokens, sections, grid, buttons, typography
    ├── components.md       HTML patterns for every block
    └── page-inventory.md   Per-page section tables and usage matrix
```
