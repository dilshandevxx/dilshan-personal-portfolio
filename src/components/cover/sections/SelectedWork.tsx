"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projectsList } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import styles from "./SelectedWork.module.css";

export default function SelectedWork() {
  // Top 3 featured projects matching the exact 3-column exhibition in media_1794967642312_20adb180.jpg
  const featuredProjects = projectsList.slice(0, 3);

  return (
    <section className={styles.projectsSection} id="projects" aria-label="Projects">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Projects</h2>
          </div>
        </div>

        {/* 3-Column Projects Exhibition Grid */}
        <div className={styles.projectsGrid}>
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
            >
              <ProjectCard project={project} index={idx} />
            </motion.div>
          ))}
        </div>

        {/* Clean Pill [View All Projects] CTA */}
        <div className={styles.ctaWrapper}>
          <Link href="/projects" className={styles.talkButton}>
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
