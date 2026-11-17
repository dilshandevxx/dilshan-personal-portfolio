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
        <motion.div
          className={styles.stageGrid}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Statement & Action Column */}
          <div className={styles.statementCol}>
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
                WHY DILSHAN?
              </Link>
            </div>
          </div>

          {/* Integrated Portrait Photo (Clean & Unwrapped) */}
          <div className={styles.portraitCol}>
            <div className={styles.photoFrame}>
              <Image
                src="/dilshan_portrait.jpg"
                alt="Dilshan"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 480px"
                className={styles.portraitPhoto}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
