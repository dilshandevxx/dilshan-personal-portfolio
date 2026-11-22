"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./FaqSection.module.css";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "partners",
    question: "Who do you partner with?",
    answer:
      "I partner with ambitious founders, high-growth startups, scale-ups, and established engineering teams looking to design, build, or modernize critical web applications and distributed systems.",
  },
  {
    id: "working-together",
    question: "What does working with Dilshan look like?",
    answer:
      "Direct, transparent, and high-velocity collaboration. We start with system domain modeling and architecture design, followed by iterative sprint execution with daily async updates, clear RFCs, and working weekly milestones.",
  },
  {
    id: "project-types",
    question: "What kind of projects do you take on?",
    answer:
      "Flagship web applications, distributed backend services, high-throughput APIs, AI/ML integrations, and end-to-end full-stack architectures engineered with React 19, Next.js, Go, and PostgreSQL.",
  },
  {
    id: "timelines",
    question: "What do your typical timelines look like?",
    answer:
      "Timelines typically range from 2 to 6 weeks for focused architecture sprints or MVPs, and 2 to 4 months for comprehensive end-to-end product builds and distributed system deployments.",
  },
  {
    id: "investment",
    question: "What's the investment?",
    answer:
      "Engagements are structured either on a project-based milestone model or a weekly sprint advisory rate. Reach out with your roadmap for a transparent, tailored scope of work.",
  },
  {
    id: "international",
    question: "Do you work with international clients?",
    answer:
      "Yes. I collaborate seamlessly with founders and remote teams across North America, Europe, and Asia-Pacific through asynchronous workflows and overlapping synchronous checkpoints.",
  },
  {
    id: "websites-built",
    question: "What kind of websites do you build?",
    answer:
      "High-performance editorial websites, modern SaaS applications, developer tooling platforms, and interactive digital experiences built for sub-second latency and 100/100 Core Web Vitals.",
  },
  {
    id: "retainer",
    question: "Can we hire on a retainer?",
    answer:
      "Yes. I offer ongoing advisory and engineering retainers for teams needing dedicated architecture oversight, continuous code review, and high-level technical direction.",
  },
  {
    id: "next-steps",
    question: "I'm ready to start. What's next?",
    answer:
      "Simply get in touch via the contact section above or email me directly at dilshan.devxx@gmail.com. We'll set up an introductory deep-dive call to align on your vision, technical requirements, and timeline.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.sectionRoot} id="faq" aria-label="Frequently Asked Questions">
      {/* Header Block: Dark square icon + Title */}
      <motion.div
        className={styles.headerBlock}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.headerSquare} aria-hidden="true" />
        <h2 className={styles.mainTitle}>Frequently Asked Questions</h2>
      </motion.div>

      <div className={styles.toolsDivider} aria-hidden="true" />

      {/* Minimalist Line-Divided Accordion */}
      <div className={styles.accordionList}>
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className={styles.accordionItem}>
              <button
                type="button"
                onClick={() => toggleFaq(item.id)}
                className={styles.triggerButton}
                aria-expanded={isOpen}
              >
                <span className={styles.questionText}>{item.question}</span>
                <span
                  className={`${styles.plusIcon} ${isOpen ? styles.plusIconOpen : ""}`}
                  aria-hidden="true"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.svgPlus}
                  >
                    <line
                      x1="8"
                      y1="2"
                      x2="8"
                      y2="14"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <line
                      x1="2"
                      y1="8"
                      x2="14"
                      y2="8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div className={styles.answerWrap}>
                  <p className={styles.answerText}>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
