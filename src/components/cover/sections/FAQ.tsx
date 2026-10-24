"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQ.module.css";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "WHAT SERVICES DO YOU OFFER?",
    answer:
      "I specialize in full-stack web development, frontend architecture, and design systems. From building performant Next.js applications to crafting intuitive user experiences and resilient backend integrations.",
  },
  {
    question: "DO YOU WORK WITH CLIENTS REMOTELY?",
    answer:
      "Yes, I collaborate with teams and clients worldwide. I work smoothly across different time zones, maintaining transparent communication through Slack, GitHub, and scheduled async updates.",
  },
  {
    question: "WHAT IS YOUR TYPICAL TIMELINE FOR A PROJECT?",
    answer:
      "Timelines depend on project scope and complexity. Small to medium web applications or portfolio websites typically take 2–4 weeks, while larger end-to-end platforms may take 6–8 weeks with weekly milestone deliverables.",
  },
  {
    question: "WHAT TECH STACK DO YOU SPECIALIZE IN?",
    answer:
      "My core stack includes TypeScript, Next.js, React, Node.js, Go, PostgreSQL, and modern styling solutions. I also have deep experience building responsive interfaces with Framer Motion and scalable cloud architectures.",
  },
  {
    question: "HOW DO WE START WORKING TOGETHER?",
    answer:
      "You can reach out via the contact form below or email me directly at dilshan.devxx@gmail.com. We'll discuss your goals, scope, and timeline to see if we're a great fit before jumping into a proposal.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.container}>
        {/* Header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.title}>
            FREQUENTLY ASKED<br />QUESTIONS
          </h2>
          <p className={styles.subtitle}>
            Here are some quick answers. If you have other questions, just reach out — I&apos;d love to help.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className={styles.accordionList}>
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={styles.accordionItem}>
                <button
                  type="button"
                  className={styles.accordionTrigger}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <span className={`${styles.iconWrapper} ${isOpen ? styles.iconOpen : ""}`}>
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.answerWrapper}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className={styles.answerContent}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <motion.div 
          className={styles.bottomCallout}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="#contact" className={styles.contactLink}>
            <span className={styles.dot} />
            CONTACT ME
          </Link>
          <p className={styles.subtext}>For more question</p>
        </motion.div>
      </div>
    </section>
  );
}
