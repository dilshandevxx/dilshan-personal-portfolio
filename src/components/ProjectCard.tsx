"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Project, getProjectThumbnail, FALLBACK_THUMBNAILS } from "@/data/projects";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  index?: number;
  showTags?: boolean;
  showLinks?: boolean;
  className?: string;
  isHighlighted?: boolean;
}

export function ProjectCard({
  project,
  index = 0,
  showTags = true,
  className,
}: ProjectCardProps) {
  const router = useRouter();
  const initialThumb = getProjectThumbnail(project.slug, project.image, index);
  const [imgSrc, setImgSrc] = useState<string>(initialThumb);

  // Sync thumbnail if project or index changes
  useEffect(() => {
    setImgSrc(getProjectThumbnail(project.slug, project.image, index));
  }, [project.slug, project.image, index]);

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) return;
    router.push(`/projects/${project.slug}`);
  };

  const isExternalUrl =
    imgSrc.startsWith("http://") ||
    imgSrc.startsWith("https://") ||
    imgSrc.startsWith("data:");

  // Subtitle matching reference card: "Greenland, Ilulissat" aesthetic
  const subtitle = project.category && project.tagline
    ? `${project.category} • ${project.tagline}`
    : project.tagline?.trim() || `${project.category || "System"} • ${project.date || "2026"}`;

  // Top technologies cleanly capped so the stack stays compact & beautiful
  const rawTags = project.tags || [];
  const displayTags = rawTags.slice(0, 4);
  const remainingCount = Math.max(0, rawTags.length - 4);

  return (
    <article
      className={`${styles.projectCard} ${className || ""}`}
      onClick={handleCardClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/projects/${project.slug}`);
        }
      }}
      aria-label={`View details for ${project.title}`}
    >
      {/* 1. Square-Corner Visual Canvas (Strictly Square, Matching Reference) */}
      <div className={styles.imageFrame}>
        <Image
          src={imgSrc}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 3}
          unoptimized={isExternalUrl}
          onError={() => {
            const fallback =
              FALLBACK_THUMBNAILS[index % FALLBACK_THUMBNAILS.length] ||
              "/images/project_collective.jpg";
            setImgSrc(fallback);
          }}
          className={styles.cardImage}
        />
      </div>

      {/* 2. Enclosed Card Body: Clean Title, Subtitle, & Tech Stack Wrapped on White Line */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>
          <Link href={`/projects/${project.slug}`} className={styles.titleLink}>
            {project.title}
          </Link>
        </h3>

        <p className={styles.cardSubtitle}>{subtitle}</p>

        {/* 3. Technologies Wrapped Along a Crisp White Line */}
        {showTags && displayTags.length > 0 && (
          <div className={styles.techLineWrapper} aria-label="Technologies used">
            <div className={styles.techStack}>
              {displayTags.map((tech) => (
                <span key={tech} className={styles.techBadge}>
                  {tech}
                </span>
              ))}
              {remainingCount > 0 && (
                <span className={styles.techMore}>+{remainingCount}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
