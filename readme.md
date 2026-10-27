# Wildform — Wilderness Training

A responsive, single-page wilderness-training website concept built with semantic HTML, custom CSS, and GSAP ScrollTrigger. The site uses native browser scrolling and keeps animations as progressive enhancement.

## Run locally

There is no build step or package installation required. From the repository root, start a static server:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser. You can also open `index.html` directly, though some browser features work best over a local server.

## What’s included

- Responsive hero, navigation, program cards, field guide, story previews, FAQ, contact form, and footer.
- GSAP ScrollTrigger hero/parallax motion, section reveals, and a scroll progress indicator.
- Mobile navigation, native FAQ accordions, keyboard-accessible story preview dialog, and reduced-motion support.
- Lazy-loaded imagery for below-the-fold sections; images are served from Unsplash and GSAP is loaded from Cloudflare CDN.

## Project files

```text
index.html           Page content and third-party script includes
assets/css/style.css Responsive layout, components, and motion-safe styles
assets/js/app.js     Menu, story-preview, form-demo, and GSAP interactions
assets/img/          Local decorative artwork
```

## Before publishing

This repository is a front-end demo. The contact form intentionally does not send messages; connect it to a real email/CRM endpoint. The story cards open local preview dialogs and do not play video until a video source is supplied. Replace or verify demo brand, course dates, locations, prerequisites, gear lists, safety details, contact information, and all image licenses/attributions before launch.

## Accessibility and motion

The page includes a skip link, labeled navigation and form controls, semantic sections, native `<details>` FAQ controls, and a native `<dialog>` preview. Scroll-triggered movement is disabled for users who request reduced motion. Content remains visible without GSAP, so the page still works if the animation CDN is unavailable.
