"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className={styles.ctaSection}>
      <motion.div 
        className={styles.imageWrapper}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Image 
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop" 
          alt="Active Lifestyle" 
          fill 
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={styles.image}
        />
      </motion.div>

      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className={styles.subtitle}>Our Process</div>
        <h2 className={styles.title}>Improve your brand with an awesome site.</h2>
        
        <div className={styles.descriptionBox}>
          <div className={styles.descriptionItem}>
            <div className={styles.itemTitle}>Concept & Ideation</div>
            <div className={styles.itemDesc}>
              We transform your vision into a concrete plan, analyzing your market position and defining a unique aesthetic.
            </div>
          </div>
          <div className={styles.descriptionItem}>
            <div className={styles.itemTitle}>Design & Development</div>
            <div className={styles.itemDesc}>
              Our award-winning team crafts responsive, high-performance interfaces tailored to engage your audience.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
