/**
 * Renders an image gallery with optional wide hero image
 * @param {Object} data
 * @param {string} [data.sectionClass='section inverse-section'] - Section CSS class
 * @param {string} [data.heading] - Optional section heading
 * @param {Object} [data.headingLink] - Optional link in heading (uses <span> for HTML validity)
 * @param {string} data.headingLink.href - Link URL
 * @param {string} data.headingLink.label - Link text
 * @param {Array} [data.images=[]] - Gallery images
 * @param {string} data.images[].src - Image URL (required)
 * @param {string} data.images[].alt - Image alt text (required)
 * @param {Object} [data.wideImage] - Optional full-width image at bottom
 * @param {string} data.wideImage.src - Image URL (required if wideImage provided)
 * @param {string} data.wideImage.alt - Image alt text (required if wideImage provided)
 * @returns {string} HTML: <section> with 3-column image grid + optional wide image below
 *
 * All images use loading="lazy" for performance
 * Default background is dark/inverse (secondary-section)
 */
export function gallery(data) {
  const { sectionClass = 'section inverse-section', heading, headingLink, images = [], wideImage } = data;

  const imagesHtml = images.map(img => `
    <img src="${img.src}" alt="${img.alt}" class="gallery-img" loading="lazy" />`).join('');

  const headingLinkHtml = headingLink ? `
      <a href="${headingLink.href}" class="text-button"><span>${headingLink.label}</span></a>` : '';

  return `<section class="${sectionClass}">
  <div class="container">
    ${heading ? `<div class="section-heading utility-margin-bottom-xl">
      <h2 class="h2-heading">${heading}</h2>${headingLinkHtml}
    </div>` : ''}
    <div class="grid-layout desktop-3-column grid-gap-lg">
      ${imagesHtml}
    </div>
    ${wideImage ? `<div class="utility-margin-top-lg">
      <img src="${wideImage.src}" alt="${wideImage.alt}" class="gallery-img gallery-img--wide" loading="lazy" />
    </div>` : ''}
  </div>
</section>`;
}
