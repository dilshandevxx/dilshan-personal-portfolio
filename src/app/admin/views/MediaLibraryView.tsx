"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Video,
  Image as ImageIcon,
  X,
  Layers,
} from "lucide-react";
import styles from "../admin.module.css";
import { CMSMediaAsset } from "@/services/cmsDataStore";

interface MediaLibraryViewProps {
  assets: CMSMediaAsset[];
  onAddAsset: (asset: Omit<CMSMediaAsset, "id" | "createdAt">) => Promise<void>;
  onDeleteAsset: (id: string) => Promise<void>;
}

export const MediaLibraryView: React.FC<MediaLibraryViewProps> = ({
  assets,
  onAddAsset,
  onDeleteAsset,
}) => {
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<CMSMediaAsset | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Add Asset Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({
    name: "",
    url: "",
    type: "image" as "image" | "video",
    format: "JPG",
    width: 1920,
    height: 1080,
    size: "450 KB",
    usedIn: [] as string[],
    cloudinaryPublicId: "",
  });

  const filteredAssets = assets.filter((asset) => {
    const matchesFilter = filterType === "all" || asset.type === filterType;
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCreateAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.name || !newAsset.url) return;
    await onAddAsset(newAsset);
    setIsAddModalOpen(false);
    setNewAsset({
      name: "",
      url: "",
      type: "image",
      format: "JPG",
      width: 1920,
      height: 1080,
      size: "450 KB",
      usedIn: [],
      cloudinaryPublicId: "",
    });
  };

  return (
    <div>
      {/* View Header */}
      <div className={styles.viewHeader}>
        <div className={styles.viewTitleGroup}>
          <h1 className={styles.viewTitle}>Media Library</h1>
          <p className={styles.viewSubtitle}>
            Centralized Cloudinary media store, video demonstrations, posters, and architectural diagrams.
          </p>
        </div>

        <div className={styles.viewActions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={15} />
            <span>Add Media Asset</span>
          </button>
        </div>
      </div>

      {/* Controls Bar: Search & Filter Pills */}
      <div className={styles.controlsBar}>
        <div className={styles.searchWrap}>
          <Search size={15} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search assets by filename or URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.controlsRight}>
          <div className={styles.viewToggleGroup}>
            <button
              type="button"
              className={`${styles.viewToggleBtn} ${filterType === "all" ? styles.viewToggleBtnActive : ""}`}
              onClick={() => setFilterType("all")}
            >
              All Assets ({assets.length})
            </button>
            <button
              type="button"
              className={`${styles.viewToggleBtn} ${filterType === "image" ? styles.viewToggleBtnActive : ""}`}
              onClick={() => setFilterType("image")}
            >
              Images ({assets.filter((a) => a.type === "image").length})
            </button>
            <button
              type="button"
              className={`${styles.viewToggleBtn} ${filterType === "video" ? styles.viewToggleBtnActive : ""}`}
              onClick={() => setFilterType("video")}
            >
              Videos ({assets.filter((a) => a.type === "video").length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Container: Media Grid & Inspector Drawer */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: selectedAsset ? "1fr 340px" : "1fr",
          gap: "1.5rem",
          alignItems: "start",
        }}
      >
        {/* Media Grid */}
        {filteredAssets.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>
              <ImageIcon size={22} />
            </div>
            <h3 className={styles.emptyStateTitle}>No media assets found</h3>
            <p className={styles.emptyStateText}>
              No items match your search. Click &ldquo;Add Media Asset&rdquo; above to register new Cloudinary or local assets.
            </p>
          </div>
        ) : (
          <div className={styles.mediaGrid}>
            {filteredAssets.map((asset) => {
              const isSelected = selectedAsset?.id === asset.id;
              return (
                <div
                  key={asset.id}
                  className={`${styles.mediaCard} ${isSelected ? styles.mediaCardSelected : ""}`}
                  onClick={() => setSelectedAsset(asset)}
                >
                  {/* Clean Thumbnail - Strictly NO text on image */}
                  <div className={styles.mediaThumbWrapper}>
                    {asset.type === "video" ? (
                      <video
                        src={asset.url}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        muted
                        playsInline
                      />
                    ) : (
                      <Image
                        src={asset.url}
                        alt={asset.name}
                        fill
                        sizes="240px"
                        className={styles.mediaThumbImg}
                      />
                    )}
                  </div>

                  {/* Metadata underneath thumbnail */}
                  <div className={styles.mediaMeta}>
                    <p className={styles.mediaTitle}>{asset.name}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span className={styles.mediaDimensions}>
                        {asset.format || (asset.type === "video" ? "MP4" : "IMG")}
                        {asset.size ? ` • ${asset.size}` : ""}
                      </span>

                      <button
                        type="button"
                        className={`${styles.btn} ${styles.btnGhost} ${styles.btnSm}`}
                        style={{ padding: "0.2rem 0.4rem" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(asset.url, asset.id);
                        }}
                        title="Copy URL"
                      >
                        {copiedId === asset.id ? (
                          <Check size={12} style={{ color: "#22c55e" }} />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Selected Asset Inspector Drawer */}
        {selectedAsset && (
          <div
            style={{
              backgroundColor: "#191b20",
              border: "1px solid #292b31",
              borderRadius: "8px",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              position: "sticky",
              top: "80px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "#f2f2f0" }}>
                Asset Inspector
              </h4>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setSelectedAsset(null)}
              >
                <X size={15} />
              </button>
            </div>

            {/* Large Preview */}
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 10",
                backgroundColor: "#0c0d10",
                borderRadius: "6px",
                overflow: "hidden",
                position: "relative",
                border: "1px solid #292b31",
              }}
            >
              {selectedAsset.type === "video" ? (
                <video
                  src={selectedAsset.url}
                  controls
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                <Image
                  src={selectedAsset.url}
                  alt={selectedAsset.name}
                  fill
                  sizes="320px"
                  style={{ objectFit: "contain" }}
                />
              )}
            </div>

            {/* Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.82rem" }}>
              <div>
                <span style={{ color: "#92949d" }}>Name: </span>
                <span style={{ fontWeight: 600, color: "#f2f2f0" }}>{selectedAsset.name}</span>
              </div>
              <div>
                <span style={{ color: "#92949d" }}>Type: </span>
                <span style={{ color: "#f2f2f0", textTransform: "capitalize" }}>{selectedAsset.type}</span>
              </div>
              {selectedAsset.width && selectedAsset.height && (
                <div>
                  <span style={{ color: "#92949d" }}>Dimensions: </span>
                  <span style={{ color: "#f2f2f0" }}>
                    {selectedAsset.width} × {selectedAsset.height} px
                  </span>
                </div>
              )}
              {selectedAsset.size && (
                <div>
                  <span style={{ color: "#92949d" }}>File Size: </span>
                  <span style={{ color: "#f2f2f0" }}>{selectedAsset.size}</span>
                </div>
              )}
              {selectedAsset.usedIn && selectedAsset.usedIn.length > 0 && (
                <div>
                  <span style={{ color: "#92949d" }}>Used in: </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginTop: "0.25rem" }}>
                    {selectedAsset.usedIn.map((place) => (
                      <span
                        key={place}
                        style={{
                          fontSize: "0.68rem",
                          padding: "0.15rem 0.45rem",
                          backgroundColor: "#101113",
                          border: "1px solid #292b31",
                          borderRadius: "4px",
                          color: "#92949d",
                        }}
                      >
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingTop: "0.5rem" }}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={() => handleCopyUrl(selectedAsset.url, selectedAsset.id)}
              >
                {copiedId === selectedAsset.id ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedId === selectedAsset.id ? "URL Copied to Clipboard" : "Copy Asset URL"}</span>
              </button>

              <a
                href={selectedAsset.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                <ExternalLink size={14} />
                <span>Open in New Tab</span>
              </a>

              <button
                type="button"
                className={`${styles.btn} ${styles.btnDanger}`}
                onClick={async () => {
                  if (confirm(`Remove asset "${selectedAsset.name}"?`)) {
                    await onDeleteAsset(selectedAsset.id);
                    setSelectedAsset(null);
                  }
                }}
              >
                <Trash2 size={14} />
                <span>Remove Asset</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Media Modal */}
      {isAddModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsAddModalOpen(false)}>
          <div
            className={styles.modalDialog}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "520px" }}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Add Media Asset</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setIsAddModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateAsset}>
              <div className={styles.modalBody}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Asset Name *</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      value={newAsset.name}
                      onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                      placeholder="e.g. Distributed Consensus Diagram"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Asset URL (Cloudinary / Local Path) *</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      value={newAsset.url}
                      onChange={(e) => setNewAsset({ ...newAsset, url: e.target.value })}
                      placeholder="https://res.cloudinary.com/... or /images/..."
                      required
                    />
                  </div>

                  <div className={styles.fieldGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Type</label>
                      <select
                        className={styles.selectField}
                        value={newAsset.type}
                        onChange={(e) =>
                          setNewAsset({ ...newAsset, type: e.target.value as "image" | "video" })
                        }
                      >
                        <option value="image">Image (JPG, PNG, WebP)</option>
                        <option value="video">Video (MP4, WebM)</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Approximate Size</label>
                      <input
                        type="text"
                        className={styles.inputField}
                        value={newAsset.size}
                        onChange={(e) => setNewAsset({ ...newAsset, size: e.target.value })}
                        placeholder="e.g. 520 KB"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Cloudinary Public ID (Optional)</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      value={newAsset.cloudinaryPublicId}
                      onChange={(e) =>
                        setNewAsset({ ...newAsset, cloudinaryPublicId: e.target.value })
                      }
                      placeholder="e.g. portfolio/skyline_twilight"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnGhost}`}
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
