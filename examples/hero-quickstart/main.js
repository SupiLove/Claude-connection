import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// 1. Smooth scrolling with Lenis, synced to GSAP's ticker so ScrollTrigger
//    stays in lockstep with the eased scroll position.
if (!prefersReducedMotion) {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// 2. Animated text reveal: split the headline into chars, then slide each
//    char up from below its own clip-mask (the .word wrapper has overflow:hidden).
const split = new SplitType(".headline", { types: "words,chars" });

const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

tl.to(split.chars, {
  yPercent: 0,
  duration: 1.1,
  stagger: 0.025,
})
  .to(
    "[data-reveal]",
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.15,
    },
    "-=0.7",
  );

// Per-element delays declared in HTML (data-delay="0.6") just shift the
// stagger; honor them by offsetting via a from-vars timeline tween.
document.querySelectorAll("[data-delay]").forEach((el) => {
  const d = parseFloat(el.dataset.delay) || 0;
  gsap.fromTo(
    el,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.9, delay: d, ease: "power3.out" },
  );
});

// 3. Scroll-triggered reveal for the second section.
gsap.utils.toArray("#next [data-reveal]").forEach((el) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 80%" },
    },
  );
});
