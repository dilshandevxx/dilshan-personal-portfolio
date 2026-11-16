"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { projectsList, ProjectCategory } from "@/data/projects";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import { GithubIcon } from "@/components/SocialIcons";
import { ExternalLink, ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./projectsPage.module.css";

const CATEGORIES: readonly ("All" | ProjectCategory)[] = [
  "All",
  "AI/ML",
  "DevOps",
  "Systems",
  "Landing",
  "Full-Stack",
  "Others",
] as const;

export default function ProjectsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    return projectsList.filter(
      (project) => selectedCategory === "All" || project.category === selectedCategory
    );
  }, [selectedCategory]);

  const liveProjectsCount = useMemo(() => {
    return projectsList.filter((p) => Boolean(p.demoUrl)).length;
  }, []);

  const handleCardClick = (slug: string, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) return;
    router.push(`/projects/${slug}`);
  };

  return (
    <div className={styles.pageRoot}>
      {/* 1. Signature SkyLabs Top Navigation Header */}
      <SkyLabsNavbar activeTab="projects" />

      {/* 2. Main Content Container */}
      <main className={styles.mainContainer}>
        {/* Editorial Hero */}
        <section className={styles.heroSection}>
          <div className={styles.badgeWrapper}>
            <span className={styles.pillBadge}>
              <span className={styles.badgeDot}>•</span>
              ENGINEERING REPOSITORIES &amp; SYSTEMS
            </span>
          </div>

          <h1 className={styles.title}>Curated Systems &amp; Architecture</h1>
          <p className={styles.subtitle}>
            A comprehensive catalog of 31 engineering projects spanning production AI/ML architectures, high-throughput distributed pipelines, cloud automation, and modern web applications.
          </p>

          {/* Clean Quick Metrics Row */}
          <div className={styles.metricsRow}>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>{projectsList.length}</span>
              <span className={styles.metricLabel}>Total Systems</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>{projectsList.filter((p) => p.category === "AI/ML").length}</span>
              <span className={styles.metricLabel}>AI &amp; ML Models</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>{projectsList.filter((p) => p.category === "DevOps").length}</span>
              <span className={styles.metricLabel}>Cloud &amp; DevOps</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>{projectsList.filter((p) => p.category === "Systems").length}</span>
              <span className={styles.metricLabel}>Distributed Systems</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>{liveProjectsCount}</span>
              <span className={styles.metricLabel}>Live Deployments</span>
            </div>
          </div>
        </section>

        {/* 3. Category Filter Tabs */}
        <section className={styles.filterBarSection} aria-label="Project Categories">
          <div className={styles.filterTabs} role="tablist">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const count =
                cat === "All"
                  ? projectsList.length
                  : projectsList.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ""}`}
                >
                  <span>{cat}</span>
                  <span className={styles.categoryCount}>({count})</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. Projects Cards Grid */}
        <section aria-label="Projects Grid">
          <motion.div
            layout
            className={styles.cardsGrid}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const visibleTags = project.tags?.slice(0, 4) || [];
                return (
                  <motion.article
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: idx * 0.03 }}
                    className={styles.projectCard}
                    onClick={(e) => handleCardClick(project.slug, e)}
                    style={{ cursor: "pointer" }}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        router.push(`/projects/${project.slug}`);
                      }
                    }}
                    aria-label={`View details for ${project.title}`}
                  >
                    {/* Card Top Meta */}
                    <div className={styles.cardMetaRow}>
                      <span className={styles.categoryBadge}>{project.category}</span>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={styles.liveBadge}
                          title="Open Live Deployment"
                        >
                          <span className={styles.liveDot} />
                          <span>LIVE DEMO</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    {/* Card Title */}
                    <h2 className={styles.cardTitle}>
                      <Link
                        href={`/projects/${project.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {project.title}
                      </Link>
                    </h2>

                    {/* Card Tagline / Description */}
                    <p className={styles.cardDescription}>{project.tagline}</p>

                    {/* Tech Stack Chips */}
                    {visibleTags.length > 0 && (
                      <div className={styles.tagList}>
                        {visibleTags.map((tag) => (
                          <span key={tag} className={styles.techChip}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Card Footer */}
                    <div className={styles.cardFooter}>
                      <Link
                        href={`/projects/${project.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className={styles.exploreLink}
                      >
                        <span>Architecture</span>
                        <ArrowRight size={14} />
                      </Link>

                      <div className={styles.actionIcons}>
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={styles.iconBtn}
                            title="Live Application"
                            aria-label="Live Application"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={styles.iconBtn}
                          title="GitHub Repository"
                          aria-label="GitHub Repository"
                        >
                          <GithubIcon size={15} />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* 5. Bottom Architectural Callout matching SkyLabs Vibe */}
        <section className={styles.bottomCtaSection}>
          <h2 className={styles.ctaTitle}>Interested in Building Together?</h2>
          <p className={styles.ctaText}>
            Whether designing high-throughput distributed systems, deploying enterprise machine learning infrastructure, or crafting modern web experiences, let&apos;s connect.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/#contact" className={styles.primaryCtaBtn}>
              <span>Get In Touch</span>
              <ArrowRight size={14} />
            </Link>
            <Link href="/portfolio" className={styles.secondaryCtaBtn}>
              <span>Explore Portfolio</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
