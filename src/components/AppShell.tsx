"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Full-width modern pages (matching main page vibe, without the old 270px sidebar)
  const isFullWidthPage =
    pathname === "/" ||
    pathname === "/about" ||
    pathname?.startsWith("/about") ||
    pathname === "/projects" ||
    pathname?.startsWith("/projects/") ||
    pathname?.startsWith("/blog/") ||
    pathname === "/resume" ||
    pathname?.startsWith("/admin");

  if (isFullWidthPage) {
    return <main className="landing-page-wrapper">{children}</main>;
  }

  return (
    <div className="portfolio-shell-wrapper">
      <div className="app-shell">
        <Sidebar />
        <main className="app-main">
          {children}
        </main>
      </div>
    </div>
  );
}
