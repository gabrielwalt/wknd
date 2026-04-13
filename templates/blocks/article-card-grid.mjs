import { renderArticleCard } from '../components/article-card.mjs';
import { renderSectionHeading } from '../utils.mjs';

/**
 * Renders a grid of article cards (3-column layout)
 * @param {Object} data
 * @param {string} [data.sectionClass='section'] - Section CSS class
 * @param {string} [data.heading] - Optional section heading
 * @param {Array} [data.items=[]] - Article cards to display (passed to renderArticleCard)
 * @param {Object} [data.headingLink] - Optional link in heading {href, label}
 * @returns {string} HTML: <section> with <div class="grid-layout desktop-3-column">
 */
export function articleCardGrid(data) {
  const { sectionClass = 'section', heading, items = [], headingLink } = data;

  const itemsHtml = items.map(item => renderArticleCard(item)).join('');

  return `<section class="${sectionClass}">
  <div class="container">
    ${renderSectionHeading(heading, headingLink)}
    <div class="grid-layout desktop-3-column grid-gap-lg">
      ${itemsHtml}
    </div>
  </div>
</section>`;
}
