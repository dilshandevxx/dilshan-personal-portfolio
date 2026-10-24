import Header from "@/components/cover/Header";
import HeroMinimal from "@/components/cover/sections/HeroMinimal";
import SelectedWork from "@/components/cover/sections/SelectedWork";
import CTA from "@/components/cover/sections/CTA";
import Blog from "@/components/cover/sections/Blog";
import PreFooter from "@/components/cover/sections/PreFooter";
import Footer from "@/components/cover/Footer";
import { Metadata } from "next";
import { getLatestArticles, DevToArticle } from "@/lib/api";

export const metadata: Metadata = {
  title: "Dilshan | Visual Designer & Software Engineer",
  description:
    "Structuring the future through architectural digital experiences, brand identity systems, and intelligent suites.",
  openGraph: {
    title: "Dilshan | Digital Studio & Systems",
    description: "Structuring the future through architectural digital experiences.",
    type: "website",
  },
};

export default async function Home() {
  let posts: DevToArticle[] = [];
  try {
    posts = await getLatestArticles(6);
  } catch (error) {
    console.error("Could not fetch remote articles:", error);
    posts = [];
  }

  // Fallback posts if remote feed is offline
  if (!posts || posts.length === 0) {
    posts = [
      {
        id: 1,
        title: "Deterministic Systems in Distributed Computing",
        description: "An architectural exploration of state machines, consensus, and idempotency.",
        cover_image: "/images/blog_arch.png",
        published_at: "2026-03-12T00:00:00Z",
        tag_list: ["SYSTEMS", "ARCHITECTURE"],
        slug: "deterministic-systems",
        path: "/blog",
        url: "/blog",
        comments_count: 0,
        public_reactions_count: 42,
        user: {
          name: "Dilshan",
          username: "dilshan",
          profile_image: "/avatar.jpg",
        },
      },
      {
        id: 2,
        title: "Designing for Reduced Cognitive Load in Web Interfaces",
        description: "Why density of thought beats visual clutter in modern design systems.",
        cover_image: "/images/blog_office.png",
        published_at: "2026-02-28T00:00:00Z",
        tag_list: ["DESIGN", "UIUX"],
        slug: "cognitive-load",
        path: "/blog",
        url: "/blog",
        comments_count: 0,
        public_reactions_count: 38,
        user: {
          name: "Dilshan",
          username: "dilshan",
          profile_image: "/avatar.jpg",
        },
      },
    ];
  }

  return (
    <div className="xudo-cover-wrapper">
      <Header />
      <main>
        <HeroMinimal />
        <SelectedWork />
        <CTA />
        <Blog posts={posts} />
        <PreFooter />
      </main>
      <Footer />
    </div>
  );
}
