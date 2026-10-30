"use client";

import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import styles from "./ModernFooter.module.css";

export function ModernFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>DILSHAN RAMESH</div>

      <div className={styles.navLinks}>
        <Link href="/" className={styles.link}>HOME</Link>
        <Link href="/projects" className={styles.link}>WORK</Link>
        <Link href="/about" className={styles.link}>ABOUT</Link>
        <Link href="/#contact" className={styles.link}>CONTACT</Link>
      </div>

      <div className={styles.socialIcons}>
        <a
          href="https://github.com/dilshandevxx"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={styles.socialIcon}
        >
          <FaGithub size={18} />
        </a>
        <a
          href="https://linkedin.com/in/heydilshan"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className={styles.socialIcon}
        >
          <FaLinkedin size={18} />
        </a>
        <a
          href="https://x.com/dilshanverse"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter / X"
          className={styles.socialIcon}
        >
          <FaTwitter size={18} />
        </a>
      </div>

      <div className={styles.copyright}>
        &copy; 2026 Dilshan Ramesh. All rights reserved.
      </div>
    </footer>
  );
}
