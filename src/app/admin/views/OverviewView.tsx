"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FolderKanban,
  CheckCircle,
  FileClock,
  Image as ImageIcon,
  Plus,
  Home,
  Sliders,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import styles from "../admin.module.css";
import { AdminViewType } from "../components/AdminSidebar";
import { Project, getProjectThumbnail } from "@/data/projects";
import { CMSActivityLog } from "@/services/cmsDataStore";

interface OverviewViewProps {
  onSelectView: (view: AdminViewType) => void;
  onEditProject: (project: Project) => void;
  onAddNewProject: () => void;
  onSyncToSanity?: () => Promise<void>;
  metrics: {
    totalProjects: number;
    publishedProjects: number;
    draftProjects: number;
    featuredProjects: number;
    mediaCount: number;
    recentProjects: Project[];
    activities: CMSActivityLog[];
    isSanityReady: boolean;
    systemHealth: string;
    liveVersion: string;
  };
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectView,
  onEditProject,
  onAddNewProject,
  onSyncToSanity,
  metrics,
}) => {
  const [syncing, setSyncing] = React.useState(false);
  const [synced, setSynced] = React.useState(false);

  const handleSync = async () => {
    if (!onSyncToSanity) return;
    setSyncing(true);
    setSynced(false);
    try {
      await onSyncToSanity();
      setSynced(true);
      setTimeout(() => setSynced(false), 3500);
    } finally {
      setSyncing(false);
    }
  };

  // Determine greeting by time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning, Dilshan.";
    if (hour < 17) return "Good afternoon, Dilshan.";
    return "Good evening, Dilshan.";
  };

  return (
    <div>
      {/* View Header */}
      <div className={styles.viewHeader}>
        <div className={styles.viewTitleGroup}>
          <h1 className={styles.viewTitle}>{getGreeting()}</h1>
          <p className={styles.viewSubtitle}>
            Welcome to your personal portfolio command center. Manage high-throughput project case studies,
            editorial content, Cloudinary media assets, and Sanity CMS synchronization.
          </p>
        </div>

        <div className={styles.viewActions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onAddNewProject}
          >
            <Plus size={15} />
            <span>Add Project</span>
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => onSelectView("homepage-hero")}
          >
            <Home size={15} />
            <span>Edit Homepage</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span>TOTAL PROJECTS</span>
            <FolderKanban size={16} />
          </div>
          <div className={styles.metricValue}>{metrics.totalProjects}</div>
          <div className={styles.metricFooter}>
            <span>All cataloged systems and case studies</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span>PUBLISHED</span>
            <CheckCircle size={16} style={{ color: "#22c55e" }} />
          </div>
          <div className={styles.metricValue}>{metrics.publishedProjects}</div>
          <div className={styles.metricFooter}>
            <span>Live on public portfolio & search index</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span>DRAFT / PLANNED</span>
            <FileClock size={16} style={{ color: "#f59e0b" }} />
          </div>
          <div className={styles.metricValue}>{metrics.draftProjects}</div>
          <div className={styles.metricFooter}>
            <span>In development or review</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span>MEDIA ASSETS</span>
            <ImageIcon size={16} style={{ color: "#6366f1" }} />
          </div>
          <div className={styles.metricValue}>{metrics.mediaCount}</div>
          <div className={styles.metricFooter}>
            <span>Optimized Cloudinary & local assets</span>
          </div>
        </div>
      </div>

      {/* Panels Grid */}
      <div className={styles.overviewPanelsGrid}>
        {/* Left Panel: Recently Edited Projects */}
        <div className={styles.dashboardPanel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Recently Edited Projects</h3>
            <button
              type="button"
              className={styles.panelActionLink}
              onClick={() => onSelectView("projects-all")}
              style={{ background: "none", border: "none", padding: 0 }}
            >
              View all ({metrics.totalProjects})
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className={styles.tableRoot}>
              <thead>
                <tr className={styles.tableHeaderRow}>
                  <th className={styles.tableHeaderCell}>Project</th>
                  <th className={styles.tableHeaderCell}>Category</th>
                  <th className={styles.tableHeaderCell}>Status</th>
                  <th className={styles.tableHeaderCell} style={{ textAlign: "right" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {metrics.recentProjects.slice(0, 5).map((project, idx) => {
                  const thumbSrc = getProjectThumbnail(project.slug, project.image, idx);
                  const galleryCount = (project.gallery || []).length;
                  const hasPoster = Boolean(project.videoDemo?.thumbnail);
                  const insideTotal = galleryCount + (hasPoster ? 1 : 0);

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
                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                              <span className={styles.projectCellSlug}>/{project.slug}</span>
                              <span className={styles.insideCountBadge} style={{ fontSize: "0.62rem" }}>
                                {insideTotal > 0 ? `1 + ${insideTotal} inside` : "1 cover"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    <td className={styles.tableCell} style={{ color: "#92949d" }}>
                      {project.category}
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
                    <td className={styles.tableCell} style={{ textAlign: "right" }}>
                      <button
                        type="button"
                        className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                        onClick={() => onEditProject(project)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel: Recent Activity & Status */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className={styles.dashboardPanel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Recent Workspace Activity</h3>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.activityList}>
                {metrics.activities.map((act) => (
                  <div key={act.id} className={styles.activityItem}>
                    <div className={styles.activityDot} />
                    <div className={styles.activityDetails}>
                      <span className={styles.activityAction}>{act.action}</span>
                      <span className={styles.activityTarget}>{act.target}</span>
                      <span className={styles.activityTime}>{act.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Publishing & Sanity Engine Card */}
          <div className={styles.dashboardPanel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Engine & Infrastructure</h3>
            </div>
            <div className={styles.panelBody} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.82rem",
                  paddingBottom: "0.65rem",
                  borderBottom: "1px solid #292b31",
                }}
              >
                <span style={{ color: "#92949d" }}>Content Engine</span>
                <span style={{ fontWeight: 600, color: metrics.isSanityReady ? "#22c55e" : "#f59e0b" }}>
                  {metrics.isSanityReady ? "Sanity Studio Connected" : "Local Sync Active"}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.82rem",
                  paddingBottom: "0.65rem",
                  borderBottom: "1px solid #292b31",
                }}
              >
                <span style={{ color: "#92949d" }}>Runtime Architecture</span>
                <span style={{ fontWeight: 600, color: "#f2f2f0" }}>{metrics.liveVersion}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.82rem",
                  paddingBottom: "0.65rem",
                  borderBottom: "1px solid #292b31",
                }}
              >
                <span style={{ color: "#92949d" }}>Production Cache</span>
                <span style={{ fontWeight: 600, color: "#22c55e" }}>Turbopack Validated</span>
              </div>

              {onSyncToSanity && (
                <div style={{ paddingTop: "0.4rem" }}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}
                    style={{ width: "100%", justifyContent: "center" }}
                    onClick={handleSync}
                    disabled={syncing}
                  >
                    {syncing ? (
                      <span className={styles.spinner} style={{ width: 13, height: 13 }} />
                    ) : synced ? (
                      <CheckCircle size={13} style={{ color: "#22c55e" }} />
                    ) : (
                      <Sparkles size={13} />
                    )}
                    <span>
                      {syncing
                        ? "Pushing Data to Sanity Cloud..."
                        : synced
                        ? "All Portfolio Data Synced!"
                        : "Push All Data to Sanity Cloud"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
