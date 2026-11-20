"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./PreFooterBanner.module.css";

interface PreFooterBannerProps {
  headlineTop?: string;
  headlineBottom?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export default function PreFooterBanner({
  headlineTop = "A COMMITMENT TO",
  headlineBottom = "ENGINEERING RESPONSIBLY",
  description = "Global in scope and driven by principles. Dedicated to stripping away unnecessary complexity to build dependable, high-throughput intelligence platforms that serve modern production demands.",
  actionText = "( ENGINEERING PHILOSOPHY )",
  actionHref = "/about",
}: PreFooterBannerProps) {
  return (
    <section className={styles.bannerSection} aria-label="Commitment Statement">
      <div className={styles.container}>
        <motion.div
          className={styles.contentWrap}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Massive 2-Line Condensed Display Headline */}
          <h2 className={styles.headline}>
            <span className={styles.headlineRow}>{headlineTop}</span>
            <span className={styles.headlineRow}>{headlineBottom}</span>
          </h2>

          {/* Centered Editorial Narrative Paragraph */}
          <p className={styles.description}>{description}</p>

          {/* Centered Philosophy Link in Parentheses */}
          <div className={styles.actionWrap}>
            <Link href={actionHref} className={styles.actionLink}>
              {actionText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
