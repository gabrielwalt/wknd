import { formatBody } from '../utils/text-formatter.mjs';
import { renderButtonGroup } from '../components/button.mjs';

/**
 * Renders a call-to-action section with accent background
 * @param {Object} data
 * @param {string} [data.sectionClass='section accent-section'] - Section CSS class
 * @param {boolean} [data.centered=true] - Center text and buttons
 * @param {string} [data.heading] - Section heading
 * @param {string} [data.body] - Section description text (paragraphs separated by \n\n)
 * @param {Object} [data.button] - Single CTA button {href, label, variant}
 * @param {Array} [data.buttons] - Multiple CTA buttons (overrides button param)
 * @returns {string} HTML: <section class="section accent-section">
 */
export function ctaSection(data) {
  const { sectionClass = 'section accent-section', centered = true, heading, body, button, buttons } = data;

  const containerClass = centered ? 'container utility-text-align-center' : 'container container--narrow';
  const btnArray = buttons || (button ? [button] : []);
  const bodyHtml = body ? formatBody(body, 'paragraph-lg', btnArray.length > 0 ? 'utility-margin-bottom-xl' : '') : '';

  return `<section class="${sectionClass}">
  <div class="${containerClass}">
    ${heading ? `<h2 class="h2-heading utility-margin-bottom-lg">${heading}</h2>` : ''}
    ${bodyHtml}
    ${renderButtonGroup(btnArray, { centered })}
  </div>
</section>`;
}
