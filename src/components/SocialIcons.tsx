import React from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function GithubIcon({ size = 18, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedinIcon({ size = 18, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function XIcon({ size = 18, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function DribbbleIcon({ size = 18, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
      <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
    </svg>
  );
}

export function BehanceIcon({ size = 18, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M8.228 15.01c.42 0 .77-.07 1.05-.21.28-.14.5-.34.66-.6.16-.26.24-.58.24-.96 0-.48-.13-.88-.39-1.2-.26-.32-.65-.53-1.17-.63.39-.1.69-.28.9-.54.21-.26.32-.6.32-1.02 0-.37-.08-.68-.24-.93a1.88 1.88 0 0 0-.66-.62c-.28-.15-.63-.23-1.05-.23H3.5v7.24h4.728zm-2.85-5.69h2.36c.4 0 .7.08.9.24.2.16.3.4.3.72 0 .34-.11.59-.33.75-.22.16-.54.24-.97.24H5.378V9.32zm0 4.15h2.53c.45 0 .8.09 1.05.27.25.18.37.45.37.81 0 .38-.13.67-.39.87-.26.2-.64.3-1.14.3H5.378v-2.25zM16.5 7.5h4v1.2h-4V7.5zm3.88 5.7c-.11-.47-.33-.87-.66-1.2-.33-.33-.74-.58-1.23-.75-.49-.17-1.04-.26-1.65-.26-.64 0-1.22.1-1.74.3-.52.2-.96.48-1.32.84-.36.36-.63.8-.81 1.32-.18.52-.27 1.1-.27 1.74 0 .66.09 1.25.27 1.77.18.52.45.96.81 1.32.36.36.8.64 1.32.84.52.2 1.1.3 1.74.3.82 0 1.52-.16 2.1-.48.58-.32 1.02-.78 1.32-1.38h-1.8c-.18.32-.44.57-.78.75-.34.18-.75.27-1.23.27-.58 0-1.06-.13-1.44-.39-.38-.26-.64-.67-.78-1.23h5.79c.02-.15.03-.3.03-.45 0-.61-.08-1.19-.24-1.65zm-4.32 1.05c.12-.42.33-.75.63-.99.3-.24.69-.36 1.17-.36.45 0 .82.11 1.11.33.29.22.48.54.57.96h-3.48v.06z" />
    </svg>
  );
}
