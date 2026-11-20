"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SkillsGrid.module.css";

interface TechnicalDomain {
  id: string;
  index: string;
  name: string;
  description: string;
  tags: string[];
}

const TECHNICAL_DOMAINS: TechnicalDomain[] = [
  {
    id: "full-stack",
    index: "01",
    name: "Full-Stack Development",
    description:
      "Architecting end-to-end web applications with performant server components, typed API contracts, reactive state systems, and responsive, accessible user interfaces.",
    tags: [
      "REACT",
      "NEXT.JS",
      "NODE.JS",
      "TYPESCRIPT",
      "TAILWIND CSS",
      "MONGODB",
      "POSTGRESQL",
      "REST APIS",
    ],
  },
  {
    id: "ai-ml",
    index: "02",
    name: "Artificial Intelligence & Machine Learning",
    description:
      "Building intelligent applications, agentic AI systems, LLM-powered workflows, and production-ready machine learning solutions.",
    tags: [
      "PYTHON",
      "PYTORCH",
      "TENSORFLOW",
      "SCIKIT-LEARN",
      "HUGGING FACE",
      "LANGCHAIN",
      "LANGGRAPH",
      "OPENAI API",
      "LLAMAINDEX",
      "MCP",
      "CREWAI",
      "RAG",
      "VECTOR DATABASES",
      "MLFLOW",
      "AWS BEDROCK",
      "FASTAPI",
    ],
  },
  {
    id: "cloud-devops",
    index: "03",
    name: "Cloud Infrastructure & Automation",
    description:
      "Provisioning reproducible infrastructure as code, containerized microservices orchestration, automated deployment pipelines, and zero-downtime release workflows.",
    tags: [
      "AWS",
      "DOCKER",
      "KUBERNETES",
      "TERRAFORM",
      "ANSIBLE",
      "JENKINS",
      "GITHUB ACTIONS",
      "CI/CD",
    ],
  },
  {
    id: "data-engineering",
    index: "04",
    name: "Data Engineering & Business Intelligence",
    description:
      "Designing resilient analytical data pipelines, multi-dimensional relational schemas, automated data transformation models, and executive business intelligence dashboards.",
    tags: [
      "SQL",
      "BIGQUERY",
      "PANDAS",
      "NUMPY",
      "POWER BI",
      "DATA VISUALIZATION",
    ],
  },
  {
    id: "app-security",
    index: "05",
    name: "Application Security & Engineering Practices",
    description:
      "Implementing secure identity verification, robust cryptographic authentication, automated static and dependency vulnerability scanning, and strict runtime schema validation.",
    tags: [
      "OWASP",
      "JWT",
      "OAUTH 2.0",
      "SNYK",
      "SONARQUBE",
      "ZOD",
    ],
  },
  {
    id: "business-strategy",
    index: "06",
    name: "Business Strategy & Project Management",
    description:
      "Leading cross-functional engineering sprints, proactive technical risk assessment, data-driven product roadmap execution, and digital reach optimization.",
    tags: [
      "AGILE",
      "SCRUM",
      "PROJECT MANAGEMENT",
      "RISK MANAGEMENT",
      "SEO",
      "DIGITAL MARKETING",
    ],
  },
];

export default function SkillsGrid() {
  const [openId, setOpenId] = useState<string | null>("full-stack");

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
        <div className={styles.layout}>
          {/* Left Column: Title & Description */}
          <div className={styles.leftCol}>
            <div className={styles.stickyHeader}>
              <h2 className={styles.headline}>Technical Expertise</h2>
              <p className={styles.subheadline}>
                Technologies, disciplines, and practices I use to design, build,
                and deliver modern digital solutions.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Borderless Uppercase Accordion Rows with + Icon */}
          <div className={styles.rightCol}>
            <div className={styles.accordionList}>
              {TECHNICAL_DOMAINS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`${styles.accordionItem} ${
                      isOpen ? styles.accordionItemOpen : ""
                    }`}
                  >
                    {/* Header Button: Bold Uppercase Title on Left, Thin + Icon on Right */}
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className={styles.itemTrigger}
                      aria-expanded={isOpen}
                    >
                      <div className={styles.titleGroup}>
                        <span className={styles.categoryIndex}>
                          {item.index}
                        </span>
                        <span className={styles.cardTitle}>{item.name}</span>
                      </div>

                      <span
                        className={`${styles.plusIcon} ${
                          isOpen ? styles.plusIconOpen : ""
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

                    {/* Animated Accordion Body */}
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
                          <div className={styles.expandedBody}>
                            <p className={styles.description}>
                              {item.description}
                            </p>
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
