"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./InsightsSection.module.css";

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  href: string;
}

const ARTICLES: ArticleItem[] = [
  {
    id: "evolution-design-thinking",
    title: "The evolution of design thinking: insights and perspectives",
    category: "Thoughts",
    readTime: "4 min",
    image: "/images/articles/article_design_thinking.jpg",
    href: "/portfolio/blog/lost-art-of-readable-code",
  },
  {
    id: "mastering-design-tools",
    title: "Mastering the art of design tools: a guide for product designers",
    category: "Tools",
    readTime: "3 min",
    image: "/images/articles/article_design_tools.jpg",
    href: "/portfolio/blog/zero-dependency-web-design",
  },
  {
    id: "side-projects-passion",
    title: "Side projects: from passion to portfolio-worthy designs",
    category: "Side projects",
    readTime: "6 min",
    image: "/images/articles/article_side_projects.jpg",
    href: "/portfolio/blog/resilience-in-distributed-systems",
  },
  {
    id: "streamlining-design-workflows",
    title: "Streamlining design workflows with design systems",
    category: "Design systems",
    readTime: "4 min",
    image: "/images/articles/article_design_workflows.jpg",
    href: "/portfolio/blog/enabling-apache-echarts-in-react",
  },
  {
    id: "building-effective-design-system",
    title: "Building an effective design system: best practices and key considerations",
    category: "Design systems",
    readTime: "4 min",
    image: "/images/articles/article_design_systems.jpg",
    href: "/portfolio/blog/zero-dependency-web-design",
  },
  {
    id: "side-projects-personal-growth",
    title: "How side projects fuel personal growth for designers",
    category: "Side projects",
    readTime: "3 min",
    image: "/images/articles/article_personal_growth.jpg",
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
            <span className={styles.arrowIcon} aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* 3-Column Editorial Grid Matching User Reference Design */}
        <div className={styles.grid}>
          {ARTICLES.map((item, idx) => (
            <motion.article
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={item.href}
                className={styles.cardLink}
                aria-label={`Read article: ${item.title}`}
              >
                {/* Rounded Top Image Canvas */}
                <div className={styles.imageFrame}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 380px"
                    priority={idx < 3}
                    className={styles.cardImage}
                  />
                </div>

                {/* Content Block beneath image */}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <div className={styles.cardMeta}>
                    <span>{item.category}</span>
                    <span className={styles.metaDivider} aria-hidden="true">&bull;</span>
                    <span>{item.readTime}</span>
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
