import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { postsData } from "@/data/notes";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export async function generateStaticParams() {
  return postsData.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postsData.find((n) => n.slug === slug);
  if (!post) return { title: "Note Not Found" };
  return {
    title: `${post.title} — ${siteConfig.siteName}`,
    description: post.description,
  };
}

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = postsData.findIndex((n) => n.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const post = postsData[currentIndex];
  const prevPost = currentIndex > 0 ? postsData[currentIndex - 1] : null;
  const nextPost = currentIndex < postsData.length - 1 ? postsData[currentIndex + 1] : null;

  return (
    <article className="blog-container" style={{ maxWidth: "760px" }}>
      {/* Header */}
      <div className="note-page-header">
        <Link href="/blog" className="note-back-link">
          <ArrowLeft size={14} />
          <span>Back to Articles</span>
        </Link>

        <h1 className="note-headline">{post.title}</h1>

        <div className="note-meta-bar">
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
            <Calendar size={13} />
            <time>{post.date}, {post.year}</time>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
            <Clock size={13} />
            <span>4 min read</span>
          </span>
        </div>
      </div>

      {/* Prose Body */}
      <div className="note-prose-container">
        <p className="note-lead-quote">
          {post.description}
        </p>

        <div className="note-content-body">
          {post.content}
        </div>
      </div>

      {/* Tags */}
      <div className="note-tags-footer">
        <Tag size={14} style={{ color: "var(--color-text-muted)" }} />
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog?search=${encodeURIComponent(tag.replace("#", ""))}`}
            className="editorial-tag-chip"
          >
            {tag}
          </Link>
        ))}
      </div>

      {/* Previous / Next Article Navigation */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
          marginTop: "2.5rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        {prevPost ? (
          <Link
            href={`/notes/${prevPost.slug}`}
            className="shelf-editorial-card"
            style={{ padding: "1.25rem", textDecoration: "none" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)", marginBottom: "0.35rem" }}>
              <ArrowLeft size={12} />
              <span>PREVIOUS</span>
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-text-emphasized)" }}>
              {prevPost.title}
            </div>
          </Link>
        ) : <div />}

        {nextPost && (
          <Link
            href={`/notes/${nextPost.slug}`}
            className="shelf-editorial-card"
            style={{ padding: "1.25rem", textDecoration: "none", textAlign: "right" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.35rem", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)", marginBottom: "0.35rem" }}>
              <span>NEXT</span>
              <ArrowRight size={12} />
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-text-emphasized)" }}>
              {nextPost.title}
            </div>
          </Link>
        )}
      </div>
    </article>
  );
}
