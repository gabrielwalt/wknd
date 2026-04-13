/**
 * Renders a narrow prose section with optional heading link
 * @param {Object} data
 * @param {string} [data.sectionClass='section'] - Section CSS class
 * @param {string} [data.containerClass='container--narrow'] - Container CSS class
 * @param {string} [data.heading] - Optional section heading
 * @param {Object} [data.headingLink] - Optional link next to heading (uses <span> for HTML validity)
 * @param {string} data.headingLink.href - Link URL
 * @param {string} data.headingLink.label - Link text
 * @param {string} data.body - Section HTML body content (required, inserted as-is)
 * @returns {string} HTML: <section> with <div class="container container--narrow">
 *
 * Body is passed raw HTML (not escaped) — use for rich prose with nested elements
 * Useful for articles, documentation, formatted text blocks
 * Heading link appears next to h2 in same section-heading div
 */
export function proseNarrow(data) {
  const { sectionClass = 'section', containerClass = 'container--narrow', heading, headingLink, body } = data;

  const headingLinkHtml = headingLink ? `
        <a href="${headingLink.href}" class="text-button"><span>${headingLink.label}</span></a>` : '';

  return `<section class="${sectionClass}">
  <div class="container ${containerClass}">
    ${heading ? `<div class="section-heading${headingLink ? '' : ' utility-margin-bottom-lg'}">
      <h2 class="h2-heading">${heading}</h2>${headingLinkHtml}
    </div>` : ''}
    ${body}
  </div>
</section>`;
}
