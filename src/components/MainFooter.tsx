"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUp,
  MapPin,
  Clock,
  ArrowUpRight,
  Mail,
  Activity,
  Terminal,
} from "lucide-react";
import {
  FaLinkedinIn,
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";
import { siteConfig } from "@/data/siteConfig";
import styles from "./MainFooter.module.css";

export default function MainFooter() {
  const currentYear = 2026;
  const [colomboTime, setColomboTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Colombo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date());
        setColomboTime(timeStr);
      } catch {
        setColomboTime("02:50:00 PM");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footerRoot} role="contentinfo" aria-label="Site Footer">
      <div className={styles.container}>
        {/* 1. Top Call-to-Action & Availability Banner */}
        <div className={styles.topBanner}>
          <div className={styles.brandSummary}>
            <Link href="/" className={styles.brandLogo} aria-label="Dilshan Home">
              DILSHAN
            </Link>
            <p className={styles.tagline}>
              AI/ML Engineer &amp; DevOps Architect building deterministic,
              high-throughput systems and resilient Kubernetes cloud platforms.
            </p>
          </div>

          <div className={styles.availabilityCard}>
            <div className={styles.statusRow}>
              <span className={styles.pulsingDot} aria-hidden="true" />
              <span className={styles.statusLabel}>CURRENT STATUS</span>
            </div>
            <p className={styles.statusText}>
              Available for select AI/ML engineering roles &amp; distributed cloud architecture advisory.
            </p>
            <a href="mailto:dilshan.devxx@gmail.com" className={styles.contactCta}>
              <span>Start a Conversation</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* 2. Structured Multi-Column Directory */}
        <div className={styles.directoryGrid}>
          {/* Column 1: Navigation */}
          <div className={styles.directoryCol}>
            <span className={styles.colHeader}>01 / Navigation</span>
            <ul className={styles.linkList}>
              <li>
                <Link href="/" className={styles.dirLink}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.dirLink}>
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/projects" className={styles.dirLink}>
                  Projects Gallery
                </Link>
              </li>
              <li>
                <Link href="/portfolio/blog" className={styles.dirLink}>
                  Technical Essays
                </Link>
              </li>
              <li>
                <Link href="/#contact" className={styles.dirLink}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Capabilities */}
          <div className={styles.directoryCol}>
            <span className={styles.colHeader}>02 / Capabilities</span>
            <ul className={styles.linkList}>
              <li>
                <span className={styles.plainItem}>Neural Model Serving</span>
              </li>
              <li>
                <span className={styles.plainItem}>TensorRT &amp; GPU Execution</span>
              </li>
              <li>
                <span className={styles.plainItem}>Kubernetes GitOps &amp; Operators</span>
              </li>
              <li>
                <span className={styles.plainItem}>RAG &amp; Vector Embeddings</span>
              </li>
              <li>
                <span className={styles.plainItem}>Terraform Infrastructure as Code</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Systems */}
          <div className={styles.directoryCol}>
            <span className={styles.colHeader}>03 / Featured Systems</span>
            <ul className={styles.linkList}>
              <li>
                <Link href="/projects/production-rag-platform" className={styles.dirLink}>
                  Production RAG Platform
                </Link>
              </li>
              <li>
                <Link href="/projects/distributed-llm-inference-platform" className={styles.dirLink}>
                  Distributed LLM Inference
                </Link>
              </li>
              <li>
                <Link href="/projects/real-time-fraud-detection-platform" className={styles.dirLink}>
                  Real-Time Fraud Engine
                </Link>
              </li>
              <li>
                <Link href="/projects/kubernetes-policy-reliability-operator" className={styles.dirLink}>
                  Kubernetes Policy Operator
                </Link>
              </li>
              <li>
                <Link href="/projects/cloudwatch-telemetry" className={styles.dirLink}>
                  CloudWatch Telemetry
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect & Verified Profiles */}
          <div className={styles.directoryCol}>
            <span className={styles.colHeader}>04 / Verified Profiles</span>
            <ul className={styles.linkList}>
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.dirLinkWithIcon}
                >
                  <FaGithub size={14} />
                  <span>GitHub</span>
                  <ArrowUpRight size={12} className={styles.linkArrow} />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.dirLinkWithIcon}
                >
                  <FaLinkedinIn size={14} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} className={styles.linkArrow} />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.dirLinkWithIcon}
                >
                  <FaXTwitter size={14} />
                  <span>X / Twitter</span>
                  <ArrowUpRight size={12} className={styles.linkArrow} />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.social.email}`}
                  className={styles.dirLinkWithIcon}
                >
                  <Mail size={14} />
                  <span>{siteConfig.social.email}</span>
                </a>
              </li>
              <li>
                <Link href="/sitemap.xml" className={styles.dirLinkWithIcon}>
                  <Terminal size={14} />
                  <span>sitemap.xml</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Live Telemetry Strip */}
        <div className={styles.telemetryStrip}>
          <div className={styles.telemetryGroup}>
            <div className={styles.telemetryItem}>
              <MapPin size={13} className={styles.telemetryIcon} />
              <span>Colombo, Sri Lanka</span>
            </div>

            <div className={styles.telemetryDivider}>•</div>

            <div className={styles.telemetryItem}>
              <Clock size={13} className={styles.telemetryIcon} />
              <span>Local Time: {colomboTime || "UTC+05:30"}</span>
            </div>

            <div className={styles.telemetryDivider}>•</div>

            <div className={styles.telemetryItem}>
              <Activity size={13} className={styles.telemetryIcon} />
              <span>Edge Network: Vercel Global</span>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className={styles.backToTopBtn}
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* 4. Bottom Legal Attribution */}
        <div className={styles.bottomBar}>
          <p className={styles.copyrightText}>
            &copy; {currentYear} Dilshan. Built with Next.js 16 (Turbopack) &amp; React 19. Designed &amp; engineered with mathematical rigor.
          </p>
          <div className={styles.bottomMetaLinks}>
            <span className={styles.privacyNote}>Zero Tracking &bull; Privacy First</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
