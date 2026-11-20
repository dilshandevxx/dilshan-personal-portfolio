"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
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
            ABOUT HERO STAGE: 3-COLUMN ASYMMETRIC EDITORIAL LAYOUT
            (Faithfully reproducing the reference Webflow design)
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
              {/* Carousel Tab matching reference left edge */}
              <div className={styles.carouselTab} aria-hidden="true">
                <ChevronLeft size={16} className={styles.chevronIcon} />
              </div>

              {/* Top Photo Card */}
              <div className={styles.photoCardSmall}>
                <Image
                  src="/images/about/about_stage_1.jpg"
                  alt="Speaker presenting on stage"
                  fill
                  sizes="(max-width: 1024px) 100vw, 240px"
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
                  sizes="(max-width: 1024px) 100vw, 240px"
                  className={styles.cardImage}
                />
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
                Built for the teams<br />
                building the future
              </h1>

              <div className={styles.narrativeBody}>
                <p className={styles.paragraph}>
                  Webflow started in 2013 with one belief: building for the web shouldn&apos;t require an engineering degree. Today, 3.5M people — solo freelancers, scrappy startups, Fortune 100 marketing teams — use Webflow to do exactly that.
                </p>

                <p className={styles.paragraph}>
                  The web looks different now than it did then. AI is changing how experiences get built, how they get found, and what people expect when they arrive. We think that&apos;s an opportunity, not a threat. Our mission is to build for the teams shaping what&apos;s next, and our vision is a world where every digital experience comes alive.
                </p>

                <p className={styles.punchline}>
                  Harder problems. Higher stakes. That&apos;s not a challenge. That&apos;s the job.
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
                  <div className={styles.statPrimaryNumber}>800+</div>
                  <div className={styles.statPrimaryLabel}>employees</div>
                </div>

                {/* Thin Divider Line */}
                <div className={styles.statsDivider} />

                {/* Two Secondary Metrics Side by Side */}
                <div className={styles.statsSecondaryRow}>
                  <div className={styles.statSecondary}>
                    <div className={styles.statSecondaryNumber}>1.4M</div>
                    <div className={styles.statSecondaryLabel}>websites</div>
                  </div>
                  <div className={styles.statSecondary}>
                    <div className={styles.statSecondaryNumber}>300k</div>
                    <div className={styles.statSecondaryLabel}>customers</div>
                  </div>
                </div>
              </div>

              {/* Portrait Photo Card directly below stats */}
              <div className={styles.photoCardPortrait}>
                <Image
                  src="/images/about/about_stage_3.jpg"
                  alt="Keynote presentation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 260px"
                  className={styles.cardImage}
                  priority
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
