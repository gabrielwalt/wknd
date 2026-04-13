/**
 * Renders a 2-column grid of cards with optional buttons
 * @param {Object} data
 * @param {string} [data.sectionClass='section secondary-section'] - Section CSS class
 * @param {string} [data.heading] - Optional section heading
 * @param {Array} [data.items=[]] - Cards to display
 * @param {string} [data.items[].eyebrow] - Optional small label above heading
 * @param {string} data.items[].heading - Card title (required)
 * @param {string} data.items[].body - Card description (required)
 * @param {Object} [data.items[].link] - Optional button
 * @param {string} data.items[].link.href - Button href (required if link provided)
 * @param {string} data.items[].link.label - Button label (required if link provided)
 * @param {string} [data.items[].link.variant] - Button class (e.g., 'button--ghost')
 * @returns {string} HTML: <section> with <div class="grid-layout grid-layout--2col">
 *
 * 2-column layout (narrower than 3-column grids)
 * Uses semantic <span> (not <div>) for button label inside <a> tag
 */
export function cardGrid(data) {
  const { sectionClass = 'section secondary-section', heading, items = [] } = data;

  const itemsHtml = items.map(item => `
    <div class="card card-body">
      ${item.eyebrow ? `<p class="hero-eyebrow">${item.eyebrow}</p>` : ''}
      <h3 class="h3-heading">${item.heading}</h3>
      <p class="paragraph-lg">${item.body}</p>
      ${item.link ? `<a href="${item.link.href}" class="${item.link.variant || 'button--ghost'}"><span class="button-label">${item.link.label}</span></a>` : ''}
    </div>`).join('');

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
