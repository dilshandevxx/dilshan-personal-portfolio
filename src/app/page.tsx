import HeroSkyLabs from "@/components/cover/sections/HeroSkyLabs";
import AboutMe from "@/components/cover/sections/AboutMe";
import SelectedWork from "@/components/cover/sections/SelectedWork";
import SkillsGrid from "@/components/cover/sections/SkillsGrid";
import PreFooter from "@/components/cover/sections/PreFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dilshan Seneviratne | Sky Labs — Digital Landscapes",
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
    <>
      <HeroSkyLabs hideHeader={true} />
      <AboutMe />
      <SelectedWork />
      <SkillsGrid />
      <PreFooter />
    </>
  );
}
