import React from "react";
import Link from "next/link";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";

export default function NotFound() {
  return (
    <div style={{ backgroundColor: "#111111", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SkyLabsNavbar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8rem 1.5rem 5rem",
          textAlign: "center",
          maxWidth: "640px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.85rem",
            color: "#38bdf8",
            letterSpacing: "0.1em",
            marginBottom: "0.75rem",
          }}
        >
          404
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.025em",
            margin: "0 0 1rem 0",
          }}
        >
          Page not found
        </h1>
        <p
          style={{
            color: "#9da4ae",
            fontSize: "1rem",
            lineHeight: 1.65,
            margin: "0 0 2rem 0",
          }}
        >
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/"
            style={{
              backgroundColor: "#ff8bd2",
              color: "#000000",
              fontWeight: 700,
              fontSize: "0.9rem",
              padding: "0.7rem 1.75rem",
              textDecoration: "none",
            }}
          >
            Back to Home
          </Link>
          <Link
            href="/projects"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.9rem",
              padding: "0.7rem 1.75rem",
              textDecoration: "none",
            }}
          >
            Explore Works
          </Link>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}
