"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Save,
  Check,
  Video,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  Eye,
  EyeOff,
} from "lucide-react";
import styles from "../admin.module.css";
import { HomepageCMSData, FeaturedProjectItem, DEFAULT_HOMEPAGE_DATA } from "@/services/cmsDataStore";
import { Project, getProjectThumbnail } from "@/data/projects";

interface HomepageViewProps {
  initialSubTab?: "hero" | "intro" | "featured" | "services" | "about" | "contact";
  data: HomepageCMSData;
  allProjects: Project[];
  onSave: (data: Partial<HomepageCMSData>) => Promise<void>;
}

const safeData = (input?: Partial<HomepageCMSData>): HomepageCMSData => ({
  ...DEFAULT_HOMEPAGE_DATA,
  ...(input || {}),
  introBioParagraphs:
    Array.isArray(input?.introBioParagraphs) && input.introBioParagraphs.length > 0
      ? input.introBioParagraphs
      : DEFAULT_HOMEPAGE_DATA.introBioParagraphs,
  featuredProjects:
    Array.isArray(input?.featuredProjects) && input.featuredProjects.length > 0
      ? input.featuredProjects
      : DEFAULT_HOMEPAGE_DATA.featuredProjects,
});

export const HomepageView: React.FC<HomepageViewProps> = ({
  initialSubTab = "hero",
  data,
  allProjects,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<"hero" | "intro" | "featured" | "services" | "about" | "contact">(initialSubTab);
  const [formData, setFormData] = useState<HomepageCMSData>(() => safeData(data));
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync when prop updates or subTab changes
  useEffect(() => {
    setFormData(safeData(data));
  }, [data]);

  useEffect(() => {
    if (initialSubTab) {
      setActiveTab(initialSubTab);
    }
  }, [initialSubTab]);

  const featuredProjectsList = Array.isArray(formData.featuredProjects)
    ? formData.featuredProjects
    : [];

  const handleChange = (field: keyof HomepageCMSData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      await onSave(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  // Featured Projects Reordering and Configuration
  const moveFeaturedItem = (index: number, direction: "up" | "down") => {
    const list = [...featuredProjectsList];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    // Re-assign displayOrder
    const updated = list.map((item, idx) => ({ ...item, displayOrder: idx + 1 }));
    handleChange("featuredProjects", updated);
  };

  const toggleFeaturedVisibility = (index: number) => {
    const list = [...featuredProjectsList];
    if (!list[index]) return;
    list[index] = { ...list[index], isVisible: !list[index].isVisible };
    handleChange("featuredProjects", list);
  };

  const removeFeaturedItem = (index: number) => {
    const list = featuredProjectsList.filter((_, idx) => idx !== index);
    const updated = list.map((item, idx) => ({ ...item, displayOrder: idx + 1 }));
    handleChange("featuredProjects", updated);
  };

  const updateFeaturedField = (index: number, field: keyof FeaturedProjectItem, value: any) => {
    const list = [...featuredProjectsList];
    if (!list[index]) return;
    list[index] = { ...list[index], [field]: value };
    handleChange("featuredProjects", list);
  };

  const addFeaturedProject = (slug: string) => {
    if (!slug) return;
    const exists = featuredProjectsList.some((p) => p.slug === slug);
    if (exists) return;

    const newItem: FeaturedProjectItem = {
      slug,
      displayOrder: featuredProjectsList.length + 1,
      isVisible: true,
      customTagline: allProjects.find((p) => p.slug === slug)?.tagline || "",
    };

    handleChange("featuredProjects", [...featuredProjectsList, newItem]);
  };

  return (
    <div>
      {/* Header */}
      <div className={styles.viewHeader}>
        <div className={styles.viewTitleGroup}>
          <h1 className={styles.viewTitle}>Homepage Management</h1>
          <p className={styles.viewSubtitle}>
            Configure hero narratives, high-resolution media players, services, and independent featured project showcases.
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
            <span>{saving ? "Saving..." : savedSuccess ? "Saved to CMS" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsNav}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "hero" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("hero")}
        >
          Hero Section
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "intro" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("intro")}
        >
          Introduction
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "featured" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("featured")}
        >
          Featured Projects ({featuredProjectsList.length})
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "services" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("services")}
        >
          Services Showcase
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "about" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About Preview
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "contact" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          Contact Section
        </button>
      </div>

      {/* Tab 1: Hero Section */}
      {activeTab === "hero" && (
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Hero Section Content & Media</h3>
            <p className={styles.sectionDescription}>
              Configure the primary headline, narrative statement, background MP4 video, and fallback poster image.
            </p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Main Headline</label>
            <textarea
              className={styles.textareaField}
              rows={2}
              value={formData.heroHeadline || ""}
              onChange={(e) => handleChange("heroHeadline", e.target.value)}
              placeholder="Primary hero headline..."
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Subheadline / Supporting Narrative</label>
            <textarea
              className={styles.textareaField}
              rows={3}
              value={formData.heroSubheadline || ""}
              onChange={(e) => handleChange("heroSubheadline", e.target.value)}
              placeholder="Supporting summary statement..."
            />
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Background Video URL (MP4 / WebM / Cloudinary)</label>
              <input
                type="text"
                className={styles.inputField}
                value={formData.heroVideoUrl || ""}
                onChange={(e) => handleChange("heroVideoUrl", e.target.value)}
                placeholder="/images/skyline_banner.mp4 or https://res.cloudinary.com/..."
              />
              {formData.heroVideoUrl && (
                <div className={styles.mediaPreviewContainer}>
                  <video
                    className={styles.videoPreviewFrame}
                    src={formData.heroVideoUrl}
                    poster={formData.heroPosterUrl}
                    controls
                    muted
                    loop
                  />
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Poster Image URL (Poster / Fallback Frame)</label>
              <input
                type="text"
                className={styles.inputField}
                value={formData.heroPosterUrl || ""}
                onChange={(e) => handleChange("heroPosterUrl", e.target.value)}
                placeholder="/images/skyline_twilight.jpg or https://res.cloudinary.com/..."
              />
              {formData.heroPosterUrl && (
                <div className={styles.mediaPreviewContainer}>
                  <Image
                    src={formData.heroPosterUrl}
                    alt="Hero Poster Preview"
                    fill
                    sizes="520px"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Introduction */}
      {activeTab === "intro" && (
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Introduction Statement & Editorial Bio</h3>
            <p className={styles.sectionDescription}>
              Craft the executive mission statement and editorial background paragraphs shown beneath the hero fold.
            </p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Executive Statement</label>
            <textarea
              className={styles.textareaField}
              rows={3}
              value={formData.introStatement || ""}
              onChange={(e) => handleChange("introStatement", e.target.value)}
              placeholder="High-level engineering philosophy..."
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Bio Paragraph 1</label>
            <textarea
              className={styles.textareaField}
              rows={4}
              value={formData.introBioParagraphs?.[0] || ""}
              onChange={(e) => {
                const next = [...(formData.introBioParagraphs || ["", ""])];
                next[0] = e.target.value;
                handleChange("introBioParagraphs", next);
              }}
              placeholder="First bio paragraph..."
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Bio Paragraph 2</label>
            <textarea
              className={styles.textareaField}
              rows={4}
              value={formData.introBioParagraphs?.[1] || ""}
              onChange={(e) => {
                const next = [...(formData.introBioParagraphs || ["", ""])];
                next[1] = e.target.value;
                handleChange("introBioParagraphs", next);
              }}
              placeholder="Second bio paragraph..."
            />
          </div>
        </div>
      )}

      {/* Tab 3: Featured Projects */}
      {activeTab === "featured" && (
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h3 className={styles.sectionTitle}>Featured Projects Showcase</h3>
                <p className={styles.sectionDescription}>
                  Select projects for the homepage showcase. Images and videos can be independently configured here without changing the master project documents.
                </p>
              </div>

              {/* Add Project to Showcase Selector */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <select
                  className={styles.selectField}
                  style={{ width: "auto" }}
                  onChange={(e) => {
                    if (e.target.value) {
                      addFeaturedProject(e.target.value);
                      e.target.value = "";
                    }
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>
                    + Add Project to Showcase
                  </option>
                  {allProjects
                    .filter((p) => !featuredProjectsList.some((fp) => fp.slug === p.slug))
                    .map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.title} ({p.category})
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {featuredProjectsList.length === 0 ? (
              <div className={styles.emptyState}>
                <p className={styles.emptyStateText}>No featured projects selected. Use the dropdown above to add projects.</p>
              </div>
            ) : (
              featuredProjectsList.map((item, index) => {
                const project = allProjects.find((p) => p.slug === item.slug);
                const displayTitle = project ? project.title : item.slug;
                const defaultImage = getProjectThumbnail(item.slug, project?.image, index);

                return (
                  <div
                    key={item.slug}
                    style={{
                      backgroundColor: "#141518",
                      border: "1px solid #292b31",
                      borderRadius: "8px",
                      padding: "1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {/* Item Header */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #22242b",
                        paddingBottom: "0.75rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontFamily: "monospace",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px",
                            backgroundColor: "#191b20",
                            border: "1px solid #292b31",
                            color: "#92949d",
                          }}
                        >
                          #{index + 1}
                        </span>
                        <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "#f2f2f0" }}>
                          {displayTitle}
                        </h4>
                        <span style={{ fontSize: "0.75rem", color: "#65676e" }}>({item.slug})</span>
                      </div>

                      {/* Controls */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnGhost} ${styles.btnSm}`}
                          onClick={() => moveFeaturedItem(index, "up")}
                          disabled={index === 0}
                          title="Move up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnGhost} ${styles.btnSm}`}
                          onClick={() => moveFeaturedItem(index, "down")}
                          disabled={index === featuredProjectsList.length - 1}
                          title="Move down"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnGhost} ${styles.btnSm}`}
                          onClick={() => toggleFeaturedVisibility(index)}
                          title={item.isVisible ? "Visible on homepage" : "Hidden from homepage"}
                        >
                          {item.isVisible ? (
                            <Eye size={14} style={{ color: "#22c55e" }} />
                          ) : (
                            <EyeOff size={14} style={{ color: "#65676e" }} />
                          )}
                        </button>
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                          onClick={() => removeFeaturedItem(index)}
                          title="Remove from featured"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Independent Configuration Fields */}
                    <div className={styles.fieldGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Showcase Custom Tagline (Overrides project tagline)</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={item.customTagline || ""}
                          placeholder={project?.tagline || "Enter bespoke homepage headline..."}
                          onChange={(e) => updateFeaturedField(index, "customTagline", e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Independent Showcase Image URL (Overrides default image)</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={item.customImage || ""}
                          placeholder={defaultImage}
                          onChange={(e) => updateFeaturedField(index, "customImage", e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Showcase Video Preview URL (Cloudinary / MP4)</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={item.customVideoUrl || ""}
                          placeholder="Optional video preview on hover..."
                          onChange={(e) => updateFeaturedField(index, "customVideoUrl", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Services */}
      {activeTab === "services" && (
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Services & Technical Expertise Showcase</h3>
            <p className={styles.sectionDescription}>
              Configure the section title and display options for engineering domains and capabilities.
            </p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Section Heading</label>
            <input
              type="text"
              className={styles.inputField}
              value={formData.servicesTitle || ""}
              onChange={(e) => handleChange("servicesTitle", e.target.value)}
              placeholder="e.g. Technical Expertise"
            />
          </div>
        </div>
      )}

      {/* Tab 5: About Preview */}
      {activeTab === "about" && (
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>About Preview Section</h3>
            <p className={styles.sectionDescription}>
              Manage the summary narrative, button text, and destination shown in the homepage about preview fold.
            </p>
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Section Heading</label>
              <input
                type="text"
                className={styles.inputField}
                value={formData.aboutHeading || ""}
                onChange={(e) => handleChange("aboutHeading", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Button Text</label>
              <input
                type="text"
                className={styles.inputField}
                value={formData.aboutButtonText || ""}
                onChange={(e) => handleChange("aboutButtonText", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Executive About Statement</label>
            <textarea
              className={styles.textareaField}
              rows={4}
              value={formData.aboutStatement || ""}
              onChange={(e) => handleChange("aboutStatement", e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Tab 6: Contact Section */}
      {activeTab === "contact" && (
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Contact Section</h3>
            <p className={styles.sectionDescription}>
              Update contact headline, primary inbox email, availability status, and geographic base.
            </p>
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Contact Headline</label>
              <input
                type="text"
                className={styles.inputField}
                value={formData.contactHeadline || ""}
                onChange={(e) => handleChange("contactHeadline", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Direct Email</label>
              <input
                type="email"
                className={styles.inputField}
                value={formData.contactEmail || ""}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Availability Status</label>
              <input
                type="text"
                className={styles.inputField}
                value={formData.contactAvailability || ""}
                onChange={(e) => handleChange("contactAvailability", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Location Base</label>
              <input
                type="text"
                className={styles.inputField}
                value={formData.contactLocation || ""}
                onChange={(e) => handleChange("contactLocation", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
