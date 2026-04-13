import { renderButton } from '../components/button.mjs';
import { formatBody } from '../utils/text-formatter.mjs';

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

  const itemsHtml = items.map(item => {
    const itemHeading = item.heading || item.title;
    const itemBody = item.body || item.text;
    const linkHtml = item.link ? `<a href="${item.link.href}" class="text-button"><span>${item.link.label}</span></a>` : '';
    const bodyHtml = formatBody(itemBody, 'paragraph-lg utility-text-secondary');
    return `
    <div class="card card-body">
      <h3 class="h4-heading">${itemHeading}</h3>
      ${bodyHtml}
      ${linkHtml}
    </div>`;
  }).join('');

  const buttonHtml = button ? `
    <div class="button-group utility-margin-top-lg">
      <a href="${button.href}" class="button"><span class="button-label">${button.label}</span></a>
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
