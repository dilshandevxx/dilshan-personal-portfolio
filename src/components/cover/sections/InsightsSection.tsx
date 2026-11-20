"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./InsightsSection.module.css";

interface ArticleItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  linkText?: string;
}

const ARTICLES: ArticleItem[] = [
  {
    id: "readable-code",
    title: "The Lost Art of Readable Code",
    description:
      "Why cognitive load is the true north metric of software architecture, and how simplicity outlives complex frameworks.",
    image: "/images/article_wales.jpg",
    href: "/portfolio/blog/lost-art-of-readable-code",
    linkText: "Read article",
  },
  {
    id: "distributed-resilience",
    title: "Resilience in Distributed Systems",
    description:
      "Patterns for backpressure, bounded queues, and graceful degradation in high-throughput cloud environments.",
    image: "/images/article_neurogen.jpg",
    href: "/portfolio/blog/resilience-in-distributed-systems",
    linkText: "Read article",
  },
  {
    id: "zero-dependency",
    title: "Zero-Dependency Editorial Interfaces",
    description:
      "Why vanilla CSS custom properties, cascade layers, and semantic HTML outlast hundred-megabyte UI library churn.",
    image: "/images/article_ecospace.jpg",
    href: "/portfolio/blog/zero-dependency-web-design",
    linkText: "Read article",
  },
  {
    id: "telemetry-echarts",
    title: "High-Density Telemetry & ECharts",
    description:
      "Integrating and optimizing high-performance canvases within React 19 applications for sub-16ms telemetry.",
    image: "/images/insight_portfolio_hd.jpg",
    href: "/portfolio/blog/enabling-apache-echarts-in-react",
    linkText: "Read article",
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

        {/* 2-Column Grid Matching Exact Reference Design (2x2 Horizontal Layout) */}
        <div className={styles.grid}>
          {ARTICLES.map((item, idx) => (
            <motion.article
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={item.href}
                className={styles.cardLink}
                aria-label={`Read article: ${item.title}`}
              >
                {/* Square Thumbnail on Left with Subtle Rounded Corners */}
                <div className={styles.imageFrame}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 130px, (max-width: 1024px) 160px, 190px"
                    priority={idx === 0}
                    className={styles.cardImage}
                  />
                </div>

                {/* Right Content Column: Bold Title + Narrative Paragraph + Link */}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDescription}>{item.description}</p>
                  <div className={styles.readLinkWrap}>
                    <span className={styles.readLinkText}>{item.linkText || "Read article"}</span>
                    <span className={styles.readLinkArrow} aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
