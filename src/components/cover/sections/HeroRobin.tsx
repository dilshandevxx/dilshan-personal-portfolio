"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./HeroRobin.module.css";
import NavigationMenu from "../NavigationMenu";

export default function HeroRobin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          {/* 1. Top Navigation Bar: Refined Square Portfolio Button (Left) | Role Tag (Center) | Menu Toggle (Right) */}
          <motion.div 
            className={styles.topBar}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.topLeftArea}>
              <Link href="/projects" className={styles.portfolioBtn}>
                <span className={styles.btnStatusDot} aria-hidden="true" />
                <span className={styles.btnText}>PORTFOLIO</span>
                <span className={styles.arrowBadge} aria-hidden="true">
                  <svg 
                    width="11" 
                    height="11" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={styles.btnArrow}
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </Link>
            </div>

            <div className={styles.topCenterArea}>
              <div className={styles.roleBadge}>
                <span>Software Engineer &amp; Systems Architect</span>
              </div>
            </div>

            <div className={styles.topRightArea}>
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
            </div>
          </motion.div>

          {/* 2. Bold Hero Title */}
          <motion.div 
            className={styles.titleWrapper}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className={styles.headline}>
              <span className={styles.headlineMain}>Hello, I&apos;m Dilshan Seneviratne</span>
              <span className={styles.headlineSub}>an engineer by heart</span>
            </h1>
          </motion.div>

          {/* 3. Three-Photo Asymmetric Lifestyle Collage */}
          <motion.div 
            className={styles.galleryContainer}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left Photo: Tall Vertical Cyclist on Hill Road */}
            <div className={styles.leftPhotoWrapper}>
              <Image 
                src="/images/hero_cyclist.jpg"
                alt="Dilshan cycling on a scenic mountain road with bicycle"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 42vw"
                className={styles.photo}
              />
            </div>

            {/* Right Group: Staggered Kayak on Lake + Skateboarder on Stone Plaza */}
            <div className={styles.rightPhotosWrapper}>
              {/* Middle Photo: Kayaking into open lake */}
              <div className={styles.middlePhotoWrapper}>
                <Image 
                  src="/images/hero_kayak.jpg"
                  alt="Kayaking on calm lake towards evening horizon"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 48vw"
                  className={styles.photo}
                />
              </div>

              {/* Lower-Right Photo: Skateboarder carving across stone plaza pavement */}
              <div className={styles.rightPhotoWrapper}>
                <Image 
                  src="/images/hero_skater.jpg"
                  alt="Skateboarding across textured stone pavement plaza"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 48vw"
                  className={styles.photo}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Accessible Full-Screen Navigation Drawer */}
      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
