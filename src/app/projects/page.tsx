"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import { ProjectCard } from "@/components/ProjectCard";
import { Rss } from "lucide-react";
import styles from "./projectsPage.module.css";
import { cmsDataStore, ProjectCardLayoutConfig } from "@/services/cmsDataStore";
import { getProjectThumbnail } from "@/data/projects";
import { ProjectArticle, PROJECTS_DATA, convertArticleToProject } from "@/data/projectsData";

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
  const [cardConfig, setCardConfig] = useState<Partial<ProjectCardLayoutConfig>>({
    titleLines: 2,
    descriptionLines: 2,
    techStackLines: 2,
    showCategory: true,
    showDate: true,
    showArticleLink: true,
    showDemoLink: true,
    showSourceLink: true,
    showStackButton: true,
    actionLinksColor: "#38bdf8",
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
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id || project.slug}
                  project={convertArticleToProject(project)}
                  index={idx}
                  config={cardConfig}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Global Minimalist Footer */}
      <MainFooter />
    </div>
  );
}
