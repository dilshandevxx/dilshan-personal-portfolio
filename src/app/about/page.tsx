"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import PreFooterBanner from "@/components/cover/sections/PreFooterBanner";
import MainFooter from "@/components/MainFooter";
import styles from "./aboutPage.module.css";

export default function AboutPage() {
  return (
    <div className={styles.pageRoot}>
      {/* 1. Global Navigation Bar */}
      <SkyLabsNavbar activeTab="about" />

      <main className={styles.mainContainer}>
        {/* =========================================================================
            ABOUT HERO STAGE: 3-COLUMN ASYMMETRIC EDITORIAL LAYOUT
            (Faithfully reproducing the reference design)
            ========================================================================= */}
        <section className={styles.storySection} aria-label="About Dilshan">
          <div className={styles.storyGrid}>
            {/* -------------------------------------------------------------
                LEFT COLUMN: 2 Vertically Stacked Rounded Photo Cards
                ------------------------------------------------------------- */}
            <motion.div
              className={styles.leftCol}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top Photo Card */}
              <div className={styles.photoCardSmall}>
                <Image
                  src="/about_card_left.jpg"
                  alt="Presentation session"
                  fill
                  sizes="(max-width: 1024px) 100vw, 280px"
                  className={styles.cardImage}
                  priority
                />
                <div className={styles.cardOverlayGradient} />

                {/* Subtle Left Navigation Pill matching reference */}
                <div className={styles.carouselPill} aria-hidden="true">
                  <ChevronLeft size={14} className={styles.chevronIcon} />
                </div>
              </div>

              {/* Bottom Photo Card */}
              <div className={styles.photoCardSmall}>
                <Image
                  src="/about_card_right.jpg"
                  alt="Collaborative engineering discussion"
                  fill
                  sizes="(max-width: 1024px) 100vw, 280px"
                  className={styles.cardImage}
                />
                <div className={styles.cardOverlayGradient} />
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                MIDDLE COLUMN: Display Headline & Thoughtful Narrative
                ------------------------------------------------------------- */}
            <motion.div
              className={styles.middleCol}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className={styles.headline}>
                Built for the systems<br />
                building the future
              </h1>

              <div className={styles.narrativeBody}>
                <p className={styles.paragraph}>
                  I started engineering software with one core conviction: creating
                  resilient, high-performance digital systems shouldn&apos;t require
                  fragile, bloated abstractions. Over the past 6+ years, I have worked
                  across the stack — from distributed retrieval-augmented generation (RAG)
                  engines and low-latency GPU inference runtimes to resilient Kubernetes
                  cloud platforms.
                </p>

                <p className={styles.paragraph}>
                  The computing landscape looks completely different now than it did then.
                  AI is changing how experiences get built, how systems synthesize data,
                  and what people expect when they interact with modern technology. I think
                  that&apos;s an opportunity, not a threat. My focus is to engineer
                  dependable infrastructure and intelligent applications where performance,
                  deterministic states, and software craftsmanship come alive.
                </p>

                <p className={styles.punchline}>
                  Harder problems. Higher stakes. That&apos;s not a challenge. That&apos;s the craft.
                </p>
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                RIGHT COLUMN: Giant Stats Metrics & Portrait Photo Card
                ------------------------------------------------------------- */}
            <motion.div
              className={styles.rightCol}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Stats Block */}
              <div className={styles.statsBlock}>
                {/* Primary Large Metric */}
                <div className={styles.statPrimary}>
                  <div className={styles.statPrimaryNumber}>6+</div>
                  <div className={styles.statPrimaryLabel}>years engineering</div>
                </div>

                {/* Thin Divider Line */}
                <div className={styles.statsDivider} />

                {/* Two Secondary Metrics Side by Side */}
                <div className={styles.statsSecondaryRow}>
                  <div className={styles.statSecondary}>
                    <div className={styles.statSecondaryNumber}>10M+</div>
                    <div className={styles.statSecondaryLabel}>inferences</div>
                  </div>
                  <div className={styles.statSecondary}>
                    <div className={styles.statSecondaryNumber}>99.9%</div>
                    <div className={styles.statSecondaryLabel}>uptime SLA</div>
                  </div>
                </div>
              </div>

              {/* Portrait Photo Card directly below stats */}
              <div className={styles.photoCardPortrait}>
                <Image
                  src="/about_card_dilshan.jpg"
                  alt="Dilshan portrait"
                  fill
                  sizes="(max-width: 1024px) 100vw, 300px"
                  className={styles.cardImage}
                  priority
                />
                <div className={styles.cardOverlayGradient} />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <PreFooterBanner />
      <MainFooter />
    </div>
  );
}
