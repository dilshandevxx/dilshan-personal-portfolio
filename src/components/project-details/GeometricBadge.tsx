import React from "react";

export type GeometricBadgeType =
  | "design"
  | "code"
  | "strategy"
  | "qa"
  | "performance"
  | "security"
  | "database"
  | "network";

interface GeometricBadgeProps {
  type: GeometricBadgeType;
  className?: string;
  size?: number;
}

export function GeometricBadge({
  type,
  className = "",
  size = 52,
}: GeometricBadgeProps) {
  switch (type) {
    case "design":
      // Card 1: UI/UX Design (Blue rounded square top-right + Sky-blue circle bottom-left)
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Back rounded square */}
          <rect
            x="20"
            y="11"
            width="21"
            height="21"
            rx="5"
            fill="#2563EB"
          />
          {/* Front overlapping sky-blue circle */}
          <circle
            cx="18"
            cy="29"
            r="11"
            fill="#38BDF8"
          />
        </svg>
      );

    case "code":
      // Card 2: App Development (Orange/peach circle + Emerald green semicircle bowl)
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Top peach / coral circle */}
          <circle
            cx="26"
            cy="15"
            r="6.5"
            fill="#FB923C"
          />
          {/* Bottom emerald semicircle bowl */}
          <path
            d="M13 27C13 34.1797 18.8203 40 26 40C33.1797 40 39 34.1797 39 27H13Z"
            fill="#10B981"
          />
        </svg>
      );

    case "strategy":
      // Card 3: Market Strategy (Yellow dot top-left + Pink/magenta circle bottom-right)
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Small yellow dot */}
          <circle
            cx="17"
            cy="18"
            r="4.5"
            fill="#FACC15"
          />
          {/* Main coral/pink circle */}
          <circle
            cx="29"
            cy="30"
            r="10.5"
            fill="#F43F5E"
          />
        </svg>
      );

    case "qa":
      // Card 4: QA and Testing (Concentric purple ring + glowing cyan/blue core)
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Outer purple ring */}
          <circle
            cx="26"
            cy="26"
            r="13.5"
            stroke="#8B5CF6"
            strokeWidth="4"
          />
          {/* Inner vibrant cyan sphere */}
          <circle
            cx="26"
            cy="26"
            r="7"
            fill="#38BDF8"
          />
        </svg>
      );

    case "performance":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <path
            d="M28 11L15 28H25L23 41L36 24H26L28 11Z"
            fill="#F59E0B"
          />
        </svg>
      );

    case "security":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <path
            d="M26 11L39 17.5V27.5C39 35.2 33 41.2 26 43C19 41.2 13 35.2 13 27.5V17.5L26 11Z"
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
          />
          <circle cx="26" cy="27" r="5.5" fill="#34D399" />
        </svg>
      );

    case "database":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <ellipse cx="26" cy="17" rx="13" ry="5.5" fill="#06B6D4" />
          <path
            d="M13 17V26C13 29 18.8 31.5 26 31.5C33.2 31.5 39 29 39 26V17"
            stroke="#0891B2"
            strokeWidth="3"
          />
          <path
            d="M13 26V35C13 38 18.8 40.5 26 40.5C33.2 40.5 39 38 39 35V26"
            stroke="#0891B2"
            strokeWidth="3"
          />
        </svg>
      );

    case "network":
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <circle cx="17" cy="19" r="5.5" fill="#818CF8" />
          <circle cx="35" cy="19" r="5.5" fill="#C084FC" />
          <circle cx="26" cy="35" r="5.5" fill="#38BDF8" />
          <line
            x1="20"
            y1="22"
            x2="24"
            y2="31"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2.5"
          />
          <line
            x1="32"
            y1="22"
            x2="28"
            y2="31"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2.5"
          />
        </svg>
      );
  }
}
