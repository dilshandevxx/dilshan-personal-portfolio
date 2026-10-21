'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/content';
import { ProjectCard } from '@/components/ProjectCard';

export default function ProjectsRoutePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Distributed Systems',
    'UI & Architecture',
    'Developer Tooling',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? siteConfig.projects
      : siteConfig.projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header (Tania Rascia Style: 🗂️ Projects) */}
      <div className="space-y-3 border-b border-[var(--border-subtle)] pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold font-sans text-[var(--text-primary)] flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="Projects folder">🗂️</span>
          <span>Projects</span>
        </h1>
        <p className="text-sm sm:text-base font-sans text-[var(--text-secondary)] max-w-3xl leading-relaxed">
          Open-source projects I&apos;ve made over the years, including distributed databases, an emulator, local-first architectures, and developer tooling.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2" role="tablist" aria-label="Filter projects by category">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-sans transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--accent-color)] text-[var(--accent-contrast)] font-semibold shadow-xs'
                    : 'border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column Grid Matching Screenshot 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-8 text-center rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-secondary)] text-sm font-sans text-[var(--text-muted)]">
          No projects match the selected category.
        </div>
      )}
    </div>
  );
}
