"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projectsList, getProjectThumbnail } from "@/data/projects";
import styles from "./SelectedWork.module.css";

const FILTER_CATEGORIES = ["All", "AI/ML", "Full-Stack", "DevOps", "Systems"] as const;

export default function SelectedWork() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const displayedProjects = useMemo(() => {
    if (selectedCategory === "All") {
      // 6 premier showcase projects for the landing page
      const premierSlugs = [
        "production-rag-platform",
        "foodlence-backend",
        "ideaspark-ai-business-idea-generator",
        "roamora-travel-discovery-website",
        "familycare-eldercare-monitoring-system",
        "distributed-llm-inference-platform",
      ];
      return premierSlugs
        .map((slug) => projectsList.find((p) => p.slug === slug))
        .filter((p): p is typeof projectsList[0] => Boolean(p));
    }
    return projectsList
      .filter((p) => p.category === selectedCategory)
      .slice(0, 6);
  }, [selectedCategory]);

  return (
    <section className={styles.projectsSection} id="projects" aria-label="Selected Projects">
      <div className={styles.container}>
        {/* Editorial Section Header */}
        <div className={styles.header}>
          <motion.div
            className={styles.headerTop}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.monoTag}>[ 02 // SELECTED ARCHITECTURE ]</span>
          </motion.div>

          <div className={styles.titleRow}>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Featured Projects
            </motion.h2>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Production systems, distributed platforms, and high-performance applications designed with architectural discipline.
            </motion.p>
          </div>

          {/* Interactive Domain Filter Tabs */}
          <motion.div
            className={styles.filterTabs}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            role="tablist"
            aria-label="Filter projects by domain"
          >
            {FILTER_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ""}`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* 3-Column Luxury Exhibition Grid (matching uploaded design) */}
        <motion.div layout className={styles.cardsGrid}>
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, idx) => {
              const thumbnailSrc = getProjectThumbnail(project.slug, project.image, idx);

              return (
                <motion.article
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className={styles.card}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className={styles.cardLink}
                    aria-label={`View architecture details for ${project.title}`}
                  >
                    {/* 16:10 Rounded Image Banner */}
                    <div className={styles.imageFrame}>
                      <Image
                        src={thumbnailSrc}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={idx < 3}
                        className={styles.image}
                      />
                      <div className={styles.imageVignette} />

                      {/* Translucent Bottom-Left Category Pill (matching screenshot) */}
                      <span className={styles.categoryBadge}>
                        {project.category}
                      </span>
                    </div>

                    {/* Content Below Image */}
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{project.title}</h3>
                      <p className={styles.cardDescription}>{project.tagline}</p>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA to explore all projects */}
        <motion.div
          className={styles.ctaWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/projects" className={styles.exploreAllBtn}>
            <span>View All 31 Projects</span>
            <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
