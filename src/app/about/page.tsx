"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import AboutEditorialBio from "@/components/about/AboutEditorialBio";
import AboutShowcaseBanner from "@/components/cover/sections/AboutShowcaseBanner";
import JourneySection from "@/components/cover/sections/JourneySection";
import FaqSection from "@/components/cover/sections/FaqSection";
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
            EDITORIAL BIO & SETUP: TANIA RASCIA INSPIRED (About Me, Contact, Now, Tools)
            ========================================================================= */}
        <AboutEditorialBio />

        {/* =========================================================================
            ABOUT HERO STAGE: 3-COLUMN EDITORIAL STORY & ENGINEERING ETHOS
            ========================================================================= */}
        <section className={styles.storySection} aria-label="Engineering Ethos">
          <motion.div
            className={styles.headerBlock}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.headerIcon} aria-hidden="true">
              <div className={styles.headerIconInner} />
            </div>
            <h2 className={styles.mainTitle}>Engineering Ethos</h2>
          </motion.div>

          <div className={styles.storyGrid}>
            {/* -------------------------------------------------------------
                LEFT COLUMN: 2 Vertically Stacked Rounded Photo Cards
                ------------------------------------------------------------- */}
            <motion.div
              className={styles.leftCol}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top Photo Card */}
              <div className={styles.photoCardSmall}>
                <Image
                  src="/images/about/about_stage_1.jpg"
                  alt="Speaker presenting on stage"
                  fill
                  sizes="(max-width: 960px) 100vw, 220px"
                  className={styles.cardImage}
                  priority
                />
              </div>

              {/* Bottom Photo Card */}
              <div className={styles.photoCardSmall}>
                <Image
                  src="/images/about/about_stage_2.jpg"
                  alt="Collaborative discussion"
                  fill
                  sizes="(max-width: 960px) 100vw, 220px"
                  className={styles.cardImage}
                />
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                MIDDLE COLUMN: Display Headline & Thoughtful Narrative
                ------------------------------------------------------------- */}
            <motion.div
              className={styles.middleCol}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className={styles.headline}>
                Architecting resilient systems<br />
                for deterministic scale
              </h3>

              <div className={styles.narrativeBody}>
                <p className={styles.paragraph}>
                  I view computer science not merely as a modern trade, but as an intellectual craft that bridges mechanical discipline with editorial clarity. Over the past several years, I have worked across the stack—from designing event-driven distributed ingestion pipelines to architecting accessible, zero-bloat web clients.
                </p>

                <p className={styles.paragraph}>
                  My engineering philosophy is shaped by durable principles: favor explicit architectures over magic abstractions, prioritize deterministic latency over brute computing power, and craft user experiences that respect human attention rather than exploit it.
                </p>

                <p className={styles.punchline}>
                  Harder problems. Higher performance stakes. That&apos;s where dependable systems get built.
                </p>
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                RIGHT COLUMN: Real Engineering Distinctions & Photo Card
                ------------------------------------------------------------- */}
            <motion.div
              className={styles.rightCol}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Stats Block */}
              <div className={styles.statsBlock}>
                <div className={styles.statPrimary}>
                  <div className={styles.statPrimaryNumber}>10+</div>
                  <div className={styles.statPrimaryLabel}>years of curiosity &amp; software craft</div>
                </div>

                <div className={styles.statsDivider} />

                <div className={styles.statsSecondaryRow}>
                  <div className={styles.statSecondary}>
                    <div className={styles.statSecondaryNumber}>&lt;14ms</div>
                    <div className={styles.statSecondaryLabel}>p99 inference latency</div>
                  </div>
                  <div className={styles.statSecondary}>
                    <div className={styles.statSecondaryNumber}>100%</div>
                    <div className={styles.statSecondaryLabel}>ad-free, zero tracking</div>
                  </div>
                </div>
              </div>

              {/* Portrait Photo Card directly below stats */}
              <div className={styles.photoCardPortrait}>
                <Image
                  src="/images/about/about_stage_3.jpg"
                  alt="Keynote presentation"
                  fill
                  sizes="(max-width: 960px) 100vw, 280px"
                  className={styles.cardImage}
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          SHOWCASE BANNER: HIGH-TECH VISUAL EXPANSIVE BANNER (Image 2)
          ========================================================================= */}
      <AboutShowcaseBanner />

      {/* =========================================================================
          JOURNEY & MILESTONES: 3-COLUMN ARCHITECTURAL & CHRONOLOGY SECTION (Image 4)
          ========================================================================= */}
      <JourneySection />

      {/* =========================================================================
          FAQ: MINIMALIST ACCORDION SECTION (Image 3)
          ========================================================================= */}
      <FaqSection />

      <PreFooterBanner />
      <MainFooter />
    </div>
  );
}
