"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiMail,
  FiRss,
  FiCoffee,
} from "react-icons/fi";
import {
  SiBluesky,
  SiGithub,
  SiNextdotjs,
  SiVercel,
} from "react-icons/si";

import TechMascot from "./TechMascot";
import NewsletterModal from "./NewsletterModal";
import {
  RetroFloppyIcon,
  RetroFeatherIcon,
  RetroOrangeNodeIcon,
  RetroLightningIcon,
  RetroJsBadge,
  RetroDomBadge,
  RetroSystemsBadge,
  RetroQuillBadge,
} from "./RetroIcons";
import styles from "./AboutEditorialBio.module.css";

interface AboutEditorialBioProps {
  portraitSrc?: string;
  updatedDate?: string;
}

export default function AboutEditorialBio({
  portraitSrc = "/dilshan_portrait.jpg",
  updatedDate = "Updated August 16th, 2026",
}: AboutEditorialBioProps) {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <article className={styles.articleRoot} aria-label="About Dilshan">
      {/* -------------------------------------------------------------
          1. HERO & BIO MANIFESTO BLOCK (At the Very Top)
          ------------------------------------------------------------- */}
      <motion.section
        className={styles.heroSection}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Introduction and personal bio"
      >
        <div className={styles.heroContentGrid}>
          {/* Left Column: Personal Narrative & Contact */}
          <div className={styles.heroLeftCol}>
            <p className={styles.proseParagraph}>
              Hey, I&apos;m Dilshan! Welcome to my spot on the web for{" "}
              <Link href="/blog" className={styles.greenInlineLink}>
                writing
              </Link>
              ,{" "}
              <Link href="/projects" className={styles.greenInlineLink}>
                projects
              </Link>
              , and systems architecture! I&apos;m currently working as an AI/ML and full-stack systems
              engineer, and in my free time I like working out, biking, playing video games, and reading.
              I spend most of my time architecting deterministic, low-latency software.
            </p>

            <p className={styles.proseParagraph}>
              This site is a space for self-expression and to share what I&apos;ve learned with the world,
              and has always had{" "}
              <strong className={styles.boldText}>
                no ads, no affiliate links, no tracking or analytics, no sponsored posts, and no paywall
              </strong>
              .
            </p>

            <p className={styles.proseParagraph}>
              I hope I can inspire others to make their own creative corner on the web even against the
              tsunami of{" "}
              <a
                href="https://en.wikipedia.org/wiki/Enshittification"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.greenInlineLink}
              >
                enshittification
              </a>{" "}
              on the internet.
            </p>

            <p className={styles.proseParagraph}>
              If you want to stay up to date with my posts, sign up for the{" "}
              <button
                type="button"
                onClick={() => setIsNewsletterOpen(true)}
                className={styles.inlineButtonLink}
              >
                newsletter
              </button>{" "}
              or subscribe to the{" "}
              <Link href="/feed.xml" className={styles.greenInlineLink}>
                RSS feed
              </Link>
              . There&apos;s over a decade of articles and open-source code to peruse through, so please
              enjoy!
            </p>

            {/* Contact Sub-section */}
            <div className={styles.contactSubBlock}>
              <h3 className={styles.subTitle}>Contact</h3>
              <p className={styles.leadText}>
                Send me an email to say hi, or connect via the socials.
              </p>

              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDimLabel}>Email:</span>{" "}
                  <a href="mailto:dilshan.devxx@gmail.com" className={styles.greenInlineLink}>
                    dilshan.devxx@gmail.com
                  </a>
                </li>
                <li className={styles.bulletItem}>
                  <button
                    type="button"
                    onClick={() => setIsNewsletterOpen(true)}
                    className={styles.inlineButtonLink}
                  >
                    Email Newsletter
                  </button>
                </li>
                <li className={styles.bulletItem}>
                  <a
                    href="https://github.com/dilshandevxx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.greenInlineLink}
                  >
                    GitHub
                  </a>
                </li>
                <li className={styles.bulletItem}>
                  <a
                    href="https://linkedin.com/in/heydilshan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.greenInlineLink}
                  >
                    LinkedIn
                  </a>
                </li>
                <li className={styles.bulletItem}>
                  <a
                    href="https://x.com/dilshanverse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.greenInlineLink}
                  >
                    Bluesky / X
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Top-Right Round Element (Logo initially -> Flips to Portrait) */}
          <div className={styles.heroRightCol}>
            <TechMascot domainName="dilshan.dev" portraitSrc={portraitSrc} />
          </div>
        </div>
      </motion.section>

      {/* Subtle Horizontal Divider */}
      <hr className={styles.sectionDivider} aria-hidden="true" />

      {/* -------------------------------------------------------------
          2. A BRIEF TIMELINE BLOCK
          ------------------------------------------------------------- */}
      <motion.section
        className={styles.contentBlock}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        aria-label="A brief timeline"
      >
        <h2 className={styles.sectionTitle}>A brief timeline</h2>

        <div className={styles.timelineList}>
          {/* Row 1: 2018-2020 */}
          <div className={styles.timelineRow}>
            <span className={styles.timelineYear}>2018–2020</span>
            <p className={styles.timelineDesc}>
              <span className={styles.greenHighlight}>Computer Science Foundations:</span> Commenced
              formal Computer Science degree, developing deep foundations in OS kernel design,
              distributed algorithms, and networking protocols.
            </p>
          </div>

          {/* Row 2: 2020-2022 */}
          <div className={styles.timelineRow}>
            <span className={styles.timelineYear}>2020–2022</span>
            <p className={styles.timelineDesc}>
              <span className={styles.greenHighlight}>Full-Stack Developer:</span> Built resilient
              Linux utilities, high-concurrency Go microservices, and graduated with First Class
              Distinction. <span className={styles.greenHighlight}>Wrote everything down</span> along
              the way.
            </p>
          </div>

          {/* Row 3: 2022-2024 */}
          <div className={styles.timelineRow}>
            <span className={styles.timelineYear}>2022–2024</span>
            <p className={styles.timelineDesc}>
              <span className={styles.greenHighlight}>Cloud &amp; Distributed Architect:</span>{" "}
              Architected containerized Kubernetes clusters, typed API boundaries, event-driven
              data streaming, and zero-downtime deployment pipelines.
            </p>
          </div>

          {/* Row 4: 2024-now */}
          <div className={styles.timelineRow}>
            <span className={styles.timelineYear}>2024–now</span>
            <p className={styles.timelineDesc}>
              <span className={styles.greenHighlight}>AI/ML &amp; Systems Engineer:</span> Building
              LLM inference runtimes, vLLM / PagedAttention pipelines, autonomous agent
              architectures, and still documenting:{" "}
              <Link href="/blog" className={styles.greenHighlightLink}>
                50+ posts
              </Link>
              ,{" "}
              <a
                href="https://github.com/dilshandevxx"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.greenHighlightLink}
              >
                25+ open-source repos
              </a>
              , and{" "}
              <a
                href="https://github.com/dilshandevxx"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.greenHighlightLink}
              >
                1,800+ stars on GitHub
              </a>
              .
            </p>
          </div>

          {/* Summary / Also Line */}
          <div className={styles.alsoRow}>
            <p className={styles.alsoText}>
              <strong className={styles.alsoLabel}>Also:</strong> city explorer, weight-lifter,
              mechanical keyboard tinkerer, pour-over coffee brewer, Linux enthusiast, webmaster.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Subtle Horizontal Divider */}
      <hr className={styles.sectionDivider} aria-hidden="true" />

      {/* -------------------------------------------------------------
          3. WHAT I'M DOING NOW (Image 6)
          ------------------------------------------------------------- */}
      <motion.section
        className={styles.contentBlock}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        aria-label="What I'm doing now"
      >
        <h2 className={styles.sectionTitle}>What I&apos;m Doing Now</h2>
        <p className={styles.dateStamp}>{updatedDate}</p>

        <ul className={styles.bulletList}>
          <li className={styles.bulletItem}>Working full-time</li>
          <li className={styles.bulletItem}>Tweaking this website</li>
          <li className={styles.bulletItem}>Working on other open-source websites</li>
          <li className={styles.bulletItem}>Playing Marvel Rivals</li>
          <li className={styles.bulletItem}>Playing Clair Obscur</li>
          <li className={styles.bulletItem}>Playing Magic the Gathering</li>
          <li className={styles.bulletItem}>Brewing specialty pour-over coffee &amp; tuning keyboards!</li>
        </ul>
      </motion.section>

      {/* Subtle Horizontal Divider */}
      <hr className={styles.sectionDivider} aria-hidden="true" />

      {/* -------------------------------------------------------------
          4. TOOLS (SOFTWARE & HARDWARE) (Image 6)
          ------------------------------------------------------------- */}
      <motion.section
        className={styles.contentBlock}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Software and hardware tools"
      >
        <h2 className={styles.sectionTitle}>Tools</h2>

        {/* Software Block */}
        <div className={styles.subCategoryBlock}>
          <h3 className={styles.subTitle}>Software</h3>
          <p className={styles.leadText}>
            This website is hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.greenInlineLink}
            >
              Vercel
            </a>{" "}
            and uses the{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.greenInlineLink}
            >
              Next.js
            </a>{" "}
            App Router framework.
          </p>

          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              <strong className={styles.bulletBoldLabel}>Coding:</strong>{" "}
              <a
                href="https://code.visualstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.greenInlineLink}
              >
                Visual Studio Code
              </a>
              <ul className={styles.nestedBulletList}>
                <li className={styles.nestedBulletItem}>
                  Theme:{" "}
                  <a
                    href="https://github.com/taniarascia/new-moon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.greenInlineLink}
                  >
                    New Moon Theme
                  </a>
                  , my custom syntax theme!
                </li>
              </ul>
            </li>
            <li className={styles.bulletItem}>
              <strong className={styles.bulletBoldLabel}>Terminal:</strong>{" "}
              <a
                href="https://iterm2.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.greenInlineLink}
              >
                iTerm2
              </a>{" "}
              / Windows Terminal
            </li>
            <li className={styles.bulletItem}>
              <strong className={styles.bulletBoldLabel}>Notes:</strong>{" "}
              <a
                href="https://obsidian.md"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.greenInlineLink}
              >
                Obsidian
              </a>
            </li>
          </ul>
        </div>

        {/* Hardware Block */}
        <div className={styles.subCategoryBlock}>
          <h3 className={styles.subTitle}>Hardware</h3>

          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              <strong className={styles.bulletBoldLabel}>Coding PC:</strong> M1 MacBook Pro 16&quot;
              2021, 32GB RAM
            </li>
            <li className={styles.bulletItem}>
              <strong className={styles.bulletBoldLabel}>Gaming &amp; ML Rig</strong>
              <ul className={styles.nestedBulletList}>
                <li className={styles.nestedBulletItem}>
                  CPU:{" "}
                  <a
                    href="https://www.amd.com/en/products/cpu/amd-ryzen-5-3600"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.greenInlineLink}
                  >
                    AMD Ryzen 5 3600
                  </a>
                </li>
                <li className={styles.nestedBulletItem}>
                  Motherboard:{" "}
                  <a
                    href="https://www.asrock.com/mb/AMD/B550%20Phantom%20Gaming%204/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.greenInlineLink}
                  >
                    ASRock B550 Phantom Gaming 4
                  </a>
                </li>
                <li className={styles.nestedBulletItem}>
                  Memory:{" "}
                  <a
                    href="https://www.crucial.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.greenInlineLink}
                  >
                    Crucial Ballistix 32GB
                  </a>
                </li>
                <li className={styles.nestedBulletItem}>
                  Storage:{" "}
                  <a
                    href="https://www.samsung.com/us/computing/memory-storage/solid-state-drives/ssd-970-evo-plus-nvme-m-2-1tb-mz-v7s1t0b-am/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.greenInlineLink}
                  >
                    SSD 970 EVO NVMe M.2 1TB
                  </a>
                </li>
                <li className={styles.nestedBulletItem}>
                  GPU:{" "}
                  <a
                    href="https://www.amd.com/en/products/graphics/amd-radeon-rx-6950-xt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.greenInlineLink}
                  >
                    Radeon 6950XT
                  </a>
                </li>
                <li className={styles.nestedBulletItem}>
                  PSU:{" "}
                  <a
                    href="https://www.evga.com/products/product.aspx?pn=220-G3-0650-Y1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.greenInlineLink}
                  >
                    EVGA SuperNOVA 650 G+
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </motion.section>

      {/* Subtle Horizontal Divider */}
      <hr className={styles.sectionDivider} aria-hidden="true" />

      {/* -------------------------------------------------------------
          5. SERIES (DEEP DIVES) (Image 3)
          ------------------------------------------------------------- */}
      <motion.section
        className={styles.contentBlock}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Multi-part guides and series"
      >
        <h2 className={styles.sectionTitle}>Series</h2>
        <p className={styles.leadText}>Some things I wrote span years or dozens of parts.</p>

        <div className={styles.seriesList}>
          {/* Series 1: JavaScript */}
          <div className={styles.seriesCard}>
            <RetroJsBadge size={32} />
            <div className={styles.seriesInfo}>
              <Link href="/blog" className={styles.seriesTitleLink}>
                How to Code in JavaScript &amp; TypeScript
              </Link>
              <p className={styles.seriesDescription}>
                A course on the fundamentals of the JavaScript and TypeScript language, from syntax
                and data types to objects, loops, async iterators, and functions. Originally written for
                DigitalOcean.
              </p>
            </div>
          </div>

          {/* Series 2: Understanding the DOM */}
          <div className={styles.seriesCard}>
            <RetroDomBadge size={32} />
            <div className={styles.seriesInfo}>
              <Link href="/blog" className={styles.seriesTitleLink}>
                Understanding the DOM &amp; Browser Runtimes
              </Link>
              <p className={styles.seriesDescription}>
                Learn how to communicate with a web browser by understanding, traversing, and making
                changes to the Document Object Model. Originally written for DigitalOcean.
              </p>
            </div>
          </div>

          {/* Series 3: Distributed Systems */}
          <div className={styles.seriesCard}>
            <RetroSystemsBadge size={32} />
            <div className={styles.seriesInfo}>
              <Link href="/blog" className={styles.seriesTitleLink}>
                Distributed Systems &amp; Storage Engines from Scratch
              </Link>
              <p className={styles.seriesDescription}>
                The post series that started it all for low-latency engineering! A three-part deep dive
                on storage engines, write-ahead logs, and consensus algorithms.
              </p>
            </div>
          </div>

          {/* Series 4: Year in Review */}
          <div className={styles.seriesCard}>
            <RetroQuillBadge size={32} />
            <div className={styles.seriesInfo}>
              <Link href="/blog" className={styles.seriesTitleLink}>
                Year in Review
              </Link>
              <p className={styles.seriesDescription}>
                A retrospective on life, work, engineering breakthroughs, and goals at the end of each
                year.
              </p>
            </div>
          </div>

          {/* Series 5: Redesigns */}
          <div className={styles.seriesCard}>
            <RetroFloppyIcon size={30} />
            <div className={styles.seriesInfo}>
              <Link href="/blog" className={styles.seriesTitleLink}>
                Redesigns of this website
              </Link>
              <p className={styles.seriesDescription}>
                This site gets tweaked a lot. Read about the design decisions, CSS custom properties,
                and performance tuning!
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Subtle Horizontal Divider */}
      <hr className={styles.sectionDivider} aria-hidden="true" />

      {/* -------------------------------------------------------------
          6. LATEST POSTS (Image 2)
          ------------------------------------------------------------- */}
      <motion.section
        className={styles.contentBlock}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Latest blog articles"
      >
        <div className={styles.latestHeaderRow}>
          <h2 className={styles.sectionTitle}>Latest</h2>
          <Link href="/blog" className={styles.allPostsPillBtn}>
            All Posts
          </Link>
        </div>

        <div className={styles.postsList}>
          {/* Post 1: Apache ECharts */}
          <div className={styles.postRow}>
            <div className={styles.postLeftMeta}>
              <RetroFeatherIcon size={18} className={styles.postIcon} />
              <div className={styles.postTitleCol}>
                <Link
                  href="/blog/enabling-apache-echarts-in-react"
                  className={styles.postTitle}
                >
                  Enabling Apache ECharts in React for Data Visualization
                </Link>
                <span className={styles.postDate}>March 31</span>
              </div>
            </div>
            <div className={styles.postTagsRow}>
              <span className={styles.postTag}>#javascript</span>
              <span className={styles.postTag}>#react</span>
              <span className={styles.postTag}>#data-visualization</span>
            </div>
          </div>

          {/* Post 2: Year in Review 2024 */}
          <div className={styles.postRow}>
            <div className={styles.postLeftMeta}>
              <RetroFloppyIcon size={18} className={styles.postIcon} />
              <div className={styles.postTitleCol}>
                <Link
                  href="/blog/resilience-in-distributed-systems"
                  className={styles.postTitle}
                >
                  Year in Review: 2024
                </Link>
                <span className={styles.postDate}>March 27</span>
              </div>
            </div>
            <div className={styles.postTagsRow}>
              <span className={styles.postTag}>#meta</span>
              <span className={styles.postTag}>#year-in-review</span>
            </div>
          </div>

          {/* Post 3: Redesign Version 7.0 */}
          <div className={styles.postRow}>
            <div className={styles.postLeftMeta}>
              <RetroFloppyIcon size={18} className={styles.postIcon} />
              <div className={styles.postTitleCol}>
                <Link
                  href="/blog/zero-dependency-web-design"
                  className={styles.postTitle}
                >
                  Redesign: Version 7.0
                </Link>
                <span className={styles.postDate}>December 1</span>
              </div>
            </div>
            <div className={styles.postTagsRow}>
              <span className={styles.postTag}>#meta</span>
              <span className={styles.postTag}>#redesign</span>
            </div>
          </div>

          {/* Post 4: Keyboard Shortcut Hook */}
          <div className={styles.postRow}>
            <div className={styles.postLeftMeta}>
              <RetroOrangeNodeIcon size={18} className={styles.postIcon} />
              <div className={styles.postTitleCol}>
                <Link
                  href="/blog/lost-art-of-readable-code"
                  className={styles.postTitle}
                >
                  Creating a Keyboard Shortcut Hook in React (Deep Dive)
                </Link>
                <span className={styles.postDate}>October 19</span>
              </div>
            </div>
            <div className={styles.postTagsRow}>
              <span className={styles.postTag}>#javascript</span>
              <span className={styles.postTag}>#react</span>
              <span className={styles.postTag}>#caching</span>
            </div>
          </div>

          {/* Post 5: Resilience in Distributed Systems */}
          <div className={styles.postRow}>
            <div className={styles.postLeftMeta}>
              <RetroLightningIcon size={18} className={styles.postIcon} />
              <div className={styles.postTitleCol}>
                <Link
                  href="/blog/resilience-in-distributed-systems"
                  className={styles.postTitle}
                >
                  Designing for Resilience: The Architecture of Failure
                </Link>
                <span className={styles.postDate}>March 12</span>
              </div>
            </div>
            <div className={styles.postTagsRow}>
              <span className={styles.postTag}>#distributed-systems</span>
              <span className={styles.postTag}>#architecture</span>
              <span className={styles.postTag}>#go</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Subtle Horizontal Divider */}
      <hr className={styles.sectionDivider} aria-hidden="true" />

      {/* -------------------------------------------------------------
          7. MISCELLANEOUS (Images 7 & 8)
          ------------------------------------------------------------- */}
      <motion.section
        className={styles.contentBlock}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Miscellaneous links"
      >
        <h2 className={styles.sectionTitle}>Miscellaneous</h2>

        <ul className={styles.bulletList}>
          <li className={styles.bulletItem}>
            <Link href="/resume" className={styles.greenInlineLink}>
              Resume
            </Link>
          </li>
          <li className={styles.bulletItem}>
            <Link href="/guides" className={styles.greenInlineLink}>
              Engineering Guides &amp; References
            </Link>
          </li>
        </ul>

        <p className={styles.specialThanksText}>
          Special thanks to{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.greenInlineLink}
          >
            Vercel
          </a>{" "}
          and the open-source community for hosting and tooling!
        </p>
      </motion.section>

      {/* Subtle Horizontal Divider */}
      <hr className={styles.sectionDivider} aria-hidden="true" />

      {/* -------------------------------------------------------------
          8. CONNECTED FOOTER / BRAND BAR (Image 4: Tania Rascia Style)
          ------------------------------------------------------------- */}
      <footer className={styles.taniaFooterBar} role="contentinfo" aria-label="Social connect and platform badges">
        {/* Social Icon Links */}
        <div className={styles.footerSocialsRow}>
          <button
            type="button"
            onClick={() => setIsNewsletterOpen(true)}
            className={styles.footerSocialLink}
          >
            <FiMail size={16} />
            <span>Email signup</span>
          </button>

          <Link href="/feed.xml" className={styles.footerSocialLink}>
            <FiRss size={16} />
            <span>RSS feed</span>
          </Link>

          <a
            href="https://x.com/dilshanverse"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerSocialLink}
          >
            <SiBluesky size={15} />
            <span>Bluesky</span>
          </a>

          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerSocialLink}
          >
            <FiCoffee size={16} />
            <span>Buy me a coffee</span>
          </a>
        </div>

        {/* Platform Technology Pills */}
        <div className={styles.footerPillsRow}>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.techPill} ${styles.nextjsPill}`}
          >
            <SiNextdotjs size={15} />
            <span>Next.js</span>
          </a>

          <a
            href="https://github.com/dilshandevxx"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.techPill} ${styles.githubPill}`}
          >
            <SiGithub size={15} />
            <span>GitHub</span>
          </a>

          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.techPill} ${styles.vercelPill}`}
          >
            <SiVercel size={13} />
            <span>Vercel</span>
          </a>
        </div>

        {/* Signature note */}
        <p className={styles.signatureNote}>
          Made with ❤️ by Dilshan
        </p>
      </footer>

      {/* Interactive Newsletter Subscription Modal */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />
    </article>
  );
}
