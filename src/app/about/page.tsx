"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Cpu,
  Terminal,
  MapPin,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import { siteConfig } from "@/data/siteConfig";
import styles from "./aboutPage.module.css";

const SOCIAL_LINKS = [
  { label: "GitHub", href: siteConfig.social.github },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "X / Twitter", href: siteConfig.social.x },
];

const SKETCHBOOK_ITEMS = [
  {
    id: "akropolis",
    title: "Akropolis & Architectural Studies",
    subtitle: "Observation, perspective, and classical geometry",
    src: "/images/sketchbook/sketchbook_akropolis.png",
    width: 525,
    height: 483,
  },
  {
    id: "sunbather",
    title: "Summer Heat & Stillness",
    subtitle: "Figure, posture, and warm color wash",
    src: "/images/sketchbook/sketchbook_sunbather.png",
    width: 516,
    height: 585,
  },
  {
    id: "blanket",
    title: "The Warmth of Solitude",
    subtitle: "Fabric drapery, folds, and cloistered focus",
    src: "/images/sketchbook/sketchbook_blanket.png",
    width: 516,
    height: 684,
  },
  {
    id: "night-phone",
    title: "Midnight Screen Luminance",
    subtitle: "Ambient light, ritual, and quiet contemplation",
    src: "/images/sketchbook/sketchbook_night_phone.png",
    width: 516,
    height: 387,
  },
];

const SKILL_DOMAINS = [
  {
    icon: Cpu,
    category: "AI & MACHINE LEARNING",
    title: "Intelligence & Inference",
    description:
      "Architecting deep learning models, fine-tuning foundation LLMs, and engineering sub-16ms inference runtimes under high concurrency.",
    skills: [
      "PyTorch & TorchScript",
      "vLLM & TensorRT-LLM",
      "LoRA & QLoRA Fine-Tuning",
      "Distributed DeepSpeed",
      "RAG & Agentic Workflows",
      "pgvector & Qdrant",
      "Model Quantization (INT4/FP8)",
    ],
  },
  {
    icon: Terminal,
    category: "DEVOPS & CLOUD INFRASTRUCTURE",
    title: "Platforms & GitOps",
    description:
      "Automating multi-cloud infrastructure, orchestrating GPU-accelerated Kubernetes clusters, and maintaining zero-downtime CI/CD delivery.",
    skills: [
      "Kubernetes & Helm",
      "Docker & Containerd",
      "Terraform (IaC)",
      "GitHub Actions & GitOps",
      "AWS (EKS, EC2, S3) & GCP",
      "Kafka Streaming",
      "Prometheus & Grafana",
    ],
  },
];

const MILESTONES = [
  {
    year: "2024 — Present",
    role: "Senior AI/ML & DevOps Engineer",
    company: "Autonomous Scale & Systems",
    detail:
      "Leading inference optimization, vLLM multi-GPU serving, and Kubernetes cloud infrastructure for generative AI workloads.",
  },
  {
    year: "2022 — 2024",
    role: "MLOps & Cloud Infrastructure Lead",
    company: "Distributed Systems Lab",
    detail:
      "Designed automated CI/CD pipelines, containerized training pipelines, and managed Kafka event streaming with 99.99% uptime.",
  },
  {
    year: "2020 — 2022",
    role: "Full-Stack Software Engineer",
    company: "Cloud & Web Platforms",
    detail:
      "Engineered high-throughput REST/gRPC backend services, event-driven data ingestion, and modern accessible web interfaces.",
  },
];

export default function AboutPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className={styles.pageRoot}>
      {/* 1. Global Navigation Bar */}
      <SkyLabsNavbar activeTab="about" />

      <main className={styles.mainContainer}>
        {/* Top Back Link */}
        <motion.div
          className={styles.topNav}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* 2. Hero Section: Editorial 2-Column Split (Text & Portrait) */}
        <motion.section
          className={styles.heroSection}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Introduction"
        >
          <div className={styles.heroGrid}>
            {/* Left Column: Title, Identity & Concise Narrative */}
            <div className={styles.heroLeft}>
              <div className={styles.statusPill}>
                <span className={styles.statusDot} />
                <span>Available for AI/ML &amp; DevOps Engineering</span>
              </div>

              <h1 className={styles.heroName}>Dilshan</h1>
              <p className={styles.heroRole}>
                AI/ML Engineer <span className={styles.roleDivider}>/</span> DevOps Architect
              </p>

              <div className={styles.narrativeWrap}>
                <p className={styles.narrativePara}>
                  I engineer high-throughput machine learning systems, low-latency model inference
                  runtimes, and resilient cloud infrastructure built to perform deterministically under
                  demanding production scale.
                </p>

                <p className={styles.narrativePara}>
                  My work bridges both sides of modern engineering: training and fine-tuning neural
                  models, optimizing GPU tensor execution, and automating Kubernetes-native cloud
                  environments with GitOps and Terraform.
                </p>

                <p className={styles.narrativePara}>
                  My approach is simple — remove unnecessary complexity, optimize memory and latency
                  boundaries, and build dependable systems with mathematical rigor.
                </p>
              </div>

              {/* Minimalist Contact & Social Pills */}
              <div className={styles.pillsRow}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`${styles.pillBtn} ${styles.emailPill}`}
                  aria-label="Copy email address"
                  title="Click to copy email"
                >
                  <Mail size={14} className={styles.pillIcon} />
                  <span>{siteConfig.social.email}</span>
                  {copied ? (
                    <Check size={14} className={styles.checkIcon} />
                  ) : (
                    <Copy size={12} className={styles.copyIcon} />
                  )}
                </button>

                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.pillBtn}
                  >
                    <span>{link.label}</span>
                    <ExternalLink size={12} className={styles.pillExternal} />
                  </a>
                ))}
              </div>

              <div className={styles.locationMeta}>
                <MapPin size={13} className={styles.locIcon} />
                <span>Colombo, Sri Lanka &bull; Working Worldwide</span>
              </div>
            </div>

            {/* Right Column: High-End Editorial Portrait */}
            <div className={styles.heroRight}>
              <div className={styles.portraitFrame}>
                <Image
                  src="/images/about_portrait.jpg"
                  alt="Dilshan"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 460px"
                  className={styles.portraitImg}
                />
                <div className={styles.portraitOverlay} />
              </div>
            </div>
          </div>
        </motion.section>

        {/* 3. "From the sketchbook" Section Matching Reference Design */}
        <motion.section
          className={styles.sketchbookSection}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="From the sketchbook"
        >
          <div className={styles.sketchbookHeader}>
            <h2 className={styles.sketchbookTitle}>From the sketchbook</h2>
          </div>

          <div className={styles.sketchbookGrid}>
            {SKETCHBOOK_ITEMS.map((item) => (
              <div key={item.id} className={styles.sketchCard}>
                <div className={styles.sketchImageWrap}>
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    className={styles.sketchImg}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.sketchbookFooter}>
            <Link href="#contact" className={styles.seeMoreLink}>
              <span>SEE MORE DRAWINGS</span>
              <span className={styles.seeMoreArrow} aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </motion.section>

        {/* 3. Bold Editorial Manifesto Quote */}
        <motion.section
          className={styles.quoteSection}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Philosophy Quote"
        >
          <div className={styles.quoteCard}>
            <Sparkles size={20} className={styles.quoteIcon} />
            <blockquote className={styles.quoteText}>
              &ldquo;Engineering resilient intelligence requires disciplined systems thinking — stripping away
              runtime bloat, bounding latency, and letting clean architecture do the heavy lifting.&rdquo;
            </blockquote>
          </div>
        </motion.section>

        {/* 4. Core Engineering Pillars (AI/ML & DevOps) */}
        <motion.section
          className={styles.pillarsSection}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Core Competencies"
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIndex}>01 / CORE COMPETENCIES</span>
            <h2 className={styles.sectionTitle}>Dual Engineering Superpowers</h2>
          </div>

          <div className={styles.pillarsGrid}>
            {SKILL_DOMAINS.map((domain) => {
              const Icon = domain.icon;
              return (
                <div key={domain.category} className={styles.pillarCard}>
                  <div className={styles.pillarHeader}>
                    <div className={styles.pillarIconWrap}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className={styles.pillarCategory}>{domain.category}</span>
                      <h3 className={styles.pillarTitle}>{domain.title}</h3>
                    </div>
                  </div>

                  <p className={styles.pillarDesc}>{domain.description}</p>

                  <div className={styles.chipsWrap}>
                    {domain.skills.map((skill) => (
                      <span key={skill} className={styles.skillChip}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* 5. Minimalist Experience & Career Milestones */}
        <motion.section
          className={styles.timelineSection}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Experience & Milestones"
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIndex}>02 / TRACK RECORD</span>
            <h2 className={styles.sectionTitle}>Experience &amp; Leadership</h2>
          </div>

          <div className={styles.timelineList}>
            {MILESTONES.map((m, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{m.year}</div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineRole}>
                    {m.role} <span className={styles.timelineCompany}>&mdash; {m.company}</span>
                  </h3>
                  <p className={styles.timelineDetail}>{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 6. Clean Call to Action Block */}
        <motion.section
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Get In Touch"
        >
          <div className={styles.ctaBox}>
            <div className={styles.ctaTextWrap}>
              <h2 className={styles.ctaHeading}>Let&apos;s build something exceptional.</h2>
              <p className={styles.ctaSub}>
                Have a project, machine learning architecture, or infrastructure challenge in mind?
                I&apos;m always open to discussing new opportunities and technical advisory.
              </p>
            </div>

            <div className={styles.ctaActions}>
              <a href={`mailto:${siteConfig.social.email}`} className={styles.primaryCtaBtn}>
                <span>Get in Touch</span>
                <ArrowUpRight size={16} />
              </a>
              <Link href="/projects" className={styles.secondaryCtaBtn}>
                <span>Explore Projects</span>
              </Link>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Global Minimalist Footer */}
      <MainFooter />
    </div>
  );
}
