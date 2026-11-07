"use client";

import React, { useEffect } from "react";

/**
 * Studio-Grade Lenis-Style Smooth Scroll Engine.
 * 
 * Key Principles:
 * 1. Frame-rate independent dampening using exact exponential decay (1 - e^(-lambda * dt)).
 * 2. Intelligent trackpad vs. stepped mouse wheel detection:
 *    - Trackpad / precision touch: instantaneous 1:1 response with OS momentum (no double-lag).
 *    - Stepped mouse wheel: luxurious, velvety studio glide with smooth deceleration.
 * 3. Snappy 700ms cubic-bezier anchor navigation (instant response, gentle landing).
 * 4. Automatic sync with native scrollbar dragging, arrow keys, and nested containers.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for touch / mobile device or reduced motion preference
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 1. Snappy & Elegant Anchor Scroll (SERVICES, PROJECTS, ABOUT, CONTACT, etc.)
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
          const targetY = Math.max(
            0,
            element.getBoundingClientRect().top + window.scrollY - navbarHeight
          );
          const startY = window.scrollY;
          const distance = targetY - startY;

          // Snappy 700ms duration (starts immediately, coasts softly)
          const duration = 700;
          let startTime: number | null = null;

          // Apple/Linear-style easeOutQuart: immediate motion, graceful deceleration
          const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeOutQuart(progress);

            window.scrollTo(0, startY + distance * ease);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              window.scrollTo(0, targetY);
              window.history.pushState(null, "", `#${id}`);
            }
          };

          requestAnimationFrame(step);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    // Touch devices and reduced motion use native OS scroll behavior
    if (isTouchDevice || prefersReducedMotion) {
      return () => {
        document.removeEventListener("click", handleAnchorClick, { capture: true });
      };
    }

    // 2. Lenis-Style Normalized Smooth Wheel Engine
    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let lastTime = performance.now();
    let isRafActive = false;
    let isTrackpad = false;
    let lastWheelTime = 0;

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    // Frame-rate independent exponential damp: current + (target - current) * (1 - e^(-lambda * dt))
    const damp = (current: number, target: number, lambda: number, dt: number) => {
      return current + (target - current) * (1 - Math.exp(-lambda * dt));
    };

    const updateScroll = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1); // clamp to prevent jumps on tab unfocus
      lastTime = now;

      // Trackpad uses high lambda (26) for zero-latency crispness; mouse wheel uses 12 for luxurious glide
      const lambda = isTrackpad ? 26 : 12;
      currentY = damp(currentY, targetY, lambda, dt);

      window.scrollTo(0, currentY);

      const diff = Math.abs(targetY - currentY);
      if (diff > 0.3) {
        requestAnimationFrame(updateScroll);
      } else {
        window.scrollTo(0, targetY);
        currentY = targetY;
        isRafActive = false;
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Allow browser zoom (Ctrl/Cmd + wheel)
      if (e.ctrlKey || e.metaKey) return;

      // Respect scroll inside nested scrollable elements (code snippets, dropdowns, popups)
      let el = e.target as HTMLElement | null;
      let insideNestedScroll = false;
      while (el && el !== document.body && el !== document.documentElement) {
        const style = window.getComputedStyle(el);
        if (
          (style.overflowY === "auto" || style.overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight
        ) {
          // If the element can still scroll in the given direction, let it handle the wheel
          const canScrollDown = el.scrollTop < el.scrollHeight - el.clientHeight;
          const canScrollUp = el.scrollTop > 0;
          if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
            insideNestedScroll = true;
            break;
          }
        }
        el = el.parentElement;
      }
      if (insideNestedScroll) return;

      // Smart Trackpad vs Mouse Wheel Detection
      const now = performance.now();
      const timeDelta = now - lastWheelTime;
      lastWheelTime = now;

      // Trackpads emit micro-deltas in pixel mode (deltaMode === 0) with high frequency
      const isMicroDelta = Math.abs(e.deltaY) < 35 && e.deltaY % 1 !== 0;
      const isHighFrequency = timeDelta < 20;
      isTrackpad = e.deltaMode === 0 && (isMicroDelta || (isHighFrequency && Math.abs(e.deltaY) < 60));

      e.preventDefault();

      // Normalize delta based on deltaMode (0: pixels, 1: lines, 2: pages)
      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta *= 36; // 36px per line step on Windows mouse wheel
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight;
      }

      // Slightly temper large mouse wheel notches for buttery smoothness
      if (!isTrackpad) {
        delta *= 0.88;
      }

      const maxScroll = getMaxScroll();
      targetY = Math.max(0, Math.min(targetY + delta, maxScroll));

      if (!isRafActive) {
        isRafActive = true;
        lastTime = performance.now();
        currentY = window.scrollY;
        requestAnimationFrame(updateScroll);
      }
    };

    // Keep targetY in sync if the user manually drags the scrollbar or presses keyboard keys
    const onNativeScroll = () => {
      if (!isRafActive) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    // Re-clamp on window resize
    const onResize = () => {
      const max = getMaxScroll();
      if (targetY > max) targetY = max;
      if (currentY > max) currentY = max;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onNativeScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <>{children}</>;
}
