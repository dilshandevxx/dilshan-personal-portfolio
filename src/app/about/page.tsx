"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import AboutEditorialBio from "@/components/about/AboutEditorialBio";
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
            ENGINEERING ETHOS: HARMONIZED EDITORIAL STORY & PHOTO GALLERY
            ========================================================================= */}
        <section className={styles.storySection} aria-label="Engineering Ethos">
          <motion.div
            className={styles.headerBlock}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.headerSquare} aria-hidden="true" />
            <h2 className={styles.mainTitle}>Engineering Ethos</h2>
          </motion.div>

          <div className={styles.ethosContent}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className={styles.headline}>
                Architecting resilient systems for deterministic scale
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

            {/* Clean 3-image gallery: bit smaller, proper size with spaces, top part styling */}
            <motion.div
              className={styles.photoGallery}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.photoCard}>
                <Image
                  src="/images/about/about_stage_1.jpg"
                  alt="Speaker presenting on stage"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className={styles.cardImage}
                />
              </div>

              <div className={styles.photoCard}>
                <Image
                  src="/images/about/about_stage_2.jpg"
                  alt="Collaborative technical discussion"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className={styles.cardImage}
                />
              </div>

              <div className={styles.photoCard}>
                <Image
                  src="/images/about/about_stage_3.jpg"
                  alt="Keynote presentation"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className={styles.cardImage}
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          JOURNEY & MILESTONES: 3-COLUMN ARCHITECTURAL & CHRONOLOGY SECTION
          ========================================================================= */}
      <JourneySection />

      {/* =========================================================================
          FAQ: MINIMALIST ACCORDION SECTION
          ========================================================================= */}
      <FaqSection />

      <PreFooterBanner />
      <MainFooter />
    </div>
  );
}
