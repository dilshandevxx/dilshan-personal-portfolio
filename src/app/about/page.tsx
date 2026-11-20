"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  Terminal,
  Cpu,
  Globe,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import { siteConfig } from "@/data/siteConfig";
import styles from "./aboutPage.module.css";

const WHAT_I_DO_CARDS = [
  {
    id: "ai-ml",
    title: "AI & MACHINE LEARNING",
    icon: Brain,
    image: "/images/what-i-do/what_i_do_1.png",
  },
  {
    id: "devops-k8s",
    title: "DEVOPS & KUBERNETES",
    icon: Terminal,
    image: "/images/what-i-do/what_i_do_2.png",
  },
  {
    id: "inference-rag",
    title: "MODEL INFERENCE & RAG",
    icon: Cpu,
    image: "/images/what-i-do/what_i_do_3.png",
  },
  {
    id: "cloud-architecture",
    title: "DISTRIBUTED CLOUD",
    icon: Globe,
    image: "/images/what-i-do/what_i_do_4.png",
  },
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

export default function AboutPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
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

        {/* 2. Top Hero Section: Dilshan Portrait + ABOUT ME + 4 Domain Cards with Square Corners */}
        <motion.section
          className={styles.topAboutHero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          aria-label="About Dilshan"
        >
          {/* Left Column: Dilshan Portrait (Clean, Minimal, Strictly Square Corners) */}
          <div className={styles.portraitColumn}>
            <div className={styles.portraitCard}>
              <div className={styles.portraitImageWrap}>
                <Image
                  src="/dilshan_portrait.jpg"
                  alt="Dilshan"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 420px"
                  className={styles.portraitImg}
                />
                <div className={styles.portraitGradientOverlay} />
              </div>
              <div className={styles.portraitMetaBar}>
                <div className={styles.metaIdentity}>
                  <span className={styles.metaName}>Dilshan</span>
                  <span className={styles.metaRole}>AI/ML Engineer &amp; DevOps Architect</span>
                </div>
                <div className={styles.metaLocation}>
                  <MapPin size={12} className={styles.locationPin} />
                  <span>Colombo, Sri Lanka &bull; Worldwide</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: ABOUT ME statement card + 2x2 Focus Cards */}
          <div className={styles.contentColumn}>
            {/* Upper: ABOUT ME Card (Strictly Square Corners) */}
            <div className={styles.aboutMeCard}>
              <div className={styles.aboutMeCardHeader}>
                <span className={styles.aboutMeBadge}>ABOUT ME</span>
              </div>
              <p className={styles.aboutMeCardBio}>
                Meet Dilshan: an AI/ML engineer and DevOps architect building high-throughput
                machine learning systems, optimizing GPU inference runtimes, and engineering
                resilient Kubernetes cloud infrastructure. Dedicated to stripping away unnecessary
                complexity to deliver scalable, production-grade intelligence with operational rigor.
              </p>

              {/* Square Action / Contact Pills */}
              <div className={styles.pillsRow}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={styles.squarePill}
                  title="Click to copy email address"
                >
                  <Mail size={13} />
                  <span>{copiedEmail ? "Copied to clipboard!" : siteConfig.social.email}</span>
                </button>

                <a
                  href="tel:+94771234567"
                  className={styles.squarePill}
                  aria-label="Call Dilshan"
                >
                  <Phone size={13} />
                  <span>+94 77 123 4567</span>
                </a>

                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.squarePill}
                >
                  GitHub
                </a>

                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.squarePill}
                >
                  LinkedIn
                </a>

                <a
                  href={siteConfig.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.squarePill}
                >
                  Twitter
                </a>
              </div>
            </div>

            {/* Lower: 2x2 Domain Cards (Strictly Square Corners) */}
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
                      <IconComponent size={22} className={styles.bentoCardIcon} />
                      <h4 className={styles.bentoCardTitle}>{card.title}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* 3. "From the sketchbook" Section (Clean Editorial Showcase) */}
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
            <Link href="/#contact" className={styles.seeMoreLink}>
              <span>SEE MORE DRAWINGS</span>
              <span className={styles.seeMoreArrow} aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </motion.section>
      </main>

      {/* Global Minimalist Footer */}
      <MainFooter />
    </div>
  );
}
