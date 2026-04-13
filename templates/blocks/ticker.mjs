/**
 * Renders an animated ticker strip (seamless scrolling text)
 * @param {Object} data
 * @param {Array} data.items - Text items to scroll (required)
 * @returns {string} HTML: <div class="ticker-strip" aria-hidden="true"> with animated track
 *
 * Features:
 *   - Items are duplicated internally for seamless loop effect
 *   - Separated by · bullet character
 *   - aria-hidden="true" (decorative, not read by screen readers)
 *   - Animation handled by CSS (see css/styles.css .ticker-track)
 */
export function ticker(data) {
  const { items = [] } = data;

  // Duplicate items for seamless loop
  const doubledItems = [...items, ...items];
  const itemsHtml = doubledItems.map((item, i) => {
    const sep = i < doubledItems.length - 1 ? '<span class="ticker-sep">·</span>' : '';
    return `<span>${item}</span>${sep}`;
  }).join('');

  return `<div class="ticker-strip" aria-hidden="true">
  <div class="ticker-track">
    ${itemsHtml}
  </div>
</div>`;
}
