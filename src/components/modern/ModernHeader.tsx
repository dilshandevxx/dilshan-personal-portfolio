"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./ModernHeader.module.css";

export function ModernHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = pathname === "/";

  const aboutHref = isHome ? "#about-me" : "/#about-me";
  const contactHref = isHome ? "#contact" : "/#contact";

  return (
    <header className={styles.headerNav}>
      {/* Left: Monogram / Name matching Billie Duvalle screenshot */}
      <Link href="/" className={styles.brandTitle} onClick={() => setMobileMenuOpen(false)}>
        DILSHAN RAMESH
      </Link>

      {/* Center: Clean Nav Links (HOME / PROJECTS / ABOUT / CONTACT) */}
      <nav className={styles.desktopNav} aria-label="Main Navigation">
        <ul className={styles.navLinks}>
          <li>
            <Link
              href="/"
              className={`${styles.navLink} ${isHome ? styles.activeNavLink : ""}`}
            >
              HOME
            </Link>
          </li>
          <li className={styles.navSeparator} aria-hidden="true">/</li>
          <li>
            <Link
              href="/projects"
              className={`${styles.navLink} ${pathname === "/projects" ? styles.activeNavLink : ""}`}
            >
              PROJECTS
            </Link>
          </li>
          <li className={styles.navSeparator} aria-hidden="true">/</li>
          <li>
            <Link href={aboutHref} className={styles.navLink}>
              ABOUT
            </Link>
          </li>
          <li className={styles.navSeparator} aria-hidden="true">/</li>
          <li>
            <Link href={contactHref} className={styles.navLink}>
              CONTACT
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right: Year Stamp + PORTFOLIO Action Button */}
      <div className={styles.navRight}>
        <div className={styles.yearStamp} aria-hidden="true">
          &copy;2026
        </div>
        <Link href="/projects" className={styles.portfolioButton}>
          <span>PORTFOLIO</span>
          <ArrowUpRight size={13} className={styles.btnIcon} />
        </Link>

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
      </div>

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
              href="/"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/projects"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              PROJECTS
            </Link>
            <Link
              href={aboutHref}
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              href={contactHref}
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              CONTACT
            </Link>
            <div className={styles.mobileDrawerActions}>
              <Link
                href="/projects"
                className={styles.mobilePortfolioButton}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>PORTFOLIO</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
