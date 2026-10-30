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
  badgeIcon: string;
  badgeName: string;
  description: string;
  slug: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "boltshift",
    name: "Boltshift",
    image: "/images/project_boltshift.jpg",
    badgeIcon: "⚡",
    badgeName: "Boltshift",
    description: "High-throughput cloud inference engine and real-time payment gateway.",
    slug: "boltshift",
  },
  {
    id: "euphoria",
    name: "Euphoria",
    image: "/images/project_euphoria.jpg",
    badgeIcon: "👁",
    badgeName: "Ephemeral",
    description: "Multimodal computer vision pipeline and real-time iris biometric analyzer.",
    slug: "euphoria",
  },
  {
    id: "cloudwatch",
    name: "CloudWatch",
    image: "/images/project_cloudwatch.jpg",
    badgeIcon: "☁",
    badgeName: "CloudWatch",
    description: "Distributed telemetry infrastructure and multi-region log monitoring engine.",
    slug: "cloudwatch",
  },
  {
    id: "mastermail",
    name: "Mastermail",
    image: "/images/project_mastermail.jpg",
    badgeIcon: "❖",
    badgeName: "Mastermail",
    description: "High-deliverability transactional messaging operator for global scale.",
    slug: "mastermail",
  },
  {
    id: "warpspeed",
    name: "Warpspeed",
    image: "/images/project_warpspeed.jpg",
    badgeIcon: "🔗",
    badgeName: "Warpspeed",
    description: "Sub-millisecond low-latency packet streaming protocol in Rust & Go.",
    slug: "warpspeed",
  },
  {
    id: "powersurge",
    name: "Powersurge",
    image: "/images/project_powersurge.jpg",
    badgeIcon: "⬛",
    badgeName: "Powersurge",
    description: "Telemetry compute cluster orchestrating dynamic power grids & EV fleets.",
    slug: "powersurge",
  },
];

export default function SelectedWork() {
  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.container}>
        {/* Clean Header: NO [27], NO period after Projects, NO ©2025 */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Projects</h2>
          </div>

          <div className={styles.headerRight}>
            <p className={styles.headerDescription}>
              We&apos;ve helped businesses across industries achieve their goals. Here are some of our recent projects.
            </p>
          </div>
        </div>

        {/* 2-Column Grid with SQUARE Corners */}
        <div className={styles.grid}>
          {PROJECTS.map((item, idx) => (
            <motion.div
              key={item.id}
              className={styles.projectCard}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (idx % 2) * 0.15 }}
            >
              {/* Top Meta Bar: Clean name only (NO //2025) */}
              <div className={styles.cardTopBar}>
                <span className={styles.projectName}>{item.name}</span>
                <span className={styles.dotsIcon} aria-hidden="true">
                  &bull;&bull;&bull;
                </span>
              </div>

              {/* Square Image Canvas (border-radius: 0) */}
              <Link href={`/projects#${item.slug}`} className={styles.imageCanvas}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                />

                {/* Centered Brand Emblem Badge */}
                <div className={styles.centeredBadge}>
                  <span className={styles.badgeGlyph}>{item.badgeIcon}</span>
                  <span className={styles.badgeLabel}>{item.badgeName}</span>
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
