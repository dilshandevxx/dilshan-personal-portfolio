"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { journeyMilestones } from "@/data/timeline";
import styles from "./JourneySection.module.css";

export default function JourneySection() {
  return (
    <section className={styles.journeySection} id="journey" aria-label="Career Milestones and Engineering Journey">
      <div className={styles.journeyContainer}>
        {/* Section Header — Direct & Clean, No Dots, No Eyebrow Tags */}
        <motion.div
          className={styles.journeyHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.journeyHeadline}>The Engineering Journey</h2>
        </motion.div>

        {/* 3-Column Asymmetric Milestone Layout (Matching Reference Architecture & Chronology) */}
        <div className={styles.journeyGrid}>
          {/* -------------------------------------------------------------
              COLUMN 1: Architectural Photo Frame (warm sunlit tones)
              ------------------------------------------------------------- */}
          <motion.div
            className={styles.journeyPhotoCard}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/about/journey_architecture.jpg"
              alt="Architectural space in natural sunlight"
              fill
              sizes="(max-width: 960px) 100vw, 340px"
              className={styles.journeyImage}
            />
          </motion.div>

          {/* -------------------------------------------------------------
              COLUMNS 2 & 3: 2-Column Milestones with Clean Vertical Dividers
              ------------------------------------------------------------- */}
          <div className={styles.milestonesGrid}>
            {journeyMilestones.map((milestone, idx) => (
              <motion.div
                key={milestone.year}
                className={styles.milestoneItem}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className={styles.milestoneYear}>{milestone.year}</h3>
                <p className={styles.milestoneDesc}>{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
