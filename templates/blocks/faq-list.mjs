/**
 * Renders an FAQ accordion section with native <button> elements
 * @param {Object} data
 * @param {string} [data.id] - Optional section ID for anchor links
 * @param {string} [data.sectionClass='section'] - Section CSS class
 * @param {string} [data.containerClass=''] - Additional container CSS class (e.g., 'container--narrow')
 * @param {string} [data.heading] - Optional section heading
 * @param {Object} [data.headingLink] - Optional link in heading
 * @param {string} data.headingLink.href - Link URL
 * @param {string} data.headingLink.label - Link text
 * @param {Array} data.items - FAQ items (required)
 * @param {string} data.items[].question - Question text (required)
 * @param {string} data.items[].answer - Answer text (required)
 * @returns {string} HTML: <section> with <button class="faq-question"> elements
 *
 * Features:
 *   - Uses native <button> elements (semantic, accessible)
 *   - aria-expanded attribute for toggle state
 *   - Toggle behavior via js/site.js
 *
 * Note: headingLink uses <span> not <div> for semantic HTML
 */
import { renderSectionHeading } from '../utils.mjs';

export function faqList(data) {
  const { id, sectionClass = 'section', containerClass = '', heading, headingLink, items } = data;

  const itemsHtml = (items || []).map(item => `
    <div class="faq-item">
      <button class="faq-question" aria-expanded="false">
        <span>${item.question}</span>
        <span class="faq-icon"></span>
      </button>
      <div class="faq-answer">${item.answer}</div>
    </div>`).join('');

  const containerClassStr = containerClass ? ` ${containerClass}` : '';
  const idAttr = id ? ` id="${id}"` : '';

  return `<section class="${sectionClass}"${idAttr}>
  <div class="container${containerClassStr}">
    ${renderSectionHeading(heading, headingLink)}
    <div class="faq-list">${itemsHtml}
    </div>
  </div>
</section>`;
}
