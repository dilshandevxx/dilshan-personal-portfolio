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
} from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import {
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Search,
  Check,
  Copy,
  X,
  Sparkles,
  Eye,
  CheckCircle2,
  FileCode2,
  Layers,
  Globe,
  Sliders,
  FolderGit2,
} from "lucide-react";
import styles from "./admin.module.css";

const CATEGORIES: ProjectCategory[] = [
  "AI/ML",
  "DevOps",
  "Systems",
  "Full-Stack",
  "Landing",
  "Platform Engineering",
  "MLOps",
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
  { label: "Desk Setup", url: "/images/project_warpspeed_desk.jpg" },
  { label: "Travel Story", url: "/images/story_travel.jpg" },
  { label: "Twilight City", url: "/images/skyline_twilight.jpg" },
  {
    label: "Modern Arch",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Clean Tech",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Data Flow",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  },
];

const POPULAR_TAGS = [
  "TypeScript",
  "Next.js",
  "Go",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "Redis",
  "Kafka",
  "GraphQL",
  "Tailwind CSS",
  "AWS",
  "gRPC",
];

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeTab, setActiveTab] = useState<"studio" | "directory">("studio");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const [editingSlug, setEditingSlug] = useState<string | null>(
    initialProjects[0]?.slug || null
  );
  const [toastMessage, setToastMessage] = useState<string>("");

  // Clean Form State
  const [formTitle, setFormTitle] = useState(initialProjects[0]?.title || "");
  const [formSlug, setFormSlug] = useState(initialProjects[0]?.slug || "");
  const [formCategory, setFormCategory] = useState<ProjectCategory>(
    initialProjects[0]?.category || "AI/ML"
  );
  const [formStatus, setFormStatus] = useState<ProjectStatus>(
    initialProjects[0]?.status || "Existing"
  );
  const [formFeatured, setFormFeatured] = useState<boolean>(
    Boolean(initialProjects[0]?.featured)
  );
  const [formDate, setFormDate] = useState<string>(
    initialProjects[0]?.date || "2026"
  );
  const [formImage, setFormImage] = useState<string>(
    initialProjects[0]?.image || ""
  );
  const [formTagline, setFormTagline] = useState(
    initialProjects[0]?.tagline || ""
  );
  const [formDescription, setFormDescription] = useState(
    initialProjects[0]?.description || ""
  );
  const [formLongDescription, setFormLongDescription] = useState(
    initialProjects[0]?.longDescription || initialProjects[0]?.description || ""
  );
  const [formDemoUrl, setFormDemoUrl] = useState(
    initialProjects[0]?.demoUrl || ""
  );
  const [formGithubUrl, setFormGithubUrl] = useState(
    initialProjects[0]?.githubUrl || ""
  );
  const [formWriteupUrl, setFormWriteupUrl] = useState(
    initialProjects[0]?.writeupUrl || ""
  );
  const [formArchitecture, setFormArchitecture] = useState(
    initialProjects[0]?.architecture || ""
  );
  const [formChallenges, setFormChallenges] = useState(
    initialProjects[0]?.challenges || ""
  );
  const [formHighlightsText, setFormHighlightsText] = useState(
    (initialProjects[0]?.highlights || []).join("\n")
  );
  const [formTagsText, setFormTagsText] = useState(
    (initialProjects[0]?.tags || []).join(", ")
  );
  const [formMetrics, setFormMetrics] = useState(
    initialProjects[0]?.metrics || ""
  );

  // Sync projects from localStorage and API on mount
  useEffect(() => {
    try {
      const localSaved = localStorage.getItem("dilshan_custom_projects");
      if (localSaved) {
        const parsed = JSON.parse(localSaved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
          return;
        }
      }
    } catch {}

    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      })
      .catch(() => {
        // Fallback to initialProjects
      });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4500);
  };

  // Load a project into form
  const populateFormWithProject = (project: Project) => {
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
    setActiveTab("studio");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Start fresh project draft
  const handleStartNewProject = () => {
    setEditingSlug(null);
    setFormTitle("");
    setFormSlug("");
    setFormCategory("AI/ML");
    setFormStatus("Existing");
    setFormFeatured(false);
    setFormDate(new Date().getFullYear().toString());
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
    setActiveTab("studio");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Duplicate current project as a new draft
  const handleDuplicateCurrent = () => {
    setEditingSlug(null);
    setFormTitle(`${formTitle} (Copy)`);
    setFormSlug(`${formSlug}-copy`);
    setFormStatus("Planned");
    setFormFeatured(false);
    showToast(`Draft created from "${formTitle}"`);
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
      localStorage.setItem("dilshan_custom_projects", JSON.stringify(updated));
    } catch {}

    if (editingSlug === slug) {
      setFormStatus((prev) => (prev === "Existing" ? "Planned" : "Existing"));
    }

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_status", slug }),
      });
      const data = await res.json();
      showToast(
        data.savedLocally
          ? "Status updated & saved to projects.ts"
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
      localStorage.setItem("dilshan_custom_projects", JSON.stringify(updated));
    } catch {}

    if (editingSlug === slug && updated.length > 0) {
      populateFormWithProject(updated[0]);
    }

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", slug }),
      });
      const data = await res.json();
      showToast(
        data.savedLocally
          ? `Removed "${title}" from projects.ts`
          : "Project deleted from list"
      );
    } catch {
      showToast("Removed from current browser state");
    }
  };

  // Quick append a tag to formTagsText
  const handleAddQuickTag = (tag: string) => {
    const current = formTagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (!current.includes(tag)) {
      setFormTagsText([...current, tag].join(", "));
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
    setEditingSlug(finalSlug);
    try {
      localStorage.setItem("dilshan_custom_projects", JSON.stringify(updatedList));
    } catch {}

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
          : `✓ "${projectData.title}" saved successfully`
      );
    } catch {
      showToast(`✓ "${projectData.title}" updated in local state`);
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
    showToast("TypeScript array copied to clipboard!");
  };

  // Filtered projects for directory list
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.tagline && p.tagline.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)));

      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "All" || p.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, searchQuery, selectedCategory, selectedStatus]);

  // Live count calculations
  const liveCount = projects.filter((p) => p.status === "Existing").length;
  const plannedCount = projects.filter((p) => p.status === "Planned").length;

  // Active preview object to pass to ProjectCard in real-time
  const previewProjectObj: Project = {
    slug: formSlug || "preview-slug",
    title: formTitle || "Untitled Project",
    date: formDate || "2026",
    category: formCategory,
    tagline: formTagline || "One-line punchy subtitle rendered live on project cards.",
    description: formDescription || "Short summary description outlining the service.",
    longDescription: formLongDescription || formDescription,
    highlights: formHighlightsText.split("\n").filter(Boolean),
    architecture: formArchitecture,
    challenges: formChallenges,
    tags: formTagsText.split(",").map((t) => t.trim()).filter(Boolean),
    stars: 0,
    featured: formFeatured,
    githubUrl: formGithubUrl || "https://github.com",
    demoUrl: formDemoUrl || undefined,
    writeupUrl: formWriteupUrl || undefined,
    metrics: formMetrics || undefined,
    metricsDetail: [],
    stackLayers: [],
    image: formImage.trim() || undefined,
    status: formStatus,
  };

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
      {/* TOP CONTROL BAR (Clean Header)                                */}
      {/* ------------------------------------------------------------- */}
      <header className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.brandArea}>
            <Link href="/" className={styles.brandLogoGroup} title="View SkyLabs Home">
              <div className={styles.brandLogoBadge}>S</div>
              <div className={styles.brandTitleGroup}>
                <span className={styles.brandTitle}>Project Studio</span>
                <span className={styles.brandSubtitle}>Admin Console</span>
              </div>
            </Link>

            {/* Mode Switcher Tabs */}
            <nav className={styles.navTabs} aria-label="Mode Tabs">
              <button
                type="button"
                onClick={() => setActiveTab("studio")}
                className={`${styles.navTabBtn} ${
                  activeTab === "studio" ? styles.navTabBtnActive : ""
                }`}
              >
                <Sliders size={14} />
                <span>Project Studio</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("directory")}
                className={`${styles.navTabBtn} ${
                  activeTab === "directory" ? styles.navTabBtnActive : ""
                }`}
              >
                <FolderGit2 size={14} />
                <span>Catalog ({projects.length})</span>
              </button>
            </nav>
          </div>

          <div className={styles.topActions}>
            <button
              type="button"
              onClick={handleStartNewProject}
              className={styles.primaryBtn}
            >
              <Plus size={14} />
              <span>New Project</span>
            </button>

            <button
              type="button"
              onClick={handleCopyTsCode}
              className={styles.secondaryBtn}
              title="Copy TypeScript array for backup"
            >
              <Copy size={13} />
              <span>Copy TS</span>
            </button>

            <Link href="/projects" target="_blank" className={styles.secondaryBtn}>
              <Eye size={13} />
              <span>View Site</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTAINER                                                */}
      {/* ------------------------------------------------------------- */}
      <div className={styles.mainContainer}>
        {activeTab === "studio" ? (
          /* ========================================================== */
          /* TAB 1: STUDIO CUSTOMIZER & LIVE CARD PREVIEW               */
          /* ========================================================== */
          <div className={styles.studioWorkspace}>
            {/* Clean Selector Bar */}
            <div className={styles.selectorBar}>
              <div className={styles.selectorLeft}>
                <span className={styles.selectorLabel}>Select System:</span>
                <select
                  value={editingSlug || "__new__"}
                  onChange={(e) => {
                    const slug = e.target.value;
                    if (slug === "__new__") {
                      handleStartNewProject();
                    } else {
                      const found = projects.find((p) => p.slug === slug);
                      if (found) populateFormWithProject(found);
                    }
                  }}
                  className={styles.projectSelectDropdown}
                >
                  <option value="__new__">✨ + Create New System Draft</option>
                  <optgroup label="Existing Systems">
                    {projects.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.title} ({p.category} • {p.status})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div className={styles.selectorActions}>
                <button
                  type="button"
                  onClick={handleDuplicateCurrent}
                  className={styles.secondaryBtn}
                  title="Duplicate current project fields into a new draft"
                >
                  <Copy size={13} />
                  <span>Duplicate</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveForm}
                  className={styles.primaryBtn}
                >
                  <Check size={14} />
                  <span>Save &amp; Deploy</span>
                </button>
              </div>
            </div>

            {/* Split Layout: Form on Left, Sticky Real-Time Card Preview on Right */}
            <div className={styles.editorLayout}>
              {/* Form Column */}
              <form onSubmit={handleSaveForm} className={styles.formColumn}>
                {/* 1. Basic Info & Image URL */}
                <div className={styles.formSectionCard}>
                  <h3 className={styles.formSectionTitle}>
                    <Layers size={16} color="var(--color-primary, #8bb397)" />
                    <span className={styles.formSectionIndex}>01 //</span>
                    <span>Basic Information &amp; Card Image</span>
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
                        Public URL: /projects/{formSlug || "your-slug"}
                      </span>
                    </div>
                  </div>

                  {/* Image URL input with direct test presets */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Project Card Image URL (supports web URL or /images/ path)
                    </label>
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="https://images.unsplash.com/... or /images/project_collective.jpg"
                      className={styles.formInput}
                    />
                    <span className={styles.formHint}>
                      Paste any image link or click a preset below:
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
                      <label className={styles.formLabel}>Deployment Status</label>
                      <select
                        value={formStatus}
                        onChange={(e) =>
                          setFormStatus(e.target.value as ProjectStatus)
                        }
                        className={styles.formSelect}
                      >
                        <option value="Existing">Live Production</option>
                        <option value="Planned">Planned / RFC</option>
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
                        <span>Feature this project on card badges</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* 2. Descriptions & Copy */}
                <div className={styles.formSectionCard}>
                  <h3 className={styles.formSectionTitle}>
                    <FileCode2 size={16} color="var(--color-primary, #8bb397)" />
                    <span className={styles.formSectionIndex}>02 //</span>
                    <span>Card Copy &amp; Descriptions</span>
                  </h3>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Card Tagline *</label>
                    <input
                      type="text"
                      required
                      value={formTagline}
                      onChange={(e) => setFormTagline(e.target.value)}
                      placeholder="One-line punchy subtitle shown directly on project cards"
                      className={styles.formInput}
                    />
                    <span className={styles.formHint}>
                      1-line subtitle displayed on all project cards.
                    </span>
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
                      placeholder="Detailed narrative describing service topology, background motivation, and system architecture..."
                      className={styles.formTextarea}
                    />
                    <span className={styles.formHint}>
                      Detailed narrative shown on the project detail page.
                    </span>
                  </div>
                </div>

                {/* 3. Live Deployment & Repository Links */}
                <div className={styles.formSectionCard}>
                  <h3 className={styles.formSectionTitle}>
                    <Globe size={16} color="var(--color-primary, #8bb397)" />
                    <span className={styles.formSectionIndex}>03 //</span>
                    <span>Deployment &amp; Repository URLs</span>
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
                      Technical Case Study URL (Optional)
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
                <div className={styles.formSectionCard}>
                  <h3 className={styles.formSectionTitle}>
                    <Sparkles size={16} color="var(--color-primary, #8bb397)" />
                    <span className={styles.formSectionIndex}>04 //</span>
                    <span>Engineering Deep Dive &amp; Highlights</span>
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

                    {/* Quick Add Tag Chips */}
                    <div className={styles.quickTagsRow}>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                        Quick add:
                      </span>
                      {POPULAR_TAGS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleAddQuickTag(tag)}
                          className={styles.quickTagPill}
                        >
                          +{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Key Architectural Highlights (one per line)
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
                      Architecture &amp; Data Flow Topology
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
                      Technical Bottlenecks &amp; Resolutions
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
                      Benchmark / Metric Highlight
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
                  <button
                    type="submit"
                    className={styles.primaryBtn}
                    style={{ padding: "0.8rem 2.25rem", fontSize: "0.9rem" }}
                  >
                    <Check size={16} />
                    <span>Save &amp; Deploy Project</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("directory")}
                    className={styles.secondaryBtn}
                  >
                    View in Catalog
                  </button>
                </div>
              </form>

              {/* ------------------------------------------------------- */}
              {/* STICKY RIGHT COLUMN: LIVE CARD PREVIEW                  */}
              {/* ------------------------------------------------------- */}
              <aside className={styles.previewColumn}>
                <div className={styles.previewCardFrame}>
                  <div className={styles.previewHeader}>
                    <span className={styles.previewKicker}>
                      <Eye size={13} />
                      <span>Live Card Preview</span>
                    </span>
                    {formSlug && (
                      <Link
                        href={`/projects/${formSlug}`}
                        target="_blank"
                        className={styles.previewLinkBtn}
                        title="Open project public page in new tab"
                      >
                        <span>View Page</span>
                        <ExternalLink size={12} />
                      </Link>
                    )}
                  </div>

                  {/* Real Live ProjectCard Component Instance */}
                  <ProjectCard project={previewProjectObj} index={0} />
                </div>

                {/* Readiness Checklist */}
                <div className={styles.checklistCard}>
                  <span className={styles.checklistTitle}>
                    Readiness Checklist
                  </span>

                  <div className={styles.checklistItem}>
                    <CheckCircle2
                      size={14}
                      className={formTitle ? styles.checkOk : styles.checkMissing}
                    />
                    <span>Title &amp; Slug Defined</span>
                  </div>
                  <div className={styles.checklistItem}>
                    <CheckCircle2
                      size={14}
                      className={formImage ? styles.checkOk : styles.checkMissing}
                    />
                    <span>Card Image URL Assigned</span>
                  </div>
                  <div className={styles.checklistItem}>
                    <CheckCircle2
                      size={14}
                      className={formTagline ? styles.checkOk : styles.checkMissing}
                    />
                    <span>Card Tagline Written</span>
                  </div>
                  <div className={styles.checklistItem}>
                    <CheckCircle2
                      size={14}
                      className={formDescription ? styles.checkOk : styles.checkMissing}
                    />
                    <span>Summary Description Ready</span>
                  </div>
                  <div className={styles.checklistItem}>
                    <CheckCircle2
                      size={14}
                      className={formGithubUrl ? styles.checkOk : styles.checkMissing}
                    />
                    <span>GitHub Repository Linked</span>
                  </div>
                  <div className={styles.checklistItem}>
                    <CheckCircle2
                      size={14}
                      className={formTagsText ? styles.checkOk : styles.checkMissing}
                    />
                    <span>Technology Stack Tags Set</span>
                  </div>
                </div>

                {/* Delete Shortcut if editing existing project */}
                {editingSlug && (
                  <button
                    type="button"
                    onClick={() => handleDelete(editingSlug, formTitle)}
                    className={styles.dangerOutlineBtn}
                  >
                    <Trash2 size={13} />
                    <span>Delete System from Catalog</span>
                  </button>
                )}
              </aside>
            </div>
          </div>
        ) : (
          /* ========================================================== */
          /* TAB 2: ALL SYSTEMS CATALOG (DIRECTORY)                     */
          /* ========================================================== */
          <div>
            <div className={styles.directoryControls}>
              {/* Search Bar */}
              <div className={styles.searchBar}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={`Search ${projects.length} systems by title, slug, stack, or tagline...`}
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
                    <X size={15} />
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
                  { id: "Existing", label: `Live (${liveCount})` },
                  { id: "Planned", label: `Planned (${plannedCount})` },
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
                        unoptimized={thumb.startsWith("http") || thumb.startsWith("data:")}
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
                              backgroundColor: isLive ? "#4ade80" : "#93c5fd",
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
                            onClick={() => populateFormWithProject(p)}
                            className={styles.iconActionBtn}
                            title="Edit this project in Studio"
                            aria-label={`Edit ${p.title}`}
                          >
                            <Edit3 size={14} />
                          </button>
                          <Link
                            href={`/projects/${p.slug}`}
                            target="_blank"
                            className={styles.iconActionBtn}
                            title="View public detail page"
                            aria-label={`View public page for ${p.title}`}
                          >
                            <ExternalLink size={13} />
                          </Link>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDelete(p.slug, p.title)}
                          className={`${styles.iconActionBtn} ${styles.deleteBtn}`}
                          title="Delete project"
                          aria-label={`Delete ${p.title}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
