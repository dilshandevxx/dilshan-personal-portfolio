import { Metadata } from 'next';
import { PortfolioProjectsView } from '@/components/PortfolioProjectsView';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: `Projects & Architecture — ${siteConfig.name}`,
  description: "Curated engineering systems and architecture blueprints across AI/ML, cloud infrastructure, distributed systems, and modern landing platforms.",
};

export default function PortfolioProjectsPage() {
  return <PortfolioProjectsView />;
}
