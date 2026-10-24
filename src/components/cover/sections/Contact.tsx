"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Trigger direct mail client as fallback
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.open(`mailto:dilshan.devxx@gmail.com?subject=${subject}&body=${body}`, "_blank");

    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.container}>
        {/* Left Column: Heading & Narrative */}
        <motion.div 
          className={styles.leftColumn}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.heading}>
            <span className={styles.headingWhite}>FEEL FREE TO</span>
            <span className={styles.headingGold}>CONTACT ME</span>
          </h2>
          <p className={styles.description}>
            Feel free to contact me anytime! Whether you have a question, a project in mind, or just want to connect, I&apos;m always open to new opportunities and collaborations. Don&apos;t hesitate to reach out; I&apos;m here to help and look forward to hearing from you
          </p>
        </motion.div>

        {/* Right Column: Clean Contact Form */}
        <motion.div 
          className={styles.rightColumn}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className={styles.textarea}
            />

            <button type="submit" className={styles.submitBtn}>
              {submitted ? "Message Sent!" : "Send"}
            </button>

            {submitted && (
              <div className={`${styles.statusMessage} ${styles.statusSuccess}`}>
                Thank you! Your email client has been opened with your message.
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
