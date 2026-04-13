import { formatBody } from '../utils/text-formatter.mjs';
import { renderButtonGroup } from '../components/button.mjs';
import { renderSectionHeading } from '../utils.mjs';

/**
 * Renders a narrow prose section with optional heading link and optional side image
 * @param {Object} data
 * @param {string} [data.sectionClass='section'] - Section CSS class
 * @param {string} [data.containerClass='container--narrow'] - Container CSS class
 * @param {string} [data.heading] - Optional section heading
 * @param {Object} [data.headingLink] - Optional link next to heading {href, label}
 * @param {string} data.body - Section text body content (paragraphs separated by \n\n)
 * @param {Array} [data.buttons] - Optional CTA buttons
 * @param {Object} [data.image] - Optional image to display alongside text {src, alt}
 * @returns {string} HTML: <section> with <div class="container container--narrow">
 */
export function proseNarrow(data) {
  const { sectionClass = 'section', containerClass = 'container--narrow', heading, headingLink, body, buttons, image } = data;

  const bodyHtml = formatBody(body);
  const buttonsHtml = renderButtonGroup(buttons || []);

  // If image provided, use 2-column layout
  if (image) {
    return `<section class="${sectionClass}">
  <div class="container">
    <div class="grid-layout grid-gap-xl tablet-1-column">
      <div>
        ${renderSectionHeading(heading, headingLink)}
        ${bodyHtml}
        ${buttonsHtml}
      </div>
      <img class="gallery-img--wide" src="${image.src}" alt="${image.alt}" loading="lazy" />
    </div>
  </div>
</section>`;
  }

  return `<section class="${sectionClass}">
  <div class="container ${containerClass}">
    ${renderSectionHeading(heading, headingLink)}
    ${bodyHtml}
    ${buttonsHtml}
  </div>
</section>`;
}
