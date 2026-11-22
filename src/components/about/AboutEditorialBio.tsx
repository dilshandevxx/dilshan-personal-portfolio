"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./AboutEditorialBio.module.css";

interface AboutEditorialBioProps {
  portraitSrc?: string;
  updatedDate?: string;
}

export default function AboutEditorialBio({
  portraitSrc = "/dilshan_portrait.jpg",
  updatedDate = "Updated November 2026",
}: AboutEditorialBioProps) {
  return (
    <section className={styles.sectionRoot} aria-label="Editorial About Me">
      {/* -------------------------------------------------------------
          1. Header Block: Dark square emblem + About Me title
          ------------------------------------------------------------- */}
      <motion.div
        className={styles.headerBlock}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.headerIcon} aria-hidden="true">
          <div className={styles.headerIconInner} />
        </div>
        <h1 className={styles.mainTitle}>About Me</h1>
      </motion.div>

      {/* -------------------------------------------------------------
          2. Two-Column Hero: Left Narrative + Right Portrait
          ------------------------------------------------------------- */}
      <motion.div
        className={styles.heroGrid}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left Column: Personal Narrative */}
        <div className={styles.bioColumn}>
          <p className={styles.paragraph}>
            Hey, I&apos;m Dilshan! Welcome to my spot on the web for{" "}
            <Link href="/portfolio/blog" className={styles.link}>
              writing
            </Link>
            ,{" "}
            <Link href="/projects" className={styles.link}>
              projects
            </Link>
            , and distributed systems architecture. I&apos;m currently working as a full-stack engineer and systems architect, and in my free time I like exploring high-throughput runtimes, reading technical treatises, biking, and specialty coffee. I spend most of my time architecting deterministic, low-latency software.
          </p>

          <p className={styles.paragraph}>
            This site is a space for self-expression, engineering craft, and to share what I&apos;ve learned with the world. It has always had no ads, no affiliate links, no tracking or analytics, no sponsored posts, and no paywall.
          </p>

          <p className={styles.paragraph}>
            I hope I can inspire others to build their own independent, high-performance corners on the web against the tsunami of bloat and artificial fluff.
          </p>

          <p className={styles.paragraph}>
            If you want to stay up to date with my technical essays, explore my{" "}
            <Link href="/portfolio/blog" className={styles.link}>
              writing
            </Link>
            , check out my{" "}
            <Link href="/projects" className={styles.link}>
              open-source code
            </Link>
            , or subscribe to the{" "}
            <Link href="/rss.xml" className={styles.link}>
              RSS feed
            </Link>
            . There&apos;s over a decade of curiosity, distributed architectures, and technical notes to peruse, so please enjoy!
          </p>
        </div>

        {/* Right Column: Clean Portrait Photo */}
        <div className={styles.portraitWrap}>
          <div className={styles.portraitFrame}>
            <Image
              src={portraitSrc}
              alt="Dilshan portrait"
              fill
              sizes="(max-width: 860px) 100vw, 340px"
              className={styles.portraitImg}
              priority
            />
          </div>
        </div>
      </motion.div>

      {/* -------------------------------------------------------------
          3. Contact Section
          ------------------------------------------------------------- */}
      <motion.div
        className={styles.sectionBlock}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className={styles.sectionHeading}>Contact</h2>
        <p className={styles.leadText}>
          Send me an email to say hi, or connect via the socials.
        </p>

        <ul className={styles.bulletList}>
          <li className={styles.bulletItem}>
            <span className={styles.bulletLabel}>Email:</span>
            <a href="mailto:dilshan.devxx@gmail.com" className={styles.link}>
              dilshan.devxx@gmail.com
            </a>
          </li>
          <li className={styles.bulletItem}>
            <a href="#contact" className={styles.link}>
              Email Newsletter
            </a>
          </li>
          <li className={styles.bulletItem}>
            <a
              href="https://github.com/dilshandevxx"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
          </li>
          <li className={styles.bulletItem}>
            <a
              href="https://linkedin.com/in/dilshan"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              LinkedIn
            </a>
          </li>
          <li className={styles.bulletItem}>
            <a
              href="https://x.com/dilshan"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Bluesky / Twitter
            </a>
          </li>
        </ul>
      </motion.div>

      {/* -------------------------------------------------------------
          4. What I'm Doing Now (Derek Sivers / Tania Rascia style)
          ------------------------------------------------------------- */}
      <motion.div
        className={styles.sectionBlock}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className={styles.sectionHeading}>What I&apos;m Doing Now</h2>
        <p className={styles.nowDate}>{updatedDate}</p>

        <ul className={styles.bulletList}>
          <li className={styles.bulletItem}>
            Working full-time on high-throughput distributed systems & low-latency inference runtimes
          </li>
          <li className={styles.bulletItem}>
            Profiling and optimizing this website for sub-second deterministic performance
          </li>
          <li className={styles.bulletItem}>
            Architecting resilient event-driven data pipelines & caching topologies
          </li>
          <li className={styles.bulletItem}>
            Deepening research into autonomous telemetry & mathematical systems modeling
          </li>
          <li className={styles.bulletItem}>
            Reading classic distributed systems papers and software craftsmanship treatises
          </li>
          <li className={styles.bulletItem}>
            Exploring specialty pour-overs & single-origin coffee brewing
          </li>
        </ul>
      </motion.div>

      {/* -------------------------------------------------------------
          5. Tools: Software & Hardware
          ------------------------------------------------------------- */}
      <motion.div
        className={styles.sectionBlock}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.toolsHeadingWrap}>
          <h2 className={styles.sectionHeading} style={{ margin: 0 }}>
            Tools
          </h2>
        </div>

        {/* Software Subheading */}
        <div style={{ marginBottom: "2.25rem" }}>
          <h3 className={styles.subHeading}>Software</h3>
          <p className={styles.leadText}>
            This website is hosted with edge performance, built with Next.js 16, React 19, and TypeScript, backed by Sanity CMS.
          </p>

          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              <span className={styles.boldTerm}>Coding:</span> Visual Studio Code / Neovim
              <ul className={styles.nestedList}>
                <li className={styles.nestedItem}>
                  Theme: <span className={styles.link}>Obsidian Minimal Dark</span>, custom syntax palette
                </li>
              </ul>
            </li>
            <li className={styles.bulletItem}>
              <span className={styles.boldTerm}>Terminal:</span> Windows Terminal / PowerShell Core / zsh
            </li>
            <li className={styles.bulletItem}>
              <span className={styles.boldTerm}>Notes:</span>{" "}
              <span className={styles.link}>Obsidian</span> (Markdown second brain)
            </li>
            <li className={styles.bulletItem}>
              <span className={styles.boldTerm}>Browser:</span> Brave / Chrome DevTools
            </li>
          </ul>
        </div>

        {/* Hardware Subheading */}
        <div>
          <h3 className={styles.subHeading}>Hardware</h3>
          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              <span className={styles.boldTerm}>Primary Workstation:</span> Apple MacBook Pro 16&quot; (M-Series), 32GB Unified RAM
            </li>
            <li className={styles.bulletItem}>
              <span className={styles.boldTerm}>Engineering &amp; Systems Rig:</span>
              <ul className={styles.nestedList}>
                <li className={styles.nestedItem}>
                  CPU: <span className={styles.link}>AMD Ryzen 9 High-Throughput Processor</span>
                </li>
                <li className={styles.nestedItem}>
                  Motherboard: PCIe Gen 4 High-Bandwidth Architecture
                </li>
                <li className={styles.nestedItem}>
                  Memory: Crucial Ballistix / 64GB High-Speed RAM
                </li>
                <li className={styles.nestedItem}>
                  Storage: NVMe M.2 2TB PCIe Gen 4 SSD (7,000 MB/s read)
                </li>
                <li className={styles.nestedItem}>
                  GPU: NVIDIA RTX Workstation Compute Accelerator
                </li>
                <li className={styles.nestedItem}>
                  Displays: Dual 4K Color-Accurate Ergonomic Displays
                </li>
                <li className={styles.nestedItem}>
                  Peripherals: Custom 65% Mechanical Keyboard (Tactile), Precision Wireless Track/Mouse
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* -------------------------------------------------------------
          Subtle divider connecting to the existing sections below
          ------------------------------------------------------------- */}
      <div className={styles.sectionDivider} aria-hidden="true" />
    </section>
  );
}
