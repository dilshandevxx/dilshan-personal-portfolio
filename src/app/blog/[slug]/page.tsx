import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/data/content';
import { postsData } from '@/data/notes';
import { SkyLabsNavbar } from '@/components/SkyLabsNavbar';
import MainFooter from '@/components/MainFooter';
import { ArrowLeft, Bookmark } from 'lucide-react';
import styles from './post.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface UnifiedPost {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  content: string;
}

function getAllBlogPosts(): UnifiedPost[] {
  const fromContent: UnifiedPost[] = siteConfig.blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    summary: post.summary,
    publishedAt: post.publishedAt,
    readingTime: post.readingTime,
    tags: post.tags,
    content: post.content,
  }));

  const existing = new Set(fromContent.map((p) => p.slug));
  const fromNotes: UnifiedPost[] = postsData
    .filter((n) => !existing.has(n.slug))
    .map((n) => ({
      slug: n.slug,
      title: n.title,
      subtitle: n.description,
      summary: n.description,
      publishedAt: `${n.date}, ${n.year}`,
      readingTime: '4 min read',
      tags: n.tags.map((t) => t.replace(/^#/, '')),
      content: n.content,
    }));

  return [...fromContent, ...fromNotes];
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getAllBlogPosts().find((p) => p.slug === slug);
  if (!post) return { title: 'Essay Not Found' };

  return {
    title: `${post.title} — Dilshan`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getAllBlogPosts().find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) return dateString;
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
    <div style={{ backgroundColor: '#111111', minHeight: '100vh', width: '100%', paddingTop: '6.5rem' }}>
      <SkyLabsNavbar />
      <article className={styles.articleContainer}>
        {/* Top Navigation / Breadcrumbs */}
        <nav className={styles.topNav} aria-label="Breadcrumb">
          <Link href="/blog" className={styles.backLink}>
            <ArrowLeft size={14} />
            <span>All Essays</span>
          </Link>
          <span>{post.readingTime}</span>
        </nav>

        {/* Article Header */}
        <header className={styles.postHeader}>
          <div className={styles.dateRow}>
            <Bookmark size={14} />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>

          <h1 className={styles.postTitle}>{post.title}</h1>

          <p className={styles.postSubtitle}>{post.subtitle}</p>

          {/* Tags */}
          <div className={styles.tagsRow}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tagPill}>
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Editorial Rule */}
        <div className={styles.editorialRule} aria-hidden="true" />

        {/* Article Body Content */}
        <div className={styles.contentArea}>
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('```')) {
              const cleanCode = paragraph.replace(/```[a-z]*\n?/g, '');
              return (
                <pre key={idx} className={styles.codeBlock}>
                  <code>{cleanCode}</code>
                </pre>
              );
            }

            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={idx} className={styles.blockquote}>
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }

            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className={styles.contentHeading}>
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }

            return (
              <p key={idx} className={styles.paragraph}>
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Post Footer */}
        <footer className={styles.footerArea}>
          <div className={styles.authorBox}>
            <p className={styles.authorName}>Dilshan</p>
            <p className={styles.authorBio}>
              Software engineer focusing on distributed systems and mindful computing.
              Have thoughts, questions, or alternative perspectives on this essay?
            </p>
            <a
              href={`mailto:dilshan.devxx@gmail.com?subject=Re:%20${encodeURIComponent(post.title)}`}
              className={styles.emailPrompt}
            >
              <span>Send response via email</span>
              <span>&rarr;</span>
            </a>
          </div>

          <div className={styles.bottomNav}>
            <Link href="/blog" className={styles.backLink}>
              <ArrowLeft size={14} />
              <span>Back to Writing Index</span>
            </Link>
            <Link
              href="/"
              style={{ color: '#788090', textDecoration: 'none' }}
            >
              Home
            </Link>
          </div>
        </footer>
      </article>
      <MainFooter />
    </div>
  );
}
