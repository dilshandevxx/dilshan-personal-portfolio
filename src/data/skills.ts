export interface SkillCategory {
  category: string;
  description: string;
  skills: Array<{
    name: string;
    level: "Advanced" | "Proficient" | "Specialized";
    highlight?: boolean;
  }>;
}

export const skillCategories: SkillCategory[] = [
  {
    category: "AI & Machine Learning Engineering",
    description: "Deep learning models, RAG architectures, and scalable inference pipelines.",
    skills: [
      { name: "PyTorch", level: "Advanced", highlight: true },
      { name: "LLMs & Prompt Engineering", level: "Advanced", highlight: true },
      { name: "RAG & Semantic Search", level: "Advanced", highlight: true },
      { name: "Hugging Face", level: "Advanced", highlight: true },
      { name: "Vector DBs (Pinecone/Qdrant)", level: "Advanced", highlight: true },
      { name: "Model Quantization & vLLM", level: "Specialized", highlight: true },
      { name: "LangChain / LlamaIndex", level: "Proficient" },
      { name: "Scikit-Learn / Pandas", level: "Proficient" },
    ],
  },
  {
    category: "Full-Stack Web Development",
    description: "Modern component architectures, typed APIs, and high-performance interfaces.",
    skills: [
      { name: "TypeScript", level: "Advanced", highlight: true },
      { name: "React 19 / Next.js", level: "Advanced", highlight: true },
      { name: "FastAPI / Python", level: "Advanced", highlight: true },
      { name: "Node.js / Express", level: "Advanced", highlight: true },
      { name: "REST & GraphQL APIs", level: "Proficient", highlight: true },
      { name: "Tailwind / CSS Tokens", level: "Proficient" },
      { name: "WebSockets & Streaming", level: "Proficient" },
      { name: "State Management", level: "Advanced" },
    ],
  },
  {
    category: "DevOps & Cloud Infrastructure",
    description: "Containerization, automated CI/CD, and reproducible cloud infrastructure.",
    skills: [
      { name: "Docker", level: "Advanced", highlight: true },
      { name: "Kubernetes (K8s)", level: "Proficient", highlight: true },
      { name: "GitHub Actions / CI/CD", level: "Advanced", highlight: true },
      { name: "Linux / Shell Automation", level: "Advanced", highlight: true },
      { name: "AWS & Cloudflare", level: "Proficient" },
      { name: "Nginx / Reverse Proxies", level: "Proficient" },
      { name: "Prometheus & Grafana", level: "Proficient" },
      { name: "Terraform / GitOps", level: "Specialized" },
    ],
  },
  {
    category: "Data & Systems Architecture",
    description: "Relational, document, and in-memory caches engineered for scale.",
    skills: [
      { name: "PostgreSQL", level: "Advanced", highlight: true },
      { name: "Redis Caching & PubSub", level: "Advanced", highlight: true },
      { name: "Kafka Event Queues", level: "Proficient", highlight: true },
      { name: "Prisma & Drizzle ORM", level: "Advanced" },
      { name: "MongoDB", level: "Proficient" },
      { name: "Microservices Design", level: "Advanced", highlight: true },
    ],
  },
];
