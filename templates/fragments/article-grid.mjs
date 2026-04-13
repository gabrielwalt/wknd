import { renderArticleCard } from '../components/article-card.mjs';

/**
 * Renders a simple 3-column grid of article cards
 * @param {Object} data
 * @param {Array} data.items - Article cards to display (required, passed to renderArticleCard)
 * @returns {string} HTML: <div class="grid-layout desktop-3-column"> with article cards
 *
 * Features:
 *   - 3-column layout on desktop, 1 column on mobile
 *   - Each item delegates to renderArticleCard() for rendering
 *   - No wrapper section (designed to be inserted as a fragment)
 *   - Used for reusable article grids across multiple pages
 *
 * Used as a fragment, typically included via fragment-include block
 */
export function articleGrid(data) {
  const { items = [] } = data;

  const itemsHtml = items.map(item => renderArticleCard(item)).join('');

  return `<div class="grid-layout desktop-3-column grid-gap-lg">
${itemsHtml}
</div>`;
}
