"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <section className={styles.aboutSection} id="about-me" aria-label="The Second Issue">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Side: Elegant Editorial Serif Typography */}
          <motion.div
            className={styles.leftColumn}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.textBlock}>
              <h2
                className={styles.issueHeading}
                style={{
                  fontFamily: "'Cormorant Garamond', 'Playfair Display', 'Didot', 'Bodoni MT', Georgia, serif",
                  fontWeight: 300,
                  letterSpacing: "0.07em",
                }}
              >
                <span className={styles.headingLine}>THE</span>
                <span className={styles.headingLine}>SECOND</span>
                <span className={styles.headingLine}>ISSUE</span>
              </h2>

              <p className={styles.issueSubtitle}>
                Issue No.02 is now available.
              </p>

              <div className={styles.linkContainer}>
                <Link href="#projects" className={styles.orderLink}>
                  (<span className={styles.underlinedText}>Order</span>)
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
                alt="The Second Issue Editorial Magazine"
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
