"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Project, projectsList } from "@/data/projects";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import { enrichProject, EnrichedProject } from "@/lib/projectEnricher";

// Modular Project Details Components
import { ProjectHero } from "@/components/project-details/ProjectHero";
import { ProjectNavRibbon } from "@/components/project-details/ProjectNavRibbon";
import { ProjectProblemSolution } from "@/components/project-details/ProjectProblemSolution";
import { ProjectPillars } from "@/components/project-details/ProjectPillars";
import { ProjectArchitecture } from "@/components/project-details/ProjectArchitecture";
import { ProjectMediaShowcase } from "@/components/project-details/ProjectMediaShowcase";
import { ProjectTechDeepDive } from "@/components/project-details/ProjectTechDeepDive";
import { ProjectRelated } from "@/components/project-details/ProjectRelated";

import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./projectDetail.module.css";

interface ProjectDetailViewProps {
  initialProject: Project;
  previous: Project | null;
  next: Project | null;
  index: number;
}

export function ProjectDetailView({
  initialProject,
  previous,
  next,
  index,
}: ProjectDetailViewProps) {
  const [project, setProject] = useState<Project>(initialProject);
  const [allProjects, setAllProjects] = useState<Project[]>(projectsList);

  // Sync any custom additions/edits saved via Admin in production
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dilshan_custom_projects");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllProjects(parsed);
          const match = parsed.find((p: Project) => p.slug === initialProject.slug);
          if (match) setProject(match);
        }
      }
    } catch {}
  }, [initialProject.slug]);

  const enriched: EnrichedProject = enrichProject(project, index);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.pageRoot}>
      {/* 1. Global Navigation Bar */}
      <SkyLabsNavbar activeTab="projects" />

      {/* 2. Sticky Quick Navigation Ribbon */}
      <ProjectNavRibbon />

      <main className={styles.mainContainer}>
        {/* 3. Hero Section (Breadcrumbs, Title, Tagline, CTAs, Metrics Strip) */}
        <ProjectHero
          project={enriched}
          onWatchDemoClick={() => handleScrollTo("video-demo")}
          onArchitectureClick={() => handleScrollTo("architecture")}
        />

        {/* 4. Problem & Solution Narrative (Real-world stakes & approach) */}
        <ProjectProblemSolution project={enriched} />

        {/* 5. Core Disciplines / Delivery Pillars (Faithfully Matching the User Reference Image) */}
        <ProjectPillars pillars={enriched.projectPillars} />

        {/* 6. System Architecture & Flowchart */}
        <ProjectArchitecture
          architectureSummary={enriched.architecture || enriched.description}
          steps={enriched.architectureSteps}
        />

        {/* 7. Visual Showcase Gallery & Interactive Video Demonstration */}
        <ProjectMediaShowcase
          gallery={enriched.gallery}
          videoDemo={enriched.videoDemo}
          projectTitle={enriched.title}
          index={index}
        />

        {/* 8. Technical Documentation, Schemas & Performance Benchmarks */}
        <ProjectTechDeepDive
          technicalDocs={enriched.technicalDocs}
          stackLayers={enriched.stackLayers}
          benchmarks={enriched.benchmarks}
          fallbackTags={enriched.tags}
        />

        {/* 9. Previous & Next Project Navigation */}
        <nav className={styles.paginationNav} aria-label="Adjacent Projects">
          {previous ? (
            <Link href={`/projects/${previous.slug}`} className={styles.paginationLink}>
              <span className={styles.paginationLabel}>
                <ArrowLeft size={12} />
                <span>Previous Project</span>
              </span>
              <span className={styles.paginationTitle}>{previous.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className={`${styles.paginationLink} ${styles.paginationLinkNext}`}
            >
              <span className={styles.paginationLabel}>
                <span>Next Project</span>
                <ArrowRight size={12} />
              </span>
              <span className={styles.paginationTitle}>{next.title}</span>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* 10. Explore More Related Projects Section */}
        <ProjectRelated
          currentSlug={enriched.slug}
          category={enriched.category}
          tags={enriched.tags || []}
          allProjects={allProjects}
        />
      </main>

      {/* 11. Global Footer */}
      <MainFooter />
    </div>
  );
}
