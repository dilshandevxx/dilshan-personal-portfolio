"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./HeroSkyLabs.module.css";

export default function HeroSkyLabs() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // ScrollSpy for landing sections
      const sections = ["skills", "about-me", "contact"];
      const scrollPos = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 260) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.heroSection} aria-label="Hero">
      {/* 1. Swiss Architectural Navbar */}
      <header className={styles.navHeader}>
        <div className={styles.navContainer}>
          {/* Left: Pure SkyLabs Brand Wordmark, Geometric [S] Badge & Status Tag */}
          <Link href="/" className={styles.brandLink}>
            <div className={styles.logoWrapper}>
              <span className={styles.logoText}>
                Sky<br />Labs
              </span>
              <div className={styles.logoBadge} aria-hidden="true">
                <span className={styles.badgeLetter}>S</span>
              </div>
            </div>
            <div className={styles.brandMeta}>
              <span className={styles.brandMetaDot} />
              <span className={styles.brandMetaText}>AVAILABLE FOR WORK</span>
            </div>
          </Link>

          {/* Right: Architectural Nav Links + Crisp Rectangular Action Buttons */}
          <div className={styles.navRight}>
            <nav className={styles.navLinks} aria-label="Main Navigation">
              <Link
                href="#skills"
                className={`${styles.navLink} ${activeSection === "skills" ? styles.navLinkActive : ""}`}
              >
                <span className={styles.navIndex}>01</span>
                <span className={styles.navText}>SERVICES</span>
              </Link>
              <Link href="/projects" className={styles.navLink}>
                <span className={styles.navIndex}>02</span>
                <span className={styles.navText}>PROJECTS</span>
              </Link>
              <Link
                href="#about-me"
                className={`${styles.navLink} ${activeSection === "about-me" ? styles.navLinkActive : ""}`}
              >
                <span className={styles.navIndex}>03</span>
                <span className={styles.navText}>ABOUT</span>
              </Link>
              <Link
                href="#contact"
                className={`${styles.navLink} ${activeSection === "contact" ? styles.navLinkActive : ""}`}
              >
                <span className={styles.navIndex}>04</span>
                <span className={styles.navText}>CONTACT</span>
              </Link>
            </nav>

            <div className={styles.navActions}>
              <Link href="/projects" className={styles.portfolioButton}>
                <span>PORTFOLIO</span>
                <ArrowUpRight size={13} className={styles.btnIcon} />
              </Link>

              <a
                href="mailto:dilshan.devxx@gmail.com"
                className={styles.talkButton}
              >
                <span>LET&apos;S TALK</span>
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className={styles.mobileToggleBtn}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={styles.mobileDrawer}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.mobileDrawerInner}>
                <Link
                  href="#skills"
                  className={styles.mobileNavLink}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={styles.mobileNavIndex}>01</span>
                  <span>SERVICES</span>
                </Link>
                <Link
                  href="/projects"
                  className={styles.mobileNavLink}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={styles.mobileNavIndex}>02</span>
                  <span>PROJECTS</span>
                </Link>
                <Link
                  href="#about-me"
                  className={styles.mobileNavLink}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={styles.mobileNavIndex}>03</span>
                  <span>ABOUT</span>
                </Link>
                <Link
                  href="#contact"
                  className={styles.mobileNavLink}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={styles.mobileNavIndex}>04</span>
                  <span>CONTACT</span>
                </Link>

                <div className={styles.mobileDrawerActions}>
                  <Link
                    href="/projects"
                    className={styles.mobilePortfolioButton}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>PORTFOLIO</span>
                    <ArrowUpRight size={14} />
                  </Link>
                  <a
                    href="mailto:dilshan.devxx@gmail.com"
                    className={styles.mobileTalkButton}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>LET&apos;S TALK</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
