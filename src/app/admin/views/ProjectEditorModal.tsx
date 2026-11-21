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
} from "lucide-react";
import styles from "../admin.module.css";
import { Project, ProjectCategory, ProjectStatus, getProjectThumbnail } from "@/data/projects";

interface ProjectEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSave: (project: Project) => Promise<void>;
}

type EditorSection =
  | "basic"
  | "cover"
  | "gallery"
  | "video"
  | "caseStudy"
  | "tech"
  | "links"
  | "seo";

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  isOpen,
  onClose,
  project,
  onSave,
}) => {
  const [activeSection, setActiveSection] = useState<EditorSection>("basic");
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initialize or reset form
  useEffect(() => {
    if (project) {
      setFormData({ ...project });
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
        image: "/images/project_collective.jpg",
        tags: ["Go", "Distributed Systems", "Kubernetes"],
        githubUrl: "https://github.com/dilshandevxx",
        demoUrl: "",
        writeupUrl: "",
        stars: 0,
        metrics: "",
        metricsDetail: [],
        stackLayers: [],
        architecture: "",
        challenges: "",
        problemStatement: "",
        realWorldSignificance: "",
        proposedSolution: "",
        implementationApproach: "",
        gallery: [],
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

  const resolvedCover = getProjectThumbnail(formData.slug || "", formData.image);
  const galleryItems = formData.gallery || [];
  const videoPoster = formData.videoDemo?.thumbnail;
  const totalVisualAssetsCount = (resolvedCover ? 1 : 0) + galleryItems.length + (videoPoster ? 1 : 0);

  const handleChange = (field: keyof Project, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    handleChange("tags", currentTags.filter((t) => t !== tagToRemove));
  };

  // Gallery item additions
  const handleAddGalleryItem = () => {
    const currentGallery = formData.gallery || [];
    handleChange("gallery", [
      ...currentGallery,
      {
        title: "Architecture Diagram",
        caption: "System Architecture & Flow Diagram",
        url: "/images/project_collective.jpg",
        type: "diagram",
      },
    ]);
  };

  const handleRemoveGalleryItem = (index: number) => {
    const currentGallery = formData.gallery || [];
    handleChange("gallery", currentGallery.filter((_, idx) => idx !== index));
  };

  const handleUpdateGalleryItem = (index: number, field: string, value: any) => {
    const currentGallery = [...(formData.gallery || [])];
    currentGallery[index] = { ...currentGallery[index], [field]: value };
    handleChange("gallery", currentGallery);
  };

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
      await onSave(formData as Project);
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
                /{formData.slug}
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

        {/* Section Navigation Tabs (8 Clear Sections) */}
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
            { id: "basic", label: "1. Basic Info" },
            { id: "cover", label: "2. Cover Image" },
            { id: "gallery", label: "3. Gallery" },
            { id: "video", label: "4. Video Demo" },
            { id: "caseStudy", label: "5. Case Study" },
            { id: "tech", label: "6. Tech & Tools" },
            { id: "links", label: "7. Links & Metrics" },
            { id: "seo", label: "8. SEO Metadata" },
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

        {/* Error notice if any */}
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
                <span>Currently Attached Media ({totalVisualAssetsCount})</span>
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
                <span>Add Inside Image</span>
              </button>
            </div>

            <div className={styles.attachedMediaGrid}>
              {/* Cover Thumbnail */}
              <div
                className={styles.attachedMediaItem}
                onClick={() => setActiveSection("cover")}
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
                <span className={styles.attachedMediaItemType}>Cover Thumbnail</span>
                <span className={styles.attachedMediaItemCaption}>
                  {formData.image ? "Custom Cover" : "Default Fallback"}
                </span>
              </div>

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
                  <span className={styles.attachedMediaItemType}>
                    Inside Slide #{idx + 1}
                  </span>
                  <span className={styles.attachedMediaItemCaption}>
                    {item.title || item.type || "Diagram"}
                  </span>
                </div>
              ))}

              {/* Video Poster if any */}
              {videoPoster && (
                <div
                  className={styles.attachedMediaItem}
                  onClick={() => setActiveSection("video")}
                  title="Click to edit Video Poster"
                >
                  <div className={styles.attachedMediaItemThumb}>
                    <Image
                      src={videoPoster}
                      alt="Video Poster"
                      fill
                      sizes="140px"
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                  <span className={styles.attachedMediaItemType}>Video Poster</span>
                  <span className={styles.attachedMediaItemCaption}>
                    {formData.videoDemo?.title || "Demo Poster"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 1. Basic Information */}
          {activeSection === "basic" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className={styles.fieldGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Project Title *</label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={formData.title || ""}
                    onChange={(e) => {
                      handleChange("title", e.target.value);
                      if (!project && !formData.slug) {
                        handleChange(
                          "slug",
                          e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
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
                    <option value="Existing">Published (Existing)</option>
                    <option value="Planned">Draft (Planned)</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Release Date / Year</label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={formData.date || ""}
                    onChange={(e) => handleChange("date", e.target.value)}
                    placeholder="e.g. 2026"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Tagline / One-Line Elevator Pitch</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={formData.tagline || ""}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                  placeholder="e.g. Low-latency vLLM & PagedAttention model serving runtime"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Overview Summary</label>
                <textarea
                  className={styles.textareaField}
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Concise technical overview displayed on cards..."
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={Boolean(formData.featured)}
                  onChange={(e) => handleChange("featured", e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: "#6366f1" }}
                />
                <label htmlFor="featuredToggle" style={{ fontSize: "0.84rem", color: "#f2f2f0", cursor: "pointer" }}>
                  Mark as Featured Project on Homepage
                </label>
              </div>
            </div>
          )}

          {/* 2. Cover Image */}
          {activeSection === "cover" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Cover Image URL (Cloudinary / Local Path)</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={formData.image || ""}
                  onChange={(e) => handleChange("image", e.target.value)}
                  placeholder="/images/project_collective.jpg or https://res.cloudinary.com/..."
                />
                <span style={{ fontSize: "0.72rem", color: "#92949d" }}>
                  Used as the main thumbnail on catalog cards, homepage showcase, and social share cards.
                </span>
              </div>

              <div>
                <label className={styles.formLabel}>
                  {formData.image ? "Live Cover Image Preview (Custom URL)" : "System Default Thumbnail (Active Fallback)"}
                </label>
                <div className={styles.mediaPreviewContainer}>
                  <Image
                    src={resolvedCover}
                    alt="Project Cover Preview"
                    fill
                    sizes="520px"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>
                {!formData.image && (
                  <span style={{ fontSize: "0.72rem", color: "#65676e", marginTop: "0.4rem", display: "block" }}>
                    Currently rendering default system thumbnail ({resolvedCover}). Enter a custom URL above to override.
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 3. Project Gallery (Project Details Inside Images) */}
          {activeSection === "gallery" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#f2f2f0" }}>Project Details Page Inside Images</h4>
                  <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.78rem", color: "#92949d" }}>
                    Add high-resolution screenshots, architecture diagrams, telemetry dashboards, and UI workflows shown inside the project details page.
                  </p>
                </div>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                  onClick={handleAddGalleryItem}
                >
                  <Plus size={14} />
                  <span>Add Inside Image</span>
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {(!formData.gallery || formData.gallery.length === 0) ? (
                  <div className={styles.emptyState}>
                    <p className={styles.emptyStateText}>No inside images configured. Click &ldquo;Add Inside Image&rdquo; above to attach architecture diagrams or UI screenshots.</p>
                  </div>
                ) : (
                  formData.gallery.map((item, idx) => (
                    <div key={idx} className={styles.gallerySlideCard}>
                      <div className={styles.gallerySlideHeader}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ fontSize: "0.78rem", fontFamily: "monospace", color: "#f2f2f0", fontWeight: 600 }}>
                            Inside Image #{idx + 1}
                          </span>
                          <span style={{ fontSize: "0.68rem", padding: "0.15rem 0.45rem", borderRadius: "4px", backgroundColor: "#141518", border: "1px solid #292b31", color: "#92949d", textTransform: "uppercase" }}>
                            {item.type || "diagram"}
                          </span>
                        </div>
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                          onClick={() => handleRemoveGalleryItem(idx)}
                          title="Remove this inside image"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className={styles.gallerySlideBody}>
                        {/* Live Image Preview Frame */}
                        <div>
                          <div className={styles.galleryPreviewFrame}>
                            {item.url ? (
                              <Image
                                src={item.url}
                                alt={item.title || `Inside Slide ${idx + 1}`}
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
                          <span style={{ fontSize: "0.68rem", color: "#65676e", marginTop: "0.35rem", display: "block" }}>
                            Live preview of inside image
                          </span>
                        </div>

                        {/* Slide Configuration Fields */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                          <div className={styles.fieldGrid}>
                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Image Title / Label</label>
                              <input
                                type="text"
                                className={styles.inputField}
                                value={item.title || ""}
                                placeholder="e.g. Ingestion Pipeline Architecture"
                                onChange={(e) => handleUpdateGalleryItem(idx, "title", e.target.value)}
                              />
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Visual Type</label>
                              <select
                                className={styles.selectField}
                                value={item.type || "diagram"}
                                onChange={(e) => handleUpdateGalleryItem(idx, "type", e.target.value)}
                              >
                                <option value="diagram">Architecture Diagram</option>
                                <option value="ui">UI Flow / Screenshot</option>
                                <option value="image">Telemetry / Overview Image</option>
                              </select>
                            </div>
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Image URL (Local Path or Cloudinary)</label>
                            <input
                              type="text"
                              className={styles.inputField}
                              value={item.url || ""}
                              placeholder="/images/project_analytics.jpg or https://res.cloudinary.com/..."
                              onChange={(e) => handleUpdateGalleryItem(idx, "url", e.target.value)}
                            />
                            {/* Fast Presets */}
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.35rem" }}>
                              <span style={{ fontSize: "0.68rem", color: "#65676e", alignSelf: "center" }}>Quick pick:</span>
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
                                  onClick={() => handleUpdateGalleryItem(idx, "url", preset)}
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

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Caption / Explanation</label>
                            <input
                              type="text"
                              className={styles.inputField}
                              value={item.caption || ""}
                              placeholder="e.g. Asynchronous tokenization and vector embedding pipeline"
                              onChange={(e) => handleUpdateGalleryItem(idx, "caption", e.target.value)}
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

          {/* 4. Project Video Demo */}
          {activeSection === "video" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className={styles.fieldGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Video URL (Cloudinary / MP4)</label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={formData.videoDemo?.videoUrl || ""}
                    onChange={(e) => handleNestedChange("videoDemo", "videoUrl", e.target.value)}
                    placeholder="https://res.cloudinary.com/.../demo.mp4"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Poster Frame URL</label>
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
                  <label className={styles.formLabel}>Live Poster Frame Preview</label>
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

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Video Description</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={formData.videoDemo?.description || ""}
                  onChange={(e) => handleNestedChange("videoDemo", "description", e.target.value)}
                  placeholder="e.g. End-to-end benchmark latency test"
                />
              </div>

              {formData.videoDemo?.videoUrl && (
                <div>
                  <label className={styles.formLabel}>Live Video Demo Player Preview</label>
                  <div className={styles.mediaPreviewContainer}>
                    <video
                      className={styles.videoPreviewFrame}
                      src={formData.videoDemo.videoUrl}
                      poster={formData.videoDemo.thumbnail}
                      controls
                      muted
                      loop
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5. Description and Case Study */}
          {activeSection === "caseStudy" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Problem Statement</label>
                <textarea
                  className={styles.textareaField}
                  rows={3}
                  value={formData.problemStatement || ""}
                  onChange={(e) => handleChange("problemStatement", e.target.value)}
                  placeholder="What production bottleneck or latency constraint motivated this system?"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Proposed Solution</label>
                <textarea
                  className={styles.textareaField}
                  rows={3}
                  value={formData.proposedSolution || ""}
                  onChange={(e) => handleChange("proposedSolution", e.target.value)}
                  placeholder="Architectural thesis and core technical approach..."
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Architecture Narrative</label>
                <textarea
                  className={styles.textareaField}
                  rows={4}
                  value={formData.architecture || ""}
                  onChange={(e) => handleChange("architecture", e.target.value)}
                  placeholder="Detailed breakdown of data flow, caching layers, and throughput handling..."
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Engineering Challenges & Trade-offs</label>
                <textarea
                  className={styles.textareaField}
                  rows={4}
                  value={formData.challenges || ""}
                  onChange={(e) => handleChange("challenges", e.target.value)}
                  placeholder="Key technical hurdles encountered during production implementation..."
                />
              </div>
            </div>
          )}

          {/* 6. Technologies and Tools */}
          {activeSection === "tech" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Tech Stack (Displayed on Project Card)</label>
                <span style={{ fontSize: "0.75rem", color: "#92949d", marginBottom: "0.5rem" }}>
                  These tags appear directly on the project card on <code>/projects</code> in the clean monospace badge style.
                </span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="e.g. Python, FastAPI, LangChain, React..."
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
                  <span style={{ fontSize: "0.72rem", color: "#65676e", display: "block", marginBottom: "0.35rem" }}>
                    Quick Add Technologies:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {[
                      "Python",
                      "FastAPI",
                      "LangChain",
                      "React",
                      "Next.js",
                      "TypeScript",
                      "Node.js",
                      "Go",
                      "Docker",
                      "Kubernetes",
                      "PostgreSQL",
                      "Tailwind CSS",
                      "PyTorch",
                      "Redis",
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
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {isAdded ? `✓ ${tech}` : `+ ${tech}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginTop: "1rem" }}>
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

          {/* 7. Project Links & Metrics */}
          {activeSection === "links" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className={styles.fieldGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>GitHub Repository URL</label>
                  <input
                    type="url"
                    className={styles.inputField}
                    value={formData.githubUrl || ""}
                    onChange={(e) => handleChange("githubUrl", e.target.value)}
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Live Demo URL (Optional)</label>
                  <input
                    type="url"
                    className={styles.inputField}
                    value={formData.demoUrl || ""}
                    onChange={(e) => handleChange("demoUrl", e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Technical Writeup / Paper URL</label>
                  <input
                    type="url"
                    className={styles.inputField}
                    value={formData.writeupUrl || ""}
                    onChange={(e) => handleChange("writeupUrl", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Primary Metric (e.g. 100k req/s, 14ms TTFT)</label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={formData.metrics || ""}
                    onChange={(e) => handleChange("metrics", e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>GitHub Stars Count</label>
                  <input
                    type="number"
                    className={styles.inputField}
                    value={formData.stars || 0}
                    onChange={(e) => handleChange("stars", parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 8. SEO Metadata */}
          {activeSection === "seo" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Meta Title (Browser tab & search results)</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={formData.title ? `${formData.title} | Dilshan` : ""}
                  readOnly
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Meta Description</label>
                <textarea
                  className={styles.textareaField}
                  rows={3}
                  value={formData.tagline || ""}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                  placeholder="Concise 150-160 character description for search engines..."
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Social Share (Open Graph) Image URL</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={formData.image || ""}
                  onChange={(e) => handleChange("image", e.target.value)}
                />
              </div>
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
            <span>{saving ? "Saving to Store..." : "Save Project"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
