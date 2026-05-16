# Hero Quick-Start

A landing-page hero with **smooth scroll** (Lenis) and an **animated text reveal** (GSAP + SplitType).

## Run

From the repo root:

```bash
npx vite examples/hero-quickstart
```

…or serve it with any static server — the entry is `examples/hero-quickstart/index.html`.

## What's wired up

- **Lenis** — eased, inertial scrolling, synced to GSAP's ticker so `ScrollTrigger` stays accurate.
- **SplitType** — splits the headline into per-word clip masks + per-char spans.
- **GSAP** — staggered char rise, fade-in for supporting copy, and `ScrollTrigger` reveals further down the page.
- **`prefers-reduced-motion`** — bypasses smooth scroll and shows content statically.

## Swap-ins

The same skeleton accepts any of the installed libraries:

| Goal | Library |
| --- | --- |
| Declarative React animation | `framer-motion` |
| Lightweight tweening | `animejs` |
| List/grid reordering | `@formkit/auto-animate` |
| Typewriter effect | `typed.js` |
| Animated number counters | `countup.js` |
| Celebratory confetti burst | `canvas-confetti` |
| Particle backgrounds | `tsparticles` |
| 3D / WebGL hero | `three`, `vanta` |
| Page transitions (MPA) | `@barba/core` |
| Simple scroll reveals | `aos`, `scrollreveal` |
| SVG line drawing | `vivus` |
