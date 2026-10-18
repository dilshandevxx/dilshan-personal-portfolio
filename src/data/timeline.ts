export interface TimelineEra {
  period: string;
  role: string;
  description: string;
  highlightUrl?: string;
  tags?: string[];
}

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
