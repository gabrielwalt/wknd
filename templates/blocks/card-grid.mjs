import { renderCard } from '../components/card.mjs';

/**
 * Renders a 2-column grid of cards with optional buttons
 * @param {Object} data
 * @param {string} [data.sectionClass='section secondary-section'] - Section CSS class
 * @param {string} [data.heading] - Optional section heading
 * @param {Array} [data.items=[]] - Cards to display (shape: {eyebrow?, heading, body, link?})
 * @returns {string} HTML: <section> with <div class="grid-layout grid-layout--2col">
 */
export function cardGrid(data) {
  const { sectionClass = 'section secondary-section', heading, items = [] } = data;

  const itemsHtml = items.map(item => renderCard(item)).join('');

  return `<section class="${sectionClass}">
  <div class="container container--narrow">
    ${heading ? `<div class="section-heading">
      <h2 class="h2-heading">${heading}</h2>
    </div>` : ''}
    <div class="grid-layout grid-layout--2col grid-gap-lg">
      ${itemsHtml}
    </div>
  </div>
</section>`;
}
