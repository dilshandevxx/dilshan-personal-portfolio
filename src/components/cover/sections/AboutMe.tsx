"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <section className={styles.aboutSection} id="about-me" aria-label="About Dilshan">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Side: Clean Modern Bio Description (No Title, Pure Modern Typography) */}
          <motion.div
            className={styles.leftColumn}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.textBlock}>
              <div className={styles.accentBadge}>
                <span>ENGINEERING &amp; ARCHITECTURE</span>
              </div>

              <p className={styles.leadText}>
                Crafting resilient distributed systems, modern web experiences, and scalable infrastructure that outlive ephemeral trends.
              </p>

              <div className={styles.paragraphs}>
                <p>
                  I&apos;m Dilshan — a full-stack engineer and system architect based in Sri Lanka, working with teams globally. Over the past several years, I have engineered across the stack — from high-throughput distributed services and event-driven data pipelines to accessible, ultra-fast web clients.
                </p>
                <p>
                  My engineering philosophy is anchored in durable principles: favor explicit architectures over magic abstractions, prioritize deterministic performance over brute computing power, and craft purposeful digital products that respect human attention.
                </p>
              </div>

              <div className={styles.actionRow}>
                <Link href="#projects" className={styles.actionButton}>
                  Explore Selected Work &rarr;
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Editorial Open Magazine Spread Image */}
          <motion.div
            className={styles.rightColumn}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.imageFrame}>
              <Image
                src="/images/about_the_second_issue.jpg"
                alt="Dilshan's Editorial Monograph & Systems Spread"
                width={1200}
                height={896}
                priority
                className={styles.magazinePhoto}
                sizes="(max-width: 900px) 100vw, (max-width: 1400px) 50vw, 680px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
