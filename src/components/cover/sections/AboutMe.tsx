"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <section className={styles.aboutSection} id="about" aria-label="About Dilshan">
      <div className={styles.container}>
        <motion.div
          className={styles.editorialGrid}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left Column: Clean ● ABOUT ME indicator matching reference design */}
          <div className={styles.leftColumn}>
            <div className={styles.missionIndicator}>
              <span className={styles.indicatorDot} aria-hidden="true" />
              <span className={styles.indicatorLabel}>ABOUT ME</span>
            </div>
          </div>

          {/* Right Column: Bold high-impact statement and action button */}
          <div className={styles.rightColumn}>
            <h2 className={styles.statementText}>
              I engineer high-throughput machine learning systems, low-latency model inference
              runtimes, and resilient cloud infrastructure built to perform deterministically
              under demanding production scale. My approach is simple — remove unnecessary
              complexity, optimize memory and latency boundaries, and build dependable systems with
              mathematical rigor.
            </h2>

            <div className={styles.actionRow}>
              <Link href="/about" className={styles.aboutButton}>
                <span>ABOUT ME</span>
                <ArrowUpRight size={14} className={styles.buttonArrow} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
