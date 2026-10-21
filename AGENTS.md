<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design Guidelines
- **Always keep a professional, minimal matte design**:
  - Soft, non-glossy matte surfaces (flat borders, muted dark charcoal and warm beige palettes).
  - **No huge or excessive emojis**: Strictly avoid emojis in headings, titles, cards, and navigation. Emojis look informal and cluttered. Use subtle, monochrome line icons or pure typography.
  - Strictly avoid flashy neon gradients, heavy gloss, or gimmicky animations.
  - Do not add simulated CLI terminals or faux-console widgets.
  - Prioritize clean typography, whitespace, and authentic content-first developer aesthetics.

## Page Isolation & Separation Rules
- **Strict Separation of Cover Page and Portfolio**: The **Cover Page** (`/` -> `src/app/page.tsx`) and the **Portfolio Pages** (`/projects`, `/blog`, `/shelves`, `/about`, `/notes/*`) are strictly independent, separate parts of the site.
- **When modifying the Cover Page**: NEVER touch, alter, or remove the portfolio pages, their 2-column layout, `<Sidebar />`, floating ambient controls, or portfolio styles. All cover page work must be confined strictly to `src/app/page.tsx` and cover-specific styles.
- **When modifying Portfolio Pages**: NEVER alter the cover page layout or its editorial components.
- **AppShell Architecture**: `src/components/AppShell.tsx` preserves this boundary by rendering `<main className="landing-page-wrapper">{children}</main>` on `/` and `<div className="app-shell"><Sidebar /><main className="app-main">...` on all portfolio routes.
