"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SkillsGrid.module.css";

interface ServiceItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  emblemText: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "brand",
    name: "Brand",
    subtitle: "Brand Systems & Identity",
    description: "Creative direction, enduring brand systems, and distinctive digital languages.",
    image: "/images/project_collective.jpg",
    emblemText: "DXOD",
  },
  {
    id: "digital",
    name: "Digital",
    subtitle: "Web & Mobile Platforms",
    description: "Ultra-responsive React 19, Next.js, and high-performance digital products.",
    image: "/images/skill_custom_tools.jpg",
    emblemText: "DIGITAL",
  },
  {
    id: "content",
    name: "Content",
    subtitle: "Editorial Media Architecture",
    description: "Atmospheric digital editorial publications, creative strategy, and typography.",
    image: "/images/project_brutalist.jpg",
    emblemText: "CONTENT",
  },
  {
    id: "motion",
    name: "Motion",
    subtitle: "Tactile Animations & Shaders",
    description: "Fluid micro-interactions, hardware-accelerated animations, and spatial design.",
    image: "/images/hero_phone_flare.jpg",
    emblemText: "MOTION",
  },
  {
    id: "print",
    name: "Print",
    subtitle: "Physical Craft & Spatial Layouts",
    description: "Tangible physical monographs, packaging design, and tactile lifestyle artifacts.",
    image: "/images/project_warpspeed_desk.jpg",
    emblemText: "PRINT",
  },
];

export default function SkillsGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = SERVICES[activeIndex];

  return (
    <section className={styles.servicesSection} id="skills" aria-label="Services">
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Column 1: Left Minimalist Header Label */}
          <div className={styles.leftCol}>
            <span className={styles.sectionLabel}>SERVICES</span>
          </div>

          {/* Column 2: Center Interactive Typography List */}
          <div className={styles.centerCol}>
            <div className={styles.servicesList} role="tablist" aria-label="Services List">
              {SERVICES.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`${styles.serviceBtn} ${isActive ? styles.serviceBtnActive : ""}`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* Pill Button: See More */}
            <div className={styles.seeMoreWrapper}>
              <Link href="/about" className={styles.seeMoreBtn}>
                See More
              </Link>
            </div>
          </div>

          {/* Column 3: Right Dynamic Visual Canvas */}
          <div className={styles.rightCol}>
            <div className={styles.imageCardWrapper}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className={styles.imageCard}
                >
                  <Image
                    src={activeService.image}
                    alt={activeService.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 550px"
                    priority
                    className={styles.cardImage}
                  />

                  {/* Centered Artistic Emblem Overlay Matching Reference (e.g. DXOD) */}
                  <div className={styles.overlay}>
                    <span className={styles.emblemText}>{activeService.emblemText}</span>
                    <p className={styles.serviceDesc}>{activeService.description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
