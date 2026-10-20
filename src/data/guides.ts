export interface GuideLink {
  title: string;
  slug: string;
  iconName: string;
  tag: string;
}

export interface GuideSection {
  title: string;
  id: string;
  description: string;
  links: GuideLink[];
}

export const guidesData: GuideSection[] = [
  {
    title: "Deep Dives",
    id: "deep-dives",
    description:
      "Detailed architectural breakdowns of distributed platforms, real-time inference systems, authorization protocols, and full-stack performance.",
    links: [
      {
        title: "React 19 Application Architecture & Server Components",
        slug: "/blog",
        iconName: "code-2",
        tag: "React",
      },
      {
        title: "OAuth 2.1 with PKCE & Secure Client Authentication",
        slug: "/blog",
        iconName: "shield-check",
        tag: "Security",
      },
      {
        title: "High-Throughput LLM Serving with vLLM & PagedAttention",
        slug: "/blog",
        iconName: "cpu",
        tag: "AI/ML",
      },
      {
        title: "Retrieval-Augmented Generation (RAG) Production Playbook",
        slug: "/blog",
        iconName: "layers",
        tag: "AI/ML",
      },
      {
        title: "Vector Database Benchmarking: Milvus, Qdrant & pgvector",
        slug: "/blog",
        iconName: "database",
        tag: "Databases",
      },
      {
        title: "Event Loop, Microtasks, and High-Concurrency Node.js",
        slug: "/blog",
        iconName: "activity",
        tag: "Performance",
      },
      {
        title: "Data-Driven Form Systems with Zod & Type-Safe Schemas",
        slug: "/blog",
        iconName: "file-code",
        tag: "TypeScript",
      },
      {
        title: "Client-Side Cache Invalidation & Stale-While-Revalidate",
        slug: "/blog",
        iconName: "refresh-cw",
        tag: "Web",
      },
    ],
  },
  {
    title: "Reinventing the Wheel",
    id: "reinventing-the-wheel",
    description:
      "Taking complex systems apart to understand how they work from first principles. Custom emulators, inference engines, and developer tools.",
    links: [
      {
        title: "Building a Tensor Compute Graph from Scratch in C++",
        slug: "/blog",
        iconName: "binary",
        tag: "Core",
      },
      {
        title: "Writing a Custom Memory Allocator for High-Performance Caching",
        slug: "/blog",
        iconName: "hard-drive",
        tag: "Systems",
      },
      {
        title: "Building an AST-Based Code Transformer and Linter",
        slug: "/blog",
        iconName: "file-text",
        tag: "Tooling",
      },
      {
        title: "Building a Zero-Dependency Microservice Framework in TypeScript",
        slug: "/blog",
        iconName: "box",
        tag: "Backend",
      },
      {
        title: "Coding a Real-Time Collaborative Canvas with WebSockets & CRDTs",
        slug: "/blog",
        iconName: "network",
        tag: "Real-time",
      },
      {
        title: "Roll Your Own Distributed Task Queue with Redis & BullMQ",
        slug: "/blog",
        iconName: "list-ordered",
        tag: "Distributed",
      },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    id: "devops-infrastructure",
    description:
      "Hardened infrastructure playbooks, GitOps deployment automation, containerization strategies, and Linux kernel observability.",
    links: [
      {
        title: "Kubernetes Production Hardening & Multi-Cluster GitOps",
        slug: "/blog",
        iconName: "server",
        tag: "K8s",
      },
      {
        title: "Docker Multi-Stage Builds & Minimal Distroless Containers",
        slug: "/blog",
        iconName: "container",
        tag: "Docker",
      },
      {
        title: "Linux Kernel eBPF Observability & Network Performance Tuning",
        slug: "/blog",
        iconName: "terminal",
        tag: "Linux",
      },
      {
        title: "Automated CI/CD Pipelines with GitHub Actions & ArgoCD",
        slug: "/blog",
        iconName: "git-branch",
        tag: "CI/CD",
      },
      {
        title: "PostgreSQL High-Availability, Replication & Connection Pooling",
        slug: "/blog",
        iconName: "database",
        tag: "Databases",
      },
      {
        title: "Zero-Downtime Database Migrations in Distributed Systems",
        slug: "/blog",
        iconName: "arrow-up-right",
        tag: "DevOps",
      },
    ],
  },
  {
    title: "Off the Clock",
    id: "off-the-clock",
    description:
      "Occasionally I'll write about things that aren't strictly programming. Thoughts on productivity, engineering philosophy, and building in public.",
    links: [
      {
        title: "Cultivating an Open Digital Garden in Public",
        slug: "/blog",
        iconName: "compass",
        tag: "Garden",
      },
      {
        title: "Mechanical Keyboards, Ergonomics & Desk Setup for Engineers",
        slug: "/blog",
        iconName: "keyboard",
        tag: "Hardware",
      },
      {
        title: "Self-Hosting Your Homelab & Personal Cloud Infrastructure",
        slug: "/blog",
        iconName: "cpu",
        tag: "Homelab",
      },
      {
        title: "Engineering Retrospectives: What Production Outages Taught Me",
        slug: "/blog",
        iconName: "clock",
        tag: "Reflections",
      },
    ],
  },
];
