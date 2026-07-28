const CARE360_CONFIG = {
  plusPlayStore: "https://play.google.com/store/apps/details?id=com.cnu.doctor",
  patientPlayStore: "https://play.google.com/store/apps/details?id=com.cnu.patient",
  plusApk: "downloads/Care360Plus.apk",
  hms: "https://YOUR-HMS-WEBSITE.com",
  onlineCourses: "https://YOUR-COURSE-PLATFORM.com",
  practicalBooking: "https://YOUR-BOOKING-LINK.com",
  email: "hello@care360apps.com",
  phoneDisplay: "+234 901 234 5678",
  phoneHref: "+2349012345678",
  launchDate: "2026-09-26T09:00:00+01:00"
};
function validLink(value){return value && !value.includes("YOUR-")}
function applyConfig(){document.querySelectorAll('[data-link]').forEach(el=>{const key=el.dataset.link,value=CARE360_CONFIG[key];if(validLink(value)){el.href=value;if(/^https?:/.test(value))el.target='_blank';}else{el.href='#';el.classList.add('is-disabled');el.setAttribute('aria-disabled','true');el.title='Link will be available soon';}});const email=document.getElementById('contact-email');if(email){email.textContent=CARE360_CONFIG.email;email.href='mailto:'+CARE360_CONFIG.email}const phone=document.getElementById('contact-phone');if(phone){phone.textContent=CARE360_CONFIG.phoneDisplay;phone.href='tel:'+CARE360_CONFIG.phoneHref}document.querySelectorAll('#current-year').forEach(el=>el.textContent=new Date().getFullYear())}
function countdown(){const target=new Date(CARE360_CONFIG.launchDate).getTime();function update(){const d=Math.max(0,target-Date.now()),v={days:Math.floor(d/86400000),hours:Math.floor(d%86400000/3600000),minutes:Math.floor(d%3600000/60000),seconds:Math.floor(d%60000/1000)};Object.entries(v).forEach(([k,n])=>{document.querySelectorAll('#'+k+',[data-countdown="'+k+'"]').forEach(el=>el.textContent=String(n).padStart(2,'0'))})}update();setInterval(update,1000)}
function reveals(){const els=document.querySelectorAll('.reveal');if(!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('visible'));return}const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');io.unobserve(x.target)}}),{threshold:.12});els.forEach(e=>io.observe(e))}
function menu(){const b=document.querySelector('.menu-toggle'),n=document.querySelector('.nav-links');if(!b||!n)return;b.onclick=()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)};n.querySelectorAll('a').forEach(a=>a.onclick=()=>{n.classList.remove('open');b.setAttribute('aria-expanded','false')})}
document.addEventListener('DOMContentLoaded',()=>{applyConfig();countdown();reveals();menu()});
