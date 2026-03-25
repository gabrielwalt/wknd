# Design System

Reference for tokens, section styles, layout, and buttons.

→ Part of the [WKND Adventures Site Guide](site-guide.md)

---

## Design Tokens (`css/tokens.css`)

All visual values are defined as CSS custom properties on `:root`. Never hardcode colors, spacing, or radii — always use a token.

| Group | Tokens |
|---|---|
| **Colors** | `--color-white` · `--color-black` (#0f1a14) · `--color-amber` (#e8651a) · `--color-forest` (#1a3a2e) · `--color-cream` (#f5f0e8) · `--color-gray-100/200/300/500/700/900` |
| **Typography** | `--font-heading: "Syncopate"` · `--font-body: "Instrument Sans"` · `--text-xs` … `--text-5xl` |
| **Spacing** | `--space-xxs` (0.25rem) · `--space-xs` · `--space-sm` · `--space-md` · `--space-lg` · `--space-xl` · `--space-2xl` · `--space-3xl` · `--space-4xl` · `--space-5xl` (8rem) · `--section-gap` |
| **Layout** | `--container-max: 1200px` · `--container-narrow: 48rem` · `--container-padding: 1.5rem` |
| **Radius** | `--radius-sm` · `--radius-md` · `--radius-lg` · `--radius-card` (1.25rem) · `--radius-full` |
| **Shadows** | `--shadow-button` (4px 4px 0 0 black) · `--shadow-card` |
| **Transitions** | `--transition-fast` (0.15s ease) · `--transition-normal` (0.3s ease) |

Responsive token overrides reduce type sizes at ≤991px and ≤767px breakpoints.

---

## Section Styles (`css/sections.css`)

Every page is divided into `<section>` blocks. Each section contains a `<div class="container">`.

| Class | Background | Text | Use |
|---|---|---|---|
| `section` | white | black | Default/neutral content |
| `section secondary-section` | `--color-gray-100` (#f0ece4) | black | Subtle alternating background |
| `section inverse-section` | `--color-black` (#0f1a14) | white | Dark/dramatic contrast |
| `section accent-section` | `--color-amber` (#e8651a) | black | High-energy CTAs, newsletter sign-ups |
| `hero-section` | full-bleed image | white (over overlay) | Page-top hero |
| `hero-section hero-section--full` | — | — | Taller hero (65vh vs 55vh min-height) |

### Section rhythm

Most root pages alternate like:
```
hero → secondary → section → inverse → secondary → section → accent
```

Blog articles use a fixed 5-section structure:
```
hero → article-body → secondary (gallery) → accent (CTA) → secondary (related)
```

### Automatic child style overrides

`sections.css` adjusts components placed inside section variants — no extra classes needed:

**`inverse-section`**
- Headings → `--color-white`
- Paragraphs → `rgba(255,255,255,0.85)`
- `.card`, `.article-card` → dark semi-transparent bg, white border, white text
- Hover on cards → cream bg, black text
- `.button` → white fill, amber shadow
- `.button--ghost` → white outline, white text; hover → white fill, black text

**`accent-section`**
- `.button` → black fill, white shadow
- `.button--ghost` → black outline; hover → white fill

**`hero-section`**
- `.button` → white fill, amber shadow
- `.button--ghost` → transparent, white outline; hover → amber fill, black text

---

## Grid System (`css/base.css`)

The base grid is 2 columns. Use modifier classes to change column count.

| Class | Desktop | Tablet (≤991px) | Mobile (≤767px) |
|---|---|---|---|
| `grid-layout` | 2 cols | 2 cols | 1 col |
| `grid-layout desktop-3-column` | 3 cols | 2 cols | 1 col |
| `grid-layout desktop-4-column` | 4 cols | 2 cols | 1 col |
| `grid-layout grid-layout--2col` | 2 cols | 2 cols | 1 col |

**Gap modifiers**: `grid-gap-md` (1rem) · `grid-gap-lg` (1.5rem) · `grid-gap-xl` (2rem) · `grid-gap-xxl` (4rem)

**Column span**: `.span-2` — item spans 2 columns (used in blog layout).

### Container variants

| Class | Effect |
|---|---|
| `.container` | Max-width 1200px, centered, horizontal padding |
| `.container--centered` | Center-aligned text (lists stay left-aligned) |
| `.container--narrow` | Max-width `var(--container-narrow)` (48rem) — editorial prose |
| `.blog-article-container` | Same max-width as `.container--narrow` — blog article body |

---

## Button Styles (`css/button.css`)

All buttons and `.text-button`: uppercase, `font-heading` (Syncopate), pill shape (`--radius-full`) where applicable; solid/ghost buttons use offset drop shadow that shifts on hover/active.

| Class | Fill | Shadow | Use |
|---|---|---|---|
| `.button` | `--color-black` | amber | Primary CTA on white/gray sections |
| `.accent-button` | `--color-amber` | black | Hero primary CTA; the single most important action |
| `.button--ghost` | transparent | amber | Secondary action alongside a primary button |
| `.text-button` | — | — | Inline text link (underlined, uppercase, fades on hover) |

**Wrapper**: `.button-group` — flex row, collapses to column on mobile. `.button-group--centered` centers it.

### Button choice by context

| Section context | Primary button | Secondary button |
|---|---|---|
| White / gray section | `.button` (black) | `.button--ghost` |
| `inverse-section` | `.button` (auto → white fill) | `.button--ghost` (auto → white outline) |
| `accent-section` | `.button` (auto → black fill) | `.button--ghost` |
| `hero-section` | `.accent-button` or `.button` (auto → white) | `.button--ghost` (auto → ghost style) |

---

## Typography Classes (`css/base.css`)

| Class | Size | Font | Use |
|---|---|---|---|
| `h1-heading` / `h1` | `--text-5xl` | Syncopate 700, uppercase | Page titles (hero only) |
| `h2-heading` / `h2` | `--text-4xl` | Syncopate 700, uppercase | Section headings |
| `h3-heading` / `h3` | `--text-3xl` | Syncopate 700, uppercase | Sub-section headings |
| `h4-heading` / `h4` | `--text-2xl` | Syncopate 700, uppercase | Card headings |
| `h5-heading` / `h5` | `--text-xl` | Syncopate 700, uppercase | Small card titles |
| `h6-heading` / `h6` | `--text-sm` | Syncopate 700, uppercase, +letter-spacing | Labels (footer col headings) |
| `paragraph-xl` | `--text-xl` | Instrument Sans | Hero lead text |
| `paragraph-lg` | `--text-lg` | Instrument Sans | Section body text |
| `paragraph-sm` | `--text-sm` | Instrument Sans | Card excerpts, meta |
| `hero-eyebrow` | `--text-sm` | Syncopate 700, amber, uppercase, +letter-spacing | Category label above hero H1 |
| `.tag` | `--text-xs` | Syncopate 600, uppercase | Amber badge on article cards |
| `.utility-text-secondary` | — | — | `--color-gray-500` muted text |
| `.utility-overflow-x-clip` | — | — | `overflow-x: clip` — e.g. full-bleed figures inside `.blog-content` without horizontal scroll |

---

*→ See [components.md](components.md) for block-level HTML patterns*
*→ See [page-inventory.md](page-inventory.md) for per-page section breakdowns*
