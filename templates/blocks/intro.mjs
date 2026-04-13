/**
 * Renders an introductory section with large centered text
 * @param {Object} data
 * @param {string} [data.sectionClass='section accent-section'] - Section CSS class
 * @param {string} data.heading - Section heading (required)
 * @param {string} data.body - Section description text (required, rendered as <p class="paragraph-xl">)
 * @returns {string} HTML: <section class="section accent-section"> with centered narrow container
 *
 * Simple layout: good for page introductions, summaries, call-outs
 * Default background is amber/accent color
 * Container uses narrow width for readability
 */
export function intro(data) {
  const { sectionClass = 'section accent-section', heading, body } = data;

  return `<section class="${sectionClass}">
  <div class="container container--narrow container--centered">
    <h2 class="h2-heading utility-margin-bottom-lg">${heading}</h2>
    <p class="paragraph-xl">${body}</p>
  </div>
</section>`;
}
