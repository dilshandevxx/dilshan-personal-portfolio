import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { projectsList, Project } from "@/data/projects";

function formatProjectsTs(projects: Project[]): string {
  return `export interface ProjectMetric { label: string; value: string; }
export interface ProjectStackLayer { layer: string; technologies: string[]; }
export type ProjectStatus = "Existing" | "Planned";
export type ProjectCategory = "AI/ML" | "AI Infrastructure" | "MLOps" | "Platform Engineering" | "SRE" | "Systems" | "Security" | "Distributed Systems" | "Data Engineering" | "DevOps" | "Full-Stack" | "Landing" | "Product" | "Company" | "Research" | "Open Source" | "Others";
export interface Project {
  slug: string; title: string; date: string; category: ProjectCategory; tagline: string;
  description: string; longDescription: string; highlights: string[]; architecture: string;
  challenges: string; tags: string[]; stars: number; highlight?: boolean; featured?: boolean;
  githubUrl: string; demoUrl?: string; writeupUrl?: string; metrics?: string;
  metricsDetail: ProjectMetric[]; stackLayers: ProjectStackLayer[]; image?: string;
  aliases?: string[]; status: ProjectStatus;
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

export function getProjectThumbnail(slug: string, image?: string, index: number = 0): string {
  if (image && image.trim() !== "") return image;
  if (PROJECT_THUMBNAILS[slug]) return PROJECT_THUMBNAILS[slug];
  return FALLBACK_THUMBNAILS[index % FALLBACK_THUMBNAILS.length];
}

export const projectsList: Project[] = ${JSON.stringify(projects, null, 2)};
`;
}

export async function GET() {
  return NextResponse.json({ success: true, projects: projectsList });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, project, slug, projects } = body;

    let updatedList: Project[] = [...projectsList];

    if (action === "bulk_update" && Array.isArray(projects)) {
      updatedList = projects;
    } else if (action === "save" && project) {
      const existingIndex = updatedList.findIndex((p) => p.slug === project.slug);
      if (existingIndex >= 0) {
        updatedList[existingIndex] = { ...updatedList[existingIndex], ...project };
      } else {
        // Prepend new project
        updatedList.unshift(project);
      }
    } else if (action === "toggle_status" && slug) {
      const target = updatedList.find((p) => p.slug === slug);
      if (target) {
        target.status = target.status === "Existing" ? "Planned" : "Existing";
      }
    } else if (action === "delete" && slug) {
      updatedList = updatedList.filter((p) => p.slug !== slug);
    } else {
      return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
    }

    const tsContent = formatProjectsTs(updatedList);
    const filePath = path.join(process.cwd(), "src/data/projects.ts");

    let savedLocally = false;
    try {
      await fs.writeFile(filePath, tsContent, "utf8");
      savedLocally = true;
    } catch {
      savedLocally = false;
    }

    return NextResponse.json({
      success: true,
      savedLocally,
      message: savedLocally ? "Changes saved directly to src/data/projects.ts" : "Saved in memory (serverless)",
      projects: updatedList,
      tsContent,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to save project" }, { status: 500 });
  }
}
