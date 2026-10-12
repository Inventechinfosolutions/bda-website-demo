document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero background slideshow: cross-fade through slides, each with a slow Ken Burns zoom
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length) {
    if (prefersReducedMotion) {
      heroSlides.forEach((slide) => {
        const img = slide.querySelector('img');
        if (img) img.style.animation = 'none';
      });
    } else {
      let activeIndex = Array.from(heroSlides).findIndex((s) => s.classList.contains('is-active'));
      if (activeIndex < 0) activeIndex = 0;
      setInterval(() => {
        const nextIndex = (activeIndex + 1) % heroSlides.length;
        heroSlides[activeIndex].classList.remove('is-active');
        heroSlides[nextIndex].classList.add('is-active');
        activeIndex = nextIndex;
      }, 6000);
    }
  }

  // Reveal sections on scroll
  const revealTargets = document.querySelectorAll('.stats-bar-card, .highlights-strip, .footer-card');
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));

  // Staggered pop-in for the stats bar's kpi items as it scrolls into view
  // (Smart Citizen Services / Core Departments cards animate on page load via CSS instead — see dropIn keyframes)
  const kpiItems = document.querySelectorAll('.kpi-item');
  if (kpiItems.length) {
    kpiItems.forEach((el, i) => {
      el.classList.add('stagger-child');
      el.style.transitionDelay = `${i * 70}ms`;
    });
    const statsBarEl = kpiItems[0].closest('.stats-bar-card');
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            kpiItems.forEach((el) => el.classList.add('in-view'));
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    staggerObserver.observe(statsBarEl);
  }

  // Count-up animation for the blue stats bar numbers (94%, 2.4M, 48hr, 156)
  const metricEls = document.querySelectorAll('.metric-value');
  if (metricEls.length) {
    const parsed = Array.from(metricEls).map((el) => {
      const match = el.textContent.trim().match(/^([\d.]+)(.*)$/);
      if (!match) return null;
      const target = parseFloat(match[1]);
      const decimals = (match[1].split('.')[1] || '').length;
      const suffix = match[2];
      return { el, target, decimals, suffix };
    });

    // Start every counter at 0 immediately so there's no flash of the final value before it animates in
    parsed.forEach((item) => {
      if (item) item.el.textContent = `${(0).toFixed(item.decimals)}${item.suffix}`;
    });

    const animateCount = ({ el, target, decimals, suffix }) => {
      if (prefersReducedMotion) {
        el.textContent = `${target.toFixed(decimals)}${suffix}`;
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = `${value.toFixed(decimals)}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const statsBar = document.querySelector('.stats-bar-card');
    if (statsBar) {
      const countObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              parsed.forEach((item) => item && animateCount(item));
              countObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      countObserver.observe(statsBar);
    }
  }

  // Mobile menu toggle (nav collapses at 640px and below)
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const open = primaryNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  // Nav dropdowns: hover opens on desktop (CSS); click/tap/keyboard toggles via .is-open
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  const closeDropdowns = (except) => {
    dropdownItems.forEach((item) => {
      if (item === except) return;
      item.classList.remove('is-open');
      item.querySelector('.nav-item').setAttribute('aria-expanded', 'false');
    });
  };
  // Keep an absolutely-positioned dropdown inside the viewport (nav can wrap on tablets)
  const fitDropdown = (item) => {
    const menu = item.querySelector('.dropdown');
    menu.style.transform = '';
    menu.style.marginLeft = '';
    if (getComputedStyle(menu).position !== 'absolute') return;
    const rect = menu.getBoundingClientRect();
    const overflow = rect.right - (document.documentElement.clientWidth - 12);
    if (overflow > 0) menu.style.marginLeft = `${-Math.min(overflow, rect.left - 12)}px`;
  };
  const fitAllDropdowns = () => dropdownItems.forEach(fitDropdown);
  window.addEventListener('resize', fitAllDropdowns);
  window.addEventListener('load', fitAllDropdowns);
  fitAllDropdowns();

  dropdownItems.forEach((item) => {
    const trigger = item.querySelector('.nav-item');
    item.addEventListener('mouseenter', () => fitDropdown(item));
    item.addEventListener('focusin', () => fitDropdown(item));
    trigger.addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      closeDropdowns(item);
      item.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    });
    item.addEventListener('focusout', (e) => {
      if (!item.contains(e.relatedTarget) && e.relatedTarget) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) closeDropdowns();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const openItem = document.querySelector('.has-dropdown.is-open');
    if (openItem) {
      closeDropdowns();
      openItem.querySelector('.nav-item').focus();
    }
  });

  // News ticker: duplicate the items so the -50% translate loops seamlessly
  const tickerContent = document.querySelector('.ticker-content');
  if (tickerContent) {
    Array.from(tickerContent.children).forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.tabIndex = -1;
      tickerContent.appendChild(clone);
    });
  }

  // Text size controls (A- / A / A+) in the top bar
  const root = document.documentElement;
  const fontSteps = [87.5, 100, 112.5, 125];
  let fontIndex = 1;
  document.querySelectorAll('[data-font]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dir = Number(btn.dataset.font);
      fontIndex = dir === 0 ? 1 : Math.min(Math.max(fontIndex + dir, 0), fontSteps.length - 1);
      root.style.zoom = `${fontSteps[fontIndex]}%`;
    });
  });

  // Back-to-top button appears after scrolling past the hero
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const toggleBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 400);
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
