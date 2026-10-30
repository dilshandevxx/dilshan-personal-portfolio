export interface Shelf {
  title: string;
  description: string;
  slug: string;
  topics: Array<{
    name: string;
    count: number;
    tag: string;
  }>;
}

export const shelvesData: Shelf[] = [
  {
    title: "Artificial Intelligence & Machine Learning",
    description: "Architectures, RAG retrieval pipelines, LLM fine-tuning, and model deployment.",
    slug: "ai-ml",
    topics: [
      { name: "Retrieval-Augmented Generation (RAG)", count: 4, tag: "#rag" },
      { name: "Model Serving & vLLM", count: 3, tag: "#vllm" },
      { name: "Vector Databases & Search", count: 5, tag: "#vector-search" },
      { name: "PyTorch & Deep Learning", count: 6, tag: "#ai-ml" },
    ],
  },
  {
    title: "Full-Stack Web Engineering",
    description: "Component patterns, Next.js App Router, typed APIs, and real-time systems.",
    slug: "full-stack",
    topics: [
      { name: "React 19 & Next.js", count: 8, tag: "#react" },
      { name: "TypeScript & Type Safety", count: 6, tag: "#typescript" },
      { name: "Data Visualization & ECharts", count: 3, tag: "#data-visualization" },
      { name: "Node.js & WebSockets", count: 5, tag: "#node" },
    ],
  },
  {
    title: "DevOps, Cloud & Infrastructure",
    description: "Kubernetes orchestration, automated GitOps pipelines, Docker, and Linux.",
    slug: "devops",
    topics: [
      { name: "Kubernetes & ArgoCD", count: 5, tag: "#kubernetes" },
      { name: "Containerization & Docker", count: 7, tag: "#docker" },
      { name: "Linux Server Hardening", count: 4, tag: "#linux" },
      { name: "CI/CD Automation", count: 6, tag: "#devops" },
    ],
  },
];
