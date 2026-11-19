"use client";

import React from "react";
import { AlertCircle, CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { EnrichedProject } from "@/lib/projectEnricher";
import styles from "./ProjectProblemSolution.module.css";

interface ProjectProblemSolutionProps {
  project: EnrichedProject;
}

export function ProjectProblemSolution({ project }: ProjectProblemSolutionProps) {
  return (
    <div className={styles.sectionRoot}>
      {/* 1. Overview & Narrative */}
      <section id="overview" className={styles.storySection}>
        <div className={styles.headingCol}>
          <span className={styles.sectionIndex}>01 / OVERVIEW</span>
          <h2 className={styles.sectionTitle}>Project Overview & Intent</h2>
        </div>
        <div className={styles.bodyCol}>
          <p className={styles.leadParagraph}>{project.description}</p>
          {project.longDescription && project.longDescription !== project.description && (
            <p className={styles.bodyParagraph}>{project.longDescription}</p>
          )}
        </div>
      </section>

      {/* 2. Real-World Problem & Significance (Directly inspired by User Image 2) */}
      <section id="problem-solution" className={styles.storySection}>
        <div className={styles.headingCol}>
          <span className={styles.sectionIndex}>02 / THE CHALLENGE</span>
          <h2 className={styles.sectionTitle}>Real-World Problem & Significance</h2>
        </div>
        <div className={styles.bodyCol}>
          {/* Statement Banner (Inspired by User Reference 2) */}
          <div className={styles.statementBanner}>
            <div className={styles.pillBadgeWrapper}>
              <span className={styles.pillBadge}>THE PROBLEM</span>
            </div>
            <p className={styles.statementText}>
              &ldquo;{project.problemStatement}&rdquo;
            </p>
          </div>

          <div className={styles.contextCard}>
            <div className={styles.contextHeader}>
              <AlertCircle size={18} className={styles.contextIcon} />
              <h3 className={styles.contextTitle}>Industrial Context & Stakes</h3>
            </div>
            <p className={styles.contextBody}>
              {project.realWorldSignificance}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Proposed Solution & Implementation Approach */}
      <section className={styles.storySection}>
        <div className={styles.headingCol}>
          <span className={styles.sectionIndex}>03 / THE SOLUTION</span>
          <h2 className={styles.sectionTitle}>Proposed Solution & Approach</h2>
        </div>
        <div className={styles.bodyCol}>
          {/* Solution Banner */}
          <div className={`${styles.statementBanner} ${styles.solutionBanner}`}>
            <div className={styles.pillBadgeWrapper}>
              <span className={`${styles.pillBadge} ${styles.solutionBadge}`}>THE SOLUTION</span>
            </div>
            <p className={styles.statementText}>
              &ldquo;{project.proposedSolution}&rdquo;
            </p>
          </div>

          <div className={styles.approachCard}>
            <div className={styles.contextHeader}>
              <CheckCircle2 size={18} className={styles.solutionIcon} />
              <h3 className={styles.contextTitle}>Implementation Strategy</h3>
            </div>
            <p className={styles.contextBody}>
              {project.implementationApproach}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
