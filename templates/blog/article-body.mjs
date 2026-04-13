/**
 * Renders a typed array of content blocks into HTML
 * @param {Array} blocks - Array of block objects (default [])
 * @param {string} blocks[].type - Block type: 'p', 'h2', 'h3', 'figure', 'blockquote', 'pull-quote', 'ul', 'html'
 * @param {string} blocks[].text - Block text content (for p, h2, h3, blockquote, pull-quote)
 * @param {string} blocks[].src - Image URL (for figure)
 * @param {string} blocks[].alt - Image alt text (for figure)
 * @param {string} [blocks[].caption] - Optional figure caption
 * @param {string} blocks[].attribution - Attribution for pull-quote (required for pull-quote type)
 * @param {Array} blocks[].items - List items (for ul type)
 * @param {string} blocks[].html - Raw HTML (for html type escape hatch)
 * @returns {string} HTML: joined block HTML strings with newlines
 *
 * Type handlers:
 *   - p, h2, h3: simple text wrapping
 *   - figure: <img> + optional <figcaption>
 *   - blockquote: <blockquote><p>...</p></blockquote>
 *   - pull-quote: styled blockquote with <cite> attribution
 *   - ul: unordered list with blog-gear-list class
 *   - html: escape hatch for complex markup (inserted as-is, not escaped)
 *
 * This typed approach allows fixes (semantic cite, figure structure) to auto-apply to all blog posts
 */
export function renderArticleBody(blocks = []) {
  const blockHtml = blocks.map(block => {
    switch (block.type) {
      case 'p':
        return `<p>${block.text}</p>`;

      case 'h2':
        return `<h2>${block.text}</h2>`;

      case 'h3':
        return `<h3>${block.text}</h3>`;

      case 'figure':
        return `<figure>
  <img src="${block.src}" alt="${block.alt}" class="gallery-img--wide">
  ${block.caption ? `<figcaption>${block.caption}</figcaption>` : ''}
</figure>`;

      case 'blockquote':
        return `<blockquote>
  <p>${block.text}</p>
</blockquote>`;

      case 'pull-quote':
        return `<blockquote class="pull-quote">
  <p class="pull-quote-body">${block.text}</p>
  <cite class="pull-quote-attribution">${block.attribution}</cite>
</blockquote>`;

      case 'ul':
        const items = (block.items || []).map(item => `<li>${item}</li>`).join('');
        return `<ul class="blog-gear-list">
${items}
</ul>`;

      case 'html':
        // Escape hatch for complex markup
        return block.html;

      default:
        return '';
    }
  }).join('\n');

  return blockHtml;
}
