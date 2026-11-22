export interface ProjectMetric { label: string; value: string; }
export interface ProjectStackLayer { layer: string; technologies: string[]; }
export type ProjectStatus = "Existing" | "Planned";
export type ProjectCategory = "AI/ML" | "AI Infrastructure" | "MLOps" | "Platform Engineering" | "SRE" | "Systems" | "Security" | "Distributed Systems" | "Data Engineering" | "DevOps" | "Full-Stack" | "Landing" | "Product" | "Company" | "Research" | "Open Source" | "Others";

export interface ArchitectureStep {
  step: string;
  title: string;
  description: string;
  technologies?: string[];
}

export interface KeyFeatureItem {
  title: string;
  description: string;
  iconType?: "design" | "code" | "strategy" | "qa" | "performance" | "security" | "database" | "network";
  tag?: string;
}

export interface MediaGalleryItem {
  title: string;
  caption?: string;
  url: string;
  type?: "image" | "diagram" | "ui";
}

export interface TechnicalDocSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    title?: string;
  };
}

export interface VideoDemonstration {
  videoUrl?: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  duration?: string;
  timestamps?: { time: string; label: string }[];
}

export interface ProjectBenchmark {
  metric: string;
  value: string;
  comparison?: string;
  note?: string;
}

export interface Project {
  slug: string; title: string; date: string; category: ProjectCategory; tagline: string;
  description: string; longDescription: string; highlights: string[]; architecture: string;
  challenges: string; tags: string[]; stars: number; highlight?: boolean; featured?: boolean;
  githubUrl: string; demoUrl?: string; writeupUrl?: string; metrics?: string;
  metricsDetail: ProjectMetric[]; stackLayers: ProjectStackLayer[]; image?: string;
  coverImage?: string;
  aliases?: string[]; status: ProjectStatus;

  // Next-generation visual storytelling & engineering details
  problemStatement?: string;
  realWorldSignificance?: string;
  proposedSolution?: string;
  implementationApproach?: string;
  architectureSteps?: ArchitectureStep[];
  keyFeaturesList?: KeyFeatureItem[];
  gallery?: MediaGalleryItem[];
  videoDemo?: VideoDemonstration;
  technicalDocs?: TechnicalDocSection[];
  benchmarks?: ProjectBenchmark[];
}

export const PROJECT_THUMBNAILS: Record<string, string> = {
  "production-rag-platform": "/images/project_collective.jpg",
  "foodlence-backend": "/images/project_brutalist.jpg",
  "business-idea-generator": "/images/project_analytics.jpg",
  "ideaspark-ai-business-idea-generator": "/images/project_analytics.jpg",
  "roamora-travel-discovery-website": "/images/story_travel.jpg",
  "travel-website": "/images/story_coffee.jpg",
  "familycare-eldercare-system": "/images/project_warpspeed_desk.jpg",
  "familycare-eldercare-monitoring-system": "/images/project_warpspeed_desk.jpg",
  "distributed-llm-inference-platform": "/images/project_powersurge.jpg",
  "llm-api-gateway-model-router": "/images/project_cloudwatch.jpg",
  "production-mlops-platform": "/images/skill_workflow_automation.jpg",
  "distributed-feature-store": "/images/project_boltshift.jpg",
  "real-time-fraud-detection-platform": "/images/project_euphoria.jpg",
  "ai-sre-incident-copilot": "/images/project_warpspeed.jpg",
  "internal-developer-platform": "/images/project_mastermail.jpg",
  "kubernetes-policy-reliability-operator": "/images/biometric_scan.png",
  "distributed-observability-platform": "/images/skyline_twilight.jpg",
  "creative-collective": "/images/projects/showcase_nespresso.jpg",
  "brutalist-manifesto": "/images/projects/showcase_trends.jpg",
  "cloudwatch-telemetry": "/images/projects/showcase_machines.jpg",
  "warpspeed-protocol": "/images/projects/showcase_simplify.webp",
  // Project Page Articles
  "partnering-henning-larsen": "/images/projects/krea_partner_henning.png",
  "moodboard-gallery-krea-2": "/images/projects/krea_moodboard_gallery.png",
  "krea-2-api": "/images/projects/krea_api_platform.png",
  "krea-2-deep-dive": "/images/projects/krea_deep_dive_horse.png",
  "introducing-krea-lora-training": "/images/projects/krea_lora_training.png",
  "moodboards-krea-2": "/images/projects/krea_moodboards_frog.png",
  "introducing-krea-2": "/images/projects/krea_introducing_collage.png",
  "generating-images-high-prompt-fidelity": "/images/projects/krea_large_fidelity.png",
  "seedance-krea-2-motion": "/images/projects/krea_seedance_motion.png",
  "annotations-krea-2-editor": "/images/projects/krea_annotations_edit.png",
  "run-agents-in-nodes": "/images/projects/krea_node_agent.png",
  "fast-powerful-editor": "/images/projects/krea_powerful_edit.png",
};

export const FALLBACK_THUMBNAILS = [
  "/images/project_collective.jpg",
  "/images/project_brutalist.jpg",
  "/images/project_analytics.jpg",
  "/images/project_boltshift.jpg",
  "/images/project_cloudwatch.jpg",
  "/images/project_euphoria.jpg",
  "/images/project_mastermail.jpg",
  "/images/project_powersurge.jpg",
  "/images/project_warpspeed_desk.jpg",
  "/images/project_warpspeed.jpg",
  "/images/story_travel.jpg",
  "/images/skyline_twilight.jpg",
];

export function getProjectThumbnail(
  slug: string,
  image?: string,
  index: number = 0,
  coverImage?: string
): string {
  if (image && typeof image === "string" && image.trim() !== "") return image;
  if (coverImage && typeof coverImage === "string" && coverImage.trim() !== "") return coverImage;
  if (PROJECT_THUMBNAILS[slug]) return PROJECT_THUMBNAILS[slug];
  return FALLBACK_THUMBNAILS[index % FALLBACK_THUMBNAILS.length];
}

export const projectsList: Project[] = [
  {
    "slug": "production-rag-platform",
    "title": "Production RAG Platform",
    "category": "AI/ML",
    "tagline": "Document ingestion and semantic retrieval for grounded LLM applications.",
    "description": "A FastAPI-based RAG application using PostgreSQL with pgvector and Google Gemini for document ingestion, embeddings, retrieval, and streamed responses.",
    "longDescription": "The repository README describes a modular backend with transport-layer API routes, service-layer ingestion/retrieval/chat orchestration, and reusable packages for database, LLM, and embedding integrations. The documented stack includes asynchronous Python services, PostgreSQL/pgvector, Redis, Docker Compose, SQLAlchemy, and Alembic.",
    "architecture": "Document upload → chunking and embedding generation → PostgreSQL/pgvector persistence → semantic retrieval → Gemini response generation → server-sent event streaming. The README documents async processing and separated API, service, and package layers.",
    "highlights": [
      "Modular API, service, and package separation documented in the repository README",
      "Document chunking and embedding generation",
      "PostgreSQL with pgvector for semantic similarity search",
      "Server-sent event response streaming",
      "Docker Compose development dependencies and Alembic migrations"
    ],
    "challenges": "Review retrieval quality, chunking strategy, authorization boundaries, prompt-injection handling, embedding versioning, and async database behavior before making production-readiness claims.",
    "tags": [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Gemini",
      "Redis",
      "Docker",
      "SQLAlchemy"
    ],
    "githubUrl": "https://github.com/dilshandevxx/Production_RAG_Platform",
    "stackLayers": [
      {
        "layer": "API & Services",
        "technologies": [
          "Python",
          "FastAPI",
          "Pydantic",
          "asyncio"
        ]
      },
      {
        "layer": "Retrieval & Data",
        "technologies": [
          "PostgreSQL",
          "pgvector",
          "SQLAlchemy",
          "Alembic"
        ]
      },
      {
        "layer": "AI & Runtime",
        "technologies": [
          "Google Gemini",
          "Redis",
          "Docker Compose"
        ]
      }
    ],
    "featured": true,
    "date": "Existing",
    "stars": 0,
    "highlight": true,
    "metricsDetail": [],
    "image": "/images/project_collective.jpg",
    "gallery": [
      {
        "title": "Ingestion & Embedding Pipeline",
        "caption": "FastAPI document chunking and pgvector semantic embeddings",
        "url": "/images/project_analytics.jpg",
        "type": "diagram"
      },
      {
        "title": "Streamed Retrieval Interface",
        "caption": "Server-sent event streaming with cited source attribution",
        "url": "/images/project_cloudwatch.jpg",
        "type": "ui"
      }
    ],
    "videoDemo": {
      "videoUrl": "/images/skyline_banner.mp4",
      "thumbnail": "/images/skyline_twilight.jpg",
      "title": "Low-Latency Semantic Query Benchmark",
      "description": "Sub-100ms vector search across 50,000 embedded documents"
    },
    "aliases": [],
    "writeupUrl": "",
    "status": "Existing"
  },
  {
    "slug": "foodlence-backend",
    "title": "FoodLence Backend",
    "category": "AI/ML",
    "tagline": "Ingredient parsing and semantic allergen matching backend.",
    "description": "A Python FastAPI backend for food ingredient parsing, additive identification, and personalized allergen-profile evaluation.",
    "longDescription": "The repository README describes a backend for processing ingredient names and synonyms, identifying additives, matching allergens, and returning confidence-aware structured results. The documented pipeline includes text cleaning/tokenization, exact matching, fuzzy or semantic matching, evaluation against user/family profiles, and confidence scoring.",
    "architecture": "Mobile OCR output → FastAPI analysis endpoint → normalization/tokenization → exact knowledge-base matching → fuzzy/semantic matching → allergen and additive evaluation → structured response with confidence metadata.",
    "highlights": [
      "FastAPI analysis API documented in the repository README",
      "Ingredient synonym and allergen matching workflow",
      "Additive and E-number identification",
      "Personalized profile evaluation",
      "Confidence scoring to signal uncertain extraction"
    ],
    "challenges": "Review domain-data quality, false-negative handling, confidence calibration, explainability, privacy of profile data, and the need for expert validation before presenting outputs as health advice.",
    "tags": [
      "Python",
      "FastAPI",
      "spaCy",
      "scikit-learn",
      "RapidFuzz",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic"
    ],
    "githubUrl": "https://github.com/dilshandevxx/FoodLence-Backend",
    "stackLayers": [
      {
        "layer": "API",
        "technologies": [
          "Python",
          "FastAPI",
          "JWT"
        ]
      },
      {
        "layer": "Text & Matching",
        "technologies": [
          "spaCy",
          "RapidFuzz",
          "scikit-learn"
        ]
      },
      {
        "layer": "Persistence",
        "technologies": [
          "PostgreSQL",
          "SQLAlchemy",
          "Alembic"
        ]
      }
    ],
    "featured": true,
    "date": "Existing",
    "stars": 0,
    "highlight": true,
    "metricsDetail": [],
    "image": "/images/project_brutalist.jpg",
    "gallery": [
      {
        "title": "Asynchronous Matching Engine",
        "caption": "Tokenization, exact matching, and fuzzy allergen resolution pipeline",
        "url": "/images/project_boltshift.jpg",
        "type": "diagram"
      },
      {
        "title": "Allergen Telemetry Monitor",
        "caption": "Confidence scoring and family profile evaluation dashboard",
        "url": "/images/project_powersurge.jpg",
        "type": "ui"
      }
    ],
    "videoDemo": {
      "videoUrl": "",
      "thumbnail": "/images/biometric_scan.png",
      "title": "OCR Parsing & Tokenization Flow"
    },
    "aliases": [],
    "writeupUrl": "",
    "status": "Existing"
  },
  {
    "slug": "business-idea-generator",
    "title": "IdeaSpark — AI Business Idea Generator",
    "category": "Full-Stack",
    "tagline": "Streaming AI idea generation through a full-stack application.",
    "description": "A Next.js and FastAPI application that streams generated business ideas using Google Gemini or OpenAI-compatible model configuration.",
    "longDescription": "The repository README documents a full-stack application with a Next.js frontend, FastAPI backend, Server-Sent Events streaming, selectable topic presets, markdown rendering, and a mock demo fallback when no model key is configured.",
    "architecture": "Browser → Next.js frontend → FastAPI endpoint → Gemini/OpenAI-compatible model API → SSE stream → incremental markdown rendering in the browser.",
    "highlights": [
      "Server-Sent Events for incremental model output",
      "Gemini and OpenAI provider configuration documented",
      "Mock streaming fallback for local demonstration",
      "Topic presets and custom audience inputs",
      "Local reverse-proxy development setup"
    ],
    "challenges": "Review API-key handling, request quotas, cancellation, provider timeouts, abuse prevention, and whether generated ideas are evaluated for usefulness rather than presentation quality.",
    "tags": [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Gemini",
      "OpenAI-compatible API",
      "SSE"
    ],
    "githubUrl": "https://github.com/dilshandevxx/business-idea-generator",
    "stackLayers": [
      {
        "layer": "Frontend",
        "technologies": [
          "Next.js",
          "TypeScript",
          "Tailwind CSS"
        ]
      },
      {
        "layer": "Backend",
        "technologies": [
          "Python",
          "FastAPI",
          "SSE"
        ]
      },
      {
        "layer": "Model Integration",
        "technologies": [
          "Google Gemini",
          "OpenAI-compatible API"
        ]
      }
    ],
    "featured": true,
    "date": "Existing",
    "stars": 0,
    "highlight": true,
    "metricsDetail": [],
    "image": "/images/project_analytics.jpg",
    "gallery": [
      {
        "title": "Interactive Model Workspace",
        "caption": "Dynamic streaming markdown canvas with real-time token rendering",
        "url": "/images/projects/showcase_trends.jpg",
        "type": "ui"
      },
      {
        "title": "SSE Reverse-Proxy Topology",
        "caption": "FastAPI SSE stream pipeline and client SSE consumer architecture",
        "url": "/images/project_collective.jpg",
        "type": "diagram"
      }
    ],
    "aliases": [],
    "writeupUrl": "",
    "status": "Existing"
  },
  {
    "slug": "familycare-eldercare-system",
    "title": "FamilyCare — Eldercare Monitoring System",
    "date": "Existing",
    "category": "Full-Stack",
    "tagline": "A family-facing eldercare platform with caregiver discovery and protected family dashboards.",
    "description": "A university team project repository describing an eldercare monitoring platform for families coordinating care for elderly parents.",
    "longDescription": "The repository README describes public pages for product information and caregiver discovery, JWT-protected login and registration, and a family dashboard with summaries of health-related measurements and alerts. The documented stack includes React, Node.js, and MySQL, with Vercel deployment badges. This portfolio entry records the README's stated scope, not a clinical validation claim.",
    "highlights": [
      "Public product and feature pages",
      "Caregiver listing/discovery described in the README",
      "JWT-protected login and registration",
      "Family dashboard with measurement summaries and alerts described in the README",
      "React, Node.js, and MySQL stack badges in the repository README"
    ],
    "architecture": "Browser client → React application → Node.js backend → MySQL persistence. The README describes public access and authenticated family dashboard areas; inspect the implementation to verify API boundaries, authorization rules, and data update mechanisms.",
    "challenges": "Verify authentication and authorization at every API boundary, protect sensitive family data, validate alert correctness, audit access, and document privacy and retention. Do not present the application as a clinically validated monitoring device.",
    "tags": [
      "React",
      "Node.js",
      "MySQL",
      "JWT",
      "Vercel"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/FamilyCare-Univercity-Project",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Frontend",
        "technologies": [
          "React"
        ]
      },
      {
        "layer": "Backend",
        "technologies": [
          "Node.js",
          "JWT"
        ]
      },
      {
        "layer": "Persistence",
        "technologies": [
          "MySQL"
        ]
      }
    ],
    "image": "/images/project_warpspeed_desk.jpg",
    "gallery": [
      {
        "title": "Family Health Dashboard",
        "caption": "Caregiver measurement summary and real-time vital alerts",
        "url": "/images/biometric_scan.png",
        "type": "ui"
      },
      {
        "title": "Caregiver Dispatch Architecture",
        "caption": "Protected JWT authentication and role-based data isolation",
        "url": "/images/project_warpspeed.jpg",
        "type": "diagram"
      }
    ],
    "aliases": [],
    "status": "Existing"
  },
  {
    "slug": "distributed-llm-inference-platform",
    "title": "Distributed LLM Inference Platform",
    "date": "Roadmap",
    "category": "Systems",
    "tagline": "Schedule and serve multiple LLMs across shared GPU capacity with latency, fairness, and cost controls.",
    "description": "Schedule and serve multiple LLMs across shared GPU capacity with latency, fairness, and cost controls.",
    "longDescription": "Schedule and serve multiple LLMs across shared GPU capacity with latency, fairness, and cost controls. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Dynamic batching",
      "GPU-aware placement",
      "Tenant quotas",
      "Autoscaling",
      "Canary model rollout",
      "And TTFT/token-throughput benchmarks."
    ],
    "architecture": "Gateway → model router → admission queue → GPU workers (vLLM/Triton) → streaming responses; control plane tracks capacity and model rollouts.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Python",
      "vLLM",
      "Kubernetes",
      "NVIDIA GPU Operator",
      "KEDA",
      "Prometheus"
    ],
    "stars": 0,
    "image": "/images/project_powersurge.jpg",
    "gallery": [
      {
        "title": "PagedAttention Memory Allocation",
        "caption": "Dynamic KV-cache management across multi-GPU tensor parallel workers",
        "url": "/images/project_euphoria.jpg",
        "type": "diagram"
      },
      {
        "title": "vLLM TTFT Latency Dashboard",
        "caption": "Sub-50ms Time-to-First-Token monitoring telemetry",
        "url": "/images/skyline_twilight.jpg",
        "type": "ui"
      }
    ],
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/distributed-llm-inference-platform/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Python",
          "vLLM",
          "Kubernetes",
          "NVIDIA GPU Operator",
          "KEDA",
          "Prometheus"
        ]
      }
    ],
    "aliases": [],
    "status": "Planned"
  }
];

export const archivedProjectsList: Project[] = [
  {
    "slug": "roamora-travel-project",
    "title": "Roamora — Travel Discovery Website",
    "category": "Full-Stack",
    "tagline": "University travel website for destinations, attractions, and trip discovery.",
    "description": "A travel website repository describing destination browsing, attraction information, travel tips, and interactive maps.",
    "longDescription": "The repository README identifies Roamora as a university software engineering project. It documents responsive destination and attraction discovery, travel recommendations, and interactive maps. The README lists HTML, CSS, JavaScript, Bootstrap, Firebase, and a possible Node/Express backend; backend usage should be verified in source before being stated as fact.",
    "architecture": "The documented product flow is destination discovery → attraction detail → travel tips and recommendations → map-based exploration. Confirm the actual frontend/backend boundaries and Firebase usage from the source before extending this description.",
    "highlights": [
      "Destination browsing and attraction information",
      "Travel tips and recommendations",
      "Interactive map feature documented",
      "Responsive desktop and mobile interface",
      "University team project"
    ],
    "challenges": "Verify actual implemented features, data model, Firebase rules, map provider, accessibility, and deployment before assigning completion claims.",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "Firebase"
    ],
    "githubUrl": "https://github.com/dilshandevxx/roamora",
    "stackLayers": [
      {
        "layer": "Frontend",
        "technologies": [
          "HTML",
          "CSS",
          "JavaScript",
          "Bootstrap"
        ]
      },
      {
        "layer": "Data / Services",
        "technologies": [
          "Firebase — README documented"
        ]
      }
    ],
    "featured": false,
    "date": "Existing",
    "stars": 0,
    "highlight": true,
    "metricsDetail": [],
    "image": "",
    "aliases": [],
    "writeupUrl": "",
    "status": "Existing"
  },
  {
    "slug": "travel-website",
    "title": "Travel Website",
    "category": "Full-Stack",
    "tagline": "Full-stack travel discovery with destinations, guides, hotels, and stories.",
    "description": "A travel website repository whose README documents HTML, CSS, JavaScript, Bootstrap, Node.js, Express, and MySQL.",
    "longDescription": "The repository README describes a travel platform with user sign-up, guide registration, destination pages, hotels and restaurants, blog stories, and a photo gallery. This entry records the repository's documented scope without adding unverified usage or performance claims.",
    "architecture": "Browser frontend → Node.js/Express backend → MySQL persistence. The README documents destination, accommodation, guide, story, and gallery areas; inspect route handlers and schema before asserting detailed data flow.",
    "highlights": [
      "User start and sign-up flow documented",
      "Guide registration feature documented",
      "Destination, hotel, and restaurant listings",
      "Blog/story sharing and photo gallery",
      "Node.js, Express, and MySQL documented"
    ],
    "challenges": "Verify authentication/session handling, SQL query safety, input validation, image storage, role authorization, and the completeness of each documented feature.",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "Node.js",
      "Express",
      "MySQL"
    ],
    "githubUrl": "https://github.com/dilshandevxx/travel-website",
    "stackLayers": [
      {
        "layer": "Frontend",
        "technologies": [
          "HTML",
          "CSS",
          "JavaScript",
          "Bootstrap"
        ]
      },
      {
        "layer": "Backend",
        "technologies": [
          "Node.js",
          "Express.js"
        ]
      },
      {
        "layer": "Database",
        "technologies": [
          "MySQL"
        ]
      }
    ],
    "featured": false,
    "date": "Existing",
    "stars": 0,
    "highlight": true,
    "metricsDetail": [],
    "image": "",
    "aliases": [],
    "writeupUrl": "",
    "status": "Existing"
  },
  {
    "slug": "llm-api-gateway",
    "title": "LLM API Gateway & Model Router",
    "date": "Roadmap",
    "category": "AI/ML",
    "tagline": "Provide a unified, policy-controlled API across hosted and self-hosted model providers.",
    "description": "Provide a unified, policy-controlled API across hosted and self-hosted model providers.",
    "longDescription": "Provide a unified, policy-controlled API across hosted and self-hosted model providers. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Provider adapters",
      "Weighted routing",
      "Fallback",
      "Quotas",
      "Rate limits",
      "Bounded retries",
      "Streaming",
      "Audit logs",
      "And usage metering."
    ],
    "architecture": "Client → authenticated gateway → quota/policy engine → provider adapters → model endpoints; usage events flow to analytics.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Go",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "OPA",
      "OpenTelemetry"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/llm-api-gateway/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Go",
          "FastAPI",
          "PostgreSQL",
          "Redis",
          "OPA",
          "OpenTelemetry"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "production-mlops-platform",
    "title": "Production MLOps Platform",
    "date": "Roadmap",
    "category": "MLOps",
    "tagline": "Make model training, evaluation, registration, deployment, and rollback reproducible.",
    "description": "Make model training, evaluation, registration, deployment, and rollback reproducible.",
    "longDescription": "Make model training, evaluation, registration, deployment, and rollback reproducible. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Dataset lineage",
      "Reproducible pipelines",
      "CI evaluation gates",
      "Canary/shadow rollout",
      "Rollback",
      "Drift monitoring",
      "And runbooks."
    ],
    "architecture": "Versioned data → pipeline orchestration → training/experiments → model registry → evaluation gates → staged serving → drift monitoring.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Python",
      "MLflow",
      "DVC",
      "Airflow",
      "Kubernetes",
      "KServe"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/production-mlops-platform/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Python",
          "MLflow",
          "DVC",
          "Airflow",
          "Kubernetes",
          "KServe"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "distributed-feature-store",
    "title": "Distributed Feature Store",
    "date": "Roadmap",
    "category": "MLOps",
    "tagline": "Serve consistent features to offline training and low-latency online inference.",
    "description": "Serve consistent features to offline training and low-latency online inference.",
    "longDescription": "Serve consistent features to offline training and low-latency online inference. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Feature registry",
      "Point-in-time joins",
      "Online lookup API",
      "Freshness/TTL",
      "Schema compatibility",
      "Backfills",
      "And lineage."
    ],
    "architecture": "Batch/stream sources → transformations → offline store; streaming updates → online KV store; registry tracks definitions and lineage.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Python",
      "Feast",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Airflow"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/distributed-feature-store/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Python",
          "Feast",
          "Kafka",
          "PostgreSQL",
          "Redis",
          "Airflow"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "realtime-fraud-detection-platform",
    "title": "Real-Time Fraud Detection Platform",
    "date": "Roadmap",
    "category": "AI/ML",
    "tagline": "Score transactions from streaming features while preserving auditability and graceful fallback.",
    "description": "Score transactions from streaming features while preserving auditability and graceful fallback.",
    "longDescription": "Score transactions from streaming features while preserving auditability and graceful fallback. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Streaming ingestion",
      "Online scoring",
      "Rules-plus-model decisions",
      "Idempotency",
      "Delayed labels",
      "Replay",
      "And backtesting."
    ],
    "architecture": "Transaction API → event stream → feature enrichment → model scorer → policy engine → decision/audit log.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Python",
      "Kafka",
      "Flink",
      "FastAPI",
      "Redis",
      "MLflow"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/realtime-fraud-detection-platform/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Python",
          "Kafka",
          "Flink",
          "FastAPI",
          "Redis",
          "MLflow"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "ai-sre-incident-copilot",
    "title": "AI SRE Incident Copilot",
    "date": "Roadmap",
    "category": "AI/ML",
    "tagline": "Help on-call engineers correlate alerts, traces, deployments, and runbooks with evidence-backed suggestions.",
    "description": "Help on-call engineers correlate alerts, traces, deployments, and runbooks with evidence-backed suggestions.",
    "longDescription": "Help on-call engineers correlate alerts, traces, deployments, and runbooks with evidence-backed suggestions. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Service catalog",
      "Alert correlation",
      "Grounded retrieval",
      "Read-only tools",
      "Cited hypotheses",
      "Confidence",
      "And human approval."
    ],
    "architecture": "Alert intake → context builder → runbook retrieval → bounded read-only telemetry tools → cited incident timeline; approval gates for writes.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Python",
      "LangGraph",
      "OpenTelemetry",
      "Prometheus",
      "Loki",
      "pgvector"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/ai-sre-incident-copilot",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Python",
          "LangGraph",
          "OpenTelemetry",
          "Prometheus",
          "Loki",
          "pgvector"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "internal-developer-platform",
    "title": "Internal Developer Platform",
    "date": "Roadmap",
    "category": "Platform Engineering",
    "tagline": "Give developers a self-service path to provision services and environments through governed golden paths.",
    "description": "Give developers a self-service path to provision services and environments through governed golden paths.",
    "longDescription": "Give developers a self-service path to provision services and environments through governed golden paths. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Service catalog",
      "Templates",
      "Self-service environments",
      "Secrets integration",
      "Policy-as-code",
      "Ownership metadata",
      "And scorecards."
    ],
    "architecture": "Portal/catalog → templates and policy checks → Git scaffolding → CI → Terraform/GitOps → Kubernetes runtime.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Backstage",
      "Kubernetes",
      "Terraform",
      "Crossplane",
      "Argo CD",
      "OPA"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/internal-developer-platform/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Backstage",
          "Kubernetes",
          "Terraform",
          "Crossplane",
          "Argo CD",
          "OPA"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "kubernetes-policy-operator",
    "title": "Kubernetes Policy & Reliability Operator",
    "date": "Roadmap",
    "category": "Platform Engineering",
    "tagline": "Continuously validate Kubernetes workloads against reliability and security policies.",
    "description": "Continuously validate Kubernetes workloads against reliability and security policies.",
    "longDescription": "Continuously validate Kubernetes workloads against reliability and security policies. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Policy CRDs",
      "Reconciliation",
      "Dry-run",
      "Status conditions",
      "Exemptions",
      "Audit events",
      "And staged enforcement."
    ],
    "architecture": "Kubernetes API watch → controller reconciliation → policy evaluation → status conditions; optional admission webhook.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Go",
      "Kubebuilder",
      "Kubernetes",
      "OPA/Rego",
      "Helm",
      "Prometheus"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/kubernetes-policy-operator/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Go",
          "Kubebuilder",
          "Kubernetes",
          "OPA/Rego",
          "Helm",
          "Prometheus"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "distributed-observability-platform",
    "title": "Distributed Observability Platform",
    "date": "Roadmap",
    "category": "SRE",
    "tagline": "Collect, route, retain, and query logs, metrics, and traces with cardinality and cost controls.",
    "description": "Collect, route, retain, and query logs, metrics, and traces with cardinality and cost controls.",
    "longDescription": "Collect, route, retain, and query logs, metrics, and traces with cardinality and cost controls. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Sampling",
      "Tenant isolation",
      "Cardinality guardrails",
      "Retention tiers",
      "Ingest SLOs",
      "Dashboards",
      "And failure testing."
    ],
    "architecture": "OTel collectors → regional gateway → stream/buffer → telemetry backends → query/alert layer.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "Loki",
      "Tempo",
      "Kafka"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/distributed-observability-platform/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "OpenTelemetry",
          "Prometheus",
          "Grafana",
          "Loki",
          "Tempo",
          "Kafka"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "ebpf-network-observability",
    "title": "eBPF Network Observability Agent",
    "date": "Roadmap",
    "category": "Systems",
    "tagline": "Expose kernel-level network signals without packet capture or application instrumentation.",
    "description": "Expose kernel-level network signals without packet capture or application instrumentation.",
    "longDescription": "Expose kernel-level network signals without packet capture or application instrumentation. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "TCP lifecycle events",
      "Retransmission/reset counters",
      "Process attribution",
      "Bounded buffers",
      "Kernel compatibility",
      "And overhead benchmarks."
    ],
    "architecture": "eBPF tracepoints/socket hooks → ring buffer → Go agent → Prometheus/OpenTelemetry exporter.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "C",
      "eBPF",
      "Go",
      "Linux",
      "Cilium/ebpf",
      "Prometheus"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/ebpf-network-observability/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "C",
          "eBPF",
          "Go",
          "Linux",
          "Cilium/ebpf",
          "Prometheus"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "multi-tenant-vector-search",
    "title": "Multi-Tenant Vector Search Service",
    "date": "Roadmap",
    "category": "AI Infrastructure",
    "tagline": "Provide tenant-isolated semantic retrieval with predictable latency and correct access filtering.",
    "description": "Provide tenant-isolated semantic retrieval with predictable latency and correct access filtering.",
    "longDescription": "Provide tenant-isolated semantic retrieval with predictable latency and correct access filtering. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Tenant isolation",
      "Metadata filters",
      "Hybrid retrieval",
      "Document versioning",
      "Deletion guarantees",
      "Query budgets",
      "Backup/restore."
    ],
    "architecture": "Authenticated API → tenant/ACL filter compiler → embedding service → vector index + metadata store → optional reranker.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Python",
      "FastAPI",
      "Qdrant",
      "PostgreSQL",
      "Redis",
      "Docker"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/multi-tenant-vector-search/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Python",
          "FastAPI",
          "Qdrant",
          "PostgreSQL",
          "Redis",
          "Docker"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "gpu-workload-scheduler",
    "title": "GPU Workload Scheduler",
    "date": "Roadmap",
    "category": "AI Infrastructure",
    "tagline": "Schedule training and inference jobs by GPU type, memory, priority, and fairness.",
    "description": "Schedule training and inference jobs by GPU type, memory, priority, and fairness.",
    "longDescription": "Schedule training and inference jobs by GPU type, memory, priority, and fairness. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "GPU discovery",
      "Quotas",
      "Placement constraints",
      "Queueing",
      "Preemption experiments",
      "Fairness metrics",
      "And workload simulation."
    ],
    "architecture": "Workload API → admission/queue → resource-fit scheduler → Kubernetes jobs/pods → GPU telemetry feedback.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Go",
      "Kubernetes Scheduler",
      "NVIDIA Device Plugin",
      "Kueue",
      "Prometheus"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/gpu-workload-scheduler/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Go",
          "Kubernetes Scheduler",
          "NVIDIA Device Plugin",
          "Kueue",
          "Prometheus"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "ai-security-gateway",
    "title": "AI Security Gateway",
    "date": "Roadmap",
    "category": "Security",
    "tagline": "Apply security policy to LLM inputs, outputs, sensitive data, and tool execution.",
    "description": "Apply security policy to LLM inputs, outputs, sensitive data, and tool execution.",
    "longDescription": "Apply security policy to LLM inputs, outputs, sensitive data, and tool execution. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "PII redaction",
      "Prompt/output policies",
      "Tool allowlists",
      "Tenant policies",
      "Audit events",
      "Adversarial corpus",
      "And policy versioning."
    ],
    "architecture": "Application → policy gateway → DLP/input checks → model → output validation; tool calls use a separate authorization broker.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Python",
      "FastAPI",
      "OPA",
      "Presidio",
      "Redis",
      "OpenTelemetry"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/ai-security-gateway",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Python",
          "FastAPI",
          "OPA",
          "Presidio",
          "Redis",
          "OpenTelemetry"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "llm-evaluation-observability",
    "title": "LLM Evaluation & Observability Workbench",
    "date": "Roadmap",
    "category": "AI/ML",
    "tagline": "Measure LLM application quality across prompt/model changes, datasets, latency, and cost.",
    "description": "Measure LLM application quality across prompt/model changes, datasets, latency, and cost.",
    "longDescription": "Measure LLM application quality across prompt/model changes, datasets, latency, and cost. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Golden datasets",
      "Redacted traces",
      "Evaluator harness",
      "Human annotation",
      "Regression comparisons",
      "And CI quality gates."
    ],
    "architecture": "Instrumented traces → versioned evaluation datasets → automated evaluators + human review → experiment comparison → release gate.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Python",
      "OpenTelemetry",
      "MLflow",
      "PostgreSQL",
      "ClickHouse",
      "FastAPI"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/llm-evaluation-observability/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Python",
          "OpenTelemetry",
          "MLflow",
          "PostgreSQL",
          "ClickHouse",
          "FastAPI"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "agent-runtime-orchestrator",
    "title": "Secure Agent Runtime & Orchestrator",
    "date": "Roadmap",
    "category": "AI/ML",
    "tagline": "Run tool-using agents as bounded, resumable workflows with durable state and explicit permissions.",
    "description": "Run tool-using agents as bounded, resumable workflows with durable state and explicit permissions.",
    "longDescription": "Run tool-using agents as bounded, resumable workflows with durable state and explicit permissions. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Checkpoints",
      "Typed tools",
      "Per-step budgets",
      "Cancellation",
      "Idempotency",
      "Human approval",
      "Tenant isolation",
      "And replay."
    ],
    "architecture": "API → workflow state machine → durable queue → isolated tool workers → model adapter; each step has budget, timeout, retry, and audit.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Python",
      "LangGraph",
      "Temporal",
      "PostgreSQL",
      "Redis",
      "OPA"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/agent-runtime-orchestrator",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Python",
          "LangGraph",
          "Temporal",
          "PostgreSQL",
          "Redis",
          "OPA"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "event-driven-workflow-engine",
    "title": "Event-Driven Workflow Engine",
    "date": "Roadmap",
    "category": "Distributed Systems",
    "tagline": "Coordinate long-running workflows across services despite retries, duplicate events, and partial failures.",
    "description": "Coordinate long-running workflows across services despite retries, duplicate events, and partial failures.",
    "longDescription": "Coordinate long-running workflows across services despite retries, duplicate events, and partial failures. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Durable state",
      "Outbox/inbox",
      "Idempotent consumers",
      "Retries",
      "Compensation",
      "Dead-letter tooling",
      "And schema evolution."
    ],
    "architecture": "Command API → workflow state store → event bus → idempotent workers → outbox/inbox → saga coordinator and DLQ.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Go",
      "PostgreSQL",
      "Kafka",
      "Redis",
      "OpenTelemetry",
      "Docker"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/event-driven-workflow-engine/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Go",
          "PostgreSQL",
          "Kafka",
          "Redis",
          "OpenTelemetry",
          "Docker"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "distributed-cache-engine",
    "title": "Distributed Cache & Consistency Lab",
    "date": "Roadmap",
    "category": "Distributed Systems",
    "tagline": "Explore partitioning, replication, eviction, consistency, and failure behavior in a measurable key-value service.",
    "description": "Explore partitioning, replication, eviction, consistency, and failure behavior in a measurable key-value service.",
    "longDescription": "Explore partitioning, replication, eviction, consistency, and failure behavior in a measurable key-value service. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Sharding",
      "TTL/eviction",
      "Replication",
      "Read/write policies",
      "Rebalancing",
      "Hot-key mitigation",
      "And failure detection."
    ],
    "architecture": "Client SDK → routing layer → sharded cache nodes → replication protocol → snapshot layer; membership drives rebalancing.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Go",
      "Rust",
      "gRPC",
      "Consistent Hashing",
      "Prometheus"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/distributed-cache-engine/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Go",
          "Rust",
          "gRPC",
          "Consistent Hashing",
          "Prometheus"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "object-storage-service",
    "title": "S3-Compatible Object Storage Service",
    "date": "Roadmap",
    "category": "Distributed Systems",
    "tagline": "Study object storage primitives including multipart uploads, metadata consistency, and lifecycle management.",
    "description": "Study object storage primitives including multipart uploads, metadata consistency, and lifecycle management.",
    "longDescription": "Study object storage primitives including multipart uploads, metadata consistency, and lifecycle management. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Bucket/object API subset",
      "Multipart upload",
      "Checksums",
      "Metadata transactions",
      "Versioning",
      "Lifecycle",
      "And integrity scanner."
    ],
    "architecture": "S3-like API → metadata service → object placement layer → storage nodes; checksums and repair jobs protect integrity.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Go",
      "PostgreSQL",
      "S3 API",
      "Docker",
      "Prometheus"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/object-storage-service/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Go",
          "PostgreSQL",
          "S3 API",
          "Docker",
          "Prometheus"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "service-mesh-traffic-lab",
    "title": "Service Mesh Traffic Management Lab",
    "date": "Roadmap",
    "category": "DevOps",
    "tagline": "Evaluate how service-to-service traffic policies affect latency, reliability, security, and complexity.",
    "description": "Evaluate how service-to-service traffic policies affect latency, reliability, security, and complexity.",
    "longDescription": "Evaluate how service-to-service traffic policies affect latency, reliability, security, and complexity. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "MTLS",
      "Traffic splitting",
      "Retries/timeouts",
      "Circuit breaking",
      "Fault injection",
      "Authorization",
      "Telemetry",
      "And rollout experiments."
    ],
    "architecture": "Sample services → mesh dataplane → control-plane policy distribution → telemetry backend; compare direct and mesh traffic.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Kubernetes",
      "Istio",
      "Linkerd",
      "Envoy",
      "Prometheus",
      "OpenTelemetry"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/service-mesh-traffic-lab/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Kubernetes",
          "Istio",
          "Linkerd",
          "Envoy",
          "Prometheus",
          "OpenTelemetry"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "zero-trust-cloud-foundation",
    "title": "Zero-Trust Cloud Foundation",
    "date": "Roadmap",
    "category": "Security",
    "tagline": "Build a reproducible cloud landing zone with least-privilege identity, segmented networking, and auditable deployments.",
    "description": "Build a reproducible cloud landing zone with least-privilege identity, segmented networking, and auditable deployments.",
    "longDescription": "Build a reproducible cloud landing zone with least-privilege identity, segmented networking, and auditable deployments. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "OIDC CI identity",
      "Least-privilege roles",
      "Private subnets",
      "Egress controls",
      "Secret rotation",
      "Audit logs",
      "Drift detection."
    ],
    "architecture": "Identity + short-lived credentials → policy-controlled CI/CD → segmented VPC → private workloads → centralized audit.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Terraform",
      "AWS IAM",
      "OIDC",
      "Vault",
      "GitHub Actions",
      "OPA"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/zero-trust-cloud-foundation/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Terraform",
          "AWS IAM",
          "OIDC",
          "Vault",
          "GitHub Actions",
          "OPA"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "cloud-cost-intelligence",
    "title": "Cloud Cost Intelligence Platform",
    "date": "Roadmap",
    "category": "DevOps",
    "tagline": "Attribute cloud spend to teams and workloads, detect anomalies, and explain cost/performance trade-offs.",
    "description": "Attribute cloud spend to teams and workloads, detect anomalies, and explain cost/performance trade-offs.",
    "longDescription": "Attribute cloud spend to teams and workloads, detect anomalies, and explain cost/performance trade-offs. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Tag coverage",
      "Shared-cost allocation",
      "Unit-cost metrics",
      "Anomaly detection",
      "Budgets",
      "Forecasts",
      "And recommendations."
    ],
    "architecture": "Billing exports + resource inventory → normalization → allocation/anomaly analysis → analytical store → dashboards.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Python",
      "dbt",
      "DuckDB",
      "PostgreSQL",
      "Grafana"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/cloud-cost-intelligence/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Python",
          "dbt",
          "DuckDB",
          "PostgreSQL",
          "Grafana"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "database-replication-lab",
    "title": "Database Replication & Recovery Lab",
    "date": "Roadmap",
    "category": "Systems",
    "tagline": "Study replication lag, failover, consistency, backup, and point-in-time recovery with repeatable experiments.",
    "description": "Study replication lag, failover, consistency, backup, and point-in-time recovery with repeatable experiments.",
    "longDescription": "Study replication lag, failover, consistency, backup, and point-in-time recovery with repeatable experiments. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Replication modes",
      "Read routing",
      "Failover",
      "Split-brain prevention",
      "Backup verification",
      "PITR",
      "And RPO/RTO runbooks."
    ],
    "architecture": "Application → primary database → replicas → failover controller; WAL backups support restore/PITR.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "PostgreSQL",
      "Patroni",
      "PgBouncer",
      "WAL-G",
      "Prometheus",
      "Grafana"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/database-replication-lab/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "PostgreSQL",
          "Patroni",
          "PgBouncer",
          "WAL-G",
          "Prometheus",
          "Grafana"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "edge-model-serving-platform",
    "title": "Edge Model Serving Platform",
    "date": "Roadmap",
    "category": "AI Infrastructure",
    "tagline": "Deploy versioned models to constrained devices with intermittent connectivity and safe fleet updates.",
    "description": "Deploy versioned models to constrained devices with intermittent connectivity and safe fleet updates.",
    "longDescription": "Deploy versioned models to constrained devices with intermittent connectivity and safe fleet updates. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Model packaging",
      "Hardware profiles",
      "Signed artifacts",
      "Staged rollout",
      "Offline inference",
      "Telemetry buffering",
      "And rollback."
    ],
    "architecture": "Model registry → signed packages → fleet manager → edge runtime with local queue/health agent; staged device updates.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Python",
      "ONNX Runtime",
      "TensorRT",
      "MQTT",
      "Docker",
      "MLflow"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/edge-model-serving-platform/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Python",
          "ONNX Runtime",
          "TensorRT",
          "MQTT",
          "Docker",
          "MLflow"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "data-contract-governance-platform",
    "title": "Data Contracts & Quality Platform",
    "date": "Roadmap",
    "category": "Data Engineering",
    "tagline": "Detect breaking schema and semantic changes before they corrupt downstream analytics or ML features.",
    "description": "Detect breaking schema and semantic changes before they corrupt downstream analytics or ML features.",
    "longDescription": "Detect breaking schema and semantic changes before they corrupt downstream analytics or ML features. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Versioned contracts",
      "Compatibility rules",
      "Ownership",
      "CI checks",
      "Runtime validation",
      "Quality SLIs",
      "Lineage",
      "And deprecation."
    ],
    "architecture": "Producer contracts → CI compatibility checks → runtime validators → catalog/ownership registry → quality signals.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Python",
      "JSON Schema",
      "Kafka",
      "PostgreSQL",
      "dbt",
      "GitHub Actions"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/data-contract-governance-platform/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Python",
          "JSON Schema",
          "Kafka",
          "PostgreSQL",
          "dbt",
          "GitHub Actions"
        ]
      }
    ],
    "image": "",
    "aliases": [],
    "status": "Planned"
  },
  {
    "slug": "resilient-api-platform",
    "title": "Resilient API Platform & Load Lab",
    "date": "Roadmap",
    "category": "SRE",
    "tagline": "Build an API baseline demonstrating rate limits, backpressure, caching, graceful degradation, and measurable SLOs.",
    "description": "Build an API baseline demonstrating rate limits, backpressure, caching, graceful degradation, and measurable SLOs.",
    "longDescription": "Build an API baseline demonstrating rate limits, backpressure, caching, graceful degradation, and measurable SLOs. This is a documentation-first engineering proposal; the detailed scope, risks, validation strategy, and milestones are in its linked README.",
    "highlights": [
      "Request budgets",
      "Rate limits",
      "Bounded queues",
      "Idempotency",
      "Graceful shutdown",
      "Timeouts",
      "SLOs",
      "And failure injection."
    ],
    "architecture": "Edge proxy → API → cache/database → worker queue; budgets, bulkheads, circuit breakers, and probes protect dependencies.",
    "challenges": "Key risks include operational complexity, failure modes, security boundaries, observability gaps, and cost. Validate these through threat modeling, load testing, failure injection, and documented ADRs before making implementation claims.",
    "tags": [
      "Go",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Kubernetes",
      "OpenTelemetry",
      "k6"
    ],
    "stars": 0,
    "featured": false,
    "highlight": false,
    "githubUrl": "https://github.com/dilshandevxx/dilshan-personal-portfolio/blob/main/project-proposals/resilient-api-platform/README.md",
    "metricsDetail": [],
    "stackLayers": [
      {
        "layer": "Candidate stack",
        "technologies": [
          "Go",
          "FastAPI",
          "PostgreSQL",
          "Redis",
          "Kubernetes",
          "OpenTelemetry",
          "k6"
        ]
      }
    ],
    "aliases": [],
    "status": "Planned"
  }
];
