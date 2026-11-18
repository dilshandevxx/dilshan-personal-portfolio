"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./InsightsSection.module.css";

interface InsightItem {
  id: string;
  title: string;
  image: string;
  href: string;
}

const INSIGHTS: InsightItem[] = [
  {
    id: "emerging-trends",
    title: "Emerging trends that will shape the future",
    image: "/images/insight_trends_hd.jpg",
    href: "/portfolio/blog",
  },
  {
    id: "portfolio-standout",
    title: "How to make a portfolio stands out",
    image: "/images/insight_portfolio_hd.jpg",
    href: "/portfolio/blog",
  },
];

export default function InsightsSection() {
  return (
    <section className={styles.insightsSection} id="insights" aria-label="Insights">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Insights</h2>
          <Link href="/portfolio/blog" className={styles.allInsightsLink}>
            <span>All Articles</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {/* 2-Column Responsive Card Grid */}
        <div className={styles.grid}>
          {INSIGHTS.map((item, idx) => (
            <motion.article
              key={item.id}
              className={styles.cardWrapper}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={item.href}
                className={styles.cardLink}
                aria-label={`Read insight: ${item.title}`}
              >
                <div className={styles.imageCanvas}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx === 0}
                    className={styles.cardImage}
                  />

                  {/* Accessible Label */}
                  <span className="sr-only">{item.title}</span>

                  {/* Subtle Action Pill that reveals on hover */}
                  <div className={styles.hoverPill}>
                    <span>Read Article</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
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
