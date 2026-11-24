"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiX, FiCheck, FiMail } from "react-icons/fi";
import styles from "./NewsletterModal.module.css";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setTimeout(() => inputRef.current?.focus(), 80);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubmitted(true);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close newsletter modal">
          <FiX size={18} />
        </button>

        <div className={styles.modalHeader}>
          <div className={styles.iconCircle}>
            <FiMail size={22} className={styles.mailIcon} />
          </div>
          <h2 id="modal-title" className={styles.modalTitle}>
            Subscribe to the Newsletter
          </h2>
          <p className={styles.modalSubtitle}>
            Occasional technical essays, architecture deep dives, and thoughts on craft. No tracking, zero spam, and no affiliate links.
          </p>
        </div>

        {isSubmitted ? (
          <div className={styles.successState}>
            <div className={styles.successCircle}>
              <FiCheck size={24} />
            </div>
            <h3 className={styles.successHeading}>You&apos;re subscribed!</h3>
            <p className={styles.successMessage}>
              Thank you for reading. A confirmation has been noted for <strong>{email}</strong>.
            </p>
            <button className={styles.doneBtn} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.subscribeForm}>
            <div className={styles.inputGroup}>
              <input
                ref={inputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className={styles.emailInput}
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
