import React from "react";
import { BlogFeed } from "@/components/BlogFeed";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: `Blog — ${siteConfig.siteName}`,
  description: "Guides, tutorials, and notes on code and life.",
};

export default function BlogPage() {
  return <BlogFeed />;
}
