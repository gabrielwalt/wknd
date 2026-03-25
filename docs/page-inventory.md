# Page Inventory

Section-by-section breakdown of every page plus the component usage matrix.

→ Part of the [WKND Adventures Site Guide](site-guide.md)

---

## Root Pages

### `index.html` — Homepage
8 sections · Hero: full height (`hero-section--full`) · Overlay: bottom gradient

| # | Section | Content / blocks |
|---|---|---|
| 1 | `hero-section hero-section--full` | Eyebrow, H1 "Field Notes", lead, `.accent-button` |
| 2 | `section secondary-section` | `featured-article` — Ultralight Backpacking (`blog/ultralight-backpacking.html`) |
| 3 | `section` | `tab-menu` (4 activity tabs) + `article-card` grid (`desktop-3-column`) per tab |
| 4 | `section inverse-section` | Start Here (`container--narrow`, Adventures / Destinations buttons) |
| 5 | `section` | Quick Answers — `faq-item` list + link to `faq.html` |
| 6 | `section secondary-section` | `container container--narrow` · `editorial-index` (How We Work — WKND principles) |
| 7 | `section inverse-section` | "In the Field" gallery: `gallery-img` ×3 + `gallery-img--wide` |
| 8 | `section accent-section` | CTA text + `.button` |

Extra: `ticker-strip` standalone divider after Browse by Activity.
Buttons used: `.button` · `.accent-button` · `.button--ghost` · `.text-button`

---

### `about.html` — About / Team
9 sections · Hero: standard · Overlay: bottom gradient

| # | Section | Content / blocks |
|---|---|---|
| 1 | `hero-section` | Eyebrow, H1, lead |
| 2 | `section accent-section` | Mission intro / stat highlights |
| 3 | `section` | Editorial prose + image (`grid-layout`) — How it started |
| 4 | `section inverse-section` | `feature-card` ×3 — What we believe |
| 5 | `section` `data-tabs` | `container` (full width) · `tab-menu` → per `tab-pane`: `team-profile-grid` > `team-profile-row` (`team-profile-spacer` + `team-profile-col` + `team-profile-bio`) |
| 6 | `section` `secondary-section` `utility-overflow-x-clip` | The Editorial Standard — `container container--narrow` > `blog-content` prose + full-bleed `figure` |
| 7 | `section inverse-section` | How We Fund Our Work — narrow prose |
| 8 | `section` | `article-card` grid (`data-fragment` → Field Notes) |
| 9 | `section accent-section` | CTA |

Buttons used: `.button` · `.accent-button` · `.button--ghost` · `.text-button`

---

### `adventures.html` — Adventures
8 sections · Hero: full height (`hero-section--full`) · Overlay: side gradient

| # | Section | Content / blocks |
|---|---|---|
| 1 | `hero-section hero-section--full` | Eyebrow, H1 "Adventures", lead, `.accent-button` |
| 2 | `section accent-section` | Intro — `container container--narrow` centered |
| 3 | `section secondary-section` | `featured-article` (Lofoten / kayaking-norway) |
| 4 | `section` `data-tabs` | Browse by Activity · `tab-menu` (4 tabs) + `activity-tabs` fragment |
| 5 | `section secondary-section` | Choosing Your Adventure — `container container--narrow` prose |
| 6 | `section` | Recent Reports — `data-fragment` → expeditions grid |
| 7 | `section secondary-section` | Two stacked `container container--narrow`: `editorial-index` (Adventure by Skill Level) · `grid-layout--2col` promo `card`s (Expeditions · Field Notes) |
| 8 | `section inverse-section` | Gear CTA |

Buttons used: `.button` · `.accent-button` · `.button--ghost`

---

### `community.html` — Community
9 sections · Hero: standard · Overlay: bottom gradient

| # | Section | Content / blocks |
|---|---|---|
| 1 | `hero-section` | Eyebrow, H1, lead, `.accent-button` |
| 2 | `section inverse-section` | Intro prose |
| 3 | `section secondary-section` | `editorial-index` (How to Submit — steps 01–03) |
| 4 | `section` | `data-fragment` → `expeditions-grid.html` (article-card grid) |
| 5 | `section secondary-section` | "Reader Dispatches" — `article-card` grid (`desktop-3-column`) + `featured-article` (second container) |
| 6 | `section inverse-section` | Community Guidelines prose — `container--narrow` |
| 7 | `section accent-section` id="submit" | 2 × `.card` CTA boxes + `faq-item` list |
| 8 | `section` | `article-card` grid (`desktop-4-column`) |
| 9 | `section inverse-section` | Final CTA |

Buttons used: `.button` · `.accent-button` · `.button--ghost`

---

### `destinations.html` — Destinations
10 sections · Hero: standard · Overlay: side gradient

| # | Section | Content / blocks |
|---|---|---|
| 1 | `hero-section` | Eyebrow, H1 "Destinations", lead |
| 2 | `section accent-section` | `article-card` grid (3 region anchor links: Americas, Europe, Asia-Pacific) |
| 3 | `section secondary-section` | `featured-article` (lead destination story) |
| 4 | `section` id="americas" | `data-fragment` → `field-notes-grid.html` (Americas article grid) |
| 5 | `section secondary-section` id="europe" | `data-fragment` → `expeditions-grid.html` + `editorial-index` (4 Europe route items) |
| 6 | `section` | "High Altitude" — `data-fragment` → `expeditions-grid.html` |
| 7 | `section` | "Essential Route Reports" — `data-fragment` → `expeditions-grid.html` |
| 8 | `section inverse-section` | Permits & Logistics — `container--narrow` prose |
| 9 | `section secondary-section` | Regional Editors — `card` grid (`desktop-3-column`) + `card` grid (`grid-layout--2col`) second container |
| 10 | `section inverse-section` | Final CTA |

Buttons used: `.button` · `.accent-button` · `.button--ghost` · `.text-button`

---

### `expeditions.html` — Expeditions
9 sections · Hero: standard · Overlay: side gradient

| # | Section | Content / blocks |
|---|---|---|
| 1 | `hero-section` | Eyebrow, H1, lead |
| 2 | `section accent-section` | Featured expedition teaser |
| 3 | `section` | `article-card` grid (`desktop-3-column`) — expedition index |
| 4 | `section secondary-section` | `editorial-index` (expedition demands / checklist) |
| 5 | `section` | `data-fragment` → `activity-tabs.html` (tab-menu + `article-card` grids per activity) |
| 6 | `section secondary-section` | `card` grid (`grid-layout--2col`) — gear/logistics promo |
| 7 | `section accent-section` | Pre-departure checklist highlight |
| 8 | `section inverse-section` | Text block |
| 9 | `section inverse-section` | "What's next" CTA links |

Buttons used: `.button` · `.accent-button` · `.button--ghost` · `.text-button`

---

### `faq.html` — FAQ
9 sections · Hero: standard · Overlay: bottom gradient

| # | Section | Content / blocks |
|---|---|---|
| 1 | `hero-section` | Eyebrow, H1 "FAQ", lead |
| 2 | `section accent-section` | Anchor `card` pair — jump links to FAQ groups |
| 3 | `section` (id=planning) | `faq-item` list — Planning questions |
| 4 | `section secondary-section` (id=stories) | `faq-item` list — Contributing Stories |
| 5 | `section` (id=planning-your-trip) | `faq-item` list — Trip planning |
| 6 | `section secondary-section` (id=about-content) | `faq-item` list — About the content |
| 7 | `section` (id=contributing) | `faq-item` list — Contributing & Community |
| 8 | `section secondary-section` | `data-fragment` → expeditions grid |
| 9 | `section inverse-section` | Final CTA |

Buttons used: `.button` · `.accent-button` · `.button--ghost` · `.text-button`

---

### `field-notes.html` — Field Notes
7 sections · Hero: standard · Overlay: side gradient · **No accent-section**

| # | Section | Content / blocks |
|---|---|---|
| 1 | `hero-section` | Eyebrow, H1 "Field Notes", lead, `.accent-button` |
| 2 | `section inverse-section` | "Written close to the event" intro |
| 3 | `section secondary-section` | `featured-article` (Mountain Photography essay) |
| 4 | `section inverse-section` | "What is a Field Note?" editorial prose |
| 5 | `section secondary-section` | `card` grid (`grid-layout--2col`) — Submit dispatch / Expeditions promo |
| 6 | `section` | `article-card` grid (`desktop-3-column`) — Essential Reading |
| 7 | `section inverse-section` | Final CTA |

Buttons used: `.button` · `.accent-button` · `.button--ghost`

---

### `gear.html` — Gear
9 sections · Hero: standard · Overlay: bottom gradient

| # | Section | Content / blocks |
|---|---|---|
| 1 | `hero-section` | Eyebrow, H1 "Gear", lead |
| 2 | `section secondary-section` | `featured-article` (Ultralight Backpacking) |
| 3 | `section` `data-tabs` | `tab-menu` (5 gear category tabs) + `article-card` / `card` per tab |
| 4 | `section secondary-section` | `article-card` grid (`desktop-3-column`) |
| 5 | `section` | `feature-card` ×3 (`desktop-3-column`) — gear philosophy |
| 6 | `section secondary-section` | `article-card` grid (`desktop-4-column`) |
| 7 | `section` | `editorial-index` (gear principles) |
| 8 | `section secondary-section` | Additional article cards |
| 9 | `section inverse-section` | Final CTA |

Buttons used: `.button` · `.accent-button` · `.text-button`

---

### `sustainability.html` — Sustainability
10 sections · Hero: standard · Overlay: bottom gradient

| # | Section | Content / blocks |
|---|---|---|
| 1 | `hero-section` | Eyebrow, H1, lead |
| 2 | `section secondary-section` | `editorial-index` (Sustainability Commitments 01–03) |
| 3 | `section secondary-section` | `featured-article` (Wild Swimming Guide) |
| 4 | `section` `data-tabs` | `tab-menu` (Trail Impact · Water Access · Wildlife · Winter) + `article-card` grids per tab |
| 5 | `section` | The Adventurer's Responsibility — `container--narrow` prose |
| 6 | `section secondary-section` | `feature-card` ×3 (`desktop-3-column`) — The WKND Wild Ethics |
| 7 | `section secondary-section` | `data-fragment` → `expeditions-grid.html` (article-card grid) |
| 8 | `section accent-section` | CTA |
| 9 | `section inverse-section` id="pledge" | `pull-quote` ("The mountain doesn't owe you a summit…") + pledge prose |
| 10 | `section accent-section` | Final CTA |

Buttons used: `.button` · `.accent-button` · `.button--ghost`

---

## Blog Articles

All 10 blog articles share the same structure before the footer.

| # | Section | Content / blocks |
|---|---|---|
| 1 | `hero-section` | `breadcrumbs` (Home › Parent › Article) + `.tag.blog-hero-tag` (category) + H1 + `article-byline` (avatar · author · date) |
| 2 | `section blog-article-section utility-padding-top-0` | `blog-article-container` (48rem) > `blog-content` prose: h2/h3, paragraphs, lists, blockquote, `pull-quote`, full-bleed `figure`, `blog-gear-list` |
| 3 | `section secondary-section` | Gear summary + `pull-quote` (`grid-layout desktop-3-column`) — e.g. "What We Carried" or article-specific kit title |
| 4 | `section inverse-section` | "In the Field" gallery: `section-heading` with H2 + `.text-button` → `../field-notes.html` ("Field Notes"), then `gallery-img` ×3 + `gallery-img--wide` |
| 5 | `section` | "More Stories" — `data-fragment` → `field-notes-grid.html` or `expeditions-grid.html` (by article parent) |

Buttons used: `.button` only (e.g. in-body links; no separate accent CTA section)
Overlay: `.overlay` (bottom gradient)

**Blog articles by parent section**:

| Parent | Articles |
|---|---|
| Adventures | desert-survival-guide · surfing-costa-rica · ultralight-backpacking · wild-swimming-guide · winter-mountaineering · yosemite-rock-climbing |
| Expeditions | alpine-cycling · kayaking-norway · patagonia-trek |
| Field Notes | mountain-photography |

---

## Usage Matrix

`●` = present on page · blank = absent

**Column key**: H = hero · H+ = hero--full · 2nd = secondary-section · Inv = inverse-section · Acc = accent-section · FA = featured-article · AC = article-card · Cd = card · FC = feature-card · FAQ = faq-item · Tab = tab-menu · EI = editorial-index · Gal = gallery-img · Tkr = ticker-strip · PQ = pull-quote · Blog = blog-layout · Team = team-profile-grid · BC = breadcrumbs

| Page | H | H+ | 2nd | Inv | Acc | FA | AC | Cd | FC | FAQ | Tab | EI | Gal | Tkr | PQ | Blog | Team | BC |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **index.html** | ● | ● | ● | ● | ● | ● | ● | ● |   | ● | ● | ● | ● | ● |   |   |   |   |
| **about.html** | ● |   | ● | ● | ● |   | ● | ● | ● |   | ● |   |   |   |   |   | ● |   |
| **adventures.html** | ● | ● | ● | ● | ● | ● | ● | ● |   |   | ● | ● |   |   |   |   |   |   |
| **community.html** | ● |   | ● | ● | ● | ● | ● | ● |   | ● |   | ● |   |   |   |   |   |   |
| **destinations.html** | ● |   | ● | ● | ● | ● | ● | ● |   |   |   | ● |   |   |   |   |   |   |
| **expeditions.html** | ● |   | ● | ● | ● |   | ● | ● |   |   |   | ● |   |   |   |   |   |   |
| **faq.html** | ● |   | ● | ● | ● |   | ● | ● |   | ● |   |   |   |   |   |   |   |   |
| **field-notes.html** | ● |   | ● | ● |   | ● | ● | ● |   |   |   |   |   |   |   |   |   |   |
| **gear.html** | ● |   | ● | ● | ● | ● | ● | ● | ● |   | ● | ● |   |   |   |   |   |   |
| **sustainability.html** | ● |   | ● | ● | ● | ● | ● | ● | ● |   | ● | ● |   |   | ● |   |   |   |
| **blog/alpine-cycling** | ● |   | ● | ● |   |   | ● |   |   |   |   |   | ● |   | ● | ● |   | ● |
| **blog/desert-survival** | ● |   | ● | ● |   |   | ● |   |   |   |   |   | ● |   | ● | ● |   | ● |
| **blog/kayaking-norway** | ● |   | ● | ● |   |   | ● |   |   |   |   |   | ● |   | ● | ● |   | ● |
| **blog/mountain-photo** | ● |   | ● | ● |   |   | ● |   |   |   |   |   | ● |   | ● | ● |   | ● |
| **blog/patagonia-trek** | ● |   | ● | ● |   |   | ● |   |   |   |   |   | ● |   | ● | ● |   | ● |
| **blog/surfing-costa-rica** | ● |   | ● | ● |   |   | ● |   |   |   |   |   | ● |   | ● | ● |   | ● |
| **blog/ultralight-bp** | ● |   | ● | ● |   |   | ● |   |   |   |   |   | ● |   | ● | ● |   | ● |
| **blog/wild-swimming** | ● |   | ● | ● |   |   | ● |   |   |   |   |   | ● |   | ● | ● |   | ● |
| **blog/winter-mountain** | ● |   | ● | ● |   |   | ● |   |   |   |   |   | ● |   | ● | ● |   | ● |
| **blog/yosemite-climb** | ● |   | ● | ● |   |   | ● |   |   |   |   |   | ● |   | ● | ● |   | ● |

### Coverage summary

| Component | Count | Notes |
|---|---|---|
| hero-section | 20 / 20 | Universal |
| secondary-section | 20 / 20 | Universal |
| article-card | 20 / 20 | Universal |
| inverse-section | 20 / 20 | Universal (blog articles via gallery section) |
| accent-section | 9 / 20 | Root pages only (not field-notes); no blog articles |
| card | 10 / 20 | Root pages only; no `.card` elements in blog articles |
| pull-quote | 11 / 20 | sustainability + all 10 blog |
| gallery-img | 11 / 20 | index + all 10 blog |
| featured-article | 8 / 20 | Root pages only (not expeditions or faq); community has FA in section 5 |
| editorial-index | 8 / 20 | index, adventures, community, destinations, expeditions, gear, sustainability (×2 sections between destinations europe and sustainability section 2) |
| blog-layout | 10 / 20 | Blog only |
| breadcrumbs | 10 / 20 | Blog only |
| tab-menu | 6 / 20 | index (via fragment), about, adventures (via fragment), expeditions (via fragment), gear, sustainability |
| faq-item | 3 / 20 | index, community, faq |
| feature-card | 3 / 20 | about, gear, sustainability |
| hero--full | 2 / 20 | index, adventures |
| team-profile-grid | 1 / 20 | about only (full-width `container`; spacer aligns bio left edge with `container--narrow` below) |
| ticker-strip | 1 / 20 | index only |

---

*→ See [components.md](components.md) for HTML patterns*
*→ See [design-system.md](design-system.md) for tokens, grids, and buttons*
