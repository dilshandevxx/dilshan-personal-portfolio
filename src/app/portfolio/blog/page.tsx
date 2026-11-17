import React from 'react';
import { PortfolioBlogView } from '@/components/PortfolioBlogView';

export const metadata = {
  title: 'Blog — Dilshan',
  description: 'Articles, essays, and notes on distributed systems, applied AI, web architecture, and modern software craft.',
};

export default function BlogRoutePage() {
  return <PortfolioBlogView />;
}
