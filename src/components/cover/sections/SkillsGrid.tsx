"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SkillsGrid.module.css";

interface TechnicalDomain {
  id: string;
  index: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
}

const TECHNICAL_DOMAINS: TechnicalDomain[] = [
  {
    id: "full-stack",
    index: "01",
    name: "Full-Stack Development",
    description:
      "Architecting end-to-end web applications with performant server components, typed API contracts, reactive state systems, and responsive, accessible user interfaces built for sub-second execution.",
    image: "/images/what-i-do/what_i_do_1.png",
    tags: [
      "React 19",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "GraphQL",
      "REST APIs",
      "State Machines",
    ],
  },
  {
    id: "ai-ml",
    index: "02",
    name: "Artificial Intelligence & Machine Learning",
    description:
      "Engineering autonomous multi-agent systems, low-latency LLM inference runtimes, hybrid RAG retrieval pipelines, and production machine learning solutions with deterministic reliability.",
    image: "/images/what-i-do/what_i_do_2.png",
    tags: [
      "PyTorch",
      "vLLM & PagedAttention",
      "LangGraph",
      "LlamaIndex",
      "Model Quantization",
      "Vector Search",
      "MCP Protocol",
      "FastAPI",
    ],
  },
  {
    id: "cloud-devops",
    index: "03",
    name: "Cloud Infrastructure & Automation",
    description:
      "Provisioning reproducible infrastructure as code, containerized microservices orchestration with Kubernetes, automated CI/CD deployment pipelines, and zero-downtime release workflows.",
    image: "/images/what-i-do/what_i_do_3.png",
    tags: [
      "AWS & GCP",
      "Kubernetes (K8s)",
      "Docker Containers",
      "Terraform IaC",
      "GitHub Actions",
      "Distributed Caching",
      "Linux Kernel",
    ],
  },
  {
    id: "data-engineering",
    index: "04",
    name: "Data Engineering & Business Intelligence",
    description:
      "Designing resilient analytical data pipelines, multi-dimensional relational schemas, automated data transformation models, and executive business intelligence dashboards with sub-second queries.",
    image: "/images/what-i-do/what_i_do_4.png",
    tags: [
      "SQL & BigQuery",
      "PostgreSQL",
      "Pandas & NumPy",
      "Data Modeling",
      "ETL Orchestration",
      "Time-Series Analysis",
      "BI Dashboards",
    ],
  },
  {
    id: "app-security",
    index: "05",
    name: "Application Security & Engineering Practices",
    description:
      "Implementing secure identity verification, robust cryptographic authentication, automated static and dependency vulnerability scanning, and strict runtime schema validation across boundaries.",
    image: "/images/articles/article_design_systems.jpg",
    tags: [
      "OWASP Standards",
      "JWT & OAuth 2.0",
      "Role-Based Access (RBAC)",
      "Snyk & SonarQube",
      "Runtime Zod Validation",
      "Data Encryption at Rest",
    ],
  },
  {
    id: "business-strategy",
    index: "06",
    name: "Business Strategy & Project Management",
    description:
      "Leading cross-functional engineering sprints, proactive technical risk assessment, data-driven product roadmap execution, and digital reach optimization with clear RFC decision documentation.",
    image: "/images/articles/article_design_workflows.jpg",
    tags: [
      "Agile & Scrum Sprints",
      "System RFCs",
      "Architecture Roadmaps",
      "Risk Mitigation",
      "Core Web Vitals",
      "Technical Advisory",
    ],
  },
];

export default function SkillsGrid() {
  // Never default expand any card — starts completely collapsed
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={styles.servicesSection}
      id="skills"
      aria-label="Technical Expertise"
    >
      <div className={styles.container}>
        {/* Title on the Top - Direct, Clean, No Dots, No Eyebrows */}
        <div className={styles.headerBlock}>
          <h2 className={styles.headline}>Technical Expertise</h2>
        </div>

        {/* Technical List Below */}
        <div className={styles.accordionList}>
          {TECHNICAL_DOMAINS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ""
                  }`}
              >
                {/* Header Button: Index + Bold Title on Left, Plus Icon on Right */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className={styles.itemTrigger}
                  aria-expanded={isOpen}
                >
                  <div className={styles.titleGroup}>
                    <span className={styles.cardTitle}>{item.name}</span>
                  </div>

                  <span
                    className={`${styles.plusIcon} ${isOpen ? styles.plusIconOpen : ""
                      }`}
                    aria-hidden="true"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.svgPlus}
                    >
                      <path
                        d="M8 2.5V13.5M2.5 8H13.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Animated Accordion Body — 2-Column Split, Compact & Clean, No text on image */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={styles.bodyWrapper}
                    >
                      <div className={styles.splitExpandedContainer}>
                        {/* Left Column: Title, Description, and Rounded Pill Tags */}
                        <div className={styles.leftContentCol}>
                          <h3 className={styles.expandedDomainTitle}>{item.name}</h3>
                          <p className={styles.expandedDescription}>
                            {item.description}
                          </p>

                          <div className={styles.pillTagGrid}>
                            {item.tags.map((tag) => (
                              <span key={tag} className={styles.pillTag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right Column: Clean Rounded Photo Card — NO text on image */}
                        <div className={styles.rightVisualCol}>
                          <div className={styles.visualCardFrame}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(max-width: 900px) 100vw, 420px"
                              className={styles.visualCardImage}
                            />
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
