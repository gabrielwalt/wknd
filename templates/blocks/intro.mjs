export function intro(data) {
  const { sectionClass = 'section accent-section', heading, body } = data;

  return `<section class="${sectionClass}">
  <div class="container container--narrow container--centered">
    <h2 class="h2-heading utility-margin-bottom-lg">${heading}</h2>
    <p class="paragraph-xl">${body}</p>
  </div>
</section>`;
}
