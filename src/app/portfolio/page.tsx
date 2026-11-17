import { Metadata } from 'next';
import { PortfolioProjectsView } from '@/components/PortfolioProjectsView';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: `Portfolio & Engineering Architecture — ${siteConfig.name}`,
  description: siteConfig.sidebarBio,
};

export default function PortfolioMainPage() {
  return <PortfolioProjectsView />;
}
