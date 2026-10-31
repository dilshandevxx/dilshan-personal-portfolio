"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import MobileProfileHero from "./MobileProfileHero";
import styles from "./HeroSkyLabs.module.css";

export default function HeroSkyLabs() {
  return (
    <section className={styles.heroSection} aria-label="Hero">
      {/* Mobile View: Lincoln Bayo profile reference */}
      <div className={styles.mobileHeroWrapper}>
        <MobileProfileHero />
      </div>

      {/* Desktop View: Exact Aoki reference design with DILSH */}
      <div className={styles.desktopHeroWrapper}>
        <div className={styles.heroContainer}>
          {/* 1. Top Centered Navigation Bar: HOME  /  ABOUT  /  PORTFOLIO */}
          <nav className={styles.topNav} aria-label="Hero Navigation">
            <Link href="/" className={`${styles.topNavLink} ${styles.topNavActive}`}>
              HOME
            </Link>
            <span className={styles.topNavSlash} aria-hidden="true">/</span>
            <Link href="#about-me" className={styles.topNavLink}>
              ABOUT
            </Link>
            <span className={styles.topNavSlash} aria-hidden="true">/</span>
            <Link href="#projects" className={styles.topNavLink}>
              PORTFOLIO
            </Link>
          </nav>

          {/* 2. Top Content Row: Left Framed Photo + Right 3-Photo Gallery */}
          <div className={styles.topRow}>
            {/* Left: Compact Portrait Photo with white border */}
            <motion.div
              className={styles.leftPortraitCol}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.portraitFrame}>
                <div className={styles.photoInner}>
                  <Image
                    src="/images/hero_aoki_portrait.jpg"
                    alt="Dilshan"
                    fill
                    sizes="160px"
                    priority
                    className={styles.framedImage}
                  />
                </div>
              </div>
              <span className={styles.locationTag}>BASED IN SRI LANKA</span>
            </motion.div>

            {/* Right: 3 Compact Vertical Gallery Photos with white border */}
            <motion.div
              className={styles.rightGalleryCol}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.galleryTriptych}>
                {/* Image 1: Architecture */}
                <div className={styles.galleryFrame}>
                  <div className={styles.photoInner}>
                    <Image
                      src="/images/hero_aoki_arch.jpg"
                      alt="Modernist architecture"
                      fill
                      sizes="120px"
                      priority
                      className={styles.framedImage}
                    />
                  </div>
                </div>

                {/* Image 2: Vintage Analog Radio */}
                <div className={styles.galleryFrame}>
                  <div className={styles.photoInner}>
                    <Image
                      src="/images/hero_aoki_analog.jpg"
                      alt="Vintage Braun analog dial"
                      fill
                      sizes="120px"
                      priority
                      className={styles.framedImage}
                    />
                  </div>
                </div>

                {/* Image 3: Sculptural Magnolia Bloom */}
                <div className={styles.galleryFrame}>
                  <div className={styles.photoInner}>
                    <Image
                      src="/images/hero_aoki_botanical.jpg"
                      alt="Sculptural botanical bloom"
                      fill
                      sizes="120px"
                      priority
                      className={styles.framedImage}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3. Bottom Row: DILSH on Left + Welcome Text & Scroll on Right */}
          <div className={styles.bottomRow}>
            {/* Left: DILSH in warm terracotta serif */}
            <motion.div
              className={styles.leftTitleCol}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className={styles.dilshTitle}>DILSH</h1>
            </motion.div>

            {/* Right: Literary Welcome Paragraph + Scroll Link */}
            <motion.div
              className={styles.rightNarrativeCol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className={styles.narrativeParagraph}>
                Welcome to my digital workshop. Where systems are built with mathematical clarity and architectural intent. For scale, for resilience, for the long term &mdash; I&apos;m here to build software that endures.
              </p>
              <Link href="#projects" className={styles.scrollLink}>
                [ SCROLL TO VIEW MORE ]
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
