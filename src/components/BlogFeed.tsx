"use client";

import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { postsData, PostItem } from "@/data/notes";
import { Search, X as ClearIcon, SearchX, BookOpen, Clock } from "lucide-react";

interface CategoryFilter {
  id: string;
  name: string;
}

const CATEGORIES: CategoryFilter[] = [
  { id: "all", name: "All Articles" },
  { id: "ai-ml", name: "AI & Machine Learning" },
  { id: "react", name: "React & Next.js" },
  { id: "typescript", name: "TypeScript" },
  { id: "kubernetes", name: "DevOps & K8s" },
  { id: "docker", name: "Docker" },
];

function BlogFeedInner() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync with URL query parameters on load/change
  useEffect(() => {
    const q = searchParams.get("search");
    const t = searchParams.get("topic");
    if (q) setSearchQuery(q);
    if (t) setSelectedTopic(t);
  }, [searchParams]);

  // Focus search with '/' key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredPosts = useMemo(() => {
    return postsData.filter((post) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      const matchesTopic =
        selectedTopic === "all" ||
        post.tags.some((t) => t.toLowerCase().includes(selectedTopic.toLowerCase()));

      return matchesSearch && matchesTopic;
    });
  }, [searchQuery, selectedTopic]);

  // Group by year
  const groupedByYear = useMemo(() => {
    const groups: { [year: number]: PostItem[] } = {};
    filteredPosts.forEach((post) => {
      if (!groups[post.year]) {
        groups[post.year] = [];
      }
      groups[post.year].push(post);
    });
    return Object.entries(groups)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, items]) => ({
        year: Number(year),
        items,
      }));
  }, [filteredPosts]);

  return (
    <div className="blog-container">
      {/* Editorial Header */}
      <header className="page-header-editorial">
        <div className="page-header-topline">
          <h1 className="page-title-editorial">Latest News</h1>
          <div className="page-count-badge">
            <BookOpen size={13} />
            <span>{postsData.length} Articles</span>
          </div>
        </div>
        <p className="page-subtitle-editorial">
          Guides, engineering architectures, and technical notes on distributed systems, deep learning, and cloud infrastructure.
        </p>
      </header>

      {/* Sleek Segmented Filter Bar */}
      <div className="segmented-pill-bar">
        {CATEGORIES.map((cat) => {
          const isActive = selectedTopic === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedTopic(cat.id)}
              className={`segmented-pill-btn ${isActive ? "active" : ""}`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Unified Search Input */}
      <div className="search-bar-unified">
        <Search size={15} style={{ color: "var(--color-text-muted)" }} />
        <input
          ref={searchInputRef}
          type="text"
          className="search-unified-input"
          placeholder={`Search ${postsData.length} articles by keyword, topic, or #tag...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search articles"
        />
        {searchQuery ? (
          <button
            type="button"
            className="icon-btn"
            style={{ width: 24, height: 24, border: "none" }}
            onClick={() => setSearchQuery("")}
            title="Clear search"
          >
            <ClearIcon size={14} />
          </button>
        ) : (
          <kbd className="page-count-badge" style={{ padding: "0.1rem 0.4rem", fontSize: "0.72rem" }}>
            /
          </kbd>
        )}
      </div>

      {/* Grouped Posts */}
      {groupedByYear.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            backgroundColor: "var(--color-background-card)",
            border: "1px dashed var(--color-border)",
            borderRadius: "var(--border-radius)",
          }}
        >
          <SearchX size={32} style={{ color: "var(--color-text-muted)", margin: "0 auto 0.75rem" }} />
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.25rem" }}>No matching articles</h3>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
            No posts found matching &quot;{searchQuery}&quot; under &quot;{selectedTopic}&quot;.
          </p>
          <button
            type="button"
            className="btn"
            style={{ marginTop: "1rem" }}
            onClick={() => {
              setSearchQuery("");
              setSelectedTopic("all");
            }}
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="editorial-years-stack">
          {groupedByYear.map(({ year, items }) => (
            <section key={year}>
              <div className="editorial-year-row">
                <h2 className="editorial-year-number">{year}</h2>
                <span className="editorial-year-meta">
                  {items.length} {items.length === 1 ? "article" : "articles"}
                </span>
              </div>

              <div className="editorial-posts-list">
                {items.map((post) => (
                  <article key={post.slug} className="editorial-post-item">
                    <div className="editorial-post-left">
                      <time className="editorial-post-date">{post.date}</time>
                      <div className="editorial-post-content">
                        <Link href={`/notes/${post.slug}`} className="editorial-post-title">
                          {post.title}
                        </Link>
                        <p className="editorial-post-desc">{post.description}</p>
                      </div>
                    </div>

                    <div className="editorial-post-tags">
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className="editorial-tag-chip"
                          onClick={() => {
                            const clean = tag.replace("#", "");
                            setSelectedTopic(clean);
                          }}
                          title={`Filter by ${tag}`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export function BlogFeed() {
  return (
    <Suspense
      fallback={
        <div className="blog-container" style={{ padding: "3rem 0" }}>
          <p style={{ color: "var(--color-text-muted)" }}>Loading articles...</p>
        </div>
      }
    >
      <BlogFeedInner />
    </Suspense>
  );
}
