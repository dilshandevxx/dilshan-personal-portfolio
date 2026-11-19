"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project, getProjectThumbnail, FALLBACK_THUMBNAILS } from "@/data/projects";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";
import styles from "./ProjectRelated.module.css";

interface ProjectRelatedProps {
  currentSlug: string;
  category: string;
  tags: string[];
  allProjects: Project[];
}

export function ProjectRelated({
  currentSlug,
  category,
  tags,
  allProjects,
}: ProjectRelatedProps) {
  const relatedProjects = useMemo(() => {
    // Exclude current project
    const candidates = allProjects.filter((p) => p.slug !== currentSlug);

    // Score based on same category (+3) and tag overlap (+1 per match)
    const currentTagsSet = new Set((tags || []).map((t) => t.toLowerCase()));

    const scored = candidates.map((p, idx) => {
      let score = 0;
      if (p.category === category) score += 3;
      if (p.tags) {
        for (const t of p.tags) {
          if (currentTagsSet.has(t.toLowerCase())) score += 1;
        }
      }
      if (p.featured) score += 1;
      return { project: p, score, originalIdx: idx };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map((item) => item.project);
  }, [currentSlug, category, tags, allProjects]);

  if (relatedProjects.length === 0) return null;

  return (
    <section id="explore-more" className={styles.sectionRoot}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.metaRow}>
            <span className={styles.sectionIndex}>09 / EXPLORE MORE</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.metaSub}>RELATED ARCHITECTURES</span>
          </div>
          <h2 className={styles.sectionTitle}>Explore Related Engineering Projects</h2>
          <p className={styles.sectionSubtitle}>
            Discover adjacent systems spanning {category}, distributed infrastructure, and production AI.
          </p>
        </div>

        <Link href="/projects" className={styles.viewAllButton}>
          <span>All 50+ Projects</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* 3 Related Project Cards */}
      <div className={styles.cardsGrid}>
        {relatedProjects.map((p, idx) => {
          const thumb = getProjectThumbnail(p.slug, p.image, idx);
          const isExternal =
            thumb.startsWith("http://") ||
            thumb.startsWith("https://") ||
            thumb.startsWith("data:");
          const excerpt = p.description || p.tagline || "";
          const displayTags = (p.tags || []).slice(0, 3);

          return (
            <article key={p.slug} className={styles.card}>
              <Link href={`/projects/${p.slug}`} className={styles.cardImageLink}>
                <div className={styles.imageFrame}>
                  <Image
                    src={thumb}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    unoptimized={isExternal}
                    className={styles.cardImage}
                  />
                  <div className={styles.imageOverlay} />
                  <span className={styles.categoryBadge}>{p.category}</span>
                </div>
              </Link>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                  <Link href={`/projects/${p.slug}`} className={styles.titleLink}>
                    <span>{p.title}</span>
                    <ArrowUpRight size={15} className={styles.arrowIcon} />
                  </Link>
                </h3>

                <p className={styles.cardExcerpt}>{excerpt}</p>

                <div className={styles.tagsRow}>
                  {displayTags.map((tag) => (
                    <span key={tag} className={styles.tagPill}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
