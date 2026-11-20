"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  Copy,
  Check,
  Terminal,
  Cpu,
  Layers,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import { siteConfig } from "@/data/siteConfig";
import styles from "./aboutPage.module.css";

const SOCIAL_LINKS = [
  { label: "GitHub", href: siteConfig.social.github },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "Twitter / X", href: siteConfig.social.x },
  { label: "Facebook", href: siteConfig.social.facebook },
];

const ARCHITECTURE_HIGHLIGHTS = [
  {
    title: "Distributed Model Training & GPU Profiling",
    tag: "INFRASTRUCTURE & COMPUTE",
    description:
      "Multi-node GPU orchestration, memory profiling, and distributed tensor synchronization with PyTorch and DeepSpeed.",
    image: "/images/insight_portfolio_hd.jpg",
  },
  {
    title: "Cloud Infrastructure & Resilient Pipelines",
    tag: "KUBERNETES & GITOPS",
    description:
      "Production-grade microservice orchestration, event-driven streaming with Kafka, and automated GitOps deployments.",
    image: "/images/blog_arch.png",
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
      {/* 1. Global Clean Navigation Bar (No Side Panel) */}
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
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* 2. Hero Identity & Clean Narrative (Inspired by Reference Design) */}
        <motion.section
          className={styles.heroSection}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Introduction"
        >
          <div className={styles.heroHeader}>
            <span className={styles.roleBadge}>AI/ML ENGINEER &amp; DEVOPS ARCHITECT</span>
            <h1 className={styles.heroName}>Dilshan Seneviratne</h1>
          </div>

          <div className={styles.narrativeStack}>
            <p className={styles.narrativeLead}>
              I&apos;m an AI/ML Engineer and DevOps Architect focused on building high-throughput machine
              learning systems, scalable model inference runtimes, and resilient cloud infrastructure.
            </p>

            <p className={styles.narrativeBody}>
              I specialize in end-to-end model workflows — from fine-tuning foundation models and training
              distributed neural networks to designing low-latency inference pipelines, high-dimensional vector
              indexing, and production RAG systems.
            </p>

            <p className={styles.narrativeBody}>
              My engineering philosophy is simple — remove unnecessary complexity, optimize GPU and memory
              boundaries, and construct automated Kubernetes-native cloud infrastructure that scales
              deterministically under extreme production load.
            </p>

            <p className={styles.narrativeBody}>
              Over the years, I have engineered mission-critical ML pipelines, distributed backends, and
              automated cloud deployments for startups, research teams, and scale-ups globally.
            </p>
          </div>

          {/* Clean Interactive Pill Buttons Row (Matching Reference Design) */}
          <div className={styles.pillsRow}>
            {/* Direct Email Pill */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className={`${styles.pillBtn} ${styles.emailPill}`}
              aria-label="Copy email address"
              title="Click to copy email"
            >
              <Mail size={14} className={styles.pillIcon} />
              <span className={styles.pillText}>{siteConfig.social.email}</span>
              {copied ? (
                <Check size={14} className={styles.checkIcon} />
              ) : (
                <Copy size={13} className={styles.copyIcon} />
              )}
            </button>

            {/* Social Profile Pills */}
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
        </motion.section>

        {/* 3. Personal Manifesto & Editorial Statement (Inspired by Reference Typography) */}
        <motion.section
          className={styles.manifestoSection}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Philosophy"
        >
          <div className={styles.manifestoInner}>
            <p className={styles.manifestoText}>
              I build machine learning and distributed systems because true engineering lives at the
              intersection of mathematical rigor and operational discipline. I enjoy every moment spent
              optimizing tensor execution, designing deterministic pipelines, and stripping away
              unnecessary runtime bloat. Focusing on clean composition, bounded queues, and fault-tolerant
              resilience is the foundation of great engineering for me.
            </p>
          </div>
        </motion.section>

        {/* 4. Dual Technical Pillars: AI/ML Engineering & DevOps / Cloud Infrastructure */}
        <motion.section
          className={styles.pillarsSection}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Core Competencies"
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIndex}>01 / DOMAIN MASTERY</span>
            <h2 className={styles.sectionTitle}>Dual Engineering Superpowers</h2>
          </div>

          <div className={styles.pillarsGrid}>
            {/* Pillar 1: AI/ML Engineering */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIconWrap}>
                  <Cpu size={22} />
                </div>
                <div>
                  <span className={styles.pillarSub}>SPECIALIZATION</span>
                  <h3 className={styles.pillarTitle}>AI &amp; Machine Learning</h3>
                </div>
              </div>

              <p className={styles.pillarDesc}>
                Architecting deep learning models, fine-tuning large language models (LLMs), and designing
                low-latency production inference runtimes.
              </p>

              <div className={styles.skillsTagList}>
                {[
                  "PyTorch & TorchScript",
                  "Hugging Face & Transformers",
                  "vLLM & TensorRT-LLM",
                  "LoRA & QLoRA Fine-Tuning",
                  "DeepSpeed & FSDP",
                  "RAG & Agentic Workflows",
                  "pgvector, Qdrant & Milvus",
                  "Distributed GPU Training",
                  "Model Quantization (INT4/FP8)",
                ].map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Pillar 2: DevOps & Cloud Architecture */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIconWrap}>
                  <Terminal size={22} />
                </div>
                <div>
                  <span className={styles.pillarSub}>INFRASTRUCTURE</span>
                  <h3 className={styles.pillarTitle}>DevOps &amp; MLOps Systems</h3>
                </div>
              </div>

              <p className={styles.pillarDesc}>
                Automating multi-cloud infrastructure, orchestrating GPU-accelerated Kubernetes clusters,
                and maintaining zero-downtime CI/CD delivery.
              </p>

              <div className={styles.skillsTagList}>
                {[
                  "Kubernetes (K8s) & Helm",
                  "Docker & Container Runtimes",
                  "Terraform (IaC)",
                  "GitHub Actions & CI/CD",
                  "ArgoCD & GitOps",
                  "Prometheus, Grafana & OTel",
                  "AWS (EKS, EC2, S3) & GCP",
                  "Apache Kafka & Event Streams",
                  "Ray Clusters & Slurm",
                ].map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 5. Impact Statement & Direction (Inspired by Reference Design) */}
        <motion.section
          className={styles.statementSection}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Engineering Stance"
        >
          <div className={styles.statementHeadlineWrap}>
            <h2 className={styles.statementHeadline}>
              Building scalable intelligence with <span className={styles.accentWord}>operational rigor.</span>
            </h2>
          </div>

          <div className={styles.statementSplit}>
            <div className={styles.splitLeft}>
              <p className={styles.splitParagraph}>
                Anyone can prompt an API endpoint. Engineering fault-tolerant distributed training,
                sub-16ms inference runtimes, and self-healing Kubernetes clusters is where real technical
                depth lies. It demands rigorous systems profiling, deep kernel understanding, and disciplined execution.
              </p>
            </div>

            <div className={styles.splitRight}>
              <nav className={styles.quickLinksNav} aria-label="Quick Links">
                <Link href="/projects" className={styles.quickLinkItem}>
                  <span>Explore Machine Learning Projects</span>
                  <span className={styles.linkArrow}>→</span>
                </Link>
                <Link href="/#articles" className={styles.quickLinkItem}>
                  <span>Read Technical Architecture Essays</span>
                  <span className={styles.linkArrow}>→</span>
                </Link>
                <Link href="/#skills" className={styles.quickLinkItem}>
                  <span>Review Engineering Services &amp; Advisory</span>
                  <span className={styles.linkArrow}>→</span>
                </Link>
                <Link href="/#faq" className={styles.quickLinkItem}>
                  <span>Frequently Asked Questions</span>
                  <span className={styles.linkArrow}>→</span>
                </Link>
                <Link href="/#contact" className={styles.quickLinkItem}>
                  <span>Start an Architecture Discussion</span>
                  <span className={styles.linkArrow}>→</span>
                </Link>
              </nav>
            </div>
          </div>
        </motion.section>

        {/* 6. Architectural Highlights (Featured Works Inspired by Reference Image) */}
        <motion.section
          className={styles.featuredSection}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Featured Works"
        >
          <div className={styles.featuredHeader}>
            <h2 className={styles.featuredTitle}>Featured Works</h2>
            <Link href="/projects" className={styles.featuredSeeAll}>
              <span>ALL PROJECTS</span>
              <span>→</span>
            </Link>
          </div>

          <div className={styles.featuredGrid}>
            {ARCHITECTURE_HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className={styles.featuredCard}>
                <div className={styles.featuredImageWrap}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className={styles.featuredImage}
                  />
                  <div className={styles.featuredOverlay} />
                  <span className={styles.featuredTag}>{item.tag}</span>
                </div>

                <div className={styles.featuredInfo}>
                  <h3 className={styles.featuredCardTitle}>{item.title}</h3>
                  <p className={styles.featuredCardDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 7. Work Together CTA Capsule (Inspired by Reference Design) */}
        <motion.section
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Contact and Advisory"
        >
          <div className={styles.ctaCapsule}>
            <div className={styles.ctaContent}>
              <span className={styles.ctaPre}>COLLABORATION &amp; ADVISORY</span>
              <h2 className={styles.ctaTitle}>Let&apos;s build intelligent, resilient systems.</h2>
              <p className={styles.ctaDesc}>
                Open for high-impact AI/ML engineering, GPU cluster infrastructure architecture, and
                cloud-native DevOps consulting with teams building for scale.
              </p>
            </div>

            <div className={styles.ctaActionWrap}>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className={styles.ctaButton}
              >
                <span>Work together</span>
                <span className={styles.ctaArrowCircle}>
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Global Minimalist Footer */}
      <MainFooter />
    </div>
  );
}
