import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import { AudioProvider } from "@/components/AudioContext";
import { AppShell } from "@/components/AppShell";
import { SmoothScrollProvider } from "@/components/SmoothScroll";
import { siteConfig } from "@/data/siteConfig";
import { Analytics } from "@vercel/analytics/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

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
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@700;800;900&family=Anton&family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('portfolio_theme') || 'dark';
                document.documentElement.setAttribute('data-portfolio-theme', theme);
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AudioProvider>
            <SmoothScrollProvider>
              <AppShell>{children}</AppShell>
            </SmoothScrollProvider>
          </AudioProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
