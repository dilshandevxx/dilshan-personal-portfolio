"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./SelectedWork.module.css";
import { PROJECTS } from "@/data/coverProjects";

export default function SelectedWork() {
  return (
    <section className={styles.workSection} id="work">
      <div className={styles.header}>
        <h2 className={styles.title}>Our Work</h2>
      </div>

      <div className={styles.grid}>
        {PROJECTS.map((project, index) => (
          <Link key={project.id} href="/projects" className={styles.projectLink}>
            <motion.div
              className={styles.projectCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.2 }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <h3 className={styles.projectName}>{project.title}</h3>
                  <span className={styles.projectCategory}>{project.category}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <motion.div 
        className={styles.viewAllContainer}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link href="/projects" className={styles.viewAllBtn}>
          <span>View All Projects</span>
          <ArrowRight className={styles.btnIcon} size={20} />
        </Link>
      </motion.div>
    </section>
  );
}
