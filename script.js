const root=document.documentElement;
const nav=document.getElementById("nav");
const topBtn=document.getElementById("topBtn");
const cursor=document.querySelector(".cursor-glow");
const menuBtn=document.getElementById("menuBtn");
const mobileNav=document.getElementById("mobileNav");
const themeToggle=document.getElementById("themeToggle");
const toast=document.getElementById("toast");

const savedTheme=localStorage.getItem("diva-theme");
if(savedTheme==="dark"){
  root.classList.add("dark");
  document.body.classList.add("dark");
}

themeToggle.addEventListener("click",()=>{
  root.classList.toggle("dark");
  document.body.classList.toggle("dark");
  localStorage.setItem("diva-theme",document.body.classList.contains("dark")?"dark":"light");
});

/* Optional dark mode: keeps the same layout but makes it deeper and moodier. */
const darkStyle=document.createElement("style");
darkStyle.textContent=`
body.dark{background:#17111c;color:#f7eff9}
body.dark .nav.scrolled{background:rgba(23,17,28,.78)}
body.dark .hero,body.dark .about,body.dark .projects,body.dark .contact,body.dark footer{background:#17111c}
body.dark .focus-section,body.dark .journey{background:#21172a}
body.dark .hero-intro,body.dark .about-text p,body.dark .focus-head p,body.dark .projects-head p,body.dark .journey-item p,body.dark .contact-inner>p{color:#b9a9bf}
body.dark .about-facts div,body.dark .journey-item:not(:last-child):after{border-color:rgba(255,255,255,.12);background:rgba(255,255,255,.12)}
body.dark .focus-card{background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.1)}
body.dark .focus-card:hover{background:#2b2033}
body.dark .project-card{box-shadow:none}
body.dark .project-pink{background:#46313b}.dark .project-lilac{background:#382f4d}.dark .project-blue{background:#293d4d}.dark .project-green{background:#304032}
body.dark .currently{background:#0e0912}
body.dark .mobile-nav{background:rgba(35,25,42,.97);color:#fff}
body.dark .theme-btn,body.dark .top-btn{background:#2b2033;color:#fff;border-color:rgba(255,255,255,.12)}
`;
document.head.appendChild(darkStyle);

window.addEventListener("scroll",()=>{
  nav.classList.toggle("scrolled",window.scrollY>25);
  topBtn.classList.toggle("show",window.scrollY>550);
},{passive:true});

topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

menuBtn.addEventListener("click",()=>{
  mobileNav.classList.toggle("open");
  menuBtn.classList.toggle("open");
});
mobileNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobileNav.classList.remove("open")));

if(window.matchMedia("(pointer:fine)").matches){
  window.addEventListener("mousemove",e=>{
    cursor.style.left=e.clientX+"px";
    cursor.style.top=e.clientY+"px";
  });
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelectorAll(".project-link").forEach(link=>{
  link.addEventListener("click",e=>{
    if(link.getAttribute("href")==="#"){
      e.preventDefault();
      toast.textContent=`Link project "${link.dataset.project}" belum diisi — nanti tinggal masukkan URL GitHub/Figma.`;
      toast.classList.add("show");
      clearTimeout(window.toastTimer);
      window.toastTimer=setTimeout(()=>toast.classList.remove("show"),3200);
    }
  });
});


document.querySelectorAll(".certificate-link").forEach(link=>{
  link.addEventListener("click",e=>{
    if(link.getAttribute("href")==="#"){
      e.preventDefault();
      toast.textContent="Link sertifikat belum diisi — nanti tinggal masukkan URL sertifikat atau Google Drive.";
      toast.classList.add("show");
      clearTimeout(window.toastTimer);
      window.toastTimer=setTimeout(()=>toast.classList.remove("show"),3200);
    }
  });
});

document.getElementById("year").textContent=new Date().getFullYear();
