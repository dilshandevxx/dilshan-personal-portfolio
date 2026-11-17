"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Project, getProjectThumbnail } from "@/data/projects";
import { GithubIcon } from "@/components/SocialIcons";
import { ExternalLink } from "lucide-react";
import styles from "./ProjectCard.module.css";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const router = useRouter();
  const thumbnailSrc = getProjectThumbnail(project.slug, project.image, index);

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) return;
    router.push(`/projects/${project.slug}`);
  };

  return (
    <article
      className={styles.projectCard}
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
      <Link href={`/projects/${project.slug}`} className={styles.cardLink}>
        {/* 16:10 Rounded Image Thumbnail with Bottom-Left Category Pill (matching screenshot) */}
        <div className={styles.imageFrame}>
          <Image
            src={thumbnailSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 6}
            className={styles.cardImage}
          />
          <div className={styles.imageVignette} />

          {/* Bottom-Left Translucent Pill Badge (e.g. AI/ML, Systems, Web App) */}
          <span className={styles.categoryBadge}>{project.category}</span>
        </div>

        {/* Card Body Below Image */}
        <div className={styles.cardBody}>
          <h2 className={styles.cardTitle}>{project.title}</h2>
          <p className={styles.cardDescription}>{project.tagline}</p>
        </div>
      </Link>

      {/* Card Action Icons (Clean GitHub Icon + Live Icon only if live demo exists) */}
      <div className={styles.cardFooter}>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Live Application"
            aria-label="Live Application"
            className={styles.liveLink}
          >
            <ExternalLink size={13} />
            <span>Live</span>
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="GitHub Repository"
            aria-label="GitHub Repository"
            className={styles.githubLink}
          >
            <GithubIcon size={16} />
          </a>
        )}
      </div>
    </article>
  );
}
