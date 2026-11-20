export interface TimelineEra {
  period: string;
  role: string;
  description: string;
  highlightUrl?: string;
  tags?: string[];
}

export interface JourneyMilestone {
  year: string;
  description: string;
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: "Year 2018",
    description:
      "Commenced formal Computer Science & Software Engineering degree, developing deep foundations in OS kernel design, distributed algorithms, and networking protocols.",
  },
  {
    year: "Year 2020",
    description:
      "Initiated production software development and open-source contributions, engineering resilient Linux utilities and high-concurrency microservices in Go.",
  },
  {
    year: "Year 2022",
    description:
      "Graduated with First Class Distinction. Transitioned to building enterprise-grade full-stack architectures, typed API boundaries, and event-driven data systems.",
  },
  {
    year: "Year 2023",
    description:
      "Architected cloud infrastructure and zero-downtime deployment pipelines with Kubernetes, Docker, and distributed caching layers for high-throughput workloads.",
  },
  {
    year: "Year 2024",
    description:
      "Scaled LLM inference runtimes with vLLM and PagedAttention, designed hybrid vector search pipelines, and built modern editorial UI design systems.",
  },
  {
    year: "Year 2025 — 2026",
    description:
      "Spearheading autonomous multi-agent orchestration, low-latency GPU acceleration, and resilient distributed intelligence platforms for real-time applications.",
  },
];

export const timelineEras: TimelineEra[] = [
  {
    period: "2024 — Present",
    role: "AI/ML & Full-Stack Systems Engineer",
    description:
      "Architecting end-to-end intelligent systems, fine-tuning open-weights models, implementing hybrid RAG retrieval pipelines, and scaling microservices on containerized Kubernetes clusters.",
    tags: ["LLMs", "PyTorch", "Next.js", "Kubernetes", "FastAPI"],
  },
  {
    period: "2022 — 2024",
    role: "Full-Stack Developer & Cloud Practitioner",
    description:
      "Engineered high-concurrency web applications, designed typed REST/GraphQL APIs, built automated CI/CD deployment workflows, and transitioned monolithic services to event-driven architectures.",
    tags: ["TypeScript", "React", "Node.js", "Docker", "PostgreSQL"],
  },
  {
    period: "2020 — 2022",
    role: "Computer Science & Systems Foundations",
    description:
      "Deep-dived into algorithms, operating systems, network protocols, Linux administration, and early machine learning foundations with hands-on open-source development.",
    tags: ["Python", "Linux", "Data Structures", "Git"],
  },
];
