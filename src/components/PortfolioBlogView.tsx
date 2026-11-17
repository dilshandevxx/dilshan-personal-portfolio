"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/content";
import { Search, X as ClearIcon, SearchX, Clock } from "lucide-react";
import { AmbientPlayer } from "./AmbientPlayer";
import styles from "@/app/portfolio/blog/blog.module.css";

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
        post.tags.some(
          (t) =>
            t.toLowerCase() === selectedTopic.toLowerCase() ||
            t.toLowerCase().includes(selectedTopic.toLowerCase())
        );

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
          (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
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
    <article className={styles.pageContainer}>
      {/* 📝 Blog Header (Tania Rascia Style) */}
      <header>
        <div className={styles.headerTop}>
          <h1 className={styles.headerTitle}>
            <span className={styles.memoEmoji} role="img" aria-label="Memo pad">
              📝
            </span>
            <span>Blog</span>
          </h1>
          <AmbientPlayer />
        </div>
        <p className={styles.headerLead}>
          Tutorials, essays, and technical deep dives on distributed systems, applied AI, Kubernetes, and durable software design.
        </p>
      </header>

      {/* Search & Topic Filters */}
      <div className={styles.controlsBlock}>
        {/* Search Bar with '/' keyboard badge */}
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            ref={searchInputRef}
            type="text"
            className={styles.searchInput}
            placeholder={`Search ${siteConfig.blogPosts.length} articles by title, topic, or #tag...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search articles"
          />
          <div className={styles.searchActions}>
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className={styles.clearBtn}
                title="Clear search"
                aria-label="Clear search"
              >
                <ClearIcon size={14} />
              </button>
            ) : (
              <kbd className={styles.kbdBadge}>/</kbd>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className={styles.filterPillsRow} role="tablist" aria-label="Topic filters">
          {TOPIC_FILTERS.map((topic) => {
            const isActive = selectedTopic === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedTopic(topic.id)}
                className={`${styles.filterPill} ${isActive ? styles.filterPillActive : ""}`}
              >
                {topic.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grouped Articles by Year */}
      {groupedByYear.length === 0 ? (
        <div className={styles.emptyState}>
          <SearchX size={32} style={{ color: "#64748b" }} />
          <h2 className={styles.emptyTitle}>No matching articles</h2>
          <p className={styles.emptyText}>
            No articles found matching &quot;{searchQuery}&quot; in topic &quot;{selectedTopic}&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedTopic("all");
            }}
            className={styles.resetBtn}
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div>
          {groupedByYear.map(({ year, items }) => (
            <section key={year} className={styles.yearSection}>
              {/* Year Row with Count */}
              <div className={styles.yearHeader}>
                <h2 className={styles.yearTitle}>{year}</h2>
                <span className={styles.yearCount}>
                  {items.length} {items.length === 1 ? "article" : "articles"}
                </span>
              </div>

              {/* Articles in Year */}
              <div className={styles.articlesList}>
                {items.map((post) => (
                  <article key={post.slug} className={styles.articleItem}>
                    {/* Date Column */}
                    <time dateTime={post.publishedAt} className={styles.articleDate}>
                      {formatPostDate(post.publishedAt)}
                    </time>

                    {/* Content Column */}
                    <div className={styles.articleContent}>
                      <div className={styles.articleHeadingRow}>
                        <Link
                          href={`/portfolio/blog/${post.slug}`}
                          className={styles.articleLink}
                        >
                          {post.title}
                        </Link>
                        <span className={styles.readingTime}>
                          <Clock size={12} />
                          <span>{post.readingTime}</span>
                        </span>
                      </div>

                      <p className={styles.articleSummary}>{post.summary}</p>

                      {/* Tags */}
                      <div className={styles.tagsRow}>
                        {post.tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setSelectedTopic(tag)}
                            className={styles.tagBtn}
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
    </article>
  );
}
