/**
 * Renders a blog sidebar section with gear list + pull quote
 * @param {Object} data
 * @param {string} [data.gearHeading] - Optional heading for gear list (e.g., "What We Carried")
 * @param {Array} [data.gearItems=[]] - List of gear items (rendered as <li> inside <ul>)
 * @param {string} data.pullQuoteText - Pull quote body text (required)
 * @param {string} data.pullQuoteAttribution - Attribution for quote
 * @returns {string} HTML: <section class="section secondary-section"> with 3-column grid
 *
 * Layout:
 *   - Left column (1/3): gear list with optional heading
 *   - Right columns (2/3): large pull quote with <cite> attribution
 *   - Uses grid-align-center to vertically center quote
 *   - Used in blog articles for sidebar gear recommendations + featured quote
 */
export function gearPullquote(data) {
  const { gearHeading, gearItems = [], pullQuoteText, pullQuoteAttribution } = data;

  const gearListHtml = gearItems.map(item => `<li>${item}</li>`).join('');

  return `<section class="section secondary-section">
  <div class="container">
    <div class="grid-layout desktop-3-column grid-gap-lg grid-align-center">
      <div>
        ${gearHeading ? `<h3 class="h3-heading utility-margin-bottom-md">${gearHeading}</h3>` : ''}
        <ul class="blog-gear-list">
${gearListHtml}
        </ul>
      </div>
      <div class="span-2">
        <blockquote class="pull-quote">
          <p class="pull-quote-body">${pullQuoteText}</p>
          <cite class="pull-quote-attribution">${pullQuoteAttribution}</cite>
        </blockquote>
      </div>
    </div>
  </div>
</section>`;
}
