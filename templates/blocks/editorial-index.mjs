/**
 * Renders an editorial index section with numbered items and optional card grid
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
 * @param {Array} [data.cards] - Optional card grid (2-column grid at bottom)
 * @param {string} data.cards[].eyebrow - Card eyebrow label
 * @param {string} data.cards[].heading - Card title
 * @param {string} data.cards[].body - Card description
 * @param {Object} data.cards[].button - Card button
 * @param {string} data.cards[].button.label - Button text
 * @param {string} data.cards[].button.href - Button URL
 * @param {string} [data.cards[].button.variant] - Button variant (ghost, primary, etc.)
 * @returns {string} HTML: <section> with numbered editorial items + optional card grid
 *
 * Used for multi-step guides, numbered lists, process overviews
 * Items display as number + heading + body + optional link
 * If cards provided, renders a 2-column grid below the editorial items
 */
export function editorialIndex(data) {
  const { sectionClass = 'section', containerClass = '', heading, items, cards } = data;

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

  const cardsHtml = cards && cards.length > 0 ? `

  <div class="container container--narrow">
    <div class="grid-layout grid-layout--2col grid-gap-lg">
      ${cards.map(card => `
      <div class="card card-body">
        <p class="hero-eyebrow">${card.eyebrow}</p>
        <h3 class="h3-heading">${card.heading}</h3>
        <p class="paragraph-lg">${card.body}</p>
        <a href="${card.button.href}" class="button--${card.button.variant || 'ghost'}"><div class="button-label">${card.button.label}</div></a>
      </div>
      `).join('')}
    </div>
  </div>` : '';

  const containerClassStr = containerClass ? ` ${containerClass}` : '';

  return `<section class="${sectionClass}">
  <div class="container${containerClassStr}">
    ${heading ? `<div class="section-heading">
      <h2 class="h2-heading">${heading}</h2>
    </div>` : ''}
    <div class="editorial-index">${itemsHtml}
    </div>
  </div>${cardsHtml}
</section>`;
}
