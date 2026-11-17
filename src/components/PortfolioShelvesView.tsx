"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/content";
import { guidesData } from "@/data/guides";
import { Search, X as ClearIcon, SearchX, Layers, BookOpen, Coffee, Compass } from "lucide-react";
import { AmbientPlayer } from "./AmbientPlayer";
import styles from "@/app/portfolio/shelves/shelves.module.css";

interface ShelfFilter {
  id: string;
  name: string;
}

const SHELF_FILTERS: ShelfFilter[] = [
  { id: "all", name: "All Shelves" },
  { id: "guides", name: "Guides & Deep Dives" },
  { id: "books", name: "Bookshelf" },
  { id: "analog", name: "Analog Rituals" },
];

export function PortfolioShelvesView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
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

  // Flatten guides for easy filtering
  const allGuideLinks = useMemo(() => {
    const list: Array<{
      title: string;
      tag: string;
      sectionTitle: string;
      sectionDesc: string;
    }> = [];

    guidesData.forEach((section) => {
      section.links.forEach((link) => {
        list.push({
          title: link.title,
          tag: link.tag,
          sectionTitle: section.title,
          sectionDesc: section.description,
        });
      });
    });

    return list;
  }, []);

  // Filtered guides
  const filteredGuides = useMemo(() => {
    if (selectedFilter === "books" || selectedFilter === "analog") return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allGuideLinks;

    return allGuideLinks.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.tag.toLowerCase().includes(q) ||
        g.sectionTitle.toLowerCase().includes(q)
    );
  }, [allGuideLinks, searchQuery, selectedFilter]);

  // Filtered books
  const filteredBooks = useMemo(() => {
    if (selectedFilter === "guides" || selectedFilter === "analog") return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return siteConfig.books;

    return siteConfig.books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.note.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
  }, [searchQuery, selectedFilter]);

  // Filtered hobbies / gear
  const filteredHobbies = useMemo(() => {
    if (selectedFilter === "guides" || selectedFilter === "books") return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return siteConfig.hobbies;

    return siteConfig.hobbies.filter(
      (h) =>
        h.title.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q) ||
        h.details.some((d) => d.toLowerCase().includes(q))
    );
  }, [searchQuery, selectedFilter]);

  const totalResults =
    filteredGuides.length + filteredBooks.length + filteredHobbies.length;

  return (
    <article className={styles.pageContainer}>
      {/* 🔍 Shelves Header */}
      <header>
        <div className={styles.headerTop}>
          <h1 className={styles.headerTitle}>
            <span className={styles.searchEmoji} role="img" aria-label="Magnifying glass">
              🔍
            </span>
            <span>Shelves</span>
          </h1>
          <AmbientPlayer />
        </div>
        <p className={styles.headerLead}>
          Hand-picked paths through all my technical writing, structured topic guides, reading list, and analog everyday rituals.
        </p>
      </header>

      {/* Search & Section Filter Controls */}
      <div className={styles.controlsBlock}>
        {/* Search Bar with '/' keyboard badge */}
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            ref={searchInputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search guides, books, and analog gear by title, topic, or #tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search shelves"
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
        <div className={styles.filterPillsRow} role="tablist" aria-label="Shelves filters">
          {SHELF_FILTERS.map((filter) => {
            const isActive = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedFilter(filter.id)}
                className={`${styles.filterPill} ${isActive ? styles.filterPillActive : ""}`}
              >
                {filter.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {totalResults === 0 ? (
        <div className={styles.emptyState}>
          <SearchX size={32} style={{ color: "#64748b" }} />
          <h2 className={styles.emptyTitle}>No matching items found</h2>
          <p className={styles.emptyText}>
            No entries found matching &quot;{searchQuery}&quot;. Try searching for another topic or clear filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedFilter("all");
            }}
            className={styles.resetBtn}
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div>
          {/* 1. Guides & Deep Dives (Strictly NO Cards - Clean Editorial List) */}
          {filteredGuides.length > 0 && (
            <section className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <Layers className={styles.sectionIcon} />
                  <span>Guides &amp; Deep Dives</span>
                </h2>
                <span className={styles.sectionCount}>
                  {filteredGuides.length} {filteredGuides.length === 1 ? "guide" : "guides"}
                </span>
              </div>

              <div className={styles.itemsList}>
                {filteredGuides.map((guide) => (
                  <article key={guide.title} className={styles.shelfItem}>
                    {/* Monospace Tag Column */}
                    <div className={styles.itemLabel}>
                      [{guide.tag}]
                    </div>

                    {/* Content Column */}
                    <div className={styles.itemContent}>
                      <div className={styles.itemHeadingRow}>
                        <Link href="/portfolio/blog" className={styles.itemTitleLink}>
                          {guide.title}
                        </Link>
                        <span className={styles.metaText}>
                          {guide.sectionTitle}
                        </span>
                      </div>

                      <p className={styles.itemSummary}>
                        {guide.sectionDesc}
                      </p>

                      <div className={styles.tagsRow}>
                        <button
                          type="button"
                          onClick={() => setSearchQuery(guide.tag)}
                          className={styles.tagBtn}
                        >
                          #{guide.tag.toLowerCase()}
                        </button>
                        <span className={styles.tagBtn}>#architecture</span>
                        <span className={styles.tagBtn}>#deep-dive</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* 2. Bookshelf & Reading List (Strictly NO Cards - Clean Editorial List) */}
          {filteredBooks.length > 0 && (
            <section className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <BookOpen className={styles.sectionIcon} />
                  <span>Bookshelf &amp; Reading List</span>
                </h2>
                <span className={styles.sectionCount}>
                  {filteredBooks.length} {filteredBooks.length === 1 ? "volume" : "volumes"}
                </span>
              </div>

              <div className={styles.itemsList}>
                {filteredBooks.map((book) => (
                  <article key={book.title} className={styles.shelfItem}>
                    {/* Status / Category Column */}
                    <div className={styles.itemLabel}>
                      [{book.status === "Currently Reading" ? "Reading" : "Finished"}]
                    </div>

                    {/* Content Column */}
                    <div className={styles.itemContent}>
                      <div className={styles.itemHeadingRow}>
                        <h3 className={styles.itemTitleStatic}>{book.title}</h3>
                        <span className={styles.metaText}>by {book.author}</span>
                      </div>

                      <p className={styles.itemSummary}>{book.note}</p>

                      <div className={styles.tagsRow}>
                        <button
                          type="button"
                          onClick={() => setSearchQuery(book.category)}
                          className={styles.tagBtn}
                        >
                          #{book.category.toLowerCase()}
                        </button>
                        <span className={styles.tagBtn}>
                          #{book.status.toLowerCase().replace(/\s+/g, "-")}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* 3. Analog Rituals & Everyday Tools (Strictly NO Cards - Clean Editorial List) */}
          {filteredHobbies.length > 0 && (
            <section className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <Coffee className={styles.sectionIcon} />
                  <span>Analog Rituals &amp; Everyday Tools</span>
                </h2>
                <span className={styles.sectionCount}>
                  {filteredHobbies.length} {filteredHobbies.length === 1 ? "collection" : "collections"}
                </span>
              </div>

              <div className={styles.itemsList}>
                {filteredHobbies.map((hobby) => (
                  <article key={hobby.title} className={styles.shelfItem}>
                    {/* Category Column */}
                    <div className={styles.itemLabel}>
                      [{hobby.category}]
                    </div>

                    {/* Content Column */}
                    <div className={styles.itemContent}>
                      <div className={styles.itemHeadingRow}>
                        <h3 className={styles.itemTitleStatic}>{hobby.title}</h3>
                        <span className={styles.metaText}>Tactile Craft</span>
                      </div>

                      <p className={styles.itemSummary}>{hobby.description}</p>

                      <div className={styles.tagsRow}>
                        {hobby.details.map((detail) => (
                          <span key={detail} className={styles.tagBtn}>
                            #{detail.toLowerCase().replace(/\s+/g, "-")}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* 4. Minimalist Shelf Philosophy (Colophon) */}
          <aside className={styles.colophonBlock}>
            <div className={styles.colophonKicker}>
              <Compass size={14} />
              <span>Shelf Philosophy</span>
            </div>
            <blockquote className={styles.colophonQuote}>
              &ldquo;Buy less, choose well, make it last.&rdquo; I prioritize tools and instruments crafted from durable mechanical materials that age gracefully over time—whether precision hand grinders with steel burrs, well-regulated solid-wood guitars, or hardbound books with sewn bindings.
            </blockquote>
          </aside>
        </div>
      )}
    </article>
  );
}
