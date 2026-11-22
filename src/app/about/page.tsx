"use client";

import React from "react";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import AboutEditorialBio from "@/components/about/AboutEditorialBio";
import MainFooter from "@/components/MainFooter";
import styles from "./aboutPage.module.css";

export default function AboutPage() {
  return (
    <div className={styles.pageRoot}>
      {/* 1. Global Navigation Bar */}
      <SkyLabsNavbar activeTab="about" />

      {/* 2. Main Editorial Content: 100% Unified in Tania Rascia Inspired Aesthetic */}
      <main className={styles.mainContainer}>
        <AboutEditorialBio />
      </main>

      {/* 3. Global Footer */}
      <MainFooter />
    </div>
  );
}
