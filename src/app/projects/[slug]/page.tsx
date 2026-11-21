import React from "react";
import { notFound } from "next/navigation";
import { projectsList, Project } from "@/data/projects";
import { siteConfig } from "@/data/siteConfig";
import { PROJECTS_DATA, convertArticleToProject } from "@/data/projectsData";
import { ProjectDetailView } from "./ProjectDetailView";

// Unified project pool across both deep engineering proposals and product showcases
function getAllAvailableProjects(): Project[] {
  const existingSlugs = new Set(projectsList.map((p) => p.slug));
  const convertedArticles = PROJECTS_DATA
    .filter((a) => !existingSlugs.has(a.slug))
    .map(convertArticleToProject);
  return [...projectsList, ...convertedArticles];
}

export async function generateStaticParams() {
  const all = getAllAvailableProjects();
  return all.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const all = getAllAvailableProjects();
  const project = all.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — ${siteConfig.siteName}`,
    description: project.description || project.tagline,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const all = getAllAvailableProjects();
  const index = all.findIndex((p) => p.slug === slug);

  if (index === -1) {
    notFound();
  }

  const project = all[index];
  const previous = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;

  return (
    <ProjectDetailView
      initialProject={project}
      previous={previous}
      next={next}
      index={index}
    />
  );
}
