import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MailIcon, RssIcon, BlueskyIcon, CoffeeIcon, NextjsIcon, GithubIcon, VercelIcon } from '@/components/Icons';

export const metadata = {
  title: 'About Me — Dilshan',
  description: 'Software engineer and open-source creator. Digital garden, contact, publications, tools, and miscellaneous.',
};

export default function AboutRoutePage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* 💾 About Me Header (Screenshot 1) */}
      <div className="border-b border-[var(--border-subtle)] pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold font-sans text-[var(--text-primary)] flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="Floppy disk">💾</span>
          <span>About Me</span>
        </h1>
      </div>

      {/* Two-Column Intro & Portrait Section (Screenshot 1) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Narrative (7 cols on desktop) */}
        <div className="md:col-span-7 space-y-5 text-sm sm:text-base font-sans text-[var(--text-secondary)] leading-relaxed">
          <p>
            Hey, I&apos;m Dilshan! Welcome to my spot on the web for{' '}
            <Link
              href="/portfolio/blog"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4 decoration-[var(--accent-color)]"
            >
              writing
            </Link>
            ,{' '}
            <Link
              href="/portfolio"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4 decoration-[var(--accent-color)]"
            >
              projects
            </Link>
            , and art! I&apos;m currently working as a software engineer specializing in distributed systems and local-first architecture, and in my free time I like working out, biking, playing video games, and reading. I spend most of my time exploring durable software design and timeless computing literature.
          </p>

          <p>
            This site is a space for self-expression and to share what I&apos;ve learned with the world, and has always had{' '}
            <strong className="text-[var(--text-primary)] font-semibold">
              no ads, no affiliate links, no tracking or analytics, no sponsored posts, and no paywall
            </strong>
            .
          </p>

          <p>
            I hope I can inspire others to make their own creative corner on the web even against the tsunami of{' '}
            <a
              href="https://en.wikipedia.org/wiki/Enshittification"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4 decoration-[var(--accent-color)]"
            >
              enshittification
            </a>{' '}
            on the internet.
          </p>

          <p>
            If you want to stay up to date with my posts, sign up for the{' '}
            <a
              href="mailto:hello@dilshan.dev?subject=Newsletter%20Signup"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4 decoration-[var(--accent-color)]"
            >
              newsletter
            </a>{' '}
            or subscribe to the{' '}
            <Link
              href="/rss.xml"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4 decoration-[var(--accent-color)]"
            >
              RSS feed
            </Link>
            . There&apos;s over a decade of articles and open-source code to peruse through, so please enjoy!
          </p>
        </div>

        {/* Right Column: Outdoor Candid Portrait Photo (5 cols on desktop) */}
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-xl overflow-hidden shadow-xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
            <Image
              src="/dilshan_portrait.jpg"
              alt="Dilshan smiling outdoors in nature"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 340px"
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* Contact Section (Screenshot 2) */}
      <section id="contact" className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[var(--text-primary)]">
          Contact
        </h2>
        <p className="text-sm sm:text-base font-sans text-[var(--text-secondary)] leading-relaxed">
          Send me an email to say hi, or connect via the socials.
        </p>

        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base font-sans marker:text-[var(--text-muted)] text-[var(--text-secondary)]">
          <li>
            Email:{' '}
            <a
              href="mailto:hello@dilshan.dev"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              hello@dilshan.dev
            </a>
          </li>
          <li>
            <a
              href="mailto:hello@dilshan.dev?subject=Newsletter%20Signup"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              Email Newsletter
            </a>
          </li>
          <li>
            <a
              href="https://github.com/dilshandevxx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://bsky.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              Bluesky
            </a>
          </li>
        </ul>
      </section>

      {/* What I'm Doing Now Section (Screenshot 2) */}
      <section className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[var(--text-primary)]">
          What I&apos;m Doing Now
        </h2>
        <p className="text-xs sm:text-sm font-sans italic text-[var(--text-muted)]">
          Updated August 16th, 2026
        </p>

        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base font-sans marker:text-[var(--text-muted)] text-[var(--text-secondary)]">
          <li>Working full-time on distributed systems &amp; open-source software</li>
          <li>Tweaking this digital garden website</li>
          <li>Building durable offline-first systems, local sync engines, and developer tooling</li>
          <li>Brewing specialty pour-over coffee (V60 &amp; Aeropress single-origin roasts)</li>
          <li>Reading classic systems architecture and computing history books</li>
        </ul>
      </section>

      {/* Tools Section: Software & Hardware (Screenshot 3) */}
      <section className="pt-6 border-t border-[var(--border-subtle)] space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[var(--text-primary)]">
          Tools
        </h2>

        {/* Software Sub-section */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-[var(--text-primary)]">
            Software
          </h3>
          <p className="text-sm sm:text-base font-sans text-[var(--text-secondary)] leading-relaxed">
            This website is hosted on{' '}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              Vercel
            </a>{' '}
            and uses the{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              Next.js
            </a>{' '}
            (App Router) &amp; React framework.
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base font-sans marker:text-[var(--text-muted)] text-[var(--text-secondary)]">
            <li>
              <strong className="text-[var(--text-primary)] font-semibold">Coding:</strong>{' '}
              <a
                href="https://code.visualstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
              >
                Visual Studio Code
              </a>
              <ul className="list-[circle] pl-5 mt-1 space-y-1 text-xs sm:text-sm text-[var(--text-muted)]">
                <li>
                  <strong className="text-[var(--text-primary)] font-medium">Theme:</strong>{' '}
                  <span className="text-[var(--accent-color)] font-medium">New Moon Theme</span> / Tokyo Night, my custom syntax theme!
                </li>
              </ul>
            </li>
            <li>
              <strong className="text-[var(--text-primary)] font-semibold">Terminal:</strong>{' '}
              <span className="text-[var(--accent-color)] font-medium">iTerm2</span> / WezTerm / pwsh
            </li>
            <li>
              <strong className="text-[var(--text-primary)] font-semibold">Notes:</strong>{' '}
              <a
                href="https://obsidian.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
              >
                Obsidian
              </a>
            </li>
          </ul>
        </div>

        {/* Hardware Sub-section */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-[var(--text-primary)]">
            Hardware
          </h3>

          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base font-sans marker:text-[var(--text-muted)] text-[var(--text-secondary)]">
            <li>
              <strong className="text-[var(--text-primary)] font-semibold">Coding PC:</strong>{' '}
              M1 MacBook Pro 16&quot; 2021, 32GB RAM
            </li>
            <li>
              <strong className="text-[var(--text-primary)] font-semibold">Gaming &amp; Workstation PC</strong>
              <ul className="list-[circle] pl-5 mt-1 space-y-1 text-xs sm:text-sm text-[var(--text-secondary)]">
                <li>
                  <span className="text-[var(--text-muted)]">CPU:</span>{' '}
                  <span className="text-[var(--accent-color)] font-medium">AMD Ryzen 9 5900X / 12-Core</span>
                </li>
                <li>
                  <span className="text-[var(--text-muted)]">Motherboard:</span>{' '}
                  <span className="text-[var(--accent-color)] font-medium">ASUS ProArt X570-Creator Gaming</span>
                </li>
                <li>
                  <span className="text-[var(--text-muted)]">Memory:</span>{' '}
                  <span className="text-[var(--accent-color)] font-medium">Crucial Ballistix 64GB DDR4</span>
                </li>
                <li>
                  <span className="text-[var(--text-muted)]">Storage:</span>{' '}
                  <span className="text-[var(--accent-color)] font-medium">SSD 970 EVO NVMe M.2 2TB</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      {/* Publications Section (Screenshot 4) */}
      <section className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[var(--text-primary)]">
          Publications
        </h2>

        <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base font-sans marker:text-[var(--text-muted)]">
          <li>
            <Link
              href="/portfolio/blog"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              Understanding the GraphQL &amp; Distributed Consensus Systems
            </Link>
            <p className="text-xs sm:text-sm italic text-[var(--text-muted)] pl-1 pt-0.5">
              DigitalOcean &amp; Architecture Notes, 2024
            </p>
          </li>
          <li>
            <Link
              href="/portfolio/blog"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              How To Set Up a Resilient Microservices API Cluster with Docker &amp; Kubernetes
            </Link>
            <p className="text-xs sm:text-sm italic text-[var(--text-muted)] pl-1 pt-0.5">
              Systems Engineering Guide, 2024
            </p>
          </li>
          <li>
            <Link
              href="/portfolio/blog"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              Zero-Dependency Web Design &amp; The Timeless Web
            </Link>
            <p className="text-xs sm:text-sm italic text-[var(--text-muted)] pl-1 pt-0.5">
              Digital Garden Essay Series, 2023
            </p>
          </li>
          <li>
            <Link
              href="/portfolio/blog"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              Setting up a Production RAG Platform with Hybrid Retrieval &amp; Vector Search
            </Link>
            <p className="text-xs sm:text-sm italic text-[var(--text-muted)] pl-1 pt-0.5">
              AI/ML Engineering, 2023
            </p>
          </li>
          <li>
            <Link
              href="/portfolio/blog"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              The Lost Art of Readable &amp; Maintainable Software
            </Link>
            <p className="text-xs sm:text-sm italic text-[var(--text-muted)] pl-1 pt-0.5">
              Software Craftsmanship, 2022
            </p>
          </li>
        </ul>
      </section>

      {/* Miscellaneous Section (Screenshot 5) */}
      <section className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[var(--text-primary)]">
          Miscellaneous
        </h2>

        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base font-sans marker:text-[var(--text-muted)]">
          <li>
            <Link
              href="/portfolio/resume"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              Resume
            </Link>
          </li>
          <li>
            <Link
              href="/portfolio/shelves"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              Shelves &amp; Everyday Gear
            </Link>
          </li>
        </ul>

        <p className="text-sm font-sans text-[var(--text-secondary)] pt-2">
          Special thanks to{' '}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
          >
            Vercel
          </a>{' '}
          for hosting!
        </p>
      </section>

      {/* Bottom Footer Actions & Tech Badges (Screenshot 5) */}
      <div className="pt-10 border-t border-[var(--border-subtle)] space-y-6">
        {/* Quick Links Row: Email signup, RSS feed, Bluesky, Buy me a coffee */}
        <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-[var(--text-secondary)]">
          <a
            href="mailto:hello@dilshan.dev?subject=Newsletter"
            className="flex items-center gap-2 hover:text-[var(--accent-color)] transition-colors"
          >
            <MailIcon className="w-4 h-4 text-[var(--text-muted)]" />
            <span>Email signup</span>
          </a>
          <Link
            href="/rss.xml"
            className="flex items-center gap-2 hover:text-[var(--accent-color)] transition-colors"
          >
            <RssIcon className="w-4 h-4 text-[var(--text-muted)]" />
            <span>RSS feed</span>
          </Link>
          <a
            href="https://bsky.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--accent-color)] transition-colors"
          >
            <BlueskyIcon className="w-4 h-4 text-[var(--text-muted)]" />
            <span>Bluesky</span>
          </a>
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--accent-color)] transition-colors"
          >
            <CoffeeIcon className="w-4 h-4 text-[var(--text-muted)]" />
            <span>Buy me a coffee</span>
          </a>
        </div>

        {/* Pill Badges: [ Next.js ] [ GitHub ] [ Vercel ] */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-card)] text-xs font-mono text-[var(--text-primary)]">
            <NextjsIcon className="w-4 h-4" />
            <span>Next.js</span>
          </span>
          <a
            href="https://github.com/dilshandevxx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-card)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--accent-color)] transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-card)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--accent-color)] transition-colors"
          >
            <VercelIcon className="w-3.5 h-3.5" />
            <span>Vercel</span>
          </a>
        </div>

        {/* Made with ❤️ by Dilshan */}
        <p className="text-sm font-sans text-[var(--text-muted)]">
          Made with ❤️ by Dilshan
        </p>
      </div>
    </div>
  );
}
