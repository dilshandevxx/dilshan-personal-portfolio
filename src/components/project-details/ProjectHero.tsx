"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Play, Terminal, ShieldCheck, Star } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { EnrichedProject } from "@/lib/projectEnricher";
import styles from "./ProjectHero.module.css";

interface ProjectHeroProps {
  project: EnrichedProject;
  onWatchDemoClick?: () => void;
  onArchitectureClick?: () => void;
}

export function ProjectHero({
  project,
  onWatchDemoClick,
  onArchitectureClick,
}: ProjectHeroProps) {
  const isNumericYear = project.date && /^\d{4}/.test(project.date);
  const displayYear = isNumericYear ? project.date : "2026";
  const isExisting = project.status === "Existing";

  return (
    <header className={styles.heroSection}>
      {/* Top Breadcrumb & Status Bar */}
      <div className={styles.topRow}>
        <Link href="/projects" className={styles.backButton}>
          <ArrowLeft size={16} />
          <span>All Projects</span>
        </Link>

        <div className={styles.statusPills}>
          <span className={styles.categoryPill}>{project.category}</span>
          <span className={styles.dotDivider}>•</span>
          <span className={styles.yearPill}>{displayYear}</span>
          <span className={styles.dotDivider}>•</span>
          <span className={`${styles.statusPill} ${isExisting ? styles.statusActive : ""}`}>
            <span className={styles.pulseDot} />
            {isExisting ? "Production Ready" : "Architecture Blueprint"}
          </span>
          {project.stars > 0 && (
            <span className={styles.starsPill}>
              <Star size={12} fill="#FACC15" color="#FACC15" />
              <span>{project.stars}</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Title & Tagline */}
      <div className={styles.titleArea}>
        <h1 className={styles.title}>{project.title}</h1>
        {project.tagline && <p className={styles.tagline}>{project.tagline}</p>}
      </div>

      {/* Primary Action Buttons */}
      <div className={styles.actionRow}>
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryButton}
          >
            <span>Live Deployment</span>
            <ArrowUpRight size={15} />
          </a>
        ) : (
          <button
            type="button"
            onClick={onWatchDemoClick}
            className={styles.primaryButton}
          >
            <Play size={14} fill="currentColor" />
            <span>Interactive Demo</span>
          </button>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryButton}
          >
            <GithubIcon size={15} />
            <span>Source Code</span>
          </a>
        )}

        {onArchitectureClick && (
          <button
            type="button"
            onClick={onArchitectureClick}
            className={styles.secondaryButton}
          >
            <Terminal size={15} />
            <span>Architecture</span>
          </button>
        )}

        {project.writeupUrl && (
          <Link href={project.writeupUrl} className={styles.secondaryButton}>
            <span>Technical Paper</span>
            <ArrowUpRight size={15} />
          </Link>
        )}
      </div>

      {/* Key Metrics Strip */}
      {project.benchmarks && project.benchmarks.length > 0 && (
        <div className={styles.metricsStrip}>
          {project.benchmarks.slice(0, 4).map((b, i) => (
            <div key={i} className={styles.metricCard}>
              <span className={styles.metricValue}>{b.value}</span>
              <span className={styles.metricLabel}>{b.metric}</span>
              {b.comparison && (
                <span className={styles.metricSub}>{b.comparison}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
