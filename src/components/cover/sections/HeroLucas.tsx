"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./HeroLucas.module.css";
import NavigationMenu from "../NavigationMenu";

export default function HeroLucas() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          {/* 1. Top Navigation Bar (Wave logo mark on left, circular button on right) */}
          <motion.div 
            className={styles.topBar}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/" className={styles.logoLink} aria-label="Home">
              <svg 
                width="34" 
                height="20" 
                viewBox="0 0 34 20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={styles.waveIcon}
              >
                <path d="M2 13C6 8 10 8 14 13C18 18 22 18 26 13C28 10.5 30 10.5 32 12" />
                <path d="M2 7C6 2 10 2 14 7C18 12 22 12 26 7C28 4.5 30 4.5 32 6" />
              </svg>
            </Link>

            <button 
              type="button"
              className={styles.menuButton} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="1" y1="2" x2="17" y2="2" />
                <line x1="1" y1="10" x2="17" y2="10" />
              </svg>
            </button>
          </motion.div>

          {/* 2. Split Typography Header (Left: DILSHAN + bar | Right: descriptor + SENEVIRATNE) */}
          <div className={styles.typographyHeader}>
            <motion.div 
              className={styles.leftColumn}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className={styles.firstName}>DILSHAN</h1>
              <div className={styles.thickBar} />
            </motion.div>

            <motion.div 
              className={styles.rightColumn}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className={styles.descriptorText}>
                A software engineer crafting resilient distributed systems, deliberate interfaces, and high-performance digital tools.
              </p>
              <h2 className={styles.secondName}>SENEVIRATNE</h2>
            </motion.div>
          </div>

          {/* 3. Panoramic Hero Image Banner */}
          <motion.div 
            className={styles.imageBannerWrapper}
            initial={{ opacity: 0, scale: 0.98, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/skyline_twilight.jpg"
              alt="Panoramic Skyline"
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1360px"
              className={styles.bannerImage}
            />
          </motion.div>

          {/* 4. Large Editorial Serif Italic Statement */}
          <motion.div 
            className={styles.statementWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={styles.statementText}>
              Engineering resilient distributed systems and crafting deliberate, high-performance web experiences that bridge architectural rigor with uncompromising aesthetic craft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Accessible Full-Screen Navigation Drawer */}
      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
