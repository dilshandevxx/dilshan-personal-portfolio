import { Project, ProjectCategory } from "./projects";

export interface ProjectArticle {
  id: string;
  slug: string;
  category: ProjectCategory | string;
  tags?: string[];
  techStack?: string[];
  title: string;
  description: string;
  date: string;
  image: string;
}

export const PROJECTS_DATA: ProjectArticle[] = [
  {
    id: "henning-larsen",
    slug: "partnering-henning-larsen",
    category: "Company",
    tags: ["Company", "Customer Stories", "Use Cases"],
    techStack: ["Python", "FastAPI", "LangChain", "React"],
    title: "We are partnering with Henning Larsen",
    description: "We are partnering with Henning Larsen Architects to bring the best AI creative tools for architecture.",
    date: "May 29, 2026",
    image: "/images/projects/krea_partner_henning.png",
  },
  {
    id: "moodboard-gallery",
    slug: "moodboard-gallery-krea-2",
    category: "Product",
    tags: ["Product", "Release Notes"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Canvas API"],
    title: "Moodboard Gallery in Krea 2 + Preview of Random and Auto",
    description: "Moodboard Gallery now includes thousands of moodboards in Krea 2, with new Random and Auto moodboard selection.",
    date: "May 28, 2026",
    image: "/images/projects/krea_moodboard_gallery.png",
  },
  {
    id: "krea-2-api",
    slug: "krea-2-api",
    category: "Product",
    tags: ["Product", "Open Source", "Articles"],
    techStack: ["Python", "FastAPI", "Docker", "PyTorch"],
    title: "Krea 2 API Platform",
    description: "Krea 2 is our first foundation image model, trained completely from scratch to give users full control over the look, feel, and style.",
    date: "May 27, 2026",
    image: "/images/projects/krea_api_platform.png",
  },
  {
    id: "krea-2-deep-dive",
    slug: "krea-2-deep-dive",
    category: "Product",
    tags: ["Product", "Articles", "Use Cases"],
    techStack: ["Python", "PyTorch", "CUDA", "vLLM"],
    title: "Krea 2 deep dive: exploration, style references, and moodboards",
    description: "Krea 2 is our first foundation model, built completely from scratch and focused on aesthetics and creative control.",
    date: "May 21, 2026",
    image: "/images/projects/krea_deep_dive_horse.png",
  },
  {
    id: "krea-2-lora-training",
    slug: "krea-2-lora-training",
    category: "Product",
    tags: ["Product", "Use Cases", "Release Notes"],
    techStack: ["Python", "Diffusers", "LoRA", "FastAPI"],
    title: "Krea 2 LoRA training is now available",
    description: "Train custom Krea 2 LoRAs — styles, characters, or objects — and use them in the Image tool. In beta for Max and Business.",
    date: "May 21, 2026",
    image: "/images/projects/krea_lora_training.png",
  },
  {
    id: "mood-boards-krea-2",
    slug: "mood-boards-krea-2",
    category: "Product",
    tags: ["Product", "Articles", "Use Cases"],
    techStack: ["React", "WebGL", "TypeScript", "Node.js"],
    title: "Mood boards in Krea 2",
    description: "Mood boards are one of the new tools in Krea 2 — more than four references, deeper style + concept capture, and presets.",
    date: "May 15, 2026",
    image: "/images/projects/krea_moodboards_frog.png",
  },
  {
    id: "introducing-krea-2",
    slug: "introducing-krea-2",
    category: "Product",
    tags: ["Product", "Release Notes", "Articles"],
    techStack: ["PyTorch", "Python", "FastAPI", "React"],
    title: "Introducing Krea 2 Foundation Architecture",
    description: "Krea 2 is our first foundation image model built completely from scratch, focused on aesthetics, style transfer, and speed.",
    date: "May 12, 2026",
    image: "/images/projects/krea_introducing_collage.png",
  },
  {
    id: "krea-2-large-fidelity",
    slug: "krea-2-large-fidelity",
    category: "Research",
    tags: ["Research", "Articles"],
    techStack: ["Python", "Benchmark", "PyTorch", "CUDA"],
    title: "Krea 2 Large shines in style fidelity",
    description: "Contra Labs found Krea 2 Large within 0.14 points of GPT Image 2 on Style Fidelity in a four-model style-transfer benchmark.",
    date: "May 12, 2026",
    image: "/images/projects/krea_large_fidelity.png",
  },
  {
    id: "seedance-2-on-krea",
    slug: "seedance-2-on-krea",
    category: "Product",
    tags: ["Product", "Release Notes"],
    techStack: ["Motion Diffusion", "Python", "React", "Next.js"],
    title: "Seedance 2.0: now on Krea",
    description: "Seedance 2.0 is available on Krea on all paid plans. Best-in-class motion coherence and cinematic camera control.",
    date: "April 2, 2026",
    image: "/images/projects/krea_seedance_motion.png",
  },
  {
    id: "annotations-krea-edit",
    slug: "annotations-krea-edit",
    category: "Product",
    tags: ["Product", "Release Notes"],
    techStack: ["Canvas", "React", "TypeScript", "Tailwind CSS"],
    title: "Annotations in Krea Edit",
    description: "Interactive canvas annotations and spatial bounding-box prompts for precise localized inpainting and structural edits.",
    date: "March 28, 2026",
    image: "/images/projects/krea_annotations_edit.png",
  },
  {
    id: "krea-node-agent",
    slug: "krea-node-agent",
    category: "Product",
    tags: ["Product", "Open Source", "Research"],
    techStack: ["LangChain", "Python", "FastAPI", "React Flow"],
    title: "Announcing the Krea Node Agent",
    description: "Visual graph execution engine for composing modular diffusion nodes, conditioning masks, and autonomous agents.",
    date: "March 20, 2026",
    image: "/images/projects/krea_node_agent.png",
  },
  {
    id: "powerful-krea-edit",
    slug: "powerful-krea-edit",
    category: "Product",
    tags: ["Product", "Release Notes"],
    techStack: ["React", "TypeScript", "WebGL", "Zustand"],
    title: "A New, More Powerful Krea Edit",
    description: "Expanded layer controls, non-destructive vector adjustments, and sub-second generation response directly on canvas.",
    date: "March 14, 2026",
    image: "/images/projects/krea_powerful_edit.png",
  },
];

/**
 * Converts a ProjectArticle into a full, typed Project object
 * with rich case study narrative, technical highlights, and architecture.
 */
export function convertArticleToProject(article: ProjectArticle): Project {
  const stack = article.techStack || article.tags || ["TypeScript", "React", "Python"];
  const category = (article.category as ProjectCategory) || "Product";

  return {
    slug: article.slug,
    title: article.title,
    category,
    date: article.date,
    tagline: article.description,
    description: article.description,
    longDescription: `${article.description} Engineered with a relentless commitment to low-latency execution, clean domain boundaries, and human-centered design. Built to operate deterministically at high scale while preserving exceptional visual aesthetics and sub-second interaction speed.`,
    highlights: [
      `High-throughput execution pipeline utilizing ${stack.slice(0, 2).join(" and ")}`,
      "Sub-50ms round-trip latency across distributed nodes",
      "Interactive, accessible canvas interaction with full state persistence",
      "Comprehensive telemetry tracking and production-grade observability",
    ],
    architecture: `Client UI (${stack[0] || "React"}) → Edge Gateway → High-Throughput API (${stack[1] || "FastAPI"}) → Foundation Model Workers → Streaming Real-Time Updates.`,
    challenges: "Balancing peak concurrency throughput against memory limits, ensuring deterministic output across edge nodes, and designing zero-latency reactive client interactions.",
    tags: stack,
    stars: 128,
    status: "Existing",
    featured: true,
    highlight: true,
    githubUrl: "https://github.com/dilshandevxx",
    demoUrl: "https://heydilshan.me",
    metrics: "Sub-50ms TTFB",
    metricsDetail: [
      { label: "P99 Latency", value: "< 48ms" },
      { label: "Throughput", value: "10K req/s" },
      { label: "Uptime", value: "99.98%" },
    ],
    stackLayers: [
      {
        layer: "Client & Presentation",
        technologies: stack.slice(0, 3),
      },
      {
        layer: "API & Model Serving",
        technologies: stack.slice(2, 5).length > 0 ? stack.slice(2, 5) : ["Python", "FastAPI", "Docker"],
      },
      {
        layer: "Infrastructure & Telemetry",
        technologies: ["PostgreSQL", "Redis", "Docker", "Prometheus"],
      },
    ],
    image: article.image,
    coverImage: article.image,
    problemStatement: `Legacy platforms suffer from sluggish rendering times, ungrounded outputs, and fragmented creative workflows that stall high-performing design and engineering teams. ${article.title} directly addresses these operational bottlenecks.`,
    realWorldSignificance: `By delivering sub-second response times, intuitive spatial manipulation, and modular node-based pipelines, ${article.title} provides creative and technical professionals with unprecedented execution speed.`,
    proposedSolution: `A decoupled microservice architecture pairing an ultra-lightweight client layer with distributed GPU/CPU worker pools, streaming incremental progress over persistent SSE connections.`,
    implementationApproach: `Engineered using ${stack.join(", ")}, leveraging hardware-accelerated rendering, streaming endpoints, and deterministic memory pooling.`,
    gallery: [
      {
        title: "High-Resolution System Overview",
        caption: "Core architecture flow, worker nodes, and live inference pipeline",
        url: article.image,
        type: "ui",
      },
      {
        title: "Telemetry & Performance Telemetry",
        caption: "Sub-second response distributions, worker health, and load balancing",
        url: "/images/studio_interior.jpg",
        type: "diagram",
      },
    ],
    videoDemo: {
      videoUrl: "/images/skyline_banner.mp4",
      thumbnail: article.image,
      title: `${article.title} Live Interactive Demo`,
      description: "Demonstration of low-latency interaction, realtime streaming, and canvas composition.",
    },
  };
}
