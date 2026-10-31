"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ModernHeader } from "./modern/ModernHeader";
import { ModernFooter } from "./modern/ModernFooter";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="xudo-cover-wrapper modern-site-root">
      {!isHome && <ModernHeader />}
      <main className="modern-main-content">
        {children}
      </main>
      <ModernFooter />
    </div>
  );
}
