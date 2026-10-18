"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { GithubIcon, LinkedinIcon, XIcon, FacebookIcon } from "./SocialIcons";
import { Mail } from "lucide-react";

export function Footer() {
  const [year, setYear] = useState(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p style={{ fontWeight: 600, color: "var(--color-text-emphasized)", marginBottom: "0.25rem" }}>
            {siteConfig.name} &bull; {siteConfig.siteName} &copy; {year}
          </p>
          <p style={{ fontSize: "0.82rem" }}>
            Crafted with Next.js, React 19 & Vanilla CSS. Inspired by minimalist developer aesthetics.
          </p>
        </div>

        <div className="footer-social-links">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={siteConfig.social.x}
            target="_blank"
            rel="noopener noreferrer"
            title="X (Twitter)"
            aria-label="X (Twitter)"
          >
            <XIcon size={16} />
          </a>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            aria-label="Facebook"
          >
            <FacebookIcon size={18} />
          </a>
          <a
            href={`mailto:${siteConfig.social.email}`}
            title="Send Email"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
