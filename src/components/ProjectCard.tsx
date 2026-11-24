"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, getProjectThumbnail } from "@/data/projects";
import { ProjectCardLayoutConfig } from "@/services/cmsDataStore";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  index?: number;
  className?: string;
  config?: Partial<ProjectCardLayoutConfig>;
}

export function ProjectCard({
  project,
  index = 0,
  className,
  config,
}: ProjectCardProps) {
  // STRICT RULE: No default open accordions - start collapsed
  const [isStackExpanded, setIsStackExpanded] = useState(false);

  // Sync layout configuration (from props or live localStorage / CMS events)
  const [activeConfig, setActiveConfig] = useState<Partial<ProjectCardLayoutConfig>>(() => {
    if (config) return config;
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("dilshan_cms_settings_v2");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.projectCardConfig) return parsed.projectCardConfig;
        }
      } catch {}
    }
    return {
      showCategory: true,
      showDate: true,
      showArticleLink: true,
      showDemoLink: true,
      showSourceLink: true,
      showStackButton: true,
      actionLinksColor: "#38bdf8",
    };
  });

  useEffect(() => {
    if (config) {
      setActiveConfig(config);
      return;
    }
    const update = () => {
      try {
        const stored = localStorage.getItem("dilshan_cms_settings_v2");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.projectCardConfig) {
            setActiveConfig(parsed.projectCardConfig);
          }
        }
      } catch {}
    };

    window.addEventListener("cms_card_config_updated", update);
    window.addEventListener("cms_settings_updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("cms_card_config_updated", update);
      window.removeEventListener("cms_settings_updated", update);
      window.removeEventListener("storage", update);
    };
  }, [config]);

  const excerpt = project.description || project.tagline || "";
  const stack = project.tags || [];
  const articleUrl = project.writeupUrl || `/projects/${project.slug}`;
  const githubUrl = project.githubUrl || `https://github.com/dilshandevxx/${project.slug}`;
  const demoUrl = project.demoUrl;

  const thumbnail = getProjectThumbnail(
    project.slug,
    project.image,
    index,
    project.coverImage
  );

  // Visibility flags based on Admin Panel configurations
  const showCategory = activeConfig.showCategory !== false && Boolean(project.category);
  const showDate = activeConfig.showDate !== false && Boolean(project.date);
  const showArticle = activeConfig.showArticleLink !== false;
  const showDemo = activeConfig.showDemoLink !== false && Boolean(demoUrl);
  const showSource = activeConfig.showSourceLink !== false && Boolean(githubUrl);
  const showStack = activeConfig.showStackButton !== false && stack.length > 0;
  const actionColor = activeConfig.actionLinksColor || "#38bdf8";

  const hasAnyAction = showArticle || showDemo || showSource || showStack;

  return (
    <motion.article
      className={`${styles.card} ${className || ""}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className={styles.cardInner}>
        {/* 1. Rounded Top Image Canvas (Exact match to Main Page Article Section) */}
        <Link
          href={articleUrl}
          className={styles.imageFrame}
          aria-label={`Read article for ${project.title}`}
        >
          <Image
            src={thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            priority={index < 3}
            className={styles.cardImage}
          />
        </Link>

        {/* 2. Content Block beneath image */}
        <div className={styles.cardBody}>
          {/* Main Title */}
          <h3
            className={styles.cardTitle}
            style={
              activeConfig.titleLines
                ? ({
                    WebkitLineClamp: activeConfig.titleLines,
                    WebkitBoxOrient: "vertical",
                    display: "-webkit-box",
                    overflow: "hidden",
                  } as React.CSSProperties)
                : undefined
            }
          >
            <Link href={articleUrl} className={styles.titleLink}>
              {project.title}
            </Link>
          </h3>

          {/* Metadata: Category & Date */}
          {(showCategory || showDate) && (
            <div className={styles.cardMeta}>
              {showCategory && <span>{project.category}</span>}
              {showCategory && showDate && (
                <span className={styles.metaDivider} aria-hidden="true">
                  &bull;
                </span>
              )}
              {showDate && <time>{project.date}</time>}
            </div>
          )}

          {/* Excerpt / Clean Description */}
          {excerpt && (
            <p
              className={styles.cardDesc}
              style={
                activeConfig.descriptionLines
                  ? ({
                      WebkitLineClamp: activeConfig.descriptionLines,
                      WebkitBoxOrient: "vertical",
                      display: "-webkit-box",
                      overflow: "hidden",
                    } as React.CSSProperties)
                  : undefined
              }
            >
              {excerpt}
            </p>
          )}

          {/* 3. Action Links Bar: Article, Demo, Source, Stack (Configurable in Admin Panel) */}
          {hasAnyAction && (
            <div
              className={styles.actionsRow}
              style={{ "--action-color": actionColor } as React.CSSProperties}
            >
              {showArticle && (
                <Link href={articleUrl} className={styles.actionLink}>
                  Article
                </Link>
              )}

              {showDemo && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionLink}
                >
                  Demo
                </a>
              )}

              {showSource && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionLink}
                >
                  Source
                </a>
              )}

              {showStack && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsStackExpanded(!isStackExpanded);
                  }}
                  className={`${styles.stackToggleBtn} ${
                    isStackExpanded ? styles.stackToggleActive : ""
                  }`}
                  aria-expanded={isStackExpanded}
                  aria-label={`Toggle tech stack for ${project.title}`}
                >
                  <span>Stack</span>
                  <span className={styles.toggleArrow} aria-hidden="true">
                    {isStackExpanded ? "▴" : "▾"}
                  </span>
                </button>
              )}
            </div>
          )}

          {/* 4. Expandable Tech Stack Details */}
          <AnimatePresence>
            {isStackExpanded && (
              <motion.div
                className={styles.stackContainer}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.stackBadgeList}>
                  {stack.map((tech) => (
                    <span key={tech} className={styles.techPill}>
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}
