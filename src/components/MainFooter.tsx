"use client";

import React from "react";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaGlobe,
  FaGithub,
} from "react-icons/fa6";
import { siteConfig } from "@/data/siteConfig";
import styles from "./MainFooter.module.css";

export default function MainFooter() {
  const currentYear = 2026;

  return (
    <footer className={styles.footerRoot} role="contentinfo" aria-label="Site Footer">
      <div className={styles.container}>
        {/* 1. Bold Uppercase Brand Wordmark */}
        <Link href="/" className={styles.brandLogo} aria-label={`${siteConfig.name} Home`}>
          DILSHAN
        </Link>

        {/* 2. Centered Navigation Links */}
        <nav className={styles.navLinks} aria-label="Footer Navigation">
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
          <Link href="/projects" className={styles.navLink}>
            Projects
          </Link>
          <Link href="/portfolio/blog" className={styles.navLink}>
            Notes
          </Link>
          <Link href="/#contact" className={styles.navLink}>
            Contact
          </Link>
        </nav>

        {/* 3. Centered Social Icons (LinkedIn, Instagram, X/Twitter, Globe/GitHub) */}
        <nav className={styles.socialNav} aria-label="Social Profiles">
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconLink}
            aria-label="LinkedIn Profile"
          >
            <FaLinkedinIn size={16} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconLink}
            aria-label="Instagram Profile"
          >
            <FaInstagram size={17} />
          </a>
          <a
            href={siteConfig.social.x}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconLink}
            aria-label="X (Twitter) Profile"
          >
            <FaXTwitter size={15} />
          </a>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconLink}
            aria-label="GitHub Profile"
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://dilshan.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconLink}
            aria-label="Personal Website"
          >
            <FaGlobe size={15} />
          </a>
        </nav>

        {/* 4. Centered Copyright Attribution */}
        <p className={styles.copyrightText}>
          &copy; {currentYear} {siteConfig.name} Senarath. Designed &amp; engineered with care.
        </p>
      </div>
    </footer>
  );
}
