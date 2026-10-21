import ShelvesPage, { metadata as shelvesMetadata } from '../shelves/page';

export const metadata = {
  ...shelvesMetadata,
};

export default function LifePage() {
  return <ShelvesPage />;
}
