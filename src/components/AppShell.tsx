"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  if (isLandingPage) {
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
