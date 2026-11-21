"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cmsDataStore } from "@/services/cmsDataStore";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  const [statement, setStatement] = useState(
    "I engineer high-throughput machine learning systems, low-latency model inference runtimes, and resilient cloud infrastructure built to perform deterministically under demanding production scale. My approach is simple — remove unnecessary complexity, optimize memory and latency boundaries, and build dependable systems with mathematical rigor."
  );
  const [heading, setHeading] = useState("ABOUT ME");
  const [buttonText, setButtonText] = useState("ABOUT ME");

  useEffect(() => {
    let isMounted = true;
    cmsDataStore
      .getHomepageData()
      .then((data) => {
        if (!isMounted) return;
        if (data.aboutStatement) setStatement(data.aboutStatement);
        if (data.aboutHeading) setHeading(data.aboutHeading);
        if (data.aboutButtonText) setButtonText(data.aboutButtonText);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className={styles.aboutSection} id="about" aria-label="About Dilshan">
      <div className={styles.container}>
        <motion.div
          className={styles.editorialGrid}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left Column: ABOUT ME label */}
          <div className={styles.leftColumn}>
            <div className={styles.missionIndicator}>
              <span className={styles.indicatorLabel}>{heading}</span>
            </div>
          </div>

          {/* Right Column: Bold high-impact statement and action button */}
          <div className={styles.rightColumn}>
            <h2 className={styles.statementText}>{statement}</h2>

            <div className={styles.actionRow}>
              <Link href="/about" className={styles.aboutButton}>
                <span>{buttonText}</span>
                <ArrowUpRight size={14} className={styles.buttonArrow} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
