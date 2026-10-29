import HeroSkyLabs from "@/components/cover/sections/HeroSkyLabs";
import Footer from "@/components/cover/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dilshan Seneviratne | Software Engineer & Systems Architect",
  description:
    "Crafting digital landscapes. Driven by data & design. Structuring the future through architectural digital experiences.",
  openGraph: {
    title: "Dilshan Seneviratne | Sky Labs",
    description: "Crafting digital landscapes. Driven by data & design.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="xudo-cover-wrapper">
      <main>
        <HeroSkyLabs />
      </main>
      <Footer />
    </div>
  );
}
