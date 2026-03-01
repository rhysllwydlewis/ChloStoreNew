# Chlo — Luxury Cosmetics

A Next.js storefront for Chlo Beauty, a luxury cosmetics brand.

## Tech stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** with a custom `chlo` colour palette
- **Framer Motion** for entrance animations
- **Postmark** for contact-form email delivery

## Project structure

```
app/
  layout.tsx          — root layout, fonts, metadata
  page.tsx            — home page (Hero → Store → About → ContactBand → Footer)
  globals.css         — Tailwind directives + grain overlay + scroll utilities
  api/contact/        — API route powering the contact form
  legal/              — Legal Hub page
  privacy/            — Privacy Policy page
  terms/              — Terms & Conditions page
components/
  Hero.tsx            — Full-bleed video hero with stagger text animations
  Navbar.tsx          — Fixed navbar with scroll-aware backdrop and mobile menu
  Store.tsx           — Filterable product grid
  About.tsx           — Brand story and values cards
  ContactBand.tsx     — Pre-footer CTA strip
  ContactWidget.tsx   — Slide-up contact modal with form validation
  Footer.tsx          — Footer with legal links
public/
  hero-video.mp4      — Hero background video (replace with real footage before deploying)
  brush-texture.webp  — Decorative texture asset
  favicon.svg         — Site favicon
```

## Getting started

```bash
npm install
npm run dev
```

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used in metadata |
| `POSTMARK_SERVER_TOKEN` | Postmark server token for contact emails |
| `CONTACT_TO_EMAIL` | Recipient address for contact form submissions |
| `CONTACT_FROM_EMAIL` | Verified sender address in Postmark |

## Video asset note

`public/hero-video.mp4` is a placeholder in this repository. Replace it with your
production video before deploying. The hero component gracefully falls back to the
cream background if the video fails to load.
