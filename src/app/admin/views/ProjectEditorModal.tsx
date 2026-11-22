"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Save,
  Check,
  Video,
  Image as ImageIcon,
  Plus,
  Trash2,
  ExternalLink,
  Code,
  Layers,
  Sparkles,
  CheckSquare,
  Square,
  Sliders,
  FileText,
  Cpu,
  BookOpen,
  Globe,
  CheckCircle2,
} from "lucide-react";
import styles from "../admin.module.css";
import {
  Project,
  ProjectCategory,
  ProjectStatus,
  ProjectSectionConfig,
  getProjectThumbnail,
} from "@/data/projects";

interface ProjectEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSave: (project: Project) => Promise<void>;
}

type EditorSection =
  | "basic"
  | "overview"
  | "problemSolution"
  | "architecture"
  | "gallery"
  | "skills"
  | "tech"
  | "seo"
  | "video";

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  isOpen,
  onClose,
  project,
  onSave,
}) => {
  const [activeSection, setActiveSection] = useState<EditorSection>("basic");
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [tagInput, setTagInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initialize or reset form with current project details
  useEffect(() => {
    if (project) {
      const initialImg = (
        project.image ||
        (project as any).coverImage ||
        getProjectThumbnail(project.slug, project.image, 0, (project as any).coverImage) ||
        ""
      ).trim();

      const existingArchImage =
        project.architectureImage ||
        project.gallery?.find((g) => g.type === "diagram")?.url ||
        "";
      const existingArchCaption =
        project.architectureCaption ||
        project.gallery?.find((g) => g.type === "diagram")?.caption ||
        "";

      const existingSkills =
        project.keySkillsLearned && project.keySkillsLearned.length > 0
          ? [...project.keySkillsLearned]
          : project.highlights && project.highlights.length > 0
          ? [...project.highlights]
          : [];

      setFormData({
        ...project,
        title: project.title || "",
        tagline: project.tagline || "",
        description: project.description || "",
        overview: project.overview || project.longDescription || project.description || "",
        problemStatement: project.problemStatement || "",
        proposedSolution: project.proposedSolution || "",
        architecture: project.architecture || "",
        architectureImage: existingArchImage,
        architectureCaption: existingArchCaption,
        keySkillsLearned: existingSkills,
        seoTitle: project.seoTitle || project.title || "",
        seoDescription: project.seoDescription || project.tagline || project.description || "",
        seoKeywords: project.seoKeywords || project.tags || [],
        githubUrl: project.githubUrl || "",
        demoUrl: project.demoUrl || "",
        writeupUrl: project.writeupUrl || "",
        tags: project.tags ? [...project.tags] : [],
        stackLayers: project.stackLayers ? [...project.stackLayers] : [],
        gallery: project.gallery ? [...project.gallery] : [],
        sectionConfig: {
          overview: project.sectionConfig?.overview ?? true,
          problem: project.sectionConfig?.problem ?? Boolean(project.problemStatement),
          solution: project.sectionConfig?.solution ?? Boolean(project.proposedSolution),
          architecture:
            project.sectionConfig?.architecture ??
            Boolean(project.architecture || existingArchImage),
          gallery:
            project.sectionConfig?.gallery ?? Boolean(project.gallery && project.gallery.length > 0),
          keySkills:
            project.sectionConfig?.keySkills ?? Boolean(existingSkills.length > 0),
          techStack: project.sectionConfig?.techStack ?? true,
          links: project.sectionConfig?.links ?? Boolean(project.demoUrl || project.githubUrl),
        },
        image: initialImg,
        coverImage: initialImg,
      });
    } else {
      // Default new project template
      setFormData({
        slug: "",
        title: "",
        category: "Distributed Systems",
        status: "Existing",
        featured: false,
        date: new Date().getFullYear().toString(),
        tagline: "",
        description: "",
        longDescription: "",
        overview: "",
        problemStatement: "",
        proposedSolution: "",
        architecture: "",
        architectureImage: "",
        architectureCaption: "",
        keySkillsLearned: [
          "Distributed consensus and deterministic state replication",
          "Sub-millisecond tail latency optimization under load",
          "Resilient circuit breaking & graceful degradation boundaries",
        ],
        seoTitle: "",
        seoDescription: "",
        seoKeywords: ["Distributed Systems", "Go", "Cloud Architecture"],
        image: "/images/project_collective.jpg",
        coverImage: "/images/project_collective.jpg",
        tags: ["Go", "Distributed Systems", "Kubernetes"],
        githubUrl: "https://github.com/dilshandevxx",
        demoUrl: "",
        writeupUrl: "",
        stars: 0,
        metrics: "",
        metricsDetail: [],
        stackLayers: [],
        gallery: [],
        sectionConfig: {
          overview: true,
          problem: true,
          solution: true,
          architecture: true,
          gallery: true,
          keySkills: true,
          techStack: true,
          links: true,
        },
        videoDemo: {
          videoUrl: "",
          thumbnail: "",
          title: "",
          description: "",
        },
      });
    }
    setActiveSection("basic");
    setErrorMsg(null);
  }, [project, isOpen]);

  if (!isOpen) return null;

  const resolvedCover = getProjectThumbnail(
    formData.slug || "",
    formData.image || (formData as any).coverImage
  );
  const galleryItems = formData.gallery || [];
  const videoPoster = formData.videoDemo?.thumbnail;
  const totalVisualAssetsCount =
    (resolvedCover ? 1 : 0) + galleryItems.length + (videoPoster ? 1 : 0);

  const sectionConfig: ProjectSectionConfig = formData.sectionConfig || {
    overview: true,
    problem: true,
    solution: true,
    architecture: true,
    gallery: true,
    keySkills: true,
    techStack: true,
    links: true,
  };

  const toggleSection = (key: keyof ProjectSectionConfig) => {
    setFormData((prev) => {
      const current = prev.sectionConfig || {
        overview: true,
        problem: true,
        solution: true,
        architecture: true,
        gallery: true,
        keySkills: true,
        techStack: true,
        links: true,
      };
      return {
        ...prev,
        sectionConfig: {
          ...current,
          [key]: !current[key],
        },
      };
    });
  };

  const handleChange = (field: keyof Project, value: any) => {
    setFormData((prev) => {
      const next: Partial<Project> = { ...prev, [field]: value };
      if (field === "image") {
        next.coverImage = value;
      } else if (field === "coverImage") {
        next.image = value;
      }
      return next;
    });
  };

  const handleNestedChange = (parent: "videoDemo", field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] || {}),
        [field]: value,
      },
    }));
  };

  // Tag helpers
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const currentTags = formData.tags || [];
    if (!currentTags.includes(tagInput.trim())) {
      handleChange("tags", [...currentTags, tagInput.trim()]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = formData.tags || [];
    handleChange(
      "tags",
      currentTags.filter((t) => t !== tagToRemove)
    );
  };

  // Key Skills helpers
  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    const current = formData.keySkillsLearned || [];
    handleChange("keySkillsLearned", [...current, skillInput.trim()]);
    setSkillInput("");
  };

  const handleRemoveSkill = (index: number) => {
    const current = formData.keySkillsLearned || [];
    handleChange(
      "keySkillsLearned",
      current.filter((_, idx) => idx !== index)
    );
  };

  const handleImportHighlights = () => {
    if (formData.highlights && formData.highlights.length > 0) {
      const existing = new Set(formData.keySkillsLearned || []);
      const merged = [...(formData.keySkillsLearned || [])];
      for (const h of formData.highlights) {
        if (!existing.has(h)) merged.push(h);
      }
      handleChange("keySkillsLearned", merged);
    }
  };

  // Gallery helpers
  const handleAddGalleryItem = () => {
    const currentGallery = formData.gallery || [];
    handleChange("gallery", [
      ...currentGallery,
      {
        title: "Interface Screenshot",
        caption: "Workflow view of the application",
        url: "/images/project_collective.jpg",
        type: "ui",
      },
    ]);
  };

  const handleRemoveGalleryItem = (index: number) => {
    const currentGallery = formData.gallery || [];
    handleChange(
      "gallery",
      currentGallery.filter((_, idx) => idx !== index)
    );
  };

  const handleUpdateGalleryItem = (index: number, field: string, value: any) => {
    const currentGallery = [...(formData.gallery || [])];
    currentGallery[index] = { ...currentGallery[index], [field]: value };
    handleChange("gallery", currentGallery);
  };

  // Save handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      setErrorMsg("Project Title is required.");
      setActiveSection("basic");
      return;
    }
    if (!formData.slug?.trim()) {
      setErrorMsg("Project Slug is required (e.g. distributed-kv-store).");
      setActiveSection("basic");
      return;
    }

    setSaving(true);
    setErrorMsg(null);
    try {
      const resolvedImg = (formData.image || (formData as any).coverImage || "").trim();
      const payload: Project = {
        ...(formData as Project),
        image: resolvedImg,
        coverImage: resolvedImg,
        overview: formData.overview || formData.longDescription || formData.description || "",
        keySkillsLearned: formData.keySkillsLearned || [],
        architectureImage: formData.architectureImage || "",
        architectureCaption: formData.architectureCaption || "",
        sectionConfig,
      };
      await onSave(payload);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={`${styles.modalDialog} ${styles.modalLarge}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <h3 className={styles.modalTitle}>
              {project ? `Edit: ${project.title}` : "Add New Project"}
            </h3>
            {formData.slug && (
              <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#92949d" }}>
                /projects/{formData.slug}
              </span>
            )}
          </div>

          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close Editor"
          >
            <X size={16} />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.65rem 1.5rem",
            backgroundColor: "#101113",
            borderBottom: "1px solid #292b31",
            overflowX: "auto",
          }}
        >
          {[
            { id: "basic", label: "1. General & Links" },
            { id: "overview", label: "2. Overview" },
            { id: "problemSolution", label: "3. Problem & Solution" },
            { id: "architecture", label: "4. Architecture & Diagram" },
            { id: "gallery", label: "5. Project Images" },
            { id: "skills", label: "6. Key Skills Learned" },
            { id: "tech", label: "7. Tech Stack" },
            { id: "seo", label: "8. SEO Metadata" },
            { id: "video", label: "9. Video Demo" },
          ].map((sec) => (
            <button
              key={sec.id}
              type="button"
              className={`${styles.tabBtn} ${activeSection === sec.id ? styles.tabBtnActive : ""}`}
              style={{ padding: "0.4rem 0.75rem", fontSize: "0.78rem" }}
              onClick={() => setActiveSection(sec.id as EditorSection)}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Master Checklist: Visible Sections on Project Description Page */}
        <div className={styles.sectionChecklistBar}>
          <span className={styles.sectionChecklistTitle}>Page Sections:</span>
          {[
            { key: "overview", label: "Overview", tab: "overview" },
            { key: "problem", label: "Problem", tab: "problemSolution" },
            { key: "solution", label: "Solution", tab: "problemSolution" },
            { key: "architecture", label: "Architecture", tab: "architecture" },
            { key: "gallery", label: "Images", tab: "gallery" },
            { key: "keySkills", label: "Key Skills", tab: "skills" },
            { key: "techStack", label: "Tech Stack", tab: "tech" },
            { key: "links", label: "Live Links", tab: "basic" },
          ].map((item) => {
            const isEnabled = sectionConfig[item.key as keyof ProjectSectionConfig] ?? true;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => toggleSection(item.key as keyof ProjectSectionConfig)}
                className={`${styles.sectionPillToggle} ${
                  isEnabled ? styles.sectionPillActive : styles.sectionPillInactive
                }`}
                title={`Click to ${isEnabled ? "hide" : "show"} ${item.label} on project page`}
              >
                {isEnabled ? (
                  <CheckSquare size={13} style={{ color: "#818cf8" }} />
                ) : (
                  <Square size={13} style={{ color: "#65676e" }} />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div
            style={{
              padding: "0.65rem 1.5rem",
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              borderBottom: "1px solid rgba(239, 68, 68, 0.25)",
              color: "#ef4444",
              fontSize: "0.82rem",
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Modal Body / Active Section Forms */}
        <div className={styles.modalBody}>
          {/* Always-Visible Visual Summary Strip of All Currently Attached Media */}
          <div className={styles.attachedMediaBar}>
            <div className={styles.attachedMediaBarHeader}>
              <div className={styles.attachedMediaBarTitle}>
                <ImageIcon size={15} style={{ color: "#6366f1" }} />
                <span>Attached Media Assets ({totalVisualAssetsCount})</span>
              </div>

              <button
                type="button"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                style={{ fontSize: "0.72rem", padding: "0.25rem 0.6rem" }}
                onClick={() => {
                  handleAddGalleryItem();
                  setActiveSection("gallery");
                }}
              >
                <Plus size={12} />
                <span>Add Image</span>
              </button>
            </div>

            <div className={styles.attachedMediaGrid}>
              {/* Cover Thumbnail */}
              <div
                className={styles.attachedMediaItem}
                onClick={() => setActiveSection("basic")}
                title="Click to edit Cover Image"
              >
                <div className={styles.attachedMediaItemThumb}>
                  <Image
                    src={resolvedCover}
                    alt="Cover Thumbnail"
                    fill
                    sizes="140px"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>
                <span className={styles.attachedMediaItemType}>Cover Hero</span>
                <span className={styles.attachedMediaItemCaption}>
                  {formData.image ? "Custom Cover" : "Default"}
                </span>
              </div>

              {/* Architecture Diagram if set */}
              {formData.architectureImage && (
                <div
                  className={styles.attachedMediaItem}
                  onClick={() => setActiveSection("architecture")}
                  title="Click to edit Architecture Diagram"
                >
                  <div className={styles.attachedMediaItemThumb}>
                    <Image
                      src={formData.architectureImage}
                      alt="Architecture Diagram"
                      fill
                      sizes="140px"
                      style={{ objectFit: "contain" }}
                      unoptimized
                    />
                  </div>
                  <span className={styles.attachedMediaItemType}>Architecture</span>
                  <span className={styles.attachedMediaItemCaption}>System Diagram</span>
                </div>
              )}

              {/* Inside Gallery Slides */}
              {galleryItems.map((item, idx) => (
                <div
                  key={idx}
                  className={styles.attachedMediaItem}
                  onClick={() => setActiveSection("gallery")}
                  title={`Click to edit Inside Slide #${idx + 1}`}
                >
                  <div className={styles.attachedMediaItemThumb}>
                    <Image
                      src={item.url || "/images/project_collective.jpg"}
                      alt={item.title || `Slide ${idx + 1}`}
                      fill
                      sizes="140px"
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                  <span className={styles.attachedMediaItemType}>Slide #{idx + 1}</span>
                  <span className={styles.attachedMediaItemCaption}>
                    {item.title || item.type || "Diagram"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              1. BASIC INFORMATION & MAIN LINKS
              ========================================================================= */}
          {activeSection === "basic" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Section Toggle */}
              <div className={styles.sectionToggleBox}>
                <div className={styles.sectionToggleLabel}>
                  <span className={styles.sectionToggleTitle}>Live Demo & GitHub Repo Buttons</span>
                  <span className={styles.sectionToggleDesc}>
                    Display action buttons for live deployment and source code at the top of the project page.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={sectionConfig.links ?? true}
                  onChange={() => toggleSection("links")}
                  style={{ width: 18, height: 18, accentColor: "#6366f1", cursor: "pointer" }}
                />
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Main Project Title *</label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={formData.title || ""}
                    onChange={(e) => {
                      handleChange("title", e.target.value);
                      if (!project && !formData.slug) {
                        handleChange(
                          "slug",
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-|-$/g, "")
                        );
                      }
                    }}
                    placeholder="e.g. Distributed LLM Inference Platform"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Slug (URL Key) *</label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={formData.slug || ""}
                    onChange={(e) => handleChange("slug", e.target.value)}
                    placeholder="e.g. distributed-llm-inference"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Main Description / Tagline</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={formData.tagline || ""}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                  placeholder="e.g. Low-latency vLLM & PagedAttention model serving runtime"
                />
                <span style={{ fontSize: "0.72rem", color: "#92949d", marginTop: "0.3rem" }}>
                  Displayed under the main title on the project description page.
                </span>
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Category</label>
                  <select
                    className={styles.selectField}
                    value={formData.category || "Product"}
                    onChange={(e) => handleChange("category", e.target.value as ProjectCategory)}
                  >
                    <option value="Product">Product</option>
                    <option value="Company">Company</option>
                    <option value="Research">Research</option>
                    <option value="Open Source">Open Source</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Distributed Systems">Distributed Systems</option>
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Systems">Systems</option>
                    <option value="Platform Engineering">Platform Engineering</option>
                    <option value="MLOps">MLOps</option>
                    <option value="Data Engineering">Data Engineering</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Security">Security</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Status</label>
                  <select
                    className={styles.selectField}
                    value={formData.status || "Existing"}
                    onChange={(e) => handleChange("status", e.target.value as ProjectStatus)}
                  >
                    <option value="Existing">Production Ready (Existing)</option>
                    <option value="Planned">Architecture / Prototype (Planned)</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Release Year / Date</label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={formData.date || ""}
                    onChange={(e) => handleChange("date", e.target.value)}
                    placeholder="e.g. 2026"
                  />
                </div>
              </div>

              {/* Action Links */}
              <div className={styles.fieldGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>GitHub Repository Link</label>
                  <input
                    type="url"
                    className={styles.inputField}
                    value={formData.githubUrl || ""}
                    onChange={(e) => handleChange("githubUrl", e.target.value)}
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Live Application / Demo Link</label>
                  <input
                    type="url"
                    className={styles.inputField}
                    value={formData.demoUrl || ""}
                    onChange={(e) => handleChange("demoUrl", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Cover Hero Image */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Cover Image (Hero Showcase Banner)</label>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      className={styles.inputField}
                      value={formData.image || (formData as any).coverImage || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        handleChange("image", val);
                        handleChange("coverImage", val);
                      }}
                      placeholder="/images/project_collective.jpg or https://..."
                    />
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "#92949d",
                        marginTop: "0.35rem",
                        display: "block",
                      }}
                    >
                      Large hero visual rendered at the top of the project description page.
                    </span>
                  </div>
                  <div
                    style={{
                      width: 90,
                      height: 56,
                      position: "relative",
                      borderRadius: 6,
                      overflow: "hidden",
                      backgroundColor: "#191b20",
                      border: "1px solid #292b31",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={resolvedCover}
                      alt="Thumbnail preview"
                      fill
                      sizes="90px"
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={Boolean(formData.featured)}
                  onChange={(e) => handleChange("featured", e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: "#6366f1" }}
                />
                <label
                  htmlFor="featuredToggle"
                  style={{ fontSize: "0.84rem", color: "#f2f2f0", cursor: "pointer" }}
                >
                  Featured on Homepage Folio
                </label>
              </div>
            </div>
          )}

          {/* =========================================================================
              2. OVERVIEW SECTION
              ========================================================================= */}
          {activeSection === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className={styles.sectionToggleBox}>
                <div className={styles.sectionToggleLabel}>
                  <span className={styles.sectionToggleTitle}>Include Overview Section</span>
                  <span className={styles.sectionToggleDesc}>
                    Render &ldquo;The Overview&rdquo; narrative on the project description page.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={sectionConfig.overview ?? true}
                  onChange={() => toggleSection("overview")}
                  style={{ width: 18, height: 18, accentColor: "#6366f1", cursor: "pointer" }}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Overview Narrative (Detailed Story)</label>
                <textarea
                  className={styles.textareaField}
                  rows={6}
                  value={formData.overview || formData.longDescription || ""}
                  onChange={(e) => {
                    handleChange("overview", e.target.value);
                    handleChange("longDescription", e.target.value);
                  }}
                  placeholder="The executive engineering thesis, motivation, and end-to-end scope of this system..."
                />
                <span style={{ fontSize: "0.72rem", color: "#92949d", marginTop: "0.3rem" }}>
                  Appears as the prominent leading editorial paragraph in &ldquo;The Overview&rdquo;.
                </span>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Short Card Description</label>
                <textarea
                  className={styles.textareaField}
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Concise 1-2 sentence description displayed on project listing cards..."
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              3. PROBLEM & PROPOSED SOLUTION
              ========================================================================= */}
          {activeSection === "problemSolution" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Problem Section Toggle */}
              <div className={styles.sectionToggleBox}>
                <div className={styles.sectionToggleLabel}>
                  <span className={styles.sectionToggleTitle}>Include Problem Statement</span>
                  <span className={styles.sectionToggleDesc}>
                    Render &ldquo;The Problem&rdquo; section on the project description page.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={sectionConfig.problem ?? Boolean(formData.problemStatement)}
                  onChange={() => toggleSection("problem")}
                  style={{ width: 18, height: 18, accentColor: "#6366f1", cursor: "pointer" }}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Problem Statement</label>
                <textarea
                  className={styles.textareaField}
                  rows={4}
                  value={formData.problemStatement || ""}
                  onChange={(e) => handleChange("problemStatement", e.target.value)}
                  placeholder="What production bottleneck, latency spike, or engineering limitation necessitated this architecture?"
                />
              </div>

              {/* Solution Section Toggle */}
              <div className={styles.sectionToggleBox} style={{ marginTop: "0.5rem" }}>
                <div className={styles.sectionToggleLabel}>
                  <span className={styles.sectionToggleTitle}>Include Proposed Solution</span>
                  <span className={styles.sectionToggleDesc}>
                    Render &ldquo;The Solution&rdquo; section on the project description page.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={sectionConfig.solution ?? Boolean(formData.proposedSolution)}
                  onChange={() => toggleSection("solution")}
                  style={{ width: 18, height: 18, accentColor: "#6366f1", cursor: "pointer" }}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Proposed Solution</label>
                <textarea
                  className={styles.textareaField}
                  rows={4}
                  value={formData.proposedSolution || ""}
                  onChange={(e) => handleChange("proposedSolution", e.target.value)}
                  placeholder="Architectural thesis, algorithms, and core system design deployed to resolve the problem..."
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              4. ARCHITECTURE & DIAGRAMS
              ========================================================================= */}
          {activeSection === "architecture" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className={styles.sectionToggleBox}>
                <div className={styles.sectionToggleLabel}>
                  <span className={styles.sectionToggleTitle}>Include Architecture Section</span>
                  <span className={styles.sectionToggleDesc}>
                    Render &ldquo;Architecture&rdquo; description and diagram on the project description page.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={
                    sectionConfig.architecture ??
                    Boolean(formData.architecture || formData.architectureImage)
                  }
                  onChange={() => toggleSection("architecture")}
                  style={{ width: 18, height: 18, accentColor: "#6366f1", cursor: "pointer" }}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Architecture Description</label>
                <textarea
                  className={styles.textareaField}
                  rows={4}
                  value={formData.architecture || ""}
                  onChange={(e) => handleChange("architecture", e.target.value)}
                  placeholder="Detailed breakdown of components, data flow, event brokers, storage topologies, and request lifecycles..."
                />
              </div>

              {/* Architecture Diagram Image URL & Preview */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Architecture Diagram Image URL</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={formData.architectureImage || ""}
                  onChange={(e) => handleChange("architectureImage", e.target.value)}
                  placeholder="/images/project_collective.jpg or https://..."
                />
                {/* Fast presets */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.35rem",
                    marginTop: "0.35rem",
                  }}
                >
                  <span style={{ fontSize: "0.68rem", color: "#65676e", alignSelf: "center" }}>
                    Quick presets:
                  </span>
                  {[
                    "/images/project_analytics.jpg",
                    "/images/project_cloudwatch.jpg",
                    "/images/project_boltshift.jpg",
                    "/images/project_powersurge.jpg",
                    "/images/biometric_scan.png",
                    "/images/projects/showcase_trends.jpg",
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleChange("architectureImage", preset)}
                      style={{
                        fontSize: "0.65rem",
                        fontFamily: "monospace",
                        padding: "0.15rem 0.35rem",
                        backgroundColor: "#141518",
                        border: "1px solid #292b31",
                        borderRadius: "3px",
                        color: "#92949d",
                        cursor: "pointer",
                      }}
                    >
                      {preset.split("/").pop()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Architecture Diagram Caption */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Architecture Diagram Caption</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={formData.architectureCaption || ""}
                  onChange={(e) => handleChange("architectureCaption", e.target.value)}
                  placeholder="e.g. End-to-end distributed ingestion pipeline and dual-phase indexing topology"
                />
              </div>

              {/* Live Architecture Diagram Preview */}
              {formData.architectureImage && (
                <div>
                  <label className={styles.formLabel}>Live Architecture Diagram Preview</label>
                  <div className={styles.mediaPreviewContainer}>
                    <Image
                      src={formData.architectureImage}
                      alt="Architecture Diagram Preview"
                      fill
                      sizes="520px"
                      style={{ objectFit: "contain" }}
                      unoptimized
                    />
                  </div>
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Implementation Approach &amp; Trade-offs
                </label>
                <textarea
                  className={styles.textareaField}
                  rows={3}
                  value={formData.implementationApproach || formData.challenges || ""}
                  onChange={(e) => {
                    handleChange("implementationApproach", e.target.value);
                    handleChange("challenges", e.target.value);
                  }}
                  placeholder="Key engineering trade-offs, concurrency models, and consistency guarantees..."
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              5. PROJECT IMAGES & INTERFACE GALLERY
              ========================================================================= */}
          {activeSection === "gallery" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className={styles.sectionToggleBox}>
                <div className={styles.sectionToggleLabel}>
                  <span className={styles.sectionToggleTitle}>Include Project Images Section</span>
                  <span className={styles.sectionToggleDesc}>
                    Render screenshots, interface views, and design assets on the project description page.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={
                    sectionConfig.gallery ?? Boolean(formData.gallery && formData.gallery.length > 0)
                  }
                  onChange={() => toggleSection("gallery")}
                  style={{ width: 18, height: 18, accentColor: "#6366f1", cursor: "pointer" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <div>
                  <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#f2f2f0" }}>
                    Project Interface &amp; Visual Assets
                  </h4>
                  <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.78rem", color: "#92949d" }}>
                    Add high-resolution screenshots, dashboards, and UI flows.
                  </p>
                </div>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                  onClick={handleAddGalleryItem}
                >
                  <Plus size={14} />
                  <span>Add Project Image</span>
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {!formData.gallery || formData.gallery.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p className={styles.emptyStateText}>
                      No project images attached. Click &ldquo;Add Project Image&rdquo; above to attach screenshots.
                    </p>
                  </div>
                ) : (
                  formData.gallery.map((item, idx) => (
                    <div key={idx} className={styles.gallerySlideCard}>
                      <div className={styles.gallerySlideHeader}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span
                            style={{
                              fontSize: "0.78rem",
                              fontFamily: "monospace",
                              color: "#f2f2f0",
                              fontWeight: 600,
                            }}
                          >
                            Image #{idx + 1}
                          </span>
                          <span
                            style={{
                              fontSize: "0.68rem",
                              padding: "0.15rem 0.45rem",
                              borderRadius: "4px",
                              backgroundColor: "#141518",
                              border: "1px solid #292b31",
                              color: "#92949d",
                              textTransform: "uppercase",
                            }}
                          >
                            {item.type || "ui"}
                          </span>
                        </div>
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                          onClick={() => handleRemoveGalleryItem(idx)}
                          title="Remove this image"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className={styles.gallerySlideBody}>
                        {/* Image Preview Frame */}
                        <div>
                          <div className={styles.galleryPreviewFrame}>
                            {item.url ? (
                              <Image
                                src={item.url}
                                alt={item.title || `Visual ${idx + 1}`}
                                fill
                                sizes="200px"
                                style={{ objectFit: "cover" }}
                                unoptimized
                              />
                            ) : (
                              <div className={styles.galleryPlaceholder}>
                                <ImageIcon size={20} />
                                <span>No image URL</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Fields */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                          <div className={styles.fieldGrid}>
                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Title / Label</label>
                              <input
                                type="text"
                                className={styles.inputField}
                                value={item.title || ""}
                                placeholder="e.g. Telemetry Analytics Dashboard"
                                onChange={(e) =>
                                  handleUpdateGalleryItem(idx, "title", e.target.value)
                                }
                              />
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Type</label>
                              <select
                                className={styles.selectField}
                                value={item.type || "ui"}
                                onChange={(e) =>
                                  handleUpdateGalleryItem(idx, "type", e.target.value)
                                }
                              >
                                <option value="ui">UI Flow / Interface</option>
                                <option value="diagram">Architecture Diagram</option>
                                <option value="image">Showcase / Telemetry</option>
                              </select>
                            </div>
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Image URL</label>
                            <input
                              type="text"
                              className={styles.inputField}
                              value={item.url || ""}
                              placeholder="/images/project_analytics.jpg or https://..."
                              onChange={(e) => handleUpdateGalleryItem(idx, "url", e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Caption</label>
                            <input
                              type="text"
                              className={styles.inputField}
                              value={item.caption || ""}
                              placeholder="e.g. Sub-second queries across distributed indices"
                              onChange={(e) =>
                                handleUpdateGalleryItem(idx, "caption", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              6. KEY SKILLS LEARNED
              ========================================================================= */}
          {activeSection === "skills" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className={styles.sectionToggleBox}>
                <div className={styles.sectionToggleLabel}>
                  <span className={styles.sectionToggleTitle}>Include Key Skills Learned Section</span>
                  <span className={styles.sectionToggleDesc}>
                    Render &ldquo;Key Skills Learned&rdquo; takeaways on the project description page.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={
                    sectionConfig.keySkills ??
                    Boolean(formData.keySkillsLearned && formData.keySkillsLearned.length > 0)
                  }
                  onChange={() => toggleSection("keySkills")}
                  style={{ width: 18, height: 18, accentColor: "#6366f1", cursor: "pointer" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <div>
                  <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#f2f2f0" }}>
                    Key Engineering Skills &amp; Takeaways
                  </h4>
                  <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.78rem", color: "#92949d" }}>
                    The core architectural competencies and technical insights mastered through this project.
                  </p>
                </div>

                {formData.highlights && formData.highlights.length > 0 && (
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                    onClick={handleImportHighlights}
                    title="Import items from legacy highlights"
                  >
                    <span>Import Highlights</span>
                  </button>
                )}
              </div>

              {/* Add New Skill Input */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="e.g. Profiling high-contention memory locks with pprof and eBPF..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                />
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={handleAddSkill}
                >
                  <Plus size={14} />
                  <span>Add Skill</span>
                </button>
              </div>

              {/* Active Skills List */}
              <div className={styles.skillsManagerList}>
                {(!formData.keySkillsLearned || formData.keySkillsLearned.length === 0) ? (
                  <div className={styles.emptyState}>
                    <p className={styles.emptyStateText}>
                      No key skills added yet. Enter a learning above and click &ldquo;Add Skill&rdquo;.
                    </p>
                  </div>
                ) : (
                  formData.keySkillsLearned.map((skill, idx) => (
                    <div key={idx} className={styles.skillsManagerItem}>
                      <span className={styles.skillsManagerText}>
                        <span style={{ color: "#818cf8", marginRight: "0.5rem" }}>—</span>
                        {skill}
                      </span>
                      <button
                        type="button"
                        className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                        style={{ padding: "0.25rem 0.5rem" }}
                        onClick={() => handleRemoveSkill(idx)}
                        title="Remove skill"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              7. TECH STACK & TOOLS
              ========================================================================= */}
          {activeSection === "tech" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className={styles.sectionToggleBox}>
                <div className={styles.sectionToggleLabel}>
                  <span className={styles.sectionToggleTitle}>Include Tech Stack Section</span>
                  <span className={styles.sectionToggleDesc}>
                    Render technology badges on both the project description page and project catalog card.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={sectionConfig.techStack ?? true}
                  onChange={() => toggleSection("techStack")}
                  style={{ width: 18, height: 18, accentColor: "#6366f1", cursor: "pointer" }}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Technologies (Tag Pills)</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="e.g. Python, FastAPI, Go, Redis, Kubernetes..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    onClick={handleAddTag}
                  >
                    Add Tag
                  </button>
                </div>

                {/* Quick Add Suggestions */}
                <div style={{ marginTop: "0.75rem" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "#65676e",
                      display: "block",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Quick Add Suggestions:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {[
                      "Python",
                      "Go",
                      "TypeScript",
                      "Next.js",
                      "React",
                      "FastAPI",
                      "Kubernetes",
                      "Docker",
                      "Redis",
                      "PostgreSQL",
                      "PyTorch",
                      "Kafka",
                      "gRPC",
                      "vLLM",
                    ].map((tech) => {
                      const isAdded = (formData.tags || []).includes(tech);
                      return (
                        <button
                          key={tech}
                          type="button"
                          disabled={isAdded}
                          onClick={() => {
                            if (!isAdded) {
                              handleChange("tags", [...(formData.tags || []), tech]);
                            }
                          }}
                          style={{
                            fontSize: "0.7rem",
                            fontFamily: "var(--font-mono, monospace)",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px",
                            backgroundColor: isAdded ? "#141518" : "#191b20",
                            border: isAdded ? "1px solid #292b31" : "1px solid #3f424b",
                            color: isAdded ? "#65676e" : "#f2f2f0",
                            cursor: isAdded ? "default" : "pointer",
                          }}
                        >
                          {isAdded ? `✓ ${tech}` : `+ ${tech}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Tags */}
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginTop: "1rem" }}
                >
                  {(formData.tags || []).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "4px",
                        backgroundColor: "#101113",
                        border: "1px solid #292b31",
                        fontSize: "0.75rem",
                        color: "#f2f2f0",
                      }}
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#92949d",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              8. SEO METADATA
              ========================================================================= */}
          {activeSection === "seo" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>SEO Meta Title</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={formData.seoTitle || formData.title || ""}
                  onChange={(e) => handleChange("seoTitle", e.target.value)}
                  placeholder="e.g. Distributed LLM Serving Platform | Dilshan"
                />
                <span style={{ fontSize: "0.72rem", color: "#92949d", marginTop: "0.3rem" }}>
                  Browser tab title and search engine result headline.
                </span>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>SEO Meta Description</label>
                <textarea
                  className={styles.textareaField}
                  rows={3}
                  value={formData.seoDescription || formData.tagline || formData.description || ""}
                  onChange={(e) => handleChange("seoDescription", e.target.value)}
                  placeholder="Concise 150-160 character description for Google and social previews..."
                />
              </div>

              {/* Live SERP Snippet Preview */}
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#101113",
                  border: "1px solid #292b31",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: "#92949d",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Search Engine Snippet Preview
                </span>
                <span style={{ fontSize: "0.78rem", color: "#60a5fa" }}>
                  https://dilshan.dev/projects/{formData.slug || "project-slug"}
                </span>
                <span style={{ fontSize: "1.05rem", color: "#93c5fd", fontWeight: 600 }}>
                  {formData.seoTitle || formData.title || "Project Title"} — Dilshan
                </span>
                <span style={{ fontSize: "0.82rem", color: "#d1d5db", lineHeight: 1.5 }}>
                  {formData.seoDescription ||
                    formData.tagline ||
                    formData.description ||
                    "Project description snippet..."}
                </span>
              </div>
            </div>
          )}

          {/* =========================================================================
              9. VIDEO DEMONSTRATION
              ========================================================================= */}
          {activeSection === "video" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className={styles.fieldGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Video Demo URL (MP4 / WebM)</label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={formData.videoDemo?.videoUrl || ""}
                    onChange={(e) => handleNestedChange("videoDemo", "videoUrl", e.target.value)}
                    placeholder="https://res.cloudinary.com/.../demo.mp4"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Video Poster Image URL</label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={formData.videoDemo?.thumbnail || ""}
                    onChange={(e) => handleNestedChange("videoDemo", "thumbnail", e.target.value)}
                    placeholder="/images/skyline_twilight.jpg"
                  />
                </div>
              </div>

              {formData.videoDemo?.thumbnail && (
                <div>
                  <label className={styles.formLabel}>Live Poster Preview</label>
                  <div className={styles.mediaPreviewContainer}>
                    <Image
                      src={formData.videoDemo.thumbnail}
                      alt="Video Poster Preview"
                      fill
                      sizes="520px"
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={styles.modalFooter}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnGhost}`}
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? (
              <span className={styles.spinner} style={{ width: 14, height: 14 }} />
            ) : (
              <Save size={14} />
            )}
            <span>{saving ? "Saving to Store..." : "Save Project Details"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
