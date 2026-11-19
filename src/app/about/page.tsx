import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, Sparkles, Terminal, Code2, Database } from "lucide-react";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import { siteConfig } from "@/data/siteConfig";
import styles from "./aboutPage.module.css";

export const metadata = {
  title: `About — Dilshan Seneviratne | Systems Architect & Full-Stack Engineer`,
  description:
    "Full-Stack Engineer & Systems Architect dedicated to crafting resilient distributed systems, AI inference architectures, and tactile digital products.",
};

const VALUES = [
  {
    title: "Zero Compromise on Performance",
    desc: "Obsessive optimization of execution paths, memory boundaries, TTFT latency, and rendering threads.",
  },
  {
    title: "Determinism Over Magic",
    desc: "Explicit architectural boundaries, reproducible state machines, and transparent failure domains.",
  },
  {
    title: "Aesthetic Discipline",
    desc: "Monolithic typography, generous breathing room, rich dark surfaces, and purposeful micro-interactions.",
  },
  {
    title: "Open-Source Mindset",
    desc: "Giving back verified benchmarks, architectural playbooks, and production tools to the developer craft.",
  },
];

const TIMELINE = [
  {
    period: "2024 — PRESENT",
    role: "Lead Systems Architect & Founder",
    company: "Engineering Studio & Open Distributed Infrastructure",
  },
  {
    period: "2022 — 2024",
    role: "Senior Full-Stack & Distributed Systems Engineer",
    company: "Distributed Microservices, Vector Databases & Cloud Platforms",
  },
  {
    period: "2020 — 2022",
    role: "Software Engineer — Backend & AI Systems",
    company: "API Gateways, High-Concurrency Services & Ingestion Pipelines",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.pageRoot}>
      {/* 1. Global Navigation Bar */}
      <SkyLabsNavbar activeTab="about" />

      <main className={styles.mainContainer}>
        {/* Top Back Link */}
        <div className={styles.topNav}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Hero Header Section */}
        <header className={styles.headerSection}>
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>STUDIO &amp; ARCHITECTURE</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.metaRole}>DILSHAN SENEVIRATNE</span>
          </div>

          <h1 className={styles.title}>About Me</h1>

          <p className={styles.subtitle}>
            I love photography because it allows me to forget about everything happening around
            me every day. I enjoy every moment when I can travel, be outside, and discover the beauty
            of nature or interesting places. I try to pay special attention to good composition and
            light, which are the foundation of great photography for me.
          </p>
        </header>

        {/* 2. Dedicated Portrait Photo Card (Naturally embedded, NO sliding panel) */}
        {/* ========================================================================= */}
        {/* 📷 DEDICATED PROFILE PHOTO CARD                                           */}
        {/* You can easily update/swap your portrait photo anytime by updating:       */}
        {/*       /public/dilshan_portrait.jpg with your new image!                   */}
        {/* ========================================================================= */}
        <section className={styles.photoSection} aria-label="Portrait Photo">
          <div className={styles.photoCard}>
            <Image
              src="/dilshan_portrait.jpg"
              alt="Dilshan Seneviratne — Systems Architect"
              fill
              priority
              sizes="(max-width: 920px) 100vw, 920px"
              className={styles.portraitPhoto}
            />
            <div className={styles.photoOverlay} />

            <div className={styles.photoBottomBar}>
              <div className={styles.photoInfo}>
                <span className={styles.photoName}>Dilshan Seneviratne</span>
                <span className={styles.photoRoleText}>
                  Full-Stack Engineer &amp; Systems Architect
                </span>
              </div>

              <div className={styles.statusIndicator}>
                <span className={styles.pulseDot} />
                <span>ACTIVE IN PRODUCTION</span>
              </div>
            </div>
          </div>

          <div className={styles.photoHint}>
            <span>Photo Slot: You can easily update your photo anytime in</span>
            <code>/public/dilshan_portrait.jpg</code>
          </div>
        </section>

        {/* 3. Biography & Narrative Flow */}
        <section className={styles.narrativeSection}>
          <p className={styles.leadParagraph}>
            I design and build software that bridges the gap between mathematically rigorous
            distributed systems and refined, minimalist human experiences.
          </p>

          <p className={styles.bodyParagraph}>
            My engineering work is rooted in high-concurrency backends, low-latency streaming
            retrieval-augmented generation (RAG), vector indexing with PostgreSQL and pgvector,
            and scalable cloud infrastructure. I believe production systems should feel monolithic,
            reliable, and quietly unyielding under load.
          </p>

          <div className={styles.statementQuote}>
            <p className={styles.quoteText}>
              &ldquo;Software should feel fast, deterministic, and durable. We reject visual bloat
              and artificial complexity in favor of crisp architectural precision and understated
              craft.&rdquo;
            </p>
          </div>

          <p className={styles.bodyParagraph}>
            When I am not architecting distributed engines, I curate an open digital garden of
            verified benchmarks, system design patterns, and engineering writing without ads,
            tracking scripts, or paywalls.
          </p>

          {/* Quick Facts / Competencies */}
          <div className={styles.factsGrid}>
            <div className={styles.factCard}>
              <span className={styles.factLabel}>Core Focus</span>
              <span className={styles.factValue}>Distributed Systems</span>
            </div>
            <div className={styles.factCard}>
              <span className={styles.factLabel}>Specialization</span>
              <span className={styles.factValue}>Applied AI &amp; RAG</span>
            </div>
            <div className={styles.factCard}>
              <span className={styles.factLabel}>Primary Stack</span>
              <span className={styles.factValue}>Python, TS, Go, SQL</span>
            </div>
            <div className={styles.factCard}>
              <span className={styles.factLabel}>Availability</span>
              <span className={styles.factValue}>Global / Remote</span>
            </div>
          </div>
        </section>

        {/* 4. Core Engineering Values */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeadingRow}>
            <span className={styles.sectionIndex}>01 / PRINCIPLES</span>
            <h2 className={styles.sectionTitle}>Engineering Values</h2>
          </div>

          <div className={styles.valuesGrid}>
            {VALUES.map((val) => (
              <div key={val.title} className={styles.valueCard}>
                <h3 className={styles.valueTitle}>{val.title}</h3>
                <p className={styles.valueDesc}>{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Career & Milestones Timeline */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeadingRow}>
            <span className={styles.sectionIndex}>02 / EXPERIENCE</span>
            <h2 className={styles.sectionTitle}>Career &amp; Milestones</h2>
          </div>

          <div className={styles.timelineList}>
            {TIMELINE.map((item, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <span className={styles.timelinePeriod}>{item.period}</span>
                <div className={styles.timelineDetails}>
                  <h3 className={styles.timelineRole}>{item.role}</h3>
                  <span className={styles.timelineCompany}>{item.company}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Contact CTA Box */}
        <div className={styles.ctaBox}>
          <div className={styles.ctaText}>
            <h3 className={styles.ctaTitle}>Ready to build something enduring?</h3>
            <p className={styles.ctaSub}>
              Available for high-impact system architecture, distributed engineering, and technical advisory.
            </p>
          </div>

          <div className={styles.ctaButtons}>
            <a
              href={`mailto:${siteConfig.social.email}`}
              className={styles.primaryCta}
            >
              <Mail size={15} />
              <span>Get in Touch</span>
            </a>

            <Link href="/projects" className={styles.secondaryCta}>
              <span>Explore Projects</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <MainFooter />
    </div>
  );
}
