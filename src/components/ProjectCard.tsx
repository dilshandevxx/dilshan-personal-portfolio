"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Project, getProjectThumbnail, FALLBACK_THUMBNAILS } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
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

  const excerpt = project.description || project.tagline || "";
  const displayTags = (project.tags || []).slice(0, 3);
  const remainingCount = Math.max(0, (project.tags || []).length - 3);

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
      <Link
        href={`/projects/${project.slug}`}
        className={styles.imageLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className={styles.imageFrame}>
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
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
      </Link>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>
          <Link href={`/projects/${project.slug}`} className={styles.cardLink}>
            <span>{project.title}</span>
            <ArrowUpRight size={14} className={styles.cardArrow} />
          </Link>
        </h3>

        <p className={styles.cardDesc}>{excerpt}</p>

        {showTags && displayTags.length > 0 && (
          <div className={styles.tagsWrapper}>
            {displayTags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className={styles.tagMore}>+{remainingCount}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
