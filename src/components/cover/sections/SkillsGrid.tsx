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
    <section className={styles.servicesSection} id="skills" aria-label="Services & Capabilities">
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Left Column: Clean Bold Headline Matching Reference */}
          <div className={styles.leftCol}>
            <h2 className={styles.headline}>Services</h2>
          </div>

          {/* Right Column: Rounded Accordion Cards List Matching Reference */}
          <div className={styles.rightCol}>
            <div className={styles.cardsList}>
              {SKILL_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className={styles.cardItem}>
                    {/* Header Button with Question/Title on Left & Plus on Right */}
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className={styles.cardTrigger}
                      aria-expanded={isOpen}
                    >
                      <span className={styles.cardTitle}>{item.name}</span>
                      <span
                        className={`${styles.plusIcon} ${isOpen ? styles.plusIconOpen : ""}`}
                        aria-hidden="true"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={styles.svgPlus}
                        >
                          <path
                            d="M7 1.5V12.5M1.5 7H12.5"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </button>

                    {/* Animated Accordion Body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className={styles.answerWrapper}
                        >
                          <div className={styles.expandedBody}>
                            <h3 className={styles.subtitle}>{item.subtitle}</h3>
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
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
