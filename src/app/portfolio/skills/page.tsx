import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/content';
import { Cpu, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Skills & Architecture — Dilshan K.',
  description: 'Technical proficiencies, programming languages, and system architecture stacks.',
};

export default function SkillsRoutePage() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
        <Link href="/portfolio" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Portfolio Index</span>
        </Link>
        <span>/</span>
        <span className="text-[var(--accent-color)]">Skills</span>
      </div>

      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent-color)] font-medium">
          <Cpu className="w-4 h-4" />
          <span>Engineering Capabilities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
          Skills &amp; Architectural Stack
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] max-w-2xl">
          Clean categorization of technologies and disciplines practiced in production environments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {siteConfig.skills.map((category) => (
          <div
            key={category.title}
            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 space-y-3 card-shadow"
          >
            <div className="space-y-1 border-b border-[var(--border-subtle)] pb-3">
              <h2 className="text-sm font-mono font-semibold text-[var(--text-primary)]">
                {category.title}
              </h2>
              <p className="text-xs font-sans text-[var(--text-muted)]">
                {category.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {category.items.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded text-xs font-mono bg-[var(--badge-bg)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-color)] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
