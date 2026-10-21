import React from 'react';
import { siteConfig } from '@/data/content';
import { BookOpen, Coffee, Music, Compass, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Shelves — Dilshan',
  description: 'Curated books, specialty coffee equipment, analog instruments, and everyday tools.',
};

export default function ShelvesPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* 🔍 Shelves Header (Tania Rascia Style) */}
      <div className="space-y-3 border-b border-[var(--border-subtle)] pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold font-sans text-[var(--text-primary)] flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="Magnifying glass">🔍</span>
          <span>Shelves</span>
        </h1>
        <p className="text-sm sm:text-base font-sans text-[var(--text-secondary)] max-w-3xl leading-relaxed">
          A curated record of things I read, brew, play, and use outside of code editors. Good books, analog instruments, specialty coffee, and dependable everyday gear.
        </p>
      </div>

      {/* 1. Bookshelf */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[var(--accent-color)]" />
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-[var(--text-primary)]">
            Books &amp; Essays
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {siteConfig.books.map((book) => (
            <div
              key={book.title}
              className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between card-shadow"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2">
                  <span>{book.category}</span>
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

      {/* 2. Analog Pursuits & Daily Rituals */}
      <section className="pt-8 border-t border-[var(--border-subtle)] space-y-5">
        <div className="flex items-center gap-2">
          <Coffee className="w-5 h-5 text-[var(--accent-color)]" />
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-[var(--text-primary)]">
            Analog Rituals &amp; Gear
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {siteConfig.hobbies.map((hobby) => (
            <div
              key={hobby.title}
              className="p-5 sm:p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] transition-all space-y-3 card-shadow"
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

              <div className="pt-2 border-t border-[var(--border-subtle)] space-y-1">
                <p className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  Favorite Kit:
                </p>
                <ul className="text-xs font-mono text-[var(--text-secondary)] list-disc pl-4 space-y-0.5">
                  {hobby.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Colophon / Workspace Philosophy */}
      <section className="pt-8 border-t border-[var(--border-subtle)] p-6 rounded-xl border bg-[var(--bg-secondary)] space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent-color)] font-semibold">
          <Compass className="w-4 h-4" />
          <span>Shelf Philosophy</span>
        </div>
        <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
          &ldquo;Buy less, choose well, make it last.&rdquo; I prioritize tools and instruments crafted from durable mechanical materials that age gracefully over time—whether hand grinders with steel burrs, well-regulated solid-wood guitars, or hardbound books with sewn bindings.
        </p>
      </section>
    </div>
  );
}
