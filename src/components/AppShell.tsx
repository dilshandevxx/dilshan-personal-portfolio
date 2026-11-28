"use client";

import React from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  return <main className="landing-page-wrapper">{children}</main>;
}
