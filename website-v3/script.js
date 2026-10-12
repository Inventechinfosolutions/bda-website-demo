(function () {
  'use strict';

  var root = document.documentElement;
  var nav = document.querySelector('.nav');
  var menuToggle = document.getElementById('menu-toggle');
  var menus = document.querySelectorAll('.has-menu');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile menu ---------- */
  function setMobileMenu(open) {
    nav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuToggle.addEventListener('click', function () {
    setMobileMenu(!nav.classList.contains('is-open'));
  });

  /* ---------- Dropdowns (click / keyboard; hover handled in CSS) ---------- */
  function closeMenus(except) {
    menus.forEach(function (m) {
      if (m === except || m.contains(except)) return;
      m.classList.remove('is-open');
      m.querySelector('button').setAttribute('aria-expanded', 'false');
    });
  }

  menus.forEach(function (menu) {
    var btn = menu.querySelector('button');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !menu.classList.contains('is-open');
      closeMenus(menu);
      menu.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-menu')) closeMenus();
  });

  document.querySelectorAll('.dropdown a').forEach(function (a) {
    a.addEventListener('click', function () {
      closeMenus();
      setMobileMenu(false);
    });
  });

  /* ---------- Search (site search on bdakarnataka.in) ---------- */
  var searchBtn = document.getElementById('search-btn');
  var searchPanel = document.getElementById('search-panel');
  var searchInput = document.getElementById('search-input');
  var searchQ = document.getElementById('search-q');

  searchBtn.addEventListener('click', function () {
    searchPanel.hidden = !searchPanel.hidden;
    searchBtn.setAttribute('aria-expanded', String(!searchPanel.hidden));
    if (!searchPanel.hidden) searchInput.focus();
  });
  searchPanel.addEventListener('submit', function (e) {
    var term = searchInput.value.trim();
    if (!term) { e.preventDefault(); searchInput.focus(); return; }
    searchQ.value = 'site:bdakarnataka.in ' + term;
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeMenus();
    searchPanel.hidden = true;
    searchBtn.setAttribute('aria-expanded', 'false');
    setMobileMenu(false);
  });

  /* ---------- Hero background slideshow ---------- */
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.slide-dots button');
  var current = 0;
  var slideTimer = null;
  var SLIDE_MS = 6500;

  function showSlide(i) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    dots[current].removeAttribute('aria-current');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-current', 'true');
  }
  function startSlides() {
    if (reduceMotion || slideTimer) return;
    slideTimer = setInterval(function () { showSlide(current + 1); }, SLIDE_MS);
  }
  function stopSlides() { clearInterval(slideTimer); slideTimer = null; }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      stopSlides();
      showSlide(i);
      startSlides();
    });
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stopSlides(); else startSlides();
  });
  // Warm the cache so crossfades don't flash
  slides.forEach(function (s) {
    var url = s.style.backgroundImage.slice(5, -2);
    if (url) { var img = new Image(); img.src = url; }
  });
  startSlides();

  /* ---------- Theme toggle ---------- */
  document.getElementById('theme-toggle').addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('bda-theme', next); } catch (e) {}
  });

  /* ---------- Core departments: load more per row ---------- */
  var deptGrid = document.getElementById('dept-grid');
  var deptBtn = document.getElementById('dept-next');
  var depts = Array.prototype.slice.call(deptGrid.querySelectorAll('.dept'));
  var shown = 0;

  function columns() {
    return getComputedStyle(deptGrid).gridTemplateColumns.split(' ').length || 1;
  }
  // Rows on wide screens; on phones (1–2 columns) step by 4 cards
  function step() {
    var cols = columns();
    return cols <= 2 ? 4 : cols;
  }
  function baseCount() {
    return Math.min(depts.length, step());
  }
  function render(count, animateFrom) {
    shown = count;
    depts.forEach(function (d, i) {
      var visible = i < count;
      d.classList.toggle('is-hidden', !visible);
      d.classList.remove('is-entering');
      if (visible && animateFrom !== undefined && i >= animateFrom) {
        d.style.animationDelay = (i - animateFrom) * 50 + 'ms';
        // reflow so the animation restarts
        void d.offsetWidth;
        d.classList.add('is-entering');
      }
    });
    var all = count >= depts.length;
    deptBtn.setAttribute('aria-expanded', String(all));
    deptBtn.setAttribute('aria-label', all ? 'Show fewer departments' : 'Load more departments');
    deptBtn.title = deptBtn.getAttribute('aria-label');
  }

  deptBtn.addEventListener('click', function () {
    if (shown >= depts.length) {
      render(baseCount());
      document.getElementById('departments').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
    } else {
      var prev = shown;
      render(Math.min(depts.length, shown + step()), prev);
    }
  });

  render(baseCount());
  var lastCols = columns();
  window.addEventListener('resize', function () {
    var cols = columns();
    if (cols === lastCols) return;
    lastCols = cols;
    if (shown < depts.length) render(baseCount());
  });

  /* ---------- Policy modal ---------- */
  document.querySelectorAll('[data-modal]').forEach(function (btn) {
    var dlg = document.getElementById(btn.dataset.modal);
    if (!dlg || typeof dlg.showModal !== 'function') return;
    btn.addEventListener('click', function () { dlg.showModal(); });
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.closest('[data-close]')) dlg.close();
    });
  });

  /* ---------- Today's visitor count (official BDA API; hidden if unavailable) ---------- */
  if (window.fetch) {
    fetch('https://www.bdakarnataka.in/api/dailyVisit/visits/today')
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (data) {
        var n = typeof data === 'number' ? data : (data && (data.count || data.visits || data.total));
        if (typeof n !== 'number') return;
        document.getElementById('visitor-num').textContent = n.toLocaleString('en-IN');
        document.getElementById('visitor').hidden = false;
      })
      .catch(function () {});
  }

  /* ---------- Reveal + stat counters ---------- */
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = parseInt(el.dataset.decimals || '0', 10);
    var suffix = el.dataset.suffix || '';
    var start = performance.now();
    var duration = 1200;
    function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealEls = document.querySelectorAll('.service, .ann-item, .stat, .site-footer');
    revealEls.forEach(function (el) { el.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('is-visible');
        // Drop reveal styles once done so hover transitions aren't delayed
        setTimeout(function () {
          el.classList.remove('reveal', 'is-visible');
          el.style.transitionDelay = '';
        }, 700 + parseInt(el.style.transitionDelay || '0', 10));
        var num = el.querySelector('[data-count]');
        if (num) countUp(num);
        io.unobserve(el);
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 6) * 60 + 'ms';
      io.observe(el);
    });
  }
})();
