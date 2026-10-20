import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AmbientPlayer } from "@/components/AmbientPlayer";
import { ColorPicker } from "@/components/ColorPicker";

export default function MinimalLandingPage() {
  return (
    <div className="minimal-landing-root">
      {/* Refined Minimalist Navbar matching Rick Öberg reference */}
      <header className="minimal-nav-header">
        <div className="minimal-nav-container">
          <Link href="/" className="minimal-brand-title" title="Dilshan — Home">
            <span className="brand-name">Dilshan</span>
            <span className="brand-dot" aria-hidden="true">.</span>
          </Link>

          <div className="minimal-nav-right">
            <nav className="minimal-nav-links" aria-label="Main Navigation">
              <Link href="/projects" className="minimal-nav-link active-item">
                PROJECTS
              </Link>
              <Link href="/blog" className="minimal-nav-link">
                WRITING
              </Link>
              <Link href="/about" className="minimal-nav-link">
                BIO
              </Link>
              <a
                href={`mailto:${siteConfig.social.email}?subject=Project%20or%20Role%20Inquiry`}
                className="minimal-nav-link hire-item"
              >
                HIRE ME
              </a>
            </nav>

            <span className="minimal-nav-divider" aria-hidden="true" />

            {/* Sleek Floating Capsule for Theme, Palette & Audio */}
            <div className="minimal-toolbar-capsule" title="Appearance & Ambient Audio">
              <AmbientPlayer variant="header" />
              <ColorPicker />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Hero Viewport with Bold Centered Statement matching Rick Öberg reference */}
      <main className="minimal-hero-viewport">
        <div className="minimal-hero-content">
          <h1 className="minimal-statement">
            I&apos;m Dilshan, a software engineer. I love to create intelligent systems and scalable experiences for the web.
          </h1>
        </div>
      </main>
    </div>
  );
}
