"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import styles from "./aboutPage.module.css";

export default function AboutPage() {
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

        {/* 2. Three-Column Iconic Editorial Stage (Faithfully matching reference design) */}
        <div className={styles.stageGrid}>
          {/* LEFT FLANK: Floating Polaroid Photos */}
          <aside className={styles.leftFlank} aria-label="Personal snapshots">
            {/* Snapshot 1: Dilshan Portrait */}
            <motion.div
              className={`${styles.polaroidCard} ${styles.leftCard1}`}
              initial={{ opacity: 0, x: -24, rotate: -6 }}
              animate={{ opacity: 1, x: 0, rotate: -4 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
            >
              <div className={styles.polaroidInner}>
                <Image
                  src="/dilshan_portrait.jpg"
                  alt="Dilshan"
                  width={240}
                  height={260}
                  priority
                  className={styles.polaroidImg}
                />
              </div>
            </motion.div>

            {/* Snapshot 2: Studio / Engineering Workspace */}
            <motion.div
              className={`${styles.polaroidCard} ${styles.leftCard2}`}
              initial={{ opacity: 0, x: -24, rotate: 4 }}
              animate={{ opacity: 1, x: 0, rotate: 2.5 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
            >
              <div className={styles.polaroidInner}>
                <Image
                  src="/images/project_warpspeed_desk.jpg"
                  alt="Engineering desk and workstation"
                  width={240}
                  height={180}
                  className={styles.polaroidImg}
                />
              </div>
            </motion.div>

            {/* Snapshot 3: Team Collaboration & Architecture Review */}
            <motion.div
              className={`${styles.polaroidCard} ${styles.leftCard3}`}
              initial={{ opacity: 0, x: -24, rotate: -4 }}
              animate={{ opacity: 1, x: 0, rotate: -2.5 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
            >
              <div className={styles.polaroidInner}>
                <Image
                  src="/images/skill_workflow_automation.jpg"
                  alt="Architecture review and engineering session"
                  width={240}
                  height={190}
                  className={styles.polaroidImg}
                />
              </div>
            </motion.div>
          </aside>

          {/* CENTER COLUMN: The Editorial Narrative Spine */}
          <article className={styles.centerSpine}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className={styles.mainTitle}>About</h1>

              <p className={styles.leadPara}>
                I&apos;m an AI/ML engineer and distributed systems architect. For over 6 years I&apos;ve worked
                with founders, high-growth startups, and engineering teams to build high-throughput intelligence
                platforms, leading on architecture, low-latency GPU inference, and cloud scalability. I&apos;m
                still designing, training, and building systems myself, and I have the good fortune to build software
                operating at demanding scale worldwide.
              </p>

              {/* 2x2 Big Metric Numbers Grid matching reference */}
              <div className={styles.metricsGrid}>
                <div className={styles.metricItem}>
                  <div className={styles.metricNumber}>6+</div>
                  <div className={styles.metricLabel}>years building systems</div>
                </div>
                <div className={styles.metricItem}>
                  <div className={styles.metricNumber}>50+</div>
                  <div className={styles.metricLabel}>projects &amp; models shipped</div>
                </div>
                <div className={styles.metricItem}>
                  <div className={styles.metricNumber}>16</div>
                  <div className={styles.metricLabel}>production clusters managed</div>
                </div>
                <div className={styles.metricItem}>
                  <div className={styles.metricNumber}>12</div>
                  <div className={styles.metricLabel}>countries worked with</div>
                </div>
              </div>

              {/* Detailed Narrative Story Paragraphs */}
              <div className={styles.storyStack}>
                <p className={styles.storyPara}>
                  For a large part of my engineering journey, I have focused on distributed computing, assembling
                  specialist teams per project and staying hands-on across deep learning architectures, GPU tensor
                  execution, and Kubernetes automation. I started out engineering high-throughput backend services,
                  following my First Class Honors degree in Computer Science. That quickly grew into larger
                  responsibilities: architecting streaming data pipelines, vector retrieval platforms, and 0-to-1
                  intelligence systems directly with engineering leaders worldwide.
                </p>

                <p className={styles.storyPara}>
                  Founders have brought me in to solve challenging bottlenecks along the way: removing memory
                  fragmentation, designing event-driven ingestion with Kafka and Go, and rearchitecting cloud
                  infrastructure to scale reliably while stripping away unnecessary operational complexity.
                </p>

                <p className={styles.storyPara}>
                  More recently, my attention has been focused on generative artificial intelligence and production
                  inference runtimes. That includes building production RAG retrieval engines with pgvector, optimizing
                  GPU tensor execution with vLLM and TensorRT-LLM, and engineering autonomous Kubernetes operators
                  that perform with mathematical determinism under strict operational rigor.
                </p>
              </div>
            </motion.div>
          </article>

          {/* RIGHT FLANK: Floating Workshop Snapshots, Sticker Notes & Drawings */}
          <aside className={styles.rightFlank} aria-label="Visual artifacts">
            {/* Snapshot 1: Agile Planning & Workshop Photo */}
            <motion.div
              className={`${styles.polaroidCard} ${styles.rightCard1}`}
              initial={{ opacity: 0, x: 24, rotate: 4 }}
              animate={{ opacity: 1, x: 0, rotate: 3 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
            >
              <div className={styles.polaroidInner}>
                <Image
                  src="/images/skill_team_training.jpg"
                  alt="Agile architecture planning and workshop board"
                  width={240}
                  height={220}
                  className={styles.polaroidImg}
                />
              </div>
            </motion.div>

            {/* Sticker Note 2: Minimalist White Card with Signature Orange Loop (Matching Reference) */}
            <motion.div
              className={`${styles.stickerCard} ${styles.rightCard2}`}
              initial={{ opacity: 0, x: 24, rotate: -6 }}
              animate={{ opacity: 1, x: 0, rotate: -4 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.08, zIndex: 10 }}
            >
              <div className={styles.stickerInner}>
                <svg
                  viewBox="0 0 100 100"
                  width="72"
                  height="72"
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="8.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M32 25 C32 65, 68 65, 68 25 C68 85, 32 85, 32 60 C32 45, 68 45, 68 80" />
                </svg>
              </div>
            </motion.div>

            {/* Snapshot 3: Editorial Line Illustration Card */}
            <motion.div
              className={`${styles.illustrationCard} ${styles.rightCard3}`}
              initial={{ opacity: 0, x: 24, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 3.5 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
            >
              <div className={styles.illustrationInner}>
                <Image
                  src="/images/sketchbook/sketchbook_blanket.png"
                  alt="Editorial line illustration"
                  width={210}
                  height={240}
                  className={styles.polaroidImg}
                />
              </div>
            </motion.div>
          </aside>
        </div>
      </main>

      {/* Global Minimalist Footer */}
      <MainFooter />
    </div>
  );
}
