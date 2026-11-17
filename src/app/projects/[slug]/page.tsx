import React from "react";
import { notFound } from "next/navigation";
import { projectsList } from "@/data/projects";
import { siteConfig } from "@/data/siteConfig";
import { ProjectDetailView } from "./ProjectDetailView";

export async function generateStaticParams() {
  return projectsList.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsList.find((p) => p.slug === slug);
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
  const index = projectsList.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projectsList[index];
  const previous = index > 0 ? projectsList[index - 1] : null;
  const next = index < projectsList.length - 1 ? projectsList[index + 1] : null;

  return (
    <ProjectDetailView
      initialProject={project}
      previous={previous}
      next={next}
      index={index}
    />
  );
}
