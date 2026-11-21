"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Save,
  Check,
  FileText,
  User,
  FolderKanban,
  Mail,
  ExternalLink,
} from "lucide-react";
import styles from "../admin.module.css";
import Link from "next/link";

interface PagesViewProps {
  pageType: "about" | "projects" | "contact";
}

export const PagesView: React.FC<PagesViewProps> = ({ pageType }) => {
  const [activeTab, setActiveTab] = useState<"about" | "projects" | "contact">(pageType);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Editable fields for pages
  const [aboutData, setAboutData] = useState({
    title: "About Me",
    heading: "Architecting high-throughput machine learning systems and distributed cloud backends.",
    heroImage: "/images/about/about_stage_1.jpg",
    narrative:
      "I treat computer science not merely as a modern trade, but as an intellectual craft that bridges mechanical discipline with editorial clarity. Over the past several years, I have worked across the stack—from designing event-driven distributed ingestion pipelines to architecting accessible, zero-bloat web clients.",
    philosophy:
      "My engineering philosophy is shaped by durable principles: favor explicit architectures over magic abstractions, prioritize deterministic latency over brute computing power, and craft user experiences that respect human attention rather than exploit it.",
    journeyImage: "/images/about/journey_architecture.jpg",
  });

  const [projectsData, setProjectsData] = useState({
    title: "All Projects & Technical Case Studies",
    subtitle:
      "A curated catalog of distributed systems, high-throughput backend runtimes, and accessible web platforms.",
    bannerText:
      "Each project is grounded in real production constraints, empirical benchmarks, and clear architecture highlights.",
  });

  const [contactData, setContactData] = useState({
    title: "Get In Touch",
    subtitle:
      "Have an engineering challenge, high-throughput architecture to discuss, or seeking a systems engineer?",
    email: "dilshan.devxx@gmail.com",
    availabilityNote: "Available for engineering roles & technical advisory worldwide.",
    location: "Colombo, Sri Lanka",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    setTimeout(() => {
      setSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }, 600);
  };

  return (
    <div>
      {/* View Header */}
      <div className={styles.viewHeader}>
        <div className={styles.viewTitleGroup}>
          <h1 className={styles.viewTitle}>Website Pages</h1>
          <p className={styles.viewSubtitle}>
            Direct editorial control over individual top-level routes and static portfolio sections.
          </p>
        </div>

        <div className={styles.viewActions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <span className={styles.spinner} style={{ width: 14, height: 14 }} />
            ) : savedSuccess ? (
              <Check size={14} />
            ) : (
              <Save size={14} />
            )}
            <span>{saving ? "Saving..." : savedSuccess ? "Page Content Saved" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsNav}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "about" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About Page (/about)
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "projects" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          Projects Index (/projects)
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "contact" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          Contact (/contact)
        </button>
      </div>

      {/* Tab 1: About Page */}
      {activeTab === "about" && (
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h3 className={styles.sectionTitle}>About Me Page (/about)</h3>
                <p className={styles.sectionDescription}>
                  Configure the long-form biography, engineering philosophy, and visual photo highlights.
                </p>
              </div>
              <Link
                href="/about"
                target="_blank"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
              >
                <span>Preview /about</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Page Headline</label>
            <input
              type="text"
              className={styles.inputField}
              value={aboutData.heading}
              onChange={(e) => setAboutData({ ...aboutData, heading: e.target.value })}
            />
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Stage / Profile Image URL</label>
              <input
                type="text"
                className={styles.inputField}
                value={aboutData.heroImage}
                onChange={(e) => setAboutData({ ...aboutData, heroImage: e.target.value })}
              />
              {aboutData.heroImage && (
                <div className={styles.mediaPreviewContainer}>
                  <Image
                    src={aboutData.heroImage}
                    alt="Stage Preview"
                    fill
                    sizes="520px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Architecture Journey Image URL</label>
              <input
                type="text"
                className={styles.inputField}
                value={aboutData.journeyImage}
                onChange={(e) => setAboutData({ ...aboutData, journeyImage: e.target.value })}
              />
              {aboutData.journeyImage && (
                <div className={styles.mediaPreviewContainer}>
                  <Image
                    src={aboutData.journeyImage}
                    alt="Journey Preview"
                    fill
                    sizes="520px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Narrative Biography</label>
            <textarea
              className={styles.textareaField}
              rows={4}
              value={aboutData.narrative}
              onChange={(e) => setAboutData({ ...aboutData, narrative: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Engineering Philosophy & Stance</label>
            <textarea
              className={styles.textareaField}
              rows={4}
              value={aboutData.philosophy}
              onChange={(e) => setAboutData({ ...aboutData, philosophy: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Tab 2: Projects Index */}
      {activeTab === "projects" && (
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h3 className={styles.sectionTitle}>Projects Index Page (/projects)</h3>
                <p className={styles.sectionDescription}>
                  Configure the header narrative and introductory statement of the projects catalog.
                </p>
              </div>
              <Link
                href="/projects"
                target="_blank"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
              >
                <span>Preview /projects</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Header Title</label>
            <input
              type="text"
              className={styles.inputField}
              value={projectsData.title}
              onChange={(e) => setProjectsData({ ...projectsData, title: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Introductory Subtitle</label>
            <textarea
              className={styles.textareaField}
              rows={3}
              value={projectsData.subtitle}
              onChange={(e) => setProjectsData({ ...projectsData, subtitle: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Catalog Banner Note</label>
            <input
              type="text"
              className={styles.inputField}
              value={projectsData.bannerText}
              onChange={(e) => setProjectsData({ ...projectsData, bannerText: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Tab 3: Contact */}
      {activeTab === "contact" && (
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h3 className={styles.sectionTitle}>Contact Page & Direct Inquiries</h3>
                <p className={styles.sectionDescription}>
                  Manage direct contact statements, email inbox, and availability notice.
                </p>
              </div>
              <Link
                href="/#contact"
                target="_blank"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
              >
                <span>Preview /#contact</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Title</label>
              <input
                type="text"
                className={styles.inputField}
                value={contactData.title}
                onChange={(e) => setContactData({ ...contactData, title: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Direct Email</label>
              <input
                type="email"
                className={styles.inputField}
                value={contactData.email}
                onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Inquiry Subtitle</label>
            <textarea
              className={styles.textareaField}
              rows={3}
              value={contactData.subtitle}
              onChange={(e) => setContactData({ ...contactData, subtitle: e.target.value })}
            />
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Availability Status</label>
              <input
                type="text"
                className={styles.inputField}
                value={contactData.availabilityNote}
                onChange={(e) => setContactData({ ...contactData, availabilityNote: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Base Location</label>
              <input
                type="text"
                className={styles.inputField}
                value={contactData.location}
                onChange={(e) => setContactData({ ...contactData, location: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
