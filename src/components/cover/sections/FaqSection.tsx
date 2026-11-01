"use client";

import React, { useState } from "react";
import Link from "next/link";
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
    question: "WHAT IS YOUR PRIMARY TECHNOLOGY STACK?",
    answer:
      "My core stack centers on TypeScript, React 19, Next.js, and Node.js for frontend interfaces, paired with Go, Rust, and PostgreSQL for high-performance backends. On cloud and DevOps, I engineer on Kubernetes, Docker, and Terraform across AWS and GCP.",
  },
  {
    id: "architecture-approach",
    question: "HOW DO YOU APPROACH A NEW PROJECT OR ARCHITECTURE?",
    answer:
      "I start from first principles: modeling domain constraints, data flow patterns, and real user requirements before writing code. Every system is architected for mathematical clarity, observable telemetry, and long-term maintainability without unnecessary dependencies.",
  },
  {
    id: "remote-collaboration",
    question: "DO YOU WORK WITH REMOTE TEAMS ACROSS DIFFERENT TIME ZONES?",
    answer:
      "Yes. I work seamlessly with engineering teams, design agencies, and founders across North America, Europe, and Asia-Pacific through asynchronous documentation, clear RFCs, and focused synchronous checkpoints.",
  },
  {
    id: "high-throughput-scale",
    question: "HOW DO YOU HANDLE HIGH-THROUGHPUT & DISTRIBUTED SCALE?",
    answer:
      "Through proven distributed patterns: partitioned event streaming with Apache Kafka, sub-millisecond in-memory caching with Redis, optimized connection pooling, horizontal autoscaling with Kubernetes, and end-to-end tracing with OpenTelemetry.",
  },
  {
    id: "booking-consultation",
    question: "HOW DO I BOOK AN ARCHITECTURAL CONSULTATION OR BUILD?",
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
        {/* Header matching reference */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleLine}>FREQUENTLY ASKED</span>
            <span className={styles.titleLine}>QUESTIONS</span>
          </h2>
          <p className={styles.subtitle}>
            Here are some quick answers. If you have other questions, just reach out &mdash; I&apos;d love to help.
          </p>
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
                    className={`${styles.plusIcon} ${isOpen ? styles.plusIconOpen : ""}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className={styles.answerWrapper}
                    >
                      <p className={styles.answerText}>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Anchor matching reference */}
        <div className={styles.bottomContact}>
          <Link href="#contact" className={styles.contactLink}>
            <div className={styles.contactBadge}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.contactLabel}>CONTACT ME</span>
            </div>
            <span className={styles.contactSub}>For more question</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
