"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <section className={styles.aboutSection} id="about-me" aria-label="About Dilshan">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Clean Modern Editorial Bio */}
          <motion.div
            className={styles.leftColumn}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.textBlock}>
              {/* Refined Minimalist Badge */}
              <div className={styles.accentBadge}>
                <span className={styles.accentDot} aria-hidden="true" />
                <span>ENGINEERING &amp; ARCHITECTURE</span>
              </div>

              {/* Bold Editorial Headline */}
              <h2 className={styles.leadText}>
                Crafting resilient distributed systems, modern web experiences &amp; scalable infrastructure.
              </h2>

              {/* Clean Structured Narrative */}
              <div className={styles.paragraphs}>
                <p>
                  I&apos;m <span className={styles.nameHighlight}>Dilshan</span> — a full-stack engineer and system architect based in Sri Lanka, collaborating with engineering teams globally. Over the past several years, I have architected across the entire stack — from high-throughput distributed services and event-driven data pipelines to accessible, ultra-fast web clients.
                </p>
                <p>
                  My engineering philosophy is anchored in durable principles: favor explicit architectures over magic abstractions, prioritize deterministic performance over brute computing power, and craft purposeful digital products that respect human attention.
                </p>
              </div>

              {/* Minimalist 3-Column Architectural Metrics */}
              <div className={styles.statsStrip}>
                <div className={styles.statBox}>
                  <span className={styles.statNumber}>08+</span>
                  <span className={styles.statLabel}>Years of Craft</span>
                </div>
                <div className={styles.statDivider} aria-hidden="true" />
                <div className={styles.statBox}>
                  <span className={styles.statNumber}>100%</span>
                  <span className={styles.statLabel}>Deterministic Logic</span>
                </div>
                <div className={styles.statDivider} aria-hidden="true" />
                <div className={styles.statBox}>
                  <span className={styles.statNumber}>GLOBAL</span>
                  <span className={styles.statLabel}>Team Collaboration</span>
                </div>
              </div>

              {/* Strictly Rectangular Action Button */}
              <div className={styles.actionRow}>
                <Link href="#projects" className={styles.actionButton}>
                  <span>EXPLORE SELECTED WORK</span>
                  <span className={styles.arrowIcon} aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Open Magazine Spread Image */}
          <motion.div
            className={styles.rightColumn}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.imageFrame}>
              <Image
                src="/images/about_the_second_issue.jpg"
                alt="Dilshan's Editorial Monograph & Systems Spread"
                width={1200}
                height={896}
                priority
                className={styles.magazinePhoto}
                sizes="(max-width: 900px) 100vw, (max-width: 1400px) 50vw, 680px"
              />
              <div className={styles.imageCornerTag}>
                <span>VOL. 02 // ARCHIVE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
