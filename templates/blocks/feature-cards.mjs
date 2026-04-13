import { renderButton, renderButtonGroup } from '../components/button.mjs';
import { formatBody } from '../utils/text-formatter.mjs';
import { renderSectionHeading } from '../utils.mjs';

/**
 * Renders a 3-column grid of feature cards with optional section-level button
 * @param {Object} data
 * @param {string} [data.sectionClass='section inverse-section'] - Section CSS class
 * @param {string} [data.heading] - Optional section heading
 * @param {Array} [data.items=[]] - Feature cards {heading, body, link?}
 * @param {Object} [data.button] - Optional section-level CTA button {href, label, variant}
 * @returns {string} HTML: <section> with <div class="grid-layout desktop-3-column">
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

  return `<section class="${sectionClass}">
  <div class="container">
    ${renderSectionHeading(heading)}
    <div class="grid-layout desktop-3-column grid-gap-lg">
      ${itemsHtml}
    </div>
    ${button ? renderButtonGroup([button]) : ''}
  </div>
</section>`;
}
