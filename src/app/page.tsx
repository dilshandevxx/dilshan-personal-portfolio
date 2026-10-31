import HeroSkyLabs from "@/components/cover/sections/HeroSkyLabs";
import AboutMe from "@/components/cover/sections/AboutMe";
import SelectedWork from "@/components/cover/sections/SelectedWork";
import SkillsGrid from "@/components/cover/sections/SkillsGrid";
import ContactSection from "@/components/cover/sections/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dilshan Ramesh | Full-Stack Engineer & System Architect",
  description:
    "Sri Lankan born full-stack engineer and system architect focusing on distributed systems, modern web experiences & scalable architectures.",
  openGraph: {
    title: "Dilshan Ramesh | Full-Stack Engineer & System Architect",
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
      <SkillsGrid />
      <ContactSection />
    </>
  );
}
