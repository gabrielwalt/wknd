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
