"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  projectsList as defaultProjects,
  Project,
  getProjectThumbnail,
} from "@/data/projects";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import { Rss, Search, X } from "lucide-react";
import styles from "./projectsPage.module.css";

const FILTER_CATEGORIES = [
  "All",
  "AI & ML",
  "DevOps & Cloud",
  "Distributed Systems",
  "MLOps & K8s",
  "Full-Stack",
  "Open Source",
] as const;

type FilterCategory = (typeof FILTER_CATEGORIES)[number];

function matchesCategory(project: Project, cat: FilterCategory): boolean {
  if (cat === "All") return true;
  const pCat = project.category?.toLowerCase() || "";
  const pTags = project.tags?.map((t) => t.toLowerCase()) || [];

  switch (cat) {
    case "AI & ML":
      return (
        pCat.includes("ai") ||
        pCat.includes("ml") ||
        pTags.some((t) => t.includes("ai") || t.includes("rag") || t.includes("llm"))
      );
    case "DevOps & Cloud":
      return (
        pCat.includes("devops") ||
        pCat.includes("cloud") ||
        pCat.includes("platform") ||
        pCat.includes("sre") ||
        pTags.some((t) => t.includes("kubernetes") || t.includes("terraform") || t.includes("docker"))
      );
    case "Distributed Systems":
      return (
        pCat.includes("distributed") ||
        pCat.includes("systems") ||
        pTags.some((t) => t.includes("kafka") || t.includes("grpc") || t.includes("go"))
      );
    case "MLOps & K8s":
      return (
        pCat.includes("mlops") ||
        pTags.some((t) => t.includes("mlops") || t.includes("kubernetes") || t.includes("inference"))
      );
    case "Full-Stack":
      return (
        pCat.includes("full-stack") ||
        pCat.includes("landing") ||
        pTags.some((t) => t.includes("react") || t.includes("next.js"))
      );
    case "Open Source":
      return (
        project.status === "Existing" ||
        Boolean(project.githubUrl) ||
        Boolean(typeof project.stars === "number" && project.stars > 0)
      );
    default:
      return true;
  }
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);

  // Sync any custom additions/edits saved via Admin in production
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dilshan_custom_projects");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
        }
      }
    } catch {}
  }, []);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return projects.filter((project) => {
      const matchesCat = matchesCategory(project, activeCategory);
      const matchesSearch =
        q === "" ||
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        (project.tags && project.tags.some((t) => t.toLowerCase().includes(q)));
      return matchesCat && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <div className={styles.pageRoot}>
      {/* 1. Global Navigation Bar */}
      <SkyLabsNavbar activeTab="projects" />

      {/* 2. Main Projects Content Container */}
      <main className={styles.mainContainer}>
        {/* Header Block matching Reference Design */}
        <header className={styles.headerBlock}>
          <div className={styles.titleRow}>
            <h1 className={styles.pageTitle}>Projects</h1>
            <div className={styles.headerActions}>
              <button
                type="button"
                onClick={() => setShowSearch(!showSearch)}
                className={`${styles.iconBtn} ${showSearch ? styles.iconBtnActive : ""}`}
                aria-label="Toggle search input"
                title="Search projects"
              >
                <Search size={16} />
              </button>
              <div className={styles.rssWrap} title="Project Feed">
                <Rss size={16} className={styles.rssIcon} />
              </div>
            </div>
          </div>

          {/* Collapsible Search Input */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                className={styles.searchBarWrap}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.searchInputGroup}>
                  <Search size={14} className={styles.searchFieldIcon} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search systems by keyword, model, or technology..."
                    className={styles.searchInput}
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className={styles.clearSearchBtn}
                      aria-label="Clear search"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Filter Tabs (Horizontal list matching exact reference design) */}
          <nav className={styles.filterNav} aria-label="Project Categories">
            {FILTER_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
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
              <p className={styles.emptyTitle}>No matching projects found</p>
              <p className={styles.emptyDesc}>Try resetting your search query or selecting &quot;All&quot;.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className={styles.resetBtn}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project, idx) => {
                const thumbnail =
                  idx === 0
                    ? "/images/projects/blog-thumb.avif"
                    : getProjectThumbnail(project.slug, project.image, idx);

                return (
                  <motion.article
                    key={project.slug}
                    className={styles.card}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(idx * 0.05, 0.35),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className={styles.cardLink}
                      aria-label={`View ${project.title}`}
                    >
                      {/* 16:10 Rounded Banner Image Canvas */}
                      <div className={styles.imageFrame}>
                        <Image
                          src={thumbnail}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                          priority={idx < 6}
                          className={styles.cardImage}
                        />
                      </div>

                      {/* Card Content directly below image */}
                      <div className={styles.cardContent}>
                        <span className={styles.categoryBadge}>
                          {project.category || "AI/ML & SYSTEMS"}
                        </span>
                        <h2 className={styles.cardTitle}>{project.title}</h2>
                        <p className={styles.cardDescription}>
                          {project.description || project.tagline}
                        </p>
                        <span className={styles.cardDate}>
                          {project.date || "Active Production"}
                        </span>
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
