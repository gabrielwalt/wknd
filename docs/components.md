# Components

HTML patterns and usage notes for every block on the site.

→ Part of the [WKND Adventures Site Guide](site-guide.md)

---

## Global: Navbar

Present on all 20 pages. The navbar HTML is identical across every page — changes must be applied to all 20 files.

**Structure**: `div.navbar` > `div.container` > `div.nav-inner`

```html
<div class="navbar">
  <div class="container">
    <div class="nav-inner">
      <!-- Logo -->
      <a href="index.html" class="logo">
        <div class="nav-logo-icon"><!-- SVG --></div>
        <span class="logo-text">WKND<br/>Adventures</span>
      </a>

      <!-- Nav menu -->
      <nav class="nav-menu" id="nav-menu" aria-label="Main navigation">
        <ul class="nav-menu-list">
          <!-- Each top-level item is a nav-megamenu-item -->
          <li class="nav-menu-list-item nav-megamenu-item">
            <button class="nav-link nav-megamenu-trigger">
              <span>Label</span><span class="nav-caret"></span>
            </button>
            <div class="nav-megamenu">
              <div class="container">
                <!-- grid or stories layout -->
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <!-- Right side -->
      <div class="nav-right">
        <a href="community.html" class="button">Subscribe</a>
        <button class="nav-mobile-menu-button" id="nav-toggle">Menu</button>
      </div>
    </div>
  </div>
</div>
```

**Megamenu layouts**:
- `nav-megamenu-grid nav-megamenu-grid--3` — 3 equal columns (Explore)
- `nav-megamenu-grid nav-megamenu-grid--4` — 4 equal columns (Info)
- `nav-megamenu-stories` — 2-part: pages column left + 2×2 article grid right (Stories)

**Current megamenu structure**:
- **Explore**: Adventures · Expeditions · Destinations (3-col grid)
- **Stories**: Field Notes + Community pages | 4 recent articles grid
- **Info**: Gear · Sustainability · About · FAQ (4-col grid)

---

## Global: Footer

Present on all 20 pages. HTML is identical — changes must be applied to all 20 files.

**Structure**: `footer.footer.inverse-footer` — dark background, amber 4px top border

```html
<footer class="footer inverse-footer">
  <div class="container">
    <!-- Top: 4-column grid -->
    <div class="grid-layout desktop-4-column grid-gap-xl footer-top">
      <div><!-- Logo + tagline --></div>
      <div><!-- Explore links --></div>
      <div><!-- Recent Stories links --></div>
      <div><!-- Info links --></div>
    </div>
    <!-- Bottom bar -->
    <div class="footer-bottom">
      <p class="paragraph-sm footer-tagline">© 2026 WKND Adventures.</p>
      <p class="paragraph-sm footer-tagline">Made for the people who go.</p>
    </div>
  </div>
</footer>
```

---

## Hero

**Source**: `css/hero.css` · **Used on**: all 20 pages

```html
<section class="hero-section [hero-section--full]">
  <div class="hero-bg">
    <img src="images/..." alt="Descriptive alt text" />
    <div class="overlay[-side]"></div>
  </div>
  <div class="container hero-content">
    <div class="hero-content-inner">
      <p class="hero-eyebrow">Category Label</p>   <!-- optional amber label -->
      <h1 class="h1-heading utility-margin-bottom-lg">Page Title</h1>
      <p class="paragraph-xl hero-lead">One or two sentences of lead text.</p>
      <div class="button-group">
        <a href="..." class="accent-button">Primary Action</a>      <!-- or .button -->
        <a href="..." class="button--ghost">Secondary Action</a>    <!-- optional -->
      </div>
    </div>
  </div>
</section>
```

**Variants**:
| Variant | Min-height | Used on |
|---|---|---|
| `hero-section` | 55vh | 18 pages |
| `hero-section hero-section--full` | 65vh | index.html, adventures.html |

**Overlay types**:
| Class | Gradient direction | Used on |
|---|---|---|
| `.overlay` | bottom-to-top dark | index, about, community, faq, gear, sustainability, all 10 blog articles |
| `.overlay-side` | left-to-right dark | adventures, destinations, expeditions, field-notes |

**Blog hero** — inside `.hero-content`, add before the H1:
```html
<nav class="breadcrumbs">
  <a href="../index.html">Home</a> <span>›</span>
  <a href="../[parent].html">Parent</a> <span>›</span>
  <span>Article Title</span>
</nav>
<span class="tag blog-hero-tag">Category · Region · Type</span>
```
And after the H1, add an `article-byline` (see below).

---

## Article Byline

**Source**: `css/article-card.css` · **Used in**: featured-article, blog hero

```html
<div class="article-byline">
  <div class="avatar">
    <img src="images/contributors/author.jpg" alt="Author Name" loading="lazy" />
  </div>
  <div>
    <p class="article-byline-name">Author Name</p>
    <p class="article-byline-meta">Month Year</p>
  </div>
</div>
```

Inside `hero-section`: avatar enlarges to 5rem; name and meta auto-styled for dark bg.

---

## Featured Article

**Source**: `css/article-card.css` · **Used on**: index, adventures, community, destinations, field-notes, gear, sustainability

2-column image + text layout. Collapses to 1 column at tablet (≤991px). Wrap **`article-byline`** and the **`.button`** in **`.featured-article-footer`** so the CTA sits on the right of the author row (or right-aligned when there is no byline, e.g. destinations). Do not use **`paragraph-sm`** on byline lines inside featured blocks — sizing is handled in CSS.

```html
<div class="featured-article">
  <a href="blog/article.html" class="featured-article-image">
    <img src="images/..." alt="..." loading="lazy" />
  </a>
  <div>
    <p class="hero-eyebrow">Featured Essay</p>
    <h2 class="h2-heading utility-margin-bottom-sm">Article Title</h2>
    <p class="paragraph-lg utility-margin-bottom-md">First paragraph excerpt.</p>
    <p class="paragraph-lg utility-margin-bottom-lg">Second paragraph excerpt.</p>
    <div class="featured-article-footer">
      <div class="article-byline">
        <div class="avatar"><img src="images/contributors/....jpg" alt="Author" loading="lazy" /></div>
        <div>
          <p class="article-byline-name">Author Name</p>
          <p class="article-byline-meta">Month YYYY · N min read</p>
        </div>
      </div>
      <a href="blog/article.html" class="button"><div class="button-label">Read the Essay</div></a>
    </div>
  </div>
</div>
```

---

## Article Card

**Source**: `css/article-card.css` · **Used on**: all 20 pages

Linked card with 16:10 image, category tag, heading, excerpt. Wrap multiple cards in a `grid-layout desktop-3-column` or `desktop-4-column` grid.

```html
<a href="blog/article.html" class="article-card">
  <div class="article-card-image">
    <img src="images/..." alt="..." loading="lazy" />
  </div>
  <div class="article-card-body">
    <div class="article-card-meta">
      <span class="tag">Category</span>
      <span class="article-card-location">Region</span>   <!-- optional -->
    </div>
    <h3 class="h5-heading utility-margin-bottom-sm">Title</h3>
    <p class="paragraph-sm utility-margin-bottom-md">Short excerpt.</p>
    <p class="utility-text-secondary">Author · Month Year</p>
  </div>
</a>
```

Inside `inverse-section`: card background auto-darkens; hover flips to cream.

---

## Card (generic)

**Source**: `css/card.css` · **Used on**: all 20 pages

Standalone bordered container for promo blocks, text CTAs, and two-column pairs.

```html
<div class="card card-body">
  <p class="hero-eyebrow">Label</p>
  <h3 class="h3-heading utility-margin-bottom-sm">Title</h3>
  <p class="paragraph-lg utility-margin-bottom-md">Body text.</p>
  <a href="..." class="button--ghost">CTA Label</a>
</div>
```

Wrap two cards in `grid-layout grid-layout--2col grid-gap-lg` for side-by-side layout.

---

## Feature Card

**Source**: `css/card.css` · **Used on**: about.html, gear.html, sustainability.html

Icon-and-text block for principles / value propositions. Always used in sets of 3 inside `grid-layout desktop-3-column`.

```html
<div class="feature-card">
  <!-- Small SVG icon or symbol here -->
  <h4 class="h5-heading">Principle Title</h4>
  <p>Short description of this principle or value.</p>
</div>
```

---

## FAQ Accordion

**Source**: `css/faq.css` · **Used on**: index, about, community, faq

JS toggles `.is-open` on click. Icon animates + → ×. Answer expands via `max-height` transition.

```html
<div class="faq-item">
  <div class="faq-question">
    Question text goes here?
    <span class="faq-icon"></span>
  </div>
  <div class="faq-answer">
    <p>Answer text. Can include <a class="faq-link" href="...">links</a>.</p>
  </div>
</div>
```

Requires the FAQ JS block in the `<script>` tag (see any existing faq.html page for the toggle snippet).

---

## Tab Menu

**Source**: `css/tabs.css` · **Used on**: index, about, adventures, gear, sustainability

Editorial-style horizontal switcher with amber active-tab underline. The `data-tabs` attribute on the wrapper enables the JS handler.

```html
<div data-tabs>
  <div class="tab-menu" role="tablist">
    <button class="tab-menu-link is-active" data-tab="tab-first" role="tab" aria-selected="true">First</button>
    <button class="tab-menu-link" data-tab="tab-second" role="tab" aria-selected="false">Second</button>
  </div>
  <div class="tab-pane is-active tab-pane--padded" id="tab-first" role="tabpanel">
    <!-- first tab content -->
  </div>
  <div class="tab-pane tab-pane--padded" id="tab-second" role="tabpanel">
    <!-- second tab content -->
  </div>
</div>
```

The JS handler for `[data-tabs]` lives in `js/site.js` (loaded on every page). Tab clicks use event delegation so injected fragments with tabs work without a separate init step. Tab IDs must be unique per page.

**Tab instances on the site**:
| Page | Tabs | Content type |
|---|---|---|
| index.html | Climbing · Water · Cycling · Hiking | Activity article filter (`activity-tabs` fragment) |
| about.html | Jordan · Alex · Morgan · Taylor | Team member profiles |
| adventures.html | Climbing · Water · Cycling · Hiking | Activity article filter (`activity-tabs` fragment) |
| field-notes.html, expeditions.html | Climbing · Water · Cycling · Hiking | `activity-tabs` fragment (section title varies) |
| gear.html | Climbing · Water · Cycling · Desert · All-Season (inline intros); Climbing–Hiking (`activity-tabs` in Gear Features) | Gear category filter + same activity fragment as homepage |
| sustainability.html | Trail Impact · Water Access · Wildlife · Winter | Topic filter |

---

## Editorial Index

**Source**: `css/base.css` · **Used on**: index, adventures, community, destinations, expeditions, gear, sustainability

Numbered list with large amber Syncopate numerals, amber top/bottom border per item.

```html
<div class="editorial-index">
  <div class="editorial-index-item">
    <span class="editorial-index-number">01</span>
    <div>
      <h3 class="h4-heading utility-margin-bottom-md">Title</h3>
      <p>Description paragraph.</p>
    </div>
  </div>
  <div class="editorial-index-item">
    <span class="editorial-index-number">02</span>
    <div>...</div>
  </div>
</div>
```

Numbers should always be zero-padded two-digit strings: `01`, `02`, etc.

---

## Gallery Grid

**Source**: `css/blog-content.css` (imported globally) · **Used on**: index + all 10 blog articles

Standard 3+1 layout: three equal images in a row, one wide image below. The block lives inside `<section class="section inverse-section">` > `.container` (dark background). Root pages link Field Notes as `href="field-notes.html"`; blog pages use `href="../field-notes.html"`.

```html
<section class="section inverse-section">
  <div class="container">
    <div class="section-heading utility-margin-bottom-xl">
      <h2 class="h2-heading">In the Field</h2>
      <a href="field-notes.html" class="text-button"><div>Field Notes</div></a>
    </div>

    <div class="grid-layout desktop-3-column grid-gap-lg">
      <img src="images/..." alt="..." class="gallery-img" loading="lazy" />
      <img src="images/..." alt="..." class="gallery-img" loading="lazy" />
      <img src="images/..." alt="..." class="gallery-img" loading="lazy" />
    </div>

    <div class="utility-margin-top-lg">
      <img src="images/..." alt="..." class="gallery-img gallery-img--wide" loading="lazy" />
    </div>
  </div>
</section>
```

| Class | Height | Use |
|---|---|---|
| `.gallery-img` | 280px | Standard 3-column grid images |
| `.gallery-img--wide` | 360px | Full-width image below the grid |

All gallery images use `object-fit: cover` and `--radius-card` border-radius.

---

## Pull Quote

**Source**: `css/blog-content.css` · **Used on**: index, sustainability, all 10 blog articles

Amber 4px left-border blockquote. Used inside `blog-content` prose or as a standalone block in a section.

```html
<blockquote class="pull-quote">
  <p class="pull-quote-body">"Quote text here — write it as a complete thought."</p>
  <footer class="pull-quote-attribution">— Source or speaker</footer>
</blockquote>
```

---

## Ticker Strip

**Source**: `css/base.css` · **Used on**: index.html only

Infinite-scrolling horizontal text band. The track contains the items duplicated (the animation scrolls by 50%). Motion is disabled with `prefers-reduced-motion`.

```html
<div class="ticker-strip">
  <div class="ticker-track">
    Text Item <span class="ticker-sep">·</span>
    Text Item <span class="ticker-sep">·</span>
    <!-- duplicate all items a second time for seamless loop -->
    Text Item <span class="ticker-sep">·</span>
    Text Item <span class="ticker-sep">·</span>
  </div>
</div>
```

The strip sits between sections as a standalone element (not inside a `<section>`). On the homepage it follows **Browse by Activity** (after the activity-tabs fragment) and precedes **Start Here**.

---

## Blog Article Layout

**Source**: `css/blog-content.css` · **Used on**: all 10 blog articles only

```html
<section class="section blog-article-section utility-padding-top-0">
  <div class="container blog-article-container">   <!-- max-width var(--container-narrow) -->
    <div class="blog-content-body">
      <div class="blog-content">

        <!-- Standard prose -->
        <h2>Section Heading</h2>
        <p>Body paragraph text.</p>

        <!-- Unordered list -->
        <ul>
          <li>Item</li>
        </ul>

        <!-- Gear list (disc style with left padding) -->
        <ul class="blog-gear-list">
          <li>Gear item</li>
        </ul>

        <!-- Blockquote (inline, smaller style) -->
        <blockquote><p>Quote text.</p></blockquote>

        <!-- Pull quote (prominent) -->
        <blockquote class="pull-quote">
          <p class="pull-quote-body">"Prominent quote."</p>
          <footer class="pull-quote-attribution">— Author</footer>
        </blockquote>

        <!-- Full-bleed figure (breaks out of narrow prose container to 100vw) -->
        <figure>
          <img src="../images/..." alt="..." loading="lazy" />
          <figcaption>Optional caption text.</figcaption>
        </figure>

      </div>
    </div>
  </div>
</section>
```

**Full-bleed figures** break to `100vw` via `left: 50%; transform: translateX(-50%)`. Image height: 520px desktop / 260px mobile. No border-radius on full-bleed images (handled automatically).

---

## Team profile

**Source**: `css/base.css` · **Used on**: about.html only (inside tab panes)

Two-column row inside each tab: avatar + name in a fixed-width left column, biography to the right. The section uses a full-width `container` so the tab bar spans the page; a flex spacer before the avatar column offsets the bio so its **left edge lines up with** `.container--narrow` prose in the following section (e.g. The Editorial Standard). On small screens the row stacks and the spacer is hidden.

```html
<div class="team-profile-grid">
  <div class="team-profile-row">
    <div class="team-profile-spacer" aria-hidden="true"></div>
    <div class="team-profile-col">
      <div class="profile-circle">
        <img src="images/contributors/name.jpg" alt="Name" loading="lazy" />
      </div>
      <div>
        <p class="h5-heading profile-name">Full Name</p>
        <p class="paragraph-sm utility-text-secondary">Role / Title</p>
      </div>
    </div>
    <div class="team-profile-bio">
      <p class="paragraph-lg">Biography text paragraph.</p>
      <!-- more paragraphs as needed -->
    </div>
  </div>
</div>
```

---

*→ See [design-system.md](design-system.md) for tokens, grids, and buttons*
*→ See [page-inventory.md](page-inventory.md) for per-page section breakdowns*
