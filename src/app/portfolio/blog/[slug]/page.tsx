import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/data/content';
import { ArrowLeft, Bookmark } from 'lucide-react';
import styles from './post.module.css';

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
    title: `${post.title} — Dilshan`,
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
    <article className={styles.articleContainer}>
      {/* Top Navigation / Breadcrumbs */}
      <nav className={styles.topNav} aria-label="Breadcrumb">
        <Link href="/portfolio/blog" className={styles.backLink}>
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
          // Check for code blocks
          if (paragraph.startsWith('```')) {
            const cleanCode = paragraph.replace(/```[a-z]*\n?/g, '');
            return (
              <pre key={idx} className={styles.codeBlock}>
                <code>{cleanCode}</code>
              </pre>
            );
          }

          // Check for Blockquotes
          if (paragraph.startsWith('> ')) {
            return (
              <blockquote key={idx} className={styles.blockquote}>
                {paragraph.replace('> ', '')}
              </blockquote>
            );
          }

          // Check for Headings
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
            href={`mailto:hello@dilshan.dev?subject=Re:%20${encodeURIComponent(post.title)}`}
            className={styles.emailPrompt}
          >
            <span>Send response via email</span>
            <span>&rarr;</span>
          </a>
        </div>

        <div className={styles.bottomNav}>
          <Link href="/portfolio/blog" className={styles.backLink}>
            <ArrowLeft size={14} />
            <span>Back to Writing Index</span>
          </Link>
          <Link
            href="/portfolio"
            style={{ color: '#788090', textDecoration: 'none' }}
          >
            Portfolio Overview
          </Link>
        </div>
      </footer>
    </article>
  );
}
