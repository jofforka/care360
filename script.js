/* Care360 central configuration — routine updates happen here. */
const CARE360_CONFIG = Object.freeze({
  plusPlayStore: "https://play.google.com/store/apps/details?id=com.cnu.doctor",
  patientPlayStore: "https://play.google.com/store/apps/details?id=com.cnu.patient",
  plusAppleStore: "",
  patientAppleStore: "",
  plusApk: "downloads/Care360Plus.apk",
  apkVersion: "v1.0.0",
  hms: "https://www.care360hms.com",
  onlineCourses: "",
  practicalBooking: "https://wa.me/2349039331632",
  email: "info@cnumedical.com",
  phones: {
    ng: { display: "+234 903 933 1632", href: "+2349039331632" },
    us: { display: "+1 (678) 879-0721", href: "+16788790721" }
  },
  launchDate: "2026-09-25T09:00:00+01:00"
});

const isValidUrl = value => typeof value === "string" && /^https?:\/\//i.test(value.trim());

function applyConfiguration() {
  document.querySelectorAll("[data-link]").forEach(element => {
    const key = element.dataset.link;
    const value = CARE360_CONFIG[key];
    if (isValidUrl(value)) {
      element.href = value;
      element.classList.remove("is-disabled");
      element.removeAttribute("aria-disabled");
    } else {
      element.removeAttribute("href");
      element.classList.add("is-disabled");
      element.setAttribute("aria-disabled", "true");
    }
  });

  document.querySelectorAll("#contact-email").forEach(element => {
    element.textContent = CARE360_CONFIG.email;
    element.href = `mailto:${CARE360_CONFIG.email}`;
  });

  document.querySelectorAll("[data-phone]").forEach(element => {
    const phone = CARE360_CONFIG.phones[element.dataset.phone];
    if (!phone) return;
    element.textContent = phone.display;
    element.href = `tel:${phone.href}`;
  });

  document.querySelectorAll("#apk-version").forEach(el => el.textContent = CARE360_CONFIG.apkVersion);
  document.querySelectorAll("#current-year").forEach(el => el.textContent = new Date().getFullYear());
}

function startCountdown() {
  const fields = Object.fromEntries(["days", "hours", "minutes", "seconds"].map(key => [key, [...document.querySelectorAll(`[data-countdown="${key}"]`)]]));
  if (!Object.values(fields).some(items => items.length)) return;
  const target = new Date(CARE360_CONFIG.launchDate).getTime();
  if (Number.isNaN(target)) return;

  const render = () => {
    const remaining = Math.max(0, target - Date.now());
    const values = {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining % 86400000) / 3600000),
      minutes: Math.floor((remaining % 3600000) / 60000),
      seconds: Math.floor((remaining % 60000) / 1000)
    };
    Object.entries(values).forEach(([key, value]) => fields[key].forEach(el => el.textContent = String(value).padStart(2, "0")));
  };
  render();
  window.setInterval(render, 1000);
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12, rootMargin: "0px 0px -6%" });
  elements.forEach(el => observer.observe(el));
}

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-links");
  if (!toggle || !menu) return;
  const close = () => { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); document.body.classList.remove("menu-open"); };
  toggle.addEventListener("click", () => {
    const open = !menu.classList.contains("open");
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", close));
  document.addEventListener("keydown", event => { if (event.key === "Escape") close(); });
}

function setupInteractionPolish() {
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  document.querySelectorAll("[data-link]").forEach(link => link.addEventListener("click", () => {
    if (!link.classList.contains("is-disabled")) console.info(`Care360 link clicked: ${link.dataset.link}`);
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfiguration();
  startCountdown();
  setupRevealAnimations();
  setupMobileMenu();
  setupInteractionPolish();
});
