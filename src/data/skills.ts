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
    category: "Full-Stack Development",
    description: "Modern component architectures, typed APIs, and high-performance interfaces.",
    skills: [
      { name: "TypeScript", level: "Advanced", highlight: true },
      { name: "React 19 / Next.js", level: "Advanced", highlight: true },
      { name: "Node.js", level: "Advanced", highlight: true },
      { name: "Python", level: "Advanced", highlight: true },
      { name: "Tailwind / Vanilla CSS", level: "Proficient" },
      { name: "FastAPI / Express", level: "Advanced", highlight: true },
      { name: "REST & GraphQL", level: "Proficient" },
      { name: "WebSockets", level: "Proficient" },
    ],
  },
  {
    category: "AI / Machine Learning",
    description: "Deep learning models, RAG architectures, and scalable inference pipelines.",
    skills: [
      { name: "PyTorch", level: "Advanced", highlight: true },
      { name: "Hugging Face", level: "Advanced", highlight: true },
      { name: "LLMs & Prompt Engineering", level: "Advanced", highlight: true },
      { name: "LangChain / LlamaIndex", level: "Proficient", highlight: true },
      { name: "Vector Databases (Pinecone/Qdrant)", level: "Advanced" },
      { name: "RAG & Semantic Search", level: "Advanced", highlight: true },
      { name: "Scikit-Learn / Pandas", level: "Proficient" },
      { name: "Model Quantization & vLLM", level: "Specialized" },
    ],
  },
  {
    category: "DevOps & Cloud Engineering",
    description: "Containerization, automated CI/CD, and reproducible cloud infrastructure.",
    skills: [
      { name: "Docker", level: "Advanced", highlight: true },
      { name: "Kubernetes", level: "Proficient", highlight: true },
      { name: "GitHub Actions / CI/CD", level: "Advanced", highlight: true },
      { name: "AWS / Cloudflare", level: "Proficient" },
      { name: "Linux / Shell Scripting", level: "Advanced" },
      { name: "Nginx / Reverse Proxies", level: "Proficient" },
      { name: "Prometheus & Grafana", level: "Proficient" },
      { name: "Terraform", level: "Specialized" },
    ],
  },
  {
    category: "Data & Systems Architecture",
    description: "Relational, document, and in-memory caches engineered for scale.",
    skills: [
      { name: "PostgreSQL", level: "Advanced", highlight: true },
      { name: "MongoDB", level: "Proficient" },
      { name: "Redis", level: "Advanced", highlight: true },
      { name: "Prisma / Drizzle ORM", level: "Advanced" },
      { name: "Kafka / RabbitMQ", level: "Proficient" },
      { name: "System Design & Microservices", level: "Advanced", highlight: true },
    ],
  },
];
