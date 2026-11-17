"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <section className={styles.aboutSection} id="about-me" aria-label="About Dilshan">
      <div className={styles.ambientSpotlight} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.cinematicStage}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left Column: Typographic Philosophy Statement & Button */}
          <div className={styles.statementCol}>
            <div className={styles.kickerBadge}>
              <span className={styles.kickerLine} aria-hidden="true" />
              <span className={styles.kickerText}>PHILOSOPHY &amp; ARCHITECTURE</span>
            </div>

            <h2 className={styles.statementText}>
              <span className={styles.statementPrimary}>
                Software engineering, system architecture and digital systems that turn
                complex challenges into elegant products.
              </span>
              <span className={styles.statementSecondary}>
                Systems which scale under load, honor clarity and quietly endure.
              </span>
            </h2>

            <div className={styles.actionRow}>
              <Link href="/portfolio/about" className={styles.whyButton}>
                <span>WHY DILSHAN?</span>
                <ArrowUpRight className={styles.buttonArrow} size={15} />
              </Link>

              <div className={styles.authorTag}>
                <span className={styles.authorName}>DILSHAN</span>
                <span className={styles.authorDivider}>/</span>
                <span className={styles.authorTitle}>FULL-STACK &amp; ARCHITECTURE</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Cinematic Portrait (Integrated into Stage) */}
          <div className={styles.portraitCol}>
            <div className={styles.imageFrame}>
              <Image
                src="/dilshan_portrait.jpg"
                alt="Dilshan"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 560px"
                className={styles.portraitPhoto}
              />
              <div className={styles.imageVignette} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
