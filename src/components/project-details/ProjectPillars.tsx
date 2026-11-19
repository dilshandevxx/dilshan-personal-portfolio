"use client";

import React from "react";
import { GeometricBadge, GeometricBadgeType } from "./GeometricBadge";
import { ProjectPillar } from "@/lib/projectEnricher";
import styles from "./ProjectPillars.module.css";

interface ProjectPillarsProps {
  pillars: ProjectPillar[];
}

export function ProjectPillars({ pillars }: ProjectPillarsProps) {
  if (!pillars || pillars.length === 0) return null;

  return (
    <section id="disciplines" className={styles.sectionRoot}>
      {/* Editorial Section Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.metaRow}>
          <span className={styles.sectionIndex}>04 / PROJECT EXECUTION</span>
          <span className={styles.metaDivider}>•</span>
          <span className={styles.metaSub}>CORE DISCIPLINES</span>
        </div>
        <h2 className={styles.sectionTitle}>Project Delivery & Core Disciplines</h2>
        <p className={styles.sectionSubtitle}>
          How this system was conceived, designed, engineered, and rigorously verified across four key execution stages.
        </p>
      </div>

      {/* 4-Card Row (Faithfully matching the User Reference) */}
      <div className={styles.cardsGrid}>
        {pillars.map((pillar, idx) => {
          const badgeType: GeometricBadgeType =
            pillar.iconType ||
            (idx === 0
              ? "design"
              : idx === 1
              ? "code"
              : idx === 2
              ? "strategy"
              : "qa");

          return (
            <div key={idx} className={styles.pillarCard}>
              {/* Top Geometric Badge */}
              <div className={styles.badgeWrapper}>
                <GeometricBadge type={badgeType} size={48} />
              </div>

              {/* Card Title */}
              <h3 className={styles.cardTitle}>{pillar.title}</h3>

              {/* Meaningful Description */}
              <p className={styles.cardDescription}>{pillar.description}</p>

              {/* Bottom Tags / Deliverables */}
              {pillar.deliverables && pillar.deliverables.length > 0 && (
                <div className={styles.deliverablesStrip}>
                  {pillar.deliverables.map((item, i) => (
                    <span key={i} className={styles.deliverableTag}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
