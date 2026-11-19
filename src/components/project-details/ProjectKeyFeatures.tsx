"use client";

import React from "react";
import { GeometricBadge, GeometricBadgeType } from "./GeometricBadge";
import { KeyFeatureItem } from "@/data/projects";
import styles from "./ProjectKeyFeatures.module.css";

interface ProjectKeyFeaturesProps {
  features: KeyFeatureItem[];
}

export function ProjectKeyFeatures({ features }: ProjectKeyFeaturesProps) {
  if (!features || features.length === 0) return null;

  return (
    <section id="features" className={styles.sectionRoot}>
      <div className={styles.sectionHeader}>
        <div className={styles.metaRow}>
          <span className={styles.sectionIndex}>04 / CAPABILITIES</span>
          <span className={styles.metaDivider}>•</span>
          <span className={styles.metaSub}>CORE HIGHLIGHTS</span>
        </div>
        <h2 className={styles.sectionTitle}>Key Features & Engineering Pillars</h2>
        <p className={styles.sectionSubtitle}>
          Modular capabilities engineered with strict attention to performance, maintainability, and end-user experience.
        </p>
      </div>

      {/* 4-Card Grid (Matching User Reference Image 1) */}
      <div className={styles.featuresGrid}>
        {features.map((feature, idx) => {
          // Default cycle through design, code, strategy, qa if not specified
          const defaultTypes: GeometricBadgeType[] = ["design", "code", "strategy", "qa"];
          const badgeType = feature.iconType || defaultTypes[idx % defaultTypes.length];

          return (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.badgeWrapper}>
                <GeometricBadge type={badgeType} size={44} />
              </div>

              <div className={styles.cardHeader}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                {feature.tag && (
                  <span className={styles.featureTag}>{feature.tag}</span>
                )}
              </div>

              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
