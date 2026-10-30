"use client";

import React, { useState, useMemo, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, X as ClearIcon, ArrowRight } from "lucide-react";
import { postsData } from "@/data/notes";
import styles from "./ModernBlog.module.css";

const TOPICS = [
  { id: "all", name: "ALL" },
  { id: "ai-ml", name: "AI & ML" },
  { id: "react", name: "REACT & NEXT.JS" },
  { id: "typescript", name: "TYPESCRIPT" },
  { id: "kubernetes", name: "DEVOPS & K8S" },
  { id: "docker", name: "DOCKER" },
];

function ModernBlogFeedInner() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = searchParams.get("search");
    const t = searchParams.get("topic");
    if (q) setSearchQuery(q);
    if (t) setSelectedTopic(t);
  }, [searchParams]);

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

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className={styles.pageSection}>
      {/* 1. Header Section */}
      <div className={styles.headerContainer}>
        <motion.div
          className={styles.pillBadge}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className={styles.badgeDot} aria-hidden="true" />
          <span>TECHNICAL PERSPECTIVES &amp; FIELD NOTES</span>
        </motion.div>

        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          ESSAYS ON DISTRIBUTED SYSTEMS, AI, &amp; CRAFT.
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          In-depth architectural blueprints, GPU inference benchmarks, and practical engineering tutorials grounded in production realities.
        </motion.p>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} size={18} />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search essays by keyword, topic, or #tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
              }}
              aria-label="Clear search"
            >
              <ClearIcon size={16} />
            </button>
          ) : (
            <kbd className={styles.searchKbd}>/</kbd>
          )}
        </div>

        <div className={styles.topicsList}>
          {TOPICS.map((topic) => {
            const isActive = selectedTopic === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedTopic(topic.id)}
                className={`${styles.topicBtn} ${isActive ? styles.topicBtnActive : ""}`}
              >
                {topic.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Featured Article Spotlight */}
      {featuredPost && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href={`/notes/${featuredPost.slug}`} className={styles.featuredSpotlight}>
            <div className={styles.featuredImageWrapper}>
              <Image
                src="/images/blog_arch.png"
                alt={featuredPost.title}
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                className={styles.featuredImage}
                priority
              />
            </div>

            <div className={styles.featuredContent}>
              <div className={styles.featuredTagRow}>
                <span className={styles.featuredTag}>FEATURED PERSPECTIVE</span>
                <span className={styles.readingTime}>4 min read</span>
              </div>

              <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
              <p className={styles.featuredExcerpt}>{featuredPost.description}</p>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#d2a072", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                <span>Read Full Essay</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* 4. Articles Grid */}
      <div className={styles.articlesGrid}>
        {gridPosts.map((post, idx) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
          >
            <Link href={`/notes/${post.slug}`} className={styles.articleCard}>
              <div className={styles.articleMeta}>
                <span className={styles.articleTag}>{post.tags[0]?.replace("#", "") || "TECHNICAL"}</span>
                <span className={styles.articleDate}>{post.date}, {post.year} · 4 min read</span>
              </div>

              <h3 className={styles.articleTitle}>{post.title}</h3>
              <p className={styles.articleExcerpt}>{post.description}</p>

              <div className={styles.articleTags}>
                {post.tags.map((t) => (
                  <span key={t} className={styles.tagPill}>{t}</span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ModernBlogFeed() {
  return (
    <Suspense fallback={<div style={{ padding: "4rem 2rem", textAlign: "center", color: "#64748b" }}>Loading essays...</div>}>
      <ModernBlogFeedInner />
    </Suspense>
  );
}
