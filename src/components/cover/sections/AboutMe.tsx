"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./AboutMe.module.css";

const PRINCIPLES = [
  {
    index: "01",
    title: "Architecture Over Abstractions",
    description:
      "Favoring explicit, observable data flow and transparent system boundaries over heavy, opaque frameworks.",
  },
  {
    index: "02",
    title: "Deterministic Performance",
    description:
      "Engineering for predictable tail latencies, memory efficiency, and rock-solid uptime under real production load.",
  },
  {
    index: "03",
    title: "Human-Centered Precision",
    description:
      "Creating distraction-free digital interfaces and clean, readable codebases that respect human attention.",
  },
];

export default function AboutMe() {
  return (
    <section className={styles.aboutSection} id="about-me" aria-label="About Dilshan">
      <div className={styles.container}>
        {/* 1. Header with Badge & Headline */}
        <div className={styles.header}>
          <div className={styles.badgeWrapper}>
            <span className={styles.pillBadge}>
              <span className={styles.badgeDot}>•</span>
              ENGINEER &amp; SYSTEM ARCHITECT
            </span>
          </div>
          <h2 className={styles.title}>About Me</h2>
          <p className={styles.headerSubtitle}>
            Bridging high-throughput backend infrastructure, applied AI intelligence, and precision digital craft.
          </p>
        </div>

        {/* 2. Main Dual-Column Grid */}
        <div className={styles.grid}>
          {/* Left Column: Narrative & Engineering Pillars */}
          <motion.div
            className={styles.leftCol}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Two-Tone Statement */}
            <h3 className={styles.statement}>
              <span className={styles.statementBright}>
                Designing resilient distributed systems and applied AI pipelines{" "}
              </span>
              <span className={styles.statementMuted}>
                with deterministic performance and zero magic abstractions.
              </span>
            </h3>

            {/* Narrative Prose */}
            <div className={styles.narrativeGroup}>
              <p className={styles.paragraph}>
                I&apos;m <strong className={styles.highlight}>Dilshan Ramesh</strong> — a full-stack engineer and system architect based in Sri Lanka, collaborating with high-velocity teams globally. Over the past several years, I have architected across the entire software spectrum: from high-concurrency event-driven microservices and automated cloud infrastructure to grounded LLM retrieval platforms and accessible web clients.
              </p>

              <p className={styles.paragraph}>
                I believe that software longevity depends on clear mental models rather than hype cycles. Whether building production RAG platforms, optimizing Kubernetes cluster telemetry, or crafting responsive client experiences, I focus on clean maintainability, measurable reliability, and purposeful execution.
              </p>
            </div>

            {/* 3 Core Engineering Principles */}
            <div className={styles.principlesSection}>
              <div className={styles.principlesHeader}>// Core Principles</div>
              {PRINCIPLES.map((item) => (
                <div key={item.index} className={styles.principleCard}>
                  <span className={styles.principleIndex}>{item.index}</span>
                  <div className={styles.principleContent}>
                    <h4 className={styles.principleTitle}>{item.title}</h4>
                    <p className={styles.principleDesc}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className={styles.actionRow}>
              <Link href="/projects" className={styles.primaryAction} title="View All Engineering Projects">
                <span>Explore Projects</span>
                <ArrowRight size={14} />
              </Link>
              <Link href="/portfolio" className={styles.secondaryAction} title="Explore Full Portfolio & CV">
                <span>View Full Portfolio</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Editorial Portrait & Technical Specs Card */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Portrait Frame with Floating Status Pill */}
            <div className={styles.imageFrame}>
              <Image
                src="/images/about_portrait.jpg"
                alt="Dilshan Ramesh — Full-Stack Engineer & System Architect"
                width={800}
                height={1000}
                priority
                className={styles.portraitImage}
                sizes="(max-width: 960px) 100vw, 520px"
              />
              <div className={styles.imageOverlay} />

              <div className={styles.statusPill}>
                <span className={styles.statusDot} />
                <span>Available For Hire</span>
              </div>

              <div className={styles.imageCaption}>
                <span className={styles.captionName}>Dilshan Ramesh</span>
                <span className={styles.captionTitle}>Architect // Engineer</span>
              </div>
            </div>

            {/* Quick Specs Card underneath Portrait */}
            <div className={styles.specsCard}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Location</span>
                <span className={styles.specValue}>Sri Lanka (UTC+5:30)</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Availability</span>
                <span className={styles.specValue}>Remote / Global</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Core Domains</span>
                <span className={styles.specValue}>Systems &amp; AI/ML</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Primary Stack</span>
                <span className={styles.specValue}>Python, TS, Go, Docker</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
