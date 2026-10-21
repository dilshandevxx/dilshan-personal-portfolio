# Dilshan K. — Editorial Personal Website & Portfolio

An editorial-style personal website combining a digital-book landing page with a software engineering portfolio, inspired by Brittany Chiang and Tania Rascia. Built with Next.js App Router, TypeScript, and CSS Custom Properties.

---

## Architecture Overview

1. **Digital-Book Landing Page (`/`)**:
   - Editorial frontispiece design with monogram stamp, elegant typography, biographical overview, selected focus areas, and colophon.
   - Distinct "Explore My Portfolio" call to action linking to `/portfolio`.
2. **Persistent Sidebar Portfolio (`/portfolio`)**:
   - Fixed/sticky left navigation on desktop; accessible drawer navigation on mobile.
   - Comprehensive sections: **Overview**, **Projects**, **Writing / Blog**, **About Me**, **Skills**, **Life & Library**, **Curriculum Vitae**, and **Contact**.
3. **Dedicated Sub-Routes**:
   - Direct link support for `/portfolio/projects`, `/portfolio/blog`, `/portfolio/blog/[slug]`, `/portfolio/about`, `/portfolio/skills`, `/portfolio/life`, `/portfolio/resume`, and `/portfolio/contact`.

---

## Theming & Visual System

### 4 Coordinated Base Themes (`data-theme`)
- **Dark Moss**: Soft matte charcoal surfaces (`#151816`), warm off-white typography (`#f2eee8`), muted flora green accents.
- **Paper**: Warm ivory background (`#fbf8f3`), pure cream cards, dark charcoal text (`#24211e`).
- **Sage**: Muted green-grey surfaces (`#edf2ee`), forest-green text (`#19271e`).
- **Sandstone**: Warm beige surfaces (`#f5efe6`), roasted brown typography (`#2d231b`).

### 6 Accessible Accents (`data-accent`)
- **Sage Green** (`sage`)
- **Muted Blue** (`blue`)
- **Terracotta** (`terracotta`)
- **Lavender** (`lavender`)
- **Burgundy** (`burgundy`)
- **Graphite** (`graphite`)

All preferences are persisted in `localStorage` and restored synchronously via an inline head script in `src/app/layout.tsx` to eliminate theme flashing (FOUT).

---

## Centralized Content Editing

All portfolio content is structured and strongly typed in:
```bash
src/data/content.ts
src/types/content.ts
```

To update personal data, modify `siteConfig` in `src/data/content.ts`:
- **Identity & Bio**: `name`, `wordmark`, `edition`, `title`, `tagline`, `shortBio`, `extendedBio`.
- **Projects**: Title, description, architecture notes, challenges, outcomes, stack, and repositories.
- **Blog Essays**: Title, subtitle, read time, publication date, tags, and content.
- **Skills**: Real categories without fabricated percentage bars.
- **Reading Desk**: Books, reading status, and analog hobbies.
- **Experience & Education**: Timeline entries and verified credentials.

---

## Scripts & Development

```bash
# Run local development server
npm run dev

# Build optimized production bundle
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```
