import HeroRobin from "@/components/cover/sections/HeroRobin";
import Footer from "@/components/cover/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dilshan Seneviratne | Software Engineer & Systems Architect",
  description:
    "Software engineer crafting resilient distributed systems, high-performance web experiences, and thoughtful digital tools.",
  openGraph: {
    title: "Dilshan Seneviratne | Portfolio",
    description: "Software engineer crafting resilient distributed systems and thoughtful digital experiences.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="xudo-cover-wrapper">
      <main>
        <HeroRobin />
      </main>
      <Footer />
    </div>
  );
}
