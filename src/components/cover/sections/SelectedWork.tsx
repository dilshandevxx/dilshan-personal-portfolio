"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./SelectedWork.module.css";

export interface WorkCardItem {
  id: string;
  slug: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  hasBuiltinText?: boolean;
}

const WORK_CAROUSEL_ITEMS: WorkCardItem[] = [
  {
    id: "karhu",
    slug: "karhu-streetwear",
    badge: "Shopify Plus",
    title: "Karhu",
    description: "Nordic running brand turned streetwear stylistics.",
    image: "/images/work/work_karhu.png",
    hasBuiltinText: true,
  },
  {
    id: "patta",
    slug: "patta-amsterdam",
    badge: "Shopify Plus",
    title: "Patta",
    description: "Footwear and lifestyle brand from the streets of Amsterdam.",
    image: "/images/work/work_patta.png",
    hasBuiltinText: true,
  },
  {
    id: "haute",
    slug: "haute-horlogerie",
    badge: "Headless",
    title: "Haute Horlogerie",
    description: "Bespoke digital flagship for luxury horology & editorial craft.",
    image: "/images/work/work_haute.png",
    hasBuiltinText: false,
  },
  {
    id: "krea-ai",
    slug: "krea-foundation-models",
    badge: "AI / ML Platform",
    title: "Krea Foundation",
    description: "Foundation model training, style transfer & creative canvas suite.",
    image: "/images/work/work_krea.png",
    hasBuiltinText: false,
  },
  {
    id: "speed-architecture",
    slug: "speed-cluster-architecture",
    badge: "Kubernetes & GPU",
    title: "Speed Architecture",
    description: "Distributed GPU inference platform with sub-16ms tensor serving.",
    image: "/images/work/work_speed.png",
    hasBuiltinText: false,
  },
];

export default function SelectedWork() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollByDirection = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === "left" ? -380 : 380;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className={styles.workSection} id="projects" aria-label="Our Work">
      {/* 1. Centered Section Header Matching Reference Design */}
      <div className={styles.headerWrap}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Our work
        </motion.h2>
      </div>

      {/* 2. Full-Bleed Horizontal Carousel with Overflow */}
      <div className={styles.carouselContainer}>
        <div ref={carouselRef} className={styles.carouselTrack}>
          {WORK_CAROUSEL_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              className={styles.cardItem}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href="/projects"
                className={styles.cardLink}
                aria-label={`View ${item.title}`}
              >
                {/* Background Poster Image */}
                <div className={styles.imageFrame}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 380px"
                    priority={idx < 2}
                    className={styles.posterImg}
                  />

                  {/* Dark Vignette Overlay for Crisp Readability */}
                  <div className={styles.posterOverlay} />

                  {/* Top-Left Frosted Glass Category Pill */}
                  {!item.hasBuiltinText && (
                    <div className={styles.topPillWrap}>
                      <span className={styles.categoryPill}>{item.badge}</span>
                    </div>
                  )}

                  {/* Floating Action Arrow Circle (Appears on Hover or active) */}
                  <div className={styles.hoverCursor}>
                    <ArrowRight size={18} className={styles.cursorArrow} />
                  </div>

                  {/* Bottom Content Block */}
                  {!item.hasBuiltinText ? (
                    <div className={styles.bottomContent}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardDesc}>{item.description}</p>
                    </div>
                  ) : (
                    <span className="sr-only">
                      {item.title} — {item.description}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Carousel Navigation Arrows & Explore Action */}
        <div className={styles.carouselControls}>
          <div className={styles.arrowControls}>
            <button
              type="button"
              onClick={() => scrollByDirection("left")}
              className={styles.navArrowBtn}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollByDirection("right")}
              className={styles.navArrowBtn}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <Link href="/projects" className={styles.seeAllLink}>
            <span>SEE ALL PROJECTS</span>
            <span className={styles.actionArrow} aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
