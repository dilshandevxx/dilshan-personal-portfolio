"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./Header.module.css";
import NavigationMenu from "./NavigationMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        {/* Star Logo */}
        <Link href="/" className={styles.logo}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className={styles.starIcon}>
            <line x1="12" y1="2" x2="12" y2="22"></line>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            <line x1="19.07" y1="4.93" x2="4.93" y2="19.07"></line>
          </svg>
          <span>DILSHAN</span>
        </Link>
        
        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav}>
          <Link href="/" className={styles.navLink}>HOME</Link>
          <Link href="/projects" className={styles.navLink}>PROJECTS</Link>
          <Link href="/about" className={styles.navLink}>ABOUT</Link>
          <Link href="/blog" className={styles.navLink}>BLOG</Link>
          <Link href="#contact" className={`${styles.navLink} ${styles.contactLink}`}>
            <span className={styles.navDot}>•</span>
            CONTACT
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={styles.menuButton} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
      
      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
