# Contributing & Maintenance

Guidelines for maintaining the project, code, and documentation.

## Core Principles

### 1. Edit Data and Templates, Not HTML

**Never hand-edit `.html` files.** All HTML is generated.

```bash
# ✓ Correct
edit data/pages/adventures.json  # Change content
edit templates/blocks/hero.mjs   # Change structure
npm run generate                  # Regenerate HTML

# ✗ Wrong
edit adventures.html             # Will be overwritten
```

Every generated file starts with a comment:
```html
<!-- GENERATED FILE — edit data/ + templates/, not this file -->
```

### 2. Single Source of Truth

Documentation should be DRY (don't repeat yourself). Each fact should live in one place:

- **Code behavior** → JSDoc comments in source files (not docs)
- **CSS tokens and values** → `css/tokens.css` (source of truth)
- **Design intent** → JSDoc + design docs
- **JSON schema** → `docs/DATA_FORMAT.md`
- **System architecture** → `docs/ARCHITECTURE.md`

If you find documentation in two places, consolidate it. Remove the duplicate and add a link.

### 3. Keep Docs Close to Code

When adding a new feature:

1. **Add JSDoc to the source file** (most important)
2. **Update CONTRIBUTING.md** if workflow changes
3. **Reference code files from the docs** instead of repeating specs

Example: Don't describe button props in docs. Instead, link to:
> See `templates/components/button.mjs` for detailed parameters and usage.

## Documentation Structure

```
docs/
├── README.md                  # Navigation hub, quick start
├── ARCHITECTURE.md            # System overview, how parts connect
├── DATA_FORMAT.md            # JSON schemas with examples
├── GENERATION.md             # Build process, npm scripts, workflows
├── DESIGN_SYSTEM.md          # CSS tokens, layout, sections (see css/tokens.css)
├── VISUAL_GUIDE.md           # Design philosophy, aesthetics
└── CONTRIBUTING.md           # This file — maintenance guidelines
```

**Hierarchy**:
- Start with README.md (navigation)
- For architecture understanding → ARCHITECTURE.md
- For data editing → DATA_FORMAT.md
- For build/workflows → GENERATION.md
- For CSS reference → DESIGN_SYSTEM.md
- For design aesthetics → VISUAL_GUIDE.md
- For contributing → CONTRIBUTING.md

## Making Changes

### Adding a New Block/Component

1. Create `templates/blocks/blockname.mjs` or `templates/components/componentname.mjs`
2. **Add comprehensive JSDoc** (parameters, usage, examples)
3. Export a named function
4. Use the block in page data

**Don't** document the component in markdown docs. Link to the JSDoc instead.

Example JSDoc:
```javascript
/**
 * Renders a featured article section with image, metadata, heading, description, and CTA button
 * @param {Object} data
 * @param {Object} data.image - Article image {src, alt}
 * @param {string} data.heading - Article title (required)
 * @param {string} data.body - Article description (required)
 * @param {Object} [data.button] - Optional CTA button {href, label, variant}
 * @returns {string} HTML: <section class="section secondary-section">
 *
 * Used for highlighting featured content on pages
 * See data/pages/*.json for examples
 */
export function featuredArticle(data) { ... }
```

### Adding a New Data Field

1. Update `data/site.json`, `data/pages/*.json`, or `data/blog/*.json` with the field
2. Update template to use the field (add to JSDoc if new param)
3. Regenerate: `npm run generate`
4. Update `docs/DATA_FORMAT.md` with JSON schema example

### Changing CSS

1. Edit `css/styles.css` or the module it imports (no generation needed)
2. Update tokens in `css/tokens.css` if changing design values
3. If the change affects how generated HTML should work, update the template
4. Update `docs/DESIGN_SYSTEM.md` only if you changed tokens or layout structure

### Fixing a Bug or Making an Improvement

1. **Identify the root cause** (data, template, CSS, or JS)
2. **Make the fix** in the source (not generated files)
3. **Regenerate**: `npm run generate`
4. **Update docs** only if:
   - You changed a template's parameters → update JSDoc
   - You changed build process → update `docs/GENERATION.md`
   - You changed data schema → update `docs/DATA_FORMAT.md`
   - You changed CSS architecture → update `docs/DESIGN_SYSTEM.md`

### Updating Documentation

**Before editing docs:**
- Check if the info already exists elsewhere (JSDoc, code comments, other docs)
- If it does, just link to it instead of repeating
- If it doesn't, add it to the source (JSDoc first, then docs if needed)

**When to update each doc:**

| Doc | When to Update |
|---|---|
| `README.md` | Navigation changed, new docs added, quick-start changed |
| `ARCHITECTURE.md` | Core system structure changed (new assembler, new component type, etc.) |
| `DATA_FORMAT.md` | JSON schema changed, new field added, field removed |
| `GENERATION.md` | npm script changed, build process changed, workflow changed |
| `DESIGN_SYSTEM.md` | CSS tokens changed, layout system changed, section styles changed |
| `VISUAL_GUIDE.md` | Design philosophy changed, color usage changed, spacing changed |
| JSDoc in code | Any template parameters changed, any function added |

## Git Workflow

```bash
# Content changes (data files + generated HTML)
git add data/ *.html blog/ fragments/
git commit -m "Update [description]: change what in which files"

# Template changes (source code + generated HTML)
git add templates/ *.html blog/ fragments/
git commit -m "Update [block name]: describe the change"

# Documentation changes
git add docs/
git commit -m "Docs: update [which docs] for [reason]"

# CSS changes
git add css/
git commit -m "Styles: [description of CSS change]"

# Multiple types
git add templates/ data/ docs/ *.html blog/ fragments/
git commit -m "Feature: [name]. Update templates, data, and docs"
```

## Code Quality

### Templates

- Single named export (function)
- Destructure parameters in function signature
- Always extract `depth` if using URLs
- Use `ref()` for any relative URLs
- Return complete HTML string (one block/section only)
- Include JSDoc comment

### JSDoc Comments

Required for all template functions. Include:
- `@param` for each parameter with type and description
- `@returns` describing the HTML returned
- Usage notes (where used, constraints, etc.)
- Reference to data file examples if helpful

Example:
```javascript
/**
 * Renders a [description]
 * @param {Object} data
 * @param {string} data.heading - [description] (required)
 * @param {string} [data.optional] - [description] (optional)
 * @returns {string} HTML: <section class="...">
 *
 * Used for [what purpose]
 * See data/pages/*.json for examples
 */
```

### Data Files

- Keep JSON valid (use IDE linter)
- Use consistent key names (camelCase)
- Always provide `alt` text for images
- Always provide `depth` in meta
- Store URLs root-relative (no `../`)

### Commit Messages

- Start with verb (Add, Update, Fix, Docs)
- Be specific about what changed
- Reference which files/features affected

Examples:
```
Add new "case studies" block template
Update hero section: support overlay variants
Fix button semantic HTML (span not div)
Docs: clarify data schema in DATA_FORMAT.md
```

## Testing

### Before Committing

1. **Run generation**: `npm run generate`
2. **Check diffs**: `git diff` to verify changes are intentional
3. **Preview**: Open changed pages in browser
4. **Validate**: Build process completes without errors: `npm run build:pages`

### For Template Changes

- Test on multiple pages if the template is used widely
- Check responsive behavior (mobile, tablet, desktop)
- Verify all props work as documented

### For Data Changes

- Regenerate and preview the affected page
- Check that links work
- Verify images load

## Maintenance Checklist

When making changes, ask yourself:

- [ ] Is the change in the right place? (data, template, CSS, or JS)
- [ ] Did I run `npm run generate`?
- [ ] Does the generated HTML look correct?
- [ ] Did I update JSDoc if I changed parameters?
- [ ] Did I update the relevant `docs/` file if I changed architecture/schema?
- [ ] Did I remove duplicated documentation?
- [ ] Are my commit messages clear?
- [ ] Did I test on multiple pages or contexts?

## Resources

- **System overview**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Data schemas**: [DATA_FORMAT.md](DATA_FORMAT.md)
- **Build/workflows**: [GENERATION.md](GENERATION.md)
- **CSS reference**: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- **Design reference**: [VISUAL_GUIDE.md](VISUAL_GUIDE.md)
- **Code examples**: See `templates/` source files and JSDoc
- **CSS tokens**: See `css/tokens.css`

---

**Remember**: Keep docs close to code, avoid repetition, and let JSDoc be your primary documentation. The markdown docs exist to connect the pieces, not to duplicate what the code already says.
