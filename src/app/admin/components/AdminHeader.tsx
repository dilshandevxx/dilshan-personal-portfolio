"use client";

import React from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Eye,
  ExternalLink,
  CheckCircle2,
  Database,
} from "lucide-react";
import styles from "../admin.module.css";
import { AdminViewType } from "./AdminSidebar";

interface AdminHeaderProps {
  currentView: AdminViewType;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  onOpenPreview: () => void;
  isSanityConfigured: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentView,
  onOpenMobileMenu,
  onOpenSearch,
  onOpenPreview,
  isSanityConfigured,
}) => {
  // Compute breadcrumbs and title
  const getBreadcrumbInfo = (): { parent?: string; current: string } => {
    switch (currentView) {
      case "overview":
        return { current: "Overview" };
      case "homepage-hero":
        return { parent: "Homepage", current: "Hero Section" };
      case "homepage-intro":
        return { parent: "Homepage", current: "Introduction" };
      case "homepage-featured":
        return { parent: "Homepage", current: "Featured Projects" };
      case "homepage-services":
        return { parent: "Homepage", current: "Services" };
      case "homepage-about":
        return { parent: "Homepage", current: "About Preview" };
      case "homepage-contact":
        return { parent: "Homepage", current: "Contact Section" };
      case "projects-all":
        return { parent: "Projects", current: "All Projects" };
      case "projects-add":
        return { parent: "Projects", current: "Add New Project" };
      case "projects-categories":
        return { parent: "Projects", current: "Categories" };
      case "pages-about":
        return { parent: "Website Pages", current: "About Page" };
      case "pages-projects":
        return { parent: "Website Pages", current: "Projects Page" };
      case "pages-contact":
        return { parent: "Website Pages", current: "Contact Page" };
      case "media-library":
        return { current: "Media Library" };
      case "settings-nav":
        return { parent: "Global Settings", current: "Navigation" };
      case "settings-branding":
        return { parent: "Global Settings", current: "Branding & Theme" };
      case "settings-social":
        return { parent: "Global Settings", current: "Social Links" };
      case "settings-footer":
        return { parent: "Global Settings", current: "Footer" };
      case "settings-seo":
        return { parent: "Global Settings", current: "SEO Settings" };
      case "settings-cards":
        return { parent: "Global Settings", current: "Project Card Line Limits" };
      default:
        return { current: "Dashboard" };
    }
  };

  const breadcrumbs = getBreadcrumbInfo();

  return (
    <header className={styles.topHeader}>
      <div className={styles.headerLeft}>
        <button
          type="button"
          className={styles.mobileMenuBtn}
          onClick={onOpenMobileMenu}
          aria-label="Open sidebar menu"
        >
          <Menu size={18} />
        </button>

        <nav aria-label="Breadcrumb" className={styles.breadcrumbNav}>
          <span className={styles.breadcrumbSegment}>Studio</span>
          {breadcrumbs.parent && (
            <>
              <span className={styles.breadcrumbDivider}>/</span>
              <span className={styles.breadcrumbSegment}>{breadcrumbs.parent}</span>
            </>
          )}
          <span className={styles.breadcrumbDivider}>/</span>
          <span className={styles.breadcrumbCurrent}>{breadcrumbs.current}</span>
        </nav>
      </div>

      <div className={styles.headerRight}>
        {/* Search trigger */}
        <button
          type="button"
          className={styles.searchTriggerBtn}
          onClick={onOpenSearch}
          aria-label="Search dashboard"
        >
          <Search size={14} />
          <span>Search</span>
          <kbd className={styles.shortcutKbd}>⌘K</kbd>
        </button>

        {/* Backend status indicator */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.72rem",
            padding: "0.25rem 0.55rem",
            borderRadius: "6px",
            backgroundColor: isSanityConfigured ? "rgba(34, 197, 94, 0.12)" : "rgba(255, 255, 255, 0.05)",
            border: isSanityConfigured ? "1px solid rgba(34, 197, 94, 0.25)" : "1px solid #292b31",
            color: isSanityConfigured ? "#22c55e" : "#92949d",
          }}
          title={
            isSanityConfigured
              ? "Connected to live Sanity Studio dataset"
              : "Local storage & Next.js API sync active. Configure Sanity env variables to enable cloud sync."
          }
        >
          {isSanityConfigured ? <CheckCircle2 size={12} /> : <Database size={12} />}
          <span>{isSanityConfigured ? "Sanity Live" : "Local Sync"}</span>
        </div>

        {/* Website Preview modal trigger */}
        <button
          type="button"
          className={styles.headerActionBtn}
          onClick={onOpenPreview}
          title="Preview website in responsive viewport"
        >
          <Eye size={14} />
          <span>Preview Website</span>
        </button>

        {/* View website link */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.headerActionBtn}
          title="Open live website in new tab"
        >
          <span>View Site</span>
          <ExternalLink size={13} />
        </Link>
      </div>
    </header>
  );
};
