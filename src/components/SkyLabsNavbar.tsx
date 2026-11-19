"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./SkyLabsNavbar.module.css";

interface SkyLabsNavbarProps {
  activeTab?: "home" | "services" | "projects" | "about" | "contact";
}

export function SkyLabsNavbar({ activeTab }: SkyLabsNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const pathname = usePathname();

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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

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

  return (
    <header
      className={`${styles.navHeader} ${
        !navVisible && !menuOpen ? styles.navHidden : ""
      } ${menuOpen ? styles.navOpen : ""}`}
      role="banner"
    >
      <div className={styles.navContainer}>
        {/* Brand Wordmark: dilshan. */}
        <Link href="/" className={styles.brandLink} title="dilshan.">
          <span className={styles.brandWordmark}>
            dilshan<span className={styles.brandDot}>.</span>
          </span>
        </Link>

        {/* Right Navigation: Desktop Nav Links & Mobile Hamburger */}
        <div className={styles.navRight}>
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            <Link
              href="/#skills"
              className={`${styles.navLink} ${activeTab === "services" ? styles.navLinkActive : ""}`}
            >
              Services
            </Link>
            <Link
              href="/projects"
              className={`${styles.navLink} ${activeTab === "projects" || pathname.startsWith("/projects") ? styles.navLinkActive : ""}`}
            >
              Projects
            </Link>
            <Link href="/#articles" className={styles.navLink}>
              Articles
            </Link>
            <Link
              href="/about"
              className={`${styles.navLink} ${activeTab === "about" || pathname === "/about" ? styles.navLinkActive : ""}`}
            >
              About
            </Link>
            <Link href="/#faq" className={styles.navLink}>
              FAQ
            </Link>

            {/* Architectural Vertical Hairline Divider */}
            <span className={styles.navDivider} aria-hidden="true" />

            {/* Jewel CTA Button with Live Pulse Status Dot */}
            <Link
              href="/#contact"
              className={styles.navCta}
              title="Available for projects & collaboration"
            >
              <span className={styles.statusDot} aria-hidden="true" />
              <span>Contact</span>
            </Link>
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
              <nav className={styles.menuNav} aria-label="Main Navigation">
                {[
                  { label: "SERVICES", href: "/#skills" },
                  { label: "PROJECTS", href: "/projects" },
                  { label: "ARTICLES", href: "/#articles" },
                  { label: "ABOUT", href: "/about" },
                  { label: "FAQ", href: "/#faq" },
                  { label: "CONTACT", href: "/#contact" },
                ].map((item, idx) => {
                  const isActive =
                    (item.label === "SERVICES" && activeTab === "services") ||
                    (item.label === "PROJECTS" && (activeTab === "projects" || pathname.startsWith("/projects"))) ||
                    (item.label === "ABOUT" && (activeTab === "about" || pathname === "/about")) ||
                    (item.label === "CONTACT" && activeTab === "contact");

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.35, delay: 0.05 + idx * 0.06 }}
                      className={styles.menuItemWrap}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`${styles.menuLink} ${isActive ? styles.menuLinkActive : ""}`}
                      >
                        <span className={styles.menuIndex}>0{idx + 1}</span>
                        <span className={styles.menuLabel}>{item.label}</span>
                        <ArrowUpRight size={22} className={styles.menuArrow} />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
