import { Metadata } from 'next';
import { PortfolioShelvesView } from '@/components/PortfolioShelvesView';

export const metadata: Metadata = {
  title: 'Shelves — Dilshan',
  description: 'Curated technical guides, architecture deep dives, reading list, and analog everyday rituals.',
};

export default function ShelvesPage() {
  return <PortfolioShelvesView />;
}
