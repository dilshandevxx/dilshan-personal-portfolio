"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./HeroMinimal.module.css";

export default function HeroMinimal() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        {/* LEFT COLUMN: Editorial Statement & Actions */}
        <motion.div 
          className={styles.leftColumn}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status Badge */}
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>AVAILABLE FOR SELECT PROJECTS · 2026</span>
          </div>

          {/* Headline */}
          <h1 className={styles.title}>
            Software Developer,<br />
            Systems Engineer &<br />
            <span className={styles.highlightText}>Visual Craft.</span>
          </h1>

          {/* Bio Narrative */}
          <p className={styles.bio}>
            I craft resilient full-stack systems, deliberate user interfaces, and high-performance digital tools from Colombo, Sri Lanka. Bridging architectural discipline with aesthetic clarity.
          </p>

          {/* Action Group */}
          <div className={styles.actionGroup}>
            <a href="#work" className={styles.primaryBtn}>
              Explore Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </a>
            <a href="mailto:dilshan.devxx@gmail.com" className={styles.secondaryBtn}>
              Get In Touch
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>

          {/* Social Strip */}
          <div className={styles.socialStrip}>
            {/* GitHub */}
            <a
              href="https://github.com/dilshandevxx"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/heydilshan"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/dilshanverse"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="X (Twitter) Profile"
              title="X / Twitter"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Architectural Profile Card */}
        <motion.div 
          className={styles.rightColumn}
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.cardFrame}>
            {/* Card Header Strip */}
            <div className={styles.cardHeader}>
              <span className={styles.monogram}>DILSHAN // 2026</span>
              <span className={styles.coordinates}>06°55&apos;55&quot; N · 79°51&apos;52&quot; E</span>
            </div>

            {/* Portrait + Identity Row */}
            <div className={styles.identityRow}>
              <div className={styles.avatarBox}>
                <Image
                  src="/dilshan_profile.jpg"
                  alt="Dilshan"
                  fill
                  sizes="72px"
                  priority
                  className={styles.avatarImage}
                />
              </div>
              <div className={styles.identityMeta}>
                <h2 className={styles.identityName}>DILSHAN</h2>
                <p className={styles.identityRole}>Full-Stack & Systems Designer</p>
              </div>
            </div>

            {/* Specs Grid */}
            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>SPECIALIZATION</span>
                <span className={styles.specValue}>Full-Stack & Systems</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>CORE STACK</span>
                <span className={styles.specValue}>Next.js · Go · Cloud</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>LOCATION</span>
                <span className={styles.specValue}>Colombo, Sri Lanka</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>AVAILABILITY</span>
                <span className={styles.specValue}>Open for Select Work</span>
              </div>
            </div>

            {/* Stack Tags */}
            <div className={styles.stackTags}>
              <span className={styles.tagPill}>TypeScript</span>
              <span className={styles.tagPill}>Next.js</span>
              <span className={styles.tagPill}>Go</span>
              <span className={styles.tagPill}>PostgreSQL</span>
              <span className={styles.tagPill}>Distributed Systems</span>
              <span className={styles.tagPill}>UI/UX Design</span>
            </div>

            {/* Card Footer */}
            <div className={styles.cardFooter}>
              <span>STATUS</span>
              <div className={styles.liveIndicator}>
                <span className={styles.liveDot} />
                <span>ONLINE & BUILDING</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
