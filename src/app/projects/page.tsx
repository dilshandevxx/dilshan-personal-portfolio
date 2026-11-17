"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projectsList as defaultProjects, Project, ProjectCategory } from "@/data/projects";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import { ProjectCard } from "@/components/ProjectCard";
import MainFooter from "@/components/MainFooter";
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
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
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
      const matchesCat =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        q === "" ||
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        (project.tags && project.tags.some((t) => t.toLowerCase().includes(q)));
      return matchesCat && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const liveProjectsCount = useMemo(() => {
    return projects.filter((p) => Boolean(p.demoUrl)).length;
  }, [projects]);

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
            A comprehensive catalog of {projects.length} engineering projects spanning production AI/ML architectures, high-throughput distributed pipelines, cloud automation, and modern web applications.
          </p>

          {/* Clean Quick Metrics Row */}
          <div className={styles.metricsRow}>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>{projects.length}</span>
              <span className={styles.metricLabel}>Total Systems</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>{projects.filter((p) => p.category === "AI/ML").length}</span>
              <span className={styles.metricLabel}>AI &amp; ML Models</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>{projects.filter((p) => p.category === "DevOps").length}</span>
              <span className={styles.metricLabel}>Cloud &amp; DevOps</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>{projects.filter((p) => p.category === "Systems").length}</span>
              <span className={styles.metricLabel}>Distributed Systems</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>{liveProjectsCount}</span>
              <span className={styles.metricLabel}>Live Deployments</span>
            </div>
          </div>
        </section>

        {/* 3. Category Filter & Search Section */}
        <section className={styles.filterBarSection} aria-label="Project Categories & Search">
          <div className={styles.filterTabs} role="tablist">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const count =
                cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;

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

          {/* Search Input */}
          <div style={{ marginTop: "1rem", position: "relative", maxWidth: "420px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 0.9rem",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "6px",
              }}
            >
              <Search size={14} color="#788090" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search systems by name, stack, or keyword..."
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-body, sans-serif)",
                  width: "100%",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#788090",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 4. Projects Cards Grid using Unified Customized ProjectCard */}
        <section aria-label="Projects Grid">
          <motion.div
            layout
            className={styles.cardsGrid}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.02, 0.3) }}
                >
                  <ProjectCard project={project} index={idx} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#788090" }}>
              <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                No projects found matching &ldquo;{searchQuery}&rdquo; in {selectedCategory}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className={styles.secondaryCtaBtn}
                style={{ marginTop: "1rem" }}
              >
                Reset Filters
              </button>
            </div>
          )}
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
