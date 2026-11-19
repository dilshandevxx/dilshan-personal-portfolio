"use client";

import React, { useState, useEffect } from "react";
import styles from "./ProjectNavRibbon.module.css";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem-solution", label: "Problem & Solution" },
  { id: "disciplines", label: "Core Disciplines" },
  { id: "architecture", label: "Architecture" },
  { id: "showcase", label: "Visual Showcase" },
  { id: "video-demo", label: "Video Demo" },
  { id: "tech-docs", label: "Technical Specs" },
  { id: "explore-more", label: "Explore Projects" },
];

export function ProjectNavRibbon() {
  const [activeId, setActiveId] = useState<string>("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.ribbonContainer} aria-label="Project Sections Navigation">
      <div className={styles.ribbonTrack}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span>{item.label}</span>
              {isActive && <span className={styles.activeIndicator} />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
