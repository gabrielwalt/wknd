import { ref } from '../utils.mjs';

export function head({ title, description, depth }) {
  return `<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${description}" />
  <title>${title}</title>
  <link rel="icon" type="image/svg+xml" href="${ref('favicon.svg', depth)}" />
  <link rel="stylesheet" href="${ref('css/styles.css', depth)}" />
</head>`;
}
