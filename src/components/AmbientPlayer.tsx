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
  Disc3,
  X as CloseIcon,
  Sparkles,
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
      className={`chill-player-root dropdown ${
        variant === "header"
          ? "variant-header"
          : variant === "icon"
          ? "variant-icon"
          : "variant-floating"
      }`}
    >
      {/* 1. Trigger: Single Compact Icon Button (if variant="icon") or Pill Deck */}
      {variant === "icon" ? (
        <div className="tooltip-container">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`navbar-button chill-icon-trigger ${isPlaying ? "is-playing" : ""} ${isOpen ? "active" : ""}`}
            aria-label="Lo-Fi Hip Hop Music Player"
            title={
              isPlaying
                ? `Now playing: ${currentTrack.name} (${currentTrack.mood}) — Click to adjust`
                : "Lo-Fi Hip Hop Radio — Click to play"
            }
          >
            <span className={`chill-icon-vinyl ${isPlaying ? "spinning" : ""}`}>
              <Disc3 size={18} />
            </span>
            {isPlaying && <span className="chill-icon-dot" />}
          </button>
          {!isOpen && <div className="tooltip">Lo-Fi Radio</div>}
        </div>
      ) : (
        <div className={`chill-pill-deck ${isPlaying ? "is-playing" : ""} ${isOpen ? "is-open" : ""}`}>
          {/* Main interactive toggle button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="chill-pill-main-btn"
            aria-label="Toggle Lo-Fi Hip Hop Music Player Deck"
            title={`Now playing: ${currentTrack.name} (${currentTrack.mood}) — Click for lo-fi controls`}
          >
            {/* Animated Vinyl Disc Icon */}
            <span className={`chill-vinyl-icon ${isPlaying ? "spinning" : ""}`}>
              <Disc3 size={15} />
            </span>

            {/* Track Name & Mood */}
            <span className="chill-pill-track-info">
              <span className="chill-pill-track-name">{currentTrack.name}</span>
              <span className="chill-pill-mood-dot" />
              <span className="chill-pill-mood-text">{currentTrack.mood}</span>
            </span>

            {/* 4-Bar Animated Equalizer */}
            <span
              className={`chill-equalizer ${isPlaying ? "active" : ""}`}
              aria-hidden="true"
            >
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
              <span className="bar bar-4" />
            </span>
          </button>

          {/* Quick Previous Track */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevTrack();
            }}
            className="chill-quick-btn"
            aria-label="Previous chill track"
            title="Previous Track (P)"
          >
            <SkipBack size={12} />
          </button>

          {/* Quick Play / Pause Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className={`chill-quick-btn play-btn ${isPlaying ? "playing" : ""}`}
            aria-label={isPlaying ? "Pause music" : "Play chill music"}
            title={isPlaying ? "Pause (M)" : "Play chill music (M)"}
          >
            {isPlaying ? (
              <Pause size={12} />
            ) : (
              <Play size={12} className="play-icon-offset" />
            )}
          </button>

          {/* Quick Next Track */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextTrack();
            }}
            className="chill-quick-btn"
            aria-label="Next chill track"
            title="Next Track (N)"
          >
            <SkipForward size={12} />
          </button>
        </div>
      )}

      {/* 2. Deluxe Popover Player Deck */}
      {isOpen && (
        <div className="chill-deck-popover" role="dialog" aria-label="Lo-Fi Hip Hop Music Player">
          {/* Header */}
          <div className="chill-deck-header">
            <div className="chill-deck-badge">
              <span className={`chill-live-dot ${isPlaying ? "pulsing" : ""}`} />
              <span className="chill-deck-title">LO-FI HIP HOP RADIO</span>
            </div>
            <div className="chill-deck-header-actions">
              <button
                type="button"
                onClick={toggleShuffle}
                className={`chill-header-pill ${isShuffle ? "active" : ""}`}
                title={isShuffle ? "Shuffle Mode: ON" : "Shuffle Mode: OFF"}
                aria-label="Toggle shuffle mode"
              >
                <Shuffle size={11} />
                <span>Shuffle</span>
              </button>
              <button
                type="button"
                onClick={toggleLoop}
                className={`chill-header-pill ${isLooping ? "active" : ""}`}
                title={isLooping ? "Repeat Track: ON" : "Repeat Track: OFF"}
                aria-label="Toggle repeat mode"
              >
                {isLooping ? <Repeat1 size={11} /> : <Repeat size={11} />}
                <span>{isLooping ? "Loop 1" : "Loop"}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="chill-deck-close"
                aria-label="Close music player deck"
              >
                <CloseIcon size={14} />
              </button>
            </div>
          </div>

          {/* Now Playing Hero Showcase */}
          <div className="chill-now-playing-card">
            {/* Spinning Vinyl Record Visualization */}
            <div className="chill-vinyl-showcase">
              <div className={`vinyl-disc ${isPlaying ? "spinning" : ""}`}>
                <div className="vinyl-groove groove-1" />
                <div className="vinyl-groove groove-2" />
                <div className="vinyl-label">
                  <span className="vinyl-hole" />
                </div>
              </div>
            </div>

            {/* Track Info */}
            <div className="chill-track-meta">
              <div className="chill-track-title-row">
                <h4 className="chill-track-title">{currentTrack.name}</h4>
                <span className="chill-track-mood-badge">
                  {currentTrack.mood}
                </span>
              </div>
              <p className="chill-track-subtitle">{currentTrack.subtitle}</p>
              <span className="chill-artist-name">
                Lo-Fi Hip Hop • Chill Beats
              </span>
            </div>
          </div>

          {/* Time Scrubber */}
          <div className="chill-scrubber-container">
            <div className="chill-time-row">
              <span className="chill-time-curr">{formatTime(currentTime)}</span>
              <span className="chill-time-total">{formatTime(duration)}</span>
            </div>
            <div
              className="chill-scrub-track"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPos = (e.clientX - rect.left) / rect.width;
                if (duration > 0) {
                  seek(clickPos * duration);
                }
              }}
            >
              <div
                className="chill-scrub-progress"
                style={{ width: `${progressPercent}%` }}
              />
              <span
                className="chill-scrub-thumb"
                style={{ left: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Transport Bar */}
          <div className="chill-transport-bar">
            <button
              type="button"
              onClick={toggleShuffle}
              className={`chill-transport-btn ${isShuffle ? "active" : ""}`}
              title="Shuffle Tracks"
              aria-label="Toggle shuffle"
            >
              <Shuffle size={14} />
            </button>

            <button
              type="button"
              onClick={prevTrack}
              className="chill-transport-btn"
              title="Previous Track (P)"
              aria-label="Previous track"
            >
              <SkipBack size={16} />
            </button>

            {/* Hero Main Play/Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className={`chill-hero-play-btn ${isPlaying ? "playing" : ""}`}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              title={isPlaying ? "Pause (M)" : "Play (M)"}
            >
              {isPlaying ? (
                <Pause size={18} />
              ) : (
                <Play size={18} className="hero-play-offset" />
              )}
            </button>

            <button
              type="button"
              onClick={nextTrack}
              className="chill-transport-btn"
              title="Next Track (N)"
              aria-label="Next track"
            >
              <SkipForward size={16} />
            </button>

            <button
              type="button"
              onClick={toggleLoop}
              className={`chill-transport-btn ${isLooping ? "active" : ""}`}
              title="Toggle Loop"
              aria-label="Toggle loop"
            >
              {isLooping ? <Repeat1 size={14} /> : <Repeat size={14} />}
            </button>
          </div>

          {/* Curated Lo-Fi Tracks Playlist */}
          <div className="chill-playlist-section">
            <div className="chill-playlist-title-row">
              <span className="chill-playlist-label">Select Lo-Fi Beat</span>
              <span className="chill-playlist-count">
                {SOUND_TRACKS.length} Lo-Fi Beats
              </span>
            </div>

            <div className="chill-playlist-items" role="radiogroup" aria-label="Chill playlist">
              {SOUND_TRACKS.map((track: SoundTrack, index: number) => {
                const isSelected = track.id === currentTrack.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => selectTrack(track)}
                    className={`chill-playlist-row ${
                      isSelected ? "is-selected" : ""
                    }`}
                    role="radio"
                    aria-checked={isSelected}
                  >
                    <div className="chill-row-left">
                      <span className="chill-track-num">
                        {isSelected && isPlaying ? (
                          <span className="row-eq" aria-hidden="true">
                            <span className="r-bar r-bar-1" />
                            <span className="r-bar r-bar-2" />
                            <span className="r-bar r-bar-3" />
                          </span>
                        ) : (
                          `0${index + 1}`
                        )}
                      </span>
                      <div className="chill-row-text">
                        <span className="chill-row-title">{track.name}</span>
                        <span className="chill-row-sub">{track.subtitle}</span>
                      </div>
                    </div>

                    <div className="chill-row-right">
                      <span className="chill-row-mood">{track.mood}</span>
                      <span className="chill-row-duration">
                        {track.duration || "2:40"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Volume Control */}
          <div className="chill-volume-strip">
            <button
              type="button"
              onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
              className="chill-vol-btn"
              title={volume === 0 ? "Unmute" : "Mute"}
              aria-label={volume === 0 ? "Unmute" : "Mute"}
            >
              {volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="chill-vol-slider"
              aria-label="Volume level"
            />
            <span className="chill-vol-val">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Keyboard Shortcuts Hint */}
          <div className="chill-deck-footer">
            <div className="chill-hotkeys">
              <span className="hotkey-label">Keyboard:</span>
              <kbd>[ M ] Play</kbd>
              <kbd>[ N ] Next</kbd>
              <kbd>[ P ] Prev</kbd>
              <kbd>[ L ] Loop</kbd>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
