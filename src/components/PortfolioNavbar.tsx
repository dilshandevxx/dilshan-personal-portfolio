"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./PortfolioNavbar.module.css";

const NAV_ITEMS = [
  { href: "/projects", label: "PROJECTS" },
  { href: "/blog", label: "BLOG" },
  { href: "/shelves", label: "SHELVES" },
  { href: "/about", label: "ABOUT" },
];

export function PortfolioNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Left: Brand Logo (SkyLabs-style text + geometric icon) */}
        <Link href="/" className={styles.brandLink} aria-label="Dilshan Home">
          <div className={styles.brandTextGroup}>
            <span className={styles.brandTop}>Dilshan</span>
            <span className={styles.brandSub}>Dev</span>
          </div>
          {/* Geometric Folded Document / S-Cube Icon matching SkyLabs mark */}
          <div className={styles.logoMarkWrapper}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.logoMarkSvg}
            >
              <rect x="3" y="3" width="22" height="26" rx="2" stroke="currentColor" strokeWidth="2.5" />
              <path d="M19 3L25 9V3H19Z" fill="currentColor" />
              <path d="M19 3V9H25" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path
                d="M9 11H16C17.6569 11 19 12.3431 19 14C19 15.6569 17.6569 17 16 17H9"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 17H17C18.6569 17 20 18.3431 20 20C20 21.6569 18.6569 23 17 23H9"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>

        {/* Right Desktop: Nav Links + Square Caramel LET'S TALK Button */}
        <nav className={styles.desktopNav} aria-label="Portfolio navigation">
          <div className={styles.navLinks}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                >
                  {item.label}
                  {isActive && <span className={styles.activeIndicator} />}
                </Link>
              );
            })}
          </div>

          <a
            href="mailto:dilshandevxx@gmail.com?subject=Project%20Inquiry%20via%20Portfolio"
            className={styles.letsTalkBtn}
          >
            LET&apos;S TALK
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.lineTopOpen : ""}`} />
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.lineBottomOpen : ""}`} />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <div className={styles.mobileNavLinks}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="mailto:dilshandevxx@gmail.com?subject=Project%20Inquiry"
              className={styles.mobileTalkBtn}
              onClick={() => setMobileMenuOpen(false)}
            >
              LET&apos;S TALK
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
export default PortfolioNavbar;
