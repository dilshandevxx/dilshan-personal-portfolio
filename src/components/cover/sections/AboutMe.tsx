"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <section className={styles.section} id="about-me" aria-label="About Dilshan">
      <div className={styles.container}>
        <motion.div
          className={styles.editorialCard}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left: Minimalist Portrait Photo */}
          <div className={styles.photoContainer}>
            <div className={styles.photoFrame}>
              <Image
                src="/images/about_portrait.jpg"
                alt="Dilshan Ramesh"
                width={800}
                height={1000}
                priority
                className={styles.photo}
                sizes="(max-width: 900px) 100vw, 380px"
              />
              <div className={styles.photoVignette} />
            </div>

            <div className={styles.photoCaption}>
              <span className={styles.statusDot} />
              <span className={styles.captionText}>Dilshan Ramesh // Sri Lanka</span>
            </div>
          </div>

          {/* Right: Pure Thoughtful Quote & Author Signature */}
          <div className={styles.quoteContainer}>
            <span className={styles.quoteGlyph} aria-hidden="true">
              &ldquo;
            </span>

            <blockquote className={styles.quoteBlock}>
              <p className={styles.quoteText}>
                Good architecture is quiet. It subtracts the obvious, honors clarity over cleverness, and simply endures.
              </p>
            </blockquote>

            <div className={styles.signatureRow}>
              <div className={styles.signatureDivider} />
              <div className={styles.signatureDetails}>
                <span className={styles.signatureName}>Dilshan Ramesh</span>
                <span className={styles.signatureTag}>
                  Systems Architect &amp; Full-Stack Engineer
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
