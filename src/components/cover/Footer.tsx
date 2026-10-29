"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>SKY LABS</div>
      
      <div className={styles.navLinks}>
        <Link href="/" className={styles.link}>HOME</Link>
        <Link href="/projects" className={styles.link}>PROJECTS</Link>
        <Link href="/shelves" className={styles.link}>SERVICES</Link>
        <Link href="/about" className={styles.link}>STUDIO</Link>
        <Link href="/blog" className={styles.link}>BLOG</Link>
      </div>

      <div className={styles.socialIcons}>
        <a href="https://github.com/dilshandevxx" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialIcon}><FaGithub size={20} /></a>
        <a href="https://linkedin.com/in/heydilshan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}><FaLinkedin size={20} /></a>
        <a href="https://x.com/dilshanverse" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className={styles.socialIcon}><FaTwitter size={20} /></a>
      </div>

      <div className={styles.copyright}>
        © 2026 Sky Labs. Dilshan Seneviratne. All rights reserved.
      </div>
    </footer>
  );
}
