"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <section className={styles.aboutSection} id="about-me" aria-label="About Dilshan">
      <div className={styles.container}>
        {/* Subtle Mono Category Label (No Big Clunky Title) */}
        <motion.div
          className={styles.headerLabel}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.labelTag}>[ 01 // PERSPECTIVE ]</span>
        </motion.div>

        {/* Seamless Grid: Portrait Photo & Pure Philosophy Quote */}
        <div className={styles.grid}>
          {/* Left: Dilshan's Photo in Natural 1:1 Aspect Ratio */}
          <motion.div
            className={styles.photoCol}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.photoFrame}>
              <Image
                src="/images/about_portrait.jpg"
                alt="Dilshan Ramesh"
                width={1024}
                height={1024}
                priority
                className={styles.photo}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
              />
              <div className={styles.photoOverlay} />
            </div>
            <div className={styles.photoMeta}>
              <span className={styles.metaDot} />
              <span className={styles.metaText}>Dilshan Ramesh // Sri Lanka</span>
            </div>
          </motion.div>

          {/* Right: Thoughtful Quote & Clean Signature */}
          <motion.div
            className={styles.quoteCol}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className={styles.quoteBlock}>
              <p className={styles.quoteLead}>
                &ldquo;Simplicity is prerequisite for reliability.&rdquo;
              </p>
              <p className={styles.quoteFollow}>
                Good architecture doesn&apos;t shout for attention. It subtracts the noise, honors clarity over cleverness, and quietly endures.
              </p>
            </blockquote>

            <div className={styles.authorBadge}>
              <div className={styles.authorLine} />
              <div className={styles.authorContent}>
                <span className={styles.authorName}>Dilshan Ramesh</span>
                <span className={styles.authorTitle}>Full-Stack Engineer &amp; System Architect</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
