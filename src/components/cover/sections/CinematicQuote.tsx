"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./CinematicQuote.module.css";

export default function CinematicQuote() {
  return (
    <section className={styles.showcaseSection} aria-label="Craft and Perspective">
      <div className={styles.container}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Crisp, Sharp Image (No blur filters, 100% native clarity) */}
          <div className={styles.imageWrapper}>
            <Image
              src="/images/nespresso_showcase.webp"
              alt="Digital Product Experience Showcase"
              fill
              priority
              quality={95}
              sizes="(max-width: 1280px) 100vw, 1240px"
              className={styles.image}
            />
            {/* Gentle Bottom Gradient Scrim for Clean Text Contrast */}
            <div className={styles.bottomGradient} />
          </div>

          {/* Clean Editorial Content Overlay */}
          <div className={styles.contentOverlay}>
            <span className={styles.eyebrow}>• PERSPECTIVE</span>

            <blockquote className={styles.quote}>
              “Great products live at the intersection of disciplined engineering
              and thoughtful, human craft.”
            </blockquote>

            <div className={styles.author}>
              <span className={styles.authorName}>Dilshan P.</span>
              <span className={styles.separator}>—</span>
              <span className={styles.authorRole}>
                Full-Stack Engineer &amp; System Architect
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
