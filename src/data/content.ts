import { SiteConfig } from '@/types/content';

/**
 * EDITORIAL SITE CONFIGURATION
 * -------------------------------------------------------------
 * Centralized data store for portfolio, digital-book landing page,
 * writing, skills, resume, and reading shelf.
 * Replace placeholder entries with your own verified history.
 */
export const siteConfig: SiteConfig = {
  name: "Dilshan",
  initials: "D",
  wordmark: "DILSHAN . DEV",
  edition: "First Folio — Vol. 2026",
  title: "Software Engineer & Systems Architect",
  tagline: "Exploring resilient distributed systems, mindful interface design, and timeless computing literature.",
  location: "Colombo, Sri Lanka (Available Worldwide)",
  status: "Available for engineering roles & technical advisory",
  
  shortBio: 
    "Software engineer with a focus on high-throughput backend services, distributed data structures, and understated, highly accessible web interfaces. I treat code like technical prose: structured, clear, and built to outlive ephemeral trends.",
  
  extendedBio: [
    "I view computer science not merely as a modern trade, but as an intellectual craft that bridges mechanical discipline with editorial clarity. Over the past several years, I have worked across the stack—from designing event-driven distributed ingestion pipelines to architecting accessible, zero-bloat web clients.",
    "My engineering philosophy is shaped by durable principles: favor explicit architectures over magic abstractions, prioritize deterministic latency over brute computing power, and craft user experiences that respect human attention rather than exploit it.",
    "When I step away from code editors, I immerse myself in non-fiction literature, acoustic fingerstyle music, the history of mathematics, and the deliberate ritual of manual coffee brewing."
  ],

  currentFocus: "Currently studying consensus algorithms (Raft, Paxos), formal verification with TLA+, and local-first software architectures.",

  colophon: {
    typography: "Newsreader (Editorial Serif), Inter (Humanist Sans), JetBrains Mono (Code)",
    designSystem: "Editorial Custom Tokens (Dark Moss, Paper, Sage, Sandstone)",
    builtWith: "Next.js App Router, React 19, TypeScript, Tailwind CSS, Lucide",
    lastUpdated: "October 2026"
  },

  socials: [
    {
      platform: "GitHub",
      url: "https://github.com",
      handle: "@dilshan",
      icon: "Github"
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com",
      handle: "in/dilshan",
      icon: "Linkedin"
    },
    {
      platform: "Email",
      url: "mailto:hello@dilshan.dev",
      handle: "hello@dilshan.dev",
      icon: "Mail"
    },
    {
      platform: "RSS Feed",
      url: "/feed.xml",
      handle: "dilshan.dev/feed",
      icon: "Rss"
    }
  ],

  projects: [
    {
      id: "proj-1",
      slug: "dilshan-dev",
      title: "dilshan.dev",
      subtitle: "The source code of this personal website and digital garden",
      description: "An editorial digital garden and software engineering portfolio built with Next.js App Router, TypeScript, and CSS tokens.",
      longDescription: "Designed around fast static generation, accessibility, responsive drawer navigation, and zero-flash coordinated theme switching.",
      category: "UI & Architecture",
      year: "2026",
      stars: "1,840",
      stack: ["Next.js", "React 19", "TypeScript", "Tailwind CSS"],
      role: "Creator",
      githubUrl: "https://github.com/example/lifestyle-portfolio",
      demoUrl: "https://dilshan.dev",
      articleUrl: "/blog/zero-dependency-web-design",
      architectureHighlights: [
        "Synchronous anti-flash theme script in document head",
        "Zero runtime CSS-in-JS overhead using vanilla CSS variables",
        "Accessible keyboard-trapped mobile drawer with ESC key bindings"
      ],
      challenges: [
        "Ensuring readable WCAG AA contrast across 4 base themes and 6 accent colors",
        "Synchronizing hash-based section scroll with deep-link navigable sub-routes"
      ],
      outcomes: [
        "100/100 Core Web Vitals Lighthouse score across mobile and desktop",
        "Clean, decoupled architecture with strong TypeScript schema"
      ],
      featured: true,
      status: "Open Source"
    },
    {
      id: "proj-2",
      slug: "khepri-kv",
      title: "KhepriKV",
      subtitle: "Append-only storage engine with write-ahead logging and compaction",
      description: "Log-structured merge-tree (LSM) key-value engine built to study write amplification, memtable flushing, and SSTable bloom filters.",
      longDescription: "KhepriKV explores the mechanics behind modern storage foundations like RocksDB and Cassandra. Written from first principles to evaluate memory-to-disk throughput trade-offs, cache eviction strategies, and concurrent block compaction without halting incoming writes.",
      category: "Distributed Systems",
      year: "2025",
      stars: "2,135",
      stack: ["Go", "gRPC", "Protobuf", "Prometheus", "Docker"],
      role: "Lead Architect",
      githubUrl: "https://github.com/example/khepri-kv",
      demoUrl: "https://example.com/khepri-kv",
      articleUrl: "/blog/resilience-in-distributed-systems",
      architectureHighlights: [
        "Concurrent SkipList in-memory memtable with atomic pointer swaps during flush",
        "Sparse index SSTable layout with Murmur3 Bloom Filters to prevent unnecessary disk seeks",
        "Two-phase concurrent tiered compaction pipeline keeping tail latency p99 under 12ms"
      ],
      challenges: [
        "Managing file descriptor exhaustion during rapid SSTable file generation under high concurrency",
        "Preventing read latency spikes while background compaction merged multi-gigabyte SSTables"
      ],
      outcomes: [
        "Sustained 48,000 IOPS write throughput on commodity SSD benchmarks",
        "Documented comprehensive architectural post-mortem and benchmarking methodology"
      ],
      featured: true,
      status: "Open Source"
    },
    {
      id: "proj-3",
      slug: "chronicle-graph",
      title: "Chronicle",
      subtitle: "Bi-directional linked note engine with CRDT offline synchronisation",
      description: "Local-first note-taking application designed for long-term knowledge retention with bi-directional references and peer-to-peer syncing.",
      longDescription: "Built around the philosophy of data sovereignty: personal writing should never reside in an opaque proprietary cloud. Chronicle stores everything as plain Markdown files on your local filesystem while maintaining an in-memory SQLite index and Yjs CRDT mesh for real-time multi-device sync.",
      category: "UI & Architecture",
      year: "2025",
      stars: "3,920",
      stack: ["TypeScript", "Next.js", "Tauri", "SQLite", "Yjs CRDT"],
      role: "Full-Stack Engineer",
      githubUrl: "https://github.com/example/chronicle-graph",
      demoUrl: "https://example.com/chronicle",
      articleUrl: "/blog/lost-art-of-readable-code",
      architectureHighlights: [
        "Zero-latency optimistic UI updates backed by local SQLite WebAssembly and File System Access API",
        "State synchronization via Yjs binary delta messages over encrypted WebRTC data channels",
        "Instant bi-directional link graph parsing using tree-sitter markdown AST"
      ],
      challenges: [
        "Handling schema migrations on isolated offline clients upon reconnection",
        "Balancing AST parsing performance with fluid 60fps typing responsiveness in documents over 20,000 words"
      ],
      outcomes: [
        "Cold startup time under 180ms across macOS, Linux, and Windows",
        "Adopted by several technical writing groups as their primary knowledge repository"
      ],
      featured: true,
      status: "Production"
    },
    {
      id: "proj-4",
      slug: "sentinel-telemetry",
      title: "Sentinel",
      subtitle: "Sub-millisecond API proxy with adaptive rate-limiting and anomaly detection",
      description: "High-performance reverse-proxy sidecar that inspects incoming HTTP/gRPC traffic, calculates sliding token bucket budgets, and streams spans.",
      longDescription: "Engineered for microservice meshes where heavyweight API gateways introduce excessive hop latency. Sentinel deploys as a minimal single-binary sidecar consuming less than 18MB of RAM while handling 30k req/s per CPU core.",
      category: "Developer Tooling",
      year: "2024",
      stars: "845",
      stack: ["Rust", "Tokio", "Hyper", "OpenTelemetry", "eBPF"],
      role: "Systems Developer",
      githubUrl: "https://github.com/example/sentinel-probe",
      demoUrl: undefined,
      articleUrl: "/blog/resilience-in-distributed-systems",
      architectureHighlights: [
        "Asynchronous non-blocking I/O loop built atop Tokio and Hyper with zero-copy buffer transfers",
        "Lock-free atomic token bucket rate limiting using cache-line aligned atomic counters",
        "Integrated OTLP gRPC telemetry exporter with batching and backpressure throttling"
      ],
      challenges: [
        "Eliminating CPU cache-line bouncing across multi-socket NUMA processor cores",
        "Ensuring graceful connection draining during rolling container redeployments"
      ],
      outcomes: [
        "Added less than 0.35ms p99 latency overhead across 50,000 synthetic benchmark transactions",
        "Reduced observability payload memory footprint by 64% compared to standard envoy configurations"
      ],
      featured: true,
      status: "Open Source"
    },
    {
      id: "proj-5",
      slug: "verbum-syntax",
      title: "Verbum",
      subtitle: "Static site generator optimized for typographic fidelity and footnotes",
      description: "An intentional static site generator designed for digital essays, technical papers, and long-form literature with mathematical typesetting.",
      longDescription: "Frustrated by cluttered documentation frameworks, Verbum was designed from an editorial standpoint: typography first, zero JavaScript required for reader rendering, and accessible footnote hover cards.",
      category: "UI & Architecture",
      year: "2024",
      stars: "1,260",
      stack: ["TypeScript", "Node.js", "Unified/Remark", "KaTeX"],
      role: "Creator",
      githubUrl: "https://github.com/example/verbum-engine",
      demoUrl: "https://example.com/verbum",
      articleUrl: "/blog/zero-dependency-web-design",
      architectureHighlights: [
        "Custom unified/remark AST pipeline transforming Edward Tufte-style sidenotes and margin figures",
        "Syntax highlighting at compile time generating zero-runtime-cost semantic HTML",
        "Deterministic sub-second build times for sites containing hundreds of dense markdown articles"
      ],
      challenges: [
        "Formatting responsive margin notes that gracefully collapse into expandable inline drawers on mobile screens",
        "Optimizing font subsetting to keep total initial asset weight under 50KB"
      ],
      outcomes: [
        "100/100 Lighthouse performance, accessibility, best practices, and SEO scores",
        "Powers multiple academic and independent research journals"
      ],
      featured: false,
      status: "Production"
    },
    {
      id: "proj-6",
      slug: "chip8-emulator",
      title: "Chip8-RS",
      subtitle: "Retro 8-bit virtual machine emulator and instruction decoder in Rust",
      description: "Cross-platform CHIP-8 virtual machine emulator with cycle-accurate timers, keypad input mapping, and 64x32 monochrome display.",
      longDescription: "An exploration into systems emulation, opcode dispatch tables, memory-mapped I/O, and audio buzzer synthesis. Runs standard retro ROMs at accurate 60Hz tick rates.",
      category: "Developer Tooling",
      year: "2023",
      stars: "510",
      stack: ["Rust", "SDL2", "WebAssembly", "WebAudio"],
      role: "Developer",
      githubUrl: "https://github.com/example/chip8-rs",
      demoUrl: "https://example.com/chip8",
      articleUrl: undefined,
      architectureHighlights: [
        "Zero-allocation opcode decoder pattern matching over 35 distinct CHIP-8 instructions",
        "WASM compilation target allowing in-browser execution with WebAudio sound generation",
        "Strict timer synchronization decoupled from host system frame rate"
      ],
      challenges: [
        "Preventing audio click artifacts when generating square-wave beep audio across browsers",
        "Handling shift opcode quirks across original COSMAC VIP and modern SCHIP implementations"
      ],
      outcomes: [
        "Compatible with 100% of standard test suites and vintage ROMs",
        "Featured in Rust systems programming showcases"
      ],
      featured: false,
      status: "Open Source"
    }
  ],

  blogPosts: [
    {
      id: "post-1",
      slug: "resilience-in-distributed-systems",
      title: "Designing for Resilience: The Architecture of Failure",
      subtitle: "Why distributed systems don't fail gracefully by accident, and how to embrace entropy.",
      publishedAt: "2026-03-12",
      readingTime: "7 min read",
      tags: ["Distributed Systems", "Architecture", "Reliability", "Go"],
      summary: "In distributed computing, partitions are not anomalies; they are the baseline operational condition. Exploring bounded queues, circuit breakers, jittered backoff, and idempotent consumers.",
      content: `### The Inevitability of Chaos

Every distributed system is an active state machine racing against physical unpredictability. Network cables get severed, cloud VM hypervisors pause garbage-collected heaps, and storage volumes experience IOPS throttling at the precise moment traffic peaks.

If your architecture relies on the premise that remote procedure calls (RPCs) will succeed within 200 milliseconds under load, your system is already broken; you simply haven't observed it under stress yet.

\`\`\`go
// Idiomatic jittered exponential backoff in Go
func RetryWithJitter(ctx context.Context, maxAttempts int, baseDelay time.Duration, op func() error) error {
    for attempt := 0; attempt < maxAttempts; attempt++ {
        err := op()
        if err == nil {
            return nil
        }
        
        // Full jitter calculation: sleep = rand(0, base * 2^attempt)
        backoff := float64(baseDelay) * math.Pow(2, float64(attempt))
        jitter := time.Duration(rand.Float64() * backoff)
        
        select {
        case <-time.After(jitter):
        case <-ctx.Done():
            return ctx.Err()
        }
    }
    return ErrMaxRetriesExceeded
}
\`\`\`

### 1. Bounded Queues and Deadlocks
Unbounded queues are an illusion of infinite memory. When consumers stall, unbounded buffers balloon until the process dies from an Out-of-Memory (OOM) kernel signal. Always set strict high-water marks and implement proactive drop policies (tail-drop or head-drop) before memory saturates.

### 2. Idempotency Keys as First-Class Citizens
Network retries without idempotency guarantees result in double-charges, duplicate ledger rows, and corrupted inventory state. Every mutating operation must accept a client-generated UUID idempotency token stored in an atomic atomic lock table with a sensible TTL.

### Conclusion
Resilience is not achieved by attempting to eliminate failure, but by constraining the blast radius when components inevitably misbehave. Keep your failure boundaries small, your timeouts short, and your retries jittered.`
    },
    {
      id: "post-2",
      slug: "lost-art-of-readable-code",
      title: "The Lost Art of Readable Code",
      subtitle: "Writing software as prose for future engineers rather than puzzles for compilers.",
      publishedAt: "2026-01-28",
      readingTime: "5 min read",
      tags: ["Software Engineering", "Craftsmanship", "TypeScript", "Refactoring"],
      summary: "Compilers are indifferent to cleverness; human maintainers are deeply harmed by it. Reflections on naming conventions, flat control flow, and eliminating unnecessary abstractions.",
      content: `### Writing for the Reader in 2029

When you push code to production, you are not communicating with silicon; the parser transforms your instructions into machine bytecode regardless of whether you formatted them nicely. Your actual audience is the engineer on call at 3:14 AM three years from now trying to figure out why an invoice calculated tax backwards.

> "Programs must be written for the people who read them, and only incidentally for the machines that execute them." — Harold Abelson, Structure and Interpretation of Computer Programs

### The Return Early Principle
Deeply nested if-else ladders exhaust human cognitive working memory. By checking preconditions and returning early, the mental stack is instantly freed to focus on the happy path.

\`\`\`typescript
// Anti-pattern: Deeply nested pyramid
function processSubscription(user: User, plan: Plan): Result {
  if (user.isActive) {
    if (plan.isAvailable) {
      if (user.hasValidPaymentMethod) {
        return chargeAndActivate(user, plan);
      } else {
        return Result.fail("Invalid payment");
      }
    } else {
      return Result.fail("Plan unavailable");
    }
  } else {
    return Result.fail("User suspended");
  }
}

// Recommended: Linear guard clauses
function processSubscription(user: User, plan: Plan): Result {
  if (!user.isActive) return Result.fail("User suspended");
  if (!plan.isAvailable) return Result.fail("Plan unavailable");
  if (!user.hasValidPaymentMethod) return Result.fail("Invalid payment");

  return chargeAndActivate(user, plan);
}
\`\`\`

### Resist Premature DRY
Duplication is far cheaper than the wrong abstraction. When two components share four lines of similar logic, wait until you observe three distinct use cases before building a generic abstraction.`
    },
    {
      id: "post-3",
      slug: "zero-dependency-web-design",
      title: "Zero-Dependency Editorial Interfaces",
      subtitle: "Why vanilla CSS custom properties and semantic HTML outlast UI library churn.",
      publishedAt: "2025-11-14",
      readingTime: "6 min read",
      tags: ["CSS", "Web Design", "Accessibility", "Performance"],
      summary: "Modern CSS provides native tokens, cascade layers, subgrid, and fluid typography. Exploring how an editorial visual system can operate without hundred-megabyte component packages.",
      content: `### The Longevity of Web Standards

Ten years ago, web developers reached for Bootstrap or Foundation for basic grid layouts. Five years ago, CSS-in-JS runtimes injected dynamic stylesheet tags on every render, adding megabytes of JavaScript bundle tax to simple text pages.

Today, standard CSS has matured into a remarkably sophisticated styling language. Native CSS Custom Properties (\`var(--theme-token)\`), container queries, \`color-mix()\`, and \`clamp()\` allow us to build responsive, themeable, accessible interfaces with zero client-side styling runtime.

### Typographic Rhythm
A true editorial page respects the classical typographic scale. By combining fluid font sizing with relative line heights, text breathes naturally across ultra-wide monitors and compact handheld screens alike:

\`\`\`css
:root {
  --font-editorial: 'Newsreader', Georgia, serif;
  --font-interface: 'Inter', -apple-system, sans-serif;
  
  /* Fluid typographic scale */
  --text-display: clamp(2.25rem, 1.8rem + 2vw, 3.75rem);
  --text-heading: clamp(1.5rem, 1.3rem + 1vw, 2.25rem);
  --text-body: 1.0625rem;
  --line-height-prose: 1.72;
}

article {
  font-family: var(--font-editorial);
  font-size: var(--text-body);
  line-height: var(--line-height-prose);
  max-width: 68ch; /* Optimal human reading line length */
}
\`\`\`

### Accessibility as Baseline Respect
Understated design is not an excuse to sacrifice contrast. By systematically pairing light and dark theme tokens with calibrated contrast ratios (minimum 4.5:1 for body copy), we ensure our thoughts remain readable for everyone.`
    },
    {
      id: "post-4",
      slug: "enabling-apache-echarts-in-react",
      title: "Enabling Apache ECharts in React for High-Density Telemetry",
      subtitle: "Integrating and optimizing high-performance ECharts canvases within React 19 applications.",
      publishedAt: "2025-03-31",
      readingTime: "6 min read",
      tags: ["React", "TypeScript", "Data Visualization", "JavaScript"],
      summary: "A comprehensive guide on integrating and optimizing high-performance ECharts canvases within React 19 applications.",
      content: `### High-Density Telemetry in the Browser

Apache ECharts is one of the most powerful charting libraries for displaying high-density visual telemetry. This guide walks through setting up custom canvas instances, managing responsive resize observers, and ensuring smooth 60fps renders with React component wrappers.

\`\`\`tsx
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export function HighDensityChart({ data }: { data: number[][] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    chart.setOption({
      animation: false,
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'time' },
      yAxis: { type: 'value' },
      series: [{
        type: 'line',
        showSymbol: false,
        data,
      }]
    });

    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(chartRef.current);

    return () => {
      observer.disconnect();
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} className="w-full h-80" />;
}
\`\`\`

### 1. Canvas vs SVG Renderers
When rendering more than 10,000 data points, SVG elements overwhelm the browser DOM tree. Switching to ECharts' Canvas renderer eliminates DOM bloat and allows fluid zooming and pan interactions.

### 2. Debouncing Resize Observers
Window resize and layout shifts trigger layout thrashing if unthrottled. Wrapping chart.resize() in requestAnimationFrame keeps redraw operations synchronized with the browser's refresh rate.`
    },
    {
      id: "post-5",
      slug: "production-rag-architectures-and-reranking",
      title: "Production RAG Architectures: Hybrid Retrieval and Cross-Encoder Reranking",
      subtitle: "Moving beyond naive vector cosine similarity by combining dense embeddings with BM25 keyword matching and cross-encoder rerankers.",
      publishedAt: "2025-03-15",
      readingTime: "8 min read",
      tags: ["AI/ML", "RAG", "Python", "Vector Search"],
      summary: "When deploying Retrieval-Augmented Generation at scale, hybrid search using Reciprocal Rank Fusion (RRF) and second-stage cross-encoders drastically reduces hallucinations and improves recall.",
      content: `### Why Naive Vector Search Fails in Production

Pure dense embedding retrieval suffers from catastrophic blind spots when queries contain acronyms, SKU identifiers, or exact code symbols. High-dimensional vector cosine similarity measures semantic proximity, not lexical precision.

\`\`\`python
# Reciprocal Rank Fusion (RRF) for combining dense & sparse scores
def reciprocal_rank_fusion(dense_ranks, sparse_ranks, k=60):
    rrf_scores = {}
    for rank, doc_id in enumerate(dense_ranks):
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + 1.0 / (k + rank + 1)
    for rank, doc_id in enumerate(sparse_ranks):
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + 1.0 / (k + rank + 1)
    
    return sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)
\`\`\`

### 1. Dense + BM25 Hybrid Retrieval
By indexing documents in both a dense vector store (e.g., Qdrant or Milvus) and an inverted BM25 index (e.g., Elasticsearch or Tantivy), we capture both conceptual nuance and exact keyword matches.

### 2. Second-Stage Cross-Encoder Reranking
While bi-encoders generate separate embeddings for query and document, cross-encoders pass the concatenated pair into multi-head attention. Reranking top-50 hybrid candidates down to top-5 delivers dramatic improvements in downstream generation accuracy.`
    },
    {
      id: "post-6",
      slug: "year-in-review-2024",
      title: "Year in Review: 2024",
      subtitle: "Reflections on shipping machine learning systems, deep diving into Kubernetes GitOps, and building open-source developer tooling.",
      publishedAt: "2025-01-04",
      readingTime: "5 min read",
      tags: ["Reflections", "Open Source", "Architecture"],
      summary: "A look back at 2024: migrating infrastructure to declarative GitOps with ArgoCD, experimenting with open-source LLMs, and publishing notes across modern full-stack development.",
      content: `### 2024 Retrospective

2024 was defined by a deliberate transition from sprawling cloud monoliths toward resilient, deterministic infrastructure and local-first software.

> "The software engineer's true craft is not how much code they write, but how much unnecessary complexity they can safely prevent."

### Key Milestones
- **Declarative GitOps:** Migrated our production Kubernetes microservices cluster to pure ArgoCD sync loops, reducing deployment anomalies to near zero.
- **Inference Optimization:** Experimented with vLLM, continuous batching, and AWQ quantization to serve open-weights models with sub-second time-to-first-token.
- **Open-Source Notes:** Published over 20 architectural guides and launched this digital garden space.`
    },
    {
      id: "post-7",
      slug: "zero-downtime-kubernetes-gitops",
      title: "Zero-Downtime Deployments with Kubernetes and ArgoCD GitOps",
      subtitle: "Implementing automated blue-green and canary releases with robust readiness probes and pre-stop lifecycle hooks.",
      publishedAt: "2024-11-18",
      readingTime: "7 min read",
      tags: ["DevOps", "Kubernetes", "Docker", "GitOps"],
      summary: "Achieving true zero-downtime in microservices requires treating Git as the single source of truth. We look at rolling update configurations, health check policies, and ingress routing.",
      content: `### The Myth of Instant Pod Termination

When Kubernetes schedules a replacement Pod during a rolling deployment, traffic will be routed to terminating containers unless lifecycle hooks and readiness thresholds are calibrated with mechanical precision.

\`\`\`yaml
# Zero-downtime container lifecycle configuration
lifecycle:
  preStop:
    exec:
      command: ["/bin/sh", "-c", "sleep 15"]
readinessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 3
\`\`\`

### 1. The PreStop Grace Period
A preStop sleep hook allows kube-proxy and ingress load balancers sufficient time to deregister the pod IP from active iptables endpoints before the application process receives SIGTERM.

### 2. Declarative Rollouts with Argo Rollouts
Canary deployments with progressive traffic shifting (5% -> 20% -> 50% -> 100%) paired with Prometheus error-rate analysis ensure faulty releases are rolled back autonomously before reaching critical thresholds.`
    },
    {
      id: "post-8",
      slug: "react-19-server-components-mental-model",
      title: "The Next.js App Router & React 19 Server Components Mental Model",
      subtitle: "How React Server Components, Suspense boundaries, and Client Component leaves coordinate to eliminate client bundle size.",
      publishedAt: "2024-09-22",
      readingTime: "6 min read",
      tags: ["React", "Next.js", "Web Architecture"],
      summary: "Server Components represent a fundamental shift in web architecture. Here is how to think about data fetching at the component level without sending unnecessary JavaScript to the browser.",
      content: `### Server Components Are Not SSR

Server-Side Rendering (SSR) sends HTML to the client which then executes client-side hydration for every single node. React Server Components (RSC) execute exclusively on the server, streaming serialized UI trees directly into the DOM without client JavaScript runtime overhead.

\`\`\`tsx
// Pure Server Component: Zero client bundle footprint
import db from '@/lib/db';

export async function ProjectOverview({ id }: { id: string }) {
  const project = await db.project.findUnique({ where: { id } });
  
  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </div>
  );
}
\`\`\`

### 1. Pushing 'use client' to the Leaves
Keep stateful interactive hooks (like useState, useEffect, and event handlers) in compact leaf components. The surrounding layout, data layer, and markdown renderers remain pure server code.

### 2. Granular Suspense Streaming
By wrapping slow asynchronous operations in React Suspense, the browser renders the instant shell immediately, streaming slower database queries into place as they resolve.`
    },
    {
      id: "post-9",
      slug: "quantizing-open-weights-llms-with-vllm",
      title: "Serving Quantized LLMs in Production with vLLM & PagedAttention",
      subtitle: "Maximizing GPU memory throughput and slashing inference latency using AWQ quantization and continuous batching.",
      publishedAt: "2024-06-14",
      readingTime: "8 min read",
      tags: ["AI/ML", "vLLM", "Python", "GPU Inference"],
      summary: "PagedAttention revolutionized transformer memory management. Benchmarking AWQ vs GPTQ models and building a lightweight API endpoint using FastAPI and vLLM.",
      content: `### Eliminating GPU Memory Fragmentation

Traditional autoregressive generation pre-allocates continuous GPU VRAM buffers for Key-Value (KV) cache. Under dynamic sequence lengths, up to 70% of GPU memory is wasted on fragmentation and reserved headroom.

\`\`\`python
# High-throughput vLLM engine initialization
from vllm import LLM, SamplingParams

sampling_params = SamplingParams(temperature=0.7, top_p=0.9, max_tokens=512)
llm = LLM(
    model="meta-llama/Llama-3-8B-Instruct",
    quantization="awq",
    gpu_memory_utilization=0.92,
    max_model_len=4096
)

outputs = llm.generate(["Explain Paxos consensus simply:"], sampling_params)
for output in outputs:
    print(output.outputs[0].text)
\`\`\`

### 1. PagedAttention
Inspired by OS virtual memory paging, PagedAttention partitions the KV cache into non-contiguous physical memory blocks. This allows concurrent requests to share memory dynamically and increases server throughput by 2x to 4x.

### 2. AWQ vs GPTQ Quantization
Activation-aware Weight Quantization (AWQ) protects salient weight channels that correlate with large activation outliers, preserving perplexity metrics while halving VRAM requirements.`
    },
    {
      id: "post-10",
      slug: "building-realtime-collaborative-apps-with-websockets",
      title: "Building Real-Time Multi-User Apps with WebSockets & Redis Pub/Sub",
      subtitle: "Scaling bi-directional WebSocket connections horizontally across distributed Node.js clusters using Redis adapters.",
      publishedAt: "2024-02-28",
      readingTime: "7 min read",
      tags: ["Distributed Systems", "WebSockets", "Node.js", "Redis"],
      summary: "Handling thousands of concurrent stateful WebSocket connections requires an event distribution backbone. Room broadcasting, heartbeats, and graceful reconnections.",
      content: `### Horizontally Scaling Stateful Sockets

A single Node.js instance can maintain tens of thousands of open TCP socket connections, but broadcasting an event to a user connected to a different container requires a distributed message fabric.

\`\`\`typescript
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

await Promise.all([pubClient.connect(), subClient.connect()]);

const io = new Server(server, {
  adapter: createAdapter(pubClient, subClient)
});

io.on('connection', (socket) => {
  socket.on('document:edit', ({ docId, delta }) => {
    socket.to(docId).emit('document:update', delta);
  });
});
\`\`\`

### 1. Heartbeats and Dead Connection Cleanup
Stale TCP connections remain open indefinitely when mobile devices switch cellular towers or enter sleep mode. Aggressive ping-pong intervals detect dropped sockets within seconds.

### 2. Conflict Resolution with CRDTs
When multiple users edit shared canvases concurrently, last-write-wins creates data loss. Integrating Conflict-free Replicated Data Types (CRDTs) like Yjs guarantees eventual consistency across all clients.`
    },
    {
      id: "post-11",
      slug: "setting-up-a-hardened-linux-vps",
      title: "Setting Up and Hardening a Linux VPS for Production",
      subtitle: "Essential security checklist: SSH keys, UFW firewalls, fail2ban, automatic updates, and non-root user privileges.",
      publishedAt: "2023-10-11",
      readingTime: "6 min read",
      tags: ["Linux", "Security", "DevOps"],
      summary: "Before deploying Docker containers to a remote server, baseline OS hardening is vital. Step-by-step walkthrough for securing Ubuntu/Debian instances.",
      content: `### The Zero-Trust Server Baseline

Within 120 seconds of launching a public IPv4 cloud VPS, automated botnets begin probing port 22 with dictionary attacks. Hardening the operating system is the first non-negotiable step of any deployment.

\`\`\`bash
# Essential security baseline for Ubuntu/Debian
# 1. Update system repositories
sudo apt update && sudo apt upgrade -y

# 2. Configure Uncomplicated Firewall (UFW)
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp comment 'SSH'
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'
sudo ufw enable

# 3. Disable password authentication in SSH
sudo sed -i -e 's/#PasswordAuthentication yes/PasswordAuthentication no/g' /etc/ssh/sshd_config
sudo systemctl restart ssh
\`\`\`

### 1. Fail2Ban Brute-Force Shielding
Fail2ban scans system authentication logs and dynamically inserts iptables drop rules for IP addresses exhibiting suspicious authentication failures.

### 2. Unattended Security Upgrades
Enabling automated security kernel patches ensures known CVE vulnerabilities are remediated without manual operator intervention.`
    },
    {
      id: "post-12",
      slug: "complete-guide-to-full-stack-typescript",
      title: "A Complete Guide to End-to-End Type Safety in TypeScript",
      subtitle: "Sharing types between frontend and backend with Zod validation, Prisma schemas, and typed API clients.",
      publishedAt: "2023-05-19",
      readingTime: "8 min read",
      tags: ["TypeScript", "Full-Stack", "Architecture"],
      summary: "Eliminating runtime data mismatches by enforcing contract validation at the boundaries of your application with Zod, Prisma, and type inference.",
      content: `### The Cost of Boundary Blindness

TypeScript's compiler checks types at build time, but external data sources—HTTP request payloads, query parameters, and database results—arrive as untyped JSON at runtime.

\`\`\`typescript
import { z } from 'zod';

// Shared schema: Single source of truth for runtime & static types
export const UserRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
});

export type UserRegistrationDTO = z.infer<typeof UserRegistrationSchema>;
\`\`\`

### 1. Schema-Driven Type Inference
Instead of defining TypeScript interfaces and then manually writing runtime validation checks, define Zod schemas first and infer static TypeScript types with z.infer<T>.

### 2. Boundary Verification
Validate inputs at the edge of your HTTP handlers. Once data passes boundary parsing, the inner domain services can rely on complete, verified type safety.`
    }
  ],

  experience: [
    {
      period: "2024 — Present",
      role: "Senior Systems Engineer",
      company: "Distributed Infrastructure & Cloud Platforms",
      location: "Colombo / Remote",
      description: "Architecting high-throughput data pipelines, optimizing latency-sensitive Go microservices, and leading design-system standardisation across web clients.",
      technologies: ["Go", "TypeScript", "Next.js", "Docker", "PostgreSQL", "Kafka"]
    },
    {
      period: "2022 — 2024",
      role: "Software Engineer",
      company: "Modern Web & Enterprise Solutions",
      location: "Colombo, Sri Lanka",
      description: "Engineered scalable React/Next.js frontend applications, created comprehensive component design systems, and migrated legacy monolithic endpoints to modern microservices.",
      technologies: ["React", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS", "Redis"]
    },
    {
      period: "2020 — 2022",
      role: "Associate Software Engineer",
      company: "Technology Consultancy & Research Lab",
      location: "Colombo, Sri Lanka",
      description: "Collaborated on customer-facing web applications, wrote rigorous automated test suites, and contributed to open-source developer tooling.",
      technologies: ["JavaScript", "Python", "React", "REST APIs", "Jest", "Git"]
    }
  ],

  education: [
    {
      degree: "B.Sc. (Hons) in Computer Science & Software Engineering",
      institution: "Faculty of Computing & Information Technology",
      period: "2018 — 2022",
      honors: "First Class Honors / Distinction",
      focus: [
        "Distributed Computing & Algorithms",
        "Operating Systems & Compiler Design",
        "Database Architecture & Indexing",
        "Human-Computer Interaction (HCI)"
      ]
    }
  ],

  values: [
    {
      title: "Clarity Over Cleverness",
      quote: "Simple is better than complex. Flat is better than nested.",
      explanation: "Software that is easily understood by any teammate can be safely refactored, debugged, and maintained for a decade."
    },
    {
      title: "Data Sovereignty & Privacy",
      quote: "Users should own their thoughts in open, readable file formats.",
      explanation: "Prefer open standards like Markdown, SQLite, and JSON over proprietary vendor lock-in."
    },
    {
      title: "Calm, Intentional Craft",
      quote: "Quality is not an accident; it is the deliberate choice of restraint.",
      explanation: "Reject the modern temptation of flashy, attention-seeking web gimmicks in favor of durable, fast, accessible interfaces."
    },
    {
      title: "Lifelong Scholarly Curiosity",
      quote: "Learn the fundamentals; frameworks come and go.",
      explanation: "Operating system primitives, networking stacks, and data structure fundamentals outlive any weekly JavaScript framework."
    }
  ],

  skills: [
    {
      title: "Software Engineering & Architecture",
      description: "Core architectural disciplines, design paradigms, and sound structural methodology.",
      items: [
        "Distributed Systems Design",
        "Event-Driven Architecture",
        "REST & gRPC API Design",
        "Microservices & Modular Monoliths",
        "Concurrency & Async I/O",
        "Domain-Driven Design (DDD)",
        "Database Schema Modeling"
      ]
    },
    {
      title: "Programming Languages",
      description: "Languages used for production services, systems programming, and client applications.",
      items: [
        "TypeScript",
        "JavaScript (ESNext)",
        "Go (Golang)",
        "Rust (Systems / Tooling)",
        "Python (Data & Scripting)",
        "SQL (PostgreSQL / SQLite)"
      ]
    },
    {
      title: "Web & UI Architecture",
      description: "Building fast, accessible, responsive interfaces without framework bloat.",
      items: [
        "Next.js (App Router)",
        "React 19 & Server Components",
        "Tailwind CSS & CSS Tokens",
        "Semantic HTML5 & WAI-ARIA",
        "Design Systems & Component Libraries",
        "State Management & CRDTs",
        "Performance Optimization (Core Web Vitals)"
      ]
    },
    {
      title: "Cloud, Infrastructure & DevOps",
      description: "Deploying resilient services with automated verification and observability.",
      items: [
        "Docker & Containerization",
        "Linux Server Administration",
        "CI/CD Pipelines (GitHub Actions)",
        "OpenTelemetry & Prometheus",
        "AWS (ECS, S3, RDS, CloudFront)",
        "Vercel & Edge Functions",
        "Nginx & Reverse Proxies"
      ]
    },
    {
      title: "Data & Storage Systems",
      description: "Persisting, querying, and caching data across relational and log-structured engines.",
      items: [
        "PostgreSQL (Relational)",
        "SQLite (Local-first & Embedded)",
        "Redis (In-memory Caching & PubSub)",
        "Kafka (Event Streaming)",
        "Prisma ORM & Raw SQL",
        "LSM Trees & Key-Value Engines"
      ]
    },
    {
      title: "Engineering Tools & Workflows",
      description: "Day-to-day tools for disciplined version control and collaboration.",
      items: [
        "Git & Advanced Rebasing",
        "Neovim & VS Code",
        "Postman & Insomnia",
        "Figma (UI Specs & Wireframing)",
        "Jest, Vitest & Playwright",
        "Linux Shell / Bash / Zsh"
      ]
    }
  ],

  books: [
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      category: "Engineering & Systems",
      note: "The definitive guide to distributed data reliability, replication, partitioning, and consistency models.",
      status: "Finished"
    },
    {
      title: "Structure and Interpretation of Computer Programs (SICP)",
      author: "Harold Abelson & Gerald Jay Sussman",
      category: "Engineering & Systems",
      note: "A masterclass in computational abstractions, metalinguistic abstraction, and disciplined thought.",
      status: "Re-reading"
    },
    {
      title: "Meditations",
      author: "Marcus Aurelius",
      category: "Philosophy & Thought",
      note: "Timeless stoic reflections on focus, equanimity under pressure, and personal duty.",
      status: "Finished"
    },
    {
      title: "Gödel, Escher, Bach: An Eternal Golden Braid",
      author: "Douglas Hofstadter",
      category: "Science",
      note: "A dazzling exploration of self-reference, formal systems, music, and the emergence of consciousness.",
      status: "Currently Reading"
    },
    {
      title: "The Pragmatic Programmer",
      author: "David Thomas & Andrew Hunt",
      category: "Engineering & Systems",
      note: "Enduring wisdom on treating software engineering as a continuous personal apprenticeship.",
      status: "Finished"
    },
    {
      title: "Essays of Michel de Montaigne",
      author: "Michel de Montaigne",
      category: "Literature & Essays",
      note: "Pioneering the personal essay form with candid self-examination, humility, and warmth.",
      status: "Currently Reading"
    }
  ],

  hobbies: [
    {
      category: "Acoustic Fingerstyle",
      title: "Acoustic Guitar & Music Theory",
      description: "Practicing fingerstyle guitar arrangements (DADGAD and standard tunings) and exploring modal chord progressions.",
      details: ["Taylor 214ce Grand Auditorium", "Favorite composers: Tommy Emmanuel, Pierre Bensusan"]
    },
    {
      category: "Manual Coffee",
      title: "Specialty Coffee Brewing",
      description: "The daily mindful ritual of single-origin pour-overs, calibrated grind size, water chemistry, and extraction curves.",
      details: ["Hario V60 ceramic dripper", "Comandante C40 hand grinder", "Light roast washed Ethiopian Yirgacheffe"]
    },
    {
      category: "Print & Typography",
      title: "Book Arts & Classical Typography",
      description: "Collecting beautifully typeset hardcovers from small presses (Everyman's Library, Folio Society) and studying page margins.",
      details: ["Golden canon of page proportions", "Typeface histories: Caslon, Baskerville, Bodoni"]
    },
    {
      category: "Nature & Walking",
      title: "Urban Flânerie & Hiking",
      description: "Unplugged long walks to reflect on architectural problems, observe natural geometry, and clear the mental cache.",
      details: ["Notebook & fountain pen carry", "Zero screen time walking sessions"]
    }
  ]
};
