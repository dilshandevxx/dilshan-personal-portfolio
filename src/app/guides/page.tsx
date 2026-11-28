import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { GuidesView } from "@/components/GuidesView";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";

export const metadata = {
  title: "Guides & References — " + siteConfig.siteName,
  description:
    "Curated roadmaps, architectural deep dives, and system implementation playbooks.",
};

export default function GuidesPage() {
  return (
    <div style={{ backgroundColor: "#111111", minHeight: "100vh", width: "100%" }}>
      <SkyLabsNavbar />
      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "7rem 1.5rem 5rem" }}>
        <GuidesView />
      </div>
      <MainFooter />
    </div>
  );
}
