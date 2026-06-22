# Comuno Lab — agency website

A polished, white-&-gold one-page site for **Comuno Lab** — marketing,
communication & change agency. Built as a standalone prototype (no build step)
so it previews instantly and can be ported into WordPress.

## Preview locally

```bash
# from the repo root
npx vite comuno-lab
#  or any static server, e.g.
python3 -m http.server -d comuno-lab 8080
```

Then open the printed URL. Libraries (GSAP, ScrollTrigger, Lenis) load from a
CDN, so an internet connection is needed for the animations.

## Structure

| File         | What it holds                                              |
|--------------|------------------------------------------------------------|
| `index.html` | All page content & sections (hero, services, about, etc.)  |
| `style.css`  | Brand system — colours, type, layout, responsive           |
| `main.js`    | Scroll reveals, smooth scroll, count-up stats, mobile menu |

## Brand tokens (edit in `style.css` `:root`)

- Gold `#C2A04C` / deep gold `#A6863A` / light `#E4D29B`
- Warm off-white paper `#FBF9F4`, warm ink `#1C1A16`
- Display font: **Cormorant Garamond** · Body: **Inter**

## To-do content (placeholders to replace)

- **Founder photo** — `.about__portrait` in `index.html`
- **Logo** — currently an SVG monogram in the nav; swap for a final mark
- **Email** — `supi@commtribe.com` (replace if you set up a Comuno Lab address)
- Optional: German-language version of the page

## Easiest: one file, any host (no WordPress)

`comuno-lab-website.html` is the **entire site in a single file** — styles,
scripts and photos are all embedded. To put it online:

- **Your own hosting:** rename it to `index.html` and upload it to your web
  space (via the host's File Manager or FTP) into the public folder
  (`public_html` / `www` / `htdocs`). Done.
- **Instant & free — Netlify Drop:** go to **app.netlify.com/drop** and drag
  the file onto the page. It's live on a URL in seconds (you can point your
  own domain at it later).
- **Cloudflare Pages / GitHub Pages** also work the same way.

Rebuild it after editing the source with: `node build.mjs`

The contact form opens a pre-filled email to `info@comunolab.co` — works on any
static host with no backend. (Upgrade path: point the `<form>` at a service like
Formspree for a proper inbox.)

## Porting into WordPress

Three clean routes, easiest first:

1. **Block theme + Custom HTML blocks.** Copy each `<section>` into a
   *Custom HTML* block on a new page; move the CSS into
   *Appearance → Customise → Additional CSS*. Good for a quick lift.
2. **Page builder (Elementor / Divi / Bricks).** Use this design as the visual
   spec and rebuild sections natively — best for ongoing editing by you.
3. **Custom block / child theme.** Drop these files into a child theme template
   for a pixel-perfect match. Most faithful, needs theme access.

Tell me which WordPress theme/builder you're using and I'll prepare the exact
copy-paste blocks or a child-theme template for that setup.
