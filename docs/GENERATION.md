# Generation & Build Process

How to generate HTML from JSON data and deploy the site.

## Quick Commands

```bash
# Generate HTML from data + templates (writes to source tree)
npm run generate

# Build for deployment (minify + output to dist/)
npm run build:pages

# Deploy to GitHub Pages
npm run deploy:pages
```

## Generation (`npm run generate`)

Runs `scripts/generate-html.mjs`:

1. Loads `data/site.json` (global config)
2. For each JSON in `data/pages/`:
   - Calls `renderPage(pageData, siteData)` → writes `pagename.html`
3. For each JSON in `data/blog/`:
   - Calls `renderBlogPage(postData, siteData)` → writes `blog/slug.html`
4. Validates all hrefs point to existing files (catches broken relative paths)

**Output**: 23 HTML files (10 root + 10 blog + 3 fragments)

Generated files are written to source tree and can be opened directly in a browser. No build step required to preview.

## Build (`npm run build:pages`)

Runs `npm run generate` first, then:

1. Minifies HTML with `html-minifier-terser`
2. Minifies CSS with `postcss` + `cssnano`
3. Minifies JS with `terser`
4. Outputs to `dist/` directory

The `dist/` output is stripped of generated-file comments and optimized for production.

## Deployment (`npm run deploy:pages`)

Runs `npm run build:pages`, then:

Uses `gh-pages` CLI to push `dist/` to GitHub Pages.

Requires:
- `GITHUB_TOKEN` environment variable (for CI/CD) or local git credentials
- Remote named `origin`

## Workflow: Content Changes

1. Edit JSON file:
   ```bash
   edit data/pages/adventures.json
   # or
   edit data/blog/slug.json
   # or
   edit data/site.json
   ```

2. Regenerate:
   ```bash
   npm run generate
   ```

3. Preview in browser (pages are in source tree):
   ```bash
   # Just open the file, or use a local server:
   python -m http.server 3000
   # Visit http://localhost:3000/adventures.html
   ```

4. Commit:
   ```bash
   git add data/ *.html blog/ fragments/
   git commit -m "Update [description]"
   ```

## Workflow: Template or Script Changes

1. Edit template in `templates/`:
   ```bash
   edit templates/blocks/featured-article.mjs
   # or any template file
   ```

2. Regenerate:
   ```bash
   npm run generate
   ```

3. Check diffs in generated files:
   ```bash
   git diff *.html blog/ fragments/
   ```

4. Commit both template and generated files:
   ```bash
   git add templates/ *.html blog/ fragments/
   git commit -m "Update featured-article block: [change description]"
   ```

## Workflow: Adding a New Page

1. Create `data/pages/newpage.json`:
   ```json
   {
     "meta": { "title": "...", "description": "...", "depth": 0 },
     "hero": { "variant": "full", ... },
     "sections": [ ... ]
   }
   ```

2. Regenerate:
   ```bash
   npm run generate
   ```

   This creates `newpage.html`

3. Add link to new page in `data/site.json` nav
4. Regenerate again:
   ```bash
   npm run generate
   ```

5. Commit:
   ```bash
   git add data/ *.html
   git commit -m "Add new page: newpage"
   ```

## Workflow: Adding a New Blog Post

1. Create `data/blog/slug.json`:
   ```json
   {
     "meta": { "title": "...", "description": "...", "depth": 1 },
     "hero": { "variant": "blog", ... },
     "articleBody": [ ... ],
     "gearPullquote": { ... },
     "gallery": { ... }
   }
   ```

2. Regenerate:
   ```bash
   npm run generate
   ```

   Creates `blog/slug.html`

3. Add to recent articles in `data/site.json` nav
4. Regenerate again:
   ```bash
   npm run generate
   ```

5. Commit:
   ```bash
   git add data/ blog/ fragments/
   git commit -m "Add blog post: slug"
   ```

## Workflow: Deploying to Production

```bash
# Build (generate + minify)
npm run build:pages

# This outputs to dist/
# Review the minified files if needed
ls -la dist/

# Deploy
npm run deploy:pages
```

Or in CI/CD:
```bash
npm run deploy:pages
# Pushes dist/ branch to GitHub Pages
```

## Troubleshooting

**"Generated HTML doesn't match my data changes"**
- Make sure you ran `npm run generate`
- Check that JSON is valid (use an IDE validator)
- Run generation again

**"Broken link validation fails"**
- The generator checks that all hrefs point to files that exist
- Check file names match exactly (case-sensitive)
- For fragment paths, ensure `fragments/filename.html` is generated
- Run `npm run generate` to see which file is missing

**"Changes to CSS/JS not showing up"**
- CSS and JS are not generated; edit `css/styles.css` and `js/site.js` directly
- CSS changes show up immediately (browser reload)
- JS changes may need cache clear

**"Minification in dist/ looks broken"**
- html-minifier-terser removes comments and whitespace aggressively
- Check the source `.html` files in the root (not minified)
- If minification is causing issues, check `scripts/build-pages.mjs` config

## How Generation Works

See [ARCHITECTURE.md](ARCHITECTURE.md) for the technical details of how templates, data, and generation interact.

For JSON schema reference, see [DATA_FORMAT.md](DATA_FORMAT.md).

For template details and JSDoc, see individual files in `templates/`.
