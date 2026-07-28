/*
  CARE360 ADMIN CONFIGURATION
  Update only the values below when links, contact details, APK version,
  or the launch date change. The page layout does not need to be edited.
*/
const CARE360_CONFIG = {
  plusPlayStore: "https://play.google.com/store/apps/details?id=com.cnu.doctor",
  patientPlayStore: "https://play.google.com/store/apps/details?id=com.cnu.patient",
  appleStore: "",
  apk: "downloads/Care360Plus.apk",
  apkVersion: "v1.0.0",
  hms: "https://YOUR-HMS-WEBSITE.com",
  onlineCourses: "https://YOUR-COURSE-PLATFORM.com",
  practicalBooking: "https://YOUR-BOOKING-LINK.com",
  certificationEnquiry: "mailto:hello@care360apps.com?subject=Care360%20Training%20and%20Certification",
  email: "hello@care360apps.com",
  phoneDisplay: "+234 901 234 5678",
  phoneHref: "+2349012345678",
  // Patient App launch date. Current setting is 60 days from 27 July 2026.
  launchDate: "2026-09-25T09:00:00+01:00"
};

function applyConfiguration() {
  const map = {
    plusPlayStore: CARE360_CONFIG.plusPlayStore,
    patientPlayStore: CARE360_CONFIG.patientPlayStore,
    apk: CARE360_CONFIG.apk,
    hms: CARE360_CONFIG.hms,
    onlineCourses: CARE360_CONFIG.onlineCourses,
    practicalBooking: CARE360_CONFIG.practicalBooking,
    certificationEnquiry: CARE360_CONFIG.certificationEnquiry
  };

  document.querySelectorAll("[data-link]").forEach((element) => {
    const key = element.dataset.link;
    if (map[key]) element.href = map[key];
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
  const ids = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  if (!ids.days || !ids.hours || !ids.minutes || !ids.seconds) return;

  function update() {
    const difference = Math.max(0, target - Date.now());
    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    ids.days.textContent = String(days).padStart(2, "0");
    ids.hours.textContent = String(hours).padStart(2, "0");
    ids.minutes.textContent = String(minutes).padStart(2, "0");
    ids.seconds.textContent = String(seconds).padStart(2, "0");
  }

  update();
  window.setInterval(update, 1000);
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
}

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

function setupDownloadTracking() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    link.addEventListener("click", () => {
      const destination = link.dataset.link;
      console.info(`Care360 link clicked: ${destination}`);
      // Add Google Analytics or another analytics event here when required.
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfiguration();
  startCountdown();
  setupRevealAnimations();
  setupMobileMenu();
  setupDownloadTracking();
});
