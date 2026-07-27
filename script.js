/*
  CARE360 ADMIN CONFIGURATION
  Update the values below whenever a link, APK version, launch date,
  contact detail or campaign number changes. No layout editing is required.
*/
const CARE360_CONFIG = {
  playStore: "https://play.google.com/store/apps/details?id=YOUR_APP_ID",
  appleStore: "",
  apk: "downloads/Care360Plus.apk",
  apkVersion: "v1.0.0",
  hms: "https://YOUR-HMS-WEBSITE.com",
  email: "hello@care360.com",
  phoneDisplay: "+234 901 234 5678",
  phoneHref: "+2349012345678",
  practitionerTarget: 1000,
  communitySize: "200+",
  // Set this to the official Patient App launch date.
  launchDate: "2026-09-25T09:00:00+01:00"
};

function applyConfiguration() {
  const links = {
    playStore: CARE360_CONFIG.playStore,
    apk: CARE360_CONFIG.apk,
    hms: CARE360_CONFIG.hms
  };

  document.querySelectorAll("[data-link]").forEach((element) => {
    const key = element.dataset.link;
    if (links[key]) element.href = links[key];
  });

  const apkVersion = document.getElementById("apk-version");
  if (apkVersion) apkVersion.textContent = CARE360_CONFIG.apkVersion;

  const email = document.getElementById("contact-email");
  if (email) {
    email.textContent = CARE360_CONFIG.email;
    email.href = `mailto:${CARE360_CONFIG.email}`;
  }

  const phone = document.getElementById("contact-phone");
  if (phone) {
    phone.textContent = CARE360_CONFIG.phoneDisplay;
    phone.href = `tel:${CARE360_CONFIG.phoneHref}`;
  }

  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
}

function startCountdown() {
  const target = new Date(CARE360_CONFIG.launchDate).getTime();
  const elements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  function updateCountdown() {
    const distance = Math.max(0, target - Date.now());
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    if (elements.days) elements.days.textContent = String(days).padStart(2, "0");
    if (elements.hours) elements.hours.textContent = String(hours).padStart(2, "0");
    if (elements.minutes) elements.minutes.textContent = String(minutes).padStart(2, "0");
    if (elements.seconds) elements.seconds.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}

function setupRevealAnimations() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
}

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupLinkTracking() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    link.addEventListener("click", () => {
      console.info(`Care360 destination clicked: ${link.dataset.link}`);
      // Add your analytics event here, if required.
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfiguration();
  startCountdown();
  setupRevealAnimations();
  setupMobileMenu();
  setupLinkTracking();
});
