"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GithubIcon } from "@/components/SocialIcons";
import styles from "@/components/modern/ModernProjects.module.css";

const ALL_PROJECTS = [
  {
    id: 1,
    slug: "boltshift",
    title: "Boltshift Infrastructure",
    category: "AI SYSTEMS",
    image: "/images/project_boltshift.jpg",
    client: "FinTech Scaleup",
    role: "Lead Systems Architect",
    description: "High-throughput cloud inference engine and real-time payment gateway processing 10,000+ operations/sec with deterministic sub-50ms latency.",
    challenge: "Scaling transaction concurrency while enforcing strict cryptographic ledger auditing.",
    solution: "Rust worker threads, zero-copy buffer serialization, and event-driven Kafka pipelines.",
    liveUrl: "https://github.com/dilshandevxx",
    githubUrl: "https://github.com/dilshandevxx",
    tech: ["Go", "Kafka", "PostgreSQL", "Docker", "Kubernetes"],
  },
  {
    id: 2,
    slug: "euphoria",
    title: "Euphoria Biometrics",
    category: "AI SYSTEMS",
    image: "/images/project_euphoria.jpg",
    client: "HealthTech AI",
    role: "Computer Vision Engineer",
    description: "Multimodal neural vision pipeline and real-time iris biometric analyzer performing sub-pixel landmark detection in real time.",
    challenge: "Running edge model inference on resource-constrained browser canvases.",
    solution: "ONNX Runtime Web, WebAssembly SIMD kernels, and quantized MobileNet-V4 weights.",
    liveUrl: "https://github.com/dilshandevxx",
    githubUrl: "https://github.com/dilshandevxx",
    tech: ["PyTorch", "ONNX Web", "WebAssembly", "TypeScript", "React 19"],
  },
  {
    id: 3,
    slug: "cloudwatch",
    title: "CloudWatch Telemetry",
    category: "DEVOPS",
    image: "/images/project_cloudwatch.jpg",
    client: "Enterprise Cloud",
    role: "SRE & Cloud Architect",
    description: "Distributed telemetry infrastructure and multi-region log monitoring engine collecting 50M+ events per day with live tracing.",
    challenge: "Preventing write amplification and storage bloat on multi-terabyte log indices.",
    solution: "ClickHouse columnar storage engine, Vector log routing, and automated retention tiering.",
    liveUrl: "https://github.com/dilshandevxx",
    githubUrl: "https://github.com/dilshandevxx",
    tech: ["ClickHouse", "Vector", "Grafana", "Prometheus", "Kubernetes"],
  },
  {
    id: 4,
    slug: "mastermail",
    title: "Mastermail Distributed Delivery",
    category: "WEB DESIGN",
    image: "/images/project_mastermail.jpg",
    client: "Global Communications",
    role: "Full-Stack Engineer",
    description: "High-deliverability transactional messaging operator for global scale with zero message drops and real-time bounce classification.",
    challenge: "Handling sudden recipient burst spikes without triggering ISP throttling.",
    solution: "Token-bucket rate limiters, RabbitMQ dead-letter exchanges, and warm IP pools.",
    liveUrl: "https://github.com/dilshandevxx",
    githubUrl: "https://github.com/dilshandevxx",
    tech: ["Node.js", "RabbitMQ", "Redis", "Next.js", "Tailwind CSS"],
  },
  {
    id: 5,
    slug: "warpspeed",
    title: "Warpspeed Streaming Protocol",
    category: "DEVOPS",
    image: "/images/project_warpspeed.jpg",
    client: "Ultra-Low Latency Lab",
    role: "Systems Programmer",
    description: "Sub-millisecond low-latency packet streaming protocol in Rust and Go with zero-copy deserialization and custom flow control.",
    challenge: "Packet reordering under jittery WAN conditions without stalling receiver pipelines.",
    solution: "QUIC-inspired transport layer with selective ACK acknowledgments and ring buffers.",
    liveUrl: "https://github.com/dilshandevxx",
    githubUrl: "https://github.com/dilshandevxx",
    tech: ["Rust", "Go", "QUIC", "eBPF", "Linux Kernel"],
  },
  {
    id: 6,
    slug: "powersurge",
    title: "Powersurge Fleet Analytics",
    category: "WEB DESIGN",
    image: "/images/project_powersurge.jpg",
    client: "Clean Mobility Corp",
    role: "Lead Frontend Engineer",
    description: "Telemetry compute cluster orchestrating dynamic power grids, battery health telemetry, and EV fleet logistics across 4 continents.",
    challenge: "Rendering 100k+ dynamic geo-spatial nodes simultaneously with 60 FPS fluidity.",
    solution: "Deck.gl, Mapbox GL, WebGL shader pipelines, and Apache Arrow data buffers.",
    liveUrl: "https://github.com/dilshandevxx",
    githubUrl: "https://github.com/dilshandevxx",
    tech: ["Next.js", "Deck.gl", "WebGL", "Apache Arrow", "TypeScript"],
  },
];

const CATEGORIES = ["ALL", "AI SYSTEMS", "DEVOPS", "WEB DESIGN"] as const;

export default function ProjectsPage() {
  const [selectedCat, setSelectedCat] = useState<string>("ALL");

  const filteredProjects = useMemo(() => {
    if (selectedCat === "ALL") return ALL_PROJECTS;
    return ALL_PROJECTS.filter((p) => p.category === selectedCat);
  }, [selectedCat]);

  return (
    <div className={styles.pageSection}>
      {/* 1. Clean Header Section (No [27], No Projects., No ©2025) */}
      <div className={styles.headerContainer}>
        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          We&apos;ve helped businesses across industries achieve their goals. Here are some of our recent projects.
        </motion.p>
      </div>

      {/* 2. Category Filter Bar (Clean square style) */}
      <div className={styles.filterBar}>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCat === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ""}`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3. Projects Grid with SQUARE Corners */}
      <div className={styles.projectsGrid}>
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            id={project.slug}
            className={styles.projectCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (idx % 2) * 0.15 }}
          >
            {/* Top Bar: Clean Title and Dots (NO //year) */}
            <div className={styles.cardTopBar}>
              <span className={styles.cardTitle}>{project.title}</span>
              <span className={styles.dotsIcon}>&bull;&bull;&bull;</span>
            </div>

            {/* SQUARE Image Wrapper */}
            <div className={styles.imageWrapper}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                className={styles.projectImage}
              />
            </div>

            <div className={styles.cardMeta}>
              <span className={styles.categoryTag}>{project.category}</span>
              <span className={styles.clientText}>{project.client}</span>
            </div>

            <p className={styles.projectDescription}>{project.description}</p>

            <div className={styles.techStack}>
              {project.tech.map((t: string) => (
                <span key={t} className={styles.techPill}>{t}</span>
              ))}
            </div>

            {/* Clean rectangular action buttons */}
            <div className={styles.actionLinks}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.talkButton}
                >
                  Case Study
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.talkButton}
                >
                  Source Code
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
