import { renderArticleCard } from '../components/article-card.mjs';

export function articleCardGrid(data) {
  const { sectionClass = 'section', heading, items = [], headingLink } = data;

  const itemsHtml = items.map(item => renderArticleCard(item)).join('');
  const headingLinkHtml = headingLink ? `
      <a href="${headingLink.href}" class="text-button"><div>${headingLink.label}</div></a>` : '';

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
