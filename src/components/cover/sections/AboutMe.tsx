"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <section className={styles.aboutSection} id="about-me" aria-label="About Dilshan">
      <div className={styles.container}>
        <motion.div
          className={styles.editorialGrid}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left Column: Clean label matching reference design */}
          <div className={styles.leftColumn}>
            <span className={styles.sectionLabel}>
              More about me <span className={styles.labelDash}>—</span>
            </span>
          </div>

          {/* Right Column: Prominent headline, narrative paragraphs, and lime-green button */}
          <div className={styles.rightColumn}>
            <h2 className={styles.heading}>
              <span className={styles.headingName}>I&apos;m Dilshan</span>
              <span className={styles.headingRole}>AI/ML Engineer &amp; DevOps Architect</span>
              <span className={styles.headingLocation}>Based in Colombo, Sri Lanka</span>
            </h2>

            <div className={styles.narrativeStack}>
              <p className={styles.narrativePara}>
                I have been fascinated by the possibilities of artificial intelligence and distributed systems
                from the beginning. I engineer high-throughput machine learning systems, low-latency model inference
                runtimes, and resilient cloud infrastructure built to perform deterministically under demanding
                production scale.
              </p>

              <p className={styles.narrativePara}>
                My work bridges both sides of modern engineering: training and fine-tuning neural models, optimizing
                GPU tensor execution boundaries, and automating Kubernetes-native cloud environments with GitOps and
                Terraform. My approach is simple — remove unnecessary complexity, optimize memory and latency boundaries,
                and build dependable systems with mathematical rigor.
              </p>
            </div>

            <div className={styles.actionRow}>
              <Link href="/about" className={styles.greenButton}>
                ABOUT ME
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
