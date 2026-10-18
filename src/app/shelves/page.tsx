import React from "react";
import Link from "next/link";
import { shelvesData } from "@/data/shelves";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUpRight, Compass, Layers } from "lucide-react";

export const metadata = {
  title: `Shelves — ${siteConfig.siteName}`,
  description: "Curated learning paths through everything I've written.",
};

export default function ShelvesPage() {
  const totalTopics = shelvesData.reduce((acc, curr) => acc + curr.topics.length, 0);

  return (
    <div className="page-extended-container">
      {/* Editorial Header */}
      <header className="page-header-editorial">
        <div className="page-header-topline">
          <h1 className="page-title-editorial">
            Curated <span className="title-accent">Shelves</span>
          </h1>
          <div className="page-count-badge">
            <Layers size={13} />
            <span>{shelvesData.length} Tracks · {totalTopics} Topics</span>
          </div>
        </div>
        <p className="page-subtitle-editorial">
          Structured learning tracks, architectural roadmaps, and domain deep dives through distributed systems, deep learning pipelines, and full-stack engineering.
        </p>
      </header>

      {/* Focused Shelves Content Column */}
      <div className="shelves-content-narrow">
        {/* Intro Banner */}
        <div className="shelf-intro-banner">
          <Compass size={17} className="shelf-intro-icon" />
          <div className="shelf-intro-text">
            <strong>Curated Learning Paths:</strong> While the blog contains chronological posts, shelves organize notes, benchmarks, and production retrospectives into structured mastery paths. Click any topic to explore its related articles.
          </div>
        </div>

        {/* Shelves Stack */}
        <div className="shelves-grid">
          {shelvesData.map((shelf, idx) => {
            const trackNumber = String(idx + 1).padStart(2, "0");
            const totalNotesInTrack = shelf.topics.reduce((sum, t) => sum + t.count, 0);

            return (
              <section key={shelf.slug} className="shelf-editorial-card">
                <div className="shelf-card-topline">
                  <span className="shelf-card-index">TRACK // {trackNumber}</span>
                  <span className="project-card-badge">
                    {totalNotesInTrack} Total Notes
                  </span>
                </div>

                <h2 className="shelf-card-title">{shelf.title}</h2>
                <p className="shelf-card-desc">{shelf.description}</p>

                <div className="shelf-topics-list">
                  {shelf.topics.map((topic) => {
                    const searchParam = topic.tag.replace("#", "");
                    return (
                      <Link
                        key={topic.name}
                        href={`/blog?search=${encodeURIComponent(searchParam)}`}
                        className="shelf-topic-item"
                      >
                        <span className="shelf-topic-name">{topic.name}</span>
                        <div className="shelf-topic-meta">
                          <span className="shelf-topic-count">{topic.count}</span>
                          <ArrowUpRight size={13} className="shelf-topic-arrow" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
