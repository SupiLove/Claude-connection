// Build script for Comuno Lab.
// Produces two ready-to-ship files from the editable source
// (index.html + style.css + main.js + assets/):
//   1. comuno-lab-website.html        — ONE self-contained file to upload to any host
//   2. wordpress-custom-html-block.html — paste-into-a-Custom-HTML-block version
import { readFileSync, writeFileSync } from 'node:fs';

const css  = readFileSync('style.css', 'utf8');
const js   = readFileSync('main.js', 'utf8');
let html    = readFileSync('index.html', 'utf8');

// --- inline photos as data URIs ---
const dataURI = f => 'data:image/jpeg;base64,' + readFileSync('assets/' + f).toString('base64');
const imgMap = {
  './assets/suparni-portrait.jpeg': dataURI('suparni-portrait.jpeg'),
  './assets/suparni-reading.jpeg':  dataURI('suparni-reading.jpeg'),
  './assets/suparni-phone.jpeg':    dataURI('suparni-phone.jpeg'),
};
const inlineImgs = s => Object.entries(imgMap).reduce((a, [k, v]) => a.split(k).join(v), s);

// favicon as inline data URI
const favSvg = readFileSync('logo/comuno-lab-mark.svg', 'utf8');
const favURI = 'data:image/svg+xml,' + encodeURIComponent(favSvg);

/* ---------- 1) Single self-contained website file ---------- */
let standalone = inlineImgs(html)
  .replace('<link rel="icon" type="image/svg+xml" href="./logo/comuno-lab-mark.svg" />',
           `<link rel="icon" type="image/svg+xml" href="${favURI}" />`)
  .replace('<link rel="stylesheet" href="./style.css" />', `<style>\n${css}\n</style>`)
  .replace('<script src="./main.js"></script>', `<script>\n${js}\n</script>`);
writeFileSync('comuno-lab-website.html', standalone);

/* ---------- 2) WordPress Custom HTML block ---------- */
const headerStart = html.indexOf('<header class="nav"');
const footerEnd   = html.indexOf('</footer>') + '</footer>'.length;
const bodyInner   = inlineImgs(html.slice(headerStart, footerEnd));
const wp = `<!-- ===== COMUNO LAB — paste this whole block into ONE "Custom HTML" block ===== -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
${css}
</style>
<div class="comuno-lab">
${bodyInner}
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
<script>
${js}
</script>
`;
writeFileSync('wordpress-custom-html-block.html', wp);

console.log('Built:');
console.log('  comuno-lab-website.html        ', Math.round(standalone.length/1024)+' KB');
console.log('  wordpress-custom-html-block.html', Math.round(wp.length/1024)+' KB');
