"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./About.module.css";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section className={styles.aboutSection} ref={containerRef}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <span className={styles.label}>[ WHO WE ARE ]</span>
        </motion.div>
        
        <div className={styles.content}>
          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <h2 className={styles.statement}>
              We are a digital agency focused on building high-end web experiences.{' '}
              <span className={styles.mutedText}>
                We blend design and technology to create premium identities for brands who want to stand out.
              </span>
            </h2>
          </motion.div>

          <div className={styles.imageWrapper}>
            <motion.div style={{ y }} className={styles.imageInner}>
              <Image 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop" 
                alt="Who We Are" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
