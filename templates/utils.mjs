/**
 * Resolves a URL to be depth-aware (root-relative or with ../ prefix)
 * @param {string} url - URL to resolve
 *   - If starts with '/' or 'http': returned as-is (absolute)
 *   - If depth === 0: returned as-is (at root, no prefix needed)
 *   - If depth > 0: prefixed with '../' for each level of depth
 * @param {number} depth - Current page depth: 0 = root, 1 = /blog/, 2 = /blog/subdir/, etc.
 * @returns {string} - Resolved URL
 *
 * Examples:
 *   ref('index.html', 0) → 'index.html' (at root, no prefix)
 *   ref('index.html', 1) → '../index.html' (in /blog/, go up one level)
 *   ref('/about', 1) → '/about' (absolute, not modified)
 *   ref('https://example.com', 1) → 'https://example.com' (external, not modified)
 *
 * Usage: All URLs in data/*.json are stored root-relative (no ../), then resolved at render time
 */
export function ref(url, depth) {
  if (depth === 0 || url.startsWith('/') || url.startsWith('http')) {
    return url;
  }
  return '../' + url;
}

/**
 * SVG logo icon (WKND Adventures)
 * Rendered as inline SVG in navbar and footer
 * Uses currentColor so it inherits text color from parent
 * aria-hidden="true" since it's decorative (text logo handles semantics)
 */
/**
 * Renders a standard section heading div with optional trailing text-button link.
 * Returns empty string if no heading provided.
 * CSS (.section-heading) handles margin-bottom automatically.
 * @param {string} heading - Section heading text
 * @param {Object} [headingLink] - Optional {href, label} for a text-button link
 */
export function renderSectionHeading(heading, headingLink) {
  if (!heading) return '';
  const linkHtml = headingLink
    ? `\n      <a href="${headingLink.href}" class="text-button"><span>${headingLink.label}</span></a>`
    : '';
  return `<div class="section-heading">
      <h2 class="h2-heading">${heading}</h2>${linkHtml}
    </div>`;
}

export const LOGO_ICON_SVG = `<svg width="100%" height="100%" viewBox="0 0 33 33" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path d="M28,0H5C2.24,0,0,2.24,0,5v23c0,2.76,2.24,5,5,5h23c2.76,0,5-2.24,5-5V5c0-2.76-2.24-5-5-5ZM29,17c-6.63,0-12,5.37-12,12h-1c0-6.63-5.37-12-12-12v-1c6.63,0,12-5.37,12-12h1c0,6.63,5.37,12,12,12v1Z" fill="currentColor"/></svg>`;
