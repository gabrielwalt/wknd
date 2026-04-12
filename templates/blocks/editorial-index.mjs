export function editorialIndex(data) {
  const { sectionClass = 'section', containerClass = '', heading, items } = data;

  const itemsHtml = (items || []).map(item => {
    const linkHtml = item.link ? `<a href="${item.link.href}" class="text-button">${item.link.label}</a>` : '';
    return `
    <div class="editorial-index-item">
      <span class="editorial-index-number">${item.number}</span>
      <div>
        <h3 class="h4-heading utility-margin-bottom-md">${item.heading}</h3>
        <p class="paragraph-lg utility-text-secondary">${item.body}</p>
        ${linkHtml}
      </div>
    </div>`;
  }).join('');

  const containerClassStr = containerClass ? ` ${containerClass}` : '';

  return `<section class="${sectionClass}">
  <div class="container${containerClassStr}">
    ${heading ? `<div class="section-heading">
      <h2 class="h2-heading">${heading}</h2>
    </div>` : ''}
    <div class="editorial-index">${itemsHtml}
    </div>
  </div>
</section>`;
}
