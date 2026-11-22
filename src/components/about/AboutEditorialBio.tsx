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
  updatedDate = "Updated August 16th, 2026",
}: AboutEditorialBioProps) {
  return (
    <section className={styles.sectionRoot} aria-label="About Me & Setup">
      {/* -------------------------------------------------------------
          1. Header Block: Dark square emblem + About Me title
          ------------------------------------------------------------- */}
      <motion.div
        className={styles.headerBlock}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.headerSquare} aria-hidden="true" />
        <h1 className={styles.mainTitle}>About Me</h1>
      </motion.div>

      {/* -------------------------------------------------------------
          2. Two-Column Hero Grid:
             - Left: Bio paragraphs + Contact section
             - Right: Dilshan's Portrait Photo
          ------------------------------------------------------------- */}
      <div className={styles.heroGrid}>
        {/* Left Column: Personal Narrative + Contact */}
        <motion.div
          className={styles.bioColumn}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.paragraph}>
            Hey, I&apos;m Dilshan! Welcome to my spot on the web for{" "}
            <Link href="/portfolio/blog" className={styles.link}>
              writing
            </Link>
            ,{" "}
            <Link href="/projects" className={styles.link}>
              projects
            </Link>
            , and systems architecture! I&apos;m currently working as a full-stack engineer and distributed systems architect, and in my free time I like working out, biking, playing video games, and reading. I spend most of my time architecting deterministic, low-latency software.
          </p>

          <p className={styles.paragraph}>
            This site is a space for self-expression and to share what I&apos;ve learned with the world, and has always had{" "}
            <strong className={styles.strongText}>
              no ads, no affiliate links, no tracking or analytics, no sponsored posts, and no paywall
            </strong>
            .
          </p>

          <p className={styles.paragraph}>
            I hope I can inspire others to make their own creative corner on the web even against the tsunami of{" "}
            <a
              href="https://en.wikipedia.org/wiki/Enshittification"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              enshittification
            </a>{" "}
            on the internet.
          </p>

          <p className={styles.paragraph}>
            If you want to stay up to date with my posts, sign up for the{" "}
            <a href="#contact" className={styles.link}>
              newsletter
            </a>{" "}
            or subscribe to the{" "}
            <Link href="/rss.xml" className={styles.link}>
              RSS feed
            </Link>
            . There&apos;s over a decade of articles and open-source code to peruse through, so please enjoy!
          </p>

          {/* Contact Section directly inside the left column beside the photo */}
          <div className={styles.contactSubSection}>
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
                  href="https://x.com/dilshan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Bluesky
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Right Column: Dilshan Portrait Card */}
        <motion.div
          className={styles.portraitWrap}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.portraitFrame}>
            <Image
              src={portraitSrc}
              alt="Dilshan portrait"
              fill
              sizes="(max-width: 860px) 100vw, 360px"
              className={styles.portraitImg}
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* -------------------------------------------------------------
          3. What I'm Doing Now (Spans naturally below the grid)
          ------------------------------------------------------------- */}
      <motion.div
        className={styles.sectionBlock}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className={styles.sectionHeading}>What I&apos;m Doing Now</h2>
        <p className={styles.nowDate}>{updatedDate}</p>

        <ul className={styles.bulletList}>
          <li className={styles.bulletItem}>Working full-time</li>
          <li className={styles.bulletItem}>Tweaking this website</li>
          <li className={styles.bulletItem}>Working on other websites</li>
          <li className={styles.bulletItem}>Playing Marvel Rivals</li>
          <li className={styles.bulletItem}>Playing Clair Obscur</li>
        </ul>
      </motion.div>

      {/* -------------------------------------------------------------
          4. Tools: Software & Hardware
          ------------------------------------------------------------- */}
      <motion.div
        className={styles.toolsSection}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className={styles.sectionHeading}>Tools</h2>
        <div className={styles.toolsDivider} aria-hidden="true" />

        {/* Software Subheading */}
        <div className={styles.subCategoryBlock}>
          <h3 className={styles.subHeading}>Software</h3>
          <p className={styles.leadText}>
            This website is hosted on{" "}
            <a
              href="https://netlify.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Netlify
            </a>{" "}
            and uses the{" "}
            <a
              href="https://www.gatsbyjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Gatsby
            </a>{" "}
            SSG framework.
          </p>

          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              <span className={styles.boldTerm}>Coding:</span>{" "}
              <a
                href="https://code.visualstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Visual Studio Code
              </a>
              <ul className={styles.nestedList}>
                <li className={styles.nestedItem}>
                  Theme:{" "}
                  <a
                    href="https://github.com/taniarascia/new-moon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    New Moon Theme
                  </a>
                  , my custom syntax theme!
                </li>
              </ul>
            </li>
            <li className={styles.bulletItem}>
              <span className={styles.boldTerm}>Terminal:</span>{" "}
              <a
                href="https://iterm2.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                iTerm2
              </a>
            </li>
            <li className={styles.bulletItem}>
              <span className={styles.boldTerm}>Notes:</span>{" "}
              <a
                href="https://obsidian.md"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Obsidian
              </a>
            </li>
          </ul>
        </div>

        {/* Hardware Subheading */}
        <div className={styles.subCategoryBlock}>
          <h3 className={styles.subHeading}>Hardware</h3>

          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              <span className={styles.boldTerm}>Coding PC:</span> M1 MacBook Pro 16&quot; 2021, 32GB RAM
            </li>
            <li className={styles.bulletItem}>
              <span className={styles.boldTerm}>Gaming PC</span>
              <ul className={styles.nestedList}>
                <li className={styles.nestedItem}>
                  CPU:{" "}
                  <a
                    href="https://www.amd.com/en/products/cpu/amd-ryzen-5-3600"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    AMD Ryzen 5 3600
                  </a>
                </li>
                <li className={styles.nestedItem}>
                  Motherboard:{" "}
                  <a
                    href="https://www.asrock.com/mb/AMD/B550%20Phantom%20Gaming%204/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    ASRock B550 Phantom Gaming 4
                  </a>
                </li>
                <li className={styles.nestedItem}>
                  Memory:{" "}
                  <a
                    href="https://www.crucial.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Crucial Ballistix 32GB
                  </a>
                </li>
                <li className={styles.nestedItem}>
                  Storage:{" "}
                  <a
                    href="https://www.samsung.com/us/computing/memory-storage/solid-state-drives/ssd-970-evo-plus-nvme-m-2-1tb-mz-v7s1t0b-am/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    SSD 970 EVO NVMe M.2 1TB
                  </a>
                </li>
                <li className={styles.nestedItem}>
                  GPU:{" "}
                  <a
                    href="https://www.amd.com/en/products/graphics/amd-radeon-rx-6950-xt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Radeon 6950XT
                  </a>
                </li>
                <li className={styles.nestedItem}>
                  PSU:{" "}
                  <a
                    href="https://www.evga.com/products/product.aspx?pn=220-G3-0650-Y1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    EVGA SuperNOVA 650 G+
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* -------------------------------------------------------------
          Subtle bottom divider linking cleanly to the lower sections
          ------------------------------------------------------------- */}
      <div className={styles.sectionDivider} aria-hidden="true" />
    </section>
  );
}
