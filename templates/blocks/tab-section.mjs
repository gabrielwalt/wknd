import { renderArticleCard } from '../components/article-card.mjs';

export function tabSection(data) {
  const { sectionClass = 'section', heading, tabs = [] } = data;

  const tabButtonsHtml = tabs.map((tab, i) => `
    <button class="tab-menu-link${i === 0 ? ' is-active' : ''}" data-tab="tab-${tab.id}" role="tab" aria-selected="${i === 0}">${tab.label}</button>`).join('');

  const tabPanesHtml = tabs.map((tab, i) => {
    const itemsHtml = (tab.items || []).map(item => renderArticleCard(item)).join('');
    return `
    <div class="tab-pane${i === 0 ? ' is-active' : ''}" id="tab-${tab.id}" role="tabpanel">
      ${tab.description ? `<p class="paragraph-lg utility-text-secondary utility-margin-bottom-xl utility-max-width-prose">${tab.description}</p>` : ''}
      <div class="grid-layout desktop-3-column grid-gap-lg">
        ${itemsHtml}
      </div>
    </div>`;
  }).join('');

  return `<section class="${sectionClass}" data-tabs>
  <div class="container">
    ${heading ? `<div class="section-heading">
      <h2 class="h2-heading">${heading}</h2>
    </div>` : ''}
    <div class="tab-menu" role="tablist">
      ${tabButtonsHtml}
    </div>
    ${tabPanesHtml}
  </div>
</section>`;
}
