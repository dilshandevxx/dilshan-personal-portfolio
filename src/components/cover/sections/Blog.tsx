"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Blog.module.css";
import { DevToArticle } from "@/lib/api";

export default function Blog({ posts }: { posts: DevToArticle[] }) {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (!posts || posts.length === 0) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 2) % posts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [posts]);

  if (!posts || posts.length === 0) {
    return null; // Or a loading skeleton
  }

  let recentPosts = posts.slice(startIndex, startIndex + 2);
  if (recentPosts.length < 2) {
    recentPosts = [...recentPosts, ...posts.slice(0, 2 - recentPosts.length)];
  }

  return (
    <section className={styles.blogSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Latest News</h2>
        <Link href="/blog" className={styles.linkButton}>
          ALL POST
        </Link>
      </div>

      <div className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {recentPosts.map((post, index) => {
            const fallbackImage = "/images/science_tech.png";
            const imageUrl = post.cover_image || fallbackImage;
            const category = post.tag_list && post.tag_list.length > 0 ? post.tag_list[0].toUpperCase() : "TECH";
            const postHref = post.path || "/blog";
            
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.blogCardWrapper}
              >
                <Link href={postHref} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                  <article className={styles.blogCard}>
                    <div className={styles.imageWrapper}>
                      <Image 
                        src={imageUrl} 
                        alt={post.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={styles.image}
                      />
                    </div>
                    
                    <div className={styles.contentWrapper}>
                      <span className={styles.category}>{category}</span>
                      <h3 className={styles.blogTitle}>{post.title}</h3>
                      <span className={styles.date}>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
