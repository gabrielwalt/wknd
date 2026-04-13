import { renderButton } from '../components/button.mjs';

/**
 * Renders a call-to-action section with dark inverse background
 * @param {Object} data
 * @param {string} [data.sectionClass='section inverse-section'] - Section CSS class
 * @param {string} [data.eyebrow] - Optional small label above heading
 * @param {string} [data.heading] - Section heading
 * @param {string} [data.body] - Section description text
 * @param {Array} [data.buttons=[]] - CTA buttons (passed to renderButton)
 * @returns {string} HTML: <section class="section inverse-section"> in narrow container
 *
 * Variant of ctaSection with:
 *   - Dark/inverse background (secondary-section)
 *   - Narrow container width
 *   - Optional eyebrow above heading
 *   - Multiple buttons displayed in button-group
 */
export function ctaSectionInverse(data) {
  const { sectionClass = 'section inverse-section', eyebrow, heading, body, buttons = [] } = data;

  const btnArray = buttons;
  const buttonsHtml = btnArray.map(btn => renderButton(btn)).join('\n      ');

  return `<section class="${sectionClass}">
  <div class="container container--narrow">
    ${eyebrow ? `<p class="hero-eyebrow">${eyebrow}</p>` : ''}
    ${heading ? `<h2 class="h2-heading utility-margin-bottom-lg">${heading}</h2>` : ''}
    ${body ? `<p class="paragraph-lg utility-margin-bottom-lg">${body}</p>` : ''}
    ${btnArray.length > 0 ? `<div class="button-group">
      ${buttonsHtml}
    </div>` : ''}
  </div>
</section>`;
}
