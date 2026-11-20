"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const emailAddress = "dilshan.devxx@gmail.com";

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate instantaneous clean submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 650);
  };

  return (
    <section className={styles.contactSection} id="contact" aria-label="Contact Me">
      <div className={styles.container}>
        {/* Left Column: Heading, Narrative & Tactile Contact Info */}
        <motion.div
          className={styles.leftCol}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle Live Status Indicator */}
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span className={styles.statusLabel}>AVAILABLE FOR COLLABORATION</span>
          </div>

          <h2 className={styles.heading}>
            <span className={styles.headingWhite}>Feel free to</span>
            <span className={styles.headingSecondary}>contact me.</span>
          </h2>

          <p className={styles.description}>
            Feel free to contact me anytime! Whether you have a question, a project in mind,
            or just want to connect, I&apos;m always open to new opportunities and
            collaborations. Don&apos;t hesitate to reach out; I&apos;m here to help and
            look forward to hearing from you.
          </p>

          {/* Quick Direct Info Cards */}
          <div className={styles.contactDetails}>
            <div className={styles.contactCard}>
              <div className={styles.contactCardIconWrap}>
                <Mail size={16} className={styles.contactCardIcon} />
              </div>
              <div className={styles.contactCardContent}>
                <span className={styles.contactCardLabel}>DIRECT EMAIL</span>
                <div className={styles.emailRow}>
                  <a href={`mailto:${emailAddress}`} className={styles.contactCardValue}>
                    {emailAddress}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={styles.copyBtn}
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copied ? (
                      <span className={styles.copiedText}>Copied!</span>
                    ) : (
                      <Copy size={13} className={styles.copyIcon} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactCardIconWrap}>
                <MapPin size={16} className={styles.contactCardIcon} />
              </div>
              <div className={styles.contactCardContent}>
                <span className={styles.contactCardLabel}>LOCATION & TIMEZONE</span>
                <span className={styles.contactCardValue}>Colombo, Sri Lanka · UTC+5:30</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Modern Editorial Form Card */}
        <motion.div
          className={styles.rightCol}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.formCard}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className={styles.successMessage}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={styles.successIconWrap}>
                    <Check size={24} className={styles.successCheckIcon} />
                  </div>
                  <h3 className={styles.successTitle}>Message Sent Successfully</h3>
                  <p className={styles.successText}>
                    Thank you for reaching out! I&apos;ve received your message and will get back
                    to you promptly.
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
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className={styles.form}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className={styles.inputGroup}>
                    <label htmlFor="contact-name" className={styles.label}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="contact-email" className={styles.label}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="contact-message" className={styles.label}>
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Tell me about your project, idea, or inquiry..."
                      rows={4}
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
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                    <ArrowUpRight size={16} className={styles.sendArrow} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
