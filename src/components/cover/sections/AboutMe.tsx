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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left Column: Open breathing space (~36% width matching reference design) */}
          <div className={styles.leftColumn} aria-hidden="true" />

          {/* Right Column: Statement narrative paragraph and green button */}
          <div className={styles.rightColumn}>
            <p className={styles.statementText}>
              I love photography because it allows me to forget about
              everything happening around me every day. I enjoy every moment
              when I can travel, be outside, and discover the beauty of nature or
              interesting places. I try to pay special attention to good
              composition and light, which are the foundation of great
              photography for me.
            </p>

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
