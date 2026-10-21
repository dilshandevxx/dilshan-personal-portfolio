<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# DILSHAN.DEV — EDITORIAL PERSONAL WEBSITE & PORTFOLIO KNOWLEDGE BASE

## 1. Project Philosophy & Architecture
- **Editorial & Book Aesthetic**: A minimal, thoughtful digital book landing page (`/`) combined with a persistent sidebar software engineering portfolio (`/portfolio`).
- **Inspiration**: Brittany Chiang, Tania Rascia (information hierarchy, content density, persistent sidebar, technical writing, and personal craft).
- **Core Stance**: Understated elegance, generous whitespace, matte charcoal surfaces (never pure pitch black #000000), warm paper/ivory light theme (never stark white #ffffff). Zero generic AI aesthetics (no neon glows, no 3D tilt cards, no cursor ball trails).
- **Truth in Content**: Never fabricate achievements, employment, or metrics. All content is typed and centralized in `src/data/content.ts` with clear markers for easy user replacement.

## 2. Coordinated Theme & Accent System
- **Four Coordinated Base Themes** via `data-theme`:
  1. `dark-moss`: Matte charcoal surfaces (`#151816`), warm off-white text (`#f2eee8`), muted sage accents.
  2. `paper`: Warm ivory background (`#fbf8f3`), crisp cream surfaces (`#ffffff`), dark charcoal text (`#24211e`).
  3. `sage`: Muted green-grey surfaces (`#edf2ee`), forest-green typography (`#19271e`).
  4. `sandstone`: Warm beige surfaces (`#f5efe6`), dark brown typography (`#2d231b`).
- **Six Accessible Accents** via `data-accent`:
  1. `sage`: Natural flora muted green (`#8bb397` dark / `#3b6048` light)
  2. `blue`: Restrained slate harbor blue (`#7fa6cb` dark / `#2b5980` light)
  3. `terracotta`: Warm baked clay/terracotta (`#dc8167` dark / `#9d4c33` light)
  4. `lavender`: Subtle heather lilac (`#b297c8` dark / `#6a4f7e` light)
  5. `burgundy`: Restrained wine/rose (`#cd6f84` dark / `#843245` light)
  6. `graphite`: Understated cool slate (`#a6adb7` dark / `#444a52` light)
- **Zero-Flash Persistence**:
  - Saved in `localStorage` under `editorial-theme` and `editorial-accent`.
  - Inline head script in `src/app/layout.tsx` applies tokens synchronously before initial DOM paint.
  - Managed by `src/context/ThemeContext.tsx` and interactive `src/components/ThemePicker.tsx`.

## 3. Route Hierarchy
- `/`: Book-inspired landing page with monogram, title, bio, reading desk teaser, social links, and "Explore My Portfolio" CTA.
- `/portfolio`: Persistent left sidebar layout on desktop + accessible drawer on mobile. Contains all main sections with smooth anchor linking:
  - `#overview`: Folio summary, executive narrative, research focus.
  - `#projects`: Interactive category filters, architecture highlights, challenges, and outcomes.
  - `#blog`: Technical essays with reading time, dates, tags, and link to reader view.
  - `#about`: Biography, timeline, values, academic distinction.
  - `#skills`: Un-inflated categorical skill domains (no fake percentage bars).
  - `#life`: Curated reading desk with statuses, music, specialty coffee, and nature habits.
  - `#resume`: Clean curriculum vitae with native browser print/save PDF trigger.
  - `#contact`: Direct messaging, copyable email, and verified social profiles.
- Direct Deep-Link Routes (share `/portfolio/layout.tsx`):
  - `/portfolio/projects`
  - `/portfolio/blog`
  - `/portfolio/blog/[slug]` (Async params reader view)
  - `/portfolio/about`
  - `/portfolio/skills`
  - `/portfolio/life`
  - `/portfolio/resume`
  - `/portfolio/contact`

## 4. Editing User Content
All personal information, projects, essays, skills, and links reside in:
`src/data/content.ts` (strongly typed by `src/types/content.ts`).
Whenever the user wants to update their bio, add new projects, or publish new essays, modify `src/data/content.ts`.

