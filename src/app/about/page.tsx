import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { timelineEras } from "@/data/timeline";
import { TechMatrix } from "@/components/TechMatrix";

export const metadata = {
  title: `About — ${siteConfig.siteName}`,
  description: siteConfig.sidebarBio,
};

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="about-section-heading">
      <a href={`#${id}`} className="heading-anchor" aria-label={`Permalink to ${id}`}>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6.5 9.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5l-1 1" />
          <path d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5l1-1" />
        </svg>
      </a>
      <span>{children}</span>
    </h2>
  );
}

export default function AboutPage() {
  return (
    <div className="about-content-narrow">
      {/* Clean Page Header */}
      <header className="page-header">
        <h1 className="page-title">About Me</h1>
        <p className="page-subtitle">
          Software engineer and open-source creator specializing in applied AI/ML systems, high-concurrency platforms, and resilient cloud infrastructure.
        </p>
        <div className="status-indicator-inline">
          <span className="status-pulse-dot" />
          <span>Available for Roles &amp; Consulting</span>
        </div>
      </header>

      {/* Main Content Stream */}
      <div className="about-sections-stream">
        {/* Side-by-side Story & Photo */}
        <div className="about-intro-grid">
          <div className="about-prose-block">
            <p>
              Hey, I&apos;m <strong>Dilshan</strong>! Welcome to my spot on the web for{" "}
              <Link href="/blog" className="text-link">writing</Link>,{" "}
              <Link href="/projects" className="text-link">projects</Link>, and{" "}
              <Link href="/shelves" className="text-link">open knowledge</Link>. I work across the stack as an AI/ML engineer, full-stack developer, and DevOps practitioner, focusing on scalable backend services, distributed systems, and real-time LLM inference pipelines.
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
            <div className="about-stat-label">Primary Roles</div>
            <div className="about-stat-value">AI/ML &bull; Full-Stack &bull; DevOps</div>
          </div>
          <div className="about-stat-box">
            <div className="about-stat-label">Core Focus</div>
            <div className="about-stat-value">LLMs, Web Scale &amp; GitOps</div>
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

        {/* Career & Timeline */}
        <section className="about-section-block">
          <SectionHeading id="timeline">Engineering Timeline</SectionHeading>
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

        {/* Technical Competencies */}
        <section className="about-section-block">
          <SectionHeading id="competencies">Technical Competencies</SectionHeading>
          <TechMatrix />
        </section>

        {/* Songs Section */}
        <section className="about-section-block">
          <SectionHeading id="songs">Songs</SectionHeading>
          <ul className="about-link-list">
            <li>
              <a href="https://soundcloud.com/ivoryandivory/rain" target="_blank" rel="noopener noreferrer">
                Rain
              </a>
            </li>
            <li>
              <a href="https://soundcloud.com/ivoryandivory/let-it-be" target="_blank" rel="noopener noreferrer">
                Let It Be
              </a>
            </li>
            <li>
              <a href="https://soundcloud.com/ivoryandivory/id-like-to-walk-around-in-your-mind" target="_blank" rel="noopener noreferrer">
                I&apos;d Like to Walk Around In Your Mind
              </a>
            </li>
            <li>
              <a href="https://soundcloud.com/ivoryandivory/el-pasadiscos" target="_blank" rel="noopener noreferrer">
                El Pasadiscos
              </a>
            </li>
            <li>
              <a href="https://soundcloud.com/john-termaat/such-great-heights" target="_blank" rel="noopener noreferrer">
                Such Great Heights
              </a>{" "}
              <span className="about-link-note">(Duet)</span>
            </li>
            <li>
              <a href="https://soundcloud.com/john-termaat/night-nurse" target="_blank" rel="noopener noreferrer">
                Night Nurse
              </a>{" "}
              <span className="about-link-note">(Duet)</span>
            </li>
          </ul>
        </section>

        {/* Miscellaneous Section */}
        <section className="about-section-block">
          <SectionHeading id="miscellaneous">Miscellaneous</SectionHeading>
          <ul className="about-link-list">
            <li>
              <Link href="/resume">Resume</Link>
            </li>
            <li>
              <Link href="/shelves">Digital Garden &amp; Shelves</Link>
            </li>
            <li>
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
                Open Source Repositories
              </a>
            </li>
          </ul>
        </section>

        {/* Connect Section */}
        <section className="about-section-block">
          <SectionHeading id="connect">Connect</SectionHeading>
          <p className="about-connect-text">
            I am actively exploring high-impact software engineering roles, technical advisory engagements, and open-source collaboration. Feel free to reach out across any channel:
          </p>
          <ul className="about-link-list">
            <li>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${siteConfig.social.email}`}>
                {siteConfig.social.email}
              </a>
            </li>
            <li>
              <strong>GitHub:</strong>{" "}
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
                github.com/dilshandevxx
              </a>
            </li>
            <li>
              <strong>LinkedIn:</strong>{" "}
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
                linkedin.com/in/heydilshan
              </a>
            </li>
            <li>
              <strong>X (Twitter):</strong>{" "}
              <a href={siteConfig.social.x} target="_blank" rel="noopener noreferrer">
                @dilshanverse
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
