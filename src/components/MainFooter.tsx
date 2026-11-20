"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import styles from "./MainFooter.module.css";

export default function MainFooter() {
  const currentYear = 2026;

  return (
    <footer className={styles.footerRoot} role="contentinfo" aria-label="Site Footer">
      <div className={styles.container}>
        {/* =========================================================================
            LEFT ZONE: Boxed Wordmark Logo + Statement + Copyright + Crafted Badge
            ========================================================================= */}
        <div className={styles.brandZone}>
          {/* Boxed Wordmark Logo matching reference */}
          <Link href="/" className={styles.logoBox} title="Dilshan">
            <span className={styles.logoText}>DILSHAN</span>
          </Link>

          {/* Mission & Engineering Statement */}
          <p className={styles.brandDescription}>
            Dilshan engineers high-throughput machine learning systems, optimizes low-latency
            inference runtimes, and architects resilient cloud infrastructure.
          </p>

          {/* Copyright Line */}
          <div className={styles.copyrightText}>
            @{currentYear} All Rights Reserved to Dilshan.
          </div>

          {/* Crafted By Badge */}
          <div className={styles.craftedBadge}>
            <span>Website crafted with</span>
            <span className={styles.heartIcon} aria-hidden="true">❤</span>
            <span>by</span>
            <span className={styles.craftedAuthor}>dilshan</span>
          </div>
        </div>

        {/* =========================================================================
            RIGHT ZONE: 3 Clean Vertical Link Columns (EXPLORE, DOMAINS, SOCIALS)
            ========================================================================= */}
        <div className={styles.columnsZone}>
          {/* Column 1: EXPLORE */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>EXPLORE</h4>
            <ul className={styles.columnList}>
              <li>
                <Link href="/" className={styles.footerLink}>
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/projects" className={styles.footerLink}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.footerLink}>
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/portfolio/blog" className={styles.footerLink}>
                  Articles &amp; Notes
                </Link>
              </li>
              <li>
                <Link href="/#contact" className={styles.footerLink}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: DOMAINS (matching INDUSTRIES in reference) */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>DOMAINS</h4>
            <ul className={styles.columnList}>
              <li>
                <Link href="/projects" className={styles.footerLink}>
                  AI &amp; Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/projects" className={styles.footerLink}>
                  DevOps &amp; Kubernetes
                </Link>
              </li>
              <li>
                <Link href="/projects" className={styles.footerLink}>
                  Model Inference &amp; RAG
                </Link>
              </li>
              <li>
                <Link href="/projects" className={styles.footerLink}>
                  Distributed Cloud
                </Link>
              </li>
              <li>
                <Link href="/projects" className={styles.footerLink}>
                  GPU Optimization
                </Link>
              </li>
              <li>
                <Link href="/projects" className={styles.footerLink}>
                  High-Throughput Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: SOCIALS */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>SOCIALS</h4>
            <ul className={styles.columnList}>
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.social.email}`}
                  className={styles.footerLink}
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
