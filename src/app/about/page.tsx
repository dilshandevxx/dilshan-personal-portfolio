"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  Camera,
  Video,
  Scissors,
  Globe,
} from "lucide-react";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import { siteConfig } from "@/data/siteConfig";
import styles from "./aboutPage.module.css";

const SOCIAL_LINKS = [
  { label: "GitHub", href: siteConfig.social.github },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "X / Twitter", href: siteConfig.social.x },
];

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
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
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

        {/* 2. Hero Section: Editorial 2-Column Split Inspired by Reference */}
        <motion.section
          className={styles.heroSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Introduction"
        >
          <div className={styles.heroGrid}>
            {/* Left Column: Clean Editorial Narrative & Contact Capsules */}
            <div className={styles.heroLeft}>
              <h1 className={styles.heroName}>Dilshan</h1>

              <div className={styles.narrativeStack}>
                <p className={styles.narrativePara}>
                  I&apos;m an AI/ML engineer and DevOps architect focused on creating clean,
                  high-throughput machine learning systems and resilient cloud infrastructure.
                </p>

                <p className={styles.narrativePara}>
                  I specialize in building end-to-end model workflows, distributed GPU training
                  runtimes, and low-latency inference pipelines that not only scale but perform deterministically.
                </p>

                <p className={styles.narrativePara}>
                  My approach is simple &mdash; remove distractions, focus on clarity, and design with purpose.
                </p>

                <p className={styles.narrativePara}>
                  Over the years, I have worked with startups, creators, and businesses worldwide,
                  helping teams turn complex machine learning research into production-ready digital systems.
                </p>
              </div>

              {/* Clean Two-Row Contact & Profile Capsules Matching Reference Layout */}
              <div className={styles.contactCapsulesGroup}>
                {/* Row 1: Direct Contact & Location */}
                <div className={styles.capsulesRow}>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`${styles.capsuleBtn} ${styles.emailCapsule}`}
                    aria-label="Copy email address"
                    title="Click to copy email"
                  >
                    <Mail size={14} className={styles.capsuleIcon} />
                    <span>{siteConfig.social.email}</span>
                    {copied ? (
                      <Check size={13} className={styles.checkIcon} />
                    ) : (
                      <Copy size={12} className={styles.copyIcon} />
                    )}
                  </button>

                  <div className={styles.capsuleBadge}>
                    <MapPin size={13} className={styles.capsuleIcon} />
                    <span>Colombo, Sri Lanka &bull; Worldwide</span>
                  </div>
                </div>

                {/* Row 2: Verified Profiles */}
                <div className={styles.capsulesRow}>
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.capsuleBtn}
                    >
                      <span>{link.label}</span>
                      <ExternalLink size={12} className={styles.externalIcon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: High-End Editorial Portrait */}
            <div className={styles.heroRight}>
              <div className={styles.portraitFrame}>
                <Image
                  src="/images/about_portrait.jpg"
                  alt="Dilshan"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 440px"
                  className={styles.portraitImg}
                />
                <div className={styles.portraitOverlay} />
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
