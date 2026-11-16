import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsList } from "@/data/projects";
import { siteConfig } from "@/data/siteConfig";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import styles from "./projectDetail.module.css";

export async function generateStaticParams() {
  return projectsList.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsList.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — ${siteConfig.siteName}`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projectsList.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projectsList[index];
  const previous = index > 0 ? projectsList[index - 1] : null;
  const next = index < projectsList.length - 1 ? projectsList[index + 1] : null;
  const isLive = project.status === "Existing";

  return (
    <div className={styles.pageRoot}>
      <SkyLabsNavbar activeTab="projects" />
      <article className={styles.container}>
        {/* Back Navigation */}
        <nav className={styles.backNav}>
          <Link href="/projects" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Back to All Projects</span>
          </Link>
        </nav>

      {/* Editorial Header */}
      <header className={styles.header}>
        <div className={styles.metaRow}>
          <span className={styles.categoryBadge}>{project.category}</span>

          {isLive ? (
            <span className={styles.statusPillLive} title="Live Built & Deployed Service">
              <span className={styles.liveDot} />
              <span>Live Production</span>
            </span>
          ) : (
            <span className={styles.statusPillRfc} title="Architecture Specification / RFC Proposal">
              <span className={styles.rfcDot} />
              <span>RFC Specification</span>
            </span>
          )}

          {project.featured && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.25rem 0.65rem",
                color: "var(--color-primary)",
                border: "1px solid var(--color-border)",
              }}
            >
              Featured
            </span>
          )}
        </div>

        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.tagline}>{project.tagline}</p>

        <div className={styles.actionRow}>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
            >
              <ExternalLink size={16} />
              <span>Live Deployment</span>
            </a>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
          >
            <GithubIcon size={17} />
            <span>{isLive ? "View on GitHub" : "Read GitHub Spec"}</span>
          </a>
        </div>
      </header>

      {/* 01 // Overview */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>01 //</span>
          <h2 className={styles.sectionTitle}>System Overview</h2>
        </div>
        <div className={styles.prose}>
          <p>{project.longDescription || project.description}</p>
        </div>
      </section>

      {/* 02 // Architecture */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>02 //</span>
          <h2 className={styles.sectionTitle}>Architecture & Data Flow</h2>
        </div>
        <div className={styles.prose}>
          <p>{project.architecture}</p>
        </div>
      </section>

      {/* 03 // Key Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIndex}>03 //</span>
            <h2 className={styles.sectionTitle}>
              {isLive ? "Key Capabilities" : "Technical Specification"}
            </h2>
          </div>
          <ul className={styles.highlightsList}>
            {project.highlights.map((item, i) => (
              <li key={i} className={styles.highlightItem}>
                <span className={styles.highlightBullet}>&rsaquo;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 04 // Engineering Considerations & Trade-offs */}
      {project.challenges && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIndex}>04 //</span>
            <h2 className={styles.sectionTitle}>Engineering Trade-offs & Analysis</h2>
          </div>
          <div className={styles.prose}>
            <p>{project.challenges}</p>
          </div>
        </section>
      )}

      {/* 05 // Tech Stack */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>05 //</span>
          <h2 className={styles.sectionTitle}>Technology Stack</h2>
        </div>

        {project.stackLayers && project.stackLayers.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
            {project.stackLayers.map((layer, i) => (
              <div
                key={i}
                style={{
                  padding: "1rem 1.25rem",
                  background: "var(--color-background-card, rgba(255, 255, 255, 0.02))",
                  border: "1px solid var(--color-border, rgba(255, 255, 255, 0.08))",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-primary)",
                    marginBottom: "0.5rem",
                    fontWeight: 600,
                  }}
                >
                  {layer.layer}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {layer.technologies.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem",
                        padding: "2px 8px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "var(--color-text)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.techGrid}>
            {project.tags.map((t) => (
              <span key={t} className={styles.techTag}>
                {t}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Pagination Footer */}
      <footer className={styles.paginationFooter}>
        {previous ? (
          <Link href={`/projects/${previous.slug}`} className={styles.paginationCard}>
            <span className={styles.paginationDirection}>&larr; Previous Project</span>
            <span className={styles.paginationTitle}>{previous.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className={styles.paginationCard}
            style={{ textAlign: "right", marginLeft: "auto", width: "100%" }}
          >
            <span className={styles.paginationDirection}>Next Project &rarr;</span>
            <span className={styles.paginationTitle}>{next.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </footer>
    </article>
  </div>
  );
}
