/**
 * Renders an editorial index section with numbered items
 * @param {Object} data
 * @param {string} [data.sectionClass='section'] - Section CSS class
 * @param {string} [data.containerClass] - Additional container CSS class
 * @param {string} [data.heading] - Optional section heading
 * @param {Array} data.items - Editorial items (required)
 * @param {number} data.items[].number - Item number (e.g., 1, 2, 3)
 * @param {string} data.items[].heading - Item title (required)
 * @param {string} data.items[].body - Item description (required)
 * @param {Object} [data.items[].link] - Optional CTA link
 * @param {string} data.items[].link.href - Link URL
 * @param {string} data.items[].link.label - Link text
 * @returns {string} HTML: <section> with numbered editorial items in grid
 *
 * Used for multi-step guides, numbered lists, process overviews
 * Items display as number + heading + body + optional link
 */
export function editorialIndex(data) {
  const { sectionClass = 'section', containerClass = '', heading, items } = data;

  const itemsHtml = (items || []).map(item => {
    const linkHtml = item.link ? `<a href="${item.link.href}" class="text-button">${item.link.label}</a>` : '';
    return `
    <div class="editorial-index-item">
      <span class="editorial-index-number">${item.number}</span>
      <div>
        <h3 class="h4-heading utility-margin-bottom-md">${item.heading}</h3>
        <p class="paragraph-lg utility-text-secondary">${item.body}</p>
        ${linkHtml}
      </div>
    </div>`;
  }).join('');

  const containerClassStr = containerClass ? ` ${containerClass}` : '';

  return `<section class="${sectionClass}">
  <div class="container${containerClassStr}">
    ${heading ? `<div class="section-heading">
      <h2 class="h2-heading">${heading}</h2>
    </div>` : ''}
    <div class="editorial-index">${itemsHtml}
    </div>
  </div>
</section>`;
}
