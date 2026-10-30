"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ModernHeader.module.css";

export function ModernHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = pathname === "/";

  const workHref = isHome ? "#projects" : "/projects";
  const aboutHref = isHome ? "#about-me" : "/about";
  const contactHref = isHome ? "#contact" : "/#contact";

  return (
    <header className={styles.headerNav}>
      {/* Left: Monogram / Name matching Billie Duvalle screenshot */}
      <Link href="/" className={styles.brandTitle} onClick={() => setMobileMenuOpen(false)}>
        DILSHAN RAMESH
      </Link>

      {/* Center: Clean Nav Links (WORK  ABOUT  CONTACT) */}
      <nav className={styles.desktopNav} aria-label="Main Navigation">
        <ul className={styles.navLinks}>
          <li>
            <Link href={workHref} className={styles.navLink}>
              WORK
            </Link>
          </li>
          <li>
            <Link href={aboutHref} className={styles.navLink}>
              ABOUT
            </Link>
          </li>
          <li>
            <Link href={contactHref} className={styles.navLink}>
              CONTACT
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right: Year Stamp */}
      <div className={styles.yearStamp} aria-hidden="true">
        &copy;2026
      </div>

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
              href={workHref}
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              WORK
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
