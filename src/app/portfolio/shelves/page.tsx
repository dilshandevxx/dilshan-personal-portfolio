import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/content';
import { guidesData } from '@/data/guides';
import { shelvesData } from '@/data/shelves';
import {
  BookOpen,
  Coffee,
  Music,
  Compass,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  Clock,
  Terminal,
  Cpu,
  Server,
  Code2,
} from 'lucide-react';
import { AmbientPlayer } from '@/components/AmbientPlayer';

export const metadata = {
  title: 'Shelves — Dilshan',
  description: 'Curated technical guides, architecture deep dives, reading list, and analog everyday rituals.',
};

export default function ShelvesPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* 🔍 Shelves Header (Tania Rascia Style) */}
      <header className="space-y-3 border-b border-[var(--border-subtle)] pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-[var(--text-primary)] flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label="Magnifying glass">🔍</span>
            <span>Shelves</span>
          </h1>
          <AmbientPlayer />
        </div>
        <p className="text-sm sm:text-base font-sans text-[var(--text-secondary)] max-w-3xl leading-relaxed">
          A curated record of systems, blueprints, books, and analog rituals. Architecture deep dives, technical knowledge shelves, and durable everyday gear.
        </p>

        {/* Section Quick-Jump Anchors */}
        <div className="flex flex-wrap gap-2 pt-2">
          <a
            href="#guides"
            className="px-3 py-1 rounded-full text-xs font-mono border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] transition-colors"
          >
            #guides
          </a>
          <a
            href="#shelves"
            className="px-3 py-1 rounded-full text-xs font-mono border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] transition-colors"
          >
            #technical-shelves
          </a>
          <a
            href="#books"
            className="px-3 py-1 rounded-full text-xs font-mono border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] transition-colors"
          >
            #bookshelf
          </a>
          <a
            href="#gear"
            className="px-3 py-1 rounded-full text-xs font-mono border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] transition-colors"
          >
            #analog-gear
          </a>
        </div>
      </header>

      {/* 1. Guides & Deep Dives */}
      <section id="guides" className="space-y-8 scroll-mt-20">
        <div className="flex items-center gap-2.5 border-b border-[var(--border-subtle)] pb-3">
          <Layers className="w-5 h-5 text-[var(--accent-color)]" />
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[var(--text-primary)]">
            Guides &amp; Deep Dives
          </h2>
        </div>

        <div className="space-y-8">
          {guidesData.map((section) => (
            <div key={section.id} className="space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-sans text-[var(--text-primary)]">
                  {section.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] leading-relaxed mt-1">
                  {section.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.title}
                    href="/portfolio/blog"
                    className="p-3.5 sm:p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--accent-color)] transition-all group flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                        {link.tag}
                      </span>
                      <h4 className="text-sm sm:text-[15px] font-medium font-sans text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors leading-snug">
                        {link.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-color)] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Technical Knowledge Shelves */}
      <section id="shelves" className="space-y-6 pt-6 border-t border-[var(--border-subtle)] scroll-mt-20">
        <div className="flex items-center gap-2.5 border-b border-[var(--border-subtle)] pb-3">
          <Cpu className="w-5 h-5 text-[var(--accent-color)]" />
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[var(--text-primary)]">
            Technical Shelves
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {shelvesData.map((shelf) => (
            <div
              key={shelf.slug}
              className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold font-sans text-[var(--accent-color)]">
                  {shelf.title}
                </h3>
                <p className="text-xs sm:text-[13px] font-sans text-[var(--text-secondary)] leading-relaxed">
                  {shelf.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2">
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                  Curated Topics
                </span>
                <ul className="space-y-1.5 text-xs font-mono text-[var(--text-secondary)]">
                  {shelf.topics.map((t) => (
                    <li key={t.name} className="flex items-center justify-between">
                      <Link
                        href={`/portfolio/blog`}
                        className="hover:text-[var(--accent-color)] hover:underline truncate"
                      >
                        {t.name}
                      </Link>
                      <span className="text-[10px] text-[var(--text-muted)] shrink-0 pl-2">
                        {t.count} notes
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bookshelf / Reading List */}
      <section id="books" className="space-y-6 pt-6 border-t border-[var(--border-subtle)] scroll-mt-20">
        <div className="flex items-center gap-2.5 border-b border-[var(--border-subtle)] pb-3">
          <BookOpen className="w-5 h-5 text-[var(--accent-color)]" />
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[var(--text-primary)]">
            Bookshelf &amp; Reading List
          </h2>
        </div>

        <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
          Seminal works in computer architecture, systems resilience, and durable craftsmanship that have shaped how I write software and design interfaces.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {siteConfig.books.map((book) => (
            <div
              key={book.title}
              className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2">
                  <span className="uppercase tracking-wider">{book.category}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                      book.status === 'Currently Reading'
                        ? 'bg-[var(--accent-subtle)] text-[var(--accent-color)] border-[var(--accent-border)] font-semibold'
                        : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] border-[var(--border-subtle)]'
                    }`}
                  >
                    {book.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[var(--accent-color)] font-sans mb-1">
                  {book.title}
                </h3>
                <p className="text-xs font-sans text-[var(--text-muted)] mb-3">
                  by {book.author}
                </p>

                <p className="text-xs sm:text-[13px] font-sans text-[var(--text-secondary)] leading-relaxed">
                  {book.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Analog Rituals & Everyday Tools */}
      <section id="gear" className="space-y-6 pt-6 border-t border-[var(--border-subtle)] scroll-mt-20">
        <div className="flex items-center gap-2.5 border-b border-[var(--border-subtle)] pb-3">
          <Coffee className="w-5 h-5 text-[var(--accent-color)]" />
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[var(--text-primary)]">
            Analog Rituals &amp; Everyday Gear
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {siteConfig.hobbies.map((hobby) => (
            <div
              key={hobby.title}
              className="p-5 sm:p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] transition-all space-y-3.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[var(--accent-color)] uppercase tracking-wider">
                  {hobby.category}
                </span>
                {hobby.category.includes('Coffee') ? (
                  <Coffee className="w-4 h-4 text-[var(--text-muted)]" />
                ) : hobby.category.includes('Guitar') ? (
                  <Music className="w-4 h-4 text-[var(--text-muted)]" />
                ) : (
                  <Sparkles className="w-4 h-4 text-[var(--text-muted)]" />
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold font-sans text-[var(--text-primary)]">
                {hobby.title}
              </h3>

              <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                {hobby.description}
              </p>

              <div className="pt-3 border-t border-[var(--border-subtle)] space-y-1.5">
                <p className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  Everyday Kit:
                </p>
                <ul className="text-xs font-mono text-[var(--text-secondary)] list-disc pl-4 space-y-1">
                  {hobby.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Shelf Philosophy & Colophon */}
      <section className="pt-6 border-t border-[var(--border-subtle)]">
        <div className="p-6 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-card)] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent-color)] font-semibold">
            <Compass className="w-4 h-4" />
            <span>Shelf Philosophy</span>
          </div>
          <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
            &ldquo;Buy less, choose well, make it last.&rdquo; I prioritize tools and instruments crafted from durable mechanical materials that age gracefully over time—whether precision hand grinders with steel burrs, well-regulated solid-wood guitars, or hardbound books with sewn bindings.
          </p>
        </div>
      </section>
    </div>
  );
}
