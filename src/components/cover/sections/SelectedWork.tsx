"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./SelectedWork.module.css";

interface ProjectItem {
  id: string;
  title: string;
  sector: string;
  image: string;
  href: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "the-dots",
    title: "The Dots",
    sector: "Technology",
    image: "/images/projects/project_the_dots.png",
    href: "/projects",
  },
  {
    id: "pay-by-bank",
    title: "Pay by Bank",
    sector: "Fintech",
    image: "/images/projects/project_pay_by_bank.png",
    href: "/projects",
  },
  {
    id: "not-optional",
    title: "Not Optional",
    sector: "Policy",
    image: "/images/projects/project_not_optional.png",
    href: "/projects",
  },
  {
    id: "banked",
    title: "Banked",
    sector: "Fintech",
    image: "/images/projects/project_banked.png",
    href: "/projects",
  },
  {
    id: "pure-sports",
    title: "Pure Sports",
    sector: "Healthcare",
    image: "/images/projects/project_pure_sports.png",
    href: "/projects",
  },
  {
    id: "dandara-living",
    title: "Dandara Living",
    sector: "Property",
    image: "/images/projects/project_dandara_living.png",
    href: "/projects",
  },
];

export default function SelectedWork() {
  return (
    <section className={styles.projectsSection} id="projects" aria-label="Selected Works">
      <div className={styles.container}>
        {/* Section Header: Clean Minimalist Title & Top Link */}
        <div className={styles.header}>
          <h2 className={styles.title}>Selected Works</h2>
          <Link href="/projects" className={styles.seeAllTop}>
            <span>SEE ALL PROJECTS</span>
            <span className={styles.arrowIcon} aria-hidden="true">→</span>
          </Link>
        </div>

        {/* 3x2 Floating Dark Capsule Grid Matching Reference Design */}
        <div className={styles.grid}>
          {PROJECTS.map((item, idx) => (
            <motion.div
              key={item.id}
              className={styles.cardWrapper}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={item.href} className={styles.cardLink} aria-label={`View project: ${item.title}`}>
                {/* Centered Squircle Badge Image Canvas */}
                <div className={styles.squircleFrame}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    priority={idx < 3}
                    className={styles.cardImage}
                  />
                </div>

                {/* Bottom Row: Project Name on Left, Sector on Right */}
                <div className={styles.cardMetaRow}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <span className={styles.cardSector}>{item.sector}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Centered Bottom Metric Ticker & Action (Exact Reference Match) */}
        <div className={styles.bottomBar}>
          <p className={styles.statsTicker}>
            140+ projects. 15+ sectors. Four continents.
          </p>
        </div>
      </div>
    </section>
  );
}
