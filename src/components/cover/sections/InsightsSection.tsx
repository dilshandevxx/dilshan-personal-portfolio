"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./InsightsSection.module.css";

interface ArticleItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

const ARTICLES: ArticleItem[] = [
  {
    id: "article-80-20",
    badge: "Perspectives",
    title: "The 80/20 Rule of Social Content",
    subtitle: "How to keep people talking.",
    image: "/images/article_wales.jpg",
    href: "/portfolio/blog/zero-dependency-web-design",
  },
  {
    id: "article-building-bace",
    badge: "Process",
    title: "Building Bace",
    subtitle: "Making fitness feel human again.",
    image: "/images/article_neurogen.jpg",
    href: "/portfolio/blog/resilience-in-distributed-systems",
  },
  {
    id: "article-brand-universe",
    badge: "Perspectives",
    title: "A Brand Universe vs. a Brand Guide",
    subtitle: "Why atmospheric ecosystems win every time.",
    image: "/images/article_ecospace.jpg",
    href: "/portfolio/blog/lost-art-of-readable-code",
  },
];

export default function InsightsSection() {
  return (
    <section className={styles.insightsSection} id="articles" aria-label="Articles">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Articles.</h2>
          <Link href="/portfolio/blog" className={styles.seeAllLink}>
            <span>SEE ALL ARTICLES</span>
            <span className={styles.arrowIcon} aria-hidden="true">→</span>
          </Link>
        </div>

        {/* 3-Column Card Grid Matching Exact Reference */}
        <div className={styles.grid}>
          {ARTICLES.map((item, idx) => (
            <motion.article
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={item.href}
                className={styles.cardLink}
                aria-label={`Read article: ${item.title}`}
              >
                {/* Square Image Frame with 14px Rounded Corners */}
                <div className={styles.imageFrame}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    priority={idx === 0}
                    className={styles.cardImage}
                  />

                  {/* Frosted Category Pill in Top-Right Corner */}
                  <span className={styles.categoryBadge}>{item.badge}</span>
                </div>

                {/* Information directly below image: Bold Sans Title + Literary Serif Subtitle */}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardSubtitle}>{item.subtitle}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
