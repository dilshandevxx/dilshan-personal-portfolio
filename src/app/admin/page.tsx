"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar, AdminViewType } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";
import { GlobalSearchModal } from "./components/GlobalSearchModal";
import { WebsitePreviewModal } from "./components/WebsitePreviewModal";
import { OverviewView } from "./views/OverviewView";
import { HomepageView } from "./views/HomepageView";
import { ProjectsView } from "./views/ProjectsView";
import { ProjectEditorModal } from "./views/ProjectEditorModal";
import { MediaLibraryView } from "./views/MediaLibraryView";
import { GlobalSettingsView } from "./views/GlobalSettingsView";
import { PagesView } from "./views/PagesView";
import { AdminErrorBoundary } from "./components/AdminErrorBoundary";
import styles from "./admin.module.css";
import {
  cmsDataStore,
  HomepageCMSData,
  CMSMediaAsset,
  CMSGlobalSettings,
  CMSActivityLog,
  DEFAULT_HOMEPAGE_DATA,
  DEFAULT_GLOBAL_SETTINGS,
} from "@/services/cmsDataStore";
import { Project } from "@/data/projects";
import { isSanityConfigured } from "@/sanity/client";
import { Check } from "lucide-react";

export default function AdminDashboardPage() {
  // Navigation & Layout State
  const [currentView, setCurrentView] = useState<AdminViewType>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Modals State
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState<boolean>(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data Store State
  const [projects, setProjects] = useState<Project[]>([]);
  const [homepageData, setHomepageData] = useState<HomepageCMSData | null>(null);
  const [mediaAssets, setMediaAssets] = useState<CMSMediaAsset[]>([]);
  const [globalSettings, setGlobalSettings] = useState<CMSGlobalSettings | null>(null);
  const [activities, setActivities] = useState<CMSActivityLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Show Toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Initial Data Load
  const refreshData = async () => {
    try {
      const [allProjects, hp, media, settings, acts] = await Promise.all([
        cmsDataStore.getProjects(),
        cmsDataStore.getHomepageData(),
        cmsDataStore.getMediaAssets(),
        cmsDataStore.getGlobalSettings(),
        cmsDataStore.getActivityLogs(),
      ]);

      setProjects(allProjects);
      setHomepageData(hp);
      setMediaAssets(media);
      setGlobalSettings(settings);
      setActivities(acts);
    } catch (e) {
      console.error("Failed to load CMS data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle Projects Actions
  const handleSaveProject = async (projectToSave: Project) => {
    await cmsDataStore.saveProject(projectToSave);
    await refreshData();
    triggerToast(`Project "${projectToSave.title}" saved successfully.`);
  };

  const handleDeleteProject = async (slug: string) => {
    await cmsDataStore.deleteProject(slug);
    await refreshData();
    triggerToast("Project removed from catalog.");
  };

  const handleToggleFeatured = async (slug: string) => {
    const isNowFeatured = await cmsDataStore.toggleFeatured(slug);
    await refreshData();
    triggerToast(
      isNowFeatured
        ? "Project marked as featured on homepage."
        : "Project unfeatured from homepage."
    );
  };

  const handleOpenAddProject = () => {
    setEditingProject(null);
    setIsEditorModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsEditorModalOpen(true);
  };

  // Handle Homepage Save
  const handleSaveHomepage = async (newData: Partial<HomepageCMSData>) => {
    await cmsDataStore.saveHomepageData(newData);
    await refreshData();
    triggerToast("Homepage layout & showcase updated.");
  };

  // Handle Media Actions
  const handleAddMedia = async (asset: Omit<CMSMediaAsset, "id" | "createdAt">) => {
    await cmsDataStore.addMediaAsset(asset);
    await refreshData();
    triggerToast(`Asset "${asset.name}" added to media library.`);
  };

  const handleAddMultipleMedia = async (assets: Omit<CMSMediaAsset, "id" | "createdAt">[]) => {
    await cmsDataStore.addMediaAssets(assets);
    await refreshData();
    triggerToast(`Added ${assets.length} media assets to library.`);
  };

  const handleDeleteMedia = async (id: string) => {
    await cmsDataStore.deleteMediaAsset(id);
    await refreshData();
    triggerToast("Asset removed from media library.");
  };

  // Handle Global Settings Save
  const handleSaveSettings = async (newSettings: Partial<CMSGlobalSettings>) => {
    await cmsDataStore.saveGlobalSettings(newSettings);
    await refreshData();
    triggerToast("Global branding, navigation & SEO settings saved.");
  };

  // Handle Sync All Data to Sanity Cloud
  const handleSyncToSanity = async () => {
    const res = await cmsDataStore.syncAllToSanity();
    await refreshData();
    triggerToast(`Successfully synced ${res.projectCount} projects & homepage to Sanity Cloud!`);
  };

  // Switch view handler
  const handleSelectView = (view: AdminViewType) => {
    if (view === "projects-add") {
      handleOpenAddProject();
      return;
    }
    setCurrentView(view);
  };

  // Overview metrics computation
  const publishedCount = projects.filter(
    (p) => p.status === "Existing" || (p as any).status === "Published"
  ).length;
  const draftCount = projects.filter(
    (p) => p.status === "Planned" || (p as any).status === "Draft"
  ).length;
  const featuredCount = projects.filter((p) => p.featured || p.highlight).length;

  const metricsData = {
    totalProjects: projects.length,
    publishedProjects: publishedCount,
    draftProjects: draftCount,
    featuredProjects: featuredCount,
    mediaCount: mediaAssets.length,
    recentProjects: projects.slice(0, 5),
    activities: activities.slice(0, 6),
    isSanityReady: isSanityConfigured(),
    systemHealth: "Optimal",
    liveVersion: "Next.js 16.4 / React 19",
  };

  return (
    <div className={styles.dashboardRoot}>
      {/* 1. Left Fixed Sidebar */}
      <AdminSidebar
        currentView={currentView}
        onSelectView={handleSelectView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        mediaCount={mediaAssets.length}
        projectCount={projects.length}
      />

      {/* 2. Main Wrapper with Top Header & Active View */}
      <div
        className={`${styles.mainWrapper} ${
          sidebarCollapsed ? styles.mainWrapperSidebarCollapsed : ""
        }`}
      >
        <AdminHeader
          currentView={currentView}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenPreview={() => setIsPreviewOpen(true)}
          isSanityConfigured={isSanityConfigured()}
        />

        <main className={styles.contentArea}>
          {loading ? (
            <div className={styles.emptyState} style={{ minHeight: "400px" }}>
              <div className={styles.spinner} style={{ width: 28, height: 28 }} />
              <p className={styles.emptyStateText} style={{ marginTop: "1rem" }}>
                Initializing Dilshan Studio CMS workspace...
              </p>
            </div>
          ) : (
            <AdminErrorBoundary onReset={refreshData}>
              {/* Overview View */}
              {currentView === "overview" && (
                <OverviewView
                  onSelectView={handleSelectView}
                  onEditProject={handleEditProject}
                  onAddNewProject={handleOpenAddProject}
                  onSyncToSanity={handleSyncToSanity}
                  metrics={metricsData}
                />
              )}

              {/* Homepage Sections */}
              {currentView.startsWith("homepage-") && (
                <HomepageView
                  initialSubTab={
                    currentView.replace("homepage-", "") as
                      | "hero"
                      | "intro"
                      | "featured"
                      | "services"
                      | "about"
                      | "contact"
                  }
                  data={homepageData || DEFAULT_HOMEPAGE_DATA}
                  allProjects={projects}
                  onSave={handleSaveHomepage}
                />
              )}

              {/* Projects Views */}
              {(currentView === "projects-all" ||
                currentView === "projects-categories" ||
                currentView === "projects-cards") && (
                <ProjectsView
                  projects={projects}
                  onAddNew={handleOpenAddProject}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                  onToggleFeatured={handleToggleFeatured}
                  initialTab={
                    currentView === "projects-cards"
                      ? "card-layout"
                      : currentView === "projects-categories"
                      ? "categories"
                      : "all"
                  }
                />
              )}

              {/* Website Pages Views */}
              {currentView.startsWith("pages-") && (
                <PagesView
                  pageType={
                    currentView.replace("pages-", "") as "about" | "projects" | "contact"
                  }
                />
              )}

              {/* Media Library */}
              {(currentView === "media-library" || currentView === "media-add") && (
                <MediaLibraryView
                  assets={mediaAssets}
                  onAddAsset={handleAddMedia}
                  onAddAssets={handleAddMultipleMedia}
                  onDeleteAsset={handleDeleteMedia}
                  initialTab={currentView === "media-add" ? "add" : "library"}
                />
              )}

              {/* Global Settings */}
              {currentView.startsWith("settings-") && (
                <GlobalSettingsView
                  initialSubTab={
                    currentView.replace("settings-", "") as
                      | "nav"
                      | "branding"
                      | "social"
                      | "footer"
                      | "seo"
                      | "cards"
                  }
                  settings={globalSettings || DEFAULT_GLOBAL_SETTINGS}
                  onSave={handleSaveSettings}
                />
              )}
            </AdminErrorBoundary>
          )}
        </main>
      </div>

      {/* 3. Global Command Palette Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectView={handleSelectView}
        onSelectProject={(slug) => {
          const match = projects.find((p) => p.slug === slug);
          if (match) {
            handleEditProject(match);
          } else {
            setCurrentView("projects-all");
          }
        }}
        projects={projects}
      />

      {/* 4. Live Website Preview Viewport Modal */}
      <WebsitePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

      {/* 5. Comprehensive 8-Section Project Editor Modal */}
      <ProjectEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        project={editingProject}
        onSave={handleSaveProject}
      />

      {/* 6. Toast Notification */}
      {toastMessage && (
        <div className={styles.toastRoot}>
          <Check size={16} style={{ color: "#22c55e" }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
