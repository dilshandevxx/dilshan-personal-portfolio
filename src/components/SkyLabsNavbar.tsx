"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IoPaw } from "react-icons/io5";
import { useTheme } from "@/components/ThemeContext";
import { cmsDataStore } from "@/services/cmsDataStore";
import styles from "./SkyLabsNavbar.module.css";

interface SkyLabsNavbarProps {
  activeTab?: "home" | "services" | "expertise" | "projects" | "works" | "about";
}

export function SkyLabsNavbar({ activeTab }: SkyLabsNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [ctaText, setCtaText] = useState("Say Hello");
  const [ctaUrl, setCtaUrl] = useState("mailto:dilshan.devxx@gmail.com");
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await cmsDataStore.getGlobalSettings();
        if (settings?.ctaButtonText) setCtaText(settings.ctaButtonText);
        if (settings?.ctaButtonUrl) setCtaUrl(settings.ctaButtonUrl);
      } catch {}
    }
    loadSettings();

    const handleUpdate = () => {
      loadSettings();
    };
    window.addEventListener("cms_settings_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("cms_settings_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

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
        {/* Left Column: Brand Wordmark with Paw Print Theme Toggle */}
        <div className={styles.brandGroup}>
          <button
            type="button"
            onClick={toggleTheme}
            className={styles.pawThemeToggleBtn}
            aria-label={theme === "light" ? "Switch to Night mode" : "Switch to Light mode"}
            title={theme === "light" ? "Switch to Night mode" : "Switch to Light mode"}
          >
            <IoPaw className={styles.brandPawIcon} aria-hidden="true" />
          </button>
          <Link href="/" className={styles.brandTextLink} title="Dilshan Works">
            <span className={styles.brandWordmark}>Dilshan Works</span>
          </Link>
        </div>

        {/* Right Column: Desktop Nav Links ("WORKS", "EXPERTISE", "ABOUT") + CTA */}
        <div className={styles.navRight}>
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            <Link
              href="/#skills"
              className={`${styles.navLink} ${
                activeTab === "services" || activeTab === "expertise"
                  ? styles.navLinkActive
                  : ""
              }`}
            >
              EXPERTISE
            </Link>
            <Link
              href="/projects"
              className={`${styles.navLink} ${
                activeTab === "projects" || activeTab === "works" || pathname.startsWith("/projects")
                  ? styles.navLinkActive
                  : ""
              }`}
            >
              WORKS
            </Link>
            <Link
              href="/about"
              className={`${styles.navLink} ${
                activeTab === "about" || pathname === "/about"
                  ? styles.navLinkActive
                  : ""
              }`}
            >
              ABOUT
            </Link>
          </nav>

          <a href={ctaUrl} className={styles.ctaButton}>
            {ctaText}
          </a>

          {/* Mobile Right Actions: Minimalist Hamburger Button */}
          <div className={styles.mobileActions}>
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
                  { label: "EXPERTISE", href: "/#skills", key: "expertise" },
                  { label: "WORKS", href: "/projects", key: "works" },
                  { label: "ABOUT", href: "/about", key: "about" },
                ].map((item, idx) => {
                  const isActive =
                    ((item.key === "expertise" || item.key === "services") &&
                      (activeTab === "expertise" || activeTab === "services")) ||
                    ((item.key === "works" || item.key === "projects") &&
                      (activeTab === "works" || activeTab === "projects" || pathname.startsWith("/projects"))) ||
                    (item.key === "about" && (activeTab === "about" || pathname === "/about"));

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

                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, delay: 0.25 }}
                  className={styles.menuCtaWrap}
                >
                  <a
                    href={ctaUrl}
                    onClick={() => setMenuOpen(false)}
                    className={styles.menuCtaButton}
                  >
                    {ctaText}
                  </a>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
