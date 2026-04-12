export function ticker(data) {
  const { items = [] } = data;

  // Duplicate items for seamless loop
  const doubledItems = [...items, ...items];
  const itemsHtml = doubledItems.map((item, i) => {
    const sep = i < doubledItems.length - 1 ? '<span class="ticker-sep">·</span>' : '';
    return `<span>${item}</span>${sep}`;
  }).join('');

  return `<div class="ticker-strip" aria-hidden="true">
  <div class="ticker-track">
    ${itemsHtml}
  </div>
</div>`;
}
