import React from 'react';
import { PortfolioSidebar } from '@/components/PortfolioSidebar';
import { PortfolioMobileHeader } from '@/components/PortfolioMobileHeader';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col lg:flex-row">
      {/* Mobile Top Header (compact + drawer, hidden on desktop) */}
      <PortfolioMobileHeader />

      {/* Persistent Left Sidebar on Desktop (hidden on mobile/tablet) */}
      <PortfolioSidebar className="hidden lg:flex" />

      {/* Main Content Area: scrolls naturally on desktop and mobile */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <main className="flex-1 w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-8 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
