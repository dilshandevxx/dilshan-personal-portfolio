"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./BlogSection.module.css";

interface ArticleItem {
  id: string;
  readTime: string;
  category: string;
  title: string;
  image: string;
  slug: string;
}

const ARTICLES: ArticleItem[] = [
  {
    id: "f1-speed-tech",
    readTime: "8 MIN",
    category: "SPORTS",
    title: "Formula 1: Where Speed and Technology Come Together",
    image: "/images/project_powersurge.jpg",
    slug: "formula-1-speed-and-technology",
  },
  {
    id: "autonomous-drones",
    readTime: "4 MIN",
    category: "ROBOTICS",
    title: "Autonomous Drones: The New Frontier in Emergency Response and Rescue Operations",
    image: "/images/science_tech.png",
    slug: "autonomous-drones-emergency-rescue",
  },
  {
    id: "visionary-leaders",
    readTime: "7 MIN",
    category: "INNOVATION",
    title: "The Visionary Leaders Who Are Transforming the Global Industry",
    image: "/images/about_portrait.jpg",
    slug: "visionary-leaders-transforming-industry",
  },
  {
    id: "womens-soccer",
    readTime: "7 MIN",
    category: "SPORTS",
    title: "Women's Soccer Conquers the World: A Silent Revolution",
    image: "/images/hero_skater.jpg",
    slug: "womens-soccer-silent-revolution",
  },
  {
    id: "dubai-urban-innovation",
    readTime: "9 MIN",
    category: "INNOVATION",
    title: "Dubai, the City That Redefines What's Possible: Global Urban Innovation",
    image: "/images/skyline_twilight.jpg",
    slug: "dubai-global-urban-innovation",
  },
  {
    id: "notion-productivity-tools",
    readTime: "5 MIN",
    category: "INNOVATION",
    title: "Notion and the Tools That Are Redefining Productivity",
    image: "/images/phone_interaction.png",
    slug: "notion-tools-redefining-productivity",
  },
];

export default function BlogSection() {
  return (
    <section className={styles.blogSection} id="blog">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Articles &amp; Perspectives</h2>
        </div>

        {/* 3-Column Grid matching reference */}
        <div className={styles.grid}>
          {ARTICLES.map((article, idx) => (
            <motion.article
              key={article.id}
              className={styles.articleCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
            >
              <Link href={`/blog#${article.slug}`} className={styles.cardLink}>
                {/* Square Image Container */}
                <div className={styles.imageWrapper}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className={styles.articleImage}
                  />
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  {/* Metadata Row: Reading Time (Left) & Category Tag (Right) */}
                  <div className={styles.metaRow}>
                    <span className={styles.readTime}>{article.readTime}</span>
                    <span className={styles.categoryTag}>{article.category}</span>
                  </div>

                  {/* Headline */}
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Rectangular [Talk Today] Style Button */}
        <div className={styles.ctaWrapper}>
          <Link href="/blog" className={styles.talkButton}>
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
