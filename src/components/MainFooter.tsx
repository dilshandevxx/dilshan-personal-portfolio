"use client";

import React from "react";
import Link from "next/link";
import {
  FaGithub,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa6";
import { siteConfig } from "@/data/siteConfig";
import styles from "./MainFooter.module.css";

export default function MainFooter() {
  const handleTalkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      e.preventDefault();
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footerWrapper} role="contentinfo" aria-label="Site Footer">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP CALL TO ACTION BANNER (Dark Editorial Section)         */}
      {/* ------------------------------------------------------------- */}
      <section className={styles.ctaSection} aria-label="Call to action">
        <div className={styles.ctaContainer}>
          <a
            href="/#contact"
            onClick={handleTalkClick}
            className={styles.ctaBadge}
            aria-label="Have a project in mind? Contact Dilshan"
          >
            Have a project in mind?
          </a>

          <a
            href="/#contact"
            onClick={handleTalkClick}
            className={styles.ctaHeadlineLink}
            aria-label="Let's Talk"
          >
            Let&apos;s Talk
          </a>

          <div className={styles.ctaUnderline} aria-hidden="true" />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. BOTTOM MULTI-COLUMN FOOTER (Warm Paper Section)            */}
      {/* ------------------------------------------------------------- */}
      <section className={styles.paperFooterSection}>
        <div className={styles.paperContainer}>
          {/* Header Row: Wordmark & Social Icons */}
          <div className={styles.headerRow}>
            <Link href="/" className={styles.brandWordmark} aria-label="Dilshan Home">
              {siteConfig.name}
            </Link>

            <nav className={styles.socialRow} aria-label="Social Profiles">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub Profile"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="X (Twitter) Profile"
              >
                <FaXTwitter size={17} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram Profile"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn Profile"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className={styles.socialLink}
                aria-label="Email Dilshan"
              >
                <FaEnvelope size={17} />
              </a>
            </nav>
          </div>

          {/* Full-width dividing rule */}
          <div className={styles.divider} aria-hidden="true" />

          {/* Columns Grid */}
          <div className={styles.columnsGrid}>
            {/* Column 1: Colophon & Copyright */}
            <div className={styles.colBio}>
              <p className={styles.copyrightText}>
                &copy; 2026 {siteConfig.name}. All rights reserved.
              </p>
              <p className={styles.colophonSubtext}>
                Crafted with care in Sri Lanka.
                <br />
                Software engineering, system architecture &amp; understated web interfaces.
              </p>
            </div>

            {/* Column 2: Website Links */}
            <div className={styles.colNav}>
              <h3 className={styles.colTitle}>Website</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/" className={styles.navLink}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio#projects" className={styles.navLink}>
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio#about" className={styles.navLink}>
                    About
                  </Link>
                </li>
                <li>
                  <a href="/#contact" onClick={handleTalkClick} className={styles.navLink}>
                    Contact
                  </a>
                </li>
                <li>
                  <Link href="/shelves" className={styles.navLink}>
                    Shelves
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio#blog" className={styles.navLink}>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Explore / Portfolio Links */}
            <div className={styles.colNav}>
              <h3 className={styles.colTitle}>Explore</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/portfolio" className={styles.navLink}>
                    Digital Garden
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio#overview" className={styles.navLink}>
                    Architecture
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio#skills" className={styles.navLink}>
                    Technical Notes
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio#life" className={styles.navLink}>
                    Reading Desk
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio#resume" className={styles.navLink}>
                    Resume &amp; CV
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/dilshandevxx/my-lifestyle-portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                  >
                    Source Code
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Availability */}
            <div className={styles.contactInfo}>
              <h3 className={styles.colTitle}>Contact</h3>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className={styles.contactEmail}
              >
                {siteConfig.social.email}
              </a>
              <div className={styles.contactMeta}>
                Colombo, Sri Lanka &bull; UTC+5:30
              </div>
              <div className={styles.statusIndicator}>
                <span className={styles.statusDot} aria-hidden="true" />
                <span>Open for select collaborations</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
