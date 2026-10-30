"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Server,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  Cloud,
} from "lucide-react";
import styles from "@/components/modern/ModernServices.module.css";

const PILLARS = [
  {
    num: "01",
    title: "Distributed Systems & Consensus",
    desc: "Architecting deterministically partitioned, fault-tolerant platforms handling millions of state transitions with zero data corruption.",
    icon: Server,
    deliverables: [
      "High-throughput message brokers & event streaming",
      "Raft consensus engines & replicated state machines",
      "Zero-downtime database shard rebalancing",
      "High-performance gRPC & Protobuf service meshes",
    ],
  },
  {
    num: "02",
    title: "Applied AI & High-Throughput Inference",
    desc: "Productionizing deep learning inference pipelines with custom vLLM orchestration, continuous batching, and sub-200ms TTFT performance.",
    icon: Cpu,
    deliverables: [
      "vLLM & TensorRT-LLM cluster deployment on Kubernetes",
      "FP8, AWQ, and dynamic KV-cache memory optimization",
      "Multi-vector hybrid RAG pipelines with cross-encoders",
      "Deterministic agentic reasoning & function-calling graphs",
    ],
  },
  {
    num: "03",
    title: "Modern Full-Stack & Real-Time Platforms",
    desc: "Bespoke, award-winning web platforms built with React 19, partial pre-rendering, streaming SSR, and canvas-accelerated data visualizations.",
    icon: Layers,
    deliverables: [
      "Next.js 19 Server Actions & Server Component orchestration",
      "High-FPS WebGL / OffscreenCanvas telemetry visualizations",
      "Bi-directional WebSocket streaming with Redis pub/sub",
      "Type-safe schema validation across frontend & backend with Zod",
    ],
  },
  {
    num: "04",
    title: "Cloud Infrastructure & SRE Rigor",
    desc: "Autonomous infrastructure as code, zero-downtime canary rollouts, Prometheus metric gates, and strict Linux kernel security hardening.",
    icon: Cloud,
    deliverables: [
      "Kubernetes operator authoring & ArgoCD GitOps pipelines",
      "Automated progressive canary rollouts with metric gates",
      "Prometheus, OpenTelemetry & Grafana distributed tracing",
      "Linux VPS security hardening & edge CDN acceleration",
    ],
  },
];

const BLUEPRINTS = [
  {
    tag: "Architecture Spec",
    title: "React 19 Application Architecture",
    desc: "Server Component composition, streaming SSR suspense trees, and zero-bundle server mutations.",
    link: "/blog",
  },
  {
    tag: "AI Engineering",
    title: "LLM Serving with vLLM & PagedAttention",
    desc: "Production playbook for GPU memory optimization and continuous request scheduling.",
    link: "/blog",
  },
  {
    tag: "Data Infrastructure",
    title: "Vector Database Benchmarking",
    desc: "Comparative evaluation of Qdrant, Milvus, and pgvector under 100M high-dimensional vectors.",
    link: "/blog",
  },
  {
    tag: "Distributed Concurrency",
    title: "Event Loop & Microtasks in Node.js",
    desc: "Designing non-blocking asynchronous event dispatchers for ultra-low latency.",
    link: "/blog",
  },
  {
    tag: "Reliability Playbook",
    title: "Zero-Downtime Deployments with K8s",
    desc: "ArgoCD and Prometheus threshold verification for risk-free automated rollouts.",
    link: "/blog",
  },
  {
    tag: "Security Standard",
    title: "Hardening Linux VPS for Production",
    desc: "UFW rules, SSH key isolation, non-root systemd boundaries, and fail2ban tuning.",
    link: "/blog",
  },
];

export default function ServicesPage() {
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
          <span>CAPABILITIES &amp; ARCHITECTURE</span>
        </motion.div>

        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          SYSTEM ARCHITECTURE &amp; TECHNICAL SERVICES.
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          End-to-end distributed system design, high-throughput model serving, resilient cloud orchestration, and bespoke digital platforms built for scale.
        </motion.p>
      </div>

      {/* 2. Service Pillars Grid */}
      <div className={styles.pillarsGrid}>
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.num}
              className={styles.pillarCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className={styles.pillarHeader}>
                <span className={styles.pillarNumber}>{pillar.num} // DOMAIN</span>
                <div className={styles.iconWrapper}>
                  <Icon size={22} strokeWidth={1.8} />
                </div>
              </div>

              <h2 className={styles.pillarTitle}>{pillar.title}</h2>
              <p className={styles.pillarDesc}>{pillar.desc}</p>

              <ul className={styles.deliverablesList}>
                {pillar.deliverables.map((item, dIdx) => (
                  <li key={dIdx} className={styles.deliverableItem}>
                    <span className={styles.deliverableBullet} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Deep Dives & Architectural Blueprints */}
      <div className={styles.deepDivesSection}>
        <h2 className={styles.sectionHeading}>ARCHITECTURAL BLUEPRINTS &amp; PLAYBOOKS</h2>
        <div className={styles.blueprintsGrid}>
          {BLUEPRINTS.map((bp, idx) => (
            <Link key={idx} href={bp.link} className={styles.blueprintCard}>
              <span className={styles.blueprintTag}>{bp.tag}</span>
              <h3 className={styles.blueprintTitle}>{bp.title}</h3>
              <p className={styles.blueprintDesc}>{bp.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
