# iarsingh.github.io

<!-- project-guide:start -->
## Project guide

[Project architecture](PROJECT_ARCHITECTURE.md) · [Interview questions and answers](INTERVIEW_QA.md)

Use the architecture document for the component diagram, implementation boundaries, and verification entry points. The interview guide includes source-backed answers and project walkthroughs.

### Implementation map

| Component | Responsibility |
| --- | --- |
| [`index.html`](index.html) | Implementation or supporting configuration |
| [`script.js`](script.js) | Implementation or supporting configuration |
| [`styles.css`](styles.css) | Implementation or supporting configuration |
| [`README.md`](README.md) | Project explanations or operating notes |

### Local setup and verification

From the repository root (the commands follow the checked-in manifests):

```bash
python3 -m http.server 8000
```

<!-- project-guide:end -->

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
