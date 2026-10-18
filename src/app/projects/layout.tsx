import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `Projects — ${siteConfig.siteName}`,
  description: "Open-source platforms, deep learning inference engines, and distributed systems.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
