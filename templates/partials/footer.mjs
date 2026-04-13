import { ref, LOGO_ICON_SVG } from '../utils.mjs';

/**
 * Renders the footer with logo, tagline, and links
 * @param {Object} siteData - Site configuration (from data/site.json)
 * @param {Object} siteData.footer - Footer configuration
 * @param {Array} siteData.footer.columns - Footer column definitions (see renderLinksColumn)
 * @param {string} siteData.footer.copyrightText - Copyright notice text
 * @param {string} siteData.footer.closingText - Closing tagline text
 * @param {number} depth - URL depth: 0 for root, 1 for /blog (controls relative paths)
 * @param {string} [variant='root'] - Footer variant: 'root' shows "Published weekly..." tagline, 'blog' hides it
 * @returns {string} HTML: <footer class="footer inverse-footer"> with logo and columns
 *
 * Layout:
 *   - Logo column (always rendered)
 *   - 3 additional link columns (Explore, Recent Stories, Info)
 *   - Bottom row: copyright + closing text
 *   - Dark background (inverse-footer class)
 *   - Responsive 4-column grid on desktop, adapts on mobile
 *
 * Depth awareness:
 *   - Blog pages (depth=1) get relative paths like "../" instead of "/"
 */
export function footer(siteData, depth, variant = 'root') {
  const { footer: footerData } = siteData;
  const hasPublishedWeeklyTagline = variant === 'root';

  const columnsHtml = footerData.columns
    .filter(col => col.type !== 'logo')
    .map(col => renderLinksColumn(col, depth))
    .join('\n          ');

  return `<footer class="footer inverse-footer">
  <div class="container">
    <div class="grid-layout desktop-4-column grid-gap-xl footer-top">
      <div>
        <div class="footer-logo">
          <div class="footer-logo-icon">${LOGO_ICON_SVG}</div>
          <span class="logo-text">WKND<br/>Adventures</span>
        </div>
        <p class="paragraph-sm footer-tagline">Bold Stories. Real Life. Wild Places.${hasPublishedWeeklyTagline ? ' Published weekly from somewhere with no Wi-Fi.' : ''}</p>
      </div>
      ${columnsHtml}
    </div>
    <div class="footer-bottom">
      <p class="paragraph-sm footer-tagline">${footerData.copyrightText}</p>
      <p class="paragraph-sm footer-tagline">${footerData.closingText}</p>
    </div>
  </div>
</footer>`;
}


function renderLinksColumn(col, depth) {
  const linksHtml = col.links.map(link => `
          <li><a href="${ref(link.href, depth)}" class="footer-link">${link.label}</a></li>`).join('');

  return `<div>
        <h4 class="h6-heading footer-col-heading">${col.heading}</h4>
        <ul>${linksHtml}
        </ul>
      </div>`;
}
