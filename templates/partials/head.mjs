import { ref } from '../utils.mjs';

/**
 * Renders the <head> element with metadata, title, and asset links
 * @param {Object} data
 * @param {string} data.title - Page title (required, used in <title> and meta)
 * @param {string} data.description - Meta description (required)
 * @param {number} data.depth - URL depth: 0 for root, 1 for /blog (required for relative paths)
 * @returns {string} HTML: <head>...</head> element
 *
 * Includes:
 *   - UTF-8 charset
 *   - Viewport meta for responsive design
 *   - Meta description for SEO
 *   - SVG favicon link (depth-aware)
 *   - CSS stylesheet link (depth-aware, via ref() utility)
 *   - Uses fetchpriority="high" on favicon
 */
export function head({ title, description, depth }) {
  return `<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${description}" />
  <title>${title}</title>
  <link rel="icon" type="image/svg+xml" href="${ref('favicon.svg', depth)}" />
  <link rel="stylesheet" href="${ref('css/styles.css', depth)}" />
  <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
</head>`;
}
