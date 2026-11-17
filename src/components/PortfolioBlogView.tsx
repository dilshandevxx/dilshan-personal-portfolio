"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/content";
import { Search, X as ClearIcon, SearchX, Clock, Tag } from "lucide-react";
import { AmbientPlayer } from "./AmbientPlayer";

interface TopicFilter {
  id: string;
  name: string;
}

const TOPIC_FILTERS: TopicFilter[] = [
  { id: "all", name: "All Articles" },
  { id: "Distributed Systems", name: "Distributed Systems" },
  { id: "AI/ML", name: "AI & Machine Learning" },
  { id: "React", name: "React & Next.js" },
  { id: "TypeScript", name: "TypeScript" },
  { id: "DevOps", name: "DevOps & K8s" },
  { id: "Architecture", name: "Architecture" },
];

export function PortfolioBlogView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const searchInputRef = useRef<HTMLInputElement>(null);

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
    const q = searchQuery.toLowerCase().trim();
    return siteConfig.blogPosts.filter((post) => {
      const matchesSearch =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      const matchesTopic =
        selectedTopic === "all" ||
        post.tags.some((t) => t.toLowerCase() === selectedTopic.toLowerCase() || t.toLowerCase().includes(selectedTopic.toLowerCase()));

      return matchesSearch && matchesTopic;
    });
  }, [searchQuery, selectedTopic]);

  // Group posts by Year
  const groupedByYear = useMemo(() => {
    const groups: { [year: number]: typeof siteConfig.blogPosts } = {};
    filteredPosts.forEach((post) => {
      const year = new Date(post.publishedAt).getFullYear();
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(post);
    });

    return Object.entries(groups)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, items]) => ({
        year: Number(year),
        items: items.sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        ),
      }));
  }, [filteredPosts]);

  const formatPostDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 📝 Blog Header (Tania Rascia Style) */}
      <header className="border-b border-[var(--border-subtle)] pb-6 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-[var(--text-primary)] flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label="Memo pad">📝</span>
            <span>Blog</span>
          </h1>
          <AmbientPlayer />
        </div>
        <p className="text-sm sm:text-base font-sans text-[var(--text-secondary)] max-w-3xl leading-relaxed">
          Tutorials, essays, and technical deep dives on distributed systems, applied AI, Kubernetes, and durable software design.
        </p>
      </header>

      {/* Search & Topic Filters */}
      <div className="space-y-4">
        {/* Search Bar with '/' keyboard badge */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            className="w-full pl-10 pr-24 py-2.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-card)] text-sm font-sans text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-color)] transition-colors"
            placeholder={`Search ${siteConfig.blogPosts.length} articles by title, topic, or #tag...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search articles"
          />
          <div className="absolute right-3 flex items-center gap-1.5">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                title="Clear search"
                aria-label="Clear search"
              >
                <ClearIcon className="w-4 h-4" />
              </button>
            ) : (
              <kbd className="px-2 py-0.5 text-[11px] font-mono rounded border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-muted)] select-none">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1" role="tablist" aria-label="Topic filters">
          {TOPIC_FILTERS.map((topic) => {
            const isActive = selectedTopic === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-3 py-1 text-xs font-mono rounded-full border transition-all ${
                  isActive
                    ? "bg-[var(--accent-color)] text-[var(--accent-text,white)] border-[var(--accent-color)] font-medium shadow-sm"
                    : "bg-[var(--surface-card)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                }`}
              >
                {topic.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grouped Articles by Year */}
      {groupedByYear.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-card)] space-y-3">
          <SearchX className="w-8 h-8 text-[var(--text-muted)] mx-auto" />
          <h2 className="text-base font-bold font-sans text-[var(--text-primary)]">
            No matching articles
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] max-w-sm mx-auto">
            No articles found matching &quot;{searchQuery}&quot; in topic &quot;{selectedTopic}&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedTopic("all");
            }}
            className="px-4 py-1.5 text-xs font-mono font-medium rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--accent-color)] hover:border-[var(--accent-color)] transition-colors mt-2"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {groupedByYear.map(({ year, items }) => (
            <section key={year} className="space-y-4">
              {/* Year Row with Count */}
              <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-2">
                <h2 className="text-xl sm:text-2xl font-bold font-sans text-[var(--text-primary)]">
                  {year}
                </h2>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {items.length} {items.length === 1 ? "article" : "articles"}
                </span>
              </div>

              {/* Articles in Year */}
              <div className="divide-y divide-[var(--border-subtle)]">
                {items.map((post) => (
                  <article
                    key={post.slug}
                    className="py-4 sm:py-5 group transition-colors flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
                  >
                    {/* Date Column */}
                    <div className="sm:w-20 shrink-0 text-xs font-mono text-[var(--text-muted)]">
                      <time dateTime={post.publishedAt}>
                        {formatPostDate(post.publishedAt)}
                      </time>
                    </div>

                    {/* Content Column */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <Link
                          href={`/portfolio/blog/${post.slug}`}
                          className="text-base sm:text-lg font-bold font-sans text-[var(--accent-color)] hover:underline underline-offset-4 decoration-[var(--accent-color)] transition-colors"
                        >
                          {post.title}
                        </Link>
                        <span className="shrink-0 text-xs font-mono text-[var(--text-muted)] hidden md:inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readingTime}</span>
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                        {post.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {post.tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setSelectedTopic(tag)}
                            className="inline-flex items-center text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors"
                            title={`Filter by ${tag}`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
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
