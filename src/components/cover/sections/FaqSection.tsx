"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FaqSection.module.css";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "tech-stack",
    question: "What is your primary technology stack?",
    answer:
      "My core stack centers on TypeScript, React 19, Next.js, and Node.js for frontend interfaces, paired with Go, Rust, and PostgreSQL for high-performance backends. On cloud and DevOps, I engineer on Kubernetes, Docker, and Terraform across AWS and GCP.",
  },
  {
    id: "architecture-approach",
    question: "How do you approach a new project or architecture?",
    answer:
      "I start from first principles: modeling domain constraints, data flow patterns, and real user requirements before writing code. Every system is architected for mathematical clarity, observable telemetry, and long-term maintainability without unnecessary dependencies.",
  },
  {
    id: "remote-collaboration",
    question: "Do you work with remote teams across different time zones?",
    answer:
      "Yes. I work seamlessly with engineering teams, design agencies, and founders across North America, Europe, and Asia-Pacific through asynchronous documentation, clear RFCs, and focused synchronous checkpoints.",
  },
  {
    id: "high-throughput-scale",
    question: "How do you handle high-throughput and distributed scale?",
    answer:
      "Through proven distributed patterns: partitioned event streaming with Apache Kafka, sub-millisecond in-memory caching with Redis, optimized connection pooling, horizontal autoscaling with Kubernetes, and end-to-end tracing with OpenTelemetry.",
  },
  {
    id: "booking-consultation",
    question: "How do I book an architectural consultation or build?",
    answer:
      "Simply reach out through the contact form below or email me directly at dilshan.devxx@gmail.com. We will schedule an initial technical deep-dive to review your system roadmap, timeline, and delivery milestones.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.faqSection} id="faq" aria-label="Frequently Asked Questions">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Frequently asked questions.
          </h2>
        </div>

        {/* Accordion List */}
        <div className={styles.accordionList}>
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={styles.accordionItem}>
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  className={styles.rowTrigger}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{item.question}</span>
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

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className={styles.answerWrapper}
                    >
                      <div className={styles.answerInner}>
                        <p className={styles.answerText}>{item.answer}</p>
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
