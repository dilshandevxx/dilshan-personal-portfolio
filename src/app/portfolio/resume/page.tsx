'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/content';
import { ArrowLeft, Printer } from 'lucide-react';

export default function ResumeRoutePage() {
  return (
    <div className="space-y-10">
      {/* Breadcrumb & Print Controls (Hidden when printing) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-[var(--text-muted)]">
          <Link href="/portfolio" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portfolio Index</span>
          </Link>
          <span>/</span>
          <span className="text-[var(--accent-color)]">Curriculum Vitae</span>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          aria-label="Print or save Curriculum Vitae as PDF"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shadow-xs"
        >
          <Printer className="w-3.5 h-3.5 text-[var(--accent-color)]" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Printable Resume Container */}
      <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-card)] p-6 sm:p-10 space-y-10 card-shadow">
        {/* Header Block */}
        <header className="border-b border-[var(--border-subtle)] pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {siteConfig.name}
            </h1>
            <p className="text-sm font-mono text-[var(--accent-color)] font-medium">
              {siteConfig.title}
            </p>
            <p className="text-xs font-sans text-[var(--text-muted)] max-w-xl">
              {siteConfig.location} • Available for roles &amp; technical advisory
            </p>
          </div>

          <div className="text-xs font-mono text-[var(--text-muted)] space-y-1 sm:text-right">
            <p>
              <a href="mailto:hello@dilshan.dev" className="text-[var(--accent-color)] hover:underline">
                hello@dilshan.dev
              </a>
            </p>
            <p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                github.com/dilshan
              </a>
            </p>
            <p>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                linkedin.com/in/dilshan
              </a>
            </p>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--accent-color)] font-semibold">
            Executive Summary
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
            {siteConfig.shortBio}
          </p>
        </section>

        {/* Professional Experience */}
        <section className="space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--accent-color)] font-semibold border-b border-[var(--border-subtle)] pb-2">
            Work Experience
          </h2>

          <div className="space-y-6">
            {siteConfig.experience.map((exp, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                  <span className="font-semibold text-sm font-serif text-[var(--text-primary)]">
                    {exp.role} — <span className="text-[var(--text-secondary)] font-normal">{exp.company}</span>
                  </span>
                  <span className="text-[var(--text-muted)]">{exp.period}</span>
                </div>
                <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                  {exp.description}
                </p>
                {exp.technologies && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Key Projects */}
        <section className="space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--accent-color)] font-semibold border-b border-[var(--border-subtle)] pb-2">
            Architectural Projects
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {siteConfig.projects.map((proj) => (
              <div key={proj.id} className="p-4 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                  <span className="font-semibold text-sm font-serif text-[var(--text-primary)]">
                    {proj.title}
                  </span>
                  <span className="text-[var(--text-muted)]">{proj.category} • {proj.year}</span>
                </div>
                <p className="text-xs font-sans text-[var(--text-secondary)]">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.stack.map((s) => (
                    <span
                      key={s}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--badge-bg)] text-[var(--text-muted)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--accent-color)] font-semibold border-b border-[var(--border-subtle)] pb-2">
            Education
          </h2>

          {siteConfig.education.map((edu, idx) => (
            <div key={idx} className="space-y-1 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono">
                <span className="font-serif font-semibold text-sm text-[var(--text-primary)]">
                  {edu.degree}
                </span>
                <span className="text-[var(--text-muted)]">{edu.period}</span>
              </div>
              <p className="text-xs font-sans text-[var(--text-secondary)]">
                {edu.institution} — <span className="font-mono text-[var(--accent-color)]">{edu.honors}</span>
              </p>
            </div>
          ))}
        </section>

        {/* Skills Summary */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--accent-color)] font-semibold border-b border-[var(--border-subtle)] pb-2">
            Technical Stack
          </h2>
          <div className="space-y-2 text-xs font-mono">
            {siteConfig.skills.map((cat) => (
              <div key={cat.title} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                <span className="text-[var(--text-primary)] font-semibold sm:w-48 shrink-0">
                  {cat.title}:
                </span>
                <span className="text-[var(--text-muted)]">
                  {cat.items.join(' • ')}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
