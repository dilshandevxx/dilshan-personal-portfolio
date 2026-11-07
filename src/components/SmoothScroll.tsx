"use client";

import React, { useEffect } from "react";

/**
 * High-performance, zero-dependency luxury momentum & slow scroll provider.
 * Implements linear interpolation (lerp) for buttery wheel glide and
 * graceful easeInOutCubic deceleration for in-page anchors.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check for touch / mobile device or reduced motion preference
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Slow, graceful easing for all anchor clicks (#skills, #about-me, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const id = href.slice(1);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();

          const navbarHeight = 75;
          const targetY =
            element.getBoundingClientRect().top + window.scrollY - navbarHeight;
          const startY = window.scrollY;
          const distance = targetY - startY;
          const duration = 1200; // 1.2s deliberate, slow luxury scroll
          let startTime: number | null = null;

          // Smooth cubic bezier easing
          const easeInOutCubic = (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const ease = easeInOutCubic(progress);

            window.scrollTo(0, startY + distance * ease);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              window.history.pushState(null, "", `#${id}`);
            }
          };

          requestAnimationFrame(step);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    if (isTouchDevice || prefersReducedMotion) {
      return () => {
        document.removeEventListener("click", handleAnchorClick, { capture: true });
      };
    }

    // 2. Buttery inertial momentum scrolling on desktop mouse wheel
    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let isAnimating = false;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) return;

      // Allow native scrolling inside nested scroll containers (e.g. code snippets, dropdowns)
      let el = e.target as HTMLElement | null;
      let isInsideScrollable = false;
      while (el && el !== document.body && el !== document.documentElement) {
        const style = window.getComputedStyle(el);
        if (
          (style.overflowY === "auto" || style.overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight
        ) {
          isInsideScrollable = true;
          break;
        }
        el = el.parentElement;
      }
      if (isInsideScrollable) return;

      e.preventDefault();
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      // Slower delta multiplier for deliberate cinematic feel
      targetY = Math.max(0, Math.min(targetY + e.deltaY * 0.85, maxScroll));

      if (!isAnimating) {
        isAnimating = true;
        currentY = window.scrollY;
        requestAnimationFrame(smoothUpdate);
      }
    };

    const smoothUpdate = () => {
      const diff = targetY - currentY;
      // Gentle smoothing factor (0.075 for weighty, smooth glide)
      currentY += diff * 0.075;

      window.scrollTo(0, currentY);

      if (Math.abs(diff) > 0.4) {
        requestAnimationFrame(smoothUpdate);
      } else {
        window.scrollTo(0, targetY);
        currentY = targetY;
        isAnimating = false;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    const onManualScroll = () => {
      if (!isAnimating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };
    window.addEventListener("scroll", onManualScroll, { passive: true });

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onManualScroll);
    };
  }, []);

  return <>{children}</>;
}
