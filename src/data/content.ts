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
      articleUrl: "/portfolio/blog/zero-dependency-web-design",
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
      articleUrl: "/portfolio/blog/resilience-in-distributed-systems",
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
      articleUrl: "/portfolio/blog/lost-art-of-readable-code",
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
      articleUrl: "/portfolio/blog/resilience-in-distributed-systems",
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
      articleUrl: "/portfolio/blog/zero-dependency-web-design",
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
