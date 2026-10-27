"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AmbientPlayer } from "./AmbientPlayer";
import { GithubIcon } from "./SocialIcons";
import { siteConfig } from "@/data/siteConfig";
import { Mail, ArrowUpRight } from "lucide-react";

export function TopBar() {
  const pathname = usePathname();

  // Clean route path label
  const getRouteLabel = () => {
    if (pathname.startsWith("/projects")) return "projects";
    if (pathname.startsWith("/shelves") || pathname.startsWith("/guides")) return "shelves";
    if (pathname.startsWith("/blog") || pathname.startsWith("/notes")) return "blog";
    if (pathname.startsWith("/about")) return "about";
    return "";
  };

  const routeLabel = getRouteLabel();

  return (
    <header className="app-topbar" aria-label="Page utilities">
      {/* Left side: Terminal path + Availability status badge */}
      <div className="topbar-left">
        <div className="topbar-breadcrumb">
          <span className="topbar-breadcrumb-root">dilshan.dev</span>
          {routeLabel && (
            <>
              <span className="topbar-breadcrumb-slash">/</span>
              <span className="topbar-breadcrumb-current">{routeLabel}</span>
            </>
          )}
        </div>

        <Link
          href="/about#contact"
          className="topbar-status-pill"
          title="Open for engineering projects and consulting"
        >
          <span className="topbar-status-dot" />
          <span className="topbar-status-text">Available for work</span>
        </Link>
      </div>

      {/* Right side: Music Player + Quick Actions */}
      <div className="topbar-right">
        {/* Ambient Lo-Fi Player in Top Right Corner */}
        <AmbientPlayer />

        {/* GitHub Shortcut */}
        <a
          href={siteConfig.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-button topbar-action-button"
          aria-label="GitHub Profile"
          title="GitHub Profile"
        >
          <GithubIcon size={17} />
        </a>

        {/* Contact Email Shortcut */}
        <a
          href={`mailto:${siteConfig.social.email}`}
          className="navbar-button topbar-action-button"
          aria-label="Send Email"
          title="Email Dilshan"
        >
          <Mail size={17} />
        </a>
      </div>
    </header>
  );
}
