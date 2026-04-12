import { ref, LOGO_ICON_SVG } from '../utils.mjs';
import { renderButton } from '../components/button.mjs';

export function navbar(siteData, depth) {
  const { nav } = siteData;

  const megamenusHtml = nav.megamenus.map(menu => {
    if (menu.variant === 'stories') {
      return renderStoriesMegamenu(menu, depth);
    } else {
      return renderGridMegamenu(menu, depth);
    }
  }).join('\n            ');

  return `<div class="navbar">
  <div class="container">
    <div class="nav-inner">
      <a href="${ref(nav.logoHref, depth)}" class="logo">
        <div class="nav-logo-icon">${LOGO_ICON_SVG}</div>
        <span class="logo-text">WKND<br/>Adventures</span>
      </a>

      <nav class="nav-menu" id="nav-menu" aria-label="Main navigation">
        <ul class="nav-menu-list">
            ${megamenusHtml}
        </ul>
      </nav>

      <div class="nav-right">
        ${renderButton({ href: ref(nav.subscribeHref, depth), label: 'Subscribe', variant: 'primary' })}
        <button class="nav-mobile-menu-button" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-menu">
          <span>Menu</span>
        </button>
      </div>
    </div>
  </div>
</div>`;
}

function renderGridMegamenu(menu, depth) {
  const linksHtml = menu.links.map(link => `
          <a href="${ref(link.href, depth)}" class="nav-megamenu-link">
            <span class="nav-megamenu-link-title">${link.title}</span>
            <span class="nav-megamenu-link-desc">${link.desc}</span>
          </a>`).join('');

  return `<li class="nav-menu-list-item nav-megamenu-item">
        <button class="nav-link nav-megamenu-trigger" aria-expanded="false" aria-haspopup="true">
          <span>${menu.label}</span><span class="nav-caret" aria-hidden="true"></span>
        </button>
        <div class="nav-megamenu">
          <div class="container">
            <div class="nav-megamenu-grid ${menu.gridClass}">${linksHtml}
            </div>
          </div>
        </div>
      </li>`;
}

function renderStoriesMegamenu(menu, depth) {
  const pageLinksHtml = menu.pageLinks.map(link => `
        <a href="${ref(link.href, depth)}" class="nav-megamenu-link">
          <span class="nav-megamenu-link-title">${link.title}</span>
          <span class="nav-megamenu-link-desc">${link.desc}</span>
        </a>`).join('');

  const articlesHtml = menu.recentArticles.map(article => `
          <a href="${ref(article.href, depth)}" class="nav-megamenu-article">
            <span class="nav-megamenu-article-title">${article.title}</span>
            <span class="nav-megamenu-article-desc">${article.desc}</span>
          </a>`).join('');

  return `<li class="nav-menu-list-item nav-megamenu-item">
        <button class="nav-link nav-megamenu-trigger" aria-expanded="false" aria-haspopup="true">
          <span>${menu.label}</span><span class="nav-caret" aria-hidden="true"></span>
        </button>
        <div class="nav-megamenu">
          <div class="container">
            <div class="nav-megamenu-stories">
              <div class="nav-megamenu-stories-pages">${pageLinksHtml}
              </div>
              <div class="nav-megamenu-stories-articles">
                <p class="nav-megamenu-section-label">${menu.recentArticlesLabel}</p>
                <div class="nav-megamenu-articles-grid">${articlesHtml}
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>`;
}
