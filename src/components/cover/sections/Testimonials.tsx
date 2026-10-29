"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./Testimonials.module.css";

const REVIEWS = [
  {
    id: 1,
    quote: "Your reputation is more important than your paycheck, and your integrity.",
    author: "Ryan Holmes",
    role: "CEO of GlobalTech",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    quote: "They don't just build websites, they engineer digital experiences.",
    author: "Elena Rostova",
    role: "VP of Product",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    quote: "Unparalleled execution. Our conversion rates have doubled since launch.",
    author: "Marcus Chen",
    role: "Founder, Zenith",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.header}>
        <span className={styles.sectionLabel}>[ CLIENT STORIES ]</span>
      </div>

      <div className={styles.quoteWrapper}>
        <div className={styles.bgQuoteMark}>"</div>

        <AnimatePresence mode="popLayout">
          <motion.div 
            key={currentIndex}
            className={styles.activeQuoteContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={quoteVariants}
          >
            <h3 className={styles.quoteText}>
              "{REVIEWS[currentIndex].quote}"
            </h3>
            
            <div className={styles.authorBlock}>
              <div className={styles.avatar}>
                <Image 
                  src={REVIEWS[currentIndex].avatar} 
                  alt={REVIEWS[currentIndex].author} 
                  fill 
                  sizes="60px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.authorDetails}>
                <span className={styles.authorName}>{REVIEWS[currentIndex].author}</span>
                <span className={styles.authorRole}>{REVIEWS[currentIndex].role}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className={styles.controls}>
          <button onClick={handlePrev} className={styles.navButton} aria-label="Previous quote">
            <ArrowLeft strokeWidth={1} />
          </button>
          <div className={styles.pagination}>
            {String(currentIndex + 1).padStart(2, '0')} / {String(REVIEWS.length).padStart(2, '0')}
          </div>
          <button onClick={handleNext} className={styles.navButton} aria-label="Next quote">
            <ArrowRight strokeWidth={1} />
          </button>
        </div>
      </div>
    </section>
  );
}
