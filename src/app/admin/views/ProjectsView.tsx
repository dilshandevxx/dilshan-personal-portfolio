"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  Star,
  Edit,
  Trash2,
  ExternalLink,
  Filter,
  Save,
  Check,
  Sliders,
} from "lucide-react";
import styles from "../admin.module.css";
import { Project, ProjectCategory, getProjectThumbnail } from "@/data/projects";
import { cmsDataStore, DEFAULT_GLOBAL_SETTINGS, ProjectCardLayoutConfig } from "@/services/cmsDataStore";

interface ProjectsViewProps {
  projects: Project[];
  onAddNew: () => void;
  onEdit: (project: Project) => void;
  onDelete: (slug: string) => void;
  onToggleFeatured: (slug: string) => void;
  initialTab?: "all" | "categories" | "card-layout";
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onAddNew,
  onEdit,
  onDelete,
  onToggleFeatured,
  initialTab = "all",
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"all" | "categories" | "card-layout">(initialTab);

  // Card Layout Configuration
  const [cardConfig, setCardConfig] = useState<ProjectCardLayoutConfig>(
    DEFAULT_GLOBAL_SETTINGS.projectCardConfig!
  );
  const [savingCardConfig, setSavingCardConfig] = useState(false);
  const [cardConfigSaved, setCardConfigSaved] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await cmsDataStore.getGlobalSettings();
        if (settings?.projectCardConfig) {
          setCardConfig(settings.projectCardConfig);
        }
      } catch (err) {}
    }
    loadSettings();
  }, []);

  const handleSaveCardConfig = async () => {
    setSavingCardConfig(true);
    try {
      await cmsDataStore.saveGlobalSettings({ projectCardConfig: cardConfig });
      setCardConfigSaved(true);
      setTimeout(() => setCardConfigSaved(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingCardConfig(false);
    }
  };

  const categories: string[] = [
    "All",
    "Product",
    "Company",
    "Research",
    "Open Source",
    "Distributed Systems",
    "AI/ML",
    "Full-Stack",
    "Systems",
    "Platform Engineering",
    "Data Engineering",
    "DevOps",
  ];

  // Filtering
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* View Header */}
      <div className={styles.viewHeader}>
        <div className={styles.viewTitleGroup}>
          <h1 className={styles.viewTitle}>Projects Management</h1>
          <p className={styles.viewSubtitle}>
            Browse, search, curate, and edit deep technical case studies, metrics, and architecture diagrams.
          </p>
        </div>

        <div className={styles.viewActions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onAddNew}
          >
            <Plus size={15} />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsNav}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "all" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Projects ({projects.length})
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "categories" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("categories")}
        >
          Categories & Taxonomy
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "card-layout" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("card-layout")}
        >
          Card Layout & Line Limits
        </button>
      </div>

      {activeTab === "all" ? (
        <>
          {/* Controls Bar: Search, Category Filter, and Grid/List toggle */}
          <div className={styles.controlsBar}>
            <div className={styles.searchWrap}>
              <Search size={15} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search by title, tech stack, or summary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.controlsRight}>
              {/* Category selector */}
              <select
                className={styles.selectField}
                style={{ width: "auto" }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {/* View mode toggle */}
              <div className={styles.viewToggleGroup}>
                <button
                  type="button"
                  className={`${styles.viewToggleBtn} ${viewMode === "grid" ? styles.viewToggleBtnActive : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  aria-label="Grid View"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  type="button"
                  className={`${styles.viewToggleBtn} ${viewMode === "list" ? styles.viewToggleBtnActive : ""}`}
                  onClick={() => setViewMode("list")}
                  title="List View"
                  aria-label="List View"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Results count info */}
          <div style={{ marginBottom: "1rem", fontSize: "0.78rem", color: "#92949d" }}>
            Showing {filteredProjects.length} of {projects.length} projects
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>
                <Search size={22} />
              </div>
              <h3 className={styles.emptyStateTitle}>No projects match your filter</h3>
              <p className={styles.emptyStateText}>
                Try adjusting your search terms or selecting a different category from the dropdown above.
              </p>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* =============================================================
               GRID VIEW
               ============================================================= */
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project, idx) => {
                const thumbSrc = getProjectThumbnail(
                  project.slug,
                  project.image || (project as any).coverImage,
                  idx,
                  (project as any).coverImage
                );
                const galleryList = project.gallery || [];
                const hasVideoPoster = Boolean(project.videoDemo?.thumbnail);
                const insideCount = galleryList.length + (hasVideoPoster ? 1 : 0);

                return (
                  <div key={project.slug} className={styles.projectCard}>
                    {/* Clean Thumbnail - Strictly NO text on image */}
                    <div className={styles.projectCardThumb}>
                      <Image
                        src={thumbSrc}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        className={styles.projectCardThumbImg}
                        unoptimized
                      />
                    </div>

                    {/* Body */}
                    <div className={styles.projectCardBody}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.72rem", color: "#92949d", fontWeight: 500 }}>
                          {project.category}
                        </span>
                        <span
                          className={`${styles.statusBadge} ${
                            project.status === "Existing" ? styles.statusPublished : styles.statusDraft
                          }`}
                        >
                          {project.status === "Existing" ? "Published" : "Draft"}
                        </span>
                      </div>

                      <h3 className={styles.projectCardTitle}>{project.title}</h3>
                      <p className={styles.projectCardTagline}>{project.tagline}</p>

                      {/* Visual Attached Images Strip: Cover + Inside Project Details Images */}
                      <div className={styles.insideImagesStrip}>
                        <span className={styles.insideImagesLabel}>Images:</span>
                        <div className={styles.insideThumbsRow}>
                          {/* 1. Main Cover Thumbnail Mini */}
                          <div
                            className={styles.insideThumbMini}
                            title={`Main Cover Thumbnail: ${thumbSrc}`}
                            onClick={() => onEdit(project)}
                          >
                            <Image
                              src={thumbSrc}
                              alt="Cover thumbnail"
                              fill
                              sizes="32px"
                              style={{ objectFit: "cover" }}
                              unoptimized
                            />
                          </div>

                          {/* 2. Attached Gallery Inside Images */}
                          {galleryList.slice(0, 3).map((item, gIdx) => (
                            <div
                              key={gIdx}
                              className={styles.insideThumbMini}
                              title={`Inside Visual #${gIdx + 1}: ${item.title || item.caption || item.type || "Diagram"}`}
                              onClick={() => onEdit(project)}
                            >
                              <Image
                                src={item.url}
                                alt={item.title || `Inside slide ${gIdx + 1}`}
                                fill
                                sizes="32px"
                                style={{ objectFit: "cover" }}
                                unoptimized
                              />
                            </div>
                          ))}

                          {/* 3. Video Poster if available */}
                          {hasVideoPoster && (
                            <div
                              className={styles.insideThumbMini}
                              title="Inside Video Demo Poster Frame"
                              onClick={() => onEdit(project)}
                            >
                              <Image
                                src={project.videoDemo!.thumbnail!}
                                alt="Video poster"
                                fill
                                sizes="32px"
                                style={{ objectFit: "cover" }}
                                unoptimized
                              />
                            </div>
                          )}

                          {/* More badge if > 3 gallery items */}
                          {galleryList.length > 3 && (
                            <span className={styles.insideCountBadge}>+{galleryList.length - 3}</span>
                          )}
                        </div>

                        {/* Badge summary */}
                        <span className={styles.insideCountBadge}>
                          {insideCount > 0 ? `1 + ${insideCount} inside` : "1 cover"}
                        </span>
                      </div>

                      {/* Tag list */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "auto", paddingTop: "0.5rem" }}>
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: "0.68rem",
                              fontFamily: "monospace",
                              padding: "0.15rem 0.45rem",
                              backgroundColor: "#101113",
                              border: "1px solid #292b31",
                              borderRadius: "4px",
                              color: "#92949d",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span style={{ fontSize: "0.68rem", color: "#65676e", alignSelf: "center" }}>
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className={styles.projectCardFooter}>
                      <button
                        type="button"
                        className={`${styles.btn} ${styles.btnGhost} ${styles.btnSm}`}
                        onClick={() => onToggleFeatured(project.slug)}
                        title={project.featured ? "Featured on homepage (Click to unfeature)" : "Click to feature"}
                      >
                        <Star
                          size={14}
                          style={{
                            color: project.featured ? "#f59e0b" : "#65676e",
                            fill: project.featured ? "#f59e0b" : "none",
                          }}
                        />
                      </button>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                          onClick={() => onEdit(project)}
                        >
                          <Edit size={13} />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
                              onDelete(project.slug);
                            }
                          }}
                          title="Delete project"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* =============================================================
               LIST VIEW
               ============================================================= */
            <div className={styles.dashboardPanel}>
              <div style={{ overflowX: "auto" }}>
                <table className={styles.tableRoot}>
                  <thead>
                    <tr className={styles.tableHeaderRow}>
                      <th className={styles.tableHeaderCell}>Project</th>
                      <th className={styles.tableHeaderCell}>Media Assets</th>
                      <th className={styles.tableHeaderCell}>Category</th>
                      <th className={styles.tableHeaderCell}>Featured</th>
                      <th className={styles.tableHeaderCell}>Status</th>
                      <th className={styles.tableHeaderCell}>Date</th>
                      <th className={styles.tableHeaderCell} style={{ textAlign: "right" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project, idx) => {
                      const thumbSrc = getProjectThumbnail(
                        project.slug,
                        project.image || (project as any).coverImage,
                        idx,
                        (project as any).coverImage
                      );
                      const galleryList = project.gallery || [];
                      const hasVideoPoster = Boolean(project.videoDemo?.thumbnail);
                      const insideCount = galleryList.length + (hasVideoPoster ? 1 : 0);

                      return (
                        <tr key={project.slug} className={styles.tableRow}>
                          <td className={styles.tableCell}>
                            <div className={styles.projectCellThumb}>
                              <div className={styles.thumbFrame}>
                                <Image
                                  src={thumbSrc}
                                  alt={project.title}
                                  fill
                                  sizes="44px"
                                  style={{ objectFit: "cover" }}
                                  unoptimized
                                />
                              </div>
                              <div className={styles.projectCellInfo}>
                                <span className={styles.projectCellTitle}>{project.title}</span>
                                <span className={styles.projectCellSlug}>/{project.slug}</span>
                              </div>
                            </div>
                          </td>
                          <td className={styles.tableCell}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                              <div
                                className={styles.insideThumbMini}
                                title={`Cover: ${thumbSrc}`}
                                onClick={() => onEdit(project)}
                              >
                                <Image
                                  src={thumbSrc}
                                  alt="Cover thumbnail"
                                  fill
                                  sizes="32px"
                                  style={{ objectFit: "cover" }}
                                  unoptimized
                                />
                              </div>
                              {galleryList.slice(0, 2).map((item, gIdx) => (
                                <div
                                  key={gIdx}
                                  className={styles.insideThumbMini}
                                  title={`Inside Visual: ${item.title || item.caption || "Diagram"}`}
                                  onClick={() => onEdit(project)}
                                >
                                  <Image
                                    src={item.url}
                                    alt={item.title || "Inside slide"}
                                    fill
                                    sizes="32px"
                                    style={{ objectFit: "cover" }}
                                    unoptimized
                                  />
                                </div>
                              ))}
                              {hasVideoPoster && (
                                <div
                                  className={styles.insideThumbMini}
                                  title="Video Poster"
                                  onClick={() => onEdit(project)}
                                >
                                  <Image
                                    src={project.videoDemo!.thumbnail!}
                                    alt="Video poster"
                                    fill
                                    sizes="32px"
                                    style={{ objectFit: "cover" }}
                                    unoptimized
                                  />
                                </div>
                              )}
                              <span className={styles.insideCountBadge}>
                                {insideCount > 0 ? `1 + ${insideCount}` : "1"}
                              </span>
                            </div>
                          </td>
                          <td className={styles.tableCell} style={{ color: "#92949d" }}>
                            {project.category}
                          </td>
                          <td className={styles.tableCell}>
                            <button
                              type="button"
                              onClick={() => onToggleFeatured(project.slug)}
                              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                              title="Toggle featured status"
                            >
                              <Star
                                size={15}
                                style={{
                                  color: project.featured ? "#f59e0b" : "#4b4e58",
                                  fill: project.featured ? "#f59e0b" : "none",
                                }}
                              />
                            </button>
                          </td>
                          <td className={styles.tableCell}>
                            <span
                              className={`${styles.statusBadge} ${
                                project.status === "Existing" ? styles.statusPublished : styles.statusDraft
                              }`}
                            >
                              {project.status === "Existing" ? "Published" : "Draft"}
                            </span>
                          </td>
                          <td className={styles.tableCell} style={{ color: "#92949d", fontSize: "0.78rem" }}>
                            {project.date}
                          </td>
                          <td className={styles.tableCell} style={{ textAlign: "right" }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                              <button
                                type="button"
                                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                                onClick={() => onEdit(project)}
                              >
                                <Edit size={13} />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
                                    onDelete(project.slug);
                                  }
                                }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : activeTab === "categories" ? (
        /* Categories Tab */
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Project Categories & Taxonomy</h3>
            <p className={styles.sectionDescription}>
              Overview of the structured engineering domains used for categorizing portfolio projects.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {categories
              .filter((c) => c !== "All")
              .map((cat) => {
                const count = projects.filter((p) => p.category === cat).length;
                return (
                  <div
                    key={cat}
                    style={{
                      padding: "1rem 1.25rem",
                      backgroundColor: "#141518",
                      border: "1px solid #292b31",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "#f2f2f0" }}>
                        {cat}
                      </h4>
                      <span style={{ fontSize: "0.75rem", color: "#92949d" }}>
                        {count} {count === 1 ? "project" : "projects"} assigned to this category
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setActiveTab("all");
                      }}
                    >
                      View Projects
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        /* Card Layout & Line Limits Tab */
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h3 className={styles.sectionTitle}>Project Card Layout & Line Limits</h3>
                <p className={styles.sectionDescription}>
                  Control how many lines are budgeted for titles, intro descriptions, and tech stack badge rows on all project cards. Every card automatically balances its height to prevent visual unevenness.
                </p>
              </div>

              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={handleSaveCardConfig}
                disabled={savingCardConfig}
              >
                {cardConfigSaved ? <Check size={14} /> : <Save size={14} />}
                <span>{savingCardConfig ? "Saving..." : cardConfigSaved ? "Layout Saved!" : "Save Card Layout"}</span>
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "start" }}>
            {/* Controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Title lines slider */}
              <div className={styles.formGroup}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className={styles.formLabel}>Main Title Line Limit</label>
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.82rem", color: "#a3e635", fontWeight: 700 }}>
                    {cardConfig.titleLines} {cardConfig.titleLines === 1 ? "Line" : "Lines"}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    step={1}
                    value={cardConfig.titleLines}
                    onChange={(e) => setCardConfig({ ...cardConfig, titleLines: parseInt(e.target.value, 10) })}
                    style={{ flex: 1, accentColor: "#a3e635", cursor: "pointer" }}
                  />
                  <span style={{ fontSize: "0.75rem", color: "#8c909c", minWidth: "40px" }}>1 - 4 lines</span>
                </div>
                <span style={{ fontSize: "0.72rem", color: "#71717a" }}>
                  Maximum lines allowed for project title before truncating with an ellipsis.
                </span>
              </div>

              {/* Description lines slider */}
              <div className={styles.formGroup}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className={styles.formLabel}>Small Description Line Limit</label>
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.82rem", color: "#a3e635", fontWeight: 700 }}>
                    {cardConfig.descriptionLines} {cardConfig.descriptionLines === 1 ? "Line" : "Lines"}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={cardConfig.descriptionLines}
                    onChange={(e) => setCardConfig({ ...cardConfig, descriptionLines: parseInt(e.target.value, 10) })}
                    style={{ flex: 1, accentColor: "#a3e635", cursor: "pointer" }}
                  />
                  <span style={{ fontSize: "0.75rem", color: "#8c909c", minWidth: "40px" }}>1 - 5 lines</span>
                </div>
                <span style={{ fontSize: "0.72rem", color: "#71717a" }}>
                  Height reserved for the introductory synopsis. Equalizes height across all cards.
                </span>
              </div>

              {/* Tech stack rows slider */}
              <div className={styles.formGroup}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className={styles.formLabel}>Tech Stack Badge Rows</label>
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.82rem", color: "#a3e635", fontWeight: 700 }}>
                    {cardConfig.techStackLines} {cardConfig.techStackLines === 1 ? "Row" : "Rows"}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={1}
                    value={cardConfig.techStackLines}
                    onChange={(e) => setCardConfig({ ...cardConfig, techStackLines: parseInt(e.target.value, 10) })}
                    style={{ flex: 1, accentColor: "#a3e635", cursor: "pointer" }}
                  />
                  <span style={{ fontSize: "0.75rem", color: "#8c909c", minWidth: "40px" }}>1 - 3 rows</span>
                </div>
                <span style={{ fontSize: "0.72rem", color: "#71717a" }}>
                  Row budget for tech stack pills (Python, FastAPI, PyTorch, React, etc.).
                </span>
              </div>

              {/* Toggles */}
              <div className={styles.fieldGrid}>
                <div style={{ padding: "0.85rem", backgroundColor: "#141518", border: "1px solid #292b31", borderRadius: "6px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", color: "#f2f2f0", fontSize: "0.84rem", fontWeight: 500 }}>
                    <input
                      type="checkbox"
                      checked={cardConfig.showCategory !== false}
                      onChange={(e) => setCardConfig({ ...cardConfig, showCategory: e.target.checked })}
                      style={{ accentColor: "#a3e635", width: "16px", height: "16px" }}
                    />
                    <span>Show Category Line (Product, Research, Company)</span>
                  </label>
                </div>

                <div style={{ padding: "0.85rem", backgroundColor: "#141518", border: "1px solid #292b31", borderRadius: "6px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", color: "#f2f2f0", fontSize: "0.84rem", fontWeight: 500 }}>
                    <input
                      type="checkbox"
                      checked={cardConfig.showDate !== false}
                      onChange={(e) => setCardConfig({ ...cardConfig, showDate: e.target.checked })}
                      style={{ accentColor: "#a3e635", width: "16px", height: "16px" }}
                    />
                    <span>Show Date Line (Year / Release Date)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Live Interactive Card Preview */}
            <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono, monospace)", color: "#92949d", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Interactive Live Preview
              </span>

              <div
                style={{
                  backgroundColor: "#16171b",
                  border: "1px solid #292b31",
                  borderRadius: "14px",
                  overflow: "hidden",
                  padding: "0.85rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Image Placeholder */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    backgroundColor: "#0d0f12",
                    borderRadius: "8px",
                    border: "1px solid #24262d",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/images/project_collective.jpg"
                    alt="Sample Preview"
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>

                {/* Card Content Details */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {cardConfig.showCategory !== false && (
                    <div style={{ height: "20px", display: "flex", alignItems: "center", marginBottom: "0.35rem" }}>
                      <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.68rem", color: "#8c909c", fontWeight: 700, textTransform: "uppercase" }}>
                        PRODUCT
                      </span>
                    </div>
                  )}

                  <h4
                    style={{
                      margin: "0 0 0.4rem 0",
                      fontSize: "0.98rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      lineHeight: 1.35,
                      WebkitLineClamp: cardConfig.titleLines,
                      WebkitBoxOrient: "vertical",
                      display: "-webkit-box",
                      overflow: "hidden",
                      height: `calc(1.35em * ${cardConfig.titleLines})`,
                      maxHeight: `calc(1.35em * ${cardConfig.titleLines})`,
                    }}
                  >
                    Enterprise Hybrid RAG Platform with Semantic Cache & Model Inference
                  </h4>

                  <p
                    style={{
                      margin: "0 0 0.55rem 0",
                      fontSize: "0.8rem",
                      color: "#888e99",
                      lineHeight: 1.45,
                      WebkitLineClamp: cardConfig.descriptionLines,
                      WebkitBoxOrient: "vertical",
                      display: "-webkit-box",
                      overflow: "hidden",
                      height: `calc(1.45em * ${cardConfig.descriptionLines})`,
                      maxHeight: `calc(1.45em * ${cardConfig.descriptionLines})`,
                    }}
                  >
                    Engineered an enterprise retrieval-augmented generation engine with sub-50ms hybrid lexical and dense vector search, reciprocal rank fusion, and Redis semantic caching.
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.3rem",
                      overflow: "hidden",
                      height: `${cardConfig.techStackLines * 24}px`,
                      maxHeight: `${cardConfig.techStackLines * 24}px`,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {["Python", "FastAPI", "vLLM", "Qdrant", "Redis", "TypeScript", "React"].map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "0.64rem",
                          fontFamily: "var(--font-mono, monospace)",
                          padding: "0.15rem 0.4rem",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "4px",
                          color: "#a1a5b0",
                          textTransform: "uppercase",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {cardConfig.showDate !== false && (
                    <div style={{ height: "18px", display: "flex", alignItems: "center" }}>
                      <span style={{ fontSize: "0.72rem", color: "#606470", fontFamily: "var(--font-mono, monospace)" }}>
                        OCTOBER 2026
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
