export interface Project {
  id: string | number;
  slug: string;
  title: string;
  category: string;
  image: string;
  client: string;
  year: string;
  role: string;
  description: string;
  challenge: string;
  solution: string;
  gallery: string[];
  liveUrl: string;
}

export const PROJECTS: Project[] = [
  { 
    id: 1, 
    slug: "secti-ante",
    title: "Secti Ante", 
    category: "BRANDING", 
    image: "/images/box_parachute.png",
    client: "Secti Global Holdings",
    year: "2025",
    role: "Brand Identity, Typography, Web Design",
    description: "Secti Ante approached us to completely overhaul their digital brand identity. We utilized deep obsidian aesthetics to position them as a dominant market leader.",
    challenge: "The client was suffering from an outdated, fragmented brand system that alienated high-end enterprise clients.",
    solution: "We streamlined their branding around an ultra-minimalist, monolithic design system emphasizing brutalist typography and dynamic micro-animations.",
    gallery: ["/images/music_festival.png", "/images/science_tech.png"],
    liveUrl: "https://xudolabs.com/secti"
  },
  { 
    id: 2, 
    slug: "phase-blend",
    title: "Phase Blend", 
    category: "PACKAGING", 
    image: "/images/phone_interaction.png",
    client: "Phase Audio Inc.",
    year: "2024",
    role: "Packaging Design, Art Direction",
    description: "Phase Blend needed packaging that screamed luxury audio. We created a physical and digital unboxing experience that resonated deeply with audiophiles.",
    challenge: "Creating packaging that feels acoustically sound and visually striking on shelf.",
    solution: "Implemented premium matte black textures with selective high-gloss UV patterns mapping sound frequencies.",
    gallery: ["/images/ecommerce_card.png", "/images/box_parachute.png"],
    liveUrl: "https://xudolabs.com/phase"
  },
  { 
    id: 3, 
    slug: "precevel",
    title: "Precevel", 
    category: "WEB DESIGN", 
    image: "/images/science_tech.png",
    client: "Precevel Dynamics",
    year: "2025",
    role: "Full-Stack Development, UI/UX",
    description: "A complete platform rebuild for an innovative SaaS company operating in the continuous integration space.",
    challenge: "Parsing massive amounts of data into a highly legible, dark-themed dashboard without causing visual fatigue.",
    solution: "A bespoke Next.js architecture featuring custom generic component libraries and incredibly fast state management.",
    gallery: ["/images/biometric_scan.png", "/images/music_festival.png"],
    liveUrl: "https://xudolabs.com/precevel"
  },
  { 
    id: 4, 
    slug: "eu-fance",
    title: "Eu Fance", 
    category: "AI BASED PROJECT", 
    image: "/images/biometric_scan.png",
    client: "Eu Fance Maison",
    year: "2024",
    role: "Mobile App Design, Prototyping",
    description: "We designed a revolutionary bespoke fashion shopping application that allows users to construct outfits using AR models.",
    challenge: "Bridging the gap between 3D rendered garments and flat mobile interfaces seamlessly.",
    solution: "Implemented a fully fluid physics-based gesture system inside a very rigorous layout structure.",
    gallery: ["/images/science_tech.png", "/images/ecommerce_card.png"],
    liveUrl: "https://xudolabs.com/eufance"
  },
  { 
    id: 5, 
    slug: "red-hemp",
    title: "Red Hemp", 
    category: "E-COMMERCE", 
    image: "/images/ecommerce_card.png",
    client: "Red Hemp CBD",
    year: "2026",
    role: "Shopify Headless, E-Commerce Strategy",
    description: "An incredibly fast headless e-commerce store built to subvert traditional CBD marketing.",
    challenge: "Compliance restrictions required highly creative storytelling bypassing direct product claims.",
    solution: "Aggressive aesthetic storytelling relying on high-fashion editorials rather than standard product photography.",
    gallery: ["/images/box_parachute.png", "/images/phone_interaction.png"],
    liveUrl: "https://xudolabs.com/redhemp"
  },
  { 
    id: 6, 
    slug: "malam",
    title: "Malam", 
    category: "AI BASED PROJECT", 
    image: "/images/music_festival.png",
    client: "Malam Records",
    year: "2023",
    role: "3D Illustration, Motion Design",
    description: "We concepted and rendered the visual identity for Malam Records' flagship electronic music festival.",
    challenge: "Generating visual assets that adapt dynamically across web, print, and massive stage screens.",
    solution: "Created an immersive, procedural 3D world in Cinema4D that could be rendered natively across any medium.",
    gallery: ["/images/biometric_scan.png", "/images/phone_interaction.png"],
    liveUrl: "https://xudolabs.com/malam"
  },
];
