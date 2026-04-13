import { formatBody } from '../utils/text-formatter.mjs';
import { renderButtonGroup } from '../components/button.mjs';

/**
 * Renders a call-to-action section with dark inverse background
 * @param {Object} data
 * @param {string} [data.sectionClass='section inverse-section'] - Section CSS class
 * @param {string} [data.eyebrow] - Optional small label above heading
 * @param {string} [data.heading] - Section heading
 * @param {string} [data.body] - Section description text (paragraphs separated by \n\n)
 * @param {Array} [data.buttons=[]] - CTA buttons (passed to renderButton)
 * @returns {string} HTML: <section class="section inverse-section"> in narrow container
 */
export function ctaSectionInverse(data) {
  const { sectionClass = 'section inverse-section', eyebrow, heading, body, buttons = [] } = data;

  const bodyHtml = body ? formatBody(body, 'paragraph-lg', buttons.length > 0 ? 'utility-margin-bottom-lg' : '') : '';

  return `<section class="${sectionClass}">
  <div class="container container--narrow">
    ${eyebrow ? `<p class="tag">${eyebrow}</p>` : ''}
    ${heading ? `<h2 class="h2-heading utility-margin-bottom-lg">${heading}</h2>` : ''}
    ${bodyHtml}
    ${renderButtonGroup(buttons)}
  </div>
</section>`;
}
