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

      {/* Desktop Editorial Hero: Aoki Aesthetic reference with DILSH */}
      <div className={styles.desktopHeroWrapper}>
        <div className={styles.heroContainer}>
          {/* Top Section: Left Portrait & Right 3-Image Gallery */}
          <div className={styles.topRow}>
            {/* Left: Framed Portrait & Location Tag */}
            <motion.div
              className={styles.leftPortraitCol}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.portraitFrame}>
                <div className={styles.photoInner}>
                  <Image
                    src="/images/hero_aoki_portrait.jpg"
                    alt="Dilshan"
                    fill
                    sizes="(max-width: 1200px) 240px, 280px"
                    priority
                    className={styles.framedImage}
                  />
                </div>
              </div>
              <span className={styles.locationTag}>BASED IN SRI LANKA</span>
            </motion.div>

            {/* Right: 3-Image Gallery Triptych */}
            <motion.div
              className={styles.rightGalleryCol}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.galleryTriptych}>
                {/* 1. Architectural Geometry */}
                <div className={styles.galleryFrame}>
                  <div className={styles.photoInner}>
                    <Image
                      src="/images/hero_aoki_arch.jpg"
                      alt="Modernist architectural geometry"
                      fill
                      sizes="200px"
                      priority
                      className={styles.framedImage}
                    />
                  </div>
                </div>

                {/* 2. Vintage Analog Precision Instrument */}
                <div className={styles.galleryFrame}>
                  <div className={styles.photoInner}>
                    <Image
                      src="/images/hero_aoki_analog.jpg"
                      alt="Vintage Braun analog audio dial"
                      fill
                      sizes="200px"
                      priority
                      className={styles.framedImage}
                    />
                  </div>
                </div>

                {/* 3. Sculptural Organic Botanical Bloom */}
                <div className={styles.galleryFrame}>
                  <div className={styles.photoInner}>
                    <Image
                      src="/images/hero_aoki_botanical.jpg"
                      alt="Sculptural white magnolia bloom"
                      fill
                      sizes="200px"
                      priority
                      className={styles.framedImage}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section: Massive DILSH Title & Right Editorial Text */}
          <div className={styles.bottomRow}>
            {/* Left: Massive DILSH Display Serif Title */}
            <motion.div
              className={styles.leftTitleCol}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className={styles.dilshTitle}>DILSH</h1>
            </motion.div>

            {/* Right: Thoughtful Welcome Narrative & Clean Scroll Link */}
            <motion.div
              className={styles.rightNarrativeCol}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
