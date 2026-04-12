export function proseNarrow(data) {
  const { sectionClass = 'section', containerClass = 'container--narrow', heading, headingLink, body } = data;

  const headingLinkHtml = headingLink ? `
        <a href="${headingLink.href}" class="text-button"><div>${headingLink.label}</div></a>` : '';

  return `<section class="${sectionClass}">
  <div class="container ${containerClass}">
    ${heading ? `<div class="section-heading${headingLink ? '' : ' utility-margin-bottom-lg'}">
      <h2 class="h2-heading">${heading}</h2>${headingLinkHtml}
    </div>` : ''}
    ${body}
  </div>
</section>`;
}
