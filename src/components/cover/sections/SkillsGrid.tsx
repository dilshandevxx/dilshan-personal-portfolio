"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SkillsGrid.module.css";

interface SkillItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  description: string;
  tags: string[];
}

const SKILL_ITEMS: SkillItem[] = [
  {
    id: "web-dev",
    name: "Web Development",
    subtitle: "High-Performance Modern Web Applications",
    image: "/images/skill_custom_tools.jpg",
    description:
      "Crafting ultra-responsive React 19 and Next.js applications, hardware-accelerated WebGL telemetry dashboards, and clean editorial interfaces built for high throughput and zero layout thrashing.",
    tags: ["NEXT.JS", "TYPESCRIPT", "REACT 19", "WEBGL", "TAILWIND CSS", "NODE.JS"],
  },
  {
    id: "mobile-dev",
    name: "Mobile App Development",
    subtitle: "Cross-Platform & Native Mobile Engineering",
    image: "/images/hero_phone_flare.jpg",
    description:
      "Developing fluid, tactile iOS and Android mobile experiences using Flutter and React Native with native bridge performance, offline-first SQLite sync, and smooth 60fps animations.",
    tags: ["FLUTTER", "DART", "REACT NATIVE", "OFFLINE SYNC", "IOS & ANDROID"],
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    subtitle: "Neural Inference & Distributed AI Architecture",
    image: "/images/skill_ai_strategy.jpg",
    description:
      "Designing and deploying production-grade neural inference pipelines, quantized model serving with vLLM, and enterprise RAG retrieval architectures with deterministic sub-50ms latency.",
    tags: ["PYTORCH", "CUDA", "vLLM", "RAG RETRIEVAL", "ONNX", "LANGCHAIN"],
  },
  {
    id: "custom-software",
    name: "Custom Software Development",
    subtitle: "Distributed Systems & Cloud Orchestration",
    image: "/images/skill_workflow_automation.jpg",
    description:
      "Building resilient distributed backends, microservice meshes, event-driven streaming pipelines with Apache Kafka, and automated GitOps Kubernetes infrastructure.",
    tags: ["GOLANG", "RUST", "KUBERNETES", "KAFKA", "GITOPS", "POSTGRESQL"],
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    subtitle: "Resilient Multi-Cloud & Telemetry Infrastructure",
    image: "/images/project_analytics.jpg",
    description:
      "Architecting highly available cloud environments across AWS and GCP using Terraform, automated GitOps CI/CD delivery pipelines, proactive distributed telemetry, and zero-downtime deployments.",
    tags: ["AWS", "GCP", "TERRAFORM", "DOCKER", "KUBERNETES", "CI/CD", "PROMETHEUS"],
  },
];

export default function SkillsGrid() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.skillsSection} id="skills" aria-label="Services & Capabilities">
      <div className={styles.container}>
        {/* Clean One-Line Section Header */}
        <div className={styles.header}>
          <h2 className={styles.headline}>Services.</h2>
        </div>

        {/* Clean, Beautiful Accordion List (Without Numbers) */}
        <div className={styles.accordionList}>
          {SKILL_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={styles.accordionItem}>
                {/* Accordion Row Trigger without numbers */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className={styles.rowTrigger}
                  aria-expanded={isOpen}
                >
                  <span className={styles.itemTitle}>{item.name}</span>

                  <span
                    className={`${styles.iconButton} ${isOpen ? styles.iconButtonOpen : ""}`}
                    aria-hidden="true"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.svgCross}
                    >
                      <path
                        d="M7 1.5V12.5M1.5 7H12.5"
                        stroke="currentColor"
                        strokeWidth="1.85"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Expanded Details */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className={styles.expandedContentWrapper}
                    >
                      <div className={styles.expandedContent}>
                        {/* Image Thumbnail */}
                        <div className={styles.imageCol}>
                          <div className={styles.imageFrame}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 360px"
                              className={styles.detailImage}
                            />
                          </div>
                        </div>

                        {/* Narrative & Tags */}
                        <div className={styles.textCol}>
                          <h3 className={styles.detailSubtitle}>{item.subtitle}</h3>
                          <p className={styles.detailDescription}>{item.description}</p>
                          <div className={styles.tagList}>
                            {item.tags.map((tag) => (
                              <span key={tag} className={styles.tagItem}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
