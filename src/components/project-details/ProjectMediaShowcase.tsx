"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MediaGalleryItem, VideoDemonstration, FALLBACK_THUMBNAILS } from "@/data/projects";
import { Maximize2, Play, Pause, Film, Layers, Monitor, CheckCircle, X } from "lucide-react";
import styles from "./ProjectMediaShowcase.module.css";

interface ProjectMediaShowcaseProps {
  gallery: MediaGalleryItem[];
  videoDemo: VideoDemonstration;
  projectTitle: string;
  index?: number;
}

export function ProjectMediaShowcase({
  gallery,
  videoDemo,
  projectTitle,
  index = 0,
}: ProjectMediaShowcaseProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentImageSrc, setCurrentImageSrc] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [simulatedProgress, setSimulatedProgress] = useState<number>(0);

  const activeMedia = gallery[activeMediaIndex] || gallery[0];

  useEffect(() => {
    if (activeMedia?.url) {
      setCurrentImageSrc(activeMedia.url);
    } else {
      setCurrentImageSrc(FALLBACK_THUMBNAILS[index % FALLBACK_THUMBNAILS.length]);
    }
  }, [activeMediaIndex, activeMedia, index]);

  // Simulated video playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setSimulatedProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const isExternalUrl =
    currentImageSrc.startsWith("http://") ||
    currentImageSrc.startsWith("https://") ||
    currentImageSrc.startsWith("data:");

  const activeChapter = videoDemo.timestamps?.[activeChapterIndex] || {
    time: "00:00",
    label: "Full System Walkthrough",
  };

  return (
    <div className={styles.container}>
      {/* ------------------------------------------------------------- */}
      {/* 1. PROJECT GALLERY & VISUAL SHOWCASE                          */}
      {/* ------------------------------------------------------------- */}
      <section id="showcase" className={styles.sectionRoot}>
        <div className={styles.sectionHeader}>
          <div className={styles.metaRow}>
            <span className={styles.sectionIndex}>06 / VISUAL SHOWCASE</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.metaSub}>GALLERY & INTERFACES</span>
          </div>
          <h2 className={styles.sectionTitle}>Interface & Schematic Gallery</h2>
          <p className={styles.sectionSubtitle}>
            High-fidelity visual artifacts demonstrating application flows, architecture topologies, and production consoles.
          </p>
        </div>

        {/* Main Display Frame */}
        <div className={styles.mainCanvas}>
          <div className={styles.imageWrapper}>
            <Image
              src={currentImageSrc || FALLBACK_THUMBNAILS[index % FALLBACK_THUMBNAILS.length]}
              alt={activeMedia?.title || projectTitle}
              fill
              priority
              unoptimized={isExternalUrl}
              onError={() => {
                setCurrentImageSrc(FALLBACK_THUMBNAILS[(index + 1) % FALLBACK_THUMBNAILS.length]);
              }}
              className={styles.canvasImage}
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className={styles.canvasOverlay} />

            {/* Top Toolbar */}
            <div className={styles.canvasToolbar}>
              <span className={styles.canvasBadge}>
                {activeMedia?.type?.toUpperCase() || "INTERFACE"}
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className={styles.expandButton}
                title="Expand Fullscreen"
                aria-label="Expand Fullscreen"
              >
                <Maximize2 size={15} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className={styles.canvasCaption}>
              <h3 className={styles.captionTitle}>{activeMedia?.title}</h3>
              {activeMedia?.caption && (
                <p className={styles.captionText}>{activeMedia.caption}</p>
              )}
            </div>
          </div>

          {/* Gallery Thumbnails Strip */}
          <div className={styles.thumbnailsGrid}>
            {gallery.map((item, idx) => {
              const isSelected = idx === activeMediaIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`${styles.thumbButton} ${isSelected ? styles.thumbButtonSelected : ""}`}
                >
                  <div className={styles.thumbImageWrap}>
                    <Image
                      src={item.url || FALLBACK_THUMBNAILS[idx % FALLBACK_THUMBNAILS.length]}
                      alt={item.title}
                      fill
                      unoptimized={isExternalUrl}
                      className={styles.thumbImage}
                    />
                  </div>
                  <div className={styles.thumbMeta}>
                    <span className={styles.thumbTitle}>{item.title}</span>
                    <span className={styles.thumbType}>{item.type || "view"}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. VIDEO DEMONSTRATIONS & INTERACTIVE WALKTHROUGH             */}
      {/* ------------------------------------------------------------- */}
      <section id="video-demo" className={styles.sectionRoot}>
        <div className={styles.sectionHeader}>
          <div className={styles.metaRow}>
            <span className={styles.sectionIndex}>07 / DEMONSTRATION</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.metaSub}>VIDEO & INTERACTIVE PROTOTYPE</span>
          </div>
          <h2 className={styles.sectionTitle}>Video Walkthrough & Execution</h2>
          <p className={styles.sectionSubtitle}>
            Watch {projectTitle} operate in real time, validating low-latency query handling and reliable data pipelines.
          </p>
        </div>

        {/* Video Player Box */}
        <div className={styles.videoPlayerFrame}>
          <div className={styles.videoCanvas}>
            <Image
              src={videoDemo.thumbnail || FALLBACK_THUMBNAILS[index % FALLBACK_THUMBNAILS.length]}
              alt={videoDemo.title || "Video Demonstration"}
              fill
              className={styles.videoThumb}
            />
            <div className={styles.videoOverlay} />

            {/* Play/Pause Center Trigger */}
            <div className={styles.centerPlayArea}>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={styles.bigPlayButton}
                aria-label={isPlaying ? "Pause Video Walkthrough" : "Play Video Walkthrough"}
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} fill="currentColor" />}
              </button>
              <span className={styles.durationBadge}>
                {isPlaying ? "SIMULATED RUNTIME ACTIVE" : `RUN TIME ${videoDemo.duration || "03:45"}`}
              </span>
            </div>

            {/* Live Status Header */}
            <div className={styles.videoTopBar}>
              <div className={styles.liveIndicator}>
                <span className={`${styles.statusDot} ${isPlaying ? styles.dotStreaming : ""}`} />
                <span>{isPlaying ? "STREAMING TELEMETRY" : "READY FOR PLAYBACK"}</span>
              </div>
              <span className={styles.chapterBadge}>{activeChapter.label}</span>
            </div>

            {/* Bottom Playback Controls */}
            <div className={styles.videoControls}>
              <div className={styles.progressBarBg}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${simulatedProgress}%` }}
                />
              </div>
              <div className={styles.controlsRow}>
                <div className={styles.timeMeta}>
                  <Film size={14} />
                  <span>
                    {isPlaying
                      ? `0${Math.floor(simulatedProgress / 30)}:${String((simulatedProgress * 2) % 60).padStart(2, "0")}`
                      : activeChapter.time}{" "}
                    / {videoDemo.duration || "03:45"}
                  </span>
                </div>
                <div className={styles.nowPlayingText}>
                  {activeChapter.label}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chapter Timestamps */}
          {videoDemo.timestamps && videoDemo.timestamps.length > 0 && (
            <div className={styles.chaptersSidebar}>
              <div className={styles.chaptersHeader}>
                <Film size={15} />
                <span>WALKTHROUGH CHAPTERS</span>
              </div>
              <div className={styles.chaptersList}>
                {videoDemo.timestamps.map((chapter, i) => {
                  const isChapterActive = i === activeChapterIndex;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setActiveChapterIndex(i);
                        setSimulatedProgress(i * 20);
                        setIsPlaying(true);
                      }}
                      className={`${styles.chapterItem} ${isChapterActive ? styles.chapterItemActive : ""}`}
                    >
                      <span className={styles.chapterTime}>{chapter.time}</span>
                      <span className={styles.chapterLabel}>{chapter.label}</span>
                      {isChapterActive && (
                        <CheckCircle size={14} className={styles.chapterCheck} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className={styles.lightboxBackdrop} onClick={() => setLightboxOpen(false)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className={styles.closeLightbox}
              aria-label="Close Fullscreen View"
            >
              <X size={20} />
            </button>
            <div className={styles.lightboxImageWrapper}>
              <Image
                src={currentImageSrc || FALLBACK_THUMBNAILS[0]}
                alt={activeMedia?.title || "Enlarged View"}
                fill
                className={styles.lightboxImage}
              />
            </div>
            <div className={styles.lightboxFooter}>
              <h4 className={styles.lightboxTitle}>{activeMedia?.title}</h4>
              <p className={styles.lightboxDesc}>{activeMedia?.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
