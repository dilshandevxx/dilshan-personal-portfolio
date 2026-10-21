import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/data/content';
import { ArrowLeft, Bookmark } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteConfig.blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = siteConfig.blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Essay Not Found' };

  return {
    title: `${post.title} — Dilshan K.`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = siteConfig.blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <article className="max-w-3xl mx-auto space-y-10 selection:bg-[var(--accent-subtle)] selection:text-[var(--accent-color)]">
      {/* Top Navigation / Breadcrumbs */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-4">
        <Link
          href="/portfolio/blog"
          className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Essays</span>
        </Link>
        <div className="flex items-center gap-2">
          <span>{post.readingTime}</span>
        </div>
      </div>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-color)]">
          <Bookmark className="w-3.5 h-3.5" />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-primary)] tracking-tight leading-[1.15]">
          {post.title}
        </h1>

        <p className="font-serif italic text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed">
          {post.subtitle}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded text-xs font-mono bg-[var(--badge-bg)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Editorial Rule */}
      <div className="w-20 h-0.5 bg-[var(--accent-color)] opacity-60" aria-hidden="true" />

      {/* Article Body Content */}
      <div className="font-sans text-[var(--text-primary)] leading-[1.8] text-base space-y-6">
        {post.content.split('\n\n').map((paragraph, idx) => {
          // Check for code blocks
          if (paragraph.startsWith('```')) {
            const cleanCode = paragraph.replace(/```[a-z]*\n?/g, '');
            return (
              <pre
                key={idx}
                className="my-6 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-strong)] font-mono text-xs overflow-x-auto text-[var(--text-secondary)] leading-relaxed"
              >
                <code>{cleanCode}</code>
              </pre>
            );
          }

          // Check for Blockquotes
          if (paragraph.startsWith('> ')) {
            return (
              <blockquote
                key={idx}
                className="my-6 pl-4 border-l-2 border-[var(--accent-color)] font-serif italic text-base sm:text-lg text-[var(--text-secondary)] bg-[var(--bg-subtle)]/60 py-2 pr-3 rounded-r"
              >
                {paragraph.replace('> ', '')}
              </blockquote>
            );
          }

          // Check for Headings
          if (paragraph.startsWith('### ')) {
            return (
              <h3
                key={idx}
                className="text-xl sm:text-2xl font-serif font-semibold text-[var(--text-primary)] pt-6 pb-2"
              >
                {paragraph.replace('### ', '')}
              </h3>
            );
          }

          return (
            <p key={idx} className="text-sm sm:text-base text-[var(--text-secondary)]">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Post Footer */}
      <footer className="pt-8 border-t border-[var(--border-subtle)] space-y-6">
        <div className="p-5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] space-y-2 text-xs font-mono">
          <p className="font-semibold text-[var(--text-primary)] font-serif text-sm">
            Dilshan K.
          </p>
          <p className="text-[var(--text-muted)] font-sans">
            Software engineer focusing on distributed systems and mindful computing.
            Have thoughts, questions, or alternative perspectives on this essay?
          </p>
          <div className="pt-2">
            <a
              href="mailto:hello@dilshan.dev"
              className="text-[var(--accent-color)] hover:underline inline-flex items-center gap-1 font-mono"
            >
              <span>Send response via email</span>
              <span>→</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
          <Link
            href="/portfolio/blog"
            className="text-[var(--accent-color)] hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Writing Index</span>
          </Link>
          <Link
            href="/portfolio"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Portfolio Overview
          </Link>
        </div>
      </footer>
    </article>
  );
}
