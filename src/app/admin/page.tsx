"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { projectsList as initialProjects, Project, ProjectCategory, ProjectStatus } from "@/data/projects";
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
  Download,
  ArrowLeft,
  X,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

const CATEGORIES: ProjectCategory[] = ["AI/ML", "DevOps", "Systems", "Full-Stack"];
const DEFAULT_PASSKEY = "dilshan2026";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passkeyInput, setPasskeyInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // Editor modal state
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState<ProjectCategory>("AI/ML");
  const [formStatus, setFormStatus] = useState<ProjectStatus>("Planned");
  const [formFeatured, setFormFeatured] = useState<boolean>(false);
  const [formTagline, setFormTagline] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLongDescription, setFormLongDescription] = useState("");
  const [formArchitecture, setFormArchitecture] = useState("");
  const [formChallenges, setFormChallenges] = useState("");
  const [formHighlightsText, setFormHighlightsText] = useState("");
  const [formTagsText, setFormTagsText] = useState("");
  const [formGithubUrl, setFormGithubUrl] = useState("");
  const [formDemoUrl, setFormDemoUrl] = useState("");

  // Check auth from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("dilshan_admin_auth");
    if (stored === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === DEFAULT_PASSKEY || passkeyInput === "admin") {
      setIsAuthenticated(true);
      localStorage.setItem("dilshan_admin_auth", "authenticated");
      setAuthError("");
    } else {
      setAuthError("Incorrect passkey. Default is: dilshan2026");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("dilshan_admin_auth");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesStatus = selectedStatus === "All" || p.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, searchQuery, selectedCategory, selectedStatus]);

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingSlug(null);
    setFormTitle("");
    setFormSlug("");
    setFormCategory("AI/ML");
    setFormStatus("Planned");
    setFormFeatured(false);
    setFormTagline("");
    setFormDescription("");
    setFormLongDescription("");
    setFormArchitecture("");
    setFormChallenges("");
    setFormHighlightsText("");
    setFormTagsText("Python, Docker, FastAPI");
    setFormGithubUrl("https://github.com/dilshandevxx/");
    setFormDemoUrl("");
    setIsEditorOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (project: Project) => {
    setEditingSlug(project.slug);
    setFormTitle(project.title);
    setFormSlug(project.slug);
    setFormCategory(project.category);
    setFormStatus(project.status);
    setFormFeatured(!!project.featured);
    setFormTagline(project.tagline);
    setFormDescription(project.description);
    setFormLongDescription(project.longDescription || project.description);
    setFormArchitecture(project.architecture || "");
    setFormChallenges(project.challenges || "");
    setFormHighlightsText((project.highlights || []).join("\n"));
    setFormTagsText((project.tags || []).join(", "));
    setFormGithubUrl(project.githubUrl || "");
    setFormDemoUrl(project.demoUrl || "");
    setIsEditorOpen(true);
  };

  // Quick Toggle Status
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
      showToast(data.savedLocally ? "Status toggled & saved to projects.ts" : "Status toggled in memory");
    } catch {
      showToast("Updated locally in browser state");
    }
  };

  // Delete project
  const handleDelete = async (slug: string, title: string) => {
    if (!window.confirm(`Are you sure you want to remove "${title}"?`)) return;

    const updated = projects.filter((p) => p.slug !== slug);
    setProjects(updated);

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", slug }),
      });
      const data = await res.json();
      showToast(data.savedLocally ? "Project removed from projects.ts" : "Project removed");
    } catch {
      showToast("Removed from browser state");
    }
  };

  // Save Project Form
  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug =
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
      slug,
      title: formTitle.trim(),
      date: new Date().toISOString().slice(0, 7),
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
      metricsDetail: [],
      stackLayers: [],
      status: formStatus,
    };

    let updatedList = [...projects];
    const existingIndex = updatedList.findIndex((p) => p.slug === slug || (editingSlug && p.slug === editingSlug));

    if (existingIndex >= 0) {
      updatedList[existingIndex] = { ...updatedList[existingIndex], ...projectData };
    } else {
      updatedList.unshift(projectData);
    }

    setProjects(updatedList);
    setIsEditorOpen(false);

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", project: projectData }),
      });
      const data = await res.json();
      showToast(data.savedLocally ? "Project saved to src/data/projects.ts" : "Project updated");
    } catch {
      showToast("Saved in local browser memory");
    }
  };

  // Export TS code to clipboard
  const handleCopyTsCode = () => {
    const code = `export interface ProjectMetric { label: string; value: string; }
export interface ProjectStackLayer { layer: string; technologies: string[]; }
export type ProjectStatus = "Existing" | "Planned";
export type ProjectCategory = "AI/ML" | "DevOps" | "Systems" | "Full-Stack";
export interface Project {
  slug: string; title: string; date: string; category: ProjectCategory; tagline: string;
  description: string; longDescription: string; highlights: string[]; architecture: string;
  challenges: string; tags: string[]; stars: number; highlight?: boolean; featured?: boolean;
  githubUrl: string; demoUrl?: string; writeupUrl?: string; metrics?: string;
  metricsDetail: ProjectMetric[]; stackLayers: ProjectStackLayer[]; image?: string;
  aliases?: string[]; status: ProjectStatus;
}

export const projectsList: Project[] = ${JSON.stringify(projects, null, 2)};
`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
    showToast("TypeScript code copied to clipboard!");
  };

  // Download projects.ts file
  const handleDownloadTs = () => {
    const code = `export interface ProjectMetric { label: string; value: string; }
export interface ProjectStackLayer { layer: string; technologies: string[]; }
export type ProjectStatus = "Existing" | "Planned";
export type ProjectCategory = "AI/ML" | "DevOps" | "Systems" | "Full-Stack";
export interface Project {
  slug: string; title: string; date: string; category: ProjectCategory; tagline: string;
  description: string; longDescription: string; highlights: string[]; architecture: string;
  challenges: string; tags: string[]; stars: number; highlight?: boolean; featured?: boolean;
  githubUrl: string; demoUrl?: string; writeupUrl?: string; metrics?: string;
  metricsDetail: ProjectMetric[]; stackLayers: ProjectStackLayer[]; image?: string;
  aliases?: string[]; status: ProjectStatus;
}

export const projectsList: Project[] = ${JSON.stringify(projects, null, 2)};
`;
    const blob = new Blob([code], { type: "text/typescript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projects.ts";
    a.click();
    URL.revokeObjectURL(url);
    showToast("projects.ts downloaded!");
  };

  // Auth Gate
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "420px",
            width: "100%",
            background: "var(--color-background-card, #151816)",
            border: "1px solid var(--color-border, rgba(255, 255, 255, 0.12))",
            padding: "2.5rem 2rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                background: "rgba(139, 179, 151, 0.12)",
                color: "var(--color-primary, #8bb397)",
                marginBottom: "1rem",
              }}
            >
              <Lock size={22} />
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--color-text-emphasized, #fff)",
                margin: "0 0 0.5rem 0",
              }}
            >
              Admin Portal
            </h1>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--color-text-muted, #8c93a0)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Enter the editorial passkey to manage projects and architecture specs.
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <input
                type="password"
                placeholder="Editorial Passkey (default: dilshan2026)"
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                autoFocus
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
                  color: "var(--color-text-emphasized, #fff)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  borderRadius: 0,
                  outline: "none",
                }}
              />
              {authError && (
                <div style={{ color: "#f87171", fontSize: "0.78rem", marginTop: "0.4rem" }}>{authError}</div>
              )}
            </div>

            <button
              type="submit"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.8rem 1.25rem",
                background: "var(--color-primary, #8bb397)",
                color: "#111413",
                fontWeight: 600,
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                border: "none",
                cursor: "pointer",
                borderRadius: 0,
              }}
            >
              <Unlock size={16} />
              <span>Unlock Dashboard</span>
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <Link
              href="/projects"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                color: "var(--color-text-muted)",
                textDecoration: "none",
              }}
            >
              &larr; Return to Public Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Live vs RFC counts
  const liveCount = projects.filter((p) => p.status === "Existing").length;
  const rfcCount = projects.filter((p) => p.status === "Planned").length;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem 6rem" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            background: "#151816",
            border: "1px solid var(--color-primary, #8bb397)",
            padding: "0.85rem 1.25rem",
            color: "var(--color-text-emphasized, #fff)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.82rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid var(--color-border, rgba(255, 255, 255, 0.08))",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-primary)",
              marginBottom: "0.25rem",
            }}
          >
            DILSHAN.DEV // SYSTEM CONSOLE
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.85rem",
              fontWeight: 800,
              color: "var(--color-text-emphasized, #fff)",
              margin: 0,
            }}
          >
            Project &amp; Spec Architecture Manager
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={handleOpenCreate}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.6rem 1rem",
              background: "var(--color-primary, #8bb397)",
              color: "#111413",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              border: "none",
              borderRadius: 0,
              cursor: "pointer",
            }}
          >
            <Plus size={15} />
            <span>New Project</span>
          </button>

          <button
            onClick={handleCopyTsCode}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.6rem 1rem",
              background: "transparent",
              color: "var(--color-text-emphasized, #fff)",
              border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              borderRadius: 0,
              cursor: "pointer",
            }}
          >
            {copiedCode ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
            <span>{copiedCode ? "Copied" : "Copy TS"}</span>
          </button>

          <button
            onClick={handleDownloadTs}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.6rem 1rem",
              background: "transparent",
              color: "var(--color-text-emphasized, #fff)",
              border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              borderRadius: 0,
              cursor: "pointer",
            }}
          >
            <Download size={14} />
            <span>Export</span>
          </button>

          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.6rem 1rem",
              background: "rgba(255, 255, 255, 0.05)",
              color: "var(--color-text-muted)",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              borderRadius: 0,
            }}
          >
            <span>Live Projects</span>
            <ExternalLink size={13} />
          </Link>

          <button
            onClick={handleLogout}
            style={{
              padding: "0.6rem 0.85rem",
              background: "transparent",
              color: "#94a3b8",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
            }}
          >
            Lock
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            padding: "1.25rem",
            background: "var(--color-background-card, rgba(255, 255, 255, 0.02))",
            border: "1px solid var(--color-border, rgba(255, 255, 255, 0.08))",
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
            TOTAL REPOSITORIES
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 700, color: "var(--color-text-emphasized)" }}>
            {projects.length}
          </div>
        </div>

        <div
          style={{
            padding: "1.25rem",
            background: "var(--color-background-card, rgba(255, 255, 255, 0.02))",
            border: "1px solid rgba(74, 222, 128, 0.25)",
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#4ade80" }}>
            ● LIVE BUILT SERVICES
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 700, color: "#4ade80" }}>{liveCount}</div>
        </div>

        <div
          style={{
            padding: "1.25rem",
            background: "var(--color-background-card, rgba(255, 255, 255, 0.02))",
            border: "1px solid rgba(147, 197, 253, 0.25)",
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#93c5fd" }}>
            ◌ RFC ARCHITECTURE SPECS
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 700, color: "#93c5fd" }}>{rfcCount}</div>
        </div>

        <div
          style={{
            padding: "1.25rem",
            background: "var(--color-background-card, rgba(255, 255, 255, 0.02))",
            border: "1px solid var(--color-border, rgba(255, 255, 255, 0.08))",
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
            ACTIVE CATEGORIES
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 700, color: "var(--color-primary)" }}>4 DOMAINS</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
          padding: "1rem 1.25rem",
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid var(--color-border, rgba(255, 255, 255, 0.08))",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: "1 1 280px" }}>
          <Search size={16} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search projects by title, slug, or tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: "var(--color-text-emphasized, #fff)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              outline: "none",
            }}
          />
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                padding: "4px 8px",
                background: selectedCategory === c ? "var(--color-primary)" : "transparent",
                color: selectedCategory === c ? "#111413" : "var(--color-text-muted)",
                border: "1px solid var(--color-border, rgba(255, 255, 255, 0.1))",
                cursor: "pointer",
                borderRadius: 0,
                fontWeight: selectedCategory === c ? 600 : 400,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div style={{ display: "flex", gap: "0.35rem" }}>
          <button
            onClick={() => setSelectedStatus("All")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              padding: "4px 8px",
              background: selectedStatus === "All" ? "rgba(255,255,255,0.15)" : "transparent",
              color: "var(--color-text-emphasized)",
              border: "1px solid var(--color-border, rgba(255, 255, 255, 0.1))",
              cursor: "pointer",
              borderRadius: 0,
            }}
          >
            All
          </button>
          <button
            onClick={() => setSelectedStatus("Existing")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              padding: "4px 8px",
              background: selectedStatus === "Existing" ? "rgba(74, 222, 128, 0.15)" : "transparent",
              color: "#4ade80",
              border: "1px solid rgba(74, 222, 128, 0.3)",
              cursor: "pointer",
              borderRadius: 0,
            }}
          >
            ● Live
          </button>
          <button
            onClick={() => setSelectedStatus("Planned")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              padding: "4px 8px",
              background: selectedStatus === "Planned" ? "rgba(147, 197, 253, 0.15)" : "transparent",
              color: "#93c5fd",
              border: "1px solid rgba(147, 197, 253, 0.3)",
              cursor: "pointer",
              borderRadius: 0,
            }}
          >
            ◌ RFC
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filteredProjects.length === 0 ? (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.9rem",
            }}
          >
            No matching projects found.
          </div>
        ) : (
          filteredProjects.map((p) => {
            const isLive = p.status === "Existing";
            return (
              <div
                key={p.slug}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center",
                  gap: "1.5rem",
                  padding: "1.25rem 1.5rem",
                  background: "var(--color-background-card, rgba(255, 255, 255, 0.02))",
                  border: "1px solid var(--color-border, rgba(255, 255, 255, 0.08))",
                  borderRadius: 0,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--color-primary)",
                        fontWeight: 600,
                      }}
                    >
                      {p.category}
                    </span>

                    {/* Quick Toggle Status Indicator */}
                    <button
                      onClick={() => handleToggleStatus(p.slug)}
                      title={`Click to switch status to ${isLive ? "RFC Spec" : "Live"}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        padding: "2px 7px",
                        border: isLive ? "1px solid rgba(74, 222, 128, 0.4)" : "1px solid rgba(147, 197, 253, 0.4)",
                        color: isLive ? "#4ade80" : "#93c5fd",
                        background: isLive ? "rgba(74, 222, 128, 0.08)" : "rgba(147, 197, 253, 0.08)",
                        cursor: "pointer",
                        borderRadius: 0,
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: isLive ? "#4ade80" : "#93c5fd",
                          display: "inline-block",
                        }}
                      />
                      {isLive ? "Live (Click to RFC)" : "RFC Spec (Click to Live)"}
                    </button>

                    {p.featured && (
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.68rem",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          padding: "2px 6px",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        Featured
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.3rem" }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "var(--color-text-emphasized, #fff)",
                        margin: 0,
                      }}
                    >
                      {p.title}
                    </h2>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      /{p.slug}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-text-muted)",
                      margin: "0 0 0.6rem 0",
                      lineHeight: 1.5,
                      maxWidth: "760px",
                    }}
                  >
                    {p.tagline}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {p.tags.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          padding: "1px 6px",
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          color: "var(--color-text)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 6 && (
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          padding: "1px 6px",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        +{p.tags.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Row Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Link
                    href={`/projects/${p.slug}`}
                    target="_blank"
                    title="View public detail page"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0.5rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <ExternalLink size={16} />
                  </Link>

                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub Repository"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0.5rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <GithubIcon size={16} />
                  </a>

                  <button
                    onClick={() => handleOpenEdit(p)}
                    title="Edit project"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.5rem 0.85rem",
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid var(--color-border, rgba(255, 255, 255, 0.12))",
                      color: "var(--color-text-emphasized)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      cursor: "pointer",
                      borderRadius: 0,
                    }}
                  >
                    <Edit3 size={13} />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(p.slug, p.title)}
                    title="Delete project"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0.5rem",
                      background: "transparent",
                      border: "1px solid rgba(248, 113, 113, 0.2)",
                      color: "#f87171",
                      cursor: "pointer",
                      borderRadius: 0,
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Project Editor Modal */}
      {isEditorOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#151816",
              border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
              padding: "2rem",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid var(--color-border, rgba(255, 255, 255, 0.1))",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "var(--color-text-emphasized, #fff)",
                  margin: 0,
                }}
              >
                {editingSlug ? "Edit Architecture Project" : "New Architecture Project"}
              </h2>
              <button
                onClick={() => setIsEditorOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--color-text-muted)",
                  cursor: "pointer",
                  padding: "0.25rem",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveForm} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Row 1: Title & Slug */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--color-text-muted)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => {
                      setFormTitle(e.target.value);
                      if (!editingSlug) {
                        setFormSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-|-$/g, "")
                        );
                      }
                    }}
                    placeholder="e.g. Real-Time Analytics Pipeline"
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
                      color: "#fff",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      borderRadius: 0,
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--color-text-muted)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="real-time-analytics-pipeline"
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
                      color: "#fff",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      borderRadius: 0,
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Category, Status, Featured */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--color-text-muted)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Category Domain *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ProjectCategory)}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: "#1c211e",
                      border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
                      color: "#fff",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      borderRadius: 0,
                    }}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--color-text-muted)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Status Indicator *
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as ProjectStatus)}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: "#1c211e",
                      border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
                      color: formStatus === "Existing" ? "#4ade80" : "#93c5fd",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      borderRadius: 0,
                    }}
                  >
                    <option value="Existing">● Live Built Service</option>
                    <option value="Planned">◌ RFC Architecture Spec</option>
                  </select>
                </div>

                <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "0.5rem" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      color: "var(--color-text-emphasized)",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      style={{ borderRadius: 0 }}
                    />
                    <span>Featured on Home</span>
                  </label>
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Tagline (One-sentence summary) *
                </label>
                <input
                  type="text"
                  required
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  placeholder="Document ingestion and semantic retrieval for grounded LLM applications."
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
                    color: "#fff",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    borderRadius: 0,
                  }}
                />
              </div>

              {/* System Overview (Long Description) */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.4rem",
                  }}
                >
                  System Overview (Editorial Prose)
                </label>
                <textarea
                  rows={4}
                  value={formLongDescription}
                  onChange={(e) => setFormLongDescription(e.target.value)}
                  placeholder="Comprehensive description of the service motivation, technical requirements, and system design."
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
                    color: "#fff",
                    fontFamily: "inherit",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    borderRadius: 0,
                  }}
                />
              </div>

              {/* Architecture & Data Flow */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Architecture &amp; Data Flow
                </label>
                <textarea
                  rows={3}
                  value={formArchitecture}
                  onChange={(e) => setFormArchitecture(e.target.value)}
                  placeholder="Ingestion pipeline -> Vector Store -> LLM Context Assembly -> Server-Sent Event Streaming"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
                    color: "#fff",
                    fontFamily: "inherit",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    borderRadius: 0,
                  }}
                />
              </div>

              {/* Highlights */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Key Highlights (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formHighlightsText}
                  onChange={(e) => setFormHighlightsText(e.target.value)}
                  placeholder="Modular API and service layer separation&#10;PostgreSQL pgvector semantic search&#10;SSE streaming response endpoint"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
                    color: "#fff",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.82rem",
                    lineHeight: 1.5,
                    borderRadius: 0,
                  }}
                />
              </div>

              {/* Engineering Trade-offs / Challenges */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Engineering Trade-offs &amp; Challenges
                </label>
                <textarea
                  rows={2}
                  value={formChallenges}
                  onChange={(e) => setFormChallenges(e.target.value)}
                  placeholder="Vector indexing tradeoffs, cache eviction strategies, cold start latency considerations."
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
                    color: "#fff",
                    fontFamily: "inherit",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    borderRadius: 0,
                  }}
                />
              </div>

              {/* Tags */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Tech Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formTagsText}
                  onChange={(e) => setFormTagsText(e.target.value)}
                  placeholder="Python, FastAPI, PostgreSQL, pgvector, Docker, Redis"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
                    color: "#fff",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    borderRadius: 0,
                  }}
                />
              </div>

              {/* URLs: GitHub & Live Demo */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--color-text-muted)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    GitHub URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formGithubUrl}
                    onChange={(e) => setFormGithubUrl(e.target.value)}
                    placeholder="https://github.com/dilshandevxx/..."
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
                      color: "#fff",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      borderRadius: 0,
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--color-text-muted)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formDemoUrl}
                    onChange={(e) => setFormDemoUrl(e.target.value)}
                    placeholder="https://..."
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid var(--color-border, rgba(255, 255, 255, 0.15))",
                      color: "#fff",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      borderRadius: 0,
                    }}
                  />
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.75rem",
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--color-border, rgba(255, 255, 255, 0.1))",
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  style={{
                    padding: "0.65rem 1.25rem",
                    background: "transparent",
                    border: "1px solid var(--color-border, rgba(255, 255, 255, 0.2))",
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    borderRadius: 0,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.65rem 1.5rem",
                    background: "var(--color-primary, #8bb397)",
                    border: "none",
                    color: "#111413",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderRadius: 0,
                    cursor: "pointer",
                  }}
                >
                  <Sparkles size={15} />
                  <span>{editingSlug ? "Update Project" : "Create Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
