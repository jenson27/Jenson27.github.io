# Jenson's Personal Portfolio

This portfolio uses React, Vite, Tailwind CSS, and DaisyUI. The build creates static HTML pages for the site's routes so it can deploy to GitHub Pages.

## Getting started

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Build and preview the site:

```sh
npm run build
npm run preview
```

## Content

Add or edit Markdown files in `src/content/blog`, `src/content/project`, `src/content/certificate`, or `src/content/store`. Each file uses frontmatter for its title, description, dates, images, tags, and other entry details.

The build renders the Markdown and generates listing, detail, tag, and pagination pages. It also creates the RSS feed and sitemap files.

## Source structure

- `src/app/` contains the app router and browser navigation.
- `src/pages/` contains route-level page components.
- `src/components/` contains shared layouts and reusable UI.
- `src/lib/routes.js` contains route matching and page metadata.
- `src/content/` contains Markdown content.
- `src/styles/global.css` contains Tailwind directives and shared styles.
- `scripts/prepare-content.mjs` prepares Markdown for rendering.
- `scripts/build.mjs` builds the static pages and metadata.
- `public/` contains images and other static assets.

GitHub Pages deploys the generated `dist/` directory through `.github/workflows/deploy.yml`.
