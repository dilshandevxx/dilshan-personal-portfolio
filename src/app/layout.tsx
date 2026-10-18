import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import { AppShell } from "@/components/AppShell";
import { siteConfig } from "@/data/siteConfig";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-artistic",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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
      className={`${outfit.variable} ${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable} ${newsreader.variable}`}
    >
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
