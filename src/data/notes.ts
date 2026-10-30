export interface PostItem {
  slug: string;
  title: string;
  date: string;
  year: number;
  icon: string;
  tags: string[];
  description: string;
  content: string;
}

export type Note = PostItem;


export const postsData: PostItem[] = [
  // 2025
  {
    slug: "enabling-apache-echarts-in-react",
    title: "Enabling Apache ECharts in React for Data Visualization",
    date: "March 31",
    year: 2025,
    icon: "🪶",
    tags: ["#javascript", "#react", "#data-visualization"],
    description: "A comprehensive guide on integrating and optimizing high-performance ECharts canvases within React 19 applications.",
    content: "Apache ECharts is one of the most powerful charting libraries for displaying high-density visual telemetry. This guide walks through setting up custom canvas instances, managing responsive resize observers, and ensuring smooth 60fps renders with React component wrappers.",
  },
  {
    slug: "production-rag-architectures-and-reranking",
    title: "Production RAG Architectures: Hybrid Retrieval and Cross-Encoder Reranking",
    date: "March 15",
    year: 2025,
    icon: "🤖",
    tags: ["#ai-ml", "#rag", "#python", "#vector-search"],
    description: "Moving beyond naive vector cosine similarity by combining dense embeddings with BM25 keyword matching and cross-encoder rerankers.",
    content: "When deploying Retrieval-Augmented Generation at scale, hybrid search using Reciprocal Rank Fusion (RRF) and second-stage cross-encoders drastically reduces hallucinations and improves recall across domain-specific queries.",
  },
  {
    slug: "year-in-review-2024",
    title: "Year in Review: 2024",
    date: "January 04",
    year: 2025,
    icon: "💾",
    tags: ["#meta", "#year-in-review"],
    description: "Reflections on shipping machine learning systems, deep diving into Kubernetes GitOps, and building open-source developer tooling.",
    content: "A look back at 2024: migrating infrastructure to declarative GitOps with ArgoCD, experimenting with open-source LLMs, and publishing notes across modern full-stack development.",
  },

  // 2024
  {
    slug: "zero-downtime-kubernetes-gitops",
    title: "Zero-Downtime Deployments with Kubernetes and ArgoCD GitOps",
    date: "November 18",
    year: 2024,
    icon: "☸️",
    tags: ["#devops", "#kubernetes", "#docker"],
    description: "Implementing automated blue-green and canary releases with robust readiness probes and pre-stop lifecycle hooks.",
    content: "Achieving true zero-downtime in microservices requires treating Git as the single source of truth. We look at rolling update configurations, health check policies, and ingress routing.",
  },
  {
    slug: "react-19-server-components-mental-model",
    title: "The Next.js App Router & React 19 Server Components Mental Model",
    date: "September 22",
    year: 2024,
    icon: "⚛️",
    tags: ["#react", "#nextjs", "#javascript"],
    description: "How React Server Components, Suspense boundaries, and Client Component leaves coordinate to eliminate client bundle size.",
    content: "Server Components represent a fundamental shift in web architecture. Here is how to think about data fetching at the component level without sending unnecessary JavaScript to the browser.",
  },
  {
    slug: "quantizing-open-weights-llms-with-vllm",
    title: "Serving Quantized LLMs in Production with vLLM & PagedAttention",
    date: "June 14",
    year: 2024,
    icon: "⚡",
    tags: ["#ai-ml", "#python", "#vllm"],
    description: "Maximizing GPU memory throughput and slashing inference latency using AWQ quantization and continuous batching.",
    content: "PagedAttention revolutionized transformer memory management. In this note, we benchmark AWQ vs GPTQ models and build a lightweight API endpoint using FastAPI and vLLM.",
  },
  {
    slug: "building-realtime-collaborative-apps-with-websockets",
    title: "Building Real-Time Multi-User Apps with WebSockets & Redis Pub/Sub",
    date: "February 28",
    year: 2024,
    icon: "🌐",
    tags: ["#full-stack", "#node", "#redis"],
    description: "Scaling bi-directional WebSocket connections horizontally across distributed Node.js clusters using Redis adapters.",
    content: "Handling thousands of concurrent stateful WebSocket connections requires an event distribution backbone. Here is how we implement room broadcasting, heartbeats, and graceful reconnections.",
  },

  // 2023
  {
    slug: "setting-up-a-hardened-linux-vps",
    title: "Setting Up and Hardening a Linux VPS for Production",
    date: "October 11",
    year: 2023,
    icon: "🐧",
    tags: ["#linux", "#devops", "#security"],
    description: "Essential security checklist: SSH keys, UFW firewalls, fail2ban, automatic updates, and non-root user privileges.",
    content: "Before deploying Docker containers to a remote server, baseline OS hardening is vital. We walk through securing Ubuntu/Debian instances step-by-step.",
  },
  {
    slug: "complete-guide-to-full-stack-typescript",
    title: "A Complete Guide to End-to-End Type Safety in TypeScript",
    date: "May 19",
    year: 2023,
    icon: "📦",
    tags: ["#typescript", "#full-stack"],
    description: "Sharing types between frontend and backend with Zod validation, Prisma schemas, and typed API clients.",
    content: "Eliminating runtime data mismatches by enforcing contract validation at the boundaries of your application.",
  },
];

export const notesList = postsData;

