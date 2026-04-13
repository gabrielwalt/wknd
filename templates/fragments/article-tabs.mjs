import { renderArticleCard } from '../components/article-card.mjs';

/**
 * Renders a tabbed container with article cards in each tab pane
 * @param {Object} data
 * @param {Array} data.tabs - Tab configuration (required)
 * @param {string} data.tabs[].id - Tab ID (used for tab-pane id and data-tab)
 * @param {string} data.tabs[].label - Tab button label (required)
 * @param {Array} data.tabs[].items - Article cards in this tab pane (passed to renderArticleCard)
 * @returns {string} HTML: <div class="tab-container"> with role="tablist" and tab panes
 *
 * Features:
 *   - First tab is active by default (is-active class)
 *   - Native <button> elements for tab triggers
 *   - Each tab pane displays grid of article cards
 *   - data-tabs attribute for JS tab switching (via js/site.js)
 *   - Wide container for full-width display on pages
 *
 * Used as a fragment, typically included via fragment-include block
 */
export function articleTabs(data) {
  const { tabs = [] } = data;

  const tabButtonsHtml = tabs.map((tab, i) => `
    <button class="tab-menu-link${i === 0 ? ' is-active' : ''}" data-tab="tab-${tab.id}" role="tab" aria-selected="${i === 0}">${tab.label}</button>`).join('');

  const tabPanesHtml = tabs.map((tab, i) => {
    const itemsHtml = (tab.items || []).map(item => renderArticleCard(item)).join('');
    return `
    <div class="tab-pane${i === 0 ? ' is-active' : ''}" id="tab-${tab.id}" role="tabpanel">
      <div class="grid-layout desktop-3-column grid-gap-md">
        ${itemsHtml}
      </div>
    </div>`;
  }).join('');

  return `<div class="tab-container tab-container--wide" data-tabs>
  <div class="tab-menu">
    ${tabButtonsHtml}
  </div>
  <div>
    ${tabPanesHtml}
  </div>
</div>`;
}
