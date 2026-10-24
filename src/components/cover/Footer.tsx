"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>DILSHAN</div>
      
      <div className={styles.navLinks}>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/#work" className={styles.link}>Work</Link>
        <Link href="/projects" className={styles.link}>Projects</Link>
        <Link href="/blog" className={styles.link}>Blog</Link>
        <Link href="/about" className={styles.link}>About</Link>
      </div>

      <div className={styles.socialIcons}>
        <a href="https://linkedin.com/in/heydilshan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}><FaLinkedin size={20} /></a>
        <a href="https://x.com/dilshanverse" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className={styles.socialIcon}><FaTwitter size={20} /></a>
        <a href="https://github.com/dilshandevxx" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialIcon}><FaGithub size={20} /></a>
      </div>

      <div className={styles.copyright}>
        © 2026 Dilshan. All rights reserved.
      </div>
    </footer>
  );
}
