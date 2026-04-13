# Visual Design Guide

Design philosophy, aesthetics, color usage, spacing, and interactions for the WKND Adventures brand.

For CSS implementation details and token values, see [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

---

## 1. Global Design Philosophy

WKND Adventures is a premium outdoor adventure editorial brand. Its design language borrows from bold print magazines and expedition dispatch books: strong typography, high-contrast pairing of deep forest green/black with vivid amber orange, large photographs, and generous white space.

**Three pillars of the aesthetic:**

1. **Editorial boldness.** Headings are uppercase, geometric, and heavy. Text is never timid. Sections are large and clear.
2. **Warmth through contrast.** Deep black backgrounds sit next to warm cream and amber. Nothing feels cold or corporate.
3. **Tactile interactivity.** Buttons have a hand-stamped "offset shadow" effect — they physically depress when clicked. Cards lift slightly on hover. The site feels alive without being animated for its own sake.

---

## 2. Colours

The entire palette is built from six named colours plus a grey scale. Every colour on the site comes from this list — nothing is ever improvised.

| Name | Hex | Description |
|---|---|---|
| **Black** | `#0f1a14` | The site's "black" — actually a very deep forest green. Used for text, backgrounds, and button fills. |
| **Amber** | `#e8651a` | Vivid burnt-orange. The accent and energy colour — used for shadows, tags, active states, and the accent section background. |
| **Forest** | `#1a3a2e` | Deep forest green. Used sparingly for brand identity elements. |
| **Cream** | `#f5f0e8` | Warm off-white. Used as hover backgrounds on cards. |
| **White** | `#ffffff` | Pure white. Used for default section backgrounds and text on dark sections. |
| **Gray-100** | `#f0ece4` | Very pale warm grey. Used for the subtle "secondary" section background. |
| **Gray-200** | `#ddd8cf` | Light warm grey. Card borders, dividers. |
| **Gray-300** | `#c8c2b8` | Medium grey. Inactive tab text, input borders. |
| **Gray-500** | `#7a8a80` | Mid-tone grey. Secondary/muted text (dates, author meta, captions). |
| **Gray-700** | `#3d4f45` | Dark grey. Footer link colour; body text in dark sections. |

### How colours are used

- **Foreground text** on white/light backgrounds: Black (`#0f1a14`)
- **Foreground text** on dark/black backgrounds: White
- **Muted/secondary text** everywhere: Gray-500
- **Accent highlights** (tags, active tabs, button shadows, left-borders on quotes): Amber
- **Hover state on cards**: Cream background

---

## 3. Typography

Two typefaces are used across the entire site. They were chosen to work as a pair: one bold and geometric for headings, one refined and readable for body text.

### Syncopate — Headings

Syncopate is a geometric sans-serif that is **all-caps by nature** — the lowercase letters are designed to look like slightly smaller versions of the capitals. This gives all headings an authoritative, engraved quality without needing a `text-transform` CSS rule. It is used at weights 400 (regular) and 700 (bold).

Used for: all headings (H1–H6), all button labels, tab labels, category tags, eyebrow labels, footer column headings.

### Instrument Sans — Body text

Instrument Sans is a humanist sans-serif optimised for reading. It is warm, approachable, and works well at small sizes. Used for all paragraph text, captions, meta information, and form labels.

### Heading sizes

The headings scale from very large to very small. They automatically shrink on tablets and phones so the page never feels cramped.

| Level | Desktop size | Role on the page |
|---|---|---|
| H1 | ~56px (3.5rem) | Page title — used only once per page, always in the hero |
| H2 | ~40px (2.5rem) | Section headings — the big title at the top of each content block |
| H3 | ~32px (2rem) | Sub-section headings — divisions within a section |
| H4 | ~24px (1.5rem) | Card headings — featured card titles |
| H5 | ~20px (1.25rem) | Small card headings — article card titles, team member names |
| H6 | ~14px (0.875rem) | Label headings — footer column titles (with extra letter-spacing) |

On tablets (screen width ≤ 991px) the top three sizes shrink by roughly one step. On phones (≤ 767px) they shrink further.

### Paragraph styles

| Style | Size | Use |
|---|---|---|
| XL paragraph | ~20px | Hero lead text — the one or two sentences beneath the hero headline |
| LG paragraph | ~18px | Body text in featured articles and sections |
| Base paragraph | ~16px | Default running body text |
| SM paragraph | ~14px | Card excerpts, metadata, footer text |

### Special text elements

- **Eyebrow label** — a small amber all-caps line that sits *above* a heading (e.g. "Featured Essay" or "Adventure Category"). Uses Syncopate at 14px with wide letter-spacing.
- **Tag badge** — a small pill-shaped amber badge with white Syncopate text. Used on article cards to indicate category (e.g. "Climbing", "Water").
- **Text button** — an underlined Syncopate link, used as an inline CTA or secondary link beside a section heading. Fades to 65% opacity on hover.

---

## 4. Spacing

Spacing is always drawn from a fixed scale — nothing is arbitrary. The scale uses a multiplier based on 0.25rem (≈ 4px):

| Name | Value | Approximate pixels |
|---|---|---|
| XXS | 0.25rem | 4px |
| XS | 0.5rem | 8px |
| SM | 0.75rem | 12px |
| MD | 1rem | 16px |
| LG | 1.5rem | 24px |
| XL | 2rem | 32px |
| 2XL | 3rem | 48px |
| 3XL | 4rem | 64px |
| 4XL | 5rem | 80px |
| 5XL | 8rem | 128px |

**Section vertical padding** — the breathing room above and below each section's content — is `3XL` (64px) on desktop. It reduces to `2XL` (48px) on phones. Sections have **no outer margin** — they stack directly against each other with zero gap. All the breathing room is *inside* each section, as padding.

**Container horizontal padding** — the gutters on the left and right of the content area — are `1.5rem` (24px) on desktop, reducing to `1rem` (16px) on small phones.

---

## 4b. Vertical Rhythm — Spacing Between Content Elements

Within any section, content elements stack vertically with consistent default gaps. These defaults apply automatically; individual components sometimes override them with utility classes (noted below).

### Default automatic spacing (no utility class needed)

| Element | Space below it | Pixels |
|---|---|---|
| Any heading (H1–H6) inside a section | 12px (SM) | 12px |
| Any paragraph inside a section | 16px (MD) | 16px |
| Last element in a container | 0 (no trailing gap) | — |

These two rules create the basic rhythm: headings sit close to the content that follows them, and paragraphs breathe a little more.

### Hero section internal spacing

The hero has its own rhythm since it uses explicit spacing utilities rather than automatic margins:

| Element | Space below it | Pixels |
|---|---|---|
| Eyebrow label (amber category text) | 16px (MD) | 16px |
| H1 title | set by utility class, typically 24px (LG) | 24px |
| Lead paragraph | 24px (LG) | 24px |
| Button group (appears below lead) | 0 (it provides its own top space) | — |

The button group itself has a 24px top margin built in (so there is always a 24px gap between the last paragraph and the first button).

> **Rule: buttons must always sit inside a `.button-group` wrapper.**
> A button placed directly after a paragraph, without a wrapper, has zero automatic spacing above it — it will collide with the text. The 24px (LG) gap only exists because of the wrapper's `margin-top`. This applies everywhere: CTAs in sections, hero buttons, accent-section CTAs. Even a single button should use a `.button-group` to get the correct spacing.

### Section heading row spacing

When a section begins with a heading row (H2 title + optional "See all" link), the heading row has **32px (XL) of space below it** before the content grid begins.

### Blog article body spacing

Long-form article text uses slightly looser spacing than section content:

| Element | Space above | Space below |
|---|---|---|
| H2 within article | 48px (2XL) | 12px (SM) |
| H3 within article | 32px (XL) | 8px (XS) |
| Paragraph | — | 16px (MD) |
| Lists | — | 16px (MD) |
| Inline image | 32px (XL) above and below | — |
| Full-bleed figure | 48px (2XL) above and below | — |
| Pull quote (blockquote) | 32px (XL) above and below | — |

### Article byline spacing

The byline row has 12px of padding above (where the grey dividing line sits) and 24px (LG) below it, before the next element.

### Inside article cards

Card body elements use a flex column with **12px (SM) gap** between every element — tag, title, excerpt, and author/date. This is tighter than section flow to keep cards compact.

### Inside feature cards

The icon, title, and description stack with **12px (SM) gap** between them.

### Breadcrumbs (blog heroes)

The breadcrumb trail that appears above the article title in blog heroes has **32px (XL) of space below it** before the category tag and H1.

---

## 5. Layout and Grid

### Maximum content width

All content is centred in a maximum-width container of **1200px**. On very large screens the container stops growing and sits centred with equal empty space on each side.

Editorial prose sections (blog articles, narrow text columns) use a narrower container of **48rem** (~768px) to keep line lengths comfortable for reading.

### The column grid

Content areas within a section are arranged in columns using a responsive grid:

| Configuration | Desktop | Tablet (≤ 991px) | Phone (≤ 767px) |
|---|---|---|---|
| Default | 2 columns | 2 columns | 1 column |
| 3-column | 3 columns | 2 columns | 1 column |
| 4-column | 4 columns | 2 columns | 1 column |

The gap between grid columns can be set to MD (16px), LG (24px), XL (32px), or 2XL (48px) depending on the content type.

### Text alignment and centering

By default, all text in sections is **left-aligned**. Centering is applied by adding `container--centered` to the container element. There are two common patterns:

| Pattern | Classes on the container | When used |
|---|---|---|
| Narrow + centred | `container--narrow container--centered` | Section intro paragraphs — the H2 heading and one or two lead sentences that appear **above** a content grid. Nearly every root page uses this for the first container in a section. |
| Full-width centred | `container--centered` | CTA-only containers — heading, body text, and button group are all centred together. Used in accent sections, standalone CTA sections, and some FAQ/form sections. |

**What gets centred:** all text, headings, paragraphs, and inline elements inside the container. **Exception:** lists (`<ul>`, `<ol>`) inside a centred container stay left-aligned regardless.

**Button groups in centred containers:** add `button-group--centered` to the `.button-group` element to also centre the buttons on the row (otherwise the group sits left-aligned inside the centred text block).

When a section uses **two separate containers** — one for the intro (narrow + centred) and one for the content grid (full-width, left-aligned) — the intro container appears first, followed by the grid container. The grid is never centred.

### Breakpoints

| Name | Width | What changes |
|---|---|---|
| Desktop | > 991px | Full multi-column layouts, large typography |
| Tablet | ≤ 991px | 3- and 4-column grids collapse to 2; heading sizes reduce |
| Mobile | ≤ 767px | All grids become 1 column; buttons stack vertically; heading sizes reduce further; section padding decreases |
| Small phone | ≤ 479px | Container padding reduces to 1rem; heading sizes reduce slightly more |

---

## 6. Rounded Corners

Cards, buttons, tags, and input fields all use rounded corners. The roundness is graded:

| Level | Value | Used on |
|---|---|---|
| SM | ~6px | Small UI elements |
| MD | ~8px | Navigation hover states, dropdown items, form inputs |
| LG | ~16px | FAQ accordion items |
| Card | ~20px | Article cards, generic cards, gallery images, feature cards |
| Full pill | 9999px | Buttons, tags, avatar images |

---

## 7. Shadows and Effects

### Button offset shadow

The most distinctive effect on the site. Primary and ghost buttons have a solid offset shadow — a copy of the button's footprint, shifted 3px right and 3px down, in a contrasting colour (amber on dark buttons, black on amber buttons). When you hover, the button lifts slightly (moves 2px up-left) and the shadow grows to 5px offset. When clicked, the button presses down (0px offset). This mimics the feel of a rubber stamp.

### Card shadow

Cards have a very subtle `box-shadow` (soft, blurred, low-opacity black below the card). On hover, this shadow deepens slightly and the card background warms to cream.

### Hero image overlay

Every hero section has a dark gradient overlaid on top of the photograph to ensure white text remains readable. Two overlay types exist:

- **Standard overlay** — gradient runs from bottom to top: very dark at the bottom (75% black), medium in the middle (45%), light at the top (25%). Used on pages where the content text sits centrally or lower.
- **Side overlay** — gradient runs from left to right: very dark on the left (88%), fading to nearly transparent on the right (15%). Used on adventures and destination pages where the headline is on the left.

### Focus ring

For keyboard navigation, focused elements show a 2px solid black outline with a 2px gap. On dark backgrounds, the outline colour switches to white.

---

## 8. Transitions and Motion

All interactive states (hover, active, focus) animate with short transitions:

- **Fast** (0.15s ease) — button transforms, nav highlights, card background colour changes
- **Normal** (0.3s ease) — megamenu appearance, FAQ accordion expansion, tab switcher

The ticker strip (see below) animates continuously at 40 seconds per full loop. All motion is automatically disabled for users who have requested reduced motion in their operating system settings.

---

## 9. Buttons

All buttons use Syncopate, pill shape, and the offset shadow effect. There are four variants:

### Primary button (black)

**Appearance:** Black fill, white text, amber 3px offset shadow below-right. Pill-shaped.
**Hover:** Lifts 2px; shadow grows to 5px.
**Use:** The main call-to-action in white and grey sections.
**On dark sections:** Automatically inverts to white fill with amber shadow.
**On amber sections:** Automatically inverts to black fill with white shadow.

### Accent button (amber)

**Appearance:** Amber fill, black text, black 3px offset shadow. Pill-shaped.
**Hover:** Lifts 2px; shadow grows to 5px.
**Use:** The single most important action on the page — almost always the hero's primary CTA.

### Ghost button (outline)

**Appearance:** Transparent fill, black 2px border, amber offset shadow. Pill-shaped.
**Hover:** Fills solid black with white text, shadow grows.
**Use:** Secondary action alongside a primary button (e.g. "Learn More" next to "Book Now").
**On dark sections:** Automatically renders as white outline with white text.

### Text button (underlined link)

**Appearance:** No border, no background. Syncopate text with a fine underline. Inherits the current text colour.
**Hover:** Fades to 65% opacity.
**Use:** Inline secondary links — typically placed next to a section heading as a "See all →" style link.

### Button groups

When two buttons sit side-by-side (primary + ghost), they are placed in a button group. On desktop they sit in a row with a gap. On mobile they stack vertically and each fills the full width.

---

## 10. Sections

The page is divided into large horizontal bands called sections. Each section spans the full width of the browser window. All content sits centred inside a max-width container *within* the section. **Sections have no margin between them** — they sit flush against each other. All breathing room comes from the padding *inside* each section (64px top and bottom on desktop).

> **Universal padding rule: all section variants share the exact same padding.**
> The variant class (secondary, inverse, accent) changes *only* the background colour — it never changes the spacing. Every section on the site, regardless of colour, has 64px of padding above and below its content on desktop (48px on tablet, 32px on mobile). Never reduce or override section padding to make one variant look "tighter" than another.

### Section colour variants

| Variant | Background | Text | Typical use |
|---|---|---|---|
| **Default** | White | Black | Neutral content — article grids, features |
| **Secondary** | Warm pale grey (#f0ece4) | Black | Subtle alternating sections — breaks up adjacent white sections |
| **Inverse** | Deep black (#0f1a14) | White | Dramatic contrast — photo galleries, highlighted quotes, dark CTAs |
| **Accent** | Amber (#e8651a) | Black | High-energy CTAs — newsletter sign-ups, bold promotions |
| **Hero** | Full-bleed photograph + overlay | White | Top of every page — the big opening image with title and CTA |

### Automatic child adjustments

When you place a button, card, or heading inside a section variant, the site automatically applies the right colour treatment — you never need to manually adjust them:

- Inside **inverse** sections: headings and paragraphs turn white; cards darken; buttons invert to white fill
- Inside **accent** sections: buttons switch to black fill with white shadow
- Inside **hero** sections: the primary button gains a white fill; ghost buttons get a white outline

### Typical page rhythm

Pages usually alternate section backgrounds to provide visual breathing room:

```
Hero → Pale grey → White → Dark/Inverse → Pale grey → White → Amber/Accent
```

Blog article pages follow a fixed 5-section structure:

```
Hero (with article headline and byline) → Article body (white) → Photo gallery (dark) → Subscribe CTA (amber) → Related articles (pale grey)
```

---

## 11. The Hero Section

The hero is always the very first thing you see on any page. It spans the full browser width and height (minimum 55% of the screen height, or 65% on the homepage and adventures page). A large photograph fills the entire area. A dark gradient overlay ensures the white title text remains readable.

**Contents of a hero:**
- Optional small amber eyebrow label above the title (e.g. "Adventure Journal")
- Large H1 title (the biggest text on the page)
- A lead sentence or two in large body text
- One or two buttons (amber accent button as primary, ghost button as secondary)

**Blog article heroes** additionally show:
- A breadcrumb trail above the title (e.g. Home › Field Notes › Article Title)
- An amber category tag (e.g. "Climbing · Patagonia · Expedition")
- An author byline below the title — a small circular avatar photo, the author's name, and the publication date

---

## 12. The Navigation Bar (Header)

The navigation bar sits at the very top of every page and **sticks to the top of the screen** as you scroll — it never disappears.

### Layout at rest (no menu open)

The bar is a single horizontal strip: white background, 1px warm-grey line along the bottom edge. Inside, all elements sit on a single row with 16px (MD) of vertical padding above and below. From left to right:

1. **Logo** — a 32px square brand icon plus "WKND" on one line and "Adventures" on the second, both in Syncopate at 12px with wide letter-spacing. The icon and text have an 8px gap between them. The entire logo is a clickable link back to the homepage.
2. **Navigation links** — a horizontal list of the three top-level items (Explore, Stories, Info). Items are spaced 8px (XS) apart. Each item is a pill-shaped button with 8px vertical / 12px horizontal padding in 14px body-weight-500 text, plus a tiny chevron arrow (rotated 45° to point down) after the label. Hovering any item gives it a pale grey (Gray-100) background.
3. **Subscribe button** — pushed to the far right by an automatic left margin. A standard black primary button (pill shape, amber offset shadow).
4. **Menu button (mobile only)** — hidden on desktop; appears on screens ≤ 991px.

### How the megamenu panels open and close (desktop)

**Opening:** You do not need to click. As soon as your mouse enters the area of a top-level nav item (the button label + chevron), the panel opens immediately — no delay, no animation, it simply appears.

Simultaneously, the chevron arrow rotates from pointing downward to pointing upward, signalling that the menu is open.

**Staying open:** The panel is physically attached to the page just below the navigation bar (it stretches the full browser width). Once your mouse moves down into the panel, the panel remains open — the system understands you're moving towards it. This avoids the frustrating experience where a menu disappears the moment your cursor briefly leaves the trigger button.

Under the hood: both the trigger button and the panel itself are monitored. Moving your mouse off either one starts a 200-millisecond countdown to close. Moving back onto either one immediately cancels that countdown. This 200ms "grace period" is what allows you to smoothly move the cursor from the button down into the panel without it closing.

**Closing:** The panel closes 200ms after your mouse leaves both the trigger button and the panel area entirely. If you move to another top-level nav item, that item's panel opens immediately (the previous one closes on its own grace-period timer).

The panel also works for keyboard users: navigating into the menu links with the Tab key keeps the panel open via focus detection.

**Panel appearance:** White background, 1px grey top and bottom border, soft blurred shadow below (0 8px 32px, 8% black). 32px (XL) internal padding above and below the links.

### What the three panels look like

**Explore panel — 3-column grid:**
Three equal columns side by side. Each column is a single link with a bold title (16px, weight 600, black) and a short description below it in 14px grey text. Hovering a column gives it a pale grey (Gray-100) rounded background (8px radius). Links are: Adventures, Expeditions, Destinations.

**Info panel — 4-column grid:**
Same style as Explore but four equal columns. Links are: Gear, Sustainability, About, FAQ.

**Stories panel — asymmetric 2-part layout:**
The left third contains a vertical list of page links (Field Notes, Community) under a small Syncopate label ("PAGES" or similar) in grey. A thin 1px grey vertical line separates this column from the right two-thirds. The right side is a 2×2 grid of recent article entries — each entry has a bold title (16px, weight 500) and a short description in 14px grey below it. Hovering any entry in either side gives it the same pale grey rounded background. The two sides share 48px (2XL) of gap between them.

All megamenu section labels (column headings like "PAGES") are in Syncopate 14px, bold, Grey-500, with wide 0.08em letter-spacing.

### Mobile navigation (screens ≤ 991px)

The centre nav links disappear entirely. The "Menu" button becomes visible on the right (it is always above the Subscribe button in z-order so it remains tappable).

**Opening:** Tapping "Menu" instantly overlays the entire page with a full-screen white panel. It slides in from nowhere — it just covers everything. The panel scrolls vertically if content overflows. Top padding is 80px (4XL) to clear the navbar behind it. Side padding equals the standard container gutter. Bottom padding is 32px (XL).

**Inside the mobile menu:** The three top-level items (Explore, Stories, Info) are stacked vertically. Each is displayed as a full-width button with the label on the left and the chevron on the right. Tapping an item toggles its sub-links open inline, beneath it — accordion style. The sub-links are indented slightly (left-padded). The megamenu grids collapse to single-column lists. The Stories panel loses its side-by-side layout and stacks pages above articles. When a sub-menu opens, the chevron rotates upward.

**Closing:** Tapping the "×" close button (which replaces the "Menu" label once open) dismisses the overlay. There is no background-tap-to-close; you must use the close button.

---

## 13. The Footer

The footer sits at the very bottom of every page. It uses the **inverse** (dark) treatment: deep black background with a **4px amber top border** — a strong visual signal that you have reached the end of the page.

**Layout:**
The footer content is arranged in 4 equal columns on desktop (collapsing to 2 on tablet and 1 on mobile):

1. **Column 1 — Brand:** The WKND logo in white, a short tagline, and social media icon buttons (circular grey pills that highlight lighter on hover)
2. **Column 2 — Explore:** Links to main content sections (Adventures, Expeditions, Destinations, Field Notes, Community)
3. **Column 3 — Recent Stories:** Links to the 5 most recent blog articles
4. **Column 4 — Info:** Links to Gear, Sustainability, About, FAQ

Footer link text is in Gray-500 (a mid-tone grey), turning white on hover. Column headings are in H6 Syncopate (white).

**Footer bottom bar:** Below the columns, a 1px grey dividing line separates a small bottom strip containing two lines of copyright/tagline text, left and right aligned.

---

## 14. Blocks (Reusable Content Patterns)

The following are the named, reusable visual building blocks used throughout the site. They appear inside sections.

---

### Article Card

**Purpose:** A linked preview of a blog article, used to display a list of articles in a grid.

**Appearance:**
- Rounded card (~20px corners) with a thin warm-grey border
- A **16:10 ratio** photo at the top (wider than tall — landscape orientation)
- Below the photo: an amber category tag badge, an optional region label in grey, the article title in H5 Syncopate, a short excerpt in small body text, and a grey author/date line at the bottom
- The entire card is a clickable link

**Hover:** All three properties transition together in 0.15s ease — the background changes from white to cream (#f5f0e8), the border darkens from Gray-200 to Gray-300, and a soft shadow appears below (0 4px 20px, 8% black). The image does not scale or zoom; only the card container changes.

**In dark (inverse) sections:** At rest, the card has a very dark semi-transparent background (white at 6% opacity) with a faint white border (12% opacity) and white text. On hover, the background flips to cream and all text flips to black — headings, body text, and secondary grey text all switch simultaneously in the same 0.15s transition.

**Used in:** Grids of 3 or 4 columns across nearly every page.

---

### Featured Article

**Purpose:** A high-prominence showcase for a single article — typically the editorial "lead story" of a section.

**Appearance:**
- A two-column layout: a large photograph on the left, text content on the right (equal columns)
- The photograph has rounded corners and is tall (min 20rem)
- On the right: an amber eyebrow label, H2 title, two paragraphs of excerpt text, then a footer bar
- The footer bar spans the full right column: author byline (avatar + name + date) on the left, a black "Read the Essay" button on the right

**Hover:** The photograph itself has no hover effect. If the card is wrapped in a link, there is no visual state change on the featured article as a whole — the CTA button inside it handles its own hover independently.

**On tablet:** Collapses to a single column (photo above, text below). The footer bar (byline + button) also stacks vertically, with the button aligned to the right edge below the byline.

**Used in:** Homepage, Adventures, Community, Destinations, Field Notes, Gear, Sustainability pages.

---

### Generic Card

**Purpose:** A standalone bordered box for promotional text, short CTAs, or any content that needs a visual container without a photo.

**Appearance:**
- Rounded border card with 24px internal padding
- Typically contains: an amber eyebrow label, an H3 heading, a paragraph of body text, and a ghost button
- White background with warm-grey border; cream background on hover

**Hover:** Same as the article card — background warms to cream, border darkens to Gray-300, soft shadow appears. Transition: 0.15s ease. Only applies when the card is itself a link; non-linked cards have no hover state.

**Used in:** Pairs (side-by-side, 2-column grid) for "Pair" promos, or standalone text blocks.

---

### Feature Card

**Purpose:** An icon-and-text block for presenting principles, values, or key features — always in groups of three.

**Appearance:**
- A bordered card with 24px internal padding
- A small icon or symbol at the top
- An H5 heading
- A short descriptive paragraph below

**Hover:** Feature cards have no hover state — they are informational, not clickable links.

**Used in:** About, Gear, Sustainability pages — always in a 3-column grid.

---

### Editorial Index

**Purpose:** A numbered list of items with a bold editorial style — for ranked recommendations, step-by-step guides, or "things to know" lists.

**Appearance:**
- Each item is a horizontal row with a thick amber top and bottom border (1px)
- On the left: a very large amber Syncopate number (e.g. "01", "02") — approximately 56px
- On the right: an H4 heading and a paragraph of description
- Numbers are always two-digit zero-padded (01, 02 ... 09, 10)

**Hover:** The editorial index has no hover state — items are static text, not interactive links.

**Used in:** Homepage, Adventures, Community, Destinations, Expeditions, Gear, Sustainability.

---

### Tab Menu

**Purpose:** A horizontal switcher that shows different groups of content in the same space — like switching between activity types or team member profiles.

**Appearance:**
- A horizontal row of large H5-sized Syncopate labels, with a 2px black top border running across all tabs
- Inactive tabs: Gray-300 text
- Active tab: Black text with a 4px amber underline below only that tab
- Hover on inactive: Gray-500

**Hover:** Inactive tabs change colour from Gray-300 to Gray-500 on hover — a subtle darkening that confirms interactivity. The already-active tab does not change on hover. Transition: 0.15s ease.

**Behaviour:** Clicking a tab instantly swaps the content below it — no animation, the new panel appears immediately. The amber underline jumps to the newly selected tab. Tab switching is handled by JavaScript adding/removing an `is-active` class.

**Used in:** Homepage, Adventures, About, Gear, Sustainability, Field Notes, Expeditions — for activity filters, team profiles, gear categories, and topic filters.

---

### FAQ Accordion

**Purpose:** A list of question-and-answer pairs where each answer is hidden until the user clicks the question — saves space and lets users scan for what they need.

**Appearance:**
- Each item is a rounded card (1rem radius) with a thin warm-grey border
- The question text is displayed with an amber "+" icon on the right
- When clicked, the answer slides down smoothly and the "+" rotates to become a "×"
- The answer text is in Dark Grey-700 with 1.7 line height for readability; links within answers are amber and underlined

**Hover (on the question row):** The question row background changes to pale grey (Gray-100) and the card's border highlights in amber. Both happen in 0.15s ease. This makes it clear the question is clickable even before you click.

**Open/close animation:** Clicking a question toggles the answer. The answer expands by transitioning `max-height` from 0 to ~480px over 0.35s ease — the content smoothly slides down rather than appearing instantly. The "+" icon rotates 45° to form an "×" over 0.3s ease. Clicking again collapses the answer with the reverse animation. Only one question can show its animation at a time, but multiple can be open simultaneously (there is no forced single-open restriction).

**Used in:** Homepage, About, Community, FAQ page.

---

### Gallery Grid

**Purpose:** A visual collage of photographs in a dark section — showcases field photography in a magazine-spread style.

**Appearance:**
- Dark (inverse) black section background
- A section heading ("In the Field") left-aligned, with a "Field Notes →" text link on the right
- Three equal-width photos in a row, each 280px tall with rounded corners and `cover` cropping
- Below those: one full-width "wide" photo at 360px tall, also rounded

**Hover:** Gallery images have no hover state — they are static display images, not links.

**Used in:** Homepage and all 10 blog articles.

---

### Pull Quote

**Purpose:** Highlights a key phrase or memorable quote from an article.

**Appearance:**
- A 4px solid amber left-border (like a bookshelf tab)
- The quote text is large (20px), italic, in Dark Grey-700
- Below the quote: an amber attribution line in tiny Syncopate with wide letter-spacing (e.g. "— Jordan Voss")

**Hover:** No hover state — pull quotes are purely presentational.

**Used in:** Homepage, Sustainability, and all 10 blog articles.

---

### Ticker Strip

**Purpose:** An infinite horizontally scrolling band of short phrases — adds energy and brand presence between content sections.

**Appearance:**
- A narrow horizontal band bordered by 1px amber lines above and below
- Inside: repeating text phrases separated by amber "✦" diamond symbols, all in Syncopate
- The text scrolls smoothly from right to left, looping seamlessly (40-second cycle)
- Motion is disabled for users who prefer reduced motion; on those devices the ticker is a static scrollable row instead

**Hover:** No hover state. The strip is decorative, not interactive.

**Used in:** Homepage only — appears between the "Browse by Activity" tabs and the "Start Here" section.

---

### Article Byline

**Purpose:** Identifies the author of an article — their photo, name, and publication date.

**Appearance:**
- A horizontal row with a thin grey top border above it
- A circular avatar photo (48px diameter, fully round)
- To the right: the author's name in bold small black text, the date in tiny Grey-500 text below

**In a hero section:** The avatar enlarges to 80px; name auto-styles to white, date to 70% white opacity, for readability on dark backgrounds.

**In a featured article:** The avatar is slightly larger (56px) and has a thin Grey-200 circular border ring around it.

**Hover:** No hover state on the byline itself — it is informational only. The parent card or article handles its own hover.

**Used in:** Blog article heroes and Featured Article components.

---

### Blog Article Body

**Purpose:** The main reading area for long-form articles.

**Appearance:**
- Narrow reading container (max 48rem / ~768px wide) centred on the page
- Generous top padding (48px) before the text begins
- **Body paragraphs:** Base 16px Instrument Sans, 1.7 line height, with 16px bottom margin between paragraphs
- **Headings (H2/H3):** Syncopate, with extra space above them to signal a new section
- **Bullet and numbered lists:** Standard disc/decimal bullets with left indent
- **Gear lists:** Same style as bullet lists, used for equipment recommendations
- **Blockquotes:** Standard — amber 4px left border, italic Grey-700 text, indented
- **Pull quotes:** Same as standalone Pull Quote component (see above)
- **Inline images:** Rounded corners, with vertical margin above and below
- **Full-bleed figures:** A special treatment that breaks the narrow container and stretches the image to the full browser width. The image is 520px tall on desktop (260px on mobile), no rounded corners. A caption appears below in small italic Grey-500 text, re-constrained to the narrow reading width.

**Hover:** No hover states within the article body. Images are static. Links within the body text inherit the page's default link colour (black) with no underline at rest — individual styling is applied per-use.

---

### Team Profile

**Purpose:** Presents a team member with their photo, name, role, and biography — used on the About page inside tab panes.

**Appearance:**
- A two-column row: a fixed-width left column (11rem wide) containing a circular profile photo (128px diameter, with a 3px amber border ring) and the person's name and role below it
- A wide right column containing several paragraphs of biography text in large 18px body text
- The biography column's left edge is carefully aligned with the narrow prose container used in the section below it, for visual continuity

**On mobile:** Stacks to a single column (photo and name above, biography below). The invisible spacer element that aligns the bio to the narrow container is hidden entirely, so the photo sits flush left.

**Hover:** No hover state — the team profile is informational, not a link.

**Used in:** About page only, inside the team member tab panes.

---

## 15. Section Heading Pattern

Many sections begin with a heading row that spans the full container width:

- **Section heading text** (H2) sits on the left
- An optional **text button** ("See all →") sits flush to the right

This is achieved by the section heading acting as a flex row with the two elements at opposite ends. The amber underline of the text button provides a visual connection back to the amber brand colour.

---

## 16. Forms

Form inputs are simple and clean:

- **Text inputs:** Full-width, 1px warm-grey border, 16px internal padding, slightly rounded corners (8px). On focus, the border and a 2px outline both turn amber.
- **Labels:** Bold 600-weight Instrument Sans, displayed above the input field.

---

## 17. Accessibility

The site includes several features to support users who rely on assistive technology or prefer reduced motion:

- A **"Skip to main content" link** is hidden above the page and becomes visible when focused with a keyboard (Tab key). It has a black background and white text.
- All interactive elements show a clear black focus ring (2px, 2px offset) when navigated by keyboard. On dark backgrounds, the ring is white.
- All animations and transitions are disabled for users who have turned on "Reduce Motion" in their operating system.
- Navigation landmarks, `aria-label` attributes, and `role` assignments are used throughout to assist screen readers.

---

*→ See [design-system.md](design-system.md) for token tables and CSS class references*
*→ See [components.md](components.md) for HTML markup patterns*
*→ See [page-inventory.md](page-inventory.md) for per-page section breakdowns*
