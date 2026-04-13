(function () {
  'use strict';

  var MOBILE_MAX = 991;
  var HOVER_CLOSE_MS = 200;

  function initMobileNav() {
    var navToggle = document.getElementById('nav-toggle');
    var navMenu = document.getElementById('nav-menu');
    if (!navToggle || !navMenu) return;
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  function initMegamenuMobile() {
    document.querySelectorAll('.nav-megamenu-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        if (window.innerWidth <= MOBILE_MAX) {
          var item = trigger.closest('.nav-megamenu-item');
          if (!item) return;
          var open = item.classList.toggle('is-open');
          trigger.setAttribute('aria-expanded', String(open));
        }
      });
    });
  }

  function initMegamenuDesktopHover() {
    var timers = new Map();
    document.querySelectorAll('.nav-megamenu-item').forEach(function (item) {
      var menu = item.querySelector('.nav-megamenu');
      if (!menu) return;
      function openMenu() {
        clearTimeout(timers.get(item));
        item.classList.add('mega-open');
      }
      function scheduleClose() {
        timers.set(item, setTimeout(function () {
          item.classList.remove('mega-open');
        }, HOVER_CLOSE_MS));
      }
      item.addEventListener('mouseenter', function () {
        if (window.innerWidth > MOBILE_MAX) openMenu();
      });
      item.addEventListener('mouseleave', function () {
        if (window.innerWidth > MOBILE_MAX) scheduleClose();
      });
      menu.addEventListener('mouseenter', function () {
        if (window.innerWidth > MOBILE_MAX) openMenu();
      });
      menu.addEventListener('mouseleave', function () {
        if (window.innerWidth > MOBILE_MAX) scheduleClose();
      });
    });
  }

  function onDocumentClick(e) {
    var btn = e.target && e.target.closest && e.target.closest('[data-tabs] .tab-menu-link');
    if (btn) {
      var c = btn.closest('[data-tabs]');
      if (!c) return;
      var tabId = btn.getAttribute('data-tab');
      if (!tabId) return;
      if (e.cancelable) e.preventDefault();
      c.querySelectorAll('.tab-menu-link').forEach(function (b) {
        b.classList.remove('is-active');
      });
      c.querySelectorAll('.tab-pane').forEach(function (p) {
        p.classList.remove('is-active');
      });
      btn.classList.add('is-active');
      var pane = document.getElementById(tabId);
      if (pane) pane.classList.add('is-active');
      return;
    }

    var q = e.target && e.target.closest && e.target.closest('.faq-question');
    if (!q) return;
    var item = q.closest('.faq-item');
    if (!item) return;
    item.classList.toggle('is-open');
    q.setAttribute('aria-expanded', String(item.classList.contains('is-open')));
  }

  function initForms() {
    document.querySelectorAll('form[data-subscribe]').forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
      });
    });
  }

  function init() {
    initMobileNav();
    initMegamenuMobile();
    initMegamenuDesktopHover();
    document.addEventListener('click', onDocumentClick);
    initForms();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
