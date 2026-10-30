"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./SkillsGrid.module.css";

interface SkillItem {
  id: string;
  index: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
}

const SKILL_ITEMS: SkillItem[] = [
  {
    id: "ai-strategy",
    index: "/01",
    title: "AI CONSULTING &\nSTRATEGY",
    image: "/images/skill_ai_strategy.jpg",
    description:
      "WHETHER YOU'RE JUST EXPLORING POSSIBILITIES OR LOOKING TO SCALE EXISTING MODELS, WE BUILD A CLEAR PLAN THAT ALIGNS WITH YOUR GOALS—FROM DETERMINISTIC INFERENCE TO ENTERPRISE RAG.",
    tags: ["#AICONSULTING", "#BUSINESSAUTOMATION", "#PYTORCH", "#RAGARCHITECTURES"],
  },
  {
    id: "workflow-automation",
    index: "/02",
    title: "WORKFLOW\nAUTOMATION",
    image: "/images/skill_workflow_automation.jpg",
    description:
      "WE DESIGN AND DEPLOY RESILIENT DISTRIBUTED BACKENDS AND AUTOMATION PIPELINES THAT TAKE REPETITIVE TASKS OFF YOUR PLATE—STREAMLINING COMPLEX DATA FLOWS, REAL-TIME QUEUES, AND SERVICES.",
    tags: ["#SAVETIME", "#WORKSMARTER", "#NOMANUALWORK", "#GOLANG", "#KAFKA"],
  },
  {
    id: "custom-ai-tools",
    index: "/03",
    title: "CUSTOM AI TOOLS &\nINTEGRATIONS",
    image: "/images/skill_custom_tools.jpg",
    description:
      "NEED SOMETHING MORE SPECIFIC? WE DEVELOP LIGHTWEIGHT, HIGH-PERFORMANCE WEB APPLICATIONS TAILORED TO YOUR OPERATIONS—FROM ANALYTICS CANVASES TO SMART INTELLIGENT ASSISTANTS.",
    tags: ["#AITOOLS", "#TAILOREDTECH", "#NEXTJS", "#REACT19", "#TYPESCRIPT"],
  },
  {
    id: "team-onboarding",
    index: "/04",
    title: "TEAM ONBOARDING &\nTRAINING",
    image: "/images/skill_team_training.jpg",
    description:
      "SYSTEMS ONLY DELIVER LASTING IMPACT WHEN YOUR TEAM OPERATES THEM WITH CONFIDENCE. WE OFFER CLEAR DOCUMENTATION, CANARY GITOPS DEPLOYMENTS, AND ONGOING ARCHITECTURAL SUPPORT.",
    tags: ["#AITRAINING", "#KUBERNETES", "#GITOPS", "#PRODUCTIONRIGOR"],
  },
];

export default function SkillsGrid() {
  return (
    <section className={styles.skillsSection} id="skills">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <motion.div
            className={styles.pillBadge}
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
          >
            <span className={styles.badgeDot} aria-hidden="true" />
            <span>CAPABILITIES &amp; EXPERTISE</span>
          </motion.div>

          <motion.h2
            className={styles.headline}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            CORE CAPABILITIES &amp; TECHNICAL DISCIPLINE.
          </motion.h2>
        </div>

        {/* Editorial Rows Container */}
        <div className={styles.rowsContainer}>
          {SKILL_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              className={styles.skillRow}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Corner Plus Crosshairs */}
              <span className={styles.crosshairTopLeft}>+</span>
              <span className={styles.crosshairTopRight}>+</span>
              <span className={styles.crosshairBottomLeft}>+</span>
              <span className={styles.crosshairBottomRight}>+</span>

              {/* Col 1: Index Number */}
              <div className={styles.indexCol}>{item.index}</div>

              {/* Col 2: Title */}
              <div className={styles.titleCol}>
                <h3 className={styles.rowTitle} style={{ whiteSpace: "pre-line" }}>
                  {item.title}
                </h3>
              </div>

              {/* Col 3: Image Card */}
              <div className={styles.imageCol}>
                <Image
                  src={item.image}
                  alt={item.title.replace("\n", " ")}
                  fill
                  sizes="(max-width: 960px) 100vw, 360px"
                  className={styles.skillImage}
                />
              </div>

              {/* Col 4: Description & Tags */}
              <div className={styles.descCol}>
                <p className={styles.rowDescription}>{item.description}</p>
                <div className={styles.tagsList}>
                  {item.tags.map((tag) => (
                    <span key={tag} className={styles.tagPill}>
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
