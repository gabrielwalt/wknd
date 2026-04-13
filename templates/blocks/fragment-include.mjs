/**
 * Renders a section with a runtime-loaded HTML fragment
 * @param {Object} data
 * @param {string} [data.sectionClass='section'] - Section CSS class
 * @param {string} [data.containerClass=''] - Additional container CSS class
 * @param {string} [data.heading] - Optional section heading
 * @param {Object} [data.headingLink] - Optional link next to heading (uses <span> for HTML validity)
 * @param {string} data.headingLink.href - Link URL
 * @param {string} data.headingLink.label - Link text
 * @param {string} data.fragmentSrc - Path to fragment HTML file (required)
 * @returns {string} HTML: <section> with <div data-fragment="..."></div> placeholder
 *
 * Fragment loading:
 *   - Fragments are loaded at runtime by js/site.js loadFragments() mechanism
 *   - fragmentSrc is stored in data-fragment attribute
 *   - Fragment HTML is inserted into the placeholder div
 *   - Useful for content that's shared across multiple pages or updated frequently
 */
export function fragmentInclude(data) {
  const { sectionClass = 'section', containerClass = '', heading, headingLink, fragmentSrc } = data;

  const containerClassStr = containerClass ? ` ${containerClass}` : '';
  const headingLinkHtml = headingLink ? `
      <a href="${headingLink.href}" class="text-button"><span>${headingLink.label}</span></a>` : '';

  return `<section class="${sectionClass}">
  <div class="container${containerClassStr}">
    ${heading ? `<div class="section-heading">
      <h2 class="h2-heading">${heading}</h2>${headingLinkHtml}
    </div>` : ''}
    <div data-fragment="${fragmentSrc}"></div>
  </div>
</section>`;
}
