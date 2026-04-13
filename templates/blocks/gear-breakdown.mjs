/**
 * Renders a 2-column gear breakdown section with lists and descriptions
 * @param {Object} data
 * @param {string} [data.sectionClass='section secondary-section'] - Section CSS class
 * @param {string} [data.heading] - Section heading
 * @param {Array} data.items - Gear breakdown items (required)
 * @param {string} data.items[].title - Item title/route name (required)
 * @param {string} data.items[].description - Item description paragraph (required)
 * @param {Array} data.items[].gearList - Array of gear item descriptions (required)
 * @returns {string} HTML: <section> with 2-column grid of gear lists
 *
 * Used for detailed gear breakdowns with lists and explanations
 * Each item displays as a column with heading, description, and ul list
 */
export function gearBreakdown(data) {
  const { sectionClass = 'section secondary-section', heading, items = [] } = data;

  const itemsHtml = items.map(item => `
      <div>
        <h3 class="h3-heading utility-margin-bottom-md">${item.title}</h3>
        <p class="paragraph-sm utility-text-secondary utility-margin-bottom-lg">${item.description}</p>
        <ul class="blog-gear-list">
          ${(item.gearList || []).map(gear => `<li>${gear}</li>`).join('')}
        </ul>
      </div>`).join('');

  return `<section class="${sectionClass}">
  <div class="container">
    ${heading ? `<div class="section-heading">
      <h2 class="h2-heading">${heading}</h2>
    </div>` : ''}
    <div class="grid-layout desktop-2-column grid-gap-xl">
      ${itemsHtml}
    </div>
  </div>
</section>`;
}
