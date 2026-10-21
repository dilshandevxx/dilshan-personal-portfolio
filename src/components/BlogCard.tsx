'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/content';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  // Format date nicely (e.g. March 12, 2026)
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <article className="group rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] p-6 transition-all card-shadow">
      {/* Metadata Row */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)] pb-2 mb-2 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[var(--accent-color)]" aria-hidden="true" />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{post.readingTime}</span>
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-1.5 mb-3">
        <h3 className="text-lg sm:text-xl font-serif font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors">
          <Link href={`/portfolio/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="text-xs font-mono text-[var(--text-secondary)] italic">
          {post.subtitle}
        </p>
      </div>

      {/* Summary */}
      <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
        {post.summary}
      </p>

      {/* Tags and Read Link */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-subtle)]">
        <div className="flex flex-wrap gap-1.5" aria-label="Tags">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--badge-bg)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          href={`/portfolio/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent-color)] font-medium hover:translate-x-0.5 transition-transform"
        >
          <span>Read Essay</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
