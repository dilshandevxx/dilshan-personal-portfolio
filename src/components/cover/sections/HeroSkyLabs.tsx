"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./HeroSkyLabs.module.css";

export default function HeroSkyLabs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className={styles.heroSection} aria-label="Hero">
      {/* 1. Header / Top Navigation */}
      <header className={styles.headerNav}>
        {/* Brand: Sky Labs [S] */}
        <Link href="/" className={styles.brandLogo} aria-label="Sky Labs Home">
          <div className={styles.brandText}>
            <span>Sky</span>
            <span>Labs</span>
          </div>
          <div className={styles.brandIcon} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.brandIconSvg}
            >
              {/* Geometric square Grotesque 'S' glyph */}
              <path
                d="M5 4h14v5.2H9.2v1.8H19v9H5V14.8h9.8V13H5V4z"
                fill="#090a0c"
              />
            </svg>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navLinks}>
            <li>
              <Link href="/projects" className={styles.navLink}>
                PROJECTS
              </Link>
            </li>
            <li>
              <Link href="/shelves" className={styles.navLink}>
                SERVICES
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.navLink}>
                STUDIO
              </Link>
            </li>
          </ul>

          {/* Warm Caramel / Tan Rectangular Action Button */}
          <a
            href="mailto:dilshandevxx@gmail.com"
            className={styles.ctaButton}
            title="Let's Talk"
          >
            LET&apos;S TALK
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className={styles.mobileMenuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={styles.hamburgerLine}
            style={
              mobileMenuOpen
                ? { transform: "rotate(45deg) translate(4px, 4px)" }
                : {}
            }
          />
          <span
            className={styles.hamburgerLine}
            style={
              mobileMenuOpen
                ? { transform: "rotate(-45deg) translate(4px, -4px)" }
                : {}
            }
          />
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileDrawer}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/projects"
              className={styles.navLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              PROJECTS
            </Link>
            <Link
              href="/shelves"
              className={styles.navLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              SERVICES
            </Link>
            <Link
              href="/about"
              className={styles.navLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              STUDIO
            </Link>
            <a
              href="mailto:dilshandevxx@gmail.com"
              className={styles.ctaButton}
              onClick={() => setMobileMenuOpen(false)}
            >
              LET&apos;S TALK
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Content */}
      <div className={styles.heroContent}>
        {/* Pill Badge: ● EST. 2016 */}
        <motion.div
          className={styles.pillBadge}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.greenDot} aria-hidden="true" />
          <span>EST. 2016</span>
        </motion.div>

        {/* Massive Grotesque Uppercase Headline */}
        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.headlineLine}>CRAFTING DIGITAL</span>
          <span className={styles.headlineLine}>LANDSCAPES. DRIVEN</span>
          <span className={styles.headlineLine}>BY DATA &amp; DESIGN.</span>
        </motion.h1>

        {/* 3. Wide Horizontal Banner Image */}
        <motion.div
          className={styles.bannerContainer}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.bannerWrapper}>
            <Image
              src="/images/hero_phone_flare.jpg"
              alt="Hands holding smartphone horizontally capturing outdoor sunlit scenery"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1400px) 94vw, 1280px"
              className={styles.bannerImage}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
