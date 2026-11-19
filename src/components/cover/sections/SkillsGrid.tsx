"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GeometricBadge, GeometricBadgeType } from "@/components/project-details/GeometricBadge";
import styles from "./SkillsGrid.module.css";

interface CoreServiceCard {
  id: string;
  badgeType: GeometricBadgeType;
  title: string;
  description: string;
}

const CORE_SERVICES: CoreServiceCard[] = [
  {
    id: "ui-ux",
    badgeType: "design",
    title: "UI/UX Design",
    description:
      "Modern design systems, user-centric interfaces, interactive wireframes, and fluid design-to-code workflows that turn products into memorable digital brands.",
  },
  {
    id: "app-dev",
    badgeType: "code",
    title: "App Development",
    description:
      "High-performance web and mobile applications engineered with React 19, Next.js, and Flutter. Offline-first architectures, low-latency APIs, and 60fps tactile interfaces.",
  },
  {
    id: "market-strategy",
    badgeType: "strategy",
    title: "Market Strategy",
    description:
      "Product positioning, technical roadmapping, scalable infrastructure planning, and data-driven architectures designed to accelerate time-to-market and user growth.",
  },
  {
    id: "qa-testing",
    badgeType: "qa",
    title: "QA and Testing",
    description:
      "End-to-end automated testing suites, continuous integration pipelines, performance benchmarking, and strict accessibility standards ensuring zero-defect production rollouts.",
  },
];

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
    <section className={styles.skillsSection} id="skills" aria-label="Skills & Capabilities">
      <div className={styles.container}>
        {/* Top Header matching reference */}
        <div className={styles.header}>
          <div className={styles.badgeWrapper}>
            <span className={styles.pillBadge}>
              <span className={styles.badgeDot}>•</span> OUR SERVICES
            </span>
          </div>
          <h2 className={styles.headline}>
            <span className={styles.headlineTop}>ELEVATING BRANDS THROUGH</span>
            <span className={styles.headlineBottom}>DESIGN AND ENGINEERING</span>
          </h2>
        </div>

        {/* 4 Core Pillars Grid (Faithfully matching Reference Design) */}
        <div className={styles.coreGrid}>
          {CORE_SERVICES.map((service) => (
            <div key={service.id} className={styles.coreCard}>
              <div className={styles.cardBadgeWrap}>
                <GeometricBadge type={service.badgeType} size={48} />
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
            </div>
          ))}
        </div>

        {/* Detailed Capabilities Header */}
        <div className={styles.subListHeader}>
          <span className={styles.subListPill}>• DETAILED SPECIALIZATIONS</span>
          <h3 className={styles.subListTitle}>Deep Engineering &amp; Architectural Focus</h3>
        </div>

        {/* Accordion List with Proper Prominent Sizing */}
        <div className={styles.accordionList}>
          {SKILL_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            const indexStr = String(index + 1).padStart(2, "0");
            return (
              <div key={item.id} className={styles.accordionItem}>
                {/* Accordion Row Trigger */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className={styles.rowTrigger}
                  aria-expanded={isOpen}
                >
                  <div className={styles.titleGroup}>
                    <span className={styles.itemIndex}>{indexStr}</span>
                    <span className={styles.itemTitle}>{item.name}</span>
                  </div>
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
