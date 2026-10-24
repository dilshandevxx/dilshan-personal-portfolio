import Header from "@/components/cover/Header";
import HeroLumen from "@/components/cover/sections/HeroLumen";
import SelectedWork from "@/components/cover/sections/SelectedWork";
import FAQ from "@/components/cover/sections/FAQ";
import Contact from "@/components/cover/sections/Contact";
import Footer from "@/components/cover/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dilshan | Visual Designer & Software Engineer",
  description:
    "Structuring the future through architectural digital experiences, brand identity systems, and intelligent suites.",
  openGraph: {
    title: "Dilshan | Digital Studio & Systems",
    description: "Structuring the future through architectural digital experiences.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="xudo-cover-wrapper">
      <Header />
      <main>
        <HeroLumen />
        <SelectedWork />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
