"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <section className={styles.aboutMeSection} id="about-me">
      <div className={styles.container}>
        {/* Col 1: Clean Section Label (No dots) */}
        <motion.div
          className={styles.labelCol}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.labelText}>ABOUT ME</span>
        </motion.div>

        {/* Col 2: Statement + Clean Rectangular [Talk Today] Button (No arrows) */}
        <motion.div
          className={styles.contentCol}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className={styles.statement}>
            I&apos;m passionate about digital design, software architecture, and AI engineering, and enjoy solving problems through beautiful designs and experiences with agencies and enthusiastic people.
          </p>

          <div>
            <a
              href="mailto:dilshan.devxx@gmail.com"
              className={styles.talkButton}
            >
              Talk Today
            </a>
          </div>
        </motion.div>

        {/* Col 3: Circular Profile Photo */}
        <motion.div
          className={styles.avatarCol}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.avatarWrapper}>
            <Image
              src="/dilshan_profile.jpg"
              alt="Dilshan Ramesh"
              fill
              sizes="(max-width: 900px) 130px, 180px"
              priority={false}
              className={styles.avatarImage}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
