import { ref, LOGO_ICON_SVG } from '../utils.mjs';

export function footer(siteData, depth, variant = 'root') {
  const { footer: footerData } = siteData;
  const hasPublishedWeeklyTagline = variant === 'root';

  const columnsHtml = footerData.columns.map(col => {
    if (col.type === 'logo') {
      return renderLogoColumn(col, hasPublishedWeeklyTagline);
    } else {
      return renderLinksColumn(col, depth);
    }
  }).join('\n          ');

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

function renderLogoColumn(col, hasPublishedWeeklyTagline) {
  // Logo column is already rendered in the main footer, skip it here
  return '';
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
