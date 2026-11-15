import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsList } from "@/data/projects";
import { siteConfig } from "@/data/siteConfig";
import { ArrowLeft, ArrowRight, ExternalLink, Layers, Cpu, ShieldCheck, CheckCircle2, Calendar, FolderGit2 } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export async function generateStaticParams() { return projectsList.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const project=projectsList.find(p=>p.slug===slug);
  if(!project) return {title:"Project Not Found"};
  return {title:`${project.title} — ${siteConfig.siteName}`,description:project.description};
}
export default async function ProjectDetailPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const index=projectsList.findIndex(p=>p.slug===slug); if(index===-1) notFound();
  const project=projectsList[index]; const previous=index>0?projectsList[index-1]:null; const next=index<projectsList.length-1?projectsList[index+1]:null;
  return <article className="project-detail-container">
    <nav className="project-detail-nav"><Link href="/projects" className="project-detail-back"><ArrowLeft size={15}/><span>Back to Projects</span></Link></nav>
    <header className="project-detail-header">
      <div className="project-detail-meta-pills"><span className="project-detail-badge">{project.category}</span><span className="project-detail-date"><Calendar size={12}/><span>{project.status==="Planned"?"Roadmap proposal":"Existing repository"}</span></span><span className="project-detail-badge">{project.status==="Planned"?"Planned — not implemented":"Existing work — review status"}</span>{project.featured&&<span className="project-detail-featured-pill">Selected</span>}</div>
      <h1 className="project-detail-title">{project.title}</h1><p className="project-detail-tagline">{project.tagline}</p>
      <div className="project-detail-actions">
        {project.demoUrl&&<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><ExternalLink size={15}/><span>Live Deployment</span></a>}
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn"><GithubIcon size={15}/><span>{project.status==="Planned"?"Read Project Specification":"Open GitHub Repository"}</span></a>
      </div>
    </header>
    {project.metricsDetail.length>0&&<section className="project-metrics-bento">{project.metricsDetail.map((m,i)=><div key={i} className="project-metric-card"><span className="project-metric-label">{m.label}</span><span className="project-metric-value">{m.value}</span></div>)}</section>}
    <section className="project-detail-section"><h2 className="project-detail-section-title"><span className="section-title-icon"><Layers size={18}/></span>Overview & Motivation</h2><div className="project-prose"><p>{project.longDescription}</p></div></section>
    <section className="project-detail-section"><h2 className="project-detail-section-title"><span className="section-title-icon"><CheckCircle2 size={18}/></span>{project.status==="Planned"?"Proposed Scope":"Documented Repository Features"}</h2><ul className="project-highlights-list">{project.highlights.map((item,i)=><li key={i} className="project-highlight-item"><div className="highlight-bullet"/><span>{item}</span></li>)}</ul></section>
    <section className="project-detail-section"><h2 className="project-detail-section-title"><span className="section-title-icon"><Cpu size={18}/></span>Architecture & Data Flow</h2><div className="project-prose"><p>{project.architecture}</p></div></section>
    <section className="project-detail-section"><h2 className="project-detail-section-title"><span className="section-title-icon"><ShieldCheck size={18}/></span>{project.status==="Planned"?"Risks & Engineering Questions":"Verification Notes & Engineering Questions"}</h2><div className="project-prose"><p>{project.challenges}</p></div></section>
    <section className="project-detail-section"><h2 className="project-detail-section-title"><span className="section-title-icon"><FolderGit2 size={18}/></span>{project.status==="Planned"?"Candidate Technology Stack":"Documented Technology Stack"}</h2><div className="project-stack-layers-grid">{project.stackLayers.map((layer,i)=><div key={i} className="project-stack-layer-card"><h3 className="project-stack-layer-name">{layer.layer}</h3><div className="project-stack-layer-tags">{layer.technologies.map(t=><span key={t} className="project-layer-pill">{t}</span>)}</div></div>)}</div></section>
    <footer className="project-pagination-footer">{previous?<Link href={`/projects/${previous.slug}`} className="project-pagination-card prev"><span className="pagination-label"><ArrowLeft size={13}/>Previous Project</span><span className="pagination-title">{previous.title}</span></Link>:<div/>}{next&&<Link href={`/projects/${next.slug}`} className="project-pagination-card next"><span className="pagination-label">Next Project<ArrowRight size={13}/></span><span className="pagination-title">{next.title}</span></Link>}</footer>
  </article>;
}
