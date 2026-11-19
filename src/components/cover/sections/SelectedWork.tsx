"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./SelectedWork.module.css";

interface ShowcaseProject {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
}

const FEATURED_PROJECTS: ShowcaseProject[] = [
  {
    id: "creative-collective",
    title: "Creative Collective",
    description:
      "Tokyo & New York brand identity and interactive web platform celebrating contemporary craft, generative typography, and spatial design.",
    image: "/images/project_collective.jpg",
    slug: "creative-collective",
  },
  {
    id: "cloudwatch-telemetry",
    title: "CloudWatch Telemetry",
    description:
      "High-throughput real-time telemetry pipeline processing over 250k events/sec with sub-50ms query latency and automated alerting.",
    image: "/images/project_analytics.jpg",
    slug: "cloudwatch",
  },
  {
    id: "brutalist-manifesto",
    title: "Brutalist Manifesto",
    description:
      "High-density digital publication exploring brutalist architecture, structural truth, and responsive typographic scale across devices.",
    image: "/images/project_brutalist.jpg",
    slug: "brutalist-manifesto",
  },
];

export default function SelectedWork() {
  return (
    <section className={styles.projectsSection} id="projects" aria-label="Selected Projects">
      <div className={styles.container}>
        {/* Section Header: Title on Left, Text Link on Right */}
        <div className={styles.header}>
          <h2 className={styles.title}>Selected design work</h2>
          <Link href="/projects" className={styles.seeAllTop}>
            <span>SEE ALL PROJECTS</span>
            <span className={styles.arrowIcon} aria-hidden="true">→</span>
          </Link>
        </div>

        {/* 3-Column Square Image Card Grid */}
        <div className={styles.grid}>
          {FEATURED_PROJECTS.map((item, idx) => (
            <motion.div
              key={item.id}
              className={styles.cardWrapper}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/projects#${item.slug}`} className={styles.cardLink}>
                {/* 1:1 Aspect Ratio Square Image Canvas */}
                <div className={styles.imageCanvas}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={idx === 0}
                    className={styles.image}
                  />
                </div>

                {/* Card Meta directly below image */}
                <div className={styles.meta}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDescription}>{item.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Left Pill Button */}
        <div className={styles.bottomCtaWrapper}>
          <Link href="/projects" className={styles.bottomPillBtn}>
            <span>SEE ALL PROJECTS</span>
            <span className={styles.arrowIcon} aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
