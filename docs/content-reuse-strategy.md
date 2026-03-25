# Content Reuse Strategy

How the WKND Adventures site handles blocks of content that appear on multiple pages without duplication.

→ Part of the [WKND Adventures Site Guide](site-guide.md)

---

## The Problem

Several sections of the site contain identical article card grids or tab menus that had to be maintained separately in every HTML file. When a new article is published, an editor would need to update the same card list in two or three places — and they would inevitably fall out of sync.

---

## The Solution: HTML Fragments

Shared content blocks are extracted into standalone HTML fragment files in the `fragments/` directory. Each page that needs that block uses a `<div data-fragment="…">` placeholder. The shared `js/site.js` script (included on every page) fetches each fragment at load time and replaces the placeholder with the returned HTML.

```html
<!-- In the page HTML (root page) -->
<div data-fragment="fragments/activity-tabs.html"></div>

<!-- In the page HTML (blog page, one level down) -->
<div data-fragment="../fragments/field-notes-grid.html"></div>

<!-- fragments/activity-tabs.html contains the full tab block -->
```

Tab panes inside fragments (e.g. `activity-tabs.html`) work automatically: `js/site.js` binds tab and FAQ behaviour with event delegation on `document`, so no per-injection re-init is required.

---

## Fragment Path Rules

Fragment files use **absolute root-relative paths** (starting with `/`) for all `src` and `href` attributes, so they render correctly whether loaded from a root page or a blog page:

- Images: `src="/images/activities/ice-climbing.jpg"` ✓
- Article links: `href="/blog/patagonia-trek.html"` ✓

The `data-fragment` attribute on the **page** is a relative path to the fragment file:

- Root pages (`index.html`, `expeditions.html`, etc.): `data-fragment="fragments/name.html"`
- Blog pages (`blog/article.html`): `data-fragment="../fragments/name.html"`

---

## Current Fragments

### `fragments/activity-tabs.html`

**What it is**: The 4-tab activity browser (Climbing · Water · Cycling · Hiking) with 3 article cards per tab. All 10 blog articles are featured across the tabs (with intentional overlap between tabs).

**Used on**:
| Page | Section heading |
|---|---|
| `index.html` | Browse by Activity |
| `adventures.html` | Browse by Activity |
| `field-notes.html` | Essential Reading |
| `expeditions.html` | Full Accounts |
| `gear.html` | Gear Features |

**When to update**: When a new article is published and should surface in one of the activity tabs. Edit `fragments/activity-tabs.html` once — all five pages reflect the change immediately.

**Tab order and canonical card list**:
| Tab | Cards (in order) |
|---|---|
| Climbing | winter-mountaineering · patagonia-trek · yosemite-rock-climbing |
| Water | wild-swimming-guide · kayaking-norway · surfing-costa-rica |
| Cycling | alpine-cycling · mountain-photography · ultralight-backpacking |
| Hiking | patagonia-trek · ultralight-backpacking · desert-survival-guide |

---

### `fragments/expeditions-grid.html`

**What it is**: The 3-card grid of flagship expedition reports (Patagonia W Circuit · Lofoten Islands · High Alps by Bike).

**Used on**:
| Page | Section heading | Match |
|---|---|---|
| `expeditions.html` | Our Expeditions | Exact |
| `destinations.html` | Essential Route Reports | Exact |
| `destinations.html` | Europe | Same 3 expedition cards (replaces former europe-routes grid) |
| `destinations.html` | High Altitude | Closest available (patagonia + alps fit; lofoten is a stretch) |
| `faq.html` | Most popular starting points | Same expedition trio as elsewhere |
| `sustainability.html` | Places That Need Our Care | 2/3 match (patagonia + kayaking) |
| `adventures.html` | Recent Reports | Expedition reports alongside activity content |
| `community.html` | From the Wild | Expedition dispatches |
| `blog/winter-mountaineering.html` | More Stories | Cross-promote expedition reading |
| `blog/desert-survival-guide.html` | More Stories | Cross-promote expedition reading |
| `blog/mountain-photography.html` | More Stories | Cross-promote expedition reading |
| `blog/ultralight-backpacking.html` | More Stories | Cross-promote expedition reading |
| `blog/wild-swimming-guide.html` | More Stories | Cross-promote expedition reading |

**When to update**: When a new expedition article is published and should replace one of these three cards. Edit the fragment once — all pages update.

**Canonical articles**: patagonia-trek · kayaking-norway · alpine-cycling

---

### `fragments/field-notes-grid.html`

**What it is**: The 3-card grid of key field notes / skills articles (Mountain Photography · Ultralight Backpacking · Desert Survival Guide).

**Used on**:
| Page | Section heading | Match |
|---|---|---|
| `about.html` | From Our Editors | Exact |
| `destinations.html` | Americas | Skills and essays alongside destination content |
| `blog/patagonia-trek.html` | More Stories | Cross-promote skills reading after expedition |
| `blog/kayaking-norway.html` | More Stories | Cross-promote skills reading after expedition |
| `blog/alpine-cycling.html` | More Stories | Cross-promote skills reading after expedition |
| `blog/surfing-costa-rica.html` | More Stories | Skills pair well with activity guides |
| `blog/yosemite-rock-climbing.html` | More Stories | Skills pair well with activity guides |

**When to update**: When a new field notes or gear article should replace one of these three cards. Edit the fragment once — all pages update.

**Canonical articles**: mountain-photography · ultralight-backpacking · desert-survival-guide

---

## What Is NOT a Fragment

The following are intentionally kept as inline page content:

- **Navbar and footer** — identical across all 20 pages but duplicated by design (no server-side include system); change them with search-and-replace across all files.
- **"In the Field" gallery sections** — deliberately different on every page; see AGENTS.md.
- **"Gear by Activity" tabs on gear.html** — a completely different tab structure (with intro text blocks per tab) from the activity-tabs fragment; kept inline.
- **"Reader Dispatches" on community.html** — unique reader-submitted editorial content; not linked blog articles.
- **Article cards inside root-page tab panes** (e.g. `gear.html`, `sustainability.html`) — those grids are part of page-specific tab layouts, not shared with blog posts.

---

## Site script (`js/site.js`)

Every HTML page includes the shared bundle at the end of `<body>`:

- Root pages: `<script src="js/site.js" defer></script>`
- Blog pages: `<script src="../js/site.js" defer></script>`

That file handles mobile nav, megamenu (mobile accordion + desktop hover delay), `[data-tabs]` tab switching (delegated, including tabs inside injected fragments), FAQ accordions, and `[data-fragment]` loading. When adding a new page, copy this script tag from a peer page at the same directory depth.

---

## Adding a New Fragment

1. Identify the repeated block and confirm it appears on ≥ 2 pages with the same content intent.
2. Create `fragments/your-fragment-name.html` containing only the inner HTML (no `<html>`, `<head>`, or `<body>` tags).
3. Use **absolute paths** in the fragment: `src="/images/…"` and `href="/blog/…"` — this ensures correctness whether the fragment is loaded from a root page or a blog page.
4. Replace the inline block on each page with `<div data-fragment="fragments/your-fragment-name.html"></div>` (root pages) or `<div data-fragment="../fragments/your-fragment-name.html"></div>` (blog pages).
5. Ensure the page already includes `js/site.js` (or `../js/site.js` for blog pages) — all current pages do; new pages must match.
6. Add an entry to this document's **Current Fragments** table.

## Removing or Renaming a Fragment

1. Before deleting a fragment file, `grep -r 'your-fragment-name' --include='*.html' .` to find every page that references it.
2. On each referencing page, replace `<div data-fragment="…"></div>` with the inline HTML content.
3. No change to `js/site.js` is required when a page stops using fragments; the loader no-ops if there are no `[data-fragment]` placeholders.
4. Delete the fragment file and remove its entry from this document.
