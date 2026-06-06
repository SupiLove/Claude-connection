/* =========================================================
   Comuno Lab — interactions
   GSAP + ScrollTrigger + Lenis (loaded via CDN in index.html)
   ========================================================= */

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Mobile menu ---------- */
const burger = document.getElementById('burger');
const links  = document.querySelector('.nav__links');
burger.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('is-open'))
);

/* ---------- Sticky nav state ---------- */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive:true });

/* ---------- Respect reduced motion ---------- */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Smooth scroll (Lenis) ---------- */
if (!reduce && window.Lenis) {
  const lenis = new Lenis({ duration:1.1, smoothWheel:true });
  function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // anchor links -> lenis
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target){ e.preventDefault(); lenis.scrollTo(target, { offset:-10 }); }
    });
  });
  if (window.gsap && window.ScrollTrigger) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
}

/* ---------- GSAP reveal animations ---------- */
if (!reduce && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero lines rise in
  gsap.set('.hero__title .line', { yPercent:120 });
  gsap.to('.hero__title .line', {
    yPercent:0, duration:1.1, stagger:.12, ease:'power4.out', delay:.15
  });
  gsap.from('.hero .reveal', {
    opacity:0, y:24, duration:1, stagger:.12, ease:'power3.out', delay:.55,
    onComplete(){ gsap.set('.hero .reveal', { clearProps:'opacity,transform' }); }
  });

  // Generic reveal-on-scroll
  gsap.utils.toArray('.reveal').forEach(el => {
    if (el.closest('.hero')) return; // handled above
    gsap.to(el, {
      opacity:1, y:0, duration:.9, ease:'power3.out',
      scrollTrigger:{ trigger:el, start:'top 88%' }
    });
  });

  // Intro statement: word-by-word fade
  const intro = document.querySelector('.intro__statement');
  if (intro){
    intro.innerHTML = intro.textContent.trim().split(/\s+/)
      .map(w => `<span class="w">${w}&nbsp;</span>`).join('');
    gsap.from(intro.querySelectorAll('.w'), {
      opacity:.12, duration:.6, stagger:.04, ease:'none',
      scrollTrigger:{ trigger:intro, start:'top 80%', end:'bottom 60%', scrub:true }
    });
  }

  // Count-up stats
  gsap.utils.toArray('.stat__num').forEach(el => {
    const end = +el.dataset.count;
    const obj = { v:0 };
    ScrollTrigger.create({
      trigger:el, start:'top 85%', once:true,
      onEnter(){
        gsap.to(obj, { v:end, duration:1.6, ease:'power2.out',
          onUpdate(){ el.textContent = Math.round(obj.v); } });
      }
    });
  });
} else {
  // Reduced motion / no GSAP: just show everything
  document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
  document.querySelectorAll('.stat__num').forEach(el => el.textContent = el.dataset.count);
}
