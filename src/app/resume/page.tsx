'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/content';
import {
  ArrowLeft,
  Printer,
  Mail,
  ExternalLink,
  Globe,
  MapPin,
} from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { SkyLabsNavbar } from '@/components/SkyLabsNavbar';
import MainFooter from '@/components/MainFooter';
import styles from './resume.module.css';

export default function ResumeRoutePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ backgroundColor: '#111111', minHeight: '100vh', width: '100%' }}>
      <SkyLabsNavbar />
      <div className={styles.cvWrapper}>
        {/* ------------------------------------------------------------- */}
        {/* 1. TOP TOOLBAR (Hidden when printing)                         */}
        {/* ------------------------------------------------------------- */}
        <div className={styles.toolbar} role="region" aria-label="Resume toolbar">
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>
              <ArrowLeft size={14} />
              <span>Home</span>
            </Link>
            <span aria-hidden="true">/</span>
            <span className={styles.breadcrumbCurrent}>Curriculum Vitae</span>
          </div>

          <div className={styles.toolbarActions}>
            <a
              href="mailto:dilshan.devxx@gmail.com"
              className={styles.emailBtn}
              title="Send Email"
            >
              <Mail size={13} />
              <span>dilshan.devxx@gmail.com</span>
            </a>

          <button
            type="button"
            onClick={handlePrint}
            aria-label="Print or save Curriculum Vitae as PDF"
            className={styles.printBtn}
          >
            <Printer size={14} className={styles.printIcon} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. THE CV DOCUMENT                                            */}
      {/* ------------------------------------------------------------- */}
      <article className={styles.cvPaper} aria-label="Curriculum Vitae Document">
        {/* Header Block */}
        <header className={styles.cvHeader}>
          <div className={styles.headerMain}>
            <h1 className={styles.candidateName}>{siteConfig.name}</h1>
            <p className={styles.candidateTitle}>{siteConfig.title}</p>
            <p className={styles.candidateMeta}>
              <MapPin size={13} aria-hidden="true" />
              <span>Colombo, Sri Lanka &bull; Available Worldwide for Senior Engineering &amp; Advisory</span>
            </p>
          </div>

          <div className={styles.contactStrip}>
            <div>
              <a
                href="mailto:hello@dilshan.dev"
                className={styles.contactLink}
                title="Email Dilshan"
              >
                <Mail size={12} aria-hidden="true" />
                <span>hello@dilshan.dev</span>
              </a>
            </div>
            <div>
              <a
                href="https://dilshan.dev"
                className={styles.contactLink}
                title="Personal Website"
              >
                <Globe size={12} aria-hidden="true" />
                <span>dilshan.dev</span>
              </a>
            </div>
            <div>
              <a
                href="https://github.com/dilshandevxx"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
                title="GitHub Profile"
              >
                <FaGithub size={12} aria-hidden="true" />
                <span>github.com/dilshandevxx</span>
              </a>
            </div>
            <div>
              <a
                href="https://linkedin.com/in/heydilshan"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
                title="LinkedIn Profile"
              >
                <FaLinkedinIn size={12} aria-hidden="true" />
                <span>linkedin.com/in/heydilshan</span>
              </a>
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        <section className={styles.section} aria-labelledby="sec-summary">
          <h2 id="sec-summary" className={styles.sectionHeading}>
            Executive Summary
          </h2>
          <p className={styles.summaryText}>
            Full-stack software engineer and systems architect with 5+ years of experience designing high-throughput distributed backends, resilient event-driven architectures, and fast, accessible modern web clients. Dedicated to clean engineering craft: favoring explicit systems over brittle abstractions, ensuring sub-50ms deterministic latencies, and crafting digital interfaces that respect user attention.
          </p>
        </section>

        {/* Core Competencies / Technical Skills */}
        <section className={styles.section} aria-labelledby="sec-skills">
          <h2 id="sec-skills" className={styles.sectionHeading}>
            Technical Competencies
          </h2>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCategoryRow}>
              <span className={styles.skillCategoryName}>Languages &amp; Runtimes</span>
              <span className={styles.skillItemsText}>
                Go (Golang), TypeScript, JavaScript (ESNext), Python, SQL (PostgreSQL / SQLite), Rust (Tooling)
              </span>
            </div>
            <div className={styles.skillCategoryRow}>
              <span className={styles.skillCategoryName}>Web &amp; UI Architecture</span>
              <span className={styles.skillItemsText}>
                Next.js (App Router), React 19, Server Components, Tailwind CSS, Semantic HTML5, WAI-ARIA, Design Systems, Core Web Vitals
              </span>
            </div>
            <div className={styles.skillCategoryRow}>
              <span className={styles.skillCategoryName}>Distributed &amp; Backend</span>
              <span className={styles.skillItemsText}>
                Microservices, Event-Driven Architecture, Apache Kafka, Redis, PostgreSQL (Indexing &amp; Partitioning), REST &amp; gRPC APIs
              </span>
            </div>
            <div className={styles.skillCategoryRow}>
              <span className={styles.skillCategoryName}>Cloud, DevOps &amp; Tooling</span>
              <span className={styles.skillItemsText}>
                Docker, Kubernetes, Linux Internals, CI/CD Automation (GitHub Actions), Observability (Prometheus / Grafana), Git, Vitest, Jest
              </span>
            </div>
          </div>
        </section>

        {/* Professional Experience */}
        <section className={styles.section} aria-labelledby="sec-experience">
          <h2 id="sec-experience" className={styles.sectionHeading}>
            Professional Experience
          </h2>

          <div className={styles.timelineList}>
            {/* Role 1 */}
            <article className={styles.experienceItem}>
              <div className={styles.itemHeader}>
                <h3 className={styles.roleTitle}>
                  Senior Systems Engineer — <span className={styles.companyName}>Distributed Infrastructure &amp; Cloud Platforms</span>
                </h3>
                <span className={styles.itemPeriod}>2024 — Present &bull; Colombo / Remote</span>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Architected and deployed event-driven ingestion platform in Go and Apache Kafka handling 100K+ concurrent event streams with under 45ms P99 latency.
                </li>
                <li className={styles.bulletItem}>
                  Optimized PostgreSQL schema partition pruning and caching strategies, reducing database IOPS spikes by 40% and cutting average query latency from 180ms to 42ms.
                </li>
                <li className={styles.bulletItem}>
                  Led design-system standardisation across web clients, implementing accessible keyboard navigation, WAI-ARIA compliance, and zero-flash theme persistence.
                </li>
                <li className={styles.bulletItem}>
                  Standardized continuous delivery pipelines using Docker and Kubernetes, decreasing production deployment cycle times from 25 minutes to under 4 minutes.
                </li>
              </ul>
              <div className={styles.techPillsRow} aria-label="Technologies used">
                {["Go", "TypeScript", "Next.js", "Docker", "PostgreSQL", "Kafka", "Kubernetes"].map((tech) => (
                  <span key={tech} className={styles.techPill}>{tech}</span>
                ))}
              </div>
            </article>

            {/* Role 2 */}
            <article className={styles.experienceItem}>
              <div className={styles.itemHeader}>
                <h3 className={styles.roleTitle}>
                  Software Engineer — <span className={styles.companyName}>Modern Web &amp; Enterprise Solutions</span>
                </h3>
                <span className={styles.itemPeriod}>2022 — 2024 &bull; Colombo, Sri Lanka</span>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Engineered modular React 18/Next.js customer dashboards used by enterprise teams, ensuring zero Cumulative Layout Shift (CLS) and sub-second load times.
                </li>
                <li className={styles.bulletItem}>
                  Migrated high-traffic legacy monolithic endpoints to modern decoupled Node.js and GraphQL microservices, trimming network payload sizes by 35%.
                </li>
                <li className={styles.bulletItem}>
                  Built robust data validation layers using Zod and TypeScript, eliminating runtime data type mismatches across frontend and backend boundaries.
                </li>
              </ul>
              <div className={styles.techPillsRow} aria-label="Technologies used">
                {["React", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS", "Redis", "PostgreSQL"].map((tech) => (
                  <span key={tech} className={styles.techPill}>{tech}</span>
                ))}
              </div>
            </article>

            {/* Role 3 */}
            <article className={styles.experienceItem}>
              <div className={styles.itemHeader}>
                <h3 className={styles.roleTitle}>
                  Associate Software Engineer — <span className={styles.companyName}>Technology Consultancy &amp; Research Lab</span>
                </h3>
                <span className={styles.itemPeriod}>2020 — 2022 &bull; Colombo, Sri Lanka</span>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Collaborated on customer-facing web applications, wrote rigorous automated unit and integration tests with Jest, achieving over 85% branch coverage.
                </li>
                <li className={styles.bulletItem}>
                  Contributed to developer CLI tools and automated Docker testing environments, improving onboarding velocity for incoming engineering cohorts.
                </li>
              </ul>
              <div className={styles.techPillsRow} aria-label="Technologies used">
                {["JavaScript", "Python", "React", "REST APIs", "Docker", "Jest", "Git"].map((tech) => (
                  <span key={tech} className={styles.techPill}>{tech}</span>
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* Featured Architectural Projects */}
        <section className={styles.section} aria-labelledby="sec-projects">
          <h2 id="sec-projects" className={styles.sectionHeading}>
            Key Architectural Projects
          </h2>

          <div className={styles.projectsList}>
            <div className={styles.projectRow}>
              <div className={styles.projectHeader}>
                <a
                  href="https://github.com/dilshandevxx/my-lifestyle-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectTitleLink}
                >
                  <span>dilshan.dev &bull; Personal Engineering Portfolio</span>
                  <ExternalLink size={12} style={{ display: "inline", marginLeft: 4 }} />
                </a>
                <span className={styles.projectMeta}>UI &amp; Architecture &bull; 2026</span>
              </div>
              <p className={styles.projectDesc}>
                Editorial digital garden and software engineering portfolio built with Next.js App Router, TypeScript, and CSS tokens. Features synchronous anti-flash theme scripts, accessible mobile drawers, and sub-100ms static prerendering.
              </p>
              <div className={styles.techPillsRow}>
                {["Next.js", "React 19", "TypeScript", "Tailwind CSS"].map((s) => (
                  <span key={s} className={styles.techPill}>{s}</span>
                ))}
              </div>
            </div>

            <div className={styles.projectRow}>
              <div className={styles.projectHeader}>
                <span className={styles.projectTitleLink}>
                  Production RAG Architecture &amp; Reranking Platform
                </span>
                <span className={styles.projectMeta}>AI / ML &bull; 2025</span>
              </div>
              <p className={styles.projectDesc}>
                High-throughput retrieval-augmented generation engine with hybrid vector search, cross-encoder reranking, and dynamic query routing. Achieves sub-60ms retrieval across 500K+ technical documents.
              </p>
              <div className={styles.techPillsRow}>
                {["Python", "FastAPI", "Qdrant", "vLLM", "Docker"].map((s) => (
                  <span key={s} className={styles.techPill}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education & Distinction */}
        <section className={styles.section} aria-labelledby="sec-education">
          <h2 id="sec-education" className={styles.sectionHeading}>
            Education &amp; Distinction
          </h2>

          <div className={styles.educationItem}>
            <div className={styles.institutionRow}>
              <h3 className={styles.degreeTitle}>
                B.Sc. (Hons) in Computer Science &amp; Software Engineering
              </h3>
              <span className={styles.honorsBadge}>First Class Honors / Distinction &bull; 2018 — 2022</span>
            </div>
            <p className={styles.summaryText} style={{ fontSize: "0.9rem" }}>
              Faculty of Computing &amp; Information Technology
            </p>
            <p className={styles.courseworkText}>
              Core Focus: Distributed Computing &amp; Parallel Systems, Database Internals &amp; Indexing, Operating Systems &amp; Compiler Design, Human-Computer Interaction (HCI).
            </p>
          </div>
        </section>
      </article>
      </div>
      <MainFooter />
    </div>
  );
}
