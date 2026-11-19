"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./InsightsSection.module.css";

interface ArticleItem {
  id: string;
  badge: string;
  title: string;
  desc: string;
  image: string;
  href: string;
}

const ARTICLES: ArticleItem[] = [
  {
    id: "wales-creative",
    badge: "design",
    title: "wales creative agency",
    desc: "Driftime® CCO, Abb-d Taiyo speaks to Civil Society Magazine for an in-depth feature on how a focused, strategic rebrand can transform engagement.",
    image: "/images/article_wales.jpg",
    href: "/portfolio/blog/zero-dependency-web-design",
  },
  {
    id: "neurogen-platform",
    badge: "Web App",
    title: "NeuroGen platform",
    desc: "How strategic brand transformation enabled Instant Aid to secure UN partnerships and deliver life-saving digital infrastructure at scale.",
    image: "/images/article_neurogen.jpg",
    href: "/portfolio/blog/resilience-in-distributed-systems",
  },
  {
    id: "ecospace-web",
    badge: "Corporate",
    title: "EcoSpace Web",
    desc: "Driftime® CCO, Abb-d Taiyo speaks to Civil Society Magazine for an in-depth feature on how a focused, strategic rebrand can accelerate systemic impact.",
    image: "/images/article_ecospace.jpg",
    href: "/portfolio/blog/lost-art-of-readable-code",
  },
];

export default function InsightsSection() {
  return (
    <section className={styles.insightsSection} id="articles" aria-label="Articles">
      <div className={styles.container}>
        {/* Section Header with One-line Title in Hero Font & All Articles link */}
        <div className={styles.header}>
          <h2 className={styles.title}>Articles.</h2>
          <Link href="/portfolio/blog" className={styles.allLink}>
            <span>All Articles</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>

        {/* 3-Column Responsive Card Grid matching user reference design */}
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
                {/* Landscape Image Frame with Rounded Corners */}
                <div className={styles.imageFrame}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    priority={idx === 0}
                    className={styles.cardImage}
                  />

                  {/* Translucent Category Badge in Bottom-Left */}
                  <span className={styles.categoryBadge}>{item.badge}</span>
                </div>

                {/* Information below Image */}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
