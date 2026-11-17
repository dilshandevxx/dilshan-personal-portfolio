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
        {/* 1. High-Impact Centered Studio Statement & Strict Rectangular Button (matching reference) */}
        <motion.div
          className={styles.statementWrapper}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.statementText}>
            <span className={styles.statementLine}>
              Software engineering, system architecture and digital systems that turn
            </span>
            <span className={styles.statementLine}>
              complex challenges into elegant products.
            </span>
            <span className={styles.statementMuted}>
              Systems which scale under load, honor clarity and quietly endure.
            </span>
          </h2>

          <div className={styles.buttonRow}>
            <Link href="#contact" className={styles.whyButton}>
              WHY DILSHAN?
            </Link>
          </div>
        </motion.div>

        {/* 2. Beautiful Centered Portrait Presentation (Pure, Cinematic, Zero Dots) */}
        <motion.div
          className={styles.portraitWrapper}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.photoFrame}>
            <Image
              src="/images/about_portrait.jpg"
              alt="Dilshan"
              width={1024}
              height={1024}
              priority
              className={styles.photo}
              sizes="(max-width: 768px) 320px, 400px"
            />
            <div className={styles.photoOverlay} />
          </div>

          <div className={styles.authorMeta}>
            <span className={styles.authorName}>DILSHAN</span>
            <span className={styles.authorTitle}>Full-Stack Engineer &amp; System Architect</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
