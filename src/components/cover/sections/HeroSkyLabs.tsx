"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./HeroSkyLabs.module.css";

export default function HeroSkyLabs() {
  return (
    <section className={styles.heroSection} aria-label="Hero">
      <div className={styles.heroContainer}>
        {/* Massive Display Title */}
        <motion.h1
          className={styles.displayTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Dilshan Ramesh
        </motion.h1>

        {/* Minimal Subtle Accent Dot */}
        <motion.div
          className={styles.dotAccent}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          aria-hidden="true"
        />

        {/* Centered Editorial Tagline */}
        <motion.p
          className={styles.editorialTagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          SRI LANKAN BORN FULL-STACK ENGINEER &amp; SYSTEM ARCHITECT BASED IN COLOMBO FOCUSING ON DISTRIBUTED SYSTEMS, MODERN WEB EXPERIENCES &amp; SCALABLE ARCHITECTURES.
        </motion.p>

        {/* Clean Rectangular Action Button (Requested [Talk Today] Style) */}
        <motion.div
          className={styles.actionContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="mailto:dilshan.devxx@gmail.com"
            className={styles.talkButton}
          >
            Talk Today
          </a>
        </motion.div>
      </div>
    </section>
  );
}
