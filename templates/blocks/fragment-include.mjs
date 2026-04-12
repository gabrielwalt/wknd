export function fragmentInclude(data) {
  const { sectionClass = 'section', containerClass = '', heading, headingLink, fragmentSrc } = data;

  const containerClassStr = containerClass ? ` ${containerClass}` : '';
  const headingLinkHtml = headingLink ? `
      <a href="${headingLink.href}" class="text-button"><div>${headingLink.label}</div></a>` : '';

  return `<section class="${sectionClass}">
  <div class="container${containerClassStr}">
    ${heading ? `<div class="section-heading">
      <h2 class="h2-heading">${heading}</h2>${headingLinkHtml}
    </div>` : ''}
    <div data-fragment="${fragmentSrc}"></div>
  </div>
</section>`;
}
