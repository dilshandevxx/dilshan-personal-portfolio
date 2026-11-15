"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/**
 * Awwwards-grade Smooth Inertia Scrolling powered by Lenis.
 * Preserves 100% native feel on touch/trackpads while transforming
 * discrete desktop mouse-wheel clicks into a buttery 60/120fps glide.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085, // Refined inertia: responsive on start, silky glide on deceleration
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.0,
        syncTouch: false,
        autoResize: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
