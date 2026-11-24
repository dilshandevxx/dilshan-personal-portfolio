"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./TechMascot.module.css";

interface TechMascotProps {
  domainName?: string;
  portraitSrc?: string;
}

export default function TechMascot({
  domainName = "dilshan.dev",
  portraitSrc = "/dilshan_portrait.jpg",
}: TechMascotProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // When website defaultly loads, first show that logo, and then show Dilshan's image inside the round after loading
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className={styles.mascotContainer} aria-label="Dilshan mascot and portrait illustration">
      <div
        className={styles.circleFrameWrapper}
        onClick={toggleFlip}
        title="Click to toggle between mascot logo and portrait"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleFlip();
          }
        }}
      >
        <div className={`${styles.circleFrameInner} ${isFlipped ? styles.flipped : ""}`}>
          {/* Front Face: The Mascot Logo */}
          <div className={styles.faceFront}>
            <svg
              viewBox="0 0 220 220"
              className={styles.mascotSvg}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Circular green/sage background */}
              <circle cx="110" cy="110" r="105" fill="#a7f3d0" />

              {/* Ram hooves / legs */}
              <g id="legs" stroke="#242b26" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="#ffffff">
                <path d="M 85 145 L 78 180 L 88 182 L 95 145 Z" fill="#ffffff" />
                <path d="M 78 174 L 88 176" stroke="#242b26" strokeWidth="3" />
                
                <path d="M 125 145 L 120 185 L 132 187 L 136 145 Z" fill="#ffffff" />
                <path d="M 120 178 L 132 180" stroke="#242b26" strokeWidth="3" />

                <path d="M 175 140 L 182 170 L 194 168 L 185 135 Z" fill="#ffffff" />
                <path d="M 183 162 L 193 160" stroke="#242b26" strokeWidth="3" />

                <path d="M 150 145 L 152 178 L 163 176 L 160 145 Z" fill="#ffffff" />
                <path d="M 152 170 L 163 168" stroke="#242b26" strokeWidth="3" />
              </g>

              {/* Ram Body: Green RAM stick (DIMM memory module) */}
              <g id="ram-stick" transform="rotate(-18 135 120)">
                <rect
                  x="80"
                  y="90"
                  width="105"
                  height="48"
                  rx="4"
                  fill="#34d399"
                  stroke="#1b4d3e"
                  strokeWidth="3.5"
                />
                <rect x="88" y="96" width="12" height="28" rx="2" fill="#1e293b" />
                <rect x="106" y="96" width="12" height="28" rx="2" fill="#1e293b" />
                <rect x="124" y="96" width="12" height="28" rx="2" fill="#1e293b" />
                <rect x="142" y="96" width="12" height="28" rx="2" fill="#1e293b" />
                <rect x="160" y="96" width="12" height="28" rx="2" fill="#1e293b" />

                <line x1="84" y1="138" x2="181" y2="138" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="3 1.5" />
                <rect x="131" y="135" width="4" height="6" fill="#a7f3d0" />
              </g>

              {/* Ram Little Tail */}
              <path
                d="M 185 125 C 196 126 200 135 192 140 C 185 142 180 135 185 125 Z"
                fill="#ffffff"
                stroke="#242b26"
                strokeWidth="3"
              />

              {/* Ram Head & Neck */}
              <g id="head">
                <path d="M 72 135 L 85 105 L 102 120 L 85 145 Z" fill="#ffffff" stroke="#242b26" strokeWidth="3.5" />
                <ellipse cx="70" cy="105" rx="20" ry="16" fill="#ffffff" stroke="#242b26" strokeWidth="3.5" />
                <ellipse cx="58" cy="112" rx="12" ry="9" fill="#ffffff" stroke="#242b26" strokeWidth="3" />
                <circle cx="53" cy="113" r="1.5" fill="#242b26" />
                <ellipse cx="68" cy="101" rx="3.5" ry="4.5" fill="#242b26" />
                <circle cx="69" cy="99.5" r="1.2" fill="#ffffff" />
                <path d="M 54 116 Q 60 120 66 117" stroke="#242b26" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path
                  d="M 58 117 C 54 125 45 130 50 145 C 52 152 58 156 57 165"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <rect x="52" y="165" width="10" height="8" rx="2" fill="#334155" />
                <line x1="55" y1="173" x2="55" y2="178" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="59" y1="173" x2="59" y2="178" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                <path
                  d="M 80 96 C 88 80 106 82 108 98 C 110 114 88 122 76 112 C 72 108 73 98 83 95"
                  fill="#fef08a"
                  stroke="#242b26"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <path d="M 88 87 L 85 95" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
                <path d="M 98 88 L 94 97" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
                <path d="M 104 97 L 97 104" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
                <path d="M 99 108 L 91 111" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
                <path
                  d="M 85 106 C 96 112 98 122 90 120 C 84 118 82 112 85 106 Z"
                  fill="#ffffff"
                  stroke="#242b26"
                  strokeWidth="3"
                />
              </g>
            </svg>
          </div>

          {/* Back Face: Dilshan's Portrait Photo */}
          <div className={styles.faceBack}>
            <Image
              src={portraitSrc}
              alt="Dilshan portrait photograph"
              fill
              sizes="(max-width: 768px) 180px, 190px"
              className={styles.portraitImg}
              priority
            />
          </div>
        </div>
      </div>

      {/* Charming Speech Bubble Tooltip */}
      <div className={styles.speechBubble}>
        <span className={styles.speechText}>
          Can&apos;t remember how to spell my name? Just go to{" "}
          <strong className={styles.domainStrong}>{domainName}</strong>!
        </span>
      </div>
    </div>
  );
}
