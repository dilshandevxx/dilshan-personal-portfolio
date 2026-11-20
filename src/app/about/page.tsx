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
        {/* Top Back Link */}
        <motion.div
          className={styles.topNav}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* 2. Hero Section: Editorial 2-Column Split (Text & Portrait) */}
        <motion.section
          className={styles.heroSection}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Introduction"
        >
          <div className={styles.heroGrid}>
            {/* Left Column: Title, Identity & Concise Narrative */}
            <div className={styles.heroLeft}>
              <div className={styles.statusPill}>
                <span className={styles.statusDot} />
                <span>Available for AI/ML &amp; DevOps Engineering</span>
              </div>

              <h1 className={styles.heroName}>Dilshan</h1>
              <p className={styles.heroRole}>
                AI/ML Engineer <span className={styles.roleDivider}>/</span> DevOps Architect
              </p>

              <div className={styles.narrativeWrap}>
                <p className={styles.narrativePara}>
                  I engineer high-throughput machine learning systems, low-latency model inference
                  runtimes, and resilient cloud infrastructure built to perform deterministically under
                  demanding production scale.
                </p>

                <p className={styles.narrativePara}>
                  My work bridges both sides of modern engineering: training and fine-tuning neural
                  models, optimizing GPU tensor execution, and automating Kubernetes-native cloud
                  environments with GitOps and Terraform.
                </p>

                <p className={styles.narrativePara}>
                  My approach is simple — remove unnecessary complexity, optimize memory and latency
                  boundaries, and build dependable systems with mathematical rigor.
                </p>
              </div>

              {/* Minimalist Contact & Social Pills */}
              <div className={styles.pillsRow}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`${styles.pillBtn} ${styles.emailPill}`}
                  aria-label="Copy email address"
                  title="Click to copy email"
                >
                  <Mail size={14} className={styles.pillIcon} />
                  <span>{siteConfig.social.email}</span>
                  {copied ? (
                    <Check size={14} className={styles.checkIcon} />
                  ) : (
                    <Copy size={12} className={styles.copyIcon} />
                  )}
                </button>

                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.pillBtn}
                  >
                    <span>{link.label}</span>
                    <ExternalLink size={12} className={styles.pillExternal} />
                  </a>
                ))}
              </div>

              <div className={styles.locationMeta}>
                <MapPin size={13} className={styles.locIcon} />
                <span>Colombo, Sri Lanka &bull; Working Worldwide</span>
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
                  sizes="(max-width: 768px) 100vw, 460px"
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
