"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projectsList as defaultProjects, Project, getProjectThumbnail, FALLBACK_THUMBNAILS } from "@/data/projects";
import styles from "./SelectedWork.module.css";

interface ShowcaseCardProps {
  project: Project;
  index: number;
}

function ShowcaseCard({ project, index }: ShowcaseCardProps) {
  const initialThumb = getProjectThumbnail(project.slug, project.image, index);
  const [thumbSrc, setThumbSrc] = useState<string>(initialThumb);

  useEffect(() => {
    setThumbSrc(getProjectThumbnail(project.slug, project.image, index));
  }, [project.slug, project.image, index]);

  const isExternalUrl =
    thumbSrc.startsWith("http://") ||
    thumbSrc.startsWith("https://") ||
    thumbSrc.startsWith("data:");

  // Build clean subtitle matching the reference design ("Category, Tech / Tagline")
  const subtitle = project.tagline
    ? `${project.category} • ${project.tagline}`
    : project.tags && project.tags.length > 0
    ? `${project.category} • ${project.tags.slice(0, 3).join(", ")}`
    : `${project.category} • System Architecture`;

  return (
    <motion.div
      className={styles.projectCard}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: (index % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projects/${project.slug}`} className={styles.cardLink} title={project.title}>
        {/* 1. Rounded Thumbnail Frame (Clean, No Overlays, Faithfully Matching Reference) */}
        <div className={styles.imageFrame}>
          <Image
            src={thumbSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
            priority={index < 2}
            unoptimized={isExternalUrl}
            onError={() => {
              const fallback =
                FALLBACK_THUMBNAILS[index % FALLBACK_THUMBNAILS.length] ||
                "/images/project_collective.jpg";
              setThumbSrc(fallback);
            }}
            className={styles.projectImage}
          />
        </div>

        {/* 2. Text Info Placed Directly Below Image */}
        <div className={styles.infoWrapper}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectSubtitle}>{subtitle}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function SelectedWork() {
  const [projects, setProjects] = useState<Project[]>(() => defaultProjects.slice(0, 6));

  // Sync custom added/edited projects from admin if present
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dilshan_custom_projects");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed.slice(0, 6));
        }
      }
    } catch {}
  }, []);

  return (
    <section className={styles.projectsSection} id="projects" aria-label="Selected Projects">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.badgeWrapper}>
            <span className={styles.pillBadge}>
              <span className={styles.badgeDot}>•</span> SELECTED WORK
            </span>
          </div>
          <h2 className={styles.headline}>
            <span className={styles.headlineTop}>ENGINEERING SYSTEMS</span>
            <span className={styles.headlineBottom}>&amp; ARCHITECTURE</span>
          </h2>
          <p className={styles.leadText}>
            A curated showcase of production architectures spanning neural models, scalable backends, and high-performance interfaces.
          </p>
        </div>

        {/* 2-Column Gallery Grid matching the Reference Design */}
        <div className={styles.projectsGrid}>
          {projects.map((project, idx) => (
            <ShowcaseCard key={project.slug || idx} project={project} index={idx} />
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className={styles.ctaWrapper}>
          <Link href="/projects" className={styles.viewAllButton}>
            <span>View All Projects</span>
            <span className={styles.arrowIcon}>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
