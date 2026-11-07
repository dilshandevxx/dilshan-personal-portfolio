import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import { AudioProvider } from "@/components/AudioContext";
import { AppShell } from "@/components/AppShell";
import { siteConfig } from "@/data/siteConfig";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.siteName}`,
  description: siteConfig.sidebarBio,
  keywords: [
    "Dilshan",
    "Full-Stack Developer",
    "AI/ML Engineer",
    "DevOps",
    "Machine Learning",
    "Next.js",
    "Python",
    "PyTorch",
    "Kubernetes",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.social.github }],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.siteName}`,
    description: siteConfig.sidebarBio,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.siteName}`,
    description: siteConfig.sidebarBio,
    creator: "@dilshanverse",
  },
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
      data-scroll-behavior="smooth"
      className="font-sans"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('portfolio_theme');
                if (t && ['light', 'dark', 'midnight', 'forest', 'nord'].indexOf(t) !== -1) {
                  document.documentElement.setAttribute('data-theme', t);
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AudioProvider>
            <AppShell>{children}</AppShell>
          </AudioProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
