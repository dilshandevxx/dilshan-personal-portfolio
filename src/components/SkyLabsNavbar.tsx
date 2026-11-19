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
        {/* Brand Wordmark: Impress. */}
        <Link href="/" className={styles.brandLink} title="Impress.">
          <span className={styles.brandWordmark}>Impress.</span>
        </Link>

        {/* Minimalist Two-Line Hamburger Button (=) */}
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
                  { label: "ABOUT", href: "/about" },
                  { label: "CONTACT", href: "/#contact" },
                  { label: "PORTFOLIO", href: "/portfolio" },
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
