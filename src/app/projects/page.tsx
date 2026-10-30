"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import styles from "@/components/modern/ModernProjects.module.css";
import { PROJECTS as coverProjects } from "@/data/coverProjects";

const ALL_PROJECTS = [
  ...coverProjects,
  {
    id: 5,
    slug: "vllm-serving-engine",
    title: "High-Throughput vLLM Serving",
    category: "AI SYSTEMS",
    image: "/images/hero_skater.jpg",
    client: "Open-Source Research",
    year: "2025",
    role: "Inference Optimization, Python, C++",
    description: "Multi-GPU inference server implementing PagedAttention and FP8 AWQ quantization, slashing TTFT latency by 68% for deep reasoning models.",
    challenge: "Overcoming KV-cache memory fragmentation and concurrency bottlenecks under 500+ active token streams.",
    solution: "Custom kernel orchestration, dynamic request batching, and chunked prefill pipelining.",
    gallery: ["/images/science_tech.png"],
    liveUrl: "https://github.com/dilshandevxx",
    githubUrl: "https://github.com/dilshandevxx",
    tech: ["vLLM", "PyTorch", "CUDA", "FastAPI", "Ray"],
  },
  {
    id: 6,
    slug: "rag-cross-encoder",
    title: "Hybrid RAG & Cross-Encoder",
    category: "AI SYSTEMS",
    image: "/images/ecommerce_card.png",
    client: "Enterprise FinTech",
    year: "2025",
    role: "Vector Search & Retrieval Architecture",
    description: "Two-stage retrieval pipeline combining dense vector embeddings with BM25 lexical search and a BGE cross-encoder reranker for zero-hallucination compliance.",
    challenge: "Handling complex legal and technical queries across 40M+ PDF documents with sub-250ms SLA.",
    solution: "Qdrant vector clustering, reciprocal rank fusion (RRF), and cached bi-encoder embeddings.",
    gallery: ["/images/music_festival.png"],
    liveUrl: "https://github.com/dilshandevxx",
    githubUrl: "https://github.com/dilshandevxx",
    tech: ["Qdrant", "Cross-Encoder", "LangChain", "FastAPI", "Docker"],
  },
  {
    id: 7,
    slug: "zero-downtime-k8s",
    title: "Automated Kubernetes Canary",
    category: "DEVOPS",
    image: "/images/skyline_twilight.jpg",
    client: "Cloud Infrastructure",
    year: "2024",
    role: "Site Reliability & Cloud Architecture",
    description: "ArgoCD and Prometheus-driven progressive deployment operator with automated traffic shifting, metric threshold gates, and instant zero-loss rollbacks.",
    challenge: "Preventing regression outages during continuous multi-service deployment spikes.",
    solution: "PromQL error rate and p99 latency evaluation driving Istio virtual service weight modulation.",
    gallery: ["/images/box_parachute.png"],
    liveUrl: "https://github.com/dilshandevxx",
    githubUrl: "https://github.com/dilshandevxx",
    tech: ["Kubernetes", "Argo Rollouts", "Istio", "Prometheus", "Helm"],
  },
  {
    id: 8,
    slug: "echarts-canvas-engine",
    title: "High-FPS Canvas Visualizer",
    category: "WEB DESIGN",
    image: "/images/hero_cyclist.jpg",
    client: "Industrial Analytics",
    year: "2025",
    role: "WebGL & Frontend Engineering",
    description: "Real-time sensor telemetry canvas engine capable of rendering 100,000+ streaming data points at a locked 60 frames per second inside React 19.",
    challenge: "Eliminating GC pauses and main-thread layout thrashing during continuous high-frequency updates.",
    solution: "OffscreenCanvas web worker rendering, circular TypedArray buffers, and Apache ECharts.",
    gallery: ["/images/science_tech.png"],
    liveUrl: "https://github.com/dilshandevxx",
    githubUrl: "https://github.com/dilshandevxx",
    tech: ["React 19", "Apache ECharts", "WebGL", "TypeScript", "Vite"],
  },
];

const CATEGORIES = ["ALL", "BRANDING", "AI SYSTEMS", "WEB DESIGN", "PACKAGING", "DEVOPS"] as const;

export default function ProjectsPage() {
  const [selectedCat, setSelectedCat] = useState<string>("ALL");

  const filteredProjects = useMemo(() => {
    if (selectedCat === "ALL") return ALL_PROJECTS;
    return ALL_PROJECTS.filter((p) => p.category === selectedCat);
  }, [selectedCat]);

  return (
    <div className={styles.pageSection}>
      {/* 1. Header Section */}
      <div className={styles.headerContainer}>
        <motion.div
          className={styles.pillBadge}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className={styles.badgeDot} aria-hidden="true" />
          <span>PORTFOLIO OF WORK</span>
        </motion.div>

        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          SELECTED SYSTEMS &amp; DIGITAL ARTIFACTS.
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A curated collection of distributed platforms, AI inference engines, brand ecosystems, and open-source infrastructure built with engineering rigor.
        </motion.p>
      </div>

      {/* 2. Category Filter Bar */}
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

      {/* 3. Projects Grid */}
      <div className={styles.projectsGrid}>
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            className={styles.projectCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (idx % 2) * 0.15 }}
          >
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
              <span className={styles.yearText}>{project.year} · {project.client}</span>
            </div>

            <h2 className={styles.projectTitle}>
              {project.title}
              <ArrowUpRight className={styles.arrowIcon} size={22} />
            </h2>

            <p className={styles.projectDescription}>{project.description}</p>

            {"tech" in project && Array.isArray((project as any).tech) && (
              <div className={styles.techStack}>
                {(project as any).tech.map((t: string) => (
                  <span key={t} className={styles.techPill}>{t}</span>
                ))}
              </div>
            )}

            <div className={styles.actionLinks}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtn}
                >
                  <ExternalLink size={15} />
                  <span>Case Study</span>
                </a>
              )}
              {"githubUrl" in project && (
                <a
                  href={(project as any).githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtn}
                >
                  <GithubIcon size={15} />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
