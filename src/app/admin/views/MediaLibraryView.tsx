"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Upload,
  Link as LinkIcon,
  Film,
  Loader2,
  AlertCircle,
  FileText,
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
  const [modalTab, setModalTab] = useState<"upload" | "image-url" | "video-url">("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Form State
  const [assetForm, setAssetForm] = useState({
    name: "",
    url: "",
    type: "image" as "image" | "video",
    format: "JPG",
    width: 0,
    height: 0,
    size: "",
    usedIn: [] as string[],
    usedInInput: "",
    cloudinaryPublicId: "",
  });

  // URL Live Preview Verification
  const [urlPreviewStatus, setUrlPreviewStatus] = useState<"idle" | "loading" | "valid" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtered Assets
  const filteredAssets = assets.filter((asset) => {
    const matchesFilter = filterType === "all" || asset.type === filterType;
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.format && asset.format.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Copy URL with visual check
  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Helper to extract clean human-readable name from URL
  const extractNameFromUrl = (url: string): string => {
    try {
      const parts = url.split("?")[0].split("/");
      const filename = parts[parts.length - 1];
      const nameWithoutExt = filename.substring(0, filename.lastIndexOf(".")) || filename;
      return nameWithoutExt
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    } catch {
      return "Untitled Asset";
    }
  };

  // Live URL validation & metadata extraction for Image URL
  useEffect(() => {
    if (modalTab !== "image-url" || !assetForm.url) {
      if (!assetForm.url) setUrlPreviewStatus("idle");
      return;
    }

    setUrlPreviewStatus("loading");
    const img = new window.Image();
    img.onload = () => {
      setUrlPreviewStatus("valid");
      setAssetForm((prev) => ({
        ...prev,
        width: img.naturalWidth,
        height: img.naturalHeight,
        name: prev.name || extractNameFromUrl(prev.url),
        format: prev.url.endsWith(".png")
          ? "PNG"
          : prev.url.endsWith(".webp")
          ? "WEBP"
          : prev.url.endsWith(".avif")
          ? "AVIF"
          : "JPG",
      }));
    };
    img.onerror = () => {
      setUrlPreviewStatus("error");
    };
    img.src = assetForm.url;
  }, [assetForm.url, modalTab]);

  // Video URL verification
  const handleVideoUrlChange = (url: string) => {
    const ext = url.split(".").pop()?.toUpperCase() || "MP4";
    setAssetForm((prev) => ({
      ...prev,
      url,
      type: "video",
      format: ext.includes("WEBM") ? "WEBM" : "MP4",
      name: prev.name || extractNameFromUrl(url),
    }));
  };

  // Handle Direct File Upload (via API route)
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "File upload failed");
      }

      const data = await res.json();
      if (data.success && data.asset) {
        setAssetForm({
          name: data.asset.name,
          url: data.asset.url,
          type: data.asset.type,
          format: data.asset.format,
          width: data.asset.width || 0,
          height: data.asset.height || 0,
          size: data.asset.size,
          usedIn: [],
          usedInInput: "",
          cloudinaryPublicId: "",
        });
      }
    } catch (err: any) {
      console.error("[Upload error]:", err);
      setUploadError(err.message || "Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Submit asset to CMS Data Store
  const handleSaveAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetForm.name || !assetForm.url) return;

    const usedInArray = assetForm.usedInInput
      ? assetForm.usedInInput.split(",").map((s) => s.trim()).filter(Boolean)
      : assetForm.usedIn;

    await onAddAsset({
      name: assetForm.name,
      url: assetForm.url,
      type: assetForm.type,
      format: assetForm.format,
      width: assetForm.width || undefined,
      height: assetForm.height || undefined,
      size: assetForm.size || undefined,
      usedIn: usedInArray,
      cloudinaryPublicId: assetForm.cloudinaryPublicId || undefined,
    });

    setIsAddModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setAssetForm({
      name: "",
      url: "",
      type: "image",
      format: "JPG",
      width: 0,
      height: 0,
      size: "",
      usedIn: [],
      usedInInput: "",
      cloudinaryPublicId: "",
    });
    setUploadError(null);
    setUrlPreviewStatus("idle");
  };

  return (
    <div>
      {/* View Header */}
      <div className={styles.viewHeader}>
        <div className={styles.viewTitleGroup}>
          <h1 className={styles.viewTitle}>Media Assets Library</h1>
          <p className={styles.viewSubtitle}>
            Centralized media storage: upload images & videos, register external URLs, and copy links for cards, banners, and project case studies.
          </p>
        </div>

        <div className={styles.viewActions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
          >
            <Plus size={15} />
            <span>Add Asset (Upload / URL)</span>
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
            placeholder="Search assets by name, URL, format (e.g. WebP, MP4)..."
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
          gridTemplateColumns: selectedAsset ? "1fr 360px" : "1fr",
          gap: "1.5rem",
          alignItems: "start",
        }}
      >
        {/* Media Grid */}
        {filteredAssets.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>
              <ImageIcon size={24} />
            </div>
            <h3 className={styles.emptyStateTitle}>No media assets found</h3>
            <p className={styles.emptyStateText}>
              No media items match your search. Click &ldquo;Add Asset&rdquo; above to upload a file or register an image/video URL.
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
                        sizes="260px"
                        className={styles.mediaThumbImg}
                        unoptimized={asset.url.startsWith("http")}
                      />
                    )}
                  </div>

                  {/* Metadata underneath thumbnail */}
                  <div className={styles.mediaMeta}>
                    <p className={styles.mediaTitle} title={asset.name}>
                      {asset.name}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span className={styles.mediaDimensions}>
                        {asset.format || (asset.type === "video" ? "MP4" : "IMG")}
                        {asset.width && asset.height ? ` • ${asset.width}×${asset.height}` : ""}
                        {asset.size ? ` • ${asset.size}` : ""}
                      </span>

                      <button
                        type="button"
                        className={`${styles.btn} ${styles.btnGhost} ${styles.btnSm}`}
                        style={{ padding: "0.25rem 0.5rem" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(asset.url, asset.id);
                        }}
                        title="Copy Asset URL"
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
              backgroundColor: "#16171b",
              border: "1px solid #282a32",
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

            {/* Large Live Preview */}
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 10",
                backgroundColor: "#0c0d10",
                borderRadius: "6px",
                overflow: "hidden",
                position: "relative",
                border: "1px solid #282a32",
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
                  sizes="360px"
                  style={{ objectFit: "contain" }}
                  unoptimized={selectedAsset.url.startsWith("http")}
                />
              )}
            </div>

            {/* URL Box with One-Click Copy */}
            <div className={styles.formGroup} style={{ gap: "0.35rem" }}>
              <label className={styles.formLabel}>Asset URL</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  readOnly
                  value={selectedAsset.url}
                  className={styles.inputField}
                  style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono, monospace)" }}
                />
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  style={{ padding: "0 0.85rem", whiteSpace: "nowrap" }}
                  onClick={() => handleCopyUrl(selectedAsset.url, selectedAsset.id)}
                >
                  {copiedId === selectedAsset.id ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
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
              <div>
                <span style={{ color: "#92949d" }}>Format: </span>
                <span style={{ color: "#a3e635", fontWeight: 600 }}>{selectedAsset.format || "N/A"}</span>
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
                  <span style={{ color: "#92949d" }}>Referenced in: </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginTop: "0.35rem" }}>
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
                  if (confirm(`Remove asset "${selectedAsset.name}" from library?`)) {
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
            style={{ maxWidth: "560px" }}
          >
            {/* Modal Header */}
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

            {/* Modal Navigation Tabs */}
            <div className={styles.assetModalTabs}>
              <button
                type="button"
                className={`${styles.assetTabBtn} ${modalTab === "upload" ? styles.assetTabBtnActive : ""}`}
                onClick={() => {
                  setModalTab("upload");
                  resetForm();
                }}
              >
                <Upload size={14} />
                <span>Direct File Upload</span>
              </button>

              <button
                type="button"
                className={`${styles.assetTabBtn} ${modalTab === "image-url" ? styles.assetTabBtnActive : ""}`}
                onClick={() => {
                  setModalTab("image-url");
                  resetForm();
                  setAssetForm((prev) => ({ ...prev, type: "image" }));
                }}
              >
                <ImageIcon size={14} />
                <span>Image from URL</span>
              </button>

              <button
                type="button"
                className={`${styles.assetTabBtn} ${modalTab === "video-url" ? styles.assetTabBtnActive : ""}`}
                onClick={() => {
                  setModalTab("video-url");
                  resetForm();
                  setAssetForm((prev) => ({ ...prev, type: "video" }));
                }}
              >
                <Film size={14} />
                <span>Video from URL</span>
              </button>
            </div>

            <form onSubmit={handleSaveAsset}>
              <div className={styles.modalBody}>
                {/* 1. Direct File Upload Tab */}
                {modalTab === "upload" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {!assetForm.url ? (
                      <div
                        className={`${styles.uploadDropzone} ${isDragOver ? styles.uploadDropzoneActive : ""}`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragOver(true);
                        }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*,video/*"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0]);
                            }
                          }}
                        />

                        {isUploading ? (
                          <>
                            <div className={styles.uploadDropzoneIcon}>
                              <Loader2 size={24} className="animate-spin" />
                            </div>
                            <p className={styles.uploadDropzoneTitle}>Uploading & Optimizing Media...</p>
                            <p className={styles.uploadDropzoneSubtitle}>
                              Generating responsive WebP / downscaling oversized dimensions
                            </p>
                          </>
                        ) : (
                          <>
                            <div className={styles.uploadDropzoneIcon}>
                              <Upload size={22} />
                            </div>
                            <p className={styles.uploadDropzoneTitle}>
                              Drop images or videos here, or click to browse
                            </p>
                            <p className={styles.uploadDropzoneSubtitle}>
                              Supports JPG, PNG, WebP, AVIF, MP4 & WebM (Auto-compressed & resized)
                            </p>
                          </>
                        )}
                      </div>
                    ) : (
                      /* Uploaded Media Live Preview Card */
                      <div className={styles.uploadPreviewCard}>
                        <div className={styles.uploadPreviewHeader}>
                          <span className={styles.uploadPreviewBadge}>
                            Uploaded & Ready • {assetForm.format} • {assetForm.size}
                          </span>
                          <button
                            type="button"
                            className={`${styles.btn} ${styles.btnGhost} ${styles.btnSm}`}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Replace File
                          </button>
                        </div>

                        <div className={styles.uploadPreviewMediaFrame}>
                          {assetForm.type === "video" ? (
                            <video
                              src={assetForm.url}
                              controls
                              style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            />
                          ) : (
                            <Image
                              src={assetForm.url}
                              alt={assetForm.name}
                              fill
                              style={{ objectFit: "contain" }}
                              unoptimized
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {uploadError && (
                      <div style={{ color: "#ef4444", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        <AlertCircle size={14} />
                        <span>{uploadError}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Image from URL Tab */}
                {modalTab === "image-url" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Image URL *</label>
                      <input
                        type="text"
                        className={styles.inputField}
                        value={assetForm.url}
                        onChange={(e) => setAssetForm({ ...assetForm, url: e.target.value })}
                        placeholder="https://res.cloudinary.com/... or /images/..."
                        required
                      />
                    </div>

                    {/* Live Image URL Verification Preview */}
                    {assetForm.url && (
                      <div className={styles.uploadPreviewCard}>
                        <div className={styles.uploadPreviewHeader}>
                          {urlPreviewStatus === "loading" && (
                            <span style={{ fontSize: "0.75rem", color: "#92949d" }}>
                              Testing URL connection...
                            </span>
                          )}
                          {urlPreviewStatus === "valid" && (
                            <span className={styles.uploadPreviewBadge}>
                              Valid Image • {assetForm.width} × {assetForm.height} px ({assetForm.format})
                            </span>
                          )}
                          {urlPreviewStatus === "error" && (
                            <span style={{ fontSize: "0.75rem", color: "#ef4444" }}>
                              Unable to load image from URL.
                            </span>
                          )}
                        </div>

                        <div className={styles.uploadPreviewMediaFrame}>
                          {urlPreviewStatus === "valid" ? (
                            <Image
                              src={assetForm.url}
                              alt="URL Preview"
                              fill
                              style={{ objectFit: "contain" }}
                              unoptimized
                            />
                          ) : (
                            <ImageIcon size={32} style={{ color: "#3a3c44" }} />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Video from URL Tab */}
                {modalTab === "video-url" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Video URL (MP4 / WebM / Cloudinary Stream) *</label>
                      <input
                        type="text"
                        className={styles.inputField}
                        value={assetForm.url}
                        onChange={(e) => handleVideoUrlChange(e.target.value)}
                        placeholder="https://res.cloudinary.com/.../video.mp4 or /images/skyline_banner.mp4"
                        required
                      />
                    </div>

                    {/* Live Video Player Preview */}
                    {assetForm.url && (
                      <div className={styles.uploadPreviewCard}>
                        <div className={styles.uploadPreviewHeader}>
                          <span className={styles.uploadPreviewBadge}>
                            Video Stream Preview ({assetForm.format})
                          </span>
                        </div>

                        <div className={styles.uploadPreviewMediaFrame}>
                          <video
                            src={assetForm.url}
                            controls
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Common Metadata Fields (Shown when URL or File is present) */}
                {assetForm.url && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #24262d" }}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Asset Name / Title *</label>
                      <input
                        type="text"
                        className={styles.inputField}
                        value={assetForm.name}
                        onChange={(e) => setAssetForm({ ...assetForm, name: e.target.value })}
                        placeholder="e.g. Skyline Architecture Monograph"
                        required
                      />
                    </div>

                    <div className={styles.fieldGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Referenced / Used in (Optional)</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={assetForm.usedInInput}
                          onChange={(e) => setAssetForm({ ...assetForm, usedInInput: e.target.value })}
                          placeholder="e.g. Hero, Project RAG, About"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Cloudinary ID (Optional)</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={assetForm.cloudinaryPublicId}
                          onChange={(e) => setAssetForm({ ...assetForm, cloudinaryPublicId: e.target.value })}
                          placeholder="e.g. portfolio/hero_banner"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnGhost}`}
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  disabled={!assetForm.url || !assetForm.name || isUploading}
                >
                  Save to Media Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
