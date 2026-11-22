"use client";

import React from "react";
import { motion } from "framer-motion";
import { journeyMilestones } from "@/data/timeline";
import styles from "./JourneySection.module.css";

export default function JourneySection() {
  return (
    <section className={styles.sectionRoot} id="journey" aria-label="Career Milestones">
      {/* Header Block: Dark square icon + Title */}
      <motion.div
        className={styles.headerBlock}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.headerSquare} aria-hidden="true" />
        <h2 className={styles.mainTitle}>Career &amp; Milestones</h2>
      </motion.div>

      <div className={styles.toolsDivider} aria-hidden="true" />

      {/* Editorial Timeline List */}
      <motion.div
        className={styles.contentWrap}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.leadText}>
          A chronological summary of engineering leadership, systems craftsmanship, and technical impact.
        </p>

        <ul className={styles.bulletList}>
          {journeyMilestones.map((milestone) => (
            <li key={milestone.year} className={styles.bulletItem}>
              <span className={styles.boldTerm}>{milestone.year}:</span>{" "}
              {milestone.description}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
