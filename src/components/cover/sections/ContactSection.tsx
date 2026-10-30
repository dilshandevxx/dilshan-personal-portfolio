"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate instantaneous clean submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section className={styles.contactSection} id="contact" aria-label="Contact Me">
      <div className={styles.container}>
        {/* Left Column: Heading & Narrative */}
        <motion.div
          className={styles.leftCol}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>
            <span className={styles.headingWhite}>FEEL FREE TO</span>
            <span className={styles.headingAccent}>CONTACT ME</span>
          </h2>

          <p className={styles.description}>
            Feel free to contact me anytime! Whether you have a question, a project in mind, or just want to connect, I&apos;m always open to new opportunities and collaborations. Don&apos;t hesitate to reach out; I&apos;m here to help and look forward to hearing from you.
          </p>
        </motion.div>

        {/* Right Column: Interactive Form */}
        <motion.div
          className={styles.rightCol}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {submitted ? (
            <div className={styles.successMessage}>
              <h3 className={styles.successTitle}>Message Received</h3>
              <p className={styles.successText}>
                Thank you for reaching out. I&apos;ll get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", message: "" });
                }}
                className={styles.resetButton}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputRow}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.input}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.textareaWrapper}>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={styles.textarea}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={styles.sendButton}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
