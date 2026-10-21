import React from 'react';
import { siteConfig } from '@/data/content';
import { BlogCard } from '@/components/BlogCard';

export const metadata = {
  title: 'Blog — Dilshan',
  description: 'Articles, essays, and notes on distributed systems, web architecture, and modern software craft.',
};

export default function BlogRoutePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 📝 Blog Header (Tania Rascia Style) */}
      <div className="space-y-3 border-b border-[var(--border-subtle)] pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold font-sans text-[var(--text-primary)] flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="Memo pad">📝</span>
          <span>Blog</span>
        </h1>
        <p className="text-sm sm:text-base font-sans text-[var(--text-secondary)] max-w-3xl leading-relaxed">
          Tutorials, essays, and technical explorations in distributed systems, local-first architecture, and software design.
        </p>
      </div>

      {/* Essays List */}
      <div className="space-y-6">
        {siteConfig.blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
