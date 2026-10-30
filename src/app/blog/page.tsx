import React from "react";
import { ModernBlogFeed } from "@/components/modern/ModernBlogFeed";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: `Perspectives & Field Notes — Sky Labs`,
  description: "Guides, tutorials, and notes on distributed systems, applied deep learning, and code craft.",
};

export default function BlogPage() {
  return <ModernBlogFeed />;
}
