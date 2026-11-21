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
import { ProjectArticle, PROJECTS_DATA } from "@/data/projectsData";

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
                        {/* 1. First line: Category badge (Product, Research, Company, etc.) */}
                        <div className={styles.categoryLine}>
                          <span className={styles.categoryBadge}>{project.category}</span>
                        </div>

                        {/* 2. Next 2 lines: Main Title */}
                        <h2 className={styles.cardTitle}>{project.title}</h2>

                        {/* 3. Next 2 lines: Small Description / Intro detail */}
                        <p className={styles.cardDescription}>{project.description}</p>

                        {/* 4. Next 2 lines: Tech Stack */}
                        <div className={styles.techStackSlot}>
                          {stack.slice(0, 5).map((tech) => (
                            <span key={tech} className={styles.techBadge}>
                              {tech}
                            </span>
                          ))}
                          {stack.length > 5 && (
                            <span className={styles.techBadgeMore}>
                              +{stack.length - 5}
                            </span>
                          )}
                        </div>

                        {/* 5. Final line: Date */}
                        <div className={styles.dateRow}>
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
