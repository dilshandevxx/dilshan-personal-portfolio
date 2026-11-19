import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, ShieldCheck, Terminal, Cpu } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import { siteConfig } from "@/data/siteConfig";
import styles from "./aboutPage.module.css";

export const metadata = {
  title: `About — Dilshan Seneviratne | Systems Architect`,
  description:
    "Full-Stack Engineer and Systems Architect dedicated to crafting resilient distributed infrastructure, AI inference pipelines, and clean digital systems.",
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
    company: "Engineering Studio & Open Infrastructure",
  },
  {
    period: "2022 — 2024",
    role: "Senior Full-Stack & Distributed Systems Engineer",
    company: "Distributed Microservices & Cloud Platforms",
  },
  {
    period: "2020 — 2022",
    role: "Software Engineer — Backend & AI Systems",
    company: "API Gateways, Search Retargeting & Data Pipelines",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.pageRoot}>
      {/* 1. Global Navigation Bar */}
      <SkyLabsNavbar activeTab="about" />

      <main className={styles.mainContainer}>
        {/* Back Link */}
        <div className={styles.topNav}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header Section */}
        <header className={styles.headerSection}>
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>STUDIO &amp; METHODOLOGY</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.metaRole}>FULL-STACK &amp; SYSTEMS ARCHITECT</span>
          </div>

          <h1 className={styles.title}>About Dilshan</h1>

          <p className={styles.subtitle}>
            Full-Stack Engineer &amp; Systems Architect dedicated to crafting resilient
            distributed infrastructure, high-concurrency backends, and tactile digital products.
          </p>
        </header>

        {/* 2. Photo Showcase & Detailed Biography */}
        <div className={styles.storyLayout}>
          {/* ========================================================================= */}
          {/* 📷 DEDICATED PROFILE PHOTO CARD                                           */}
          {/* Note: You can easily update/swap your portrait photo anytime by replacing: */}
          {/*       /public/dilshan_portrait.jpg with your own image file!               */}
          {/* ========================================================================= */}
          <aside className={styles.photoShowcase} aria-label="Profile Portrait">
            <div className={styles.photoFrame}>
              <Image
                src="/dilshan_portrait.jpg"
                alt="Dilshan — Systems Architect & Full-Stack Engineer"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 360px"
                className={styles.portraitPhoto}
              />
              <div className={styles.photoOverlay} />
              <div className={styles.photoBadge}>
                <span className={styles.activeDot} />
                <span>ACTIVE IN PRODUCTION</span>
              </div>
            </div>

            <div className={styles.photoCaption}>
              <span className={styles.captionName}>Dilshan Seneviratne</span>
              <span className={styles.captionRole}>Systems Architect &amp; Open Creator</span>
              <span className={styles.captionHint}>
                [Photo Slot: To update your photo, replace <code>/public/dilshan_portrait.jpg</code>]
              </span>
            </div>
          </aside>

          {/* Narrative Column */}
          <div className={styles.narrativeCol}>
            <p className={styles.leadParagraph}>
              I build software that bridges the gap between mathematically rigorous distributed
              systems and refined, minimalist human interfaces.
            </p>

            <p className={styles.bodyParagraph}>
              My engineering focus centers on high-concurrency backends, low-latency streaming
              retrieval (RAG), vector indexing with PostgreSQL/pgvector, and scalable cloud
              architectures. I believe that production software should feel monolithic, fast,
              and quietly unyielding under load.
            </p>

            <p className={styles.bodyParagraph}>
              When I&apos;m not architecting services or writing code, I cultivate an open digital
              garden of architectural blueprints, benchmarks, and technical writing without ads,
              tracking, or paywalls.
            </p>

            {/* Quick Competency Facts */}
            <div className={styles.factsGrid}>
              <div className={styles.factCard}>
                <span className={styles.factLabel}>Core Focus</span>
                <span className={styles.factValue}>Distributed Systems &amp; Applied AI</span>
              </div>
              <div className={styles.factCard}>
                <span className={styles.factLabel}>Primary Stack</span>
                <span className={styles.factValue}>Python, TypeScript, Go, PostgreSQL</span>
              </div>
              <div className={styles.factCard}>
                <span className={styles.factLabel}>Architecture</span>
                <span className={styles.factValue}>Microservices, Event-Driven, SSE</span>
              </div>
              <div className={styles.factCard}>
                <span className={styles.factLabel}>Location</span>
                <span className={styles.factValue}>Remote / Global Availability</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Core Architectural Values */}
        <section className={styles.valuesSection}>
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

        {/* 4. Experience & Milestones Timeline */}
        <section className={styles.timelineSection}>
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

        {/* 5. Contact CTA Box */}
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

      {/* 6. Global Footer */}
      <MainFooter />
    </div>
  );
}
