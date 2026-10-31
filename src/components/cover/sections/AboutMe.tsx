"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <section className={styles.aboutSection} id="about-me" aria-label="About Me">
      <div className={styles.container}>
        <div className={styles.aboutLayout}>
          {/* Left Column: White dot + ABOUT ME badge */}
          <motion.div
            className={styles.labelCol}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.sectionBadge}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.badgeText}>ABOUT ME</span>
            </div>
          </motion.div>

          {/* Center Column: Bio Statement + Rounded Pill "Let's connect" Button */}
          <motion.div
            className={styles.centerCol}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className={styles.bioStatement}>
              I&apos;m passionate about digital design and art direction, and enjoy solving problems through beautiful designs and experiences with agencies and enthusiastic people
            </p>

            <div className={styles.actionWrapper}>
              <a
                href="mailto:dilshan.devxx@gmail.com"
                className={styles.connectButton}
              >
                Let&apos;s connect
              </a>
            </div>
          </motion.div>

          {/* Right Column: Circular Profile Avatar matching reference */}
          <motion.div
            className={styles.avatarCol}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.avatarCircle}>
              <Image
                src="/images/about_avatar.jpg"
                alt="Dilshan"
                fill
                sizes="170px"
                className={styles.avatarImage}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
