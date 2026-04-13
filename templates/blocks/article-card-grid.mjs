import { renderArticleCard } from '../components/article-card.mjs';

/**
 * Renders a grid of article cards (3-column layout)
 * @param {Object} data
 * @param {string} [data.sectionClass='section'] - Section CSS class
 * @param {string} [data.heading] - Optional section heading
 * @param {Array} [data.items=[]] - Article cards to display (passed to renderArticleCard)
 * @param {Object} [data.headingLink] - Optional link in heading
 * @param {string} data.headingLink.href - Link URL
 * @param {string} data.headingLink.label - Link text (renders as <span> for semantic HTML)
 * @returns {string} HTML: <section> with <div class="grid-layout desktop-3-column">
 *
 * Delegates card rendering to renderArticleCard() so all card properties apply
 * Uses semantic <span> (not <div>) for headingLink inside <a> tag
 */
export function articleCardGrid(data) {
  const { sectionClass = 'section', heading, items = [], headingLink } = data;

  const itemsHtml = items.map(item => renderArticleCard(item)).join('');
  const headingLinkHtml = headingLink ? `
      <a href="${headingLink.href}" class="text-button"><span>${headingLink.label}</span></a>` : '';

  return `<section class="${sectionClass}">
  <div class="container">
    ${heading ? `<div class="section-heading${headingLink ? '' : ' utility-margin-bottom-xl'}">
      <h2 class="h2-heading">${heading}</h2>${headingLinkHtml}
    </div>` : ''}
    <div class="grid-layout desktop-3-column grid-gap-lg">
      ${itemsHtml}
    </div>
  </div>
</section>`;
}
