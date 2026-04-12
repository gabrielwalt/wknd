// FIX: standardise on <cite> not <footer> for attribution
export function renderPullQuote({ text, attribution }) {
  return `<blockquote class="pull-quote">
  <p class="pull-quote-body h3-heading utility-margin-bottom-lg">${text}</p>
  <cite class="pull-quote-attribution">${attribution}</cite>
</blockquote>`;
}
