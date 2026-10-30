"use client";

import React from "react";
import { ModernHeader } from "./modern/ModernHeader";
import { ModernFooter } from "./modern/ModernFooter";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="xudo-cover-wrapper modern-site-root">
      <ModernHeader />
      <main className="modern-main-content">
        {children}
      </main>
      <ModernFooter />
    </div>
  );
}
