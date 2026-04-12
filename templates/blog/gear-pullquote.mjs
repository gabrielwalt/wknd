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
