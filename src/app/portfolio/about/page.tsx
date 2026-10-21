import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MailIcon, RssIcon, BlueskyIcon, CoffeeIcon, NextjsIcon, GithubIcon, VercelIcon } from '@/components/Icons';

export const metadata = {
  title: 'About Me — Dilshan',
  description: 'Software engineer and open-source creator. Digital garden, contact, and miscellaneous.',
};

export default function AboutRoutePage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* 💾 About Me Header */}
      <div className="border-b border-[var(--border-subtle)] pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold font-sans text-[var(--text-primary)] flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="Floppy disk">💾</span>
          <span>About Me</span>
        </h1>
      </div>

      {/* Two-Column Intro & Portrait Section Matching Screenshot 1 */}
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
              href="/portfolio/projects"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4 decoration-[var(--accent-color)]"
            >
              projects
            </Link>
            , and systems! I&apos;m currently working as a software engineer specializing in distributed systems and local-first architecture, and in my free time I like brewing specialty pour-over coffee, reading history &amp; architecture, and hiking. I spend most of my time exploring durable software design and timeless computing literature.
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
              href="/feed.xml"
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

      {/* Contact Section Matching Screenshot 1 */}
      <section id="contact" className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[var(--text-primary)]">
          Contact
        </h2>
        <p className="text-sm sm:text-base font-sans text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          I&apos;m always glad to talk about distributed systems, local-first computing, or analog rituals. The fastest way to reach me is by direct email at{' '}
          <a
            href="mailto:hello@dilshan.dev"
            className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4 decoration-[var(--accent-color)]"
          >
            hello@dilshan.dev
          </a>
          . You can also find me on{' '}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
          >
            GitHub
          </a>
          ,{' '}
          <a
            href="https://bsky.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
          >
            Bluesky
          </a>
          , and{' '}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
          >
            LinkedIn
          </a>
          .
        </p>
      </section>

      {/* Miscellaneous Section Matching Screenshot 3 */}
      <section className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[var(--text-primary)]">
          Miscellaneous
        </h2>
        <ul className="space-y-2 text-sm sm:text-base font-sans">
          <li className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
            <Link
              href="/portfolio/resume"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              Resume
            </Link>
          </li>
          <li className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
            <Link
              href="/portfolio/shelves"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              Shelves &amp; Analog Habits
            </Link>
          </li>
          <li className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
            <Link
              href="/portfolio/skills"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
            >
              Topics &amp; Systems Architecture
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

      {/* Bottom Footer Actions & Tech Badges Matching Screenshot 3 */}
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
            href="/feed.xml"
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
            href="https://github.com"
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
