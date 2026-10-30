"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Share2, Bell, Copy, Check, Globe, Phone, ExternalLink } from "lucide-react";
import { FaTwitter, FaGithub, FaFigma, FaDribbble, FaLinkedin } from "react-icons/fa";
import styles from "./MobileProfileHero.module.css";

interface StoryHighlight {
  id: string;
  title: string;
  image: string;
}

const STORY_HIGHLIGHTS: StoryHighlight[] = [
  { id: "boards", title: "Boards", image: "/images/story_boards.jpg" },
  { id: "travel", title: "Travel", image: "/images/story_travel.jpg" },
  { id: "cars", title: "Cars", image: "/images/story_cars.jpg" },
  { id: "coffee", title: "Coffee", image: "/images/story_coffee.jpg" },
  { id: "cameras", title: "Cameras", image: "/images/story_cameras.jpg" },
];

export default function MobileProfileHero() {
  const [copied, setCopied] = useState(false);
  const [activeStory, setActiveStory] = useState<StoryHighlight | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const email = "dilshan.devxx@gmail.com";
  const displayEmail = "hey@dilshan.dev";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Dilshan Ramesh — Systems Architect",
          text: "Explore Dilshan Ramesh's engineering portfolio and distributed systems projects.",
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Portfolio URL copied to clipboard!");
    }
  };

  return (
    <div className={styles.mobileProfileRoot}>
      {/* 1. Blurred Banner Background */}
      <div className={styles.bannerContainer}>
        <div className={styles.bannerImageWrapper}>
          <Image
            src="/images/story_travel.jpg"
            alt="Profile Banner"
            fill
            priority
            sizes="100vw"
            className={styles.bannerImage}
          />
        </div>
        <div className={styles.bannerOverlay} />
      </div>

      {/* 2. Overlapping Profile Avatar */}
      <div className={styles.avatarWrapper}>
        <div className={styles.avatarInner}>
          <Image
            src="/dilshan_profile.jpg"
            alt="Dilshan Ramesh"
            fill
            sizes="90px"
            priority
            className={styles.avatarImage}
          />
        </div>
      </div>

      {/* 3. Name & Golden Verified Badge */}
      <div className={styles.profileHeader}>
        <div className={styles.nameRow}>
          <h1 className={styles.displayName}>Dilshan Ramesh</h1>
          <span className={styles.verifiedBadge} title="Verified Profile" aria-label="Verified">
            <svg viewBox="0 0 24 24" fill="none" className={styles.verifiedSvg}>
              <path
                d="M12 2L14.6 4.6L18.2 4.3L19.4 7.7L22.6 9.4L22.1 13L24 16.1L21.4 18.7L21.1 22.3L17.7 22.1L15 24L12 22.5L9 24L6.3 22.1L2.9 22.3L2.6 18.7L0 16.1L1.9 13L1.4 9.4L4.6 7.7L5.8 4.3L9.4 4.6L12 2Z"
                fill="#d4af37"
              />
              <path
                d="M9.5 12.5L11 14L15.5 9.5"
                stroke="#121316"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* 4. Metadata Line */}
        <p className={styles.metadataLine}>
          Est. 2000 &middot; Colombo, LK &middot; he/him
        </p>

        {/* 5. Short Bio */}
        <p className={styles.bioText}>
          Dilshan Ramesh is an avid software designer, systems architect and content creator based in Sri Lanka.
        </p>

        {/* 6. Contact / Info Links */}
        <div className={styles.infoRow}>
          <a href="https://dilshan.dev" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
            <Globe size={13} className={styles.infoIcon} />
            <span>dilshan.dev</span>
          </a>
          <span className={styles.infoDot}>&middot;</span>
          <a href="tel:+94771234567" className={styles.infoLink}>
            <Phone size={13} className={styles.infoIcon} />
            <span>+94 77 123 4567</span>
          </a>
        </div>
      </div>

      {/* 7. Action Row (Share | Email Pill with Copy | Bell) */}
      <div className={styles.actionRow}>
        <button
          type="button"
          onClick={handleShare}
          className={styles.squareActionBtn}
          aria-label="Share Profile"
          title="Share Profile"
        >
          <Share2 size={16} />
        </button>

        <button
          type="button"
          onClick={handleCopyEmail}
          className={styles.emailPillBtn}
          title="Copy Email"
        >
          <span className={styles.emailText}>{displayEmail}</span>
          <span className={styles.copyIconWrapper}>
            {copied ? <Check size={14} className={styles.checkIcon} /> : <Copy size={14} />}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSubscribed(!subscribed)}
          className={`${styles.squareActionBtn} ${subscribed ? styles.squareActionBtnActive : ""}`}
          aria-label="Subscribe to updates"
          title="Notification updates"
        >
          <Bell size={16} />
        </button>
      </div>

      {/* 8. Story Highlights Row (Instagram Story style) */}
      <div className={styles.storiesContainer}>
        <div className={styles.storiesScroll}>
          {STORY_HIGHLIGHTS.map((story) => (
            <button
              key={story.id}
              type="button"
              onClick={() => setActiveStory(story)}
              className={styles.storyItem}
            >
              <div className={styles.storyCircle}>
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="64px"
                  className={styles.storyImage}
                />
              </div>
              <span className={styles.storyTitle}>{story.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 9. Social Pill Tags Row */}
      <div className={styles.socialPillsContainer}>
        <div className={styles.socialPillsScroll}>
          <a
            href="https://x.com/dilshanverse"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialPill}
          >
            <FaTwitter size={12} className={styles.socialPillIcon} />
            <span>@dilshanverse</span>
          </a>

          <a
            href="https://figma.com/@dilshan"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialPill}
          >
            <FaFigma size={12} className={styles.socialPillIconFigma} />
            <span>@dilshan</span>
          </a>

          <a
            href="https://github.com/dilshandevxx"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialPill}
          >
            <FaGithub size={12} className={styles.socialPillIcon} />
            <span>/dilshandevxx</span>
          </a>

          <a
            href="https://linkedin.com/in/heydilshan"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialPill}
          >
            <FaLinkedin size={12} className={styles.socialPillIconLinkedin} />
            <span>/dilshan</span>
          </a>
        </div>
      </div>

      {/* Story Modal Lightbox */}
      {activeStory && (
        <div className={styles.storyModalOverlay} onClick={() => setActiveStory(null)}>
          <div className={styles.storyModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>{activeStory.title}</span>
              <button
                type="button"
                onClick={() => setActiveStory(null)}
                className={styles.modalCloseBtn}
              >
                &times;
              </button>
            </div>
            <div className={styles.modalImageWrapper}>
              <Image
                src={activeStory.image}
                alt={activeStory.title}
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                className={styles.modalImage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
