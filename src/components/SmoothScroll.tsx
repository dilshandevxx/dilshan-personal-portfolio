"use client";

import React from "react";

/**
 * Pure 100% Native Scrolling Provider.
 * Zero scrolljacking, zero wheel interception, and zero artificial delays.
 * Scrolling is completely raw, instant, and hardware-accelerated by the user's browser/OS.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
