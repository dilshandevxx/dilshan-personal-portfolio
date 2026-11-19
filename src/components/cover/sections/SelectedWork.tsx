"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./SelectedWork.module.css";

interface BentoProject {
  id: string;
  title: string;
  category: string;
  image: string;
  slug: string;
  gridClass: string;
}

const BENTO_PROJECTS: BentoProject[] = [
  {
    id: "creative-collective",
    title: "Creative Collective",
    category: "Brand Identity",
    image: "/images/project_collective.jpg",
    slug: "creative-collective",
    gridClass: "cardTopLeft",
  },
  {
    id: "brutalist-manifesto",
    title: "Brutalist Manifesto",
    category: "Editorial Design",
    image: "/images/project_brutalist.jpg",
    slug: "brutalist-manifesto",
    gridClass: "cardTopRight",
  },
  {
    id: "warpspeed-protocol",
    title: "Warpspeed",
    category: "Edge Architecture",
    image: "/images/project_warpspeed_desk.jpg",
    slug: "warpspeed",
    gridClass: "cardBottomLeft",
  },
  {
    id: "cloudwatch-telemetry",
    title: "CloudWatch",
    category: "Telemetry",
    image: "/images/project_analytics.jpg",
    slug: "cloudwatch",
    gridClass: "cardBottomMiddle",
  },
  {
    id: "powersurge-platform",
    title: "PowerSurge",
    category: "Distributed Platform",
    image: "/images/project_powersurge.jpg",
    slug: "powersurge",
    gridClass: "cardBottomRight",
  },
];

export default function SelectedWork() {
  return (
    <section className={styles.projectsSection} id="projects" aria-label="Selected Works">
      <div className={styles.container}>
        {/* Minimalist Section Header Matching Reference */}
        <div className={styles.header}>
          <span className={styles.sectionLabel}>SELECTED WORKS</span>
          <Link href="/projects" className={styles.seeAllLink}>
            <span>SEE ALL PROJECTS</span>
            <span className={styles.arrowIcon} aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Bento Asymmetric Visual Grid Matching Exact Reference */}
        <div className={styles.bentoGrid}>
          {BENTO_PROJECTS.map((item, idx) => (
            <motion.div
              key={item.id}
              className={`${styles.card} ${styles[item.gridClass]}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/projects#${item.slug}`}
                className={styles.cardLink}
                aria-label={`View project: ${item.title}`}
              >
                {/* Background Image Frame */}
                <div className={styles.imageFrame}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx < 2}
                    className={styles.cardImage}
                  />

                  {/* Centered Editorial Overlay */}
                  <div className={styles.cardOverlay}>
                    <h3 className={styles.projectTitle}>{item.title}</h3>
                    <span className={styles.categoryPill}>{item.category}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
