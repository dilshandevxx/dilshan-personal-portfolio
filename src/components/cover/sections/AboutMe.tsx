"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <section className={styles.aboutSection} id="about-me" aria-label="About Dilshan">
      <div className={styles.container}>
        {/* 1. Subtle Editorial Section Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.tagWrapper}>
            <span className={styles.greenDot} aria-hidden="true" />
            <span className={styles.sectionTag}>01 // ABOUT &amp; PHILOSOPHY</span>
          </div>
          <span className={styles.locationTag}>COLOMBO, LK (UTC+5:30) &bull; GLOBAL REMOTE</span>
        </motion.div>

        {/* 2. Bold High-Impact Display Statement */}
        <motion.div
          className={styles.statementWrapper}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.statementHeadline}>
            Crafting resilient distributed systems, modern web experiences &amp; scalable infrastructure that outlive ephemeral trends.
          </h2>
        </motion.div>

        {/* 3. Clean Dual-Column Architectural Breakdown */}
        <div className={styles.narrativeGrid}>
          {/* Left Column: Narrative Bio & CTA */}
          <motion.div
            className={styles.bioColumn}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={styles.bioPrimary}>
              I&apos;m <strong className={styles.highlight}>Dilshan</strong> — a full-stack engineer and system architect based in Sri Lanka, collaborating with engineering teams globally. Over the past several years, I have architected across the full spectrum: from high-throughput distributed backends and event-driven data pipelines to accessible, ultra-fast web clients.
            </p>

            <p className={styles.bioSecondary}>
              My engineering philosophy is anchored in durable principles: favor explicit architectures over magic abstractions, prioritize deterministic performance over brute computing power, and craft purposeful digital products that respect human attention.
            </p>

            {/* Strictly Rectangular Action Button */}
            <div className={styles.actionRow}>
              <Link href="#projects" className={styles.actionButton}>
                <span>EXPLORE SELECTED WORK</span>
                <span className={styles.arrowIcon} aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: 3 Architectural Pillars */}
          <motion.div
            className={styles.pillarsColumn}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.pillarCard}>
              <div className={styles.pillarHeader}>
                <span className={styles.pillarNum}>01</span>
                <span className={styles.pillarBadge}>ARCHITECTURE</span>
              </div>
              <h3 className={styles.pillarTitle}>Explicit Systems</h3>
              <p className={styles.pillarDesc}>
                Prioritizing clarity, strong type contracts, and observable architectures over opaque frameworks and magic abstractions.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarHeader}>
                <span className={styles.pillarNum}>02</span>
                <span className={styles.pillarBadge}>SCALE</span>
              </div>
              <h3 className={styles.pillarTitle}>High-Throughput Pipelines</h3>
              <p className={styles.pillarDesc}>
                Building resilient event-driven data pipelines, microservices, and distributed cloud deployments that remain reliable under heavy load.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarHeader}>
                <span className={styles.pillarNum}>03</span>
                <span className={styles.pillarBadge}>EXPERIENCE</span>
              </div>
              <h3 className={styles.pillarTitle}>Deterministic Craft</h3>
              <p className={styles.pillarDesc}>
                Engineered for sub-millisecond execution, accessible UI interactions, and digital products that treat user attention with dignity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
