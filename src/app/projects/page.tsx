"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import { Rss } from "lucide-react";
import styles from "./projectsPage.module.css";
import { cmsDataStore } from "@/services/cmsDataStore";
import { getProjectThumbnail } from "@/data/projects";

export interface ProjectArticle {
  id: string;
  slug: string;
  category: string;
  tags?: string[];
  techStack?: string[];
  title: string;
  description: string;
  date: string;
  image: string;
}

const PROJECTS_DATA: ProjectArticle[] = [
  {
    id: "henning-larsen",
    slug: "partnering-henning-larsen",
    category: "Company",
    tags: ["Company", "Customer Stories", "Use Cases"],
    techStack: ["Python", "FastAPI", "LangChain", "React"],
    title: "We are partnering with Henning Larsen",
    description: "We are partnering with Henning Larsen Architects to bring the best AI creative tools for architecture.",
    date: "May 29, 2026",
    image: "/images/projects/krea_partner_henning.png",
  },
  {
    id: "moodboard-gallery",
    slug: "moodboard-gallery-krea-2",
    category: "Product",
    tags: ["Product", "Release Notes"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Canvas API"],
    title: "Moodboard Gallery in Krea 2 + Preview of Random and Auto",
    description: "Moodboard Gallery now includes thousands of moodboards in Krea 2, with new Random and Auto moodboard selection.",
    date: "May 28, 2026",
    image: "/images/projects/krea_moodboard_gallery.png",
  },
  {
    id: "krea-2-api",
    slug: "krea-2-api",
    category: "Product",
    tags: ["Product", "Open Source", "Articles"],
    techStack: ["Python", "FastAPI", "Docker", "PyTorch"],
    title: "Krea 2 API",
    description: "Krea 2 is our first foundation image model, trained completely from scratch to give users full control over the look, feel, and style.",
    date: "May 27, 2026",
    image: "/images/projects/krea_api_platform.png",
  },
  {
    id: "krea-2-deep-dive",
    slug: "krea-2-deep-dive",
    category: "Product",
    tags: ["Product", "Articles", "Use Cases"],
    techStack: ["Python", "PyTorch", "CUDA", "vLLM"],
    title: "Krea 2 deep dive: exploration, style references, and moodboards",
    description: "Krea 2 is our first foundation model, built completely from scratch and focused on aesthetics and creative control.",
    date: "May 21, 2026",
    image: "/images/projects/krea_deep_dive_horse.png",
  },
  {
    id: "krea-2-lora-training",
    slug: "krea-2-lora-training",
    category: "Product",
    tags: ["Product", "Use Cases", "Release Notes"],
    techStack: ["Python", "Diffusers", "LoRA", "FastAPI"],
    title: "Krea 2 LoRA training is now available",
    description: "Train custom Krea 2 LoRAs — styles, characters, or objects — and use them in the Image tool. In beta for Max and Business.",
    date: "May 21, 2026",
    image: "/images/projects/krea_lora_training.png",
  },
  {
    id: "mood-boards-krea-2",
    slug: "mood-boards-krea-2",
    category: "Product",
    tags: ["Product", "Articles", "Use Cases"],
    techStack: ["React", "WebGL", "TypeScript", "Node.js"],
    title: "Mood boards in Krea 2",
    description: "Mood boards are one of the new tools in Krea 2 — more than four references, deeper style + concept capture, and presets.",
    date: "May 15, 2026",
    image: "/images/projects/krea_moodboards_frog.png",
  },
  {
    id: "introducing-krea-2",
    slug: "introducing-krea-2",
    category: "Product",
    tags: ["Product", "Release Notes", "Articles"],
    techStack: ["PyTorch", "Python", "FastAPI", "React"],
    title: "Introducing Krea 2",
    description: "Krea 2 is our first foundation image model built completely from scratch, focused on aesthetics, style transfer, and speed.",
    date: "May 12, 2026",
    image: "/images/projects/krea_introducing_collage.png",
  },
  {
    id: "krea-2-large-fidelity",
    slug: "krea-2-large-fidelity",
    category: "Research",
    tags: ["Research", "Articles"],
    techStack: ["Python", "Benchmark", "PyTorch", "CUDA"],
    title: "Krea 2 Large shines in style fidelity",
    description: "Contra Labs found Krea 2 Large within 0.14 points of GPT Image 2 on Style Fidelity in a four-model style-transfer benchmark.",
    date: "May 12, 2026",
    image: "/images/projects/krea_large_fidelity.png",
  },
  {
    id: "seedance-2-on-krea",
    slug: "seedance-2-on-krea",
    category: "Product",
    tags: ["Product", "Release Notes"],
    techStack: ["Motion Diffusion", "Python", "React", "Next.js"],
    title: "Seedance 2.0: now on Krea",
    description: "Seedance 2.0 is available on Krea on all paid plans. Best-in-class motion coherence and cinematic camera control.",
    date: "April 2, 2026",
    image: "/images/projects/krea_seedance_motion.png",
  },
  {
    id: "annotations-krea-edit",
    slug: "annotations-krea-edit",
    category: "Product",
    tags: ["Product", "Release Notes"],
    techStack: ["Canvas", "React", "TypeScript", "Tailwind CSS"],
    title: "Annotations in Krea Edit",
    description: "Interactive canvas annotations and spatial bounding-box prompts for precise localized inpainting and structural edits.",
    date: "March 28, 2026",
    image: "/images/projects/krea_annotations_edit.png",
  },
  {
    id: "krea-node-agent",
    slug: "krea-node-agent",
    category: "Product",
    tags: ["Product", "Open Source", "Research"],
    techStack: ["LangChain", "Python", "FastAPI", "React Flow"],
    title: "Announcing the Krea Node Agent",
    description: "Visual graph execution engine for composing modular diffusion nodes, conditioning masks, and autonomous agents.",
    date: "March 20, 2026",
    image: "/images/projects/krea_node_agent.png",
  },
  {
    id: "powerful-krea-edit",
    slug: "powerful-krea-edit",
    category: "Product",
    tags: ["Product", "Release Notes"],
    techStack: ["React", "TypeScript", "WebGL", "Zustand"],
    title: "A New, More Powerful Krea Edit",
    description: "Expanded layer controls, non-destructive vector adjustments, and sub-second generation response directly on canvas.",
    date: "March 14, 2026",
    image: "/images/projects/krea_powerful_edit.png",
  },
];

const CATEGORIES = [
  "All",
  "Company",
  "Product",
  "Open Source",
  "Research",
  "Release Notes",
  "Articles",
  "Use Cases",
  "Customer Stories",
] as const;

type Category = (typeof CATEGORIES)[number] | string;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [projectArticles, setProjectArticles] = useState<ProjectArticle[]>(PROJECTS_DATA);

  // Sync with live CMS / Sanity data if available
  useEffect(() => {
    async function loadCMSData() {
      try {
        const cmsProjects = await cmsDataStore.getProjects();
        if (cmsProjects && cmsProjects.length > 0) {
          const cmsMapped: ProjectArticle[] = cmsProjects.map((p, idx) => ({
            id: p.slug,
            slug: p.slug,
            category: p.category || "Product",
            tags: p.tags || [],
            techStack: p.tags || [],
            title: p.title,
            description: p.tagline || p.description,
            date: p.date || "2026",
            image: getProjectThumbnail(p.slug, p.image || (p as any).coverImage, idx, (p as any).coverImage),
          }));

          const cmsSlugs = new Set(cmsMapped.map((c) => c.slug));
          const fallbackRemaining = PROJECTS_DATA.filter((p) => !cmsSlugs.has(p.slug));
          setProjectArticles([...cmsMapped, ...fallbackRemaining]);
        }
      } catch (err) {
        // Fallback to static PROJECTS_DATA
      }
    }
    loadCMSData();

    // Listen for live updates from CMS admin
    const handleCMSUpdate = () => {
      loadCMSData();
    };
    window.addEventListener("cms_projects_updated", handleCMSUpdate);
    window.addEventListener("storage", handleCMSUpdate);
    return () => {
      window.removeEventListener("cms_projects_updated", handleCMSUpdate);
      window.removeEventListener("storage", handleCMSUpdate);
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projectArticles;
    return projectArticles.filter(
      (p) =>
        p.category === selectedCategory ||
        p.tags?.includes(selectedCategory) ||
        p.techStack?.includes(selectedCategory)
    );
  }, [selectedCategory, projectArticles]);

  return (
    <div className={styles.pageRoot}>
      {/* 1. Global Navigation Bar */}
      <SkyLabsNavbar activeTab="projects" />

      {/* 2. Main Content Container */}
      <main className={styles.mainContainer}>
        {/* Header Block matching exact reference design */}
        <header className={styles.headerBlock}>
          <div className={styles.titleRow}>
            <h1 className={styles.pageTitle}>Projects</h1>
            <div className={styles.rssWrap} title="RSS Feed" aria-label="RSS Feed">
              <Rss size={16} className={styles.rssIcon} />
            </div>
          </div>

          {/* Clean Text Navigation Tabs directly under title */}
          <nav className={styles.filterNav} aria-label="Categories">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.filterTab} ${isActive ? styles.filterTabActive : ""}`}
                >
                  {cat}
                </button>
              );
            })}
          </nav>
        </header>

        {/* 3. 3-Column Modern Rounded Card Grid matching reference design */}
        <section className={styles.gridSection} aria-label="Projects Showcase">
          {filteredProjects.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>No projects in &ldquo;{selectedCategory}&rdquo;</p>
              <p className={styles.emptyDesc}>Explore recent releases, product foundation models, and company announcements in All.</p>
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={styles.resetBtn}
              >
                View All
              </button>
            </div>
          ) : (
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project, idx) => {
                const stack = project.techStack || project.tags || [];

                return (
                  <motion.article
                    key={project.id}
                    className={styles.card}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(idx * 0.04, 0.3),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className={styles.cardLink}
                      aria-label={`View ${project.title}`}
                    >
                      {/* 4:3 Rounded Banner Image Frame */}
                      <div className={styles.imageFrame}>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                          priority={idx < 6}
                          className={styles.cardImage}
                        />
                      </div>

                      {/* Card Content directly below image */}
                      <div className={styles.cardContent}>
                        {/* Clean Monospace Category alone at the top */}
                        <span className={styles.categoryBadge}>{project.category}</span>

                        {/* Project Title */}
                        <h2 className={styles.cardTitle}>{project.title}</h2>

                        {/* Project Summary Description */}
                        <p className={styles.cardDescription}>{project.description}</p>

                        {/* Card Footer: Tech Stack in proper place followed by Date */}
                        <div className={styles.cardFooter}>
                          {stack.length > 0 && (
                            <div className={styles.techStackRow}>
                              {stack.slice(0, 4).map((tech) => (
                                <span key={tech} className={styles.techBadge}>
                                  {tech}
                                </span>
                              ))}
                              {stack.length > 4 && (
                                <span className={styles.techBadgeMore}>
                                  +{stack.length - 4}
                                </span>
                              )}
                            </div>
                          )}
                          <span className={styles.cardDate}>{project.date}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Global Minimalist Footer */}
      <MainFooter />
    </div>
  );
}
