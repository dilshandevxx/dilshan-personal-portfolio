"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./HeroSkyLabs.module.css";

export default function HeroSkyLabs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (currentScrollY < 0) return;

      if (currentScrollY <= 60) {
        setNavVisible(true);
      } else if (windowHeight + currentScrollY >= documentHeight - 100) {
        setNavVisible(false);
      } else if (Math.abs(currentScrollY - lastScrollY) > 6) {
        if (currentScrollY > lastScrollY && !menuOpen) {
          setNavVisible(false);
        } else {
          setNavVisible(true);
        }
      }
      lastScrollY = currentScrollY;

      // Active section spy
      const sectionIds = ["skills", "projects", "articles", "about-me", "faq", "contact"];
      const scrollPos = window.scrollY + 240;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  // Lock body scroll when full menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSlowScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);

    const el = document.getElementById(sectionId);
    if (!el) return;

    const navbarHeight = 80;
    const targetY =
      el.getBoundingClientRect().top + window.scrollY - navbarHeight;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1000;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        window.history.pushState(null, "", `#${sectionId}`);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <section className={styles.heroSection} aria-label="Hero">
      {/* 1. Minimalist Top Navbar (Matching Exact Reference Image) */}
      <header
        className={`${styles.navHeader} ${
          !navVisible && !menuOpen ? styles.navHidden : ""
        } ${menuOpen ? styles.navOpen : ""}`}
      >
        <div className={styles.navContainer}>
          {/* Brand Wordmark & Artistic Monogram Emblem */}
          <Link href="/" className={styles.brandLink} title="dilshan.">
            <span className={styles.brandEmblem} aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.emblemSvg}
              >
                <rect
                  x="2.5"
                  y="2.5"
                  width="19"
                  height="19"
                  rx="5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M7 6.5H12C15 6.5 17 8.5 17 12C17 15.5 15 17.5 12 17.5H7V6.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="1.5" fill="var(--color-primary, #4ade80)" />
              </svg>
            </span>
            <span className={styles.brandWordmark}>
              dilshan<span className={styles.brandDot}>.</span>
            </span>
          </Link>

          {/* Right Navigation: Pure Text Desktop Nav & Mobile Hamburger */}
          <div className={styles.navRight}>
            <nav className={styles.desktopNav} aria-label="Main Navigation">
              <a
                href="#skills"
                onClick={(e) => handleSlowScroll(e, "skills")}
                className={`${styles.navLink} ${
                  activeSection === "skills" ? styles.navLinkActive : ""
                }`}
              >
                Services
              </a>
              <Link
                href="/projects"
                className={`${styles.navLink} ${
                  activeSection === "projects" ? styles.navLinkActive : ""
                }`}
              >
                Projects
              </Link>
              <a
                href="#articles"
                onClick={(e) => handleSlowScroll(e, "articles")}
                className={`${styles.navLink} ${
                  activeSection === "articles" ? styles.navLinkActive : ""
                }`}
              >
                Articles
              </a>
              <Link
                href="/about"
                className={`${styles.navLink} ${
                  activeSection === "about-me" ? styles.navLinkActive : ""
                }`}
              >
                About
              </Link>
              <a
                href="#faq"
                onClick={(e) => handleSlowScroll(e, "faq")}
                className={`${styles.navLink} ${
                  activeSection === "faq" ? styles.navLinkActive : ""
                }`}
              >
                FAQ
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSlowScroll(e, "contact")}
                className={`${styles.navLink} ${styles.navCtaLink} ${
                  activeSection === "contact" ? styles.navLinkActive : ""
                }`}
                title="Get in touch"
              >
                <span>Contact</span>
                <span className={styles.ctaArrow} aria-hidden="true">↗</span>
              </a>
            </nav>

            {/* Minimalist Two-Line Hamburger Button (=) on Mobile */}
            <button
              type="button"
              className={`${styles.hamburgerBtn} ${menuOpen ? styles.hamburgerActive : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
            >
              <span className={styles.barTop} />
              <span className={styles.barBottom} />
            </button>
          </div>
        </div>

        {/* Full-Screen Minimalist Editorial Navigation Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className={styles.menuOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.menuContainer}>
                <nav className={styles.menuNav} aria-label="Overlay Navigation">
                  {[
                    { label: "SERVICES", href: "#skills", isAnchor: true },
                    { label: "PROJECTS", href: "/projects", isAnchor: false },
                    { label: "ARTICLES", href: "#articles", isAnchor: true },
                    { label: "ABOUT", href: "/about", isAnchor: false },
                    { label: "FAQ", href: "#faq", isAnchor: true },
                    { label: "CONTACT", href: "#contact", isAnchor: true },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.35, delay: 0.05 + idx * 0.06 }}
                      className={styles.menuItemWrap}
                    >
                      {item.isAnchor ? (
                        <Link
                          href={item.href}
                          onClick={(e) => handleSlowScroll(e, item.href.replace("#", ""))}
                          className={styles.menuLink}
                        >
                          <span className={styles.menuIndex}>0{idx + 1}</span>
                          <span className={styles.menuLabel}>{item.label}</span>
                        </Link>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={styles.menuLink}
                        >
                          <span className={styles.menuIndex}>0{idx + 1}</span>
                          <span className={styles.menuLabel}>{item.label}</span>
                          <ArrowUpRight size={22} className={styles.menuArrow} />
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Main Hero Content — Left-Aligned Headline Matching Reference */}
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <motion.h1
            className={styles.displayHeadline}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.headlineRow}>Endless passion.</span>
            <span className={styles.headlineRow}>Special moments in time.</span>
          </motion.h1>
        </div>

        {/* 3. Cinematic Looping Banner Video (Retained as Requested) */}
        <motion.div
          className={styles.bannerContainer}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
                src="https://res.cloudinary.com/dqfcsavwj/video/upload/v1782389244/hero-video_dimbpq.webm"
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
