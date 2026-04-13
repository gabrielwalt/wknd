import { renderButton } from '../components/button.mjs';

/**
 * Renders a 3-column grid of feature cards with optional buttons
 * @param {Object} data
 * @param {string} [data.sectionClass='section inverse-section'] - Section CSS class
 * @param {string} [data.heading] - Optional section heading
 * @param {Array} [data.items=[]] - Feature cards to display
 * @param {string} data.items[].heading - Card title (required)
 * @param {string} data.items[].body - Card description (required)
 * @param {Object} [data.items[].link] - Optional button (passed to renderButton)
 * @param {string} data.items[].link.href - Button href (required if link provided)
 * @param {string} data.items[].link.label - Button label (required if link provided)
 * @param {string} [data.items[].link.variant] - Button variant ('primary'|'accent'|'ghost')
 * @returns {string} HTML: <section> with <div class="grid-layout desktop-3-column">
 *
 * Default background is dark/inverse (inverse-section)
 * Buttons are optional per card; margin adjusts automatically
 */
export function featureCards(data) {
  const { sectionClass = 'section inverse-section', heading, items = [], button } = data;

  const itemsHtml = items.map(item => `
    <div class="feature-card">
      <h3 class="h4-heading">${item.heading}</h3>
      <p class="paragraph-lg utility-text-secondary${item.link ? ' utility-margin-bottom-sm' : ''}">${item.body}</p>
      ${item.link ? renderButton(item.link) : ''}
    </div>`).join('');

  const buttonHtml = button ? `
    <div class="button-group utility-margin-top-lg">
      <a href="${button.href}" class="button button-primary"><span class="button-label">${button.label}</span></a>
    </div>` : '';

  return `<section class="${sectionClass}">
  <div class="container">
    ${heading ? `<div class="section-heading">
      <h2 class="h2-heading">${heading}</h2>
    </div>` : ''}
    <div class="grid-layout desktop-3-column grid-gap-lg">
      ${itemsHtml}
    </div>
    ${buttonHtml}
  </div>
</section>`;
}
