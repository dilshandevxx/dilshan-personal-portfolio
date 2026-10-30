"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ModernHeader.module.css";

export function ModernHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "PROJECTS", href: "/projects", isActive: pathname.startsWith("/projects") },
    { label: "SERVICES", href: "/shelves", isActive: pathname.startsWith("/shelves") || pathname.startsWith("/services") },
    { label: "STUDIO", href: "/about", isActive: pathname.startsWith("/about") || pathname.startsWith("/studio") },
    { label: "BLOG", href: "/blog", isActive: pathname.startsWith("/blog") || pathname.startsWith("/notes") },
  ];

  return (
    <header className={styles.headerNav}>
      {/* Brand: Sky Labs [S] */}
      <Link href="/" className={styles.brandLogo} aria-label="Sky Labs Home" onClick={() => setMobileMenuOpen(false)}>
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

      {/* Desktop Navigation Links */}
      <nav className={styles.desktopNav} aria-label="Main Navigation">
        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${item.isActive ? styles.navLinkActive : ""}`}
              >
                {item.label}
                {item.isActive && <span className={styles.activeDot} />}
              </Link>
            </li>
          ))}
        </ul>

        {/* Warm Caramel / Tan Action Button */}
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileNavLink} ${item.isActive ? styles.mobileNavLinkActive : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="mailto:dilshandevxx@gmail.com"
              className={styles.mobileCtaButton}
              onClick={() => setMobileMenuOpen(false)}
            >
              LET&apos;S TALK
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
