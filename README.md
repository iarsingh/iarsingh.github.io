# iarsingh.github.io

Personal portfolio of Akhilesh Ranjan Singh — Cloud & Platform Engineer moving toward Forward Deployed and AI Platform Engineering.

Live: https://iarsingh.github.io/

## Structure

Static site, no build step. GitHub Pages serves `master` from the repository root.

- `index.html` — all content and metadata (Open Graph, Twitter card, Person JSON-LD)
- `styles.css` — light/dark theme via CSS custom properties, responsive breakpoints at 1100/1024/860/768/480px
- `script.js` — theme toggle, mobile menu, scroll-spy, reveal-on-scroll, contact form validation
- `img/` — WebP portraits with JPEG fallbacks
- `resume/` — downloadable resume PDF
- `og-card.jpg` — 1200×630 social preview
- `robots.txt`, `sitemap.xml`

## Local preview

```bash
python3 -m http.server 8000
```

Bump the `?v=` query on `styles.css` and `script.js` in `index.html` after changing them so Pages visitors don't get cached copies.
