'use client';

import React, { useState } from 'react';
import { Project } from '@/types/content';
import { ChevronDown, ChevronUp, Cpu, CheckCircle2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Short display title (strips long colon subtitle if present)
  const displayTitle = project.title.includes(':')
    ? project.title.split(':')[0]
    : project.title;

  return (
    <article
      className="group relative rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] transition-all p-5 sm:p-6 flex flex-col justify-between card-shadow"
      aria-labelledby={`proj-title-${project.id}`}
    >
      <div>
        {/* Top Header: Year on Left, Stars on Right */}
        <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-3">
          <span>{project.year}</span>
          {project.stars && (
            <span className="flex items-center gap-1 font-mono text-[var(--text-secondary)]">
              <span>{project.stars}</span>
              <span className="text-sm leading-none opacity-80" aria-hidden="true">☆</span>
            </span>
          )}
        </div>

        {/* Project Title (Tania Rascia Style: Bold Accent Color) */}
        <h3
          id={`proj-title-${project.id}`}
          className="text-base sm:text-lg font-bold text-[var(--accent-color)] hover:underline decoration-[var(--accent-color)] underline-offset-4 mb-2 tracking-tight font-sans"
        >
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              {displayTitle}
            </a>
          ) : project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              {displayTitle}
            </a>
          ) : (
            <span>{displayTitle}</span>
          )}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] leading-relaxed mb-4">
          {project.subtitle || project.description}
        </p>
      </div>

      {/* Expanded Architecture Details (Collapsible for deep technical proof) */}
      {isExpanded && (
        <div className="my-3 pt-3 border-t border-[var(--border-subtle)] space-y-3 animate-in fade-in duration-150 text-xs">
          <p className="text-xs text-[var(--text-secondary)] bg-[var(--bg-subtle)] p-2.5 rounded border border-[var(--border-subtle)] leading-relaxed">
            {project.longDescription}
          </p>

          {project.stack && project.stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {project.architectureHighlights && project.architectureHighlights.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center gap-1 font-mono font-semibold text-[var(--accent-color)]">
                <Cpu className="w-3 h-3" />
                <span>Highlights</span>
              </div>
              <ul className="text-[11px] text-[var(--text-muted)] list-disc pl-4 space-y-0.5">
                {project.architectureHighlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {project.outcomes && project.outcomes.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center gap-1 font-mono font-semibold text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Results</span>
              </div>
              <ul className="text-[11px] text-[var(--text-muted)] list-disc pl-4 space-y-0.5">
                {project.outcomes.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Bottom Row: Article | Demo | Source + Subtle Specs Toggle */}
      <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          {project.articleUrl && (
            <a
              href={project.articleUrl}
              className="text-[var(--accent-color)] hover:underline"
            >
              Article
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-color)] hover:underline"
            >
              Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-color)] hover:underline"
            >
              Source
            </a>
          )}
        </div>

        {/* Toggle technical architecture breakdown */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 rounded"
          title={isExpanded ? 'Collapse specs' : 'Expand technical specs'}
          aria-label={isExpanded ? 'Collapse specs' : 'Expand technical specs'}
        >
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
    </article>
  );
}
