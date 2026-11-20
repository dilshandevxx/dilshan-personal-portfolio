"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Terminal, Cpu, Layers, Sparkles } from "lucide-react";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import PreFooterBanner from "@/components/cover/sections/PreFooterBanner";
import MainFooter from "@/components/MainFooter";
import styles from "./aboutPage.module.css";

export default function AboutPage() {
  const [activePhoto, setActivePhoto] = useState<"dilshan" | "studio">("dilshan");

  return (
    <div className={styles.pageRoot}>
      {/* 1. Global Navigation Bar */}
      <SkyLabsNavbar activeTab="about" />

      <main className={styles.mainContainer}>
        {/* Subtle Back Link */}
        <motion.div
          className={styles.topNav}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={14} className={styles.backArrow} />
            <span>Home</span>
          </Link>
        </motion.div>

        {/* =========================================================================
            HERO STAGE: FAITHFULLY REPRODUCING THE ABOUT-6 REFERENCE DESIGN
            ========================================================================= */}
        <section className={styles.stageSection} aria-label="About & Statistics">
          {/* Top Bar Row: Award Winning Stats Badge (Left) + Ribbed Lines Texture (Right) */}
          <div className={styles.badgeHeaderRow}>
            <motion.div
              className={styles.statsBadge}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>AWARD WINNING STATS</span>
            </motion.div>

            {/* Decorative Ribbed Barcode Texture matching top right of reference */}
            <div className={styles.ribbedTexture} aria-hidden="true">
              {Array.from({ length: 26 }).map((_, i) => (
                <span key={i} className={styles.ribbedLine} />
              ))}
            </div>
          </div>

          {/* Large Bold Display Headline */}
          <motion.div
            className={styles.headlineWrap}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className={styles.mainHeadline}>
              ALL-IN-ONE AI PLATFORM TO AUTOMATE TASKS, OPTIMIZE PROCESSES, AND BOOST
              PRODUCTIVITY ACROSS YOUR BUSINESS. SAVE HOURS DAILY WITH INTELLIGENT
              AUTOMATION
            </h1>
          </motion.div>

          {/* 4 Stats Metrics Columns aligned to the right below the headline */}
          <motion.div
            className={styles.statsRow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.statColumn}>
              <div className={styles.statNumber}>2175</div>
              <div className={styles.statLabel}>Automations</div>
            </div>
            <div className={styles.statColumn}>
              <div className={styles.statNumber}>231K</div>
              <div className={styles.statLabel}>Tasks completed</div>
            </div>
            <div className={styles.statColumn}>
              <div className={styles.statNumber}>175K</div>
              <div className={styles.statLabel}>Users</div>
            </div>
            <div className={styles.statColumn}>
              <div className={styles.statNumber}>21M</div>
              <div className={styles.statLabel}>Hours Saved</div>
            </div>
          </motion.div>

          {/* Two Large Rounded Photo Cards */}
          <motion.div
            className={styles.cardsGrid}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left Card: Dilshan Portrait with subtle photo switcher */}
            <div className={styles.photoCard}>
              <Image
                src={activePhoto === "dilshan" ? "/about_card_dilshan.jpg" : "/about_card_left.jpg"}
                alt={activePhoto === "dilshan" ? "Dilshan in workspace" : "Developer at workstation"}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.cardImage}
                priority
              />
              <div className={styles.cardOverlayGradient} />

              {/* Minimalist Photo Selector Pill */}
              <div className={styles.photoSwitchPill}>
                <button
                  type="button"
                  className={`${styles.switchBtn} ${activePhoto === "dilshan" ? styles.switchActive : ""}`}
                  onClick={() => setActivePhoto("dilshan")}
                  title="Show Dilshan portrait"
                >
                  Dilshan
                </button>
                <button
                  type="button"
                  className={`${styles.switchBtn} ${activePhoto === "studio" ? styles.switchActive : ""}`}
                  onClick={() => setActivePhoto("studio")}
                  title="Show Studio scene"
                >
                  Studio
                </button>
              </div>
            </div>

            {/* Right Card: Collaborative Session from reference */}
            <div className={styles.photoCard}>
              <Image
                src="/about_card_right.jpg"
                alt="Collaborative engineering session"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.cardImage}
                priority
              />
              <div className={styles.cardOverlayGradient} />
            </div>
          </motion.div>
        </section>

        {/* =========================================================================
            DETAILED EDITORIAL BIOGRAPHY & ARCHITECTURE CAPABILITIES
            ========================================================================= */}
        <section className={styles.narrativeSection} aria-label="Biography & Background">
          <div className={styles.narrativeGrid}>
            {/* Left Sub-Header */}
            <div className={styles.narrativeLeft}>
              <span className={styles.sectionPill}>ENGINEERING IDENTITY</span>
              <h2 className={styles.narrativeTitle}>
                High-throughput machine learning systems with operational rigor.
              </h2>
            </div>

            {/* Right Story & Competencies */}
            <div className={styles.narrativeRight}>
              <p className={styles.narrativeLead}>
                I&apos;m Dilshan — an AI/ML engineer and DevOps architect specializing in building
                distributed machine learning platforms, optimizing low-latency GPU inference runtimes,
                and orchestrating resilient Kubernetes infrastructure. Dedicated to stripping away
                unnecessary complexity to deliver scalable, production-grade intelligence.
              </p>

              <p className={styles.narrativeBody}>
                Over the past 6+ years, I&apos;ve engineered systems handling millions of daily inferences,
                architected retrieval-augmented generation (RAG) engines, and managed zero-downtime
                cloud platforms. My methodology balances mathematical precision with software craftsmanship:
                optimizing latency boundaries, enforcing deterministic state management, and designing
                fault-tolerant distributed topologies.
              </p>

              {/* Core Competencies Matrix */}
              <div className={styles.competencyMatrix}>
                <div className={styles.competencyItem}>
                  <Cpu size={18} className={styles.compIcon} />
                  <div>
                    <h3 className={styles.compTitle}>Model Inference &amp; RAG</h3>
                    <p className={styles.compDesc}>
                      vLLM, TensorRT-LLM, cross-encoder rerankers, semantic vector indexes, and sub-15ms TTFT.
                    </p>
                  </div>
                </div>

                <div className={styles.competencyItem}>
                  <Layers size={18} className={styles.compIcon} />
                  <div>
                    <h3 className={styles.compTitle}>DevOps &amp; Kubernetes</h3>
                    <p className={styles.compDesc}>
                      Multi-cluster K8s orchestration, GitOps, zero-trust cloud topologies, and CI/CD automation.
                    </p>
                  </div>
                </div>

                <div className={styles.competencyItem}>
                  <Terminal size={18} className={styles.compIcon} />
                  <div>
                    <h3 className={styles.compTitle}>Distributed Cloud Systems</h3>
                    <p className={styles.compDesc}>
                      High-concurrency microservices in Go, Python, and TypeScript built for 99.99% reliability.
                    </p>
                  </div>
                </div>

                <div className={styles.competencyItem}>
                  <Sparkles size={18} className={styles.compIcon} />
                  <div>
                    <h3 className={styles.compTitle}>Agentic &amp; Full-Stack AI</h3>
                    <p className={styles.compDesc}>
                      Autonomous multi-agent workflows, Next.js experiences, and real-time streaming architectures.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className={styles.narrativeActions}>
                <Link href="/projects" className={styles.primaryActionBtn}>
                  <span>Explore Featured Projects</span>
                  <ArrowUpRight size={15} />
                </Link>
                <Link href="/#contact" className={styles.secondaryActionBtn}>
                  <span>Get in Touch</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PreFooterBanner />
      <MainFooter />
    </div>
  );
}
