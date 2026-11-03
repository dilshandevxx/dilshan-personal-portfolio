"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./HeroSkyLabs.module.css";

export default function HeroSkyLabs() {
  return (
    <section className={styles.heroSection} aria-label="Hero">
      {/* 1. Top Navbar matching SkyLabs reference */}
      <header className={styles.navHeader}>
        <div className={styles.navContainer}>
          {/* Left: SkyLabs Brand Wordmark & Geometric Badge */}
          <Link href="/" className={styles.brandLink}>
            <div className={styles.logoWrapper}>
              <span className={styles.logoText}>
                Sky<br />Labs
              </span>
              <div className={styles.logoBadge} aria-hidden="true">
                <span className={styles.badgeLetter}>S</span>
              </div>
            </div>
          </Link>

          {/* Right: Navigation Links + Warm Tan [LET'S TALK] Button */}
          <div className={styles.navRight}>
            <nav className={styles.navLinks} aria-label="Main Navigation">
              <Link href="#skills" className={styles.navLink}>
                SERVICES
              </Link>
              <Link href="#projects" className={styles.navLink}>
                PROJECTS
              </Link>
              <Link href="#about-me" className={styles.navLink}>
                STUDIO
              </Link>
            </nav>

            <a
              href="mailto:dilshan.devxx@gmail.com"
              className={styles.talkButton}
            >
              LET&apos;S TALK
            </a>
          </div>
        </div>
      </header>

      {/* 2. Main Hero Content */}
      <div className={styles.heroContent}>
        {/* Centered Pill Badge: EST. 2016 with Neon Green Dot */}
        <motion.div
          className={styles.badgeWrapper}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.pillBadge}>
            <span className={styles.greenDot} aria-hidden="true" />
            <span className={styles.badgeLabel}>EST. 2016</span>
          </div>
        </motion.div>

        {/* Massive 3-Line Centered Display Headline */}
        <motion.h1
          className={styles.displayHeadline}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.headlineRow}>CRAFTING DIGITAL</span>
          <span className={styles.headlineRow}>LANDSCAPES. DRIVEN</span>
          <span className={styles.headlineRow}>BY DATA &amp; DESIGN.</span>
        </motion.h1>

        {/* 3. Cinematic Looping Banner Video */}
        <motion.div
          className={styles.bannerContainer}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.bannerFrame}>
            <video
              className={styles.bannerVideo}
              autoPlay
              loop
              muted
              playsInline
              poster="/images/hero_phone_flare.jpg"
            >
              <source
                src="https://res.cloudinary.com/dqfcsavwj/video/upload/v1782389596/walking-people_chkyso.webm"
                type="video/webm"
              />
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <div className={styles.bannerOverlay} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
