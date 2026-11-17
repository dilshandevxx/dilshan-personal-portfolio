import React from 'react';
import Link from 'next/link';
import { PortfolioSidebar } from '@/components/PortfolioSidebar';
import { AmbientPlayer } from '@/components/AmbientPlayer';
import { ArrowLeft } from 'lucide-react';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="portfolio-app-shell">
      {/* Authentic Left Panel (Exact Tania Rascia design matching user screenshot) */}
      <PortfolioSidebar />

      {/* Main Content Area */}
      <div className="portfolio-main-column">
        {/* Desktop Top Bar: Return to Main Site + Ambient Player */}
        <div className="portfolio-top-bar hidden lg:flex items-center justify-between w-full px-6 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[var(--pf-text-secondary, #9da4ae)] hover:text-[var(--pf-text-heading, #ffffff)] px-3 py-1.5 rounded border border-[var(--pf-border, rgba(255, 255, 255, 0.08))] hover:border-[var(--pf-border-strong, rgba(255, 255, 255, 0.2))] bg-[var(--pf-card-bg, #0f1116)] transition-all"
            title="Return to Main Landing Page"
          >
            <ArrowLeft size={13} />
            <span>Return to Main Site</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <AmbientPlayer variant="floating" />
          </div>
        </div>

        <main className="portfolio-content-area">
          {children}
        </main>
      </div>
    </div>
  );
}
