"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./NavigationMenu.module.css";

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {

  const overlayVariants = {
    closed: { y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    open: { y: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  } as const;

  const containerVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  } as const;

  const itemVariants = {
    closed: { y: 50, opacity: 0 },
    open: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  } as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           className={styles.overlay}
           variants={overlayVariants}
           initial="closed"
           animate="open"
           exit="closed"
        >
          <div className={styles.container}>
            <motion.div 
               className={styles.linksContainer}
               variants={containerVariants}
            >
              {NAV_LINKS.map((link, index) => (
                <motion.div key={index} variants={itemVariants} className={styles.linkItem}>
                  <Link href={link.href} className={styles.navLink} onClick={onClose}>
                    <span className={styles.linkLabel}>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
