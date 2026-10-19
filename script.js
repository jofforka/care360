const CARE360_CONFIG = {
  plusPlayStore: "https://play.google.com/store/apps/details?id=com.cnu.doctor",
  patientPlayStore: "https://play.google.com/store/apps/details?id=com.cnu.patient",
  plusAppleStore: "",
  patientAppleStore: "",
  plusApk: "downloads/Care360Plus.apk",
  hms: "https://www.care360hms.com",
  onlineCourses: "",
  practicalBooking: "https://wa.me/2349039331632",
  email: "info@cnumedical.com",
  phoneNG: "+2349039331632",
  phoneUS: "+16788790721",
  demoVideos: { plus: "", patient: "" },
  launchDate: null
};

const invalidValue = value => !value || /YOUR-|example\.com/i.test(value);

function applyConfiguration(){
  document.querySelectorAll("[data-link]").forEach(element=>{
    const key=element.dataset.link;
    const value=CARE360_CONFIG[key];
    if(invalidValue(value)){
      element.removeAttribute("href");
      element.classList.add("btn-disabled");
      element.setAttribute("aria-disabled","true");
      return;
    }
    element.href=value;
    if(/^https?:/i.test(value)){
      element.target="_blank";
      element.rel="noopener noreferrer";
    }
  });

  document.querySelectorAll("#contact-email").forEach(el=>{
    el.textContent=CARE360_CONFIG.email;
    el.href=`mailto:${CARE360_CONFIG.email}`;
  });
  document.querySelectorAll('[data-phone="ng"]').forEach(el=>el.href=`tel:${CARE360_CONFIG.phoneNG}`);
  document.querySelectorAll('[data-phone="us"]').forEach(el=>el.href=`tel:${CARE360_CONFIG.phoneUS}`);
  document.querySelectorAll("#current-year").forEach(el=>el.textContent=new Date().getFullYear());
}

function startCountdown(){
  if(!CARE360_CONFIG.launchDate) return;
  const target=new Date(CARE360_CONFIG.launchDate).getTime();
  if(Number.isNaN(target)) return;
  const update=()=>{
    const distance=Math.max(0,target-Date.now());
    const values={
      days:Math.floor(distance/86400000),
      hours:Math.floor((distance%86400000)/3600000),
      minutes:Math.floor((distance%3600000)/60000),
      seconds:Math.floor((distance%60000)/1000)
    };
    Object.entries(values).forEach(([key,value])=>{
      document.querySelectorAll(`#${key}, [data-countdown="${key}"]`).forEach(el=>el.textContent=String(value).padStart(2,"0"));
    });
  };
  update();
  window.setInterval(update,1000);
}

function setupDemoVideos(){
  // Enter only an 11-character YouTube video ID once the approved walkthrough is published.
  const ids=CARE360_CONFIG.demoVideos||{};
  Object.entries(ids).forEach(([app,id])=>{
    if(!/^[A-Za-z0-9_-]{11}$/.test(id||""))return;
    const area=document.querySelector('[data-demo-player="'+app+'"]');
    const placeholder=document.querySelector('[data-demo-placeholder="'+app+'"]');
    if(!area)return;
    const frame=document.createElement("iframe");
    frame.src="https://www.youtube-nocookie.com/embed/"+encodeURIComponent(id)+"?rel=0";
    frame.title=app==="plus"?"Care360 Plus app demonstration":"Care360 Patient app demonstration";
    frame.loading="lazy";
    frame.referrerPolicy="strict-origin-when-cross-origin";
    frame.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen=true;
    area.appendChild(frame);
    area.hidden=false;
    if(placeholder)placeholder.hidden=true;
  });
}

function setupRevealAnimations(){
  const items=document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    items.forEach(item=>item.classList.add("visible"));
    return;
  }
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}
    });
  },{threshold:.1,rootMargin:"0px 0px -40px"});
  items.forEach(item=>observer.observe(item));
}

function setupMobileMenu(){
  const toggle=document.querySelector(".menu-toggle");
  const menu=document.querySelector(".nav-links");
  if(!toggle||!menu) return;
  const close=()=>{menu.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation");document.body.classList.remove("menu-open")};
  toggle.addEventListener("click",()=>{
    const open=!menu.classList.contains("open");
    menu.classList.toggle("open",open);
    toggle.setAttribute("aria-expanded",String(open));
    toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
    document.body.classList.toggle("menu-open",open);
  });
  menu.querySelectorAll("a").forEach(link=>link.addEventListener("click",close));
  document.addEventListener("click",event=>{if(!menu.contains(event.target)&&!toggle.contains(event.target))close()});
  document.addEventListener("keydown",event=>{if(event.key==="Escape") close()});
  window.addEventListener("resize",()=>{if(window.innerWidth>860) close()});
  window.addEventListener("pageshow",close);
}

document.addEventListener("DOMContentLoaded",()=>{
  applyConfiguration();
  startCountdown();
  setupDemoVideos();
  setupRevealAnimations();
  setupMobileMenu();
});
