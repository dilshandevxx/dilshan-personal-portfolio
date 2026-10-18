export interface Project {
  slug: string;
  title: string;
  date: string;
  category: "AI/ML" | "Full-Stack" | "DevOps" | "Systems";
  tagline: string;
  description: string;
  tags: string[];
  highlight?: boolean;
  featured?: boolean;
  githubUrl: string;
  demoUrl?: string;
  writeupUrl?: string;
  metrics?: string;
}

export const projectsList: Project[] = [
  {
    slug: "nexus-agent-rag",
    title: "Nexus RAG & Multi-Agent Engine",
    date: "2025",
    category: "AI/ML",
    tagline: "Autonomous multi-agent research and reasoning engine powered by hybrid vector search.",
    description:
      "A production-ready RAG system orchestrating LLM agents with specialized tools, dynamic reranking, and low-latency vector retrieval across millions of documents.",
    tags: ["Python", "PyTorch", "FastAPI", "Qdrant", "LangGraph", "Docker"],
    highlight: true,
    featured: true,
    githubUrl: "https://github.com/dilshandevxx/nexus-agent-rag",
    demoUrl: "https://nexus-agent.dilshan.dev",
    metrics: "Sub-120ms retrieval latency across 500k chunks",
  },
  {
    slug: "cloudscale-gitops-pipeline",
    title: "CloudScale K8s GitOps Platform",
    date: "2024",
    category: "DevOps",
    tagline: "Automated container orchestration, blue-green deployments, and distributed telemetry.",
    description:
      "Production-grade Infrastructure-as-Code and Kubernetes GitOps repository utilizing ArgoCD, Terraform, Prometheus/Grafana monitoring, and automated Helm releases.",
    tags: ["Kubernetes", "Docker", "Terraform", "GitHub Actions", "Prometheus", "Helm"],
    highlight: true,
    featured: true,
    githubUrl: "https://github.com/dilshandevxx/cloudscale-gitops",
    demoUrl: "https://cloudscale.dilshan.dev",
    metrics: "99.98% uptime with automated zero-downtime rollouts",
  },
  {
    slug: "omni-commerce-platform",
    title: "OmniStore Distributed E-Commerce",
    date: "2024",
    category: "Full-Stack",
    tagline: "Event-driven microservices architecture with real-time inventory and Stripe billing.",
    description:
      "High-throughput modern commerce engine built with Next.js App Router, Node.js microservices, Apache Kafka event streaming, and PostgreSQL with Redis caching.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Kafka", "Redis"],
    highlight: true,
    featured: true,
    githubUrl: "https://github.com/dilshandevxx/omnistore-platform",
    demoUrl: "https://omnistore.dilshan.dev",
    metrics: "Handles 10k+ concurrent requests with sub-50ms cache response",
  },
  {
    slug: "vision-edge-infer",
    title: "VisionEdge Real-time Inference",
    date: "2024",
    category: "AI/ML",
    tagline: "Quantized computer vision pipeline for real-time edge object detection and tracking.",
    description:
      "Lightweight model pipeline utilizing YOLOv8 and TensorRT optimization deployed in containerized edge microservices with WebRTC streaming output.",
    tags: ["Python", "YOLOv8", "TensorRT", "OpenCV", "WebSockets", "Docker"],
    highlight: true,
    featured: false,
    githubUrl: "https://github.com/dilshandevxx/vision-edge-infer",
    metrics: "60 FPS inference on consumer hardware with 4x memory reduction",
  },
  {
    slug: "sentinel-infra-watch",
    title: "Sentinel Cluster Monitor",
    date: "2023",
    category: "DevOps",
    tagline: "Lightweight distributed cluster health check agent with Discord & Slack alerting.",
    description:
      "A Go-based daemon tracking memory, CPU, disk anomalies, and Docker container lifecycles across VPS nodes with zero-configuration peer discovery.",
    tags: ["Go", "Docker", "Linux", "REST APIs", "Prometheus"],
    highlight: false,
    featured: false,
    githubUrl: "https://github.com/dilshandevxx/sentinel-infra-watch",
  },
  {
    slug: "hyperflow-task-orchestrator",
    title: "HyperFlow Workflow Orchestrator",
    date: "2023",
    category: "Full-Stack",
    tagline: "Visual DAG-based task execution engine with distributed worker queues.",
    description:
      "Interactive drag-and-drop workflow builder designed for asynchronous batch data extraction, transformation, and automated notifications.",
    tags: ["React", "TypeScript", "FastAPI", "Celery", "Redis", "Tailwind"],
    highlight: false,
    featured: false,
    githubUrl: "https://github.com/dilshandevxx/hyperflow-orchestrator",
  },
];
