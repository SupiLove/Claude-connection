# Web Design Toolkit

A professional toolkit for shipping beautiful, motion-rich websites fast.

## Installed animation libraries

```
gsap        lenis       framer-motion   animejs       @formkit/auto-animate
split-type  typed.js    countup.js      canvas-confetti  tsparticles
vanta       three       @barba/core     scrollreveal  aos  vivus
```

Install (already done in this repo):

```bash
npm install --ignore-scripts gsap lenis framer-motion animejs \
  @formkit/auto-animate split-type typed.js \
  countup.js canvas-confetti tsparticles \
  vanta three @barba/core scrollreveal aos vivus
```

> `--ignore-scripts` is required because `@tsparticles/engine`'s postinstall
> script imports `fs-extra` without declaring it as a dependency. The
> packages themselves work fine at runtime.

## Claude Code design skills

These live in `~/.claude/skills/` and load automatically:

- `claude-frontend-skills` — Koomook
- `gsap-skills` — GreenSock
- `interface-design` — Dammyjay93
- `designer-skills` — Owl-Listener
- `claudedesignskills` — freshtechbro
- `ux-designer` — szilu
- `libreUIUX` — HermeticOrmus

> Note: `anthropics/frontend-design` from the original install list returns
> 404 — that repo doesn't exist publicly, so it's omitted.

## Quick-start example

[`examples/hero-quickstart`](./examples/hero-quickstart) — a landing-page
hero with smooth Lenis scrolling and a GSAP + SplitType animated text
reveal. Serve with `npx vite examples/hero-quickstart`.
