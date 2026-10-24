"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./HeroLumen.module.css";

export default function HeroLumen() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        setTime(
          now.toLocaleTimeString("en-US", {
            timeZone: "Asia/Colombo",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        );
      } catch {
        setTime("11:00 PM");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.heroWrapper}>
      {/* 1. Top Metadata (Colombo • Live Time) */}
      <motion.div 
        className={styles.topMetadata}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>COLOMBO</span>
        <span>•</span>
        <span className={styles.timeBold}>{time || "11:00 PM"}</span>
      </motion.div>

      {/* 2. Main Hero Body */}
      <div className={styles.heroBody}>
        {/* Left Column: Big Display Headline & Bio */}
        <motion.div 
          className={styles.leftContent}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className={styles.title}>
            <span className={styles.titleLine}>DILSHAN</span>
            <span className={styles.titleLine}>DEV</span>
            <span className={styles.titleLine}>SOFTWARE ENGINEER</span>
          </h1>

          <div className={styles.narrativeRow}>
            <p className={styles.bio}>
              I&apos;m a software engineer and designer based in Colombo, crafting scalable systems, deliberate interfaces, and high-performance digital tools.
            </p>

            {/* Circular Rotating "SEE MY WORK" Badge */}
            <a href="#work" className={styles.rotatingBadge} aria-label="See my work">
              <div className={styles.centerCircle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>

              <svg className={styles.svgTextRing} viewBox="0 0 100 100">
                <defs>
                  <path
                    id="badgeCirclePath"
                    d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                  />
                </defs>
                <text className={styles.ringText}>
                  <textPath href="#badgeCirclePath" startOffset="0%">
                    • SEE MY WORK • SEE MY WORK •
                  </textPath>
                </text>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Fanned-Out Photo Cards Stack */}
        <motion.div 
          className={styles.rightContent}
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.cardStack}>
            {/* Back Card (Black & White Architecture) */}
            <div className={`${styles.stackItem} ${styles.cardBack}`}>
              <Image
                src="/images/blog_arch.png"
                alt="Architecture"
                fill
                sizes="240px"
                className={styles.cardImage}
              />
            </div>

            {/* Middle Card (Editorial Textured Print) */}
            <div className={`${styles.stackItem} ${styles.cardMiddle}`}>
              <Image
                src="/images/about.png"
                alt="Editorial Texture"
                fill
                sizes="240px"
                className={styles.cardImage}
              />
            </div>

            {/* Front Card (Vibrant Portrait in Library) */}
            <div className={`${styles.stackItem} ${styles.cardFront}`}>
              <Image
                src="/dilshan_profile.jpg"
                alt="Dilshan"
                fill
                priority
                sizes="260px"
                className={styles.cardImage}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Bottom Metadata Row (Email & Socials) */}
      <motion.div 
        className={styles.bottomMetadata}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="mailto:dilshan.devxx@gmail.com" className={styles.emailLink}>
          • DILSHAN.DEVXX@GMAIL.COM
        </a>

        <div className={styles.socialRow}>
          <a
            href="https://github.com/dilshandevxx"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialItem}
          >
            • GITHUB
          </a>
          <a
            href="https://linkedin.com/in/heydilshan"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialItem}
          >
            • LINKEDIN
          </a>
          <a
            href="https://x.com/dilshanverse"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialItem}
          >
            • X
          </a>
        </div>
      </motion.div>
    </section>
  );
}
