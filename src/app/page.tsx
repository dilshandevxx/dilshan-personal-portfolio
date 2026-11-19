import HeroSkyLabs from "@/components/cover/sections/HeroSkyLabs";
import AboutMe from "@/components/cover/sections/AboutMe";
import SelectedWork from "@/components/cover/sections/SelectedWork";
import CinematicQuote from "@/components/cover/sections/CinematicQuote";
import SkillsGrid from "@/components/cover/sections/SkillsGrid";
import InsightsSection from "@/components/cover/sections/InsightsSection";
import FaqSection from "@/components/cover/sections/FaqSection";
import ContactSection from "@/components/cover/sections/ContactSection";
import MainFooter from "@/components/MainFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dilshan | Full-Stack Engineer & System Architect",
  description:
    "Full-stack engineer and system architect focusing on distributed systems, modern web experiences & scalable architectures.",
  openGraph: {
    title: "Dilshan | Full-Stack Engineer & System Architect",
    description: "Distributed systems, modern web experiences & scalable architectures.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HeroSkyLabs />
      <AboutMe />
      <SelectedWork />
      <CinematicQuote />
      <SkillsGrid />
      <InsightsSection />
      <FaqSection />
      <ContactSection />
      <MainFooter />
    </>
  );
}
