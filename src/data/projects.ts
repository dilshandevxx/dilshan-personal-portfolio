export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectStackLayer {
  layer: string;
  technologies: string[];
}

export interface Project {
  slug: string;
  title: string;
  date: string;
  category: "AI/ML" | "Full-Stack" | "DevOps" | "Systems";
  tagline: string;
  description: string;
  longDescription: string;
  highlights: string[];
  architecture: string;
  challenges: string;
  tags: string[];
  stars: number;
  highlight?: boolean;
  featured?: boolean;
  githubUrl: string;
  demoUrl?: string;
  writeupUrl?: string;
  metrics?: string;
  metricsDetail: ProjectMetric[];
  stackLayers: ProjectStackLayer[];
}

export const projectsList: Project[] = [
  {
    slug: "nexus-agent-rag",
    title: "Nexus RAG & Multi-Agent Engine",
    date: "2025",
    category: "AI/ML",
    stars: 2135,
    tagline: "Autonomous multi-agent research and reasoning engine powered by hybrid vector search.",
    description:
      "A production-ready RAG system orchestrating LLM agents with specialized tools, dynamic reranking, and low-latency vector retrieval across millions of documents.",
    longDescription:
      "Nexus is an enterprise-grade Retrieval-Augmented Generation (RAG) and autonomous multi-agent reasoning engine built to overcome hallucination and context-window degradation in massive knowledge bases. It features a dual-phase retrieval pipeline combining dense vector embeddings with sparse BM25 keyword matching, followed by cross-encoder re-ranking to yield highly relevant context for LLM agents.",
    highlights: [
      "Hybrid dense-sparse retrieval combining Qdrant cosine similarity with BM25 keyword search",
      "Cross-encoder reranking step cutting context noise and eliminating token window waste",
      "LangGraph autonomous multi-agent cyclic execution with tool-calling sandbox",
      "Streaming response protocol via FastAPI WebSockets for instantaneous token delivery",
      "Sub-120ms p95 retrieval latency across 500k ingested technical documentation chunks",
    ],
    architecture:
      "The ingest service consumes raw PDF/Markdown documents, recursively splits tokens with semantic overlap, computes embeddings using Hugging Face sentence transformers, and indexes vectors into Qdrant. When queries arrive, an orchestrator agent decomposes user intent, performs parallel hybrid searches, reranks candidates, and delegates tasks to specialized sub-agents via LangGraph before synthesizing citations.",
    challenges:
      "Balancing high retrieval precision against inference latency. Solved by decoupling embedding generation into an asynchronous queue and caching vector lookups in Redis for high-frequency queries.",
    tags: ["Python", "PyTorch", "FastAPI", "Qdrant", "LangGraph", "Docker"],
    highlight: true,
    featured: true,
    githubUrl: "https://github.com/dilshandevxx/nexus-agent-rag",
    demoUrl: "https://nexus-agent.dilshan.dev",
    metrics: "Sub-120ms retrieval latency across 500k chunks",
    metricsDetail: [
      { label: "P95 Retrieval Latency", value: "118ms" },
      { label: "Knowledge Base Size", value: "500k Chunks" },
      { label: "Re-rank Precision Gain", value: "+34%" },
      { label: "Agent Task Success Rate", value: "94.2%" },
    ],
    stackLayers: [
      { layer: "AI & Vector Search", technologies: ["PyTorch", "Hugging Face", "Qdrant", "LangGraph"] },
      { layer: "Backend & API", technologies: ["Python", "FastAPI", "WebSockets", "Pydantic"] },
      { layer: "Infrastructure", technologies: ["Docker", "Redis", "Nginx", "GitHub Actions"] },
    ],
  },
  {
    slug: "cloudscale-gitops-pipeline",
    title: "CloudScale K8s GitOps Platform",
    date: "2024",
    category: "DevOps",
    stars: 890,
    tagline: "Automated container orchestration, blue-green deployments, and distributed telemetry.",
    description:
      "Production-grade Infrastructure-as-Code and Kubernetes GitOps repository utilizing ArgoCD, Terraform, Prometheus/Grafana monitoring, and automated Helm releases.",
    longDescription:
      "CloudScale is an end-to-end Infrastructure-as-Code and Kubernetes GitOps deployment blueprint designed for zero-downtime microservice operations. It implements automated blue-green and canary release strategies managed by ArgoCD, infrastructure provisioning using Terraform, and comprehensive cluster observability using Prometheus, Grafana, and Alertmanager.",
    highlights: [
      "Declarative GitOps architecture synchronized continuously with ArgoCD",
      "Automated blue-green deployments with zero dropped TCP connections",
      "Multi-stage Terraform modules for reproducible VPC, subnet, and cluster provisioning",
      "Comprehensive Prometheus telemetry and customized Grafana dashboards for latency and resource saturation",
      "Sealed Secrets integration for encrypted Git repository credentials",
    ],
    architecture:
      "Developers push code to GitHub, triggering CI pipelines that run automated linting, unit tests, container vulnerability scans (Trivy), and Docker image builds pushed to container registries. ArgoCD watches Git repository manifests and reconciles cluster state, orchestrating automated progressive delivery.",
    challenges:
      "Ensuring zero downtime during database migrations and ingress routing cutovers. Solved by implementing Kubernetes pre-stop lifecycle hooks, readiness probe grace periods, and backward-compatible schema migration gates.",
    tags: ["Kubernetes", "Docker", "Terraform", "GitHub Actions", "Prometheus", "Helm"],
    highlight: true,
    featured: true,
    githubUrl: "https://github.com/dilshandevxx/cloudscale-gitops",
    demoUrl: "https://cloudscale.dilshan.dev",
    metrics: "99.98% uptime with automated zero-downtime rollouts",
    metricsDetail: [
      { label: "Cluster Uptime", value: "99.98%" },
      { label: "Deployment Frequency", value: "12+ / day" },
      { label: "Mean Time to Recovery", value: "< 3 mins" },
      { label: "Zero-Downtime Rollouts", value: "100%" },
    ],
    stackLayers: [
      { layer: "Orchestration & GitOps", technologies: ["Kubernetes", "ArgoCD", "Helm", "Kustomize"] },
      { layer: "Infrastructure as Code", technologies: ["Terraform", "AWS / VPS", "Linux", "Docker"] },
      { layer: "Observability & Telemetry", technologies: ["Prometheus", "Grafana", "Alertmanager", "FluentBit"] },
    ],
  },
  {
    slug: "omni-commerce-platform",
    title: "OmniStore Distributed E-Commerce",
    date: "2024",
    category: "Full-Stack",
    stars: 1226,
    tagline: "Event-driven microservices architecture with real-time inventory and Stripe billing.",
    description:
      "High-throughput modern commerce engine built with Next.js App Router, Node.js microservices, Apache Kafka event streaming, and PostgreSQL with Redis caching.",
    longDescription:
      "OmniStore is a high-throughput, event-driven commerce and inventory platform engineered to handle peak traffic spikes during major release events. Designed around an asynchronous microservices architecture, it coordinates order processing, real-time stock reservations, Stripe payment reconciliation, and customer notifications via Apache Kafka event streaming.",
    highlights: [
      "Event-driven architecture with Apache Kafka ensuring exactly-once order event handling",
      "Next.js App Router storefront with optimistic UI updates and instant cache invalidation",
      "Distributed Redis locking preventing inventory overselling during concurrent checkout rushes",
      "Stripe webhook idempotent processing pipeline with automatic exponential backoff retries",
      "PostgreSQL transactional guarantees with multi-master read replicas",
    ],
    architecture:
      "The frontend is a server-rendered Next.js application that communicates with a Node.js API gateway. Orders dispatch events onto Kafka topics. Separate worker services handle inventory allocation, Stripe billing intents, and email dispatch independently, ensuring no bottleneck impacts checkout latency.",
    challenges:
      "Race conditions during flash sales where thousands of buyers attempt to purchase limited inventory simultaneously. Solved by implementing Redlock distributed mutex locks and atomic database decrement operations.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Kafka", "Redis"],
    highlight: true,
    featured: true,
    githubUrl: "https://github.com/dilshandevxx/omnistore-platform",
    demoUrl: "https://omnistore.dilshan.dev",
    metrics: "Handles 10k+ concurrent requests with sub-50ms cache response",
    metricsDetail: [
      { label: "Peak Throughput", value: "10k+ req/sec" },
      { label: "Checkout Cache Latency", value: "< 45ms" },
      { label: "Inventory Consistency", value: "100%" },
      { label: "Payment Idempotency", value: "Guaranteed" },
    ],
    stackLayers: [
      { layer: "Frontend & UI", technologies: ["Next.js App Router", "React 19", "TypeScript", "Vanilla CSS"] },
      { layer: "Backend & Gateway", technologies: ["Node.js", "Express", "REST", "Zod"] },
      { layer: "Data & Event Bus", technologies: ["PostgreSQL", "Apache Kafka", "Redis", "Prisma"] },
    ],
  },
  {
    slug: "vision-edge-infer",
    title: "VisionEdge Real-time Inference",
    date: "2024",
    category: "AI/ML",
    stars: 645,
    tagline: "Quantized computer vision pipeline for real-time edge object detection and tracking.",
    description:
      "Lightweight model pipeline utilizing YOLOv8 and TensorRT optimization deployed in containerized edge microservices with WebRTC streaming output.",
    longDescription:
      "VisionEdge is an ultra-fast computer vision inference pipeline optimized for edge devices and resource-constrained environments. Utilizing TensorRT acceleration and INT8 model quantization, it performs real-time multi-class object detection and tracking on high-definition video streams with minimal hardware requirements.",
    highlights: [
      "YOLOv8 pipeline compiled with NVIDIA TensorRT achieving 60+ FPS on consumer GPUs",
      "INT8 post-training quantization reducing model memory footprint by 4x without accuracy degradation",
      "Low-latency WebRTC and WebSocket streaming delivering real-time bounding boxes to browser dashboards",
      "Containerized microservice packaging with minimal Docker alpine runtime",
      "Configurable region-of-interest (ROI) virtual tripwires and anomaly detection alerts",
    ],
    architecture:
      "Video feeds are ingested via OpenCV or RTSP streams into a C++/Python processing daemon. Frames are passed into a TensorRT execution engine running asynchronous batch inference. Detection coordinates and confidence scores are packaged into binary WebSocket packets broadcast to connected web clients.",
    challenges:
      "Overcoming thermal throttling and memory bandwidth saturation on small edge hardware. Solved by implementing dynamic frame dropping, circular buffer memory pools, and optimized TensorRT memory planning.",
    tags: ["Python", "YOLOv8", "TensorRT", "OpenCV", "WebSockets", "Docker"],
    highlight: true,
    featured: false,
    githubUrl: "https://github.com/dilshandevxx/vision-edge-infer",
    metrics: "60 FPS inference on consumer hardware with 4x memory reduction",
    metricsDetail: [
      { label: "Frame Rate", value: "60+ FPS" },
      { label: "Memory Reduction", value: "4x (INT8)" },
      { label: "End-to-End Latency", value: "16ms" },
      { label: "Detection mAP@50", value: "87.4%" },
    ],
    stackLayers: [
      { layer: "Deep Learning & Vision", technologies: ["PyTorch", "YOLOv8", "NVIDIA TensorRT", "OpenCV"] },
      { layer: "Runtime & Streaming", technologies: ["Python", "WebSockets", "WebRTC", "NumPy"] },
      { layer: "Packaging", technologies: ["Docker", "Linux Systemd", "CUDA Toolkit"] },
    ],
  },
  {
    slug: "sentinel-infra-watch",
    title: "Sentinel Cluster Monitor",
    date: "2023",
    category: "DevOps",
    stars: 430,
    tagline: "Lightweight distributed cluster health check agent with Discord & Slack alerting.",
    description:
      "A Go-based daemon tracking memory, CPU, disk anomalies, and Docker container lifecycles across VPS nodes with zero-configuration peer discovery.",
    longDescription:
      "Sentinel is a zero-dependency, lightweight cluster monitoring daemon written in Go. Designed to run as an unprivileged background agent on bare-metal and virtual private servers, it autonomously discovers peer nodes, monitors critical system metrics (CPU, RAM, disk I/O, network sockets, Docker container health), and dispatches structured alerts via Discord and Slack webhooks.",
    highlights: [
      "Written in pure Go with zero external dependencies and a tiny 12MB compiled binary",
      "P2P gossip protocol for autonomous peer health checks and cluster membership tracking",
      "Real-time Docker socket monitoring tracking container restarts and OOM kills",
      "Prometheus-compatible `/metrics` scrape endpoint for Grafana integration",
      "Configurable threshold alert rules with rate limiting and flapping prevention",
    ],
    architecture:
      "The Sentinel daemon spins up lightweight goroutines for OS kernel metric collectors, Docker engine socket polling, and network heartbeats. If a peer misses three heartbeat intervals or a node exceeds memory thresholds, a debounced notification payload is sent to notification webhooks.",
    challenges:
      "Maintaining a sub-15MB resident memory footprint while sampling high-frequency kernel statistics. Solved by avoiding heavy runtime allocations, pooling byte buffers, and leveraging direct `/proc` filesystem reads.",
    tags: ["Go", "Docker", "Linux", "REST APIs", "Prometheus"],
    highlight: false,
    featured: false,
    githubUrl: "https://github.com/dilshandevxx/sentinel-infra-watch",
    metrics: "<15MB resident memory footprint across target nodes",
    metricsDetail: [
      { label: "Memory Footprint", value: "< 14MB RAM" },
      { label: "Binary Size", value: "12MB Static" },
      { label: "CPU Overhead", value: "< 0.4%" },
      { label: "Alert Latency", value: "< 1.2s" },
    ],
    stackLayers: [
      { layer: "Core Daemon", technologies: ["Go (Golang)", "Goroutines", "Linux Syscalls", "Procfs"] },
      { layer: "Integration & Monitoring", technologies: ["Docker API", "Prometheus", "REST", "Webhooks"] },
      { layer: "Delivery", technologies: ["Slack API", "Discord Webhooks", "Systemd"] },
    ],
  },
  {
    slug: "hyperflow-task-orchestrator",
    title: "HyperFlow Workflow Orchestrator",
    date: "2023",
    category: "Full-Stack",
    stars: 1120,
    tagline: "Visual DAG-based task execution engine with distributed worker queues.",
    description:
      "Interactive drag-and-drop workflow builder designed for asynchronous batch data extraction, transformation, and automated notifications.",
    longDescription:
      "HyperFlow is a visual directed acyclic graph (DAG) workflow orchestrator and distributed task scheduler. It empowers teams to visually connect data ingestion, transformation, model evaluation, and notification jobs via an interactive browser canvas, executing tasks reliably across distributed Celery worker nodes backed by Redis.",
    highlights: [
      "Interactive drag-and-drop canvas with real-time topological sorting and DAG cycle detection",
      "Distributed task execution engine leveraging Celery and Redis message queues",
      "Granular step-level retry policies with exponential backoff and dead-letter queues",
      "Live node status telemetry via WebSockets showing task completion, stdout logs, and execution duration",
      "RESTful workflow definition format allowing code-first or UI-first job creation",
    ],
    architecture:
      "Users build workflows in a React canvas, which compiles node graphs into JSON DAG specifications. A FastAPI backend validates dependency trees, schedules tasks according to topology, and dispatches job payloads to Celery workers. Execution states are broadcast over WebSockets to provide instantaneous UI updates.",
    challenges:
      "Preventing race conditions and circular deadlocks in dynamic workflows with branch merges. Solved by implementing Kahn's topological sort algorithm on graph saves and atomic Redis transaction locks during task completion.",
    tags: ["React", "TypeScript", "FastAPI", "Celery", "Redis", "Tailwind"],
    highlight: false,
    featured: false,
    githubUrl: "https://github.com/dilshandevxx/hyperflow-orchestrator",
    metrics: "Processes 20k+ async tasks/min with distributed Celery workers",
    metricsDetail: [
      { label: "Task Throughput", value: "20k+ / min" },
      { label: "Worker Concurrency", value: "64 nodes" },
      { label: "Execution Reliability", value: "99.95%" },
      { label: "Graph Parse Time", value: "< 5ms" },
    ],
    stackLayers: [
      { layer: "Canvas & UI", technologies: ["React", "TypeScript", "React Flow / Canvas", "Tailwind"] },
      { layer: "Execution Engine", technologies: ["FastAPI", "Python", "Celery", "Pydantic"] },
      { layer: "Queue & Persistence", technologies: ["Redis", "PostgreSQL", "Docker Compose"] },
    ],
  },
  {
    slug: "dilshan-personal-portfolio",
    title: "dilshan.dev",
    date: "2025",
    category: "Full-Stack",
    stars: 315,
    tagline: "The source code of this personal digital garden and portfolio.",
    description:
      "Fast, minimalist, authentic personal website and digital garden built with Next.js App Router, vanilla CSS design tokens, and Markdown content pipelines.",
    longDescription:
      "dilshan.dev is an open-source personal digital garden crafted with deliberate restraint and content-first minimalism. Inspired by the legendary handcrafted web aesthetic, it features custom theme switching, harmonic palettes, server-rendered routes, and zero heavy UI framework bloat.",
    highlights: [
      "Next.js App Router architecture with instant static generation and minimal bundle size",
      "Harmonic dynamic palette switcher with synchronized light/dark mode tokens",
      "Vanilla CSS architecture with custom CSS variables and no utility framework dependencies",
      "Full mobile responsiveness and accessible keyboard navigation",
      "Integrated RSS feeds, code snippets, and dynamic project showcase",
    ],
    architecture:
      "Built with Next.js 15, React 19, and TypeScript. All pages are statically generated with incremental revalidation where necessary. Styling is powered entirely by a bespoke CSS token design system.",
    challenges:
      "Achieving an authentic, non-glossy matte design while supporting dynamic multi-tone theme adjustments. Solved through HSL-calculated complementary harmonies and CSS custom properties.",
    tags: ["Next.js", "React", "TypeScript", "CSS", "RSS"],
    highlight: true,
    featured: true,
    githubUrl: "https://github.com/dilshandevxx/dilshan-personal-portfolio",
    demoUrl: "https://dilshan.dev",
    metrics: "100 Lighthouse performance score with sub-80ms first contentful paint",
    metricsDetail: [
      { label: "Lighthouse Score", value: "100 / 100" },
      { label: "First Contentful Paint", value: "78ms" },
      { label: "Total CSS Size", value: "< 14KB gzip" },
      { label: "Zero Janky JS", value: "100%" },
    ],
    stackLayers: [
      { layer: "Framework", technologies: ["Next.js", "React 19", "TypeScript"] },
      { layer: "Styling & Tokens", technologies: ["Vanilla CSS", "CSS Variables", "Modern Typography"] },
      { layer: "Hosting", technologies: ["Vercel", "Edge Network", "GitHub CI"] },
    ],
  },
  {
    slug: "cxx-tensor-graph",
    title: "TensorGraph C++",
    date: "2024",
    category: "Systems",
    stars: 580,
    tagline: "Tensor compute graph with reverse-mode automatic differentiation.",
    description:
      "A from-scratch C++ tensor library and autograd computation engine featuring lazy evaluation, memory arena pooling, and SIMD matrix operations.",
    longDescription:
      "TensorGraph C++ is a minimalist deep learning computational graph library implemented in modern C++20. Designed to explore how PyTorch and TensorFlow compute gradients under the hood, it implements reverse-mode automatic differentiation (autograd) on dynamically constructed directed acyclic graphs.",
    highlights: [
      "Pure C++20 implementation with custom multi-dimensional strided tensor representation",
      "Dynamic compute graph execution with reverse-mode automatic gradient backpropagation",
      "SIMD vectorization (AVX2/NEON) for accelerated float32 matrix multiplications",
      "Custom memory arena allocator eliminating runtime heap allocation thrashing",
      "Python C-API bindings allowing seamless integration with NumPy arrays",
    ],
    architecture:
      "Operations on Tensor instances construct computational graph nodes recording parents and gradient backward closures. Calling `.backward()` traverses the DAG in reverse topological order, accumulating gradients at leaf nodes.",
    challenges:
      "Minimizing cache misses during non-contiguous tensor transpose and slicing. Solved by implementing optimized strided index iterators and tiled matrix multiplication algorithms.",
    tags: ["C++", "Autograd", "SIMD", "Python C-API", "Algorithms"],
    highlight: false,
    featured: false,
    githubUrl: "https://github.com/dilshandevxx/cxx-tensor-graph",
    metrics: "3.8x faster matrix operations via AVX2 SIMD vectorization",
    metricsDetail: [
      { label: "SIMD Speedup", value: "3.8x AVX2" },
      { label: "Memory Overhead", value: "Zero Heap Thrash" },
      { label: "Autograd Graph Depth", value: "10k+ nodes" },
      { label: "Language Standard", value: "C++20" },
    ],
    stackLayers: [
      { layer: "Core Engine", technologies: ["C++20", "AVX2 SIMD", "Memory Arenas"] },
      { layer: "Graph & Autograd", technologies: ["DAG Topological Sort", "Reverse-Mode AD"] },
      { layer: "Bindings", technologies: ["Python C-API", "Pybind11", "CMake"] },
    ],
  },
  {
    slug: "ebpf-network-tracer",
    title: "eBPF Kernel Tracer",
    date: "2024",
    category: "DevOps",
    stars: 420,
    tagline: "Zero-overhead Linux kernel network socket observability.",
    description:
      "High-performance system observability agent utilizing eBPF programs loaded into the Linux kernel to monitor TCP/UDP connections and dropped packets.",
    longDescription:
      "eBPF Kernel Tracer is an in-kernel network monitoring agent that hooks into Linux socket tracepoints (sock:inet_sock_set_state) to deliver nanosecond-precision telemetry without modifying application code or introducing packet capture overhead.",
    highlights: [
      "Attaches directly to kernel sock tracepoints using modern CO-RE (Compile Once – Run Everywhere)",
      "Zero application performance penalty with ring buffer user-space data transmission",
      "Detects TCP retransmissions, connection latency spikes, and socket resets in real time",
      "Lightweight Go user-space agent exporting Prometheus metrics and OpenTelemetry spans",
      "Sub-5MB memory footprint on Linux server nodes",
    ],
    architecture:
      "C-based eBPF bytecode is validated and JIT-compiled into the Linux kernel by the BPF verifier. Events are written to a shared BPF ring buffer. A Go daemon reads the buffer asynchronously and exposes Prometheus metrics.",
    challenges:
      "Passing strict BPF verifier bounds checks while maintaining multi-kernel compatibility. Solved by leveraging BPF CO-RE and BTF (BPF Type Format) relocations.",
    tags: ["eBPF", "C", "Go", "Linux Kernel", "Prometheus"],
    highlight: false,
    featured: false,
    githubUrl: "https://github.com/dilshandevxx/ebpf-network-tracer",
    metrics: "Sub-1% CPU overhead while capturing 100k socket events/second",
    metricsDetail: [
      { label: "Event Throughput", value: "100k / sec" },
      { label: "CPU Overhead", value: "< 0.8%" },
      { label: "User-space Daemon", value: "Go / Cilium BPF" },
      { label: "Kernel Compatibility", value: "Linux 5.8+" },
    ],
    stackLayers: [
      { layer: "In-Kernel", technologies: ["eBPF / BPF", "C", "Linux Tracepoints", "BTF"] },
      { layer: "User-space Agent", technologies: ["Go", "Cilium/ebpf", "Ring Buffer"] },
      { layer: "Metrics Exporter", technologies: ["Prometheus", "OpenTelemetry", "Grafana"] },
    ],
  },
  {
    slug: "crdt-sync-engine",
    title: "CRDT Sync Engine",
    date: "2023",
    category: "Systems",
    stars: 910,
    tagline: "Conflict-free replicated data type engine for real-time state.",
    description:
      "State-based and operation-based CRDT implementation providing eventual consistency for collaborative text documents and multi-user canvas boards.",
    longDescription:
      "CRDT Sync Engine is a robust, mathematically proven replication library implementing YATA and fractional indexing algorithms for peer-to-peer real-time collaborative applications. It guarantees strong eventual consistency across offline-first clients with zero merge conflicts.",
    highlights: [
      "Implements state-based RGA and LWW-Element-Set CRDT data structures",
      "Compact binary state vector encoding reducing network synchronization bandwidth by 70%",
      "Deterministic convergence under arbitrary network partitions and out-of-order delivery",
      "WebSocket and WebRTC data channel transport adapters for peer-to-peer mesh sync",
      "Zero external runtime dependencies with high-concurrency benchmarks",
    ],
    architecture:
      "Document mutations are recorded as causal item structs with Lamport timestamps and client IDs. When peers connect, they exchange compact state vectors to compute diffs, merging incoming operations into local trees without central locking.",
    challenges:
      "Garbage collection of deletion tombstones without breaking causal history. Solved by implementing state vector snapshot compaction during quiescence periods.",
    tags: ["TypeScript", "CRDT", "WebSockets", "WebRTC", "Distributed"],
    highlight: false,
    featured: false,
    githubUrl: "https://github.com/dilshandevxx/crdt-sync-engine",
    metrics: "Sub-15ms peer-to-peer convergence with 70% compressed delta payloads",
    metricsDetail: [
      { label: "Convergence Latency", value: "< 15ms" },
      { label: "Delta Compression", value: "70% Binary" },
      { label: "Conflict Rate", value: "0% Mathematical" },
      { label: "Max Concurrent Peers", value: "250+ / room" },
    ],
    stackLayers: [
      { layer: "Algorithm", technologies: ["RGA CRDT", "Lamport Timestamps", "YATA Algorithm"] },
      { layer: "Encoding", technologies: ["TypeScript", "Uint8Array", "Varint Encoding"] },
      { layer: "Transport", technologies: ["WebSockets", "WebRTC Data Channels"] },
    ],
  },
  {
    slug: "distroless-k8s-operator",
    title: "Distroless K8s Operator",
    date: "2023",
    category: "DevOps",
    stars: 512,
    tagline: "Kubernetes controller for automated zero-privilege container hardening.",
    description:
      "Kubernetes admission webhook and custom controller that automatically strips root permissions, read-write filesystems, and shell utilities from cluster workloads.",
    longDescription:
      "Distroless K8s Operator is a cloud-native security automation controller built using the Kubebuilder framework. It intercepts pod creation requests, validates security contexts against CIS benchmarks, and automatically patches manifests with read-only root filesystems, non-root user IDs, and dropped Linux capabilities.",
    highlights: [
      "Dynamic Mutating and Validating Admission Webhook controller written in Go",
      "Enforces NSA/CISA Kubernetes Hardening Guidance out of the box",
      "Automated migration from bloated base images to GoogleContainerTools distroless containers",
      "Generates continuous cluster compliance audit reports in Prometheus format",
      "Integrated with cert-manager for automated webhook TLS certificate rotation",
    ],
    architecture:
      "The Kubernetes API server invokes the operator's mutating webhook on pod creation. The controller inspects `securityContext` parameters, applies hardening patches, and logs admissions to a structured audit topic.",
    challenges:
      "Preventing breaking legacy workloads that legitimately require write access to specific directories. Solved by introducing selective ephemeral volume mounting and granular namespace annotation overrides.",
    tags: ["Kubernetes", "Go", "Security", "Kubebuilder", "Helm"],
    highlight: false,
    featured: false,
    githubUrl: "https://github.com/dilshandevxx/distroless-k8s-operator",
    metrics: "100% compliance with CIS Kubernetes benchmarks across 40+ namespaces",
    metricsDetail: [
      { label: "CIS Compliance", value: "100%" },
      { label: "Webhook Latency", value: "< 8ms" },
      { label: "Attack Surface", value: "92% Reduction" },
      { label: "Namespaces Guarded", value: "40+" },
    ],
    stackLayers: [
      { layer: "Controller", technologies: ["Go", "Kubebuilder", "Controller-Runtime"] },
      { layer: "Kubernetes APIs", technologies: ["Admission Webhooks", "CustomResourceDefinitions"] },
      { layer: "Security Tooling", technologies: ["CIS Benchmarks", "Distroless", "Trivy"] },
    ],
  },
  {
    slug: "micro-cache-allocator",
    title: "MicroCache Allocator",
    date: "2023",
    category: "Systems",
    stars: 724,
    tagline: "Lock-free jemalloc-inspired custom memory allocator in C++.",
    description:
      "High-concurrency fixed-size memory allocator designed for ultra-low latency key-value caching engines with near-zero fragmentation.",
    longDescription:
      "MicroCache Allocator is a specialized C++ memory management subsystem engineered to replace standard `malloc`/`free` in high-throughput database caching layers. Using thread-local size-class arenas and lock-free freelists, it completely eliminates lock contention across high-core-count server CPUs.",
    highlights: [
      "Thread-local slab allocation arenas eliminating multithreaded mutex contention",
      "Segregated size-classes aligned to 64-byte CPU cache lines avoiding false sharing",
      "Lock-free atomic freelists for cross-thread memory deallocation",
      "Virtual memory management leveraging Linux `mmap` with transparent huge pages",
      "Benchmark showing 4.2x faster allocation throughput compared to standard glibc malloc",
    ],
    architecture:
      "Each thread maintains private size-class bins for allocations under 4KB. Deallocations by other threads push nodes into an atomic lock-free queue, reclaimed during the owning thread's next allocation cycle.",
    challenges:
      "Preventing cross-thread memory return overhead and avoiding lock convoying. Solved using Treiber stacks and atomic pointer exchange operations.",
    tags: ["C++", "Memory Management", "Concurrency", "Linux", "Performance"],
    highlight: false,
    featured: false,
    githubUrl: "https://github.com/dilshandevxx/micro-cache-allocator",
    metrics: "4.2x higher allocation throughput with zero thread contention",
    metricsDetail: [
      { label: "Throughput Boost", value: "4.2x vs Glibc" },
      { label: "Cache Line Alignment", value: "64-byte True" },
      { label: "Lock Contention", value: "0% Free-List" },
      { label: "P99 Alloc Latency", value: "8.4ns" },
    ],
    stackLayers: [
      { layer: "Low-Level Kernel", technologies: ["Linux mmap", "Transparent Huge Pages", "Virtual Memory"] },
      { layer: "Concurrency", technologies: ["Atomic CAS", "Lock-Free Treiber Stack", "Memory Fences"] },
      { layer: "Language", technologies: ["Modern C++20", "GTest Benchmarks", "Valgrind/ASan"] },
    ],
  },
];
