"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./AboutShowcaseBanner.module.css";

interface AboutShowcaseBannerProps {
  imageSrc?: string;
  altText?: string;
  caption?: string;
}

export default function AboutShowcaseBanner({
  imageSrc = "/images/about-visual-banner.avif",
  altText = "Deep-tech autonomous hardware and satellite telemetry engineering",
  caption,
}: AboutShowcaseBannerProps) {
  return (
    <section className={styles.showcaseSection} aria-label="Visual Engineering Showcase">
      <div className={styles.container}>
        <motion.div
          className={styles.bannerFrame}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={imageSrc}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 94vw, 1400px"
            className={styles.bannerImage}
            priority={false}
          />

          {/* Subtle cinematic gradient vignette for depth */}
          <div className={styles.vignetteOverlay} aria-hidden="true" />

          {/* Optional editorial caption */}
          {caption && (
            <div className={styles.captionTag}>
              <span>{caption}</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
