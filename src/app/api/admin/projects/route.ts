import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { projectsList, Project } from "@/data/projects";

function formatProjectsTs(projects: Project[]): string {
  return `export interface ProjectMetric { label: string; value: string; }
export interface ProjectStackLayer { layer: string; technologies: string[]; }
export type ProjectStatus = "Existing" | "Planned";
export type ProjectCategory = "AI/ML" | "DevOps" | "Systems" | "Full-Stack" | "Landing" | "Others";
export interface Project {
  slug: string; title: string; date: string; category: ProjectCategory; tagline: string;
  description: string; longDescription: string; highlights: string[]; architecture: string;
  challenges: string; tags: string[]; stars: number; highlight?: boolean; featured?: boolean;
  githubUrl: string; demoUrl?: string; writeupUrl?: string; metrics?: string;
  metricsDetail: ProjectMetric[]; stackLayers: ProjectStackLayer[]; image?: string;
  aliases?: string[]; status: ProjectStatus;
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
