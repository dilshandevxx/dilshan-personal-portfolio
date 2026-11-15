# Dilshan K. — Editorial Personal Website & Portfolio

An editorial-style personal website combining a digital-book landing page with a software engineering portfolio. Built with Next.js App Router, TypeScript, and CSS Custom Properties.

---

## Architecture Overview

1. **Digital-Book Landing Page (`/`)** — editorial frontispiece, biography, focus areas, and portfolio entry point.
2. **Portfolio (`/portfolio`)** — overview, projects, writing, about, skills, life/library, resume, and contact.
3. **Projects (`/projects`)** — existing repositories and a separately labelled engineering roadmap.
4. **Project details (`/projects/[slug]`)** — overview, architecture, technical scope, risks, and GitHub documentation link.

## Project portfolio and roadmap

The project catalogue deliberately separates existing work from future proposals:

- **Existing repository** — a repository and supporting README/source are present; completion and claims still require review.
- **Planned** — a documentation-only proposal. It is not represented as implemented or production-tested.

The 25 future project proposals include problem statements, candidate architecture and technology choices, functional scope, non-functional concerns, risks, validation strategy, milestones, and definition of done.

**[Explore the 25-project engineering roadmap](./project-proposals/README.md)**

Proposal READMEs live under `project-proposals/<project-slug>/README.md`. They currently live in this central portfolio repository; they are not separate GitHub repositories. To publish each proposal as its own public repository, clone this repository, authenticate with GitHub CLI (`gh auth login`), and run `bash scripts/publish-proposals-as-repos.sh`. The script skips repositories that already exist.

## Theming & Visual System

### 4 Coordinated Base Themes (`data-theme`)
- **Dark Moss** — matte charcoal surfaces and warm off-white typography.
- **Paper** — warm ivory background and dark charcoal text.
- **Sage** — muted green-grey surfaces and forest-green text.
- **Sandstone** — warm beige surfaces and roasted brown typography.

### 6 Accessible Accents (`data-accent`)
Sage Green, Muted Blue, Terracotta, Lavender, Burgundy, and Graphite.

## Centralized Project Data

The Projects page is driven by:

```text
src/data/projects.ts
src/components/ProjectCard.tsx
src/app/projects/page.tsx
src/app/projects/[slug]/page.tsx
project-proposals/
```

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

---

## Portfolio integrity

Do not publish invented metrics, unverified deployment claims, or planned systems as completed work. Add evidence for implementation status, tests, deployment, performance, security, and reliability before promoting a project to completed status.