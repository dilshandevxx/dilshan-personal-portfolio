"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./SelectedWork.module.css";

interface ProjectItem {
  id: string;
  name: string;
  image: string;
  slug: string;
}

const PROJECTS_LEFT: ProjectItem[] = [
  {
    id: "creative-collective",
    name: "Creative Collective",
    image: "/images/project_collective.jpg",
    slug: "creative-collective",
  },
  {
    id: "cloudwatch-telemetry",
    name: "CloudWatch Telemetry",
    image: "/images/project_analytics.jpg",
    slug: "cloudwatch",
  },
];

const PROJECTS_RIGHT: ProjectItem[] = [
  {
    id: "brutalist-manifesto",
    name: "Brutalist Manifesto",
    image: "/images/project_brutalist.jpg",
    slug: "brutalist-manifesto",
  },
  {
    id: "warpspeed-protocol",
    name: "Warpspeed Protocol",
    image: "/images/project_warpspeed_desk.jpg",
    slug: "warpspeed",
  },
];

export default function SelectedWork() {
  return (
    <section className={styles.projectsSection} id="projects" aria-label="Projects">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Projects</h2>
          </div>
        </div>

        {/* Editorial Staggered Layout */}
        <div className={styles.editorialStaggerContainer}>
          {/* Left Column (starts at y = 0) */}
          <div className={styles.columnLeft}>
            {PROJECTS_LEFT.map((item, idx) => (
              <motion.div
                key={item.id}
                className={styles.projectCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
              >
                <Link href={`/projects#${item.slug}`} className={styles.cardLink}>
                  {/* 1:1 Square Flatlay Image Canvas (border-radius: 0) */}
                  <div className={styles.imageCanvas}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 820px) 100vw, 46vw"
                      priority={idx === 0}
                      className={styles.image}
                    />

                    {/* Clean Simple Title ON the card */}
                    <div className={styles.cardOverlay}>
                      <h3 className={styles.cardTitle}>{item.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Column (offset downwards for authentic staggered positioning) */}
          <div className={styles.columnRight}>
            {PROJECTS_RIGHT.map((item, idx) => (
              <motion.div
                key={item.id}
                className={styles.projectCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.15 + idx * 0.15 }}
              >
                <Link href={`/projects#${item.slug}`} className={styles.cardLink}>
                  {/* 1:1 Square Flatlay Image Canvas (border-radius: 0) */}
                  <div className={styles.imageCanvas}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 820px) 100vw, 46vw"
                      priority={idx === 0}
                      className={styles.image}
                    />

                    {/* Clean Simple Title ON the card */}
                    <div className={styles.cardOverlay}>
                      <h3 className={styles.cardTitle}>{item.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Clean Rectangular [Talk Today] Style Button */}
        <div className={styles.ctaWrapper}>
          <Link href="/projects" className={styles.talkButton}>
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
