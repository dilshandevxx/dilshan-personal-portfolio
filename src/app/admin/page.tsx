"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  projectsList as initialProjects,
  Project,
  ProjectCategory,
  ProjectStatus,
  getProjectThumbnail,
  FALLBACK_THUMBNAILS,
} from "@/data/projects";
import {
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Lock,
  Unlock,
  Search,
  Check,
  Copy,
  ArrowLeft,
  X,
  Sparkles,
  Eye,
  CheckCircle2,
  FileCode2,
  Layers,
  Globe,
} from "lucide-react";
import styles from "./admin.module.css";

const CATEGORIES: ProjectCategory[] = [
  "AI/ML",
  "DevOps",
  "Systems",
  "Full-Stack",
  "Landing",
  "Others",
];

const PRESET_IMAGES = [
  { label: "Collective", url: "/images/project_collective.jpg" },
  { label: "Brutalist", url: "/images/project_brutalist.jpg" },
  { label: "Analytics", url: "/images/project_analytics.jpg" },
  { label: "Cloudwatch", url: "/images/project_cloudwatch.jpg" },
  { label: "Euphoria", url: "/images/project_euphoria.jpg" },
  { label: "Boltshift", url: "/images/project_boltshift.jpg" },
  { label: "Powersurge", url: "/images/project_powersurge.jpg" },
  { label: "Warpspeed", url: "/images/project_warpspeed.jpg" },
  { label: "Travel", url: "/images/story_travel.jpg" },
  { label: "Twilight", url: "/images/skyline_twilight.jpg" },
];

const DEFAULT_PASSKEY = "Dilshan775944600";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passkeyInput, setPasskeyInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [viewMode, setViewMode] = useState<"directory" | "editor">("directory");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");

  // Comprehensive Form State
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState<ProjectCategory>("AI/ML");
  const [formStatus, setFormStatus] = useState<ProjectStatus>("Existing");
  const [formFeatured, setFormFeatured] = useState<boolean>(false);
  const [formDate, setFormDate] = useState<string>("2026");
  const [formImage, setFormImage] = useState<string>("");
  const [formTagline, setFormTagline] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLongDescription, setFormLongDescription] = useState("");
  const [formDemoUrl, setFormDemoUrl] = useState("");
  const [formGithubUrl, setFormGithubUrl] = useState("");
  const [formWriteupUrl, setFormWriteupUrl] = useState("");
  const [formArchitecture, setFormArchitecture] = useState("");
  const [formChallenges, setFormChallenges] = useState("");
  const [formHighlightsText, setFormHighlightsText] = useState("");
  const [formTagsText, setFormTagsText] = useState("");
  const [formMetrics, setFormMetrics] = useState("");

  // Check auth from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("dilshan_admin_auth");
    if (stored === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === DEFAULT_PASSKEY) {
      setIsAuthenticated(true);
      localStorage.setItem("dilshan_admin_auth", "authenticated");
      setAuthError("");
    } else {
      setAuthError("Incorrect passkey. Please check credentials.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("dilshan_admin_auth");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4500);
  };

  // Filtered projects for directory list
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)));

      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "All" || p.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, searchQuery, selectedCategory, selectedStatus]);

  // Open Full-Width Editor for Create
  const handleOpenCreate = () => {
    setEditingSlug(null);
    setFormTitle("");
    setFormSlug("");
    setFormCategory("AI/ML");
    setFormStatus("Existing");
    setFormFeatured(false);
    setFormDate("2026");
    setFormImage("/images/project_collective.jpg");
    setFormTagline("");
    setFormDescription("");
    setFormLongDescription("");
    setFormDemoUrl("");
    setFormGithubUrl("https://github.com/dilshandevxx/");
    setFormWriteupUrl("");
    setFormArchitecture("");
    setFormChallenges("");
    setFormHighlightsText("");
    setFormTagsText("TypeScript, Next.js, Go, Docker");
    setFormMetrics("");
    setViewMode("editor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Open Full-Width Editor for Edit
  const handleOpenEdit = (project: Project) => {
    setEditingSlug(project.slug);
    setFormTitle(project.title);
    setFormSlug(project.slug);
    setFormCategory(project.category);
    setFormStatus(project.status || "Existing");
    setFormFeatured(Boolean(project.featured));
    setFormDate(project.date || "2026");
    setFormImage(project.image || "");
    setFormTagline(project.tagline || "");
    setFormDescription(project.description || "");
    setFormLongDescription(project.longDescription || project.description || "");
    setFormDemoUrl(project.demoUrl || "");
    setFormGithubUrl(project.githubUrl || "");
    setFormWriteupUrl(project.writeupUrl || "");
    setFormArchitecture(project.architecture || "");
    setFormChallenges(project.challenges || "");
    setFormHighlightsText((project.highlights || []).join("\n"));
    setFormTagsText((project.tags || []).join(", "));
    setFormMetrics(project.metrics || "");
    setViewMode("editor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Duplicate a project as a new template
  const handleDuplicate = (project: Project) => {
    setEditingSlug(null);
    setFormTitle(`${project.title} (Copy)`);
    setFormSlug(`${project.slug}-copy`);
    setFormCategory(project.category);
    setFormStatus("Planned");
    setFormFeatured(false);
    setFormDate(new Date().getFullYear().toString());
    setFormImage(project.image || "");
    setFormTagline(project.tagline);
    setFormDescription(project.description);
    setFormLongDescription(project.longDescription || project.description);
    setFormDemoUrl(project.demoUrl || "");
    setFormGithubUrl(project.githubUrl || "");
    setFormWriteupUrl(project.writeupUrl || "");
    setFormArchitecture(project.architecture || "");
    setFormChallenges(project.challenges || "");
    setFormHighlightsText((project.highlights || []).join("\n"));
    setFormTagsText((project.tags || []).join(", "));
    setFormMetrics(project.metrics || "");
    setViewMode("editor");
    showToast(`Created draft from "${project.title}"`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Auto-generate slug when title changes (if creating new)
  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingSlug) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setFormSlug(generated);
    }
  };

  // Quick toggle status between Existing (Live) and Planned
  const handleToggleStatus = async (slug: string) => {
    const updated = projects.map((p) => {
      if (p.slug === slug) {
        return {
          ...p,
          status: (p.status === "Existing" ? "Planned" : "Existing") as ProjectStatus,
        };
      }
      return p;
    });
    setProjects(updated);

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_status", slug }),
      });
      const data = await res.json();
      showToast(
        data.savedLocally
          ? "Status toggled & saved to projects.ts"
          : "Status updated in session"
      );
    } catch {
      showToast("Updated locally in browser state");
    }
  };

  // Delete project
  const handleDelete = async (slug: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently remove "${title}"?`))
      return;

    const updated = projects.filter((p) => p.slug !== slug);
    setProjects(updated);

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", slug }),
      });
      const data = await res.json();
      showToast(
        data.savedLocally
          ? "Project removed from projects.ts"
          : "Project deleted from list"
      );
    } catch {
      showToast("Removed from current browser state");
    }
  };

  // Save Project Form
  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      alert("Please provide a Project Title.");
      return;
    }

    const finalSlug =
      formSlug.trim() ||
      formTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const highlights = formHighlightsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const tags = formTagsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const projectData: Project = {
      slug: finalSlug,
      title: formTitle.trim(),
      date: formDate.trim() || "2026",
      category: formCategory,
      tagline: formTagline.trim(),
      description: formDescription.trim(),
      longDescription: formLongDescription.trim() || formDescription.trim(),
      highlights,
      architecture: formArchitecture.trim(),
      challenges: formChallenges.trim(),
      tags,
      stars: 0,
      featured: formFeatured,
      githubUrl: formGithubUrl.trim(),
      demoUrl: formDemoUrl.trim() || undefined,
      writeupUrl: formWriteupUrl.trim() || undefined,
      metrics: formMetrics.trim() || undefined,
      metricsDetail: [],
      stackLayers: [],
      image: formImage.trim() || undefined,
      status: formStatus,
    };

    let updatedList = [...projects];
    const existingIndex = updatedList.findIndex(
      (p) => p.slug === finalSlug || (editingSlug && p.slug === editingSlug)
    );

    if (existingIndex >= 0) {
      updatedList[existingIndex] = {
        ...updatedList[existingIndex],
        ...projectData,
      };
    } else {
      updatedList.unshift(projectData);
    }

    setProjects(updatedList);
    setViewMode("directory");

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", project: projectData }),
      });
      const data = await res.json();
      showToast(
        data.savedLocally
          ? `✓ "${projectData.title}" saved directly to projects.ts`
          : `✓ "${projectData.title}" updated successfully`
      );
    } catch {
      showToast(`✓ "${projectData.title}" updated in local memory`);
    }
  };

  // Copy TypeScript code
  const handleCopyTsCode = () => {
    const code = `export const projectsList: Project[] = ${JSON.stringify(
      projects,
      null,
      2
    )};`;
    navigator.clipboard.writeText(code);
    showToast("TypeScript projects list copied to clipboard!");
  };

  // -------------------------------------------------------------
  // AUTHENTICATION VIEW
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <main className={styles.adminRoot}>
        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            <div className={styles.authBadge}>
              <Lock size={22} />
            </div>
            <h1 className={styles.authTitle}>Project Studio Admin</h1>
            <p className={styles.authSubtitle}>
              Enter your master passkey to manage, customize, and publish architectural projects.
            </p>

            <form onSubmit={handleLogin} className={styles.authForm}>
              <div>
                <input
                  type="password"
                  placeholder="Enter Master Passkey"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  autoFocus
                  className={styles.authInput}
                  aria-label="Admin passkey"
                />
                {authError && <div className={styles.authError}>{authError}</div>}
              </div>

              <button type="submit" className={styles.authSubmitBtn}>
                <Unlock size={16} />
                <span>Unlock Control Center</span>
              </button>
            </form>

            <Link href="/" className={styles.authBackLink}>
              &larr; Return to Main Landing Page
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Live count calculations
  const liveCount = projects.filter((p) => p.status === "Existing").length;
  const plannedCount = projects.filter((p) => p.status === "Planned").length;

  // Active preview image src
  const activePreviewImage = formImage.trim() || "/images/project_collective.jpg";

  return (
    <main className={styles.adminRoot}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className={styles.toastNotification} role="status">
          <CheckCircle2 size={16} color="#4ade80" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TOP STICKY BAR                                                */}
      {/* ------------------------------------------------------------- */}
      <header className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.brandArea}>
            <div className={styles.brandPill}>
              <span className={styles.brandDot} aria-hidden="true" />
              <span>Studio Console</span>
            </div>

            <div className={styles.statsCluster}>
              <span className={styles.statBadge}>
                Total: <strong className={styles.statHighlight}>{projects.length}</strong>
              </span>
              <span>&bull;</span>
              <span className={styles.statBadge}>
                Live: <strong style={{ color: "#4ade80" }}>{liveCount}</strong>
              </span>
              <span>&bull;</span>
              <span className={styles.statBadge}>
                Planned: <strong style={{ color: "#facc15" }}>{plannedCount}</strong>
              </span>
            </div>
          </div>

          <div className={styles.topActions}>
            {viewMode === "directory" ? (
              <button
                type="button"
                onClick={handleOpenCreate}
                className={styles.primaryBtn}
              >
                <Plus size={15} />
                <span>New Project</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setViewMode("directory")}
                className={styles.secondaryBtn}
              >
                <ArrowLeft size={14} />
                <span>Directory</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopyTsCode}
              className={styles.secondaryBtn}
              title="Copy TypeScript array"
            >
              <Copy size={13} />
              <span>Copy TS</span>
            </button>

            <Link href="/projects" className={styles.secondaryBtn}>
              <Eye size={13} />
              <span>View Site</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className={styles.secondaryBtn}
              title="Log out of admin"
            >
              <Lock size={13} />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTAINER                                                */}
      {/* ------------------------------------------------------------- */}
      <div className={styles.mainContainer}>
        {viewMode === "directory" ? (
          /* ========================================================== */
          /* MODE A: DIRECTORY LISTING                                   */
          /* ========================================================== */
          <div>
            <div className={styles.directoryControls}>
              {/* Search Bar */}
              <div className={styles.searchBar}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={`Search ${projects.length} projects by title, slug, stack, or tagline...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  aria-label="Search projects"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className={styles.clearSearchBtn}
                    aria-label="Clear search query"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className={styles.filterPillsRow}>
                {["All", ...CATEGORIES].map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`${styles.filterPill} ${
                        isActive ? styles.filterPillActive : ""
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}

                <span style={{ color: "#475569", margin: "0 0.25rem" }}>|</span>

                {/* Status Filter */}
                {[
                  { id: "All", label: "All Status" },
                  { id: "Existing", label: "Live Production" },
                  { id: "Planned", label: "Planned / RFC" },
                ].map((st) => {
                  const isActive = selectedStatus === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedStatus(st.id)}
                      className={`${styles.filterPill} ${
                        isActive ? styles.filterPillActive : ""
                      }`}
                    >
                      {st.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Projects Grid */}
            <div className={styles.projectGrid}>
              {filteredProjects.map((p, idx) => {
                const thumb = getProjectThumbnail(p.slug, p.image, idx);
                const isLive = p.status === "Existing";

                return (
                  <article key={p.slug} className={styles.adminProjectCard}>
                    {/* Thumbnail with overlay badges */}
                    <div className={styles.cardThumbFrame}>
                      <Image
                        src={thumb}
                        alt={p.title}
                        fill
                        unoptimized={thumb.startsWith("http")}
                        className={styles.cardThumbImage}
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                      <div className={styles.cardOverlayBadges}>
                        <span className={styles.badgeCategory}>{p.category}</span>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(p.slug)}
                          className={`${styles.statusToggleBtn} ${
                            isLive ? styles.statusLive : styles.statusPlanned
                          }`}
                          title="Click to toggle Live vs Planned status"
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              backgroundColor: isLive ? "#4ade80" : "#facc15",
                            }}
                          />
                          <span>{isLive ? "Live" : "Planned"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className={styles.cardContent}>
                      <h2 className={styles.cardTitle}>{p.title}</h2>
                      <p className={styles.cardTagline}>
                        {p.tagline || p.description}
                      </p>

                      {/* Tech Tags */}
                      <div className={styles.cardTagsRow}>
                        {(p.tags || []).slice(0, 4).map((t) => (
                          <span key={t} className={styles.techTag}>
                            {t}
                          </span>
                        ))}
                        {(p.tags || []).length > 4 && (
                          <span className={styles.techTag}>
                            +{(p.tags || []).length - 4}
                          </span>
                        )}
                      </div>

                      {/* Card Footer Actions */}
                      <div className={styles.cardFooterActions}>
                        <div className={styles.actionBtnGroup}>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            className={styles.iconActionBtn}
                            title="Edit this project"
                            aria-label={`Edit ${p.title}`}
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicate(p)}
                            className={styles.iconActionBtn}
                            title="Duplicate as new template"
                            aria-label={`Duplicate ${p.title}`}
                          >
                            <Copy size={14} />
                          </button>
                          <Link
                            href={`/projects/${p.slug}`}
                            target="_blank"
                            className={styles.iconActionBtn}
                            title="View public detail page"
                            aria-label={`View public page for ${p.title}`}
                          >
                            <ExternalLink size={14} />
                          </Link>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDelete(p.slug, p.title)}
                          className={`${styles.iconActionBtn} ${styles.deleteBtn}`}
                          title="Delete project"
                          aria-label={`Delete ${p.title}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          /* ========================================================== */
          /* MODE B: FULL-WIDTH STUDIO CUSTOMIZER & EDITOR              */
          /* ========================================================== */
          <div className={styles.editorContainer}>
            {/* Editor Action Header */}
            <div className={styles.editorHeader}>
              <div className={styles.editorTitleGroup}>
                <button
                  type="button"
                  onClick={() => setViewMode("directory")}
                  className={styles.editorBackBtn}
                >
                  <ArrowLeft size={14} />
                  <span>Return to Directory</span>
                </button>
                <h1 className={styles.editorHeading}>
                  {editingSlug ? `Editing: ${formTitle}` : "New Project Customizer"}
                </h1>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setViewMode("directory")}
                  className={styles.secondaryBtn}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveForm}
                  className={styles.primaryBtn}
                >
                  <Check size={15} />
                  <span>Save &amp; Deploy Project</span>
                </button>
              </div>
            </div>

            {/* Split Layout: Form on Left, Live Card Preview on Right */}
            <div className={styles.editorLayout}>
              {/* Form Column */}
              <form onSubmit={handleSaveForm} className={styles.formColumn}>
                {/* 1. Identity & Card Visuals */}
                <div className={styles.formCard}>
                  <h3 className={styles.formCardTitle}>
                    <Layers size={15} />
                    <span>01 // Project Card Identity &amp; Image URL</span>
                  </h3>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Project Title *</label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Distributed Key-Value Store"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>URL Slug *</label>
                      <input
                        type="text"
                        required
                        value={formSlug}
                        onChange={(e) => setFormSlug(e.target.value)}
                        placeholder="e.g. distributed-kv-store"
                        className={styles.formInput}
                      />
                      <span className={styles.formHint}>
                        Accessible at /projects/{formSlug || "your-slug"}
                      </span>
                    </div>
                  </div>

                  {/* Image URL input with instant preview */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Project Card Image URL (supports any web URL or local path)
                    </label>
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="https://images.unsplash.com/... or /images/project_collective.jpg"
                      className={styles.formInput}
                    />
                    <span className={styles.formHint}>
                      Enter any external image URL (e.g. Unsplash, Cloudinary, AWS S3) or choose a preset below.
                    </span>

                    {/* Presets Row */}
                    <div className={styles.presetPillsRow}>
                      <span style={{ fontSize: "0.72rem", color: "#64748b", alignSelf: "center" }}>
                        Presets:
                      </span>
                      {PRESET_IMAGES.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setFormImage(preset.url)}
                          className={styles.presetPill}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Category</label>
                      <select
                        value={formCategory}
                        onChange={(e) =>
                          setFormCategory(e.target.value as ProjectCategory)
                        }
                        className={styles.formSelect}
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Status</label>
                      <select
                        value={formStatus}
                        onChange={(e) =>
                          setFormStatus(e.target.value as ProjectStatus)
                        }
                        className={styles.formSelect}
                      >
                        <option value="Existing">Live Production Service</option>
                        <option value="Planned">Planned / RFC Roadmap</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Release Year</label>
                      <input
                        type="text"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        placeholder="2026"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={formFeatured}
                          onChange={(e) => setFormFeatured(e.target.checked)}
                          className={styles.checkboxInput}
                        />
                        <span>Feature this project with badge</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* 2. Descriptions */}
                <div className={styles.formCard}>
                  <h3 className={styles.formCardTitle}>
                    <FileCode2 size={15} />
                    <span>02 // Card Tagline &amp; Page Overview</span>
                  </h3>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Card Tagline *</label>
                    <input
                      type="text"
                      required
                      value={formTagline}
                      onChange={(e) => setFormTagline(e.target.value)}
                      placeholder="One-line punchy subtitle shown directly on the project card"
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Short Summary Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="1-2 sentences summarizing the core problem and technical resolution"
                      className={styles.formTextarea}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Full Architectural Overview (for /projects/[slug])
                    </label>
                    <textarea
                      rows={5}
                      value={formLongDescription}
                      onChange={(e) => setFormLongDescription(e.target.value)}
                      placeholder="In-depth technical narrative detailing the service topology, motivation, and system architecture..."
                      className={styles.formTextarea}
                    />
                  </div>
                </div>

                {/* 3. Live Deployment & Repository Links */}
                <div className={styles.formCard}>
                  <h3 className={styles.formCardTitle}>
                    <Globe size={15} />
                    <span>03 // Live Deployment &amp; Repository URLs</span>
                  </h3>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Live Deployment / Demo URL
                      </label>
                      <input
                        type="url"
                        value={formDemoUrl}
                        onChange={(e) => setFormDemoUrl(e.target.value)}
                        placeholder="https://demo.dilshan.dev"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        GitHub Repository URL *
                      </label>
                      <input
                        type="url"
                        required
                        value={formGithubUrl}
                        onChange={(e) => setFormGithubUrl(e.target.value)}
                        placeholder="https://github.com/dilshandevxx/..."
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Technical Case Study / Article URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={formWriteupUrl}
                      onChange={(e) => setFormWriteupUrl(e.target.value)}
                      placeholder="/portfolio/blog/zero-dependency-web-design"
                      className={styles.formInput}
                    />
                  </div>
                </div>

                {/* 4. Engineering Deep Dive & Highlights */}
                <div className={styles.formCard}>
                  <h3 className={styles.formCardTitle}>
                    <Sparkles size={15} />
                    <span>04 // Engineering Deep Dive &amp; Highlights</span>
                  </h3>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Technology Stack Tags (comma-separated) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formTagsText}
                      onChange={(e) => setFormTagsText(e.target.value)}
                      placeholder="Go, TypeScript, Next.js, Kafka, PostgreSQL, Docker"
                      className={styles.formInput}
                    />
                    <span className={styles.formHint}>
                      Used for project filtering and stack badges.
                    </span>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Key Architectural Highlights (one bullet per line)
                    </label>
                    <textarea
                      rows={4}
                      value={formHighlightsText}
                      onChange={(e) => setFormHighlightsText(e.target.value)}
                      placeholder="Sub-45ms P99 latency across 100K concurrent event streams&#10;Zero runtime layout shift on client renders&#10;Automated canary deployments via Kubernetes operator"
                      className={styles.formTextarea}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      System Architecture Flow Breakdown
                    </label>
                    <textarea
                      rows={4}
                      value={formArchitecture}
                      onChange={(e) => setFormArchitecture(e.target.value)}
                      placeholder="Describe ingress, event queue partitioning, worker goroutines, and persistence..."
                      className={styles.formTextarea}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Technical Bottlenecks &amp; Resolution
                    </label>
                    <textarea
                      rows={4}
                      value={formChallenges}
                      onChange={(e) => setFormChallenges(e.target.value)}
                      placeholder="Describe critical challenges (e.g. database IOPS saturation, cache stampedes) and how you engineered solutions..."
                      className={styles.formTextarea}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Primary Benchmark / Metric Badge
                    </label>
                    <input
                      type="text"
                      value={formMetrics}
                      onChange={(e) => setFormMetrics(e.target.value)}
                      placeholder="e.g. < 45ms P99 Latency • 100K QPS • 99.99% Uptime"
                      className={styles.formInput}
                    />
                  </div>
                </div>

                {/* Bottom Submit Actions */}
                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                  <button type="submit" className={styles.primaryBtn} style={{ padding: "0.75rem 2rem", fontSize: "0.9rem" }}>
                    <Check size={16} />
                    <span>Save &amp; Deploy Project</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("directory")}
                    className={styles.secondaryBtn}
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {/* ------------------------------------------------------- */}
              {/* STICKY RIGHT COLUMN: REAL-TIME LIVE CARD PREVIEW        */}
              {/* ------------------------------------------------------- */}
              <aside className={styles.previewColumn}>
                <div className={styles.previewCardFrame}>
                  <div className={styles.previewHeader}>
                    <span className={styles.previewKicker}>
                      <Eye size={13} />
                      <span>Live Card Preview</span>
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>
                      16:10 Ratio
                    </span>
                  </div>

                  {/* Mock Card Preview exactly as rendered in /projects and /portfolio */}
                  <div className={styles.previewMockCard}>
                    <div className={styles.previewImageFrame}>
                      {activePreviewImage ? (
                        <Image
                          src={activePreviewImage}
                          alt={formTitle || "Project Preview"}
                          fill
                          unoptimized={activePreviewImage.startsWith("http")}
                          className={styles.previewImage}
                          sizes="360px"
                        />
                      ) : (
                        <div className={styles.previewNoImage}>
                          No Image URL specified
                        </div>
                      )}

                      {/* Translucent bottom-left category pill */}
                      <span className={styles.badgeCategory} style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem" }}>
                        {formCategory}
                      </span>
                    </div>

                    <div className={styles.previewMockBody}>
                      <h4 className={styles.previewMockTitle}>
                        {formTitle || "Untitled Project"}
                      </h4>
                      <p className={styles.previewMockTagline}>
                        {formTagline || "Provide a tagline to see it rendered live here..."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Quality Checklist */}
                <div className={styles.checklistCard}>
                  <span style={{ fontSize: "0.76rem", fontFamily: "var(--font-mono)", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Readiness Checklist
                  </span>

                  <div className={styles.checklistItem}>
                    <CheckCircle2 size={13} className={formTitle ? styles.checkOk : styles.checkMissing} />
                    <span>Title &amp; Slug Defined</span>
                  </div>
                  <div className={styles.checklistItem}>
                    <CheckCircle2 size={13} className={formImage ? styles.checkOk : styles.checkMissing} />
                    <span>Card Image URL Assigned</span>
                  </div>
                  <div className={styles.checklistItem}>
                    <CheckCircle2 size={13} className={formTagline ? styles.checkOk : styles.checkMissing} />
                    <span>Card Tagline Written</span>
                  </div>
                  <div className={styles.checklistItem}>
                    <CheckCircle2 size={13} className={formDescription ? styles.checkOk : styles.checkMissing} />
                    <span>Summary Description Ready</span>
                  </div>
                  <div className={styles.checklistItem}>
                    <CheckCircle2 size={13} className={formGithubUrl ? styles.checkOk : styles.checkMissing} />
                    <span>GitHub Repository Linked</span>
                  </div>
                  <div className={styles.checklistItem}>
                    <CheckCircle2 size={13} className={formTagsText ? styles.checkOk : styles.checkMissing} />
                    <span>Technology Stack Tags Set</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
