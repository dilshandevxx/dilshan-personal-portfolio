"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "@/components/modern/ModernAbout.module.css";

const VALUES = [
  {
    title: "Zero Compromise on Performance",
    desc: "Obsessive optimization of execution paths, memory boundaries, TTFT latency, and rendering threads.",
  },
  {
    title: "Determinism Over Magic",
    desc: "Explicit architectural boundaries, reproducible state machines, and transparent failure domains.",
  },
  {
    title: "Aesthetic Discipline",
    desc: "Monolithic typography, generous breathing room, rich dark surfaces, and purposeful micro-interactions.",
  },
  {
    title: "Open-Source Mindset",
    desc: "Giving back verified benchmarks, architectural playbooks, and production tools to the developer craft.",
  },
];

const TIMELINE = [
  {
    period: "2024 — PRESENT",
    role: "Lead Systems Architect & Founder",
    company: "Engineering Studio",
    location: "Global / Remote",
  },
  {
    period: "2022 — 2024",
    role: "Senior Distributed Systems Engineer",
    company: "Scalable Infrastructure Platforms",
    location: "San Francisco, CA",
  },
  {
    period: "2020 — 2022",
    role: "Full-Stack AI Software Engineer",
    company: "Autonomous ML Pipelines",
    location: "Singapore",
  },
  {
    period: "2018 — 2020",
    role: "Core Platform Developer",
    company: "Cloud Microservices Lab",
    location: "Colombo / Remote",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.pageSection}>
      {/* 1. Header Section */}
      <div className={styles.headerContainer}>
        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Dilshan Ramesh
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Full-Stack Engineer &amp; Systems Architect dedicated to crafting resilient distributed infrastructure and clean, tactile digital experiences.
        </motion.p>
      </div>

      {/* 2. Split Hero Section */}
      <div className={styles.splitSection}>
        <motion.div
          className={styles.imageContainer}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/images/about.png"
            alt="Dilshan Ramesh — Systems Architect"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.portraitImage}
            priority
          />
        </motion.div>

        <motion.div
          className={styles.narrativeContent}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h2 className={styles.statement}>
            We build platforms where <span className={styles.statementHighlight}>concurrency</span>, scalability, and design harmony co-exist.
          </h2>

          <p className={styles.paragraph}>
            With over eight years of hands-on systems programming, cloud orchestration, and interface engineering, I operate across the entire modern technical stack. From writing custom CUDA kernels and high-throughput vLLM inference brokers to structuring enterprise React 19 micro-frontends with 60 FPS Canvas visualizers.
          </p>

          <p className={styles.paragraph}>
            I believe software should feel monolithic, fast, and unyielding in production. Reject visual bloat and artificial complexity in favor of crisp mathematical precision and understated luxury.
          </p>

          <div style={{ marginTop: "1.5rem" }}>
            <a
              href="mailto:dilshan.devxx@gmail.com"
              className={styles.talkButton}
            >
              Talk Today
            </a>
          </div>
        </motion.div>
      </div>

      {/* 3. Core Values Grid */}
      <div className={styles.valuesSection}>
        <h2 className={styles.sectionHeading}>ARCHITECTURAL PRINCIPLES</h2>
        <div className={styles.valuesGrid}>
          {VALUES.map((val, idx) => (
            <motion.div
              key={val.title}
              className={styles.valueCard}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 className={styles.valueTitle}>{val.title}</h3>
              <p className={styles.valueDesc}>{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Experience & Trajectory Timeline */}
      <div className={styles.timelineSection}>
        <h2 className={styles.sectionHeading}>EXPERIENCE &amp; DISTINCTION</h2>
        <div className={styles.timelineList}>
          {TIMELINE.map((item, idx) => (
            <div key={idx} className={styles.timelineItem}>
              <span className={styles.timelinePeriod}>{item.period}</span>
              <div>
                <h3 className={styles.timelineRole}>{item.role}</h3>
                <p className={styles.timelineCompany}>{item.company}</p>
              </div>
              <span className={styles.timelineLocation}>{item.location}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
