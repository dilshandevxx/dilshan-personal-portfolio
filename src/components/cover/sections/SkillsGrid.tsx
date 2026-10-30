"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./SkillsGrid.module.css";

interface SkillItem {
  id: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
}

const SKILL_ITEMS: SkillItem[] = [
  {
    id: "ai-strategy",
    title: "AI ARCHITECTURE &\nDISTRIBUTED SYSTEMS",
    image: "/images/skill_ai_strategy.jpg",
    description:
      "Design and deploy production-grade neural inference pipelines, quantized model serving, and enterprise RAG retrieval architectures with deterministic latency.",
    tags: ["PYTORCH", "CUDA", "RAG PIPELINES", "VLLM", "RAY"],
  },
  {
    id: "cloud-devops",
    title: "CLOUD INFRASTRUCTURE &\nKUBERNETES",
    image: "/images/skill_workflow_automation.jpg",
    description:
      "Automated GitOps deployments, progressive canary rollouts, multi-region container orchestration, and high-volume Kafka streaming pipelines.",
    tags: ["KUBERNETES", "GITOPS", "DOCKER", "TERRAFORM", "KAFKA"],
  },
  {
    id: "web-systems",
    title: "HIGH-PERFORMANCE\nWEB APPLICATIONS",
    image: "/images/skill_custom_tools.jpg",
    description:
      "Crafting ultra-responsive React 19 and Next.js applications, hardware-accelerated WebGL telemetry dashboards, and clean editorial interfaces.",
    tags: ["NEXT.JS", "TYPESCRIPT", "REACT 19", "WEBGL", "NODE.JS"],
  },
  {
    id: "engineering-rigor",
    title: "SYSTEM RELIABILITY &\nOBSERVABILITY",
    image: "/images/skill_team_training.jpg",
    description:
      "End-to-end telemetry instrumentation with Prometheus and Grafana, automated fault injection, zero-downtime database migrations, and CI/CD automation.",
    tags: ["PROMETHEUS", "GRAFANA", "DISTRIBUTED TRACING", "CI/CD"],
  },
];

export default function SkillsGrid() {
  return (
    <section className={styles.skillsSection} id="skills">
      <div className={styles.container}>
        {/* Section Header: Clean title without clutter */}
        <div className={styles.header}>
          <motion.h2
            className={styles.headline}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            Technical Disciplines &amp; Core Competencies
          </motion.h2>
        </div>

        {/* Clean Editorial Rows */}
        <div className={styles.rowsContainer}>
          {SKILL_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              className={styles.skillRow}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              {/* Col 1: Title */}
              <div className={styles.titleCol}>
                <h3 className={styles.skillTitle}>
                  {item.title.split("\n").map((line, i) => (
                    <span key={i} className={styles.titleLine}>
                      {line}
                    </span>
                  ))}
                </h3>
              </div>

              {/* Col 2: Image Thumbnail */}
              <div className={styles.imageCol}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title.replace("\n", " ")}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className={styles.rowImage}
                  />
                </div>
              </div>

              {/* Col 3: Narrative & Tags */}
              <div className={styles.descCol}>
                <p className={styles.description}>{item.description}</p>
                <div className={styles.tagList}>
                  {item.tags.map((tag) => (
                    <span key={tag} className={styles.tagItem}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
