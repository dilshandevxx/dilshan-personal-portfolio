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
          className={styles.statementWrapper}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Centered Editorial Statement (Faithfully matching Reference Image) */}
          <h2 className={styles.statementText}>
            Branding, design and digital systems that turn businesses into brands.
            Brands which enrich lives, nature and founders.
          </h2>

          {/* Centered Neon Lime-Green Pill Button Linking to Detailed About Page */}
          <div className={styles.actionRow}>
            <Link href="/about" className={styles.whyButton}>
              WHY US?
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
