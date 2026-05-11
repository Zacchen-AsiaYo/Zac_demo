/**
 * AsiaYo locale + currency auto-detection demo
 * Implements spec web_currency_and_locale.md §3.2 & §3.3 priority logic.
 *
 * Locale priorities (1 highest → 6 fallback):
 *   1. URL path (/zh-tw/, /zh-cn/, /en-us/, etc.)
 *   2. Cookie `asiayo_locale`
 *   3. Browser navigator.language (exact, then prefix)
 *   4. Member country (skipped — no auth in prototype)
 *   5. IP geolocation (skipped — would need an external API)
 *   6. Fallback → en-us
 *
 * Currency priorities (1 highest → 5 fallback):
 *   1. Cookie `asiayo_currency`
 *   2. Member country (skipped)
 *   3. URL locale → currency mapping
 *   4. IP geolocation (skipped)
 *   5. Fallback → USD
 */
(function () {
  const SUPPORTED_LOCALES = ['zh-tw', 'zh-hk', 'zh-cn', 'zh-my', 'en-us', 'ja-jp', 'ko-kr'];

  const LOCALE_TO_CURRENCY = {
    'zh-tw': 'TWD',
    'zh-hk': 'HKD',
    'zh-cn': 'USD', // §3.1 default for /zh-cn/
    'zh-my': 'MYR',
    'en-us': 'USD',
    'ja-jp': 'JPY',
    'ko-kr': 'KRW',
  };

  const IP_TO_LOCALE = {
    TW: 'zh-tw', HK: 'zh-hk', CN: 'zh-cn', MY: 'zh-my',
    JP: 'ja-jp', KR: 'ko-kr',
  };

  function getCookie(name) {
    const m = document.cookie.match('(^|;)\\s*' + name + '=([^;]+)');
    if (m) return decodeURIComponent(m[2]);
    // Fallback to localStorage for file:// protocol
    try { return localStorage.getItem(name); } catch (e) { return null; }
  }

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days || 365) * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + d.toUTCString() + ';path=/';
    // Also persist to localStorage for file:// protocol
    try { localStorage.setItem(name, value); } catch (e) { /* ignore */ }
  }

  function detectLocale() {
    // P1: URL path
    const pathMatch = location.pathname.match(/\/([a-z]{2}-[a-z]{2})(?:\/|$)/);
    if (pathMatch && SUPPORTED_LOCALES.indexOf(pathMatch[1]) !== -1) {
      return { source: 'P1 URL path', value: pathMatch[1] };
    }
    // P2: Cookie
    const cookieLocale = (getCookie('asiayo_locale') || '').toLowerCase();
    if (SUPPORTED_LOCALES.indexOf(cookieLocale) !== -1) {
      return { source: 'P2 Cookie', value: cookieLocale };
    }
    // P3: navigator.language (exact then prefix)
    const lang = (navigator.language || 'en-us').toLowerCase();
    if (SUPPORTED_LOCALES.indexOf(lang) !== -1) {
      return { source: 'P3 Browser exact', value: lang };
    }
    const prefix = lang.split('-')[0];
    const prefixMatch = SUPPORTED_LOCALES.find(function (l) {
      return l.indexOf(prefix + '-') === 0;
    });
    if (prefixMatch) {
      return { source: 'P3 Browser prefix', value: prefixMatch };
    }
    // P4 Member country / P5 IP — not implemented in prototype
    // P6: Fallback
    return { source: 'P6 Fallback', value: 'en-us' };
  }

  function detectCurrency(locale) {
    // P1: Cookie
    const cookieCurrency = getCookie('asiayo_currency');
    if (cookieCurrency) return { source: 'P1 Cookie', value: cookieCurrency };
    // P2: Member country (set on Prototype login)
    const memberCountry = (getCookie('asiayo_member_country') || '').toUpperCase();
    if (memberCountry) {
      const memberLocale = IP_TO_LOCALE[memberCountry];
      if (memberLocale && LOCALE_TO_CURRENCY[memberLocale]) {
        return { source: 'P2 Member country', value: LOCALE_TO_CURRENCY[memberLocale] };
      }
    }
    // P3: URL locale → currency mapping
    if (LOCALE_TO_CURRENCY[locale]) return { source: 'P3 URL locale', value: LOCALE_TO_CURRENCY[locale] };
    // P4: IP — skipped
    // P5: Fallback
    return { source: 'P5 Fallback', value: 'USD' };
  }

  const localeResult = detectLocale();
  const currencyResult = detectCurrency(localeResult.value);

  // Persist Cookie when URL determined the locale (matches Edge Case in §3.2 D)
  if (localeResult.source === 'P1 URL path') setCookie('asiayo_locale', localeResult.value);
  if (currencyResult.source === 'P3 URL locale') setCookie('asiayo_currency', currencyResult.value);

  console.log('[AsiaYo] locale =', localeResult, '| currency =', currencyResult);

  // Demo badge — shows detection result on every page
  function renderBadge() {
    const pathLocale = (location.pathname.match(/\/([a-z]{2}-[a-z]{2})(?:\/|$)/) || [])[1];
    const wouldRedirect = pathLocale && pathLocale !== localeResult.value && localeResult.source !== 'P1 URL path';
    const badge = document.createElement('div');
    badge.id = 'asiayo-locale-debug';
    badge.style.cssText = [
      'position:fixed', 'bottom:12px', 'right:12px', 'z-index:9999',
      'background:rgba(0,33,56,.92)', 'color:#fff',
      'font:12px/1.5 -apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif',
      'padding:10px 14px', 'border-radius:8px',
      'box-shadow:0 4px 16px rgba(0,0,0,.25)', 'max-width:260px'
    ].join(';');
    badge.innerHTML =
      '<div style="font-weight:700;margin-bottom:6px;color:#1e9fd2;">Locale & Currency Demo</div>' +
      '<div>Locale: <b>' + localeResult.value + '</b> <span style="opacity:.7">(' + localeResult.source + ')</span></div>' +
      '<div>Currency: <b>' + currencyResult.value + '</b> <span style="opacity:.7">(' + currencyResult.source + ')</span></div>' +
      (wouldRedirect ? '<div style="margin-top:6px;color:#ffb74a">⚠ Would redirect to /' + localeResult.value + '/</div>' : '') +
      '<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">' +
      (function () {
        var localeLinks = {
          'zh-tw': '../zh-tw/SEB_v4_PP1_zh_tw.html',
          'zh-cn': '../zh-cn/SEB_v4_PP1_zh_cn.html',
          'en-us': '../en-us/SEB_v4_pp1_en_us.html'
        };
        return ['zh-tw', 'zh-cn', 'en-us'].map(function (l) {
          const active = pathLocale === l;
          return '<a href="' + localeLinks[l] + '" style="background:' + (active ? '#1e9fd2' : 'rgba(255,255,255,.15)') +
            ';color:#fff;padding:2px 8px;border-radius:4px;text-decoration:none;font-size:11px">' + l + '</a>';
        }).join('');
      })() + '</div>' +
      '<div style="margin-top:6px"><button id="asiayo-clear-cookie" style="background:none;border:1px solid rgba(255,255,255,.3);color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;cursor:pointer">Clear cookies & reload</button></div>';
    document.body.appendChild(badge);
    document.getElementById('asiayo-clear-cookie').onclick = function () {
      ['asiayo_locale', 'asiayo_currency', 'asiayo_logged_in', 'asiayo_member_country'].forEach(function (k) {
        document.cookie = k + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        try { localStorage.removeItem(k); } catch (e) {}
      });
      location.reload();
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBadge);
  } else {
    renderBadge();
  }

  // Expose for debugging
  window.AsiaYoLocale = { locale: localeResult, currency: currencyResult };

  // ---------- Header dropdown (currency / locale) ----------
  function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    if (!dropdowns.length) return;

    function closeAll() {
      dropdowns.forEach(function (dd) {
        dd.dataset.open = 'false';
        const m = dd.querySelector('.dropdown__menu');
        if (m) m.setAttribute('hidden', '');
        const t = dd.querySelector('.dropdown__trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }

    dropdowns.forEach(function (dd) {
      const trigger = dd.querySelector('.dropdown__trigger');
      const menu = dd.querySelector('.dropdown__menu');
      if (!trigger || !menu) return;
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const willOpen = dd.dataset.open !== 'true';
        closeAll();
        if (willOpen) {
          dd.dataset.open = 'true';
          menu.removeAttribute('hidden');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', closeAll);

    // Currency: set cookie, update display, reload (re-runs P1→P5 detection)
    document.querySelectorAll('[data-dropdown="currency"] .dropdown__item').forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const value = item.dataset.value;
        if (!value) return;
        setCookie('asiayo_currency', value);
        location.reload();
      });
    });

    // Locale: anchor href triggers navigation; also persist cookie before nav
    document.querySelectorAll('[data-dropdown="locale"] .dropdown__item').forEach(function (item) {
      item.addEventListener('click', function () {
        if (item.dataset.value) setCookie('asiayo_locale', item.dataset.value);
        // Update the trigger label immediately before navigation
        var localeLabel = document.querySelector('[data-dropdown="locale"] .dropdown__label');
        if (localeLabel) {
          localeLabel.textContent = item.dataset.label || item.textContent.trim();
        }
      });
    });

    // Sync locale dropdown label & active state with current locale
    var localeTriggerLabel = document.querySelector('[data-dropdown="locale"] .dropdown__label');
    var currentLocale = localeResult.value;
    document.querySelectorAll('[data-dropdown="locale"] .dropdown__item').forEach(function (item) {
      if (item.dataset.value === currentLocale) {
        item.classList.add('dropdown__item--active');
        // Update the trigger label using data-label (clean name without suffix)
        if (localeTriggerLabel) {
          localeTriggerLabel.textContent = item.dataset.label || item.textContent.trim();
        }
      } else {
        item.classList.remove('dropdown__item--active');
      }
    });

    // Sync currency dropdown label & active state with detected value
    var currencyTriggerLabel = document.querySelector('[data-dropdown="currency"] .dropdown__label');
    if (currencyTriggerLabel) {
      currencyTriggerLabel.textContent = currencyResult.value;
    }
    document.querySelectorAll('[data-dropdown="currency"] .dropdown__item').forEach(function (item) {
      if (item.dataset.value === currencyResult.value) {
        item.classList.add('dropdown__item--active');
      } else {
        item.classList.remove('dropdown__item--active');
      }
    });
  }

  // ---------- Prototype login (one-click = logged in as Zac/TW) ----------
  function isLoggedIn() {
    return getCookie('asiayo_logged_in') === 'true';
  }

  function setLoggedIn(yes) {
    if (yes) {
      setCookie('asiayo_logged_in', 'true');
      setCookie('asiayo_member_country', 'TW');
    } else {
      ['asiayo_logged_in', 'asiayo_member_country'].forEach(function (k) {
        document.cookie = k + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        try { localStorage.removeItem(k); } catch (e) {}
      });
      // Also clear the currency cookie so detect re-evaluates from P3 (URL locale)
      document.cookie = 'asiayo_currency=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      try { localStorage.removeItem('asiayo_currency'); } catch (e) {}
    }
  }

  // Map current detected locale → prototype routes
  var PROTOTYPE_ROUTES = {
    'zh-tw': { passenger: '/template/passenger-info',       seb: '/zh-tw/SEB_v4_PP1_zh_tw.html' },
    'zh-cn': { passenger: '/template/passenger-info-zh-cn', seb: '/zh-cn/SEB_v4_PP1_zh_cn.html' },
    'zh-hk': { passenger: '/template/passenger-info',       seb: '/zh-tw/SEB_v4_PP1_zh_tw.html' },
    'zh-my': { passenger: '/template/passenger-info-zh-cn', seb: '/zh-cn/SEB_v4_PP1_zh_cn.html' },
    'en-us': { passenger: '/template/passenger-info-en-us', seb: '/en-us/SEB_v4_pp1_en_us.html' },
    'ja-jp': { passenger: '/template/passenger-info-en-us', seb: '/en-us/SEB_v4_pp1_en_us.html' },
    'ko-kr': { passenger: '/template/passenger-info-en-us', seb: '/en-us/SEB_v4_pp1_en_us.html' }
  };

  function getRoutes() {
    return PROTOTYPE_ROUTES[localeResult.value] || PROTOTYPE_ROUTES['zh-tw'];
  }

  function buildAvatar() {
    var wrap = document.createElement('div');
    wrap.className = 'asiayo-user-menu';
    wrap.setAttribute('data-prototype-user-menu', '');
    wrap.style.cssText = [
      'position:relative', 'display:inline-flex', 'align-items:center', 'gap:6px',
      'cursor:pointer', 'padding:4px 8px', 'user-select:none',
      'font-family:-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif'
    ].join(';');
    wrap.innerHTML =
      '<span style="width:28px;height:28px;border-radius:50%;background:#1e9fd2;color:#fff;' +
      'display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:600">Z</span>' +
      '<span style="color:#262626;font-size:14px">Zac</span>' +
      '<span class="asiayo-user-menu__caret" style="font-size:10px;color:#595959;transition:transform .15s">▼</span>';

    var routes = getRoutes();
    var panel = document.createElement('div');
    panel.className = 'asiayo-user-menu__panel';
    panel.setAttribute('hidden', '');
    panel.style.cssText = [
      'position:absolute', 'top:calc(100% + 6px)', 'right:0', 'z-index:9998',
      'min-width:240px', 'background:#fff', 'border:1px solid #e8e8e8',
      'border-radius:8px', 'box-shadow:0 4px 16px rgba(0,0,0,.08)',
      'padding:6px 0', 'font-size:14px', 'color:#262626'
    ].join(';');
    var itemStyle = 'display:block;width:100%;padding:10px 16px;background:none;border:0;text-align:left;cursor:pointer;color:inherit;font:inherit;white-space:nowrap';
    panel.innerHTML =
      '<button type="button" data-action="passenger" style="' + itemStyle + '">前往 旅客資料搜集 prototype</button>' +
      '<button type="button" data-action="seb"       style="' + itemStyle + '">前往 SEB v4 PP1.0 prototype</button>' +
      '<div style="height:1px;background:#e8e8e8;margin:6px 0"></div>' +
      '<button type="button" data-action="logout"    style="' + itemStyle + 'color:#f4511e">模擬登出</button>';
    wrap.appendChild(panel);

    // Hover highlight for items
    panel.querySelectorAll('button[data-action]').forEach(function (btn) {
      btn.addEventListener('mouseenter', function () { btn.style.background = '#fafafa'; });
      btn.addEventListener('mouseleave', function () { btn.style.background = 'none'; });
    });

    function closePanel() {
      panel.setAttribute('hidden', '');
      var caret = wrap.querySelector('.asiayo-user-menu__caret');
      if (caret) caret.style.transform = '';
      document.removeEventListener('click', onDocClick);
    }
    function openPanel() {
      panel.removeAttribute('hidden');
      var caret = wrap.querySelector('.asiayo-user-menu__caret');
      if (caret) caret.style.transform = 'rotate(180deg)';
      // Defer so this same click doesn't trigger immediate close
      setTimeout(function () { document.addEventListener('click', onDocClick); }, 0);
    }
    function onDocClick(e) {
      if (!wrap.contains(e.target)) closePanel();
    }

    wrap.addEventListener('click', function (e) {
      // Ignore clicks inside the panel buttons (they have their own handlers)
      if (panel.contains(e.target)) return;
      e.stopPropagation();
      if (panel.hasAttribute('hidden')) openPanel(); else closePanel();
    });

    panel.querySelector('[data-action="passenger"]').addEventListener('click', function (e) {
      e.stopPropagation();
      window.location.href = routes.passenger;
    });
    panel.querySelector('[data-action="seb"]').addEventListener('click', function (e) {
      e.stopPropagation();
      window.location.href = routes.seb;
    });
    panel.querySelector('[data-action="logout"]').addEventListener('click', function (e) {
      e.stopPropagation();
      setLoggedIn(false);
      location.reload();
    });

    return wrap;
  }

  function applyLoginUI() {
    var elements = document.querySelectorAll('[data-prototype-login]');
    if (!elements.length) return;
    elements.forEach(function (el) {
      if (isLoggedIn()) {
        if (el.dataset.userMenuMounted === 'true') return;
        el.dataset.userMenuMounted = 'true';
        el.style.display = 'none';
        var avatar = buildAvatar();
        if (el.parentNode) el.parentNode.insertBefore(avatar, el.nextSibling);
      } else {
        if (el.dataset.loginBound === 'true') return;
        el.dataset.loginBound = 'true';
        // Remove any previously rendered avatar (e.g., after logout)
        var sibling = el.nextSibling;
        while (sibling) {
          var next = sibling.nextSibling;
          if (sibling.nodeType === 1 && sibling.hasAttribute && sibling.hasAttribute('data-prototype-user-menu')) {
            sibling.parentNode.removeChild(sibling);
          }
          sibling = next;
        }
        el.style.display = '';
        el.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          setLoggedIn(true);
          location.reload();
        });
      }
    });
  }

  // ---------- Smart init: handle both plain HTML and React-rendered pages ----------
  var _dropdownsInited = false;

  function tryInitDropdowns() {
    if (_dropdownsInited) return;
    if (document.querySelectorAll('.dropdown').length > 0) {
      _dropdownsInited = true;
      initDropdowns();
    }
  }

  function runInit() {
    tryInitDropdowns();
    applyLoginUI();
  }

  // 1) Try immediately (works for plain HTML pages like index.html)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInit);
  } else {
    runInit();
  }

  // 2) MutationObserver: fires when React renders dropdowns/login into the DOM
  var observer = new MutationObserver(function () {
    if (!_dropdownsInited && document.querySelectorAll('.dropdown').length > 0) {
      _dropdownsInited = true;
      initDropdowns();
    }
    applyLoginUI();
  });
  observer.observe(document.body || document.documentElement, { childList: true, subtree: true });

})();
