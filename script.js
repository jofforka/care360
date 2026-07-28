/* =========================================================
   CARE360 SITE CONFIGURATION
   Change links and launch details here without editing layout.
   ========================================================= */
const CARE360_CONFIG = Object.freeze({
  plusPlayStore: "https://play.google.com/store/apps/details?id=com.cnu.doctor",
  patientPlayStore: "https://play.google.com/store/apps/details?id=com.cnu.patient",
  appleStore: "",
  apk: "downloads/Care360Plus.apk",
  apkVersion: "v1.0.0",
  hms: "https://YOUR-HMS-WEBSITE.com",
  onlineCourses: "https://YOUR-COURSE-PLATFORM.com",
  certificationEnquiry: "mailto:hello@care360apps.com?subject=Care360%20Certification%20Enquiry",
  practicalBooking: "https://YOUR-BOOKING-LINK.com",
  email: "hello@care360apps.com",
  phoneDisplay: "+234 901 234 5678",
  phoneHref: "+2349012345678",
  // 60 days from 28 July 2026. Update this whenever the launch date changes.
  launchDate: "2026-09-26T09:00:00+01:00"
});

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function isPlaceholder(url = "") {
  return !url || /YOUR-|example\.com/i.test(url);
}

function applyConfiguration() {
  $$('[data-link]').forEach((element) => {
    const key = element.dataset.link;
    const url = CARE360_CONFIG[key];

    if (!url || isPlaceholder(url)) {
      element.setAttribute('aria-disabled', 'true');
      element.classList.add('button-disabled');
      element.addEventListener('click', (event) => event.preventDefault());
      return;
    }

    element.href = url;
    if (/^https?:/i.test(url)) {
      element.target = '_blank';
      element.rel = 'noopener noreferrer';
    }
  });

  const version = $('#apk-version');
  if (version) version.textContent = CARE360_CONFIG.apkVersion;

  const email = $('#contact-email');
  if (email) {
    email.textContent = CARE360_CONFIG.email;
    email.href = `mailto:${CARE360_CONFIG.email}`;
  }

  const phone = $('#contact-phone');
  if (phone) {
    phone.textContent = CARE360_CONFIG.phoneDisplay;
    phone.href = `tel:${CARE360_CONFIG.phoneHref}`;
  }

  const year = $('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());
}

function startCountdown() {
  const countdownIds = ['days', 'hours', 'minutes', 'seconds'];
  const nodes = Object.fromEntries(countdownIds.map((id) => [id, $(`#${id}`)]));
  if (countdownIds.some((id) => !nodes[id])) return;

  const target = new Date(CARE360_CONFIG.launchDate).getTime();
  if (Number.isNaN(target)) return;

  const update = () => {
    const remaining = Math.max(0, target - Date.now());
    const values = {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining % 86400000) / 3600000),
      minutes: Math.floor((remaining % 3600000) / 60000),
      seconds: Math.floor((remaining % 60000) / 1000)
    };

    Object.entries(values).forEach(([key, value]) => {
      nodes[key].textContent = String(value).padStart(2, '0');
    });

    if (remaining === 0) {
      const title = $('#countdown-title');
      if (title) title.textContent = 'The Care360 Patient App is now live.';
      window.clearInterval(timer);
    }
  };

  update();
  const timer = window.setInterval(update, 1000);
}

function setupRevealAnimations() {
  const elements = $$('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  elements.forEach((element) => observer.observe(element));
}

function setupMobileMenu() {
  const toggle = $('.menu-toggle');
  const menu = $('.nav-links');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('open');
    menu.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', isOpen);
  });

  $$('a', menu).forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', (event) => {
    if (!menu.classList.contains('open')) return;
    if (!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  }, { passive: true });
}

function setupHeaderState() {
  const header = $('.site-header');
  if (!header) return;

  const sync = () => header.classList.toggle('scrolled', window.scrollY > 12);
  sync();
  window.addEventListener('scroll', sync, { passive: true });
}

function setupPremiumPointerMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return;
  const stage = $('.hero-stage');
  if (!stage) return;

  let frame;
  stage.addEventListener('pointermove', (event) => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      stage.style.setProperty('--pointer-x', `${x * 8}px`);
      stage.style.setProperty('--pointer-y', `${y * 8}px`);
    });
  });
  stage.addEventListener('pointerleave', () => {
    stage.style.removeProperty('--pointer-x');
    stage.style.removeProperty('--pointer-y');
  });
}

function setupLinkTracking() {
  $$('[data-link]').forEach((link) => {
    link.addEventListener('click', () => {
      if (link.getAttribute('aria-disabled') === 'true') return;
      console.info('Care360 destination selected:', link.dataset.link);
    });
  });
}

function init() {
  applyConfiguration();
  startCountdown();
  setupRevealAnimations();
  setupMobileMenu();
  setupHeaderState();
  setupPremiumPointerMotion();
  setupLinkTracking();
}

document.addEventListener('DOMContentLoaded', init, { once: true });
