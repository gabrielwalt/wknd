/**
 * Renders a pull quote (blockquote with attribution)
 * @param {Object} data
 * @param {string} data.text - Pull quote body text (required)
 * @param {string} data.attribution - Attribution line (e.g., author name, location)
 * @returns {string} HTML: <blockquote class="pull-quote"> with <cite> attribution
 *
 * Semantic HTML fix: uses <cite> element for attribution (not <footer> or <p>)
 * Styled as large heading with centered layout
 * Used in blog sidebars, featured quotes, testimonials
 */
export function renderPullQuote({ text, attribution }) {
  return `<blockquote class="pull-quote">
  <p class="pull-quote-body h3-heading utility-margin-bottom-lg">${text}</p>
  <cite class="pull-quote-attribution">${attribution}</cite>
</blockquote>`;
}
