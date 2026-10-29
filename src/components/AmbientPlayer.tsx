"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAudio, SOUND_TRACKS, SoundTrack } from "./AudioContext";
import {
  Headphones,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Shuffle,
  SkipForward,
  SkipBack,
  Repeat,
  Repeat1,
  Music2,
  X as CloseIcon,
} from "lucide-react";

interface AmbientPlayerProps {
  variant?: "header" | "floating" | "icon";
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function AmbientPlayer({ variant = "floating" }: AmbientPlayerProps) {
  const {
    isPlaying,
    currentTrack,
    volume,
    currentTime,
    duration,
    isShuffle,
    isLooping,
    togglePlay,
    setVolume,
    selectTrack,
    nextTrack,
    prevTrack,
    seek,
    toggleShuffle,
    toggleLoop,
  } = useAudio();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="dropdown tooltip-container chill-player-root"
    >
      {/* Sleek Minimalist Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`navbar-button ${isOpen ? "active" : ""} ${isPlaying ? "is-playing" : ""}`}
        aria-label="Lo-Fi Ambient Music Player"
      >
        <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <Headphones
            size={18}
            strokeWidth={1.8}
            style={{
              color: isPlaying ? "var(--color-primary)" : "currentColor",
              transition: "color 0.2s ease, transform 0.2s ease",
            }}
          />
          {isPlaying && (
            <span
              style={{
                position: "absolute",
                top: -2,
                right: -3,
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 6px #22c55e",
              }}
            />
          )}
        </span>
      </button>
      {!isOpen && (
        <div
          className="tooltip"
          aria-hidden="true"
          style={{ userSelect: "none", WebkitUserSelect: "none", pointerEvents: "none" }}
        >
          {isPlaying ? `Playing: ${currentTrack.name}` : "Lo-Fi Player"}
        </div>
      )}

      {/* Ambient Backdrop Overlay for Visual Focus & Quick Dismiss */}
      {isOpen && (
        <div
          className="chill-deck-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Clean, Compact, Beautiful Lo-Fi Popover Player Card */}
      {isOpen && (
        <div className="chill-deck-popover" role="dialog" aria-label="Lo-Fi Music Player">
          {/* Card Top Header */}
          <div className="chill-deck-header">
            <div className="chill-deck-badge">
              <span className={`chill-live-dot ${isPlaying ? "pulsing" : ""}`} />
              <span className="chill-deck-title">LO-FI RADIO</span>
            </div>
            <div className="chill-deck-header-actions">
              <button
                type="button"
                onClick={toggleShuffle}
                className={`chill-header-pill ${isShuffle ? "active" : ""}`}
                title={isShuffle ? "Shuffle: ON" : "Shuffle: OFF"}
                aria-label="Toggle shuffle"
              >
                <Shuffle size={12} />
              </button>
              <button
                type="button"
                onClick={toggleLoop}
                className={`chill-header-pill ${isLooping ? "active" : ""}`}
                title={isLooping ? "Loop: ON" : "Loop: OFF"}
                aria-label="Toggle loop"
              >
                {isLooping ? <Repeat1 size={12} /> : <Repeat size={12} />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="chill-deck-close"
                aria-label="Close player"
              >
                <CloseIcon size={13} />
              </button>
            </div>
          </div>

          {/* Now Playing Hero Badge */}
          <div className="chill-now-playing-card">
            <div className="chill-artwork-disc">
              <div className={`chill-disc-inner ${isPlaying ? "spinning" : ""}`}>
                <Music2 size={16} className="chill-disc-icon" />
              </div>
            </div>
            <div className="chill-track-meta">
              <div className="chill-meta-title" title={currentTrack.name}>
                {currentTrack.name}
              </div>
              <div className="chill-meta-sub">
                <span className="chill-meta-artist">{currentTrack.artist}</span>
                <span className="chill-meta-sep">•</span>
                <span className="chill-meta-mood">{currentTrack.mood}</span>
              </div>
            </div>
          </div>

          {/* Scrubber & Duration */}
          <div className="chill-scrubber-group">
            <div
              className="chill-scrub-bar"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPos = (e.clientX - rect.left) / rect.width;
                if (duration > 0) {
                  seek(clickPos * duration);
                }
              }}
            >
              <div
                className="chill-scrub-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="chill-time-labels">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Transport Controls Row */}
          <div className="chill-controls-row">
            <button
              type="button"
              onClick={prevTrack}
              className="chill-btn-icon"
              title="Previous Track"
              aria-label="Previous track"
            >
              <SkipBack size={15} />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className={`chill-play-circle ${isPlaying ? "playing" : ""}`}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 2 }} />}
            </button>
            <button
              type="button"
              onClick={nextTrack}
              className="chill-btn-icon"
              title="Next Track"
              aria-label="Next track"
            >
              <SkipForward size={15} />
            </button>
          </div>

          {/* Inline Volume Row */}
          <div className="chill-volume-row">
            <button
              type="button"
              onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
              className="chill-vol-btn-mini"
              title={volume === 0 ? "Unmute" : "Mute"}
              aria-label={volume === 0 ? "Unmute" : "Mute"}
            >
              {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="chill-vol-slider-mini"
              aria-label="Volume level"
            />
            <span className="chill-vol-pct">{Math.round(volume * 100)}%</span>
          </div>

          {/* Scrollable Tracklist Header & Container (User specified: show small amount at once, scroll to see more) */}
          <div className="chill-tracklist-section">
            <div className="chill-tracklist-header">
              <span className="chill-tracklist-label">PLAYLIST</span>
              <span className="chill-tracklist-count">{SOUND_TRACKS.length} tracks</span>
            </div>

            <div className="chill-tracks-scrollable" role="radiogroup" aria-label="Playlist tracks">
              {SOUND_TRACKS.map((track: SoundTrack, index: number) => {
                const isSelected = track.id === currentTrack.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => selectTrack(track)}
                    className={`chill-track-row ${isSelected ? "selected" : ""}`}
                    role="radio"
                    aria-checked={isSelected}
                  >
                    <span className="chill-track-num">
                      {isSelected && isPlaying ? (
                        <span className="chill-mini-eq" aria-hidden="true">
                          <span className="c-bar" />
                          <span className="c-bar" />
                          <span className="c-bar" />
                        </span>
                      ) : (
                        `0${index + 1}`
                      )}
                    </span>
                    <div className="chill-track-details">
                      <span className="chill-track-title-text">{track.name}</span>
                      <span className="chill-track-mood-text">{track.mood}</span>
                    </div>
                    <span className="chill-track-duration">
                      {track.duration || "2:40"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
