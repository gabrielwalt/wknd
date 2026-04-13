import { renderArticleCard } from '../components/article-card.mjs';
import { renderSectionHeading } from '../utils.mjs';

/**
 * Renders an interactive tab section with article cards in each tab pane
 * @param {Object} data
 * @param {string} [data.sectionClass='section'] - Section CSS class
 * @param {string} [data.heading] - Optional section heading
 * @param {Array} [data.tabs=[]] - Tab configuration (required)
 * @param {string} data.tabs[].id - Tab ID (used for tab-pane id and data-tab)
 * @param {string} data.tabs[].label - Tab button label (required)
 * @param {string} [data.tabs[].description] - Optional paragraph above cards
 * @param {Array} [data.tabs[].items] - Article cards in this tab pane (passed to renderArticleCard)
 * @returns {string} HTML: <section data-tabs> with role="tablist", role="tab", role="tabpanel"
 *
 * Features:
 *   - First tab is active by default (is-active class + aria-selected="true")
 *   - Native <button> elements for tab triggers (semantic HTML)
 *   - aria-expanded and tabindex managed by js/site.js
 *   - Each tab pane displays 3-column grid of article cards
 *   - data-tabs attribute enables JS tab switching
 */
export function tabSection(data) {
  const { sectionClass = 'section', heading, tabs = [] } = data;

  const tabButtonsHtml = tabs.map((tab, i) => `
    <button class="tab-menu-link${i === 0 ? ' is-active' : ''}" data-tab="tab-${tab.id}" role="tab" aria-selected="${i === 0}">${tab.label}</button>`).join('');

  const tabPanesHtml = tabs.map((tab, i) => {
    let contentHtml = '';

    // Check if this is a team profile tab (has image, name, role, bio)
    if (tab.image && tab.name) {
      contentHtml = `
      <div class="team-profile-grid">
        <div class="team-profile-row">
          <div class="team-profile-spacer" aria-hidden="true"></div>
          <div class="team-profile-col">
            <div class="profile-circle">
              <img src="${tab.image}" alt="${tab.imageAlt}" class="cover-image" loading="lazy" />
            </div>
            <div>
              <p class="h5-heading profile-name">${tab.name}</p>
              ${tab.role ? `<p class="paragraph-sm utility-text-secondary">${tab.role}</p>` : ''}
            </div>
          </div>
          <div class="team-profile-bio">
            ${(tab.bio || []).map((paragraph, idx) => `<p class="paragraph-lg utility-text-secondary${idx === (tab.bio.length - 1) ? ' utility-margin-bottom-xl' : ' utility-margin-bottom-lg'}">${paragraph}</p>`).join('')}
          </div>
        </div>
      </div>`;
    } else {
      // Standard article card grid
      const itemsHtml = (tab.items || []).map(item => renderArticleCard(item)).join('');
      contentHtml = `
      <div class="grid-layout desktop-3-column grid-gap-lg">
        ${itemsHtml}
      </div>`;
    }

    return `
    <div class="tab-pane${i === 0 ? ' is-active' : ''}${tab.image && tab.name ? ' tab-pane--padded' : ''}" id="tab-${tab.id}" role="tabpanel">
      ${tab.description ? `<p class="paragraph-lg utility-text-secondary utility-margin-bottom-xl utility-max-width-prose">${tab.description}</p>` : ''}
      ${contentHtml}
    </div>`;
  }).join('');

  return `<section class="${sectionClass}" data-tabs>
  <div class="container">
    ${renderSectionHeading(heading)}
    <div class="tab-menu" role="tablist">
      ${tabButtonsHtml}
    </div>
    ${tabPanesHtml}
  </div>
</section>`;
}
