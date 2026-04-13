import { formatBody } from '../utils/text-formatter.mjs';
import { renderButton } from '../components/button.mjs';

/**
 * Renders a narrow prose section with optional heading link and optional side image
 * @param {Object} data
 * @param {string} [data.sectionClass='section'] - Section CSS class
 * @param {string} [data.containerClass='container--narrow'] - Container CSS class
 * @param {string} [data.heading] - Optional section heading
 * @param {Object} [data.headingLink] - Optional link next to heading (uses <span> for HTML validity)
 * @param {string} data.headingLink.href - Link URL
 * @param {string} data.headingLink.label - Link text
 * @param {string} data.body - Section text body content (paragraphs separated by \n\n)
 * @param {Object} [data.image] - Optional image to display alongside text
 * @param {string} data.image.src - Image URL
 * @param {string} data.image.alt - Image alt text
 * @returns {string} HTML: <section> with <div class="container container--narrow">
 *
 * Body is auto-formatted: paragraphs separated by \n\n are wrapped in <p> tags with spacing
 * Useful for articles, documentation, formatted text blocks
 * If image provided, renders as 2-column layout with text left, image right
 * Heading link appears next to h2 in same section-heading div
 */
export function proseNarrow(data) {
  const { sectionClass = 'section', containerClass = 'container--narrow', heading, headingLink, body, buttons, image } = data;

  const headingLinkHtml = headingLink ? `
        <a href="${headingLink.href}" class="text-button"><span>${headingLink.label}</span></a>` : '';

  const buttonsHtml = buttons && buttons.length > 0 ? `
    <div class="button-group">
      ${buttons.map(btn => renderButton(btn)).join('')}
    </div>` : '';

  const bodyHtml = formatBody(body);

  // If image provided, use 2-column layout
  if (image) {
    return `<section class="${sectionClass}">
  <div class="container">
    <div class="grid-layout grid-gap-xxl tablet-1-column x-left">
      <div>
        ${heading ? `<div class="section-heading utility-margin-bottom-lg">
          <h2 class="h2-heading">${heading}</h2>${headingLinkHtml}
        </div>` : ''}
        ${bodyHtml}
        ${buttonsHtml}
      </div>
      <div class="utility-aspect-4x3 utility-radius-card utility-overflow-clip">
        <img class="cover-image" src="${image.src}" alt="${image.alt}" loading="lazy" />
      </div>
    </div>
  </div>
</section>`;
  }

  return `<section class="${sectionClass}">
  <div class="container ${containerClass}">
    ${heading ? `<div class="section-heading${headingLink ? '' : ' utility-margin-bottom-lg'}">
      <h2 class="h2-heading">${heading}</h2>${headingLinkHtml}
    </div>` : ''}
    ${bodyHtml}
    ${buttonsHtml}
  </div>
</section>`;
}
