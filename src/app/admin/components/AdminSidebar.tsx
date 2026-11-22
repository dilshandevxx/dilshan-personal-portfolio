"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Home,
  FolderKanban,
  FileText,
  Image as ImageIcon,
  Sliders,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Plus,
} from "lucide-react";
import styles from "../admin.module.css";

export type AdminViewType =
  | "overview"
  | "homepage-hero"
  | "homepage-intro"
  | "homepage-featured"
  | "homepage-services"
  | "homepage-about"
  | "homepage-contact"
  | "projects-all"
  | "projects-add"
  | "projects-categories"
  | "projects-cards"
  | "pages-about"
  | "pages-projects"
  | "pages-contact"
  | "media-library"
  | "settings-nav"
  | "settings-branding"
  | "settings-social"
  | "settings-footer"
  | "settings-seo"
  | "settings-cards";

interface AdminSidebarProps {
  currentView: AdminViewType;
  onSelectView: (view: AdminViewType) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  mediaCount: number;
  projectCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentView,
  onSelectView,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  mediaCount,
  projectCount,
}) => {
  // Navigation groups collapsed state - default open for active section or collapsed as preferred
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({
    homepage: currentView.startsWith("homepage"),
    projects: currentView.startsWith("projects"),
    pages: currentView.startsWith("pages"),
    settings: currentView.startsWith("settings"),
  });

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleItemClick = (view: AdminViewType) => {
    onSelectView(view);
    if (mobileOpen) {
      onCloseMobile();
    }
  };

  return (
    <>
      {mobileOpen && <div className={styles.sidebarBackdrop} onClick={onCloseMobile} />}

      <aside
        className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ""} ${
          mobileOpen ? styles.sidebarMobileOpen : ""
        }`}
      >
        {/* Header Branding */}
        <div className={styles.sidebarHeader}>
          {!collapsed ? (
            <Link href="/admin" className={styles.brandingGroup} onClick={() => handleItemClick("overview")}>
              <div className={styles.studioLogoBadge}>D</div>
              <div className={styles.studioTitleWrap}>
                <span className={styles.studioBrandTitle}>DILSHAN STUDIO</span>
                <span className={styles.studioVersionPill}>v2.4 Editorial Pro</span>
              </div>
            </Link>
          ) : (
            <div className={styles.studioLogoBadge}>D</div>
          )}

          <button
            type="button"
            className={styles.collapseTriggerBtn}
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation list */}
        <nav className={styles.sidebarNav}>
          {/* 1. Overview */}
          <div className={styles.navGroup}>
            <button
              type="button"
              className={`${styles.navItemBtn} ${currentView === "overview" ? styles.navItemBtnActive : ""}`}
              onClick={() => handleItemClick("overview")}
            >
              <LayoutDashboard size={16} />
              {!collapsed && <span>Overview</span>}
            </button>
          </div>

          {/* 2. Homepage Group */}
          <div className={styles.navGroup}>
            {!collapsed ? (
              <button
                type="button"
                className={styles.groupHeaderBtn}
                onClick={() => toggleGroup("homepage")}
              >
                <span className={styles.groupTitleWithIcon}>
                  <Home size={14} />
                  <span>Homepage</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`${styles.groupChevron} ${!openGroups.homepage ? styles.groupChevronClosed : ""}`}
                />
              </button>
            ) : null}

            {(!collapsed && openGroups.homepage) || collapsed ? (
              <div className={!collapsed ? styles.groupSubItems : ""}>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "homepage-hero" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("homepage-hero")}
                  title="Hero Section"
                >
                  {collapsed ? <Home size={16} /> : null}
                  <span>Hero Section</span>
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "homepage-intro" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("homepage-intro")}
                  title="Introduction"
                >
                  <span>Introduction</span>
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "homepage-featured" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("homepage-featured")}
                  title="Featured Projects"
                >
                  <span>Featured Projects</span>
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "homepage-services" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("homepage-services")}
                  title="Services"
                >
                  <span>Services</span>
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "homepage-about" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("homepage-about")}
                  title="About Preview"
                >
                  <span>About Preview</span>
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "homepage-contact" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("homepage-contact")}
                  title="Contact Section"
                >
                  <span>Contact Section</span>
                </button>
              </div>
            ) : null}
          </div>

          {/* 3. Projects Group */}
          <div className={styles.navGroup}>
            {!collapsed ? (
              <button
                type="button"
                className={styles.groupHeaderBtn}
                onClick={() => toggleGroup("projects")}
              >
                <span className={styles.groupTitleWithIcon}>
                  <FolderKanban size={14} />
                  <span>Projects</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`${styles.groupChevron} ${!openGroups.projects ? styles.groupChevronClosed : ""}`}
                />
              </button>
            ) : null}

            {(!collapsed && openGroups.projects) || collapsed ? (
              <div className={!collapsed ? styles.groupSubItems : ""}>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "projects-all" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("projects-all")}
                  title="All Projects"
                >
                  {collapsed ? <FolderKanban size={16} /> : null}
                  <span>All Projects</span>
                  {!collapsed && <span className={styles.navItemBadge}>{projectCount}</span>}
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "projects-add" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("projects-add")}
                  title="Add New Project"
                >
                  <Plus size={14} />
                  <span>Add New Project</span>
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "projects-categories" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("projects-categories")}
                  title="Categories"
                >
                  <span>Categories</span>
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "projects-cards" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("projects-cards")}
                  title="Card Layout & Line Limits"
                >
                  <Sliders size={14} />
                  <span>Card Line Limits</span>
                </button>
              </div>
            ) : null}
          </div>

          {/* 4. Website Pages Group */}
          <div className={styles.navGroup}>
            {!collapsed ? (
              <button
                type="button"
                className={styles.groupHeaderBtn}
                onClick={() => toggleGroup("pages")}
              >
                <span className={styles.groupTitleWithIcon}>
                  <FileText size={14} />
                  <span>Website Pages</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`${styles.groupChevron} ${!openGroups.pages ? styles.groupChevronClosed : ""}`}
                />
              </button>
            ) : null}

            {(!collapsed && openGroups.pages) || collapsed ? (
              <div className={!collapsed ? styles.groupSubItems : ""}>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "pages-about" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("pages-about")}
                  title="About Page"
                >
                  {collapsed ? <FileText size={16} /> : null}
                  <span>About</span>
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "pages-projects" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("pages-projects")}
                  title="Projects Page"
                >
                  <span>Projects</span>
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "pages-contact" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("pages-contact")}
                  title="Contact Page"
                >
                  <span>Contact</span>
                </button>
              </div>
            ) : null}
          </div>

          {/* 5. Media Library */}
          <div className={styles.navGroup}>
            <button
              type="button"
              className={`${styles.navItemBtn} ${currentView === "media-library" ? styles.navItemBtnActive : ""}`}
              onClick={() => handleItemClick("media-library")}
              title="Media Library"
            >
              <ImageIcon size={16} />
              {!collapsed && <span>Media Library</span>}
              {!collapsed && <span className={styles.navItemBadge}>{mediaCount}</span>}
            </button>
          </div>

          {/* 6. Global Settings Group */}
          <div className={styles.navGroup}>
            {!collapsed ? (
              <button
                type="button"
                className={styles.groupHeaderBtn}
                onClick={() => toggleGroup("settings")}
              >
                <span className={styles.groupTitleWithIcon}>
                  <Sliders size={14} />
                  <span>Global Settings</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`${styles.groupChevron} ${!openGroups.settings ? styles.groupChevronClosed : ""}`}
                />
              </button>
            ) : null}

            {(!collapsed && openGroups.settings) || collapsed ? (
              <div className={!collapsed ? styles.groupSubItems : ""}>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "settings-nav" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("settings-nav")}
                  title="Navigation"
                >
                  {collapsed ? <Sliders size={16} /> : null}
                  <span>Navigation</span>
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "settings-branding" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("settings-branding")}
                  title="Branding & Theme"
                >
                  <span>Branding & Theme</span>
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "settings-social" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("settings-social")}
                  title="Social Links"
                >
                  <span>Social Links</span>
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "settings-footer" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("settings-footer")}
                  title="Footer"
                >
                  <span>Footer</span>
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "settings-seo" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("settings-seo")}
                  title="SEO Settings"
                >
                  <span>SEO Settings</span>
                </button>
                <button
                  type="button"
                  className={`${styles.navItemBtn} ${currentView === "settings-cards" ? styles.navItemBtnActive : ""}`}
                  onClick={() => handleItemClick("settings-cards")}
                  title="Project Card Line Limits"
                >
                  <span>Card Line Limits</span>
                </button>
              </div>
            ) : null}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className={styles.sidebarFooter}>
          <div className={styles.userProfileSnippet}>
            <div className={styles.userAvatar}>D</div>
            {!collapsed && (
              <div className={styles.userInfoText}>
                <span className={styles.userName}>Dilshan</span>
                <span className={styles.userRole}>Systems Architect</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
