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
        {/* 1. Header with Editorial Hairline Rule */}
        <div className={styles.header}>
          <h2 className={styles.title}>About</h2>
        </div>

        {/* 2. Expansive Two-Tone Display Statement */}
        <motion.div
          className={styles.statementWrapper}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.leadText}>
            <span className={styles.leadBright}>
              Crafting resilient distributed systems, modern web experiences,
            </span>{" "}
            <span className={styles.leadMuted}>
              and scalable infrastructure that outlive ephemeral trends.
            </span>
          </p>
        </motion.div>

        {/* 3. Balanced Dual-Column: Narrative & Authentic Portrait */}
        <div className={styles.grid}>
          {/* Left Column: Narrative & Action */}
          <motion.div
            className={styles.narrativeCol}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={styles.paragraph}>
              I&apos;m <strong className={styles.highlight}>Dilshan</strong> — a full-stack engineer and system architect based in Sri Lanka, working with teams globally. Over the past several years, I have engineered across the stack — from high-throughput distributed services and event-driven data pipelines to accessible, ultra-fast web clients.
            </p>

            <p className={styles.paragraph}>
              My engineering philosophy is anchored in durable principles: favor explicit architectures over magic abstractions, prioritize deterministic performance over brute computing power, and craft purposeful digital products that respect human attention.
            </p>

            {/* Strictly Rectangular Action Button */}
            <div className={styles.actionRow}>
              <Link href="#projects" className={styles.actionButton}>
                <span>EXPLORE SELECTED WORK</span>
                <span className={styles.arrow} aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Monochrome Editorial Portrait Frame */}
          <motion.div
            className={styles.imageCol}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.imageFrame}>
              <Image
                src="/images/about_portrait.jpg"
                alt="Dilshan Ramesh — Full-Stack Engineer & System Architect"
                width={800}
                height={1000}
                priority
                className={styles.portraitImage}
                sizes="(max-width: 900px) 100vw, 540px"
              />
              <div className={styles.imageOverlay} />
              <div className={styles.imageCaption}>
                <span>DILSHAN RAMESH // ARCHITECT &amp; ENGINEER</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
