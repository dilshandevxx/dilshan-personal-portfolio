"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./SkyLabsNavbar.module.css";

interface SkyLabsNavbarProps {
  activeTab?: "home" | "services" | "projects" | "about" | "contact";
}

export function SkyLabsNavbar({ activeTab }: SkyLabsNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isProjectsActive = activeTab === "projects" || pathname === "/projects" || pathname?.startsWith("/projects/");

  return (
    <header className={styles.navHeader} role="banner">
      <div className={styles.navContainer}>
        {/* Left: Pure SkyLabs Brand Wordmark & Geometric Badge */}
        <Link href="/" className={styles.brandLink} title="SkyLabs Home">
          <div className={styles.logoWrapper}>
            <span className={styles.logoText}>
              Sky<br />Labs
            </span>
            <div className={styles.logoBadge} aria-hidden="true">
              <span className={styles.badgeLetter}>S</span>
            </div>
          </div>
        </Link>

        {/* Right: Clean Nav Links + Single Refined Rectangular Action Button */}
        <div className={styles.navRight}>
          <nav className={styles.navLinks} aria-label="Main Navigation">
            <Link
              href="/#skills"
              className={`${styles.navLink} ${activeTab === "services" ? styles.navLinkActive : ""}`}
            >
              SERVICES
            </Link>
            <Link
              href="/projects"
              className={`${styles.navLink} ${isProjectsActive ? styles.navLinkActive : ""}`}
            >
              PROJECTS
            </Link>
            <Link
              href="/#about-me"
              className={`${styles.navLink} ${activeTab === "about" ? styles.navLinkActive : ""}`}
            >
              ABOUT
            </Link>
            <Link
              href="/#contact"
              className={`${styles.navLink} ${activeTab === "contact" ? styles.navLinkActive : ""}`}
            >
              CONTACT
            </Link>
          </nav>

          <div className={styles.navActions}>
            <Link href="/portfolio" className={styles.portfolioButton} title="Explore Editorial Portfolio">
              <span>PORTFOLIO</span>
              <ArrowUpRight size={14} className={styles.btnIcon} />
            </Link>
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
                href="/#skills"
                className={styles.mobileNavLink}
                onClick={() => setMobileOpen(false)}
              >
                SERVICES
              </Link>
              <Link
                href="/projects"
                className={`${styles.mobileNavLink} ${isProjectsActive ? styles.mobileNavLinkActive : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                PROJECTS
              </Link>
              <Link
                href="/#about-me"
                className={styles.mobileNavLink}
                onClick={() => setMobileOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                href="/#contact"
                className={styles.mobileNavLink}
                onClick={() => setMobileOpen(false)}
              >
                CONTACT
              </Link>

              <div className={styles.mobileDrawerActions}>
                <Link
                  href="/portfolio"
                  className={styles.mobilePortfolioButton}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>EXPLORE PORTFOLIO</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
