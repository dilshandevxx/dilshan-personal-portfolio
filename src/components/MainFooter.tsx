"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa6";
import { Check } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import styles from "./MainFooter.module.css";

export default function MainFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubscribed(true);
  };

  const currentYear = 2026;

  return (
    <footer className={styles.footerRoot} role="contentinfo" aria-label="Site Footer">
      <div className={styles.container}>
        {/* Main 3-Column Footer Grid (Matching User Reference Layout) */}
        <div className={styles.footerGrid}>
          {/* Column 1: Sitemap */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Sitemap</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/" className={styles.navLink}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about-me" className={styles.navLink}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className={styles.navLink}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/portfolio/blog" className={styles.navLink}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/portfolio/shelves" className={styles.navLink}>
                  Shelves
                </Link>
              </li>
              <li>
                <Link href="/portfolio/resume" className={styles.navLink}>
                  CV &amp; Resume
                </Link>
              </li>
              <li>
                <Link href="/#contact" className={styles.navLink}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Contact */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contact</h3>
            <div className={styles.contactBlock}>
              <p className={styles.contactAddress}>
                Colombo, Sri Lanka
                <br />
                Available Worldwide &bull; Remote
              </p>

              <div className={styles.contactDetails}>
                <p className={styles.contactItem}>
                  <span className={styles.contactPrefix}>P:</span>
                  <a href="tel:+94775944600" className={styles.contactLink}>
                    +94 77 594 4600
                  </a>
                </p>
                <p className={styles.contactItem}>
                  <span className={styles.contactPrefix}>E:</span>
                  <a
                    href={`mailto:${siteConfig.social.email}`}
                    className={styles.contactLink}
                  >
                    {siteConfig.social.email}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Subscribe to our newsletter */}
          <div className={styles.colNewsletter}>
            <h3 className={styles.colTitle}>Subscribe to our newsletter</h3>

            {subscribed ? (
              <div className={styles.subscribedBanner}>
                <Check size={16} color="#4ade80" />
                <span>You&apos;re subscribed! Thank you for following along.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <div className={styles.newsletterPill}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    required
                    className={styles.newsletterInput}
                    aria-label="Email address for newsletter"
                  />
                  <button type="submit" className={styles.subscribeBtn}>
                    Subscribe
                  </button>
                </div>
              </form>
            )}

            <div className={styles.disclaimerRow}>
              <span className={styles.disclaimerDot} aria-hidden="true" />
              <span className={styles.disclaimerText}>
                By subscribing you agree to our <strong>Terms &amp; Conditions</strong>.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Profiles */}
        <div className={styles.bottomBar}>
          <p className={styles.copyrightText}>
            &copy; {currentYear} {siteConfig.name}. Designed &amp; engineered with care.
          </p>

          <nav className={styles.socialNav} aria-label="Social Profiles">
            {siteConfig.social.facebook && (
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIconLink}
                aria-label="Facebook Profile"
              >
                <FaFacebookF size={14} />
              </a>
            )}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIconLink}
              aria-label="Instagram Profile"
            >
              <FaInstagram size={15} />
            </a>
            <a
              href={siteConfig.social.x}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIconLink}
              aria-label="X (Twitter) Profile"
            >
              <FaXTwitter size={14} />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIconLink}
              aria-label="LinkedIn Profile"
            >
              <FaLinkedinIn size={15} />
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIconLink}
              aria-label="GitHub Profile"
            >
              <FaGithub size={15} />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
