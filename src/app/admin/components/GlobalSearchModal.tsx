"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  Home,
  FolderKanban,
  FileText,
  Image as ImageIcon,
  Sliders,
  ArrowRight,
} from "lucide-react";
import styles from "../admin.module.css";
import { AdminViewType } from "./AdminSidebar";
import { Project } from "@/data/projects";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectView: (view: AdminViewType) => void;
  onSelectProject?: (slug: string) => void;
  projects: Project[];
}

interface SearchItem {
  id: string;
  title: string;
  category: string;
  view?: AdminViewType;
  projectSlug?: string;
  icon: React.ReactNode;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectView,
  onSelectProject,
  projects,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keybindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build searchable index
  const baseItems: SearchItem[] = [
    { id: "overview", title: "Overview Dashboard", category: "General", view: "overview", icon: <Home size={15} /> },
    { id: "hero", title: "Hero Section (Video & Headlines)", category: "Homepage", view: "homepage-hero", icon: <Home size={15} /> },
    { id: "intro", title: "Introduction & Narrative Bio", category: "Homepage", view: "homepage-intro", icon: <Home size={15} /> },
    { id: "featured", title: "Featured Projects Showcase", category: "Homepage", view: "homepage-featured", icon: <Home size={15} /> },
    { id: "services", title: "Services & Technical Expertise", category: "Homepage", view: "homepage-services", icon: <Home size={15} /> },
    { id: "about-preview", title: "About Preview Section", category: "Homepage", view: "homepage-about", icon: <Home size={15} /> },
    { id: "contact-sec", title: "Contact Information & Availability", category: "Homepage", view: "homepage-contact", icon: <Home size={15} /> },
    { id: "projects-all", title: "All Projects Catalog", category: "Projects", view: "projects-all", icon: <FolderKanban size={15} /> },
    { id: "projects-add", title: "Add New Project", category: "Projects", view: "projects-add", icon: <FolderKanban size={15} /> },
    { id: "projects-cat", title: "Project Categories & Filters", category: "Projects", view: "projects-categories", icon: <FolderKanban size={15} /> },
    { id: "pages-about", title: "About Me Page", category: "Pages", view: "pages-about", icon: <FileText size={15} /> },
    { id: "pages-proj", title: "Projects Index Page", category: "Pages", view: "pages-projects", icon: <FileText size={15} /> },
    { id: "pages-contact", title: "Contact Page", category: "Pages", view: "pages-contact", icon: <FileText size={15} /> },
    { id: "media", title: "Media Library (Cloudinary & Local)", category: "Media", view: "media-library", icon: <ImageIcon size={15} /> },
    { id: "set-nav", title: "Navigation Links Settings", category: "Settings", view: "settings-nav", icon: <Sliders size={15} /> },
    { id: "set-brand", title: "Branding, Accent Color & Typography", category: "Settings", view: "settings-branding", icon: <Sliders size={15} /> },
    { id: "set-social", title: "Social Profiles & Email", category: "Settings", view: "settings-social", icon: <Sliders size={15} /> },
    { id: "set-footer", title: "Footer & Copyright Statement", category: "Settings", view: "settings-footer", icon: <Sliders size={15} /> },
    { id: "set-seo", title: "SEO Metadata & Social Sharing", category: "Settings", view: "settings-seo", icon: <Sliders size={15} /> },
  ];

  const projectItems: SearchItem[] = projects.map((p) => ({
    id: `project-${p.slug}`,
    title: p.title,
    category: `Project (${p.category})`,
    projectSlug: p.slug,
    icon: <FolderKanban size={15} />,
  }));

  const allItems = [...baseItems, ...projectItems];

  const filteredItems = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems.slice(0, 10);

  const handleSelect = (item: SearchItem) => {
    if (item.projectSlug && onSelectProject) {
      onSelectProject(item.projectSlug);
    } else if (item.view) {
      onSelectView(item.view);
    }
    onClose();
  };

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalDialog}
        style={{ maxWidth: "580px", margin: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.commandPaletteInputWrap}>
          <Search size={18} className={styles.commandPaletteItemIcon} />
          <input
            ref={inputRef}
            type="text"
            className={styles.commandPaletteInput}
            placeholder="Search dashboard sections, projects, settings..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownList}
          />
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close search"
          >
            <X size={16} />
          </button>
        </div>

        <div className={styles.commandPaletteList}>
          {filteredItems.length === 0 ? (
            <div style={{ padding: "2rem 1rem", textAlign: "center", color: "#92949d", fontSize: "0.85rem" }}>
              No matches found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.commandPaletteItem} ${isActive ? styles.commandPaletteItemActive : ""}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <span className={styles.commandPaletteItemIcon}>{item.icon}</span>
                  <span style={{ fontWeight: 500, flex: 1, textAlign: "left" }}>{item.title}</span>
                  <span className={styles.commandPaletteBadge}>{item.category}</span>
                  {isActive && <ArrowRight size={13} style={{ color: "#6366f1", marginLeft: "0.25rem" }} />}
                </button>
              );
            })
          )}
        </div>

        <div
          style={{
            padding: "0.65rem 1.25rem",
            backgroundColor: "#101113",
            borderTop: "1px solid #292b31",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.72rem",
            color: "#65676e",
          }}
        >
          <span>Use ↑ and ↓ to navigate, Enter to select</span>
          <kbd className={styles.shortcutKbd}>ESC to dismiss</kbd>
        </div>
      </div>
    </div>
  );
};
