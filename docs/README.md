# Legacy Documentation (Deprecated)

⚠️ **This directory contains documentation from the old system (hand-written HTML files).**

The project has been **refactored to use JSON data + template modules**. These files are **no longer accurate**.

## Current Documentation

For how the project actually works now, see:

- **[DOCUMENTATION.md](../DOCUMENTATION.md)** — Complete guide to the new architecture
- **[AGENTS.md](../AGENTS.md)** — Development guide for making changes

## Legacy Files (Don't Use)

The files in this directory describe the old system where:
- All HTML was hand-written and duplicated across 20 files
- Changes required editing multiple files
- There was no generation system

These files are kept for reference only:

- `site-guide.md` — Old site structure (outdated)
- `page-inventory.md` — Old page inventory (outdated)
- `components.md` — Old component guide (partially outdated)
- `design-system.md` — Design tokens (still relevant for CSS, but structure references are outdated)
- `visual-design-guide.md` — Design reference (still relevant for styling, outdated for structure)
- `content-reuse-strategy.md` — Old fragment strategy (outdated; fragments now loaded differently)
- `image-catalog.md` — Image tracking (still useful for managing images)

## What to Do Instead

1. **For understanding the architecture**: Read [DOCUMENTATION.md](../DOCUMENTATION.md)
2. **For making changes**: Read [AGENTS.md](../AGENTS.md)
3. **For CSS/styling reference**: `css/styles.css` and the visual design guide are still useful
4. **For image management**: Track images in the code, not in a separate catalog

---

**TL;DR**: The system is now data-driven. Edit JSON in `data/`, run `npm run generate`, done.
