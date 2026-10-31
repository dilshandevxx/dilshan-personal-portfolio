"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./SelectedWork.module.css";

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  slug: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "creative-collective",
    name: "Creative Collective",
    category: "Design System & Brand Vision",
    image: "/images/project_collective.jpg",
    description: "Modern digital editorial presentation and high-impact brand strategy framework.",
    slug: "creative-collective",
  },
  {
    id: "brutalist-manifesto",
    name: "Brutalist Manifesto",
    category: "Urban Architecture & Graphic Grid",
    image: "/images/project_brutalist.jpg",
    description: "Typographic exploration and architectural design system for urban spaces.",
    slug: "brutalist-manifesto",
  },
  {
    id: "cloudwatch-telemetry",
    name: "CloudWatch Telemetry",
    category: "Distributed Systems & Telemetry",
    image: "/images/project_analytics.jpg",
    description: "Real-time telemetry infrastructure and multi-region log monitoring engine.",
    slug: "cloudwatch",
  },
  {
    id: "warpspeed-protocol",
    name: "Warpspeed Protocol",
    category: "Low-Latency Compute",
    image: "/images/project_warpspeed_desk.jpg",
    description: "Sub-millisecond low-latency packet streaming protocol in Rust & Go.",
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

        {/* Staggered Editorial 2-Column Grid matching reference */}
        <div className={styles.grid}>
          {PROJECTS.map((item, idx) => (
            <motion.div
              key={item.id}
              className={styles.projectCard}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: (idx % 2) * 0.15 }}
            >
              <Link href={`/projects#${item.slug}`} className={styles.cardLink}>
                {/* 1:1 Square Flatlay Image Canvas (border-radius: 0) */}
                <div className={styles.imageCanvas}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx < 2}
                    className={styles.image}
                  />
                </div>

                {/* Clean Minimal Metadata below image */}
                <div className={styles.cardMeta}>
                  <h3 className={styles.projectName}>{item.name}</h3>
                  <span className={styles.projectCategory}>{item.category}</span>
                </div>
              </Link>
            </motion.div>
          ))}
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
