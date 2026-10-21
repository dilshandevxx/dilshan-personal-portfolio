import React from 'react';
import { PortfolioSidebar } from '@/components/PortfolioSidebar';
import { AmbientPlayer } from '@/components/AmbientPlayer';
import { AudioProvider } from '@/components/AudioContext';
import { ThemeProvider as ProductionThemeProvider } from '@/components/ThemeContext';

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
            {/* Desktop Top Ambient Audio Pill */}
            <div className="portfolio-top-bar hidden lg:flex">
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
