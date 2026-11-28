import React from "react";
import { BlogFeed } from "@/components/BlogFeed";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: `Notes & Blog — ${siteConfig.siteName}`,
  description: "Guides, tutorials, and notes on code and systems engineering.",
};

export default function NotesPage() {
  return (
    <div style={{ backgroundColor: "#111111", minHeight: "100vh", width: "100%" }}>
      <SkyLabsNavbar />
      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "7rem 1.5rem 5rem" }}>
        <BlogFeed />
      </div>
      <MainFooter />
    </div>
  );
}
