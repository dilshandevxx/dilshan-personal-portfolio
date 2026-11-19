"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./SelectedWork.module.css";

interface ProjectItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  slug: string;
}

const PROJECTS_LEFT: ProjectItem[] = [
  {
    id: "creative-collective",
    name: "Creative Collective",
    subtitle: "Brand Identity, Tokyo & New York",
    image: "/images/project_collective.jpg",
    slug: "creative-collective",
  },
  {
    id: "cloudwatch-telemetry",
    name: "CloudWatch Telemetry",
    subtitle: "Distributed Systems, High Throughput",
    image: "/images/project_analytics.jpg",
    slug: "cloudwatch",
  },
];

const PROJECTS_RIGHT: ProjectItem[] = [
  {
    id: "brutalist-manifesto",
    name: "Brutalist Manifesto",
    subtitle: "Editorial Design, Digital Publication",
    image: "/images/project_brutalist.jpg",
    slug: "brutalist-manifesto",
  },
  {
    id: "warpspeed-protocol",
    name: "Warpspeed Protocol",
    subtitle: "Edge Computing, Ultra Low Latency",
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
            <h2 className={styles.title}>Selected projects.</h2>
          </div>
        </div>

        {/* Editorial Staggered Layout for Desktop / Minimalist Cards for Mobile */}
        <div className={styles.editorialStaggerContainer}>
          {/* Left Column (starts at y = 0) */}
          <div className={styles.columnLeft}>
            {PROJECTS_LEFT.map((item, idx) => (
              <motion.div
                key={item.id}
                className={styles.projectCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Link href={`/projects#${item.slug}`} className={styles.cardLink} title={item.name}>
                  {/* Image Frame: Square on Desktop, Rounded 12px on Mobile */}
                  <div className={styles.imageCanvas}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      priority={idx === 0}
                      className={styles.image}
                    />

                    {/* Desktop Overlay Title (Hidden on Mobile) */}
                    <div className={styles.cardOverlay}>
                      <h3 className={styles.cardTitle}>{item.name}</h3>
                    </div>
                  </div>

                  {/* Mobile Text Info (Underneath Image, matching User Reference Design) */}
                  <div className={styles.mobileInfo}>
                    <h3 className={styles.mobileTitle}>{item.name}</h3>
                    <p className={styles.mobileSubtitle}>{item.subtitle}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Column (offset downwards on desktop for staggered positioning) */}
          <div className={styles.columnRight}>
            {PROJECTS_RIGHT.map((item, idx) => (
              <motion.div
                key={item.id}
                className={styles.projectCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
              >
                <Link href={`/projects#${item.slug}`} className={styles.cardLink} title={item.name}>
                  {/* Image Frame: Square on Desktop, Rounded 12px on Mobile */}
                  <div className={styles.imageCanvas}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      priority={idx === 0}
                      className={styles.image}
                    />

                    {/* Desktop Overlay Title (Hidden on Mobile) */}
                    <div className={styles.cardOverlay}>
                      <h3 className={styles.cardTitle}>{item.name}</h3>
                    </div>
                  </div>

                  {/* Mobile Text Info (Underneath Image, matching User Reference Design) */}
                  <div className={styles.mobileInfo}>
                    <h3 className={styles.mobileTitle}>{item.name}</h3>
                    <p className={styles.mobileSubtitle}>{item.subtitle}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rectangular [Talk Today] Style Button */}
        <div className={styles.ctaWrapper}>
          <Link href="/projects" className={styles.talkButton}>
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
