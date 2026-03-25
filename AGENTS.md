# AGENTS — Maintenance Instructions

Guidelines for making changes to the WKND Adventures site consistently and without breaking the design system.

Read the [Site Guide](docs/site-guide.md) and linked docs before making structural changes.

---

## Core Principles

1. **Never hardcode design values.** Always use CSS custom properties from `css/tokens.css` for colors, spacing, radius, and typography. Adding `color: #e8651a` is wrong; `color: var(--color-amber)` is right.

2. **Reuse existing components.** Every visual pattern on this site is already built. Before writing new HTML structures, check [docs/components.md](docs/components.md) for the canonical pattern. Inventing new layout primitives creates inconsistency.

3. **Respect the section rhythm.** Sections alternate backgrounds for visual contrast. Never place two `inverse-section` blocks back-to-back, or two `secondary-section` blocks adjacent, without a white `section` between them.

4. **The navbar and footer are duplicated across all 20 files.** Any change to nav links, megamenu structure, footer columns, or footer links must be applied to every HTML file. There is no shared include system.

5. **Images must be in `docs/image-catalog.md`.** Every image added to the site must have an entry in the catalog. Every image removed must have its entry updated. See the image management section below.

---

## Making Changes to Existing Pages

### Editing a section's content
- Keep the same section background class — don't change `secondary-section` to `inverse-section` without considering the rhythm of adjacent sections.
- Keep heading hierarchy: `h1` only in heroes; `h2` for section headings; `h3`/`h4` for card titles.
- Don't add new CSS classes to elements — use what's already there.

### Adding a section to an existing page
1. Decide which background variant fits the rhythm (white → gray → dark → white is the common pattern).
2. Pick a component that fits the content: article grid, featured-article, editorial-index, card pair, etc. — see [docs/components.md](docs/components.md) for patterns.
3. Insert the section in a position that maintains visual contrast with its neighbours.
4. Update [docs/page-inventory.md](docs/page-inventory.md) to reflect the change.

### Removing a section
- Check whether any other page links into that section via an anchor (`#id`). Search all HTML files first.
- Update [docs/page-inventory.md](docs/page-inventory.md).

---

## HTML Fragments (Reusable Content Blocks)

Some content blocks appear identically on multiple pages and are managed as shared HTML fragments in the `fragments/` directory. See [docs/content-reuse-strategy.md](docs/content-reuse-strategy.md) for the full strategy.

**Current fragments and the pages that use them:**

| Fragment file | Articles | Used on |
|---|---|---|
| `fragments/activity-tabs.html` | All 10 articles (4 tabs × 3 cards; some articles appear in more than one tab) | `index.html`, `adventures.html`, `field-notes.html`, `expeditions.html`, `gear.html` |
| `fragments/expeditions-grid.html` | patagonia-trek · kayaking-norway · alpine-cycling | `expeditions.html`, `destinations.html` (×3), `faq.html`, `sustainability.html`, `adventures.html`, `community.html`, 5 blog pages |
| `fragments/field-notes-grid.html` | mountain-photography · ultralight-backpacking · desert-survival-guide | `about.html`, `destinations.html`, 5 blog pages |

### Rules for working with fragments

1. **Never edit the inline placeholder.** The `<div data-fragment="…">` element in a page has no content — all content lives in the fragment file. Do not add content inside the placeholder div.

2. **To update a card or tab in a shared block, edit the fragment file.** For example, to change the Climbing tab cards, edit `fragments/activity-tabs.html` — not `index.html` or `adventures.html`.

3. **Image and link paths in fragments use absolute root-relative paths** (e.g. `src="/images/activities/ice-climbing.jpg"`, `href="/blog/article.html"`). This ensures correctness whether the fragment is loaded from a root page or a blog page. Never use bare-relative paths like `images/…` or `blog/…` inside fragment files.

4. **The `data-fragment` attribute on the page is a relative path** to the fragment file: root pages use `data-fragment="fragments/name.html"`, blog pages use `data-fragment="../fragments/name.html"`.

5. **When a new article should surface in a fragment**, update the fragment file and confirm the change appears correctly on all pages that include it (listed in the table above).

6. **When adding a new fragment**, follow the steps in [docs/content-reuse-strategy.md](docs/content-reuse-strategy.md) and update the table above.

7. **Never use fragments for the navbar, footer, or "In the Field" galleries.** Navbar and footer are duplicated by design (no include system); galleries are intentionally unique per page.

---

## Adding a New Blog Article

Blog articles follow a shared template (hero, body, gallery, gear + pull quote, More Stories fragment). All 10 existing articles match this structure — a new article must match exactly.

### Steps

1. **Copy an existing blog article** as a starting point, e.g. `blog/wild-swimming-guide.html`.

2. **Update the `<head>`**:
   - `<meta name="description">` — article-specific description
   - `<title>` — "Article Title — WKND Adventures"
   - CSS path stays `../css/styles.css` (one level up)
   - Font preload paths stay `../` relative

3. **Section 1 — Hero** (`hero-section`, bottom overlay `.overlay`):
   - Update breadcrumbs: `Home › [Parent] › [Article Title]`
   - Update `.tag.blog-hero-tag` category string
   - Update `hero-bg` image (`../images/...`)
   - Update H1 title
   - Update `article-byline`: avatar image, author name, date

4. **Section 2 — Article body** (`blog-article-section`):
   - Write the article in `.blog-content` using `h2`, `h3`, `p`, `ul`, `blockquote`, `figure` as needed
   - Include at least one `pull-quote`
   - Use `blog-gear-list` for gear/equipment lists

5. **Section 3 — Gear + pull quote** (`secondary-section`):
   - Same `grid-layout` pattern as sibling articles (`blog-gear-list` + `pull-quote`); heading may be "What We Carried" or a variant (e.g. kit title)

6. **Section 4 — In the Field gallery** (`inverse-section` — dark; match existing articles):
   - Use the same heading row as the homepage: `.section-heading` with H2 "In the Field" + `.text-button` link to `../field-notes.html` ("Field Notes")
   - Add 3 `gallery-img` images + 1 `gallery-img--wide` (`loading="lazy"` on each)
   - Pick images from the catalog that are not already overused
   - Update `docs/image-catalog.md` to mark these images as used on this page

7. **Section 5 — More Stories** (`section` — white):
   - Use `<div data-fragment="../fragments/field-notes-grid.html"></div>` or `expeditions-grid.html` to match articles of the same parent (Field Notes → field-notes grid; Expeditions → expeditions grid; Adventures articles typically use expeditions grid — copy the placeholder from a peer article)

8. **Determine the parent section** based on article type:
   - Trip report / multi-day journey → Expeditions
   - Activity guide / skills article → Adventures
   - Essay / photography / personal writing → Field Notes

9. **Update the navbar** — add the new article to the Stories megamenu "Recent from the Field" grid (replace the oldest article). Apply this change to **all 20 HTML files**.

10. **Update the footer** — update the "Recent Stories" column to include the new article. Apply to **all 20 HTML files**.

11. **Cross-link** — update `fragments/field-notes-grid.html`, `fragments/expeditions-grid.html`, and/or `fragments/activity-tabs.html` if the new article should appear in those shared grids; adjust peer article bodies only when linking in prose.

12. **Update docs/image-catalog.md** for every image used.

---

## Adding a New Root Page

1. **Copy the closest existing root page** structurally — e.g. `field-notes.html` for an editorial index, `faq.html` for a Q&A page.

2. **Update `<head>`**: title, description, correct relative CSS path (root pages use `css/styles.css`, blog pages use `../css/styles.css`).

3. **Design the section sequence** — aim for 7–10 sections, alternating backgrounds. Start with a hero; end with a CTA (accent or inverse section).

4. **Add to the navbar megamenu** — decide which category (Explore / Stories / Info) it belongs to, and add a `nav-megamenu-link` entry. Apply to all 20 existing HTML files.

5. **Add to the footer** — add a link in the relevant column. Apply to all 20 existing HTML files.

6. **Update [docs/page-inventory.md](docs/page-inventory.md)** — add a row to the usage matrix and a section table entry.

---

## Updating Navigation

The navbar and footer HTML are **duplicated identically across all 20 pages**. Any structural navigation change must be applied to all 20 files.

### When to update the navbar
- A new page is added or removed
- A page is renamed or its URL changes
- The "Recent from the Field" articles in the Stories megamenu need refreshing (do this whenever a new article is published)

### How to update safely
Use a script or search-and-replace across all 20 files. Verify with:
```bash
grep -l 'nav-megamenu' *.html blog/*.html
```
That should return all 20 files. If any are missing, they were not updated.

### Updating "Recent from the Field" (Stories megamenu)
The Stories megamenu shows 4 recent articles in a 2×2 grid. When a new article is published:
1. Replace the oldest article link with the new one
2. Apply to all 20 HTML files

---

## Image Management

Every image used on the site must be tracked in `docs/image-catalog.md`.

### Adding images
1. Place the image in the appropriate subfolder:
   - `images/activities/` — action shots (hiking, climbing, surfing)
   - `images/adventures/` — location/landscape shots
   - `images/magazine/` — editorial, atmospheric, wide shots
   - `images/contributors/` — author portraits
2. Add an entry to `docs/image-catalog.md` with: filename, description, `*Unused*` status
3. Use descriptive `alt` text on every `<img>` tag — never leave it empty

### Using an image
When you add an image to a page, update its `docs/image-catalog.md` entry from `*Unused*` to `*Used on: [page.html]*`.

### Replacing an image
1. Find a suitable replacement in the catalog — prefer unused images
2. Update all `src` attributes in HTML that reference the old image
3. Update `alt` text if the replacement has different content
4. Update `docs/image-catalog.md`: mark old image as unused (or delete entry if file is removed), update new image to used
5. Delete the old image file if it is no longer needed

### Deleting images
Before deleting an image file:
```bash
grep -rl 'filename.jpg' --include='*.html' .
```
If any HTML files reference it, replace the image first, then delete. Update `docs/image-catalog.md`.

### Choosing images
- Prefer images that are contextually relevant to the content they illustrate
- When replacing used images, choose from within the same photographic series where possible for visual consistency
- Check `docs/image-catalog.md` for which images are unused before selecting
- **"In the Field" galleries**: use only images that do not appear anywhere else on the site — no image should be shared between two gallery sections, and no gallery image should already appear in non-gallery content (article body, article cards, featured articles)

### Keeping the catalog accurate
The catalog must be updated **every time** an image `src` attribute changes in HTML. There is no automatic sync. After any image change:
1. For each image you added: update its catalog entry from `*Unused*` to `*Used on: [page]*`
2. For each image you removed: check whether it still appears on any page; if not, update to `*Unused*`; if still used elsewhere, remove only the affected page from its list
3. To verify accuracy after bulk changes, run:
```bash
grep -rh 'src="images/' --include='*.html' . | grep -o 'images/[^"]*' | sort -u
```
Cross-check that result against the catalog entries.

---

## Section Style Rules

### When to use each section background

| Background | Use when |
|---|---|
| `section` (white) | Default content; featured articles; tab sections; body text |
| `section secondary-section` (gray) | Article card grids; supporting promo content; alternating rhythm filler |
| `section inverse-section` (dark) | Editorial statements; key quotes; In the Field galleries; closing CTAs |
| `section accent-section` (amber) | The primary CTA on each page; newsletter prompts; high-energy highlights |
| `hero-section` | Always the first section on every page |

### Contrast rhythm rule
Adjacent sections must alternate backgrounds. Valid sequences:
- `white → gray`, `white → dark`, `white → amber` ✓
- `gray → white`, `gray → dark` ✓
- `dark → white`, `dark → gray` ✓
- `dark → dark` ✗ — never adjacent
- `amber → amber` ✗ — never adjacent
- `gray → gray` ✗ — never adjacent (except separated by a full-bleed element)

---

## Component Consistency Rules

### Article cards
- Always use `loading="lazy"` on card images
- Always include a `.tag` category badge in `.article-card-meta`
- Link the entire card (`a.article-card`) not just the title

### Buttons
- One `.accent-button` maximum per page (the primary hero CTA)
- Use `.button--ghost` for secondary actions alongside a primary button
- Use `.text-button` only for inline prose-level links, not standalone section CTAs
- Never use plain `<a>` for buttons — always use the button classes

### Gallery grids ("In the Field")
- Always 3 `gallery-img` in the top row + 1 `gallery-img--wide` below
- Section heading should include a `.text-button` link to Field Notes
- Use `loading="lazy"` on all gallery images
- On the homepage and all blog articles: wrap the gallery in `inverse-section` and include the Field Notes `.text-button` in the section heading (blog: `href="../field-notes.html"`)

### FAQ accordions
- Always use the `.faq-item` + `.faq-question` + `.faq-answer` + `.faq-icon` structure
- The FAQ and tab toggles are handled in `js/site.js` (included at the bottom of every page) — `.faq-item` and `[data-tabs]` work generically, no configuration needed

### Tab menus
- Wrap the entire tab section in `<section ... data-tabs>` to activate the generic JS handler
- Each `tab-pane` must have a unique `id` on the page
- First tab and first pane both get `is-active`; all others don't

### Editorial index
- Numbers must be zero-padded two-digit strings: `01`, `02`, `03`
- Each item needs both a `h3`/`h4` title and at least one `<p>` description

---

## Keeping Documentation Up to Date

When you make structural changes to the site, update the relevant docs:

| Change | Files to update |
|---|---|
| New/removed page | `docs/site-guide.md` file structure · `docs/page-inventory.md` matrix |
| New/removed section on a page | `docs/page-inventory.md` section table for that page |
| New/changed component pattern | `docs/components.md` |
| New CSS token or style rule | `docs/design-system.md` |
| Image added/moved/deleted | `docs/image-catalog.md` |
| New article published | Navbar (all 20 files) · Footer (all 20 files) · `docs/page-inventory.md` |
