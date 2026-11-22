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
  Eye,
  Sparkles,
  Info,
  Maximize2,
} from "lucide-react";
import styles from "../admin.module.css";
import { CMSMediaAsset } from "@/services/cmsDataStore";

interface MediaLibraryViewProps {
  assets: CMSMediaAsset[];
  onAddAsset: (asset: Omit<CMSMediaAsset, "id" | "createdAt">) => Promise<void>;
  onAddAssets?: (assets: Omit<CMSMediaAsset, "id" | "createdAt">[]) => Promise<void>;
  onDeleteAsset: (id: string) => Promise<void>;
  initialTab?: "library" | "add";
}

export const MediaLibraryView: React.FC<MediaLibraryViewProps> = ({
  assets,
  onAddAsset,
  onAddAssets,
  onDeleteAsset,
  initialTab = "library",
}) => {
  const [activeTab, setActiveTab] = useState<"library" | "add">(initialTab);
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<CMSMediaAsset | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Add Asset Mode State
  const [addMode, setAddMode] = useState<"upload" | "image-url" | "video-url">("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    total: number;
    current: number;
    currentFileName: string;
    percent: number;
  } | null>(null);
  const [lastUploadedBatch, setLastUploadedBatch] = useState<
    { name: string; url: string; type: string; format?: string }[]
  >([]);

  // Form State for URL adding
  const [assetForm, setAssetForm] = useState({
    name: "",
    url: "",
    type: "image" as "image" | "video",
    format: "JPG",
    width: 0,
    height: 0,
    size: "",
    cloudinaryPublicId: "",
  });

  // URL Live Preview Verification
  const [urlPreviewStatus, setUrlPreviewStatus] = useState<"idle" | "loading" | "valid" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

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

  // Live URL validation for Image URL
  useEffect(() => {
    if (addMode !== "image-url" || !assetForm.url) {
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
  }, [assetForm.url, addMode]);

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

  // Handle Direct Multi-File Upload (Images & Videos)
  const handleMultipleFilesUpload = async (files: FileList | File[]) => {
    const fileList = Array.from(files).filter(
      (f) =>
        f.size > 0 &&
        (f.type.startsWith("image/") ||
          f.type.startsWith("video/") ||
          /\.(png|jpe?g|webp|avif|gif|svg|mp4|webm|mov|mkv)$/i.test(f.name))
    );

    if (fileList.length === 0) {
      setUploadError("Please select valid image or video files.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);
    setLastUploadedBatch([]);

    const uploadedAssets: Omit<CMSMediaAsset, "id" | "createdAt">[] = [];
    const errors: string[] = [];

    // Upload each file sequentially with live progress feedback
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const percent = Math.round(((i) / fileList.length) * 100);
      setUploadProgress({
        total: fileList.length,
        current: i + 1,
        currentFileName: file.name,
        percent,
      });

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errJson = await res.json().catch(() => ({}));
          throw new Error(errJson.error || `Upload failed for ${file.name}`);
        }

        const data = await res.json();
        if (data.success && data.asset) {
          uploadedAssets.push({
            name: data.asset.name,
            url: data.asset.url,
            type: data.asset.type,
            format: data.asset.format,
            width: data.asset.width || undefined,
            height: data.asset.height || undefined,
            size: data.asset.size,
            cloudinaryPublicId: "",
          });
        }
      } catch (err: any) {
        console.error(`[Upload error on ${file.name}]:`, err);
        errors.push(`${file.name}: ${err.message || "Upload failed"}`);
      }
    }

    // Register all successfully uploaded assets in one atomic batch
    if (uploadedAssets.length > 0) {
      if (onAddAssets) {
        await onAddAssets(uploadedAssets);
      } else {
        for (const asset of uploadedAssets) {
          await onAddAsset(asset);
        }
      }

      setLastUploadedBatch(
        uploadedAssets.map((a) => ({
          name: a.name,
          url: a.url,
          type: a.type,
          format: a.format,
        }))
      );

      if (uploadedAssets.length === 1) {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          navigator.clipboard.writeText(uploadedAssets[0].url);
        }
        setUploadSuccess(
          `Successfully uploaded "${uploadedAssets[0].name}"! URL copied to clipboard.`
        );
      } else {
        setUploadSuccess(
          `Successfully uploaded and optimized all ${uploadedAssets.length} media files! Registered in your Media Vault.`
        );
      }
      resetForm();
    }

    if (errors.length > 0) {
      setUploadError(`${errors.length} file(s) failed: ${errors.join("; ")}`);
    }

    setIsUploading(false);
    setUploadProgress(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleMultipleFilesUpload(e.dataTransfer.files);
    }
  };

  // Submit asset to CMS Data Store
  const handleSaveUrlAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetForm.name || !assetForm.url) return;

    await onAddAsset({
      name: assetForm.name,
      url: assetForm.url,
      type: assetForm.type,
      format: assetForm.format,
      width: assetForm.width || undefined,
      height: assetForm.height || undefined,
      size: assetForm.size || undefined,
      cloudinaryPublicId: assetForm.cloudinaryPublicId || undefined,
    });

    setUploadSuccess(`Saved "${assetForm.name}" to your media library!`);
    resetForm();
    setActiveTab("library");
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
      cloudinaryPublicId: "",
    });
    setUploadError(null);
    setUrlPreviewStatus("idle");
  };

  // Filtered Assets for Gallery
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

  const imageCount = assets.filter((a) => a.type === "image").length;
  const videoCount = assets.filter((a) => a.type === "video").length;

  return (
    <div>
      {/* View Header */}
      <div className={styles.viewHeader}>
        <div className={styles.viewTitleGroup}>
          <h1 className={styles.viewTitle}>Media Assets Library</h1>
          <p className={styles.viewSubtitle}>
            Your central storage for website images and videos. Upload files, register links, and copy URLs to use across projects, banners, and pages.
          </p>
        </div>

        <div className={styles.viewActions}>
          {activeTab === "library" ? (
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => {
                resetForm();
                setActiveTab("add");
              }}
            >
              <Plus size={15} />
              <span>Add New Media</span>
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => setActiveTab("library")}
            >
              <ImageIcon size={15} />
              <span>Back to Media Library</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className={styles.tabsNav}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "library" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("library")}
        >
          <ImageIcon size={14} style={{ marginRight: 6 }} />
          All Media Assets ({assets.length})
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "add" ? styles.tabBtnActive : ""}`}
          onClick={() => {
            resetForm();
            setActiveTab("add");
          }}
        >
          <Plus size={14} style={{ marginRight: 6 }} />
          Add Media (Upload / URL)
        </button>
      </div>

      {/* =========================================================================
          TAB 1: MEDIA GALLERY & VAULT (PURE VISUAL MEDIA, NO PROJECT CARDS)
          ========================================================================= */}
      {activeTab === "library" && (
        <>
          {/* Controls Bar: Search & Filter Pills */}
          <div className={styles.controlsBar}>
            <div className={styles.searchWrap}>
              <Search size={15} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search images and videos by name, format, or URL..."
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
                  All ({assets.length})
                </button>
                <button
                  type="button"
                  className={`${styles.viewToggleBtn} ${filterType === "image" ? styles.viewToggleBtnActive : ""}`}
                  onClick={() => setFilterType("image")}
                >
                  Images ({imageCount})
                </button>
                <button
                  type="button"
                  className={`${styles.viewToggleBtn} ${filterType === "video" ? styles.viewToggleBtnActive : ""}`}
                  onClick={() => setFilterType("video")}
                >
                  Videos ({videoCount})
                </button>
              </div>
            </div>
          </div>

          {/* Pure Visual Media Grid */}
          {filteredAssets.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>
                <ImageIcon size={24} />
              </div>
              <h3 className={styles.emptyStateTitle}>No media assets found</h3>
              <p className={styles.emptyStateText}>
                No images or videos match your query. Click &ldquo;Add New Media&rdquo; above to upload your first image or video.
              </p>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary}`}
                style={{ marginTop: "1rem" }}
                onClick={() => setActiveTab("add")}
              >
                <Plus size={15} />
                <span>Add Media Now</span>
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {filteredAssets.map((asset) => {
                const isCopied = copiedId === asset.id;
                return (
                  <div
                    key={asset.id}
                    style={{
                      backgroundColor: "#16171b",
                      border: "1px solid #282a32",
                      borderRadius: "8px",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.2s ease",
                      position: "relative",
                    }}
                  >
                    {/* Visual Media Frame (Pure visual preview, strictly no text over image) */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16 / 10",
                        backgroundColor: "#0a0b0d",
                        cursor: "pointer",
                        overflow: "hidden",
                      }}
                      onClick={() => setSelectedAsset(asset)}
                      title="Click to preview fullscreen"
                    >
                      {asset.type === "video" ? (
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                          <video
                            src={asset.url}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            muted
                            playsInline
                          />
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "rgba(0, 0, 0, 0.25)",
                            }}
                          >
                            <div
                              style={{
                                width: 38,
                                height: 38,
                                borderRadius: "50%",
                                backgroundColor: "rgba(0,0,0,0.65)",
                                border: "1px solid rgba(255,255,255,0.25)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#ffffff",
                              }}
                            >
                              <Film size={16} />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={asset.url}
                          alt={asset.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          style={{ objectFit: "cover" }}
                          unoptimized={asset.url.startsWith("http")}
                        />
                      )}
                    </div>

                    {/* Clean Metadata & Direct Actions Underneath */}
                    <div
                      style={{
                        padding: "0.85rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        flexGrow: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "0.84rem",
                            fontWeight: 600,
                            color: "#f2eee8",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={asset.name}
                        >
                          {asset.name}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.45rem",
                            marginTop: "0.3rem",
                            fontSize: "0.72rem",
                            color: "#8a909a",
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: "#20222a",
                              color: asset.type === "video" ? "#38bdf8" : "#a3e635",
                              padding: "0.1rem 0.4rem",
                              borderRadius: "4px",
                              fontWeight: 700,
                              letterSpacing: "0.04em",
                            }}
                          >
                            {asset.format || (asset.type === "video" ? "MP4" : "IMG")}
                          </span>
                          {asset.width && asset.height && (
                            <span>{asset.width}×{asset.height}</span>
                          )}
                          {asset.size && <span>• {asset.size}</span>}
                        </div>
                      </div>

                      {/* Action Buttons Bar */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          paddingTop: "0.4rem",
                          borderTop: "1px solid #23252d",
                        }}
                      >
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                          style={{
                            flex: 1,
                            fontSize: "0.72rem",
                            padding: "0.35rem 0.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.35rem",
                          }}
                          onClick={() => handleCopyUrl(asset.url, asset.id)}
                          title="Copy direct URL to clipboard"
                        >
                          {isCopied ? (
                            <>
                              <Check size={12} style={{ color: "#22c55e" }} />
                              <span style={{ color: "#22c55e" }}>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy URL</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnGhost} ${styles.btnSm}`}
                          style={{ padding: "0.35rem 0.5rem" }}
                          onClick={() => setSelectedAsset(asset)}
                          title="Inspect / Preview"
                        >
                          <Eye size={13} />
                        </button>

                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnGhost} ${styles.btnSm}`}
                          style={{ padding: "0.35rem 0.5rem", color: "#f87171" }}
                          onClick={async () => {
                            if (confirm(`Remove "${asset.name}" from library?`)) {
                              await onDeleteAsset(asset.id);
                            }
                          }}
                          title="Delete from Library"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* =========================================================================
          TAB 2: DEDICATED ADD MEDIA SECTION (UPLOAD FILES OR ADD VIA URL)
          ========================================================================= */}
      {activeTab === "add" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", maxWidth: "900px" }}>
          {/* Success Banner */}
          {uploadSuccess && (
            <div
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.12)",
                border: "1px solid rgba(34, 197, 94, 0.35)",
                color: "#4ade80",
                padding: "0.9rem 1.25rem",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.86rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Check size={16} />
                <span>{uploadSuccess}</span>
              </div>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                onClick={() => setActiveTab("library")}
              >
                View in Media Vault
              </button>
            </div>
          )}

          {/* Sub Navigation Modes: Direct Upload / Image URL / Video URL */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.75rem",
            }}
          >
            <button
              type="button"
              className={`${styles.btn} ${addMode === "upload" ? styles.btnPrimary : styles.btnSecondary}`}
              style={{ padding: "0.85rem 1rem", justifyContent: "center", gap: "0.5rem" }}
              onClick={() => {
                setAddMode("upload");
                setUploadError(null);
              }}
            >
              <Upload size={16} />
              <span>Direct File Upload</span>
            </button>

            <button
              type="button"
              className={`${styles.btn} ${addMode === "image-url" ? styles.btnPrimary : styles.btnSecondary}`}
              style={{ padding: "0.85rem 1rem", justifyContent: "center", gap: "0.5rem" }}
              onClick={() => {
                setAddMode("image-url");
                setUploadError(null);
                setAssetForm((prev) => ({ ...prev, type: "image" }));
              }}
            >
              <ImageIcon size={16} />
              <span>Add Image from URL</span>
            </button>

            <button
              type="button"
              className={`${styles.btn} ${addMode === "video-url" ? styles.btnPrimary : styles.btnSecondary}`}
              style={{ padding: "0.85rem 1rem", justifyContent: "center", gap: "0.5rem" }}
              onClick={() => {
                setAddMode("video-url");
                setUploadError(null);
                setAssetForm((prev) => ({ ...prev, type: "video" }));
              }}
            >
              <Video size={16} />
              <span>Add Video from URL</span>
            </button>
          </div>

          {/* Mode 1: Drag & Drop Direct Upload */}
          {addMode === "upload" && (
            <div
              style={{
                backgroundColor: "#16171b",
                border: "1px solid #282a32",
                borderRadius: "10px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#f2f2f0", margin: "0 0 0.35rem 0" }}>
                  Upload Multiple Images & Videos
                </h3>
                <p style={{ fontSize: "0.84rem", color: "#8a909a", margin: 0 }}>
                  Upload multiple local images and videos simultaneously. Files are processed concurrently, images are auto-converted to WebP, and all URLs are immediately registered to your portfolio.
                </p>
              </div>

              {/* Multi-File Upload Dropzone */}
              <div
                className={`${styles.uploadDropzone} ${isDragOver ? styles.uploadDropzoneActive : ""}`}
                style={{
                  minHeight: "230px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: isDragOver ? "2px dashed #6366f1" : "2px dashed #343742",
                  borderRadius: "8px",
                  padding: "2.5rem 1.5rem",
                  cursor: isUploading ? "not-allowed" : "pointer",
                  backgroundColor: isDragOver ? "rgba(99, 102, 241, 0.08)" : "#101114",
                  transition: "all 0.2s ease",
                  opacity: isUploading ? 0.9 : 1,
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (!isUploading) setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => {
                  if (!isUploading) fileInputRef.current?.click();
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  accept="image/png,image/jpeg,image/webp,image/avif,image/gif,image/svg+xml,video/mp4,video/webm,video/quicktime"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleMultipleFilesUpload(e.target.files);
                      e.target.value = "";
                    }
                  }}
                />

                {isUploading ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85rem", width: "100%", maxWidth: "340px", textAlign: "center" }}>
                    <Loader2 size={34} className={styles.spinner} style={{ color: "#6366f1" }} />
                    <div>
                      <p style={{ fontSize: "0.92rem", color: "#f2f2f0", fontWeight: 600, margin: "0 0 0.25rem 0" }}>
                        {uploadProgress
                          ? `Uploading file ${uploadProgress.current} of ${uploadProgress.total}...`
                          : "Processing media files..."}
                      </p>
                      <p style={{ fontSize: "0.78rem", color: "#9ca3af", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "300px" }}>
                        {uploadProgress?.currentFileName || "Optimizing and converting format..."}
                      </p>
                    </div>

                    {/* Dynamic Progress Bar */}
                    <div style={{ width: "100%", height: "6px", backgroundColor: "#282a32", borderRadius: "999px", overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${uploadProgress ? Math.max(12, Math.round((uploadProgress.current / uploadProgress.total) * 100)) : 25}%`,
                          height: "100%",
                          backgroundColor: "#6366f1",
                          borderRadius: "999px",
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>

                    <span style={{ fontSize: "0.75rem", color: "#8a909a" }}>
                      Auto-converting images to WebP & saving to /public/uploads
                    </span>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", textAlign: "center" }}>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        backgroundColor: "#191a20",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#a1a7b5",
                        border: "1px solid #282a32",
                      }}
                    >
                      <Upload size={24} />
                    </div>

                    <div>
                      <p style={{ fontSize: "0.98rem", fontWeight: 600, color: "#f2f2f0", margin: "0 0 0.35rem 0" }}>
                        Click to browse or drag & drop multiple files here
                      </p>
                      <p style={{ fontSize: "0.82rem", color: "#8a909a", margin: 0 }}>
                        Select multiple images or videos at once (JPG, PNG, WebP, AVIF, GIF, MP4, WebM)
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "0.4rem" }}>
                      <span
                        className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                        style={{ padding: "0.45rem 1rem", fontSize: "0.82rem" }}
                      >
                        Select Multiple Files
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Batch Upload Summary & Quick Copy Card */}
              {lastUploadedBatch.length > 0 && (
                <div
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.08)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    borderRadius: "8px",
                    padding: "1rem 1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Check size={18} style={{ color: "#34d399" }} />
                      <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#34d399" }}>
                        Batch Upload Complete ({lastUploadedBatch.length} file{lastUploadedBatch.length > 1 ? "s" : ""})
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        type="button"
                        className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                        style={{ fontSize: "0.78rem", padding: "0.3rem 0.65rem", display: "flex", alignItems: "center", gap: "0.35rem" }}
                        onClick={() => {
                          const urls = lastUploadedBatch.map((a) => a.url).join("\n");
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(urls);
                            setUploadSuccess(`Copied ${lastUploadedBatch.length} URLs to clipboard!`);
                          }
                        }}
                      >
                        <Copy size={13} />
                        <span>Copy All URLs</span>
                      </button>

                      <button
                        type="button"
                        className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}
                        style={{ fontSize: "0.78rem", padding: "0.3rem 0.65rem", display: "flex", alignItems: "center", gap: "0.35rem" }}
                        onClick={() => setActiveTab("library")}
                      >
                        <Eye size={13} />
                        <span>View in Vault</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick-list of uploaded items */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.35rem",
                      maxHeight: "160px",
                      overflowY: "auto",
                      paddingRight: "0.25rem",
                    }}
                  >
                    {lastUploadedBatch.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.4rem 0.6rem",
                          backgroundColor: "#12141a",
                          borderRadius: "6px",
                          border: "1px solid #232733",
                          fontSize: "0.8rem",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden" }}>
                          {item.type === "video" ? (
                            <Video size={14} style={{ color: "#818cf8", flexShrink: 0 }} />
                          ) : (
                            <ImageIcon size={14} style={{ color: "#34d399", flexShrink: 0 }} />
                          )}
                          <span style={{ color: "#e5e7eb", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {item.name}
                          </span>
                          <span style={{ color: "#6b7280", fontSize: "0.72rem" }}>({item.format || item.type.toUpperCase()})</span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
                          <span style={{ color: "#9ca3af", fontFamily: "monospace", fontSize: "0.75rem" }}>
                            {item.url}
                          </span>
                          <button
                            type="button"
                            title="Copy URL"
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#a1a7b5",
                              cursor: "pointer",
                              padding: "2px",
                              display: "flex",
                              alignItems: "center",
                            }}
                            onClick={() => {
                              if (navigator.clipboard) {
                                navigator.clipboard.writeText(item.url);
                                setUploadSuccess(`Copied "${item.url}" to clipboard!`);
                              }
                            }}
                          >
                            <Copy size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadError && (
                <div
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#f87171",
                    padding: "0.75rem 1rem",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.84rem",
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Add Image by URL */}
          {addMode === "image-url" && (
            <form
              onSubmit={handleSaveUrlAsset}
              style={{
                backgroundColor: "#16171b",
                border: "1px solid #282a32",
                borderRadius: "10px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#f2f2f0", margin: "0 0 0.35rem 0" }}>
                  Add Image via URL
                </h3>
                <p style={{ fontSize: "0.84rem", color: "#8a909a", margin: 0 }}>
                  Paste any web link, Cloudinary image, or local image path to add it to your media library for future use.
                </p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Image URL <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  className={styles.inputField}
                  placeholder="https://images.unsplash.com/... or /images/..."
                  value={assetForm.url}
                  onChange={(e) => setAssetForm((prev) => ({ ...prev, url: e.target.value.trim() }))}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Asset Name / Description</label>
                <input
                  type="text"
                  required
                  className={styles.inputField}
                  placeholder="e.g. Distributed Systems Architecture Diagram"
                  value={assetForm.name}
                  onChange={(e) => setAssetForm((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              {/* Real-Time Live Visual Preview */}
              {assetForm.url && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label className={styles.formLabel}>Live Preview Verification</label>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "460px",
                      aspectRatio: "16 / 10",
                      backgroundColor: "#0a0b0d",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid #282a32",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {urlPreviewStatus === "loading" && (
                      <Loader2 size={24} className={styles.spinner} style={{ color: "#6366f1" }} />
                    )}
                    {urlPreviewStatus === "valid" && (
                      <Image
                        src={assetForm.url}
                        alt="Preview"
                        fill
                        sizes="460px"
                        style={{ objectFit: "contain" }}
                        unoptimized
                      />
                    )}
                    {urlPreviewStatus === "error" && (
                      <div style={{ color: "#f87171", fontSize: "0.82rem", textAlign: "center", padding: "1rem" }}>
                        <AlertCircle size={20} style={{ margin: "0 auto 0.5rem" }} />
                        <span>Could not load image from this URL. Please verify the link.</span>
                      </div>
                    )}
                  </div>

                  {urlPreviewStatus === "valid" && assetForm.width > 0 && (
                    <span style={{ fontSize: "0.75rem", color: "#4ade80", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Check size={12} />
                      Verified valid image ({assetForm.width} × {assetForm.height} px • {assetForm.format})
                    </span>
                  )}
                </div>
              )}

              <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  disabled={!assetForm.url || urlPreviewStatus === "error"}
                >
                  <Plus size={15} />
                  <span>Save Image to Library</span>
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() => resetForm()}
                >
                  Clear Form
                </button>
              </div>
            </form>
          )}

          {/* Mode 3: Add Video by URL */}
          {addMode === "video-url" && (
            <form
              onSubmit={handleSaveUrlAsset}
              style={{
                backgroundColor: "#16171b",
                border: "1px solid #282a32",
                borderRadius: "10px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#f2f2f0", margin: "0 0 0.35rem 0" }}>
                  Add Video via URL
                </h3>
                <p style={{ fontSize: "0.84rem", color: "#8a909a", margin: 0 }}>
                  Link an external MP4, WebM, or Cloudinary video stream for backgrounds, hero banners, or interactive project demos.
                </p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Video URL (Direct .mp4 or .webm) <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  className={styles.inputField}
                  placeholder="https://.../video.mp4 or /images/banner.mp4"
                  value={assetForm.url}
                  onChange={(e) => handleVideoUrlChange(e.target.value.trim())}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Video Name / Description</label>
                <input
                  type="text"
                  required
                  className={styles.inputField}
                  placeholder="e.g. Skyline Cinematic Background Video"
                  value={assetForm.name}
                  onChange={(e) => setAssetForm((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              {/* Real-Time Live Video Player Preview */}
              {assetForm.url && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label className={styles.formLabel}>Live Video Preview</label>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "520px",
                      aspectRatio: "16 / 9",
                      backgroundColor: "#0a0b0d",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid #282a32",
                    }}
                  >
                    <video
                      src={assetForm.url}
                      controls
                      playsInline
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  disabled={!assetForm.url}
                >
                  <Plus size={15} />
                  <span>Save Video to Library</span>
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() => resetForm()}
                >
                  Clear Form
                </button>
              </div>
            </form>
          )}

          {/* Performance & File Format Advisory Box */}
          <div
            style={{
              backgroundColor: "rgba(99, 102, 241, 0.05)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              borderRadius: "8px",
              padding: "1.25rem 1.5rem",
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <Sparkles size={20} style={{ color: "#818cf8", flexShrink: 0, marginTop: "2px" }} />
            <div style={{ fontSize: "0.82rem", color: "#c7cbd6", lineHeight: 1.6 }}>
              <strong style={{ color: "#f2f2f0", display: "block", marginBottom: "0.3rem" }}>
                Do I need to resize or convert images before uploading?
              </strong>
              No manual resizing needed! Our backend upload pipeline automatically resizes oversized assets (&gt; 2560px) and converts JPG/PNG images into modern, web-optimized <strong>WebP</strong> files with superior 88% quality compression.
              <br />
              <span style={{ color: "#9da3af", marginTop: "0.3rem", display: "block" }}>
                • <strong>Images:</strong> Recommended dimensions are 1200×800px to 1920×1080px (under 2MB).
                <br />
                • <strong>Videos:</strong> Recommended MP4 or WebM under 25MB for stutter-free looping playback.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MEDIA LIGHTBOX / FULLSCREEN INSPECTOR MODAL
          ========================================================================= */}
      {selectedAsset && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedAsset(null)}
          style={{ zIndex: 1200 }}
        >
          <div
            className={styles.modalDialog}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "800px",
              width: "92vw",
              backgroundColor: "#141518",
              border: "1px solid #282a32",
              borderRadius: "12px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                {selectedAsset.type === "video" ? <Video size={18} style={{ color: "#38bdf8" }} /> : <ImageIcon size={18} style={{ color: "#a3e635" }} />}
                <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600, color: "#f2eee8" }}>
                  {selectedAsset.name}
                </h3>
              </div>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setSelectedAsset(null)}
              >
                <X size={16} />
              </button>
            </div>

            {/* High-Resolution Media Viewer */}
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 10",
                maxHeight: "440px",
                backgroundColor: "#07080a",
                borderRadius: "8px",
                overflow: "hidden",
                position: "relative",
                border: "1px solid #23252d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selectedAsset.type === "video" ? (
                <video
                  src={selectedAsset.url}
                  controls
                  autoPlay
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                <Image
                  src={selectedAsset.url}
                  alt={selectedAsset.name}
                  fill
                  sizes="800px"
                  style={{ objectFit: "contain" }}
                  unoptimized={selectedAsset.url.startsWith("http")}
                />
              )}
            </div>

            {/* Direct URL Field with One-Click Copy */}
            <div className={styles.formGroup} style={{ gap: "0.4rem" }}>
              <label className={styles.formLabel}>Direct Media URL</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  readOnly
                  value={selectedAsset.url}
                  className={styles.inputField}
                  style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.78rem" }}
                />
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  style={{ padding: "0 1rem", whiteSpace: "nowrap" }}
                  onClick={() => handleCopyUrl(selectedAsset.url, selectedAsset.id)}
                >
                  {copiedId === selectedAsset.id ? (
                    <>
                      <Check size={14} style={{ color: "#22c55e" }} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Media Metadata Pill Row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.25rem",
                padding: "0.75rem 1rem",
                backgroundColor: "#0d0e11",
                borderRadius: "6px",
                border: "1px solid #202228",
                fontSize: "0.8rem",
                color: "#92949d",
              }}
            >
              <div>
                Type: <strong style={{ color: "#f2f2f0", textTransform: "capitalize" }}>{selectedAsset.type}</strong>
              </div>
              <div>
                Format: <strong style={{ color: "#a3e635" }}>{selectedAsset.format || "N/A"}</strong>
              </div>
              {selectedAsset.width && selectedAsset.height && (
                <div>
                  Dimensions: <strong style={{ color: "#f2f2f0" }}>{selectedAsset.width} × {selectedAsset.height} px</strong>
                </div>
              )}
              {selectedAsset.size && (
                <div>
                  Size: <strong style={{ color: "#f2f2f0" }}>{selectedAsset.size}</strong>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.5rem" }}>
              <a
                href={selectedAsset.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
              >
                <ExternalLink size={13} />
                <span>Open Raw in New Tab</span>
              </a>

              <button
                type="button"
                className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                onClick={async () => {
                  if (confirm(`Remove "${selectedAsset.name}" from your media vault?`)) {
                    await onDeleteAsset(selectedAsset.id);
                    setSelectedAsset(null);
                  }
                }}
              >
                <Trash2 size={13} />
                <span>Delete Media</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
