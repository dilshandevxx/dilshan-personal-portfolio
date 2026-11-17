"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projectsList, ProjectCategory, getProjectThumbnail } from "@/data/projects";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    return projectsList.filter(
      (project) => selectedCategory === "All" || project.category === selectedCategory
    );
  }, [selectedCategory]);

  const liveProjectsCount = useMemo(() => {
    return projectsList.filter((p) => Boolean(p.demoUrl)).length;
  }, []);

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

        {/* 4. Projects Cards Grid (matching uploaded design) */}
        <section aria-label="Projects Grid">
          <motion.div
            layout
            className={styles.cardsGrid}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const thumbnailSrc = getProjectThumbnail(project.slug, project.image, idx);

                return (
                  <motion.article
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: idx * 0.03 }}
                    className={styles.projectCard}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className={styles.cardLink}
                      aria-label={`View details for ${project.title}`}
                    >
                      {/* 16:10 Rounded Image Thumbnail with Bottom-Left Category Pill */}
                      <div className={styles.imageFrame}>
                        <Image
                          src={thumbnailSrc}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={idx < 6}
                          className={styles.cardImage}
                        />
                        <div className={styles.imageVignette} />

                        {/* Bottom-Left Pill Badge matching reference (e.g. design, Web App, Corporate) */}
                        <span className={styles.categoryBadge}>{project.category}</span>
                      </div>

                      {/* Card Content Below Image */}
                      <div className={styles.cardBody}>
                        <h2 className={styles.cardTitle}>{project.title}</h2>
                        <p className={styles.cardDescription}>{project.tagline}</p>
                      </div>
                    </Link>
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
      <MainFooter />
    </div>
  );
}
