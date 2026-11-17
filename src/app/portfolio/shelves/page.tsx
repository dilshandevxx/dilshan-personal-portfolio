import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/content';
import { guidesData } from '@/data/guides';
import {
  BookOpen,
  Coffee,
  Layers,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { AmbientPlayer } from '@/components/AmbientPlayer';
import styles from './shelves.module.css';

export const metadata = {
  title: 'Shelves — Dilshan',
  description: 'Curated technical guides, architecture deep dives, reading list, and analog everyday rituals.',
};

export default function ShelvesPage() {
  return (
    <article className={styles.pageContainer}>
      {/* 🔍 Shelves Header (Tania Rascia Style) */}
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

        {/* Section Quick-Jump Anchors */}
        <nav className={styles.jumpPillsRow} aria-label="Section anchors">
          <a href="#guides" className={styles.jumpPill}>
            #guides
          </a>
          <a href="#bookshelf" className={styles.jumpPill}>
            #bookshelf
          </a>
          <a href="#analog-gear" className={styles.jumpPill}>
            #analog-gear
          </a>
        </nav>
      </header>

      {/* 1. Guides & Deep Dives (Tania Rascia "Shelves" Core Concept) */}
      <section id="guides" className={styles.sectionBlock}>
        <h2 className={styles.sectionHeading}>
          <Layers className={styles.sectionIcon} />
          <span>Guides &amp; Deep Dives</span>
        </h2>
        <p className={styles.sectionDesc}>
          Structured paths through complex engineering domains: distributed platforms, authorization protocols, inference engines, and language foundations.
        </p>

        {guidesData.map((section) => (
          <div key={section.id} className={styles.shelfGroup}>
            <h3 className={styles.groupTitle}>{section.title}</h3>
            <p className={styles.groupDesc}>{section.description}</p>

            <div className={styles.guideGrid}>
              {section.links.map((link) => (
                <Link
                  key={link.title}
                  href="/portfolio/blog"
                  className={styles.guideCard}
                >
                  <div className={styles.guideMain}>
                    <span className={styles.guideTag}>{link.tag}</span>
                    <h4 className={styles.guideTitle}>{link.title}</h4>
                  </div>
                  <ArrowRight className={styles.guideArrow} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 2. Bookshelf & Reading List */}
      <section id="bookshelf" className={styles.sectionBlock}>
        <h2 className={styles.sectionHeading}>
          <BookOpen className={styles.sectionIcon} />
          <span>Bookshelf &amp; Reading List</span>
        </h2>
        <p className={styles.sectionDesc}>
          Seminal works in computer architecture, systems resilience, and deliberate craftsmanship that have shaped how I write software and design interfaces.
        </p>

        <div className={styles.booksGrid}>
          {siteConfig.books.map((book) => {
            const isReading = book.status === 'Currently Reading';
            return (
              <div key={book.title} className={styles.bookCard}>
                <div className={styles.bookMetaRow}>
                  <span className={styles.bookCategory}>{book.category}</span>
                  <span
                    className={`${styles.bookStatus} ${
                      isReading ? styles.statusReading : styles.statusRead
                    }`}
                  >
                    {book.status}
                  </span>
                </div>

                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookAuthor}>by {book.author}</p>
                <p className={styles.bookNote}>{book.note}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Analog Rituals & Everyday Tools (Off the Clock) */}
      <section id="analog-gear" className={styles.sectionBlock}>
        <h2 className={styles.sectionHeading}>
          <Coffee className={styles.sectionIcon} />
          <span>Analog Rituals &amp; Everyday Gear</span>
        </h2>
        <p className={styles.sectionDesc}>
          Off-the-clock habits, analog instruments, and mechanical tools chosen for longevity, tactile feedback, and timeless build quality.
        </p>

        <div className={styles.gearGrid}>
          {siteConfig.hobbies.map((hobby) => (
            <div key={hobby.title} className={styles.gearCard}>
              <div className={styles.gearHeader}>
                <span className={styles.gearCategory}>{hobby.category}</span>
              </div>

              <h3 className={styles.gearTitle}>{hobby.title}</h3>
              <p className={styles.gearDesc}>{hobby.description}</p>

              <ul className={styles.gearKitList}>
                {hobby.details.map((detail, idx) => (
                  <li key={idx} className={styles.gearKitItem}>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Shelf Philosophy & Colophon */}
      <aside className={styles.colophonBox}>
        <div className={styles.colophonKicker}>
          <Compass size={14} />
          <span>Shelf Philosophy</span>
        </div>
        <blockquote className={styles.colophonQuote}>
          &ldquo;Buy less, choose well, make it last.&rdquo; I prioritize tools and instruments crafted from durable mechanical materials that age gracefully over time—whether precision hand grinders with steel burrs, well-regulated solid-wood guitars, or hardbound books with sewn bindings.
        </blockquote>
      </aside>
    </article>
  );
}
