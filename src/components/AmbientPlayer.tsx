"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAudio, SOUND_TRACKS, SoundTrack } from "./AudioContext";
import {
  Headphones,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Shuffle,
  Disc,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface AmbientPlayerProps {
  variant?: "header" | "floating";
}

export function AmbientPlayer({ variant = "floating" }: AmbientPlayerProps) {
  const {
    isPlaying,
    currentTrack,
    volume,
    isShuffle,
    togglePlay,
    setVolume,
    selectTrack,
    playRandomTrack,
    toggleShuffle,
  } = useAudio();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`ambient-player-root ${variant === "header" ? "variant-header" : "variant-floating"}`}
    >
      {/* Trigger Pill Button */}
      <div className="ambient-pill-container">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`ambient-pill-btn ${isPlaying ? "playing" : ""} ${isOpen ? "active" : ""}`}
          aria-label="Ambient chill music settings"
          title="Chill Relax Music Player (Press 'M' to play/pause, 'N' to shuffle)"
        >
          <span className="ambient-icon-wrapper">
            <Headphones size={14} className="ambient-headphone-icon" />
          </span>

          <span className="ambient-track-title">{currentTrack.name}</span>

          {/* Micro Equalizer Bar Indicator */}
          <span className={`ambient-equalizer ${isPlaying ? "is-active" : ""}`} aria-hidden="true">
            <span className="eq-bar eq-bar-1" />
            <span className="eq-bar eq-bar-2" />
            <span className="eq-bar eq-bar-3" />
          </span>
        </button>

        {/* Quick Shuffle Random Track Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            playRandomTrack();
          }}
          className="ambient-quick-shuffle"
          aria-label="Play next random chill track"
          title="Shuffle next random track (N)"
        >
          <Shuffle size={12} />
        </button>

        {/* Quick Play/Pause Action Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className={`ambient-quick-toggle ${isPlaying ? "playing" : ""}`}
          aria-label={isPlaying ? "Pause chill music" : "Play random chill music"}
          title={isPlaying ? "Pause (M)" : "Play chill music (M)"}
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} className="play-offset" />}
        </button>
      </div>

      {/* Popover Settings Panel */}
      {isOpen && (
        <div className="ambient-popover-card">
          <div className="ambient-popover-header">
            <div className="popover-status-badge">
              <span className={`ambient-status-dot ${isPlaying ? "live" : ""}`} />
              <span className="popover-title">Chill Relax Music</span>
            </div>
            <div className="popover-header-actions">
              <button
                type="button"
                onClick={toggleShuffle}
                className={`popover-shuffle-toggle ${isShuffle ? "active" : ""}`}
                title={isShuffle ? "Shuffle Mode: ON (Randomizing each session)" : "Shuffle Mode: OFF"}
                aria-label="Toggle shuffle mode"
              >
                <Shuffle size={11} />
                <span>Random</span>
              </button>
            </div>
          </div>

          {/* Track List */}
          <div className="ambient-track-list" role="radiogroup" aria-label="Select chill music track">
            {SOUND_TRACKS.map((track: SoundTrack) => {
              const isSelected = track.id === currentTrack.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  className={`ambient-track-item ${isSelected ? "selected" : ""}`}
                  onClick={() => selectTrack(track)}
                  role="radio"
                  aria-checked={isSelected}
                >
                  <div className="track-radio-indicator">
                    <span className={`radio-dot ${isSelected ? "active" : ""}`} />
                  </div>
                  <div className="track-details">
                    <div className="track-name-row">
                      <span className="track-name">{track.name}</span>
                      <span className="track-mood-badge">{track.mood}</span>
                    </div>
                    <span className="track-subtitle">{track.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Shuffle Next Quick Action */}
          <div className="ambient-shuffle-row">
            <button
              type="button"
              className="ambient-random-btn"
              onClick={playRandomTrack}
            >
              <Sparkles size={13} />
              <span>Surprise Me (Play Random Track)</span>
            </button>
          </div>

          {/* Volume Slider Control */}
          <div className="ambient-volume-control">
            <div
              className="volume-icon-btn"
              onClick={() => setVolume(volume === 0 ? 0.4 : 0)}
              title={volume === 0 ? "Unmute" : "Mute"}
            >
              {volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="ambient-volume-slider"
              aria-label="Ambient volume"
            />
            <span className="volume-percentage">{Math.round(volume * 100)}%</span>
          </div>

          {/* Popover Footer with hotkeys & SoundCloud link */}
          <div className="ambient-popover-footer">
            <div className="ambient-hotkeys-hint">
              <span>Shortcuts:</span>
              <kbd>[ M ] Play</kbd>
              <kbd>[ N ] Random</kbd>
            </div>
            <Link
              href="/about#songs"
              className="ambient-songs-link"
              onClick={() => setIsOpen(false)}
            >
              <Disc size={13} />
              <span>Dilshan&apos;s Original Tracks on SoundCloud</span>
              <ExternalLink size={11} className="link-arrow" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
