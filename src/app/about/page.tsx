import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { timelineEras } from "@/data/timeline";
import { GithubIcon, LinkedinIcon, XIcon, FacebookIcon } from "@/components/SocialIcons";
import { Mail, Cpu, Code2, Cloud } from "lucide-react";
import { TechMatrix } from "@/components/TechMatrix";

export const metadata = {
  title: `About — ${siteConfig.siteName}`,
  description: siteConfig.sidebarBio,
};

export default function AboutPage() {
  return (
    <div className="blog-container">
      {/* Editorial Header */}
      <header className="page-header-editorial">
        <div className="page-header-topline">
          <h1 className="page-title-editorial">About Me</h1>
          <div className="status-indicator-pill">
            <span className="status-pulse-dot" />
            <span>Available for Roles &amp; Consulting</span>
          </div>
        </div>
        <p className="page-subtitle-editorial">
          Software Engineer specializing in scalable full-stack web platforms, machine learning inference pipelines, and distributed cloud infrastructure.
        </p>
      </header>

      {/* Side-by-side Story & Photo */}
      <div className="about-intro-grid">
        <div className="about-prose-block">
          <p>
            Hey, I&apos;m <strong>Dilshan</strong>! Welcome to my spot on the web for{" "}
            <Link href="/blog" className="text-link">writing</Link>,{" "}
            <Link href="/projects" className="text-link">projects</Link>, and{" "}
            <Link href="/shelves" className="text-link">open knowledge</Link>. I&apos;m currently working as a full-stack and AI software engineer, focusing on high-throughput backend services, distributed systems, and real-time LLM inference pipelines.
          </p>
          <p>
            This site is a personal space for technical self-expression and sharing real-world software architecture lessons without advertisements, affiliate links, sponsored posts, or paywalls.
          </p>
          <p>
            If you want to keep up with my engineering logs and notes, explore the{" "}
            <Link href="/blog" className="text-link">blog stream</Link> or subscribe to the{" "}
            <Link href="/rss.xml" className="text-link">RSS feed</Link>. Feel free to reach out via{" "}
            <a href={`mailto:${siteConfig.social.email}`} className="text-link">email</a> or explore my code on{" "}
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-link">GitHub</a>.
          </p>
        </div>

        <div className="about-photo-wrapper">
          <img
            src="/dilshan_profile.jpg"
            alt="Dilshan at work"
            className="about-photo-img"
          />
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="about-stats-grid">
        <div className="about-stat-box">
          <div className="about-stat-label">Engineering Role</div>
          <div className="about-stat-value">Full-Stack &amp; AI Engineer</div>
        </div>
        <div className="about-stat-box">
          <div className="about-stat-label">Core Focus</div>
          <div className="about-stat-value">Distributed Systems &amp; LLMs</div>
        </div>
        <div className="about-stat-box">
          <div className="about-stat-label">Primary Languages</div>
          <div className="about-stat-value">TypeScript, Python, Go, SQL</div>
        </div>
        <div className="about-stat-box">
          <div className="about-stat-label">Availability</div>
          <div className="about-stat-value">Remote / Global Relocation</div>
        </div>
      </div>

      {/* Core Engineering Pillars */}
      <div className="about-pillars-grid">
        <div className="about-pillar-card">
          <div className="about-pillar-header">
            <Cpu size={16} className="about-pillar-icon" />
            <h3 className="about-pillar-title">Applied AI &amp; Machine Learning</h3>
          </div>
          <p className="about-pillar-desc">
            Architecting production RAG retrieval systems, fine-tuning open-weights models (PyTorch/Hugging Face), optimizing vLLM serving engines, and building semantic vector pipelines.
          </p>
        </div>

        <div className="about-pillar-card">
          <div className="about-pillar-header">
            <Code2 size={16} className="about-pillar-icon" />
            <h3 className="about-pillar-title">Full-Stack Product Engineering</h3>
          </div>
          <p className="about-pillar-desc">
            Building accessible, responsive user interfaces with React 19, Next.js App Router, and strict TypeScript alongside high-concurrency Node.js and FastAPI services.
          </p>
        </div>

        <div className="about-pillar-card">
          <div className="about-pillar-header">
            <Cloud size={16} className="about-pillar-icon" />
            <h3 className="about-pillar-title">Cloud &amp; DevOps Reliability</h3>
          </div>
          <p className="about-pillar-desc">
            Provisioning reproducible infrastructure via Docker, Kubernetes GitOps (ArgoCD/Helm), automated CI/CD pipelines, Prometheus telemetry, and Linux systems hardening.
          </p>
        </div>
      </div>

      {/* Career & Timeline */}
      <section className="about-section-block">
        <h2 className="about-section-heading">Engineering Timeline</h2>
        <div className="about-timeline-list">
          {timelineEras.map((era) => (
            <div key={era.period} className="about-timeline-row">
              <span className="about-timeline-period">{era.period}</span>
              <div className="about-timeline-details">
                <h3 className="about-timeline-role">{era.role}</h3>
                <p className="about-timeline-desc">{era.description}</p>
                {era.tags && (
                  <div className="about-timeline-tags">
                    {era.tags.map((tag) => (
                      <span key={tag} className="about-timeline-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Matrix */}
      <section className="about-section-block">
        <h2 className="about-section-heading">Technical Matrix &amp; Competencies</h2>
        <TechMatrix />
      </section>

      {/* Connect Box */}
      <section className="about-connect-card">
        <h3 className="about-connect-title">Let&apos;s Build Together</h3>
        <p className="about-connect-desc">
          I am actively exploring high-impact software engineering roles, technical advisory engagements, and distributed open-source collaboration. Feel free to connect across any channel:
        </p>

        <div className="about-social-btns">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <GithubIcon size={15} />
            <span>GitHub</span>
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <LinkedinIcon size={15} />
            <span>LinkedIn</span>
          </a>
          <a
            href={siteConfig.social.x}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <XIcon size={13} />
            <span>X (Twitter)</span>
          </a>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <FacebookIcon size={15} />
            <span>Facebook</span>
          </a>
          <a
            href={`mailto:${siteConfig.social.email}`}
            className="btn btn-primary"
          >
            <Mail size={15} />
            <span>{siteConfig.social.email}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
