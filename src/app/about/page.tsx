"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Camera,
  Video,
  Scissors,
  Globe,
} from "lucide-react";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import { siteConfig } from "@/data/siteConfig";
import styles from "./aboutPage.module.css";

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

const WHAT_I_DO_CARDS = [
  {
    id: "ai-ml",
    title: "AI & MACHINE LEARNING",
    icon: Camera,
    image: "/images/what-i-do/what_i_do_1.png",
  },
  {
    id: "devops-k8s",
    title: "DEVOPS & KUBERNETES",
    icon: Video,
    image: "/images/what-i-do/what_i_do_2.png",
  },
  {
    id: "inference-rag",
    title: "MODEL INFERENCE & RAG",
    icon: Scissors,
    image: "/images/what-i-do/what_i_do_3.png",
  },
  {
    id: "cloud-architecture",
    title: "DISTRIBUTED CLOUD",
    icon: Globe,
    image: "/images/what-i-do/what_i_do_4.png",
  },
];

export default function AboutPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    // Copy to clipboard while preserving default mailto behavior if desired
    navigator.clipboard.writeText(siteConfig.social.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  return (
    <div className={styles.pageRoot}>
      {/* 1. Global Navigation Bar */}
      <SkyLabsNavbar activeTab="about" />

      <main className={styles.mainContainer}>
        {/* Top Back Link — Minimalist and Understated */}
        <motion.div
          className={styles.topNav}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={14} className={styles.backArrow} />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* 2. Hero Section: Clean, Minimalist Typography Layout Matching Reference Design */}
        <motion.section
          className={styles.cleanAboutSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          aria-label="About Dilshan"
        >
          <div className={styles.cleanAboutContent}>
            <h1 className={styles.cleanName}>Dilshan</h1>

            <div className={styles.narrativeStack}>
              <p className={styles.narrativePara}>
                I&apos;m an AI/ML engineer and DevOps architect focused on creating clean,
                high-throughput machine learning systems and resilient cloud infrastructure.
              </p>

              <p className={styles.narrativePara}>
                I specialize in building deep learning models, low-latency GPU inference runtimes,
                and distributed platforms that not only scale but also perform.
              </p>

              <p className={styles.narrativePara}>
                My approach is simple &mdash; remove distractions, focus on clarity, and design with purpose.
              </p>

              <p className={styles.narrativePara}>
                Over the years, I have worked with teams and founders worldwide, helping startups,
                creators, and businesses turn complex AI ideas into production-ready digital products.
              </p>
            </div>

            {/* Two-Row Capsule Pills Matching Reference Layout */}
            <div className={styles.pillsContainer}>
              {/* Row 1: Direct Contact & Email */}
              <div className={styles.pillsRow}>
                <a
                  href="tel:+94771234567"
                  className={styles.pillBtn}
                  aria-label="Call Dilshan"
                >
                  +94 77 123 4567
                </a>

                <a
                  href={`mailto:${siteConfig.social.email}`}
                  onClick={handleCopyEmail}
                  className={styles.pillBtn}
                  aria-label="Email Dilshan"
                  title="Click to email or copy"
                >
                  {copiedEmail ? "Copied to clipboard!" : siteConfig.social.email}
                </a>
              </div>

              {/* Row 2: Verified Social Profiles */}
              <div className={styles.pillsRow}>
                <a
                  href={siteConfig.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pillBtn}
                >
                  Twitter
                </a>

                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pillBtn}
                >
                  GitHub
                </a>

                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pillBtn}
                >
                  LinkedIn
                </a>
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

        {/* 4. "WHAT I DO" Bento Grid Section Matching Exact Reference Design */}
        <motion.section
          className={styles.whatIDoSection}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="What I Do"
        >
          {/* Section Header with Accent and "WHAT I DO" */}
          <div className={styles.whatIDoHeader}>
            <div className={styles.whatIDoAccent}>
              <span className={styles.accentCircle} />
              <span className={styles.accentLine} />
            </div>
            <h2 className={styles.whatIDoTitle}>WHAT I DO</h2>
          </div>

          {/* Bento Grid: Left Tall Card + Right 2x2 Grid */}
          <div className={styles.whatIDoGrid}>
            {/* Left Tall Card: Solid Deep Navy with ABOUT ME + Bio */}
            <div className={styles.aboutMeCard}>
              <h3 className={styles.aboutMeCardHeading}>ABOUT ME</h3>
              <p className={styles.aboutMeCardBio}>
                Meet Dilshan: an AI/ML engineer and DevOps architect building high-throughput
                machine learning systems, optimizing GPU inference runtimes, and engineering
                resilient Kubernetes cloud infrastructure. Dedicated to stripping away unnecessary
                complexity to deliver scalable, production-grade intelligence with operational rigor.
              </p>
            </div>

            {/* Right 2x2 Grid of Visual Cards with Icons & Labels */}
            <div className={styles.cardsGrid}>
              {WHAT_I_DO_CARDS.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div key={card.id} className={styles.bentoCard}>
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      className={styles.bentoCardImg}
                    />
                    <div className={styles.bentoCardOverlay} />
                    <div className={styles.bentoCardContent}>
                      <IconComponent size={24} className={styles.bentoCardIcon} />
                      <h4 className={styles.bentoCardTitle}>{card.title}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>
      </main>

      {/* Global Minimalist Footer */}
      <MainFooter />
    </div>
  );
}
