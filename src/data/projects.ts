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

export interface ProjectSectionConfig {
  overview?: boolean;
  problem?: boolean;
  solution?: boolean;
  architecture?: boolean;
  gallery?: boolean;
  techStack?: boolean;
  keySkills?: boolean;
  links?: boolean;
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
  overview?: string;
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

  // Architecture visual & key skills learned
  architectureImage?: string;
  architectureCaption?: string;
  keySkillsLearned?: string[];

  // SEO metadata
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];

  // Visible sections toggle
  sectionConfig?: ProjectSectionConfig;
}

export const PROJECT_THUMBNAILS: Record<string, string> = {
  "production-rag-platform": "/images/project_collective.jpg",
  "foodlence-backend": "/images/project_brutalist.jpg",
  "ideaspark-ai-business-idea-generator": "/images/project_analytics.jpg",
  "roamora-travel-discovery-website": "/images/story_travel.jpg",
  "travel-website": "/images/story_coffee.jpg",
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
  "creative-collective": "/images/project_collective.jpg",
  "brutalist-manifesto": "/images/project_brutalist.jpg",
  "cloudwatch-telemetry": "/images/project_analytics.jpg",
  "warpspeed-protocol": "/images/project_warpspeed_desk.jpg",
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
    "status": "Existing",
    "coverImage": "/images/project_brutalist.jpg",
    "overview": "The repository README describes a backend for processing ingredient names and synonyms, identifying additives, matching allergens, and returning confidence-aware structured results. The documented pipeline includes text cleaning/tokenization, exact matching, fuzzy or semantic matching, evaluation against user/family profiles, and confidence scoring.",
    "problemStatement": "",
    "proposedSolution": "",
    "architectureImage": "/images/project_boltshift.jpg",
    "architectureCaption": "Tokenization, exact matching, and fuzzy allergen resolution pipeline",
    "keySkillsLearned": [
      "FastAPI analysis API documented in the repository README",
      "Ingredient synonym and allergen matching workflow",
      "Additive and E-number identification",
      "Personalized profile evaluation",
      "Confidence scoring to signal uncertain extraction"
    ],
    "seoTitle": "FoodLence Backend",
    "seoDescription": "Ingredient parsing and semantic allergen matching backend.",
    "seoKeywords": [
      "Python",
      "FastAPI",
      "spaCy",
      "scikit-learn",
      "RapidFuzz",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic"
    ],
    "demoUrl": "",
    "sectionConfig": {
      "overview": false,
      "problem": true,
      "solution": true,
      "architecture": true,
      "gallery": true,
      "keySkills": true,
      "techStack": true,
      "links": true
    }
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

export const archivedProjectsList: Project[] = [];

