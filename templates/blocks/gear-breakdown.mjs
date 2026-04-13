/**
 * Renders a multi-item gear list section with subtitles
 * @param {Object} data
 * @param {string} [data.sectionClass='section'] - Section CSS class
 * @param {string} [data.heading] - Section heading
 * @param {Array} data.items - Gear items
 * @param {string} data.items[].title - Item title (rendered as h3)
 * @param {Array} data.items[].gearList - Array of gear item descriptions
 * @returns {string} HTML: <section> with multiple h3 titles and gear lists (full width)
 *
 * Full-width gear list with multiple subsections.
 * Each subsection has a title and bulleted list.
 */
import { renderSectionHeading } from '../utils.mjs';

export function gearBreakdown(data) {
  const { sectionClass = 'section', heading, items = [] } = data;

  const itemsHtml = items.map(item => {
    const gearHtml = (item.gearList || []).map(gear => `<li>${gear}</li>`).join('');
    return `<h3 class="h3-heading utility-margin-bottom-lg">${item.title}</h3>
    <ul class="blog-gear-list utility-margin-bottom-xl">
      ${gearHtml}
    </ul>`;
  }).join('');

  return `<section class="${sectionClass}">
  <div class="container container--narrow">
    ${renderSectionHeading(heading)}
    ${itemsHtml}
  </div>
</section>`;
}
