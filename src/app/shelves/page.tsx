import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { GuidesView } from "@/components/GuidesView";

export const metadata = {
  title: `Guides & References — ${siteConfig.siteName}`,
  description:
    "Curated roadmaps, architectural deep dives, and system implementation playbooks.",
};

export default function ShelvesPage() {
  return <GuidesView />;
}
