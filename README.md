# Portfolio

Astro project for Jordan England Nelson's portfolio.

The current live baseline is generated from the Webflow export in
`portfolio-site-1c56f5.webflow`. The `public/` directory is generated and ignored
so the repository does not store two copies of the exported assets.

## Local Development

```bash
npm install
npm run dev
```

The dev script prepares the Webflow export into `public/`, then starts Astro.

Useful commands:

```bash
npm run prepare:webflow
npm run build
npm run preview
npm run clean
```

## GitHub Pages

This repository deploys with `.github/workflows/deploy.yml`.

In GitHub, open the repository settings, go to **Pages**, and set the source to
**GitHub Actions**. Push to `main` to deploy.

This project is configured for the custom domain `jordanenglandnelson.com`.
The build writes a `CNAME` file into the GitHub Pages artifact and sets:

- `ASTRO_SITE`: `https://jordanenglandnelson.com`
- `ASTRO_BASE`: `/`

## Migration Strategy

The Webflow export is the short-term deployable baseline. As the site changes,
migrate one route at a time into Astro components, layouts, and MDX content under
`src/`.

## Typography

New Astro pages should use the shared typography components in
`src/components/typography/` instead of styling raw heading and paragraph tags.
The system keeps Josefin Sans for expressive headings and Montserrat for readable
body/UI copy.

Available components:

- `Display`
- `PageTitle`
- `SectionHeading`
- `CardTitle`
- `Body`
- `Caption`
- `Eyebrow`

Each component accepts an optional `as` prop when the semantic element needs to
differ from the visual style, plus `tone="muted" | "subtle" | "inverse"` for
common color treatments.
