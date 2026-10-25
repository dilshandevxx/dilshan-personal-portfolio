"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { PortfolioNavbar } from "./PortfolioNavbar";
import { AmbientPlayer } from "./AmbientPlayer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  if (isLandingPage) {
    return <main className="landing-page-wrapper">{children}</main>;
  }

  return (
    <div className="portfolio-shell-wrapper">
      <PortfolioNavbar />
      <div className="app-shell">
        <Sidebar />
        <main className="app-main">
          {/* Sticky top-right ambient audio player */}
          <div className="app-top-bar">
            <AmbientPlayer variant="floating" />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
