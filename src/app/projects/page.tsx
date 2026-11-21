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
  const [cardConfig, setCardConfig] = useState({
    titleLines: 2,
    descriptionLines: 2,
    techStackLines: 2,
    showCategory: true,
    showDate: true,
  });

  // Sync with live CMS / Sanity data if available
  useEffect(() => {
    async function loadCMSData() {
      try {
        const [cmsProjects, settings] = await Promise.all([
          cmsDataStore.getProjects(),
          cmsDataStore.getGlobalSettings(),
        ]);

        if (settings?.projectCardConfig) {
          setCardConfig(settings.projectCardConfig);
        }

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
    window.addEventListener("cms_card_config_updated", handleCMSUpdate);
    window.addEventListener("cms_settings_updated", handleCMSUpdate);
    window.addEventListener("storage", handleCMSUpdate);
    return () => {
      window.removeEventListener("cms_projects_updated", handleCMSUpdate);
      window.removeEventListener("cms_card_config_updated", handleCMSUpdate);
      window.removeEventListener("cms_settings_updated", handleCMSUpdate);
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
                        {/* 1. Category badge (if enabled) */}
                        {cardConfig.showCategory && (
                          <div className={styles.categoryLine}>
                            <span className={styles.categoryBadge}>{project.category}</span>
                          </div>
                        )}

                        {/* 2. Main Title (Dynamically clamped to titleLines) */}
                        <h2
                          className={styles.cardTitle}
                          style={{
                            WebkitLineClamp: cardConfig.titleLines,
                            height: `calc(1.35em * ${cardConfig.titleLines})`,
                            minHeight: `calc(1.35em * ${cardConfig.titleLines})`,
                            maxHeight: `calc(1.35em * ${cardConfig.titleLines})`,
                          }}
                        >
                          {project.title}
                        </h2>

                        {/* 3. Small Description (Dynamically clamped to descriptionLines) */}
                        <p
                          className={styles.cardDescription}
                          style={{
                            WebkitLineClamp: cardConfig.descriptionLines,
                            height: `calc(1.45em * ${cardConfig.descriptionLines})`,
                            minHeight: `calc(1.45em * ${cardConfig.descriptionLines})`,
                            maxHeight: `calc(1.45em * ${cardConfig.descriptionLines})`,
                          }}
                        >
                          {project.description}
                        </p>

                        {/* 4. Tech Stack (Dynamically budgeted to techStackLines rows) */}
                        <div
                          className={styles.techStackSlot}
                          style={{
                            height: `${cardConfig.techStackLines * 24}px`,
                            minHeight: `${cardConfig.techStackLines * 24}px`,
                            maxHeight: `${cardConfig.techStackLines * 24}px`,
                          }}
                        >
                          {stack.slice(0, 6).map((tech) => (
                            <span key={tech} className={styles.techBadge}>
                              {tech}
                            </span>
                          ))}
                          {stack.length > 6 && (
                            <span className={styles.techBadgeMore}>
                              +{stack.length - 6}
                            </span>
                          )}
                        </div>

                        {/* 5. Date Row (if enabled) */}
                        {cardConfig.showDate && (
                          <div className={styles.dateRow}>
                            <span className={styles.cardDate}>{project.date}</span>
                          </div>
                        )}
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
