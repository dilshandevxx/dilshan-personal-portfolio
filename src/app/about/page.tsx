"use client";

import React from "react";
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
            CAREER & MILESTONES: UNIFIED IN TOP-PART EDITORIAL STYLE
            ========================================================================= */}
        <JourneySection />

        {/* =========================================================================
            FREQUENTLY ASKED QUESTIONS: UNIFIED IN TOP-PART EDITORIAL STYLE
            ========================================================================= */}
        <FaqSection />
      </main>

      <PreFooterBanner />
      <MainFooter />
    </div>
  );
}
