"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <section className={styles.aboutSection} id="about-me" aria-label="About Dilshan">
      <div className={styles.container}>
        {/* Simple, Clean Section Title */}
        <div className={styles.header}>
          <h2 className={styles.title}>About</h2>
        </div>

        {/* Clean, Spacious Editorial Layout */}
        <div className={styles.contentGrid}>
          {/* Left Column: Bold Lead Statement */}
          <motion.div
            className={styles.leadCol}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={styles.leadText}>
              Crafting resilient distributed systems, modern web experiences, and scalable infrastructure that outlive ephemeral trends.
            </p>
          </motion.div>

          {/* Right Column: Narrative & Action */}
          <motion.div
            className={styles.narrativeCol}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={styles.paragraph}>
              I&apos;m Dilshan — a full-stack engineer and system architect based in Sri Lanka, working with teams globally. Over the past several years, I have engineered across the stack — from high-throughput distributed services and event-driven data pipelines to accessible, ultra-fast web clients.
            </p>

            <p className={styles.paragraph}>
              My engineering philosophy is anchored in durable principles: favor explicit architectures over magic abstractions, prioritize deterministic performance over brute computing power, and craft purposeful digital products that respect human attention.
            </p>

            <div className={styles.actionRow}>
              <Link href="#projects" className={styles.actionButton}>
                <span>EXPLORE SELECTED WORK</span>
                <span className={styles.arrow} aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
