import React from 'react';
import Link from 'next/link';
import { PortfolioSidebar } from '@/components/PortfolioSidebar';
import { AmbientPlayer } from '@/components/AmbientPlayer';
import { AudioProvider } from '@/components/AudioContext';
import { ThemeProvider as ProductionThemeProvider } from '@/components/ThemeContext';
import { ArrowLeft } from 'lucide-react';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductionThemeProvider>
      <AudioProvider>
        <div className="portfolio-app-shell">
          {/* Authentic Production Left Panel (Sticky Desktop Sidebar & Mobile Drawer) */}
          <PortfolioSidebar />

          {/* Main Content Area */}
          <div className="portfolio-main-column">
            {/* Desktop Top Bar: Return to Main Site + Ambient Player */}
            <div className="portfolio-top-bar hidden lg:flex items-center justify-between w-full px-6 py-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-1.5 rounded border border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[var(--surface-card)] transition-all"
                title="Return to Main Landing Page"
              >
                <ArrowLeft size={13} />
                <span>Return to Main Site</span>
              </Link>
              <AmbientPlayer variant="floating" />
            </div>

            <main className="portfolio-content-area">
              {children}
            </main>
          </div>
        </div>
      </AudioProvider>
    </ProductionThemeProvider>
  );
}
