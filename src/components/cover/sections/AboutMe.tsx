"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <section className={styles.aboutMeSection} id="about-me">
      <div className={styles.container}>
        {/* Frame matching the Steve Harrington testimonial / portrait design */}
        <div className={styles.aboutCard}>
          {/* Left Column: Narrative Statement + Signature + Rectangular Talk Today Button */}
          <motion.div
            className={styles.contentCol}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.sectionSubtitle}>ABOUT ME</span>

            <p className={styles.statement}>
              &ldquo;I&apos;m passionate about digital design, software architecture, and AI engineering, and enjoy solving complex problems through refined systems and tactile digital experiences with ambitious teams.&rdquo;
            </p>

            <div className={styles.metaRow}>
              <span className={styles.authorTag}>@dilshan</span>
              <span className={styles.roleTag}>Dilshan Ramesh &middot; Systems Architect</span>
            </div>

            <div className={styles.actionRow}>
              <a
                href="mailto:dilshan.devxx@gmail.com"
                className={styles.talkButton}
              >
                Talk Today
              </a>
            </div>
          </motion.div>

          {/* Right Column: High-contrast B&W portrait with SQUARE corners */}
          <motion.div
            className={styles.portraitCol}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={styles.portraitFrame}>
              <div className={styles.portraitWrapper}>
                <Image
                  src="/images/about_portrait.jpg"
                  alt="Dilshan Ramesh — Systems Architect"
                  fill
                  sizes="(max-width: 900px) 100vw, 460px"
                  priority={false}
                  className={styles.portraitImage}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
