import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Dilshan K. — Software Engineer & Systems Thinker",
  description:
    "An editorial personal website and engineering portfolio exploring distributed systems, local-first software, and mindful interface design.",
  keywords: [
    "Dilshan",
    "Software Engineer",
    "Distributed Systems",
    "Full-Stack",
    "TypeScript",
    "Go",
    "Rust",
    "Next.js",
    "Editorial Design",
  ],
  authors: [{ name: "Dilshan K." }],
  creator: "Dilshan K.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dilshan.dev",
    siteName: "Dilshan K. — Editorial Portfolio",
    title: "Dilshan K. — Software Engineer & Systems Thinker",
    description:
      "An editorial personal website combining a digital-book landing page with a thoughtful software engineering portfolio.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dilshan K. — Software Engineer & Systems Thinker",
    description:
      "Editorial personal website combining a digital book landing page with an engineering portfolio.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#151816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="dark-moss"
      data-accent="sage"
      className="h-full"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        {/* Anti-flash inline script to restore persisted theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('editorial-theme')||'dark-moss';var a=localStorage.getItem('editorial-accent')||'sage';document.documentElement.setAttribute('data-theme',t);document.documentElement.setAttribute('data-accent',a);}catch(e){document.documentElement.setAttribute('data-theme','dark-moss');document.documentElement.setAttribute('data-accent','sage');}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased selection:bg-[var(--accent-subtle)] selection:text-[var(--accent-color)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
