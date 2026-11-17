import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MailIcon,
  RssIcon,
  BlueskyIcon,
  CoffeeIcon,
  NextjsIcon,
  GithubIcon,
  VercelIcon,
} from '@/components/Icons';
import styles from './about.module.css';

export const metadata = {
  title: 'About Me — Dilshan',
  description: 'Software engineer and open-source creator. Digital garden, contact, publications, tools, and miscellaneous.',
};

export default function AboutRoutePage() {
  return (
    <article className={styles.pageContainer}>
      {/* 💾 About Me Header (Screenshot 1) */}
      <h1 className={styles.headerTitle}>
        <span className={styles.floppyEmoji} role="img" aria-label="Floppy disk">
          💾
        </span>
        <span>About Me</span>
      </h1>

      {/* Two-Column Intro & Portrait Section (Screenshot 1) */}
      <div className={styles.introLayout}>
        {/* Left Column: Narrative */}
        <div className={styles.introStory}>
          <p>
            Hey, I&apos;m Dilshan! Welcome to my spot on the web for{' '}
            <Link href="/portfolio/blog" className={styles.accentSecondary}>
              writing
            </Link>
            ,{' '}
            <Link href="/portfolio" className={styles.accentPrimary}>
              projects
            </Link>
            , and art! I&apos;m currently working as a software engineer specializing in
            distributed systems and local-first architecture, and in my free time I like
            working out, biking, playing video games, and reading. I spend most of my time
            exploring durable software design and timeless computing literature.
          </p>

          <p>
            This site is a space for self-expression and to share what I&apos;ve learned with
            the world, and has always had{' '}
            <strong className={styles.strongText}>
              no ads, no affiliate links, no tracking or analytics, no sponsored posts, and no
              paywall
            </strong>
            .
          </p>

          <p>
            I hope I can inspire others to make their own creative corner on the web even
            against the tsunami of{' '}
            <a
              href="https://en.wikipedia.org/wiki/Enshittification"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.accentTertiary}
            >
              enshittification
            </a>{' '}
            on the internet.
          </p>

          <p>
            If you want to stay up to date with my posts, sign up for the{' '}
            <a
              href="mailto:hello@dilshan.dev?subject=Newsletter%20Signup"
              className={styles.accentSecondary}
            >
              newsletter
            </a>{' '}
            or subscribe to the{' '}
            <Link href="/rss.xml" className={styles.accentPrimary}>
              RSS feed
            </Link>
            . There&apos;s over a decade of articles and open-source code to peruse through,
            so please enjoy!
          </p>
        </div>

        {/* Right Column: Outdoor Candid Portrait Photo (Screenshot 1) */}
        <div className={styles.photoWrapper}>
          <div className={styles.photoFrame}>
            <Image
              src="/dilshan_portrait.jpg"
              alt="Dilshan"
              width={340}
              height={425}
              priority
              className={styles.portraitImg}
              sizes="(max-width: 820px) 320px, 340px"
            />
          </div>
        </div>
      </div>

      {/* Contact Section (Screenshot 2) */}
      <section id="contact" className={styles.sectionBlock}>
        <h2 className={styles.sectionHeading}>Contact</h2>
        <p className={styles.sectionLead}>
          Send me an email to say hi, or connect via the socials.
        </p>

        <ul className={styles.bulletList}>
          <li className={styles.bulletItem}>
            Email:{' '}
            <a href="mailto:hello@dilshan.dev" className={styles.accentSecondary}>
              hello@dilshan.dev
            </a>
          </li>
          <li className={styles.bulletItem}>
            <a
              href="mailto:hello@dilshan.dev?subject=Newsletter%20Signup"
              className={styles.accentPrimary}
            >
              Email Newsletter
            </a>
          </li>
          <li className={styles.bulletItem}>
            <a
              href="https://github.com/dilshandevxx"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.accentTertiary}
            >
              GitHub
            </a>
          </li>
          <li className={styles.bulletItem}>
            <a
              href="https://bsky.app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.accentQuaternary}
            >
              Bluesky
            </a>
          </li>
        </ul>
      </section>

      {/* What I'm Doing Now Section (Screenshot 2) */}
      <section className={styles.sectionBlock}>
        <h2 className={styles.sectionHeading}>What I&apos;m Doing Now</h2>
        <p className={styles.updatedTimestamp}>Updated August 16th, 2026</p>

        <ul className={styles.bulletList}>
          <li className={styles.bulletItem}>Working full-time on systems &amp; web architecture</li>
          <li className={styles.bulletItem}>Tweaking this website</li>
          <li className={styles.bulletItem}>Working on other websites &amp; local-first sync engines</li>
          <li className={styles.bulletItem}>Playing Marvel Rivals</li>
          <li className={styles.bulletItem}>Playing Clair Obscur</li>
          <li className={styles.bulletItem}>Brewing specialty pour-over coffee (V60 &amp; Aeropress)</li>
          <li className={styles.bulletItem}>Reading classic computer architecture &amp; systems literature</li>
        </ul>
      </section>

      {/* Tools Section: Software & Hardware (Screenshot 3) */}
      <section className={styles.sectionBlock}>
        <h2 className={styles.sectionHeading}>Tools</h2>

        {/* Software Sub-section */}
        <div>
          <h3 className={styles.subHeading}>Software</h3>
          <p className={styles.sectionLead}>
            This website is hosted on{' '}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.accentSecondary}
            >
              Vercel
            </a>{' '}
            and uses the{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.accentPrimary}
            >
              Next.js
            </a>{' '}
            (App Router) &amp; React framework.
          </p>

          <ul className={styles.bulletList} style={{ marginTop: '0.85rem' }}>
            <li className={styles.bulletItem}>
              <strong className={styles.strongText}>Coding:</strong>{' '}
              <a
                href="https://code.visualstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.accentPrimary}
              >
                Visual Studio Code
              </a>
              <ul className={styles.subBulletList}>
                <li className={styles.subBulletItem}>
                  <strong className={styles.strongText}>Theme:</strong>{' '}
                  <span className={styles.accentTertiary}>New Moon Theme</span>, my custom syntax theme!
                </li>
              </ul>
            </li>
            <li className={styles.bulletItem}>
              <strong className={styles.strongText}>Terminal:</strong>{' '}
              <span className={styles.accentPrimary}>iTerm2</span>
            </li>
            <li className={styles.bulletItem}>
              <strong className={styles.strongText}>Notes:</strong>{' '}
              <a
                href="https://obsidian.md"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.accentSecondary}
              >
                Obsidian
              </a>
            </li>
          </ul>
        </div>

        {/* Hardware Sub-section */}
        <div>
          <h3 className={styles.subHeading}>Hardware</h3>

          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              <strong className={styles.strongText}>Coding PC:</strong>{' '}
              <span className={styles.accentPrimary}>M1 MacBook Pro 16&quot; 2021, 32GB RAM</span>
            </li>
            <li className={styles.bulletItem}>
              <strong className={styles.strongText}>Gaming PC</strong>
              <ul className={styles.subBulletList}>
                <li className={styles.subBulletItem}>
                  <span>CPU:</span>{' '}
                  <a
                    href="https://www.amd.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.accentSecondary}
                  >
                    AMD Ryzen 9 5900X
                  </a>
                </li>
                <li className={styles.subBulletItem}>
                  <span>Motherboard:</span>{' '}
                  <a
                    href="https://www.asus.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.accentTertiary}
                  >
                    ASUS ProArt X570-Creator Gaming
                  </a>
                </li>
                <li className={styles.subBulletItem}>
                  <span>Memory:</span>{' '}
                  <a
                    href="https://www.crucial.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.accentPrimary}
                  >
                    Crucial Ballistix 64GB DDR4
                  </a>
                </li>
                <li className={styles.subBulletItem}>
                  <span>Storage:</span>{' '}
                  <a
                    href="https://www.samsung.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.accentSecondary}
                  >
                    SSD 970 EVO NVMe M.2 2TB
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      {/* Publications Section (Screenshot 4) */}
      <section className={styles.sectionBlock}>
        <h2 className={styles.sectionHeading}>Publications</h2>

        <ul className={styles.bulletList} style={{ gap: '0.9rem' }}>
          <li className={styles.pubItem}>
            <Link href="/portfolio/blog" className={styles.accentSecondary}>
              Understanding the GraphQL Type System
            </Link>
            <span className={styles.pubMeta}>DigitalOcean, 2023</span>
          </li>
          <li className={styles.pubItem}>
            <Link href="/portfolio/blog" className={styles.accentPrimary}>
              How To Set Up a GraphQL API Server in Node.js
            </Link>
            <span className={styles.pubMeta}>DigitalOcean, 2022</span>
          </li>
          <li className={styles.pubItem}>
            <Link href="/portfolio/blog" className={styles.accentTertiary}>
              An Introduction to GraphQL
            </Link>
            <span className={styles.pubMeta}>DigitalOcean, 2021</span>
          </li>
          <li className={styles.pubItem}>
            <Link href="/portfolio/blog" className={styles.accentSecondary}>
              How to Code in JavaScript (Tutorial Series, 32 articles)
            </Link>
            <span className={styles.pubMeta}>DigitalOcean, 2017 - 2020</span>
          </li>
          <li className={styles.pubItem}>
            <Link href="/portfolio/blog" className={styles.accentPrimary}>
              Understanding the DOM — Document Object Model (Tutorial Series, 8 articles)
            </Link>
            <span className={styles.pubMeta}>DigitalOcean, 2017 - 2018</span>
          </li>
          <li className={styles.pubItem}>
            <Link href="/portfolio/blog" className={styles.accentTertiary}>
              Setting up a RESTful API with Node.js and PostgreSQL
            </Link>
            <span className={styles.pubMeta}>LogRocket, 2018</span>
          </li>
          <li className={styles.pubItem}>
            <Link href="/portfolio/blog" className={styles.accentSecondary}>
              An Introduction to CSS Shapes
            </Link>
            <span className={styles.pubMeta}>Tympanus Codrops, 2018</span>
          </li>
          <li className={styles.pubItem}>
            <Link href="/portfolio/blog" className={styles.accentPrimary}>
              ES6 Syntax, Features and Additions: A Reference Guide
            </Link>
            <span className={styles.pubMeta}>Progress Telerik, 2018</span>
          </li>
        </ul>
      </section>

      {/* Faint divider only above Miscellaneous (Screenshot 5) */}
      <hr className={styles.subtleDivider} />

      {/* Miscellaneous Section (Screenshot 5) */}
      <section className={styles.sectionBlock} style={{ marginTop: '2.5rem' }}>
        <h2 className={styles.sectionHeading}>Miscellaneous</h2>

        <ul className={styles.bulletList}>
          <li className={styles.bulletItem}>
            <Link href="/portfolio/resume" className={styles.accentPrimary}>
              Resume
            </Link>
          </li>
          <li className={styles.bulletItem}>
            <Link href="/portfolio/shelves" className={styles.accentSecondary}>
              Illustrations &amp; Shelves
            </Link>
          </li>
        </ul>

        <p className={styles.sectionLead} style={{ paddingTop: '0.5rem' }}>
          Special thanks to{' '}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.accentTertiary}
          >
            Vercel
          </a>{' '}
          for hosting!
        </p>
      </section>

      {/* Bottom Footer Actions & Tech Badges (Screenshot 5) */}
      <footer className={styles.footerArea}>
        {/* Quick Links Row: Email signup, RSS feed, Bluesky, Buy me a coffee */}
        <div className={styles.footerActions}>
          <a
            href="mailto:hello@dilshan.dev?subject=Newsletter"
            className={styles.actionItem}
          >
            <MailIcon className={styles.actionIcon} />
            <span>Email signup</span>
          </a>
          <Link href="/rss.xml" className={styles.actionItem}>
            <RssIcon className={styles.actionIcon} />
            <span>RSS feed</span>
          </Link>
          <a
            href="https://bsky.app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionItem}
          >
            <BlueskyIcon className={styles.actionIcon} />
            <span>Bluesky</span>
          </a>
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionItem}
          >
            <CoffeeIcon className={styles.actionIcon} />
            <span>Buy me a coffee</span>
          </a>
        </div>

        {/* Pill Badges with Pattern Borders: [ Next.js ] [ GitHub ] [ Vercel ] */}
        <div className={styles.badgesRow}>
          <span className={`${styles.badgePill} ${styles.badgePrimary}`}>
            <NextjsIcon className={styles.badgeIcon} />
            <span>Next.js</span>
          </span>
          <a
            href="https://github.com/dilshandevxx"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.badgePill} ${styles.badgeSecondary}`}
          >
            <GithubIcon className={styles.badgeIcon} />
            <span>GitHub</span>
          </a>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.badgePill} ${styles.badgeTertiary}`}
          >
            <VercelIcon className={styles.badgeIcon} />
            <span>Vercel</span>
          </a>
        </div>

        {/* Made with ❤️ by Dilshan */}
        <p className={styles.signatureLine}>Made with ❤️ by Dilshan</p>
      </footer>
    </article>
  );
}
