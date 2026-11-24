"use client";

import React from "react";

export function RetroFloppyIcon({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Floppy Disk Outer Case */}
      <path
        d="M3 4C3 2.89543 3.89543 2 5 2H17.1716C17.702 2 18.2107 2.21071 18.5858 2.58579L21.4142 5.41421C21.7893 5.78929 22 6.29799 22 6.82843V20C22 21.1046 21.1046 22 20 22H5C3.89543 22 3 21.1046 3 20V4Z"
        fill="#3b82f6"
        stroke="#1d4ed8"
        strokeWidth="1.5"
      />
      {/* Upper Metal Shutter */}
      <rect x="7" y="2" width="10" height="7" rx="1" fill="#e2e8f0" />
      <rect x="9" y="3.5" width="2" height="4" rx="0.5" fill="#475569" />
      {/* Center Label Area */}
      <rect x="5.5" y="11" width="13" height="9" rx="1" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="8" y1="14" x2="16" y2="14" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="8" y1="16.5" x2="14" y2="16.5" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function RetroFeatherIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20.24 12.24a6 6 0 0 0-8.49-8.49L3 11.5V21h9.5z"
        stroke="#f43f5e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(244, 63, 94, 0.15)"
      />
      <line x1="16" y1="8" x2="2" y2="22" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
      <path d="M17.5 15H9" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function RetroOrangeNodeIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#f97316" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#fb923c" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#fb923c" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#ea580c" />
      <line x1="10" y1="6.5" x2="14" y2="6.5" stroke="#fed7aa" strokeWidth="1.5" />
      <line x1="6.5" y1="10" x2="6.5" y2="14" stroke="#fed7aa" strokeWidth="1.5" />
      <line x1="17.5" y1="10" x2="17.5" y2="14" stroke="#fed7aa" strokeWidth="1.5" />
      <line x1="10" y1="17.5" x2="14" y2="17.5" stroke="#fed7aa" strokeWidth="1.5" />
    </svg>
  );
}

export function RetroLightningIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <polygon
        points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
        fill="#eab308"
        stroke="#ca8a04"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RetroJsBadge({ size = 28 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: "#f7df1e",
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: size * 0.52,
        color: "#000000",
        fontFamily: "var(--font-mono, monospace)",
        flexShrink: 0,
        boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
      }}
      aria-label="JavaScript"
    >
      JS
    </div>
  );
}

export function RetroDomBadge({ size = 28 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: "#38bdf8",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
      }}
      aria-label="DOM"
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    </div>
  );
}

export function RetroSystemsBadge({ size = 28 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: "#0284c7",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
      }}
      aria-label="Systems"
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    </div>
  );
}

export function RetroQuillBadge({ size = 28 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: "#f59e0b",
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
      }}
      aria-label="Writing"
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#18181b" strokeWidth="2.5">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    </div>
  );
}
