import AboutRoutePage, { metadata as aboutMetadata } from './about/page';

export const metadata = {
  ...aboutMetadata,
  title: 'Dilshan — Software Engineer & Open-Source Creator',
};

export default function PortfolioMainPage() {
  return <AboutRoutePage />;
}
