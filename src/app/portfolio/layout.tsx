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
        <main className="portfolio-content-area">
          {children}
        </main>
      </div>
    </div>
  );
}
