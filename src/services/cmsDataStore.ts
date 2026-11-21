/**
 * CMS Data Store Service
 * Centralizes content access for the CMS Dashboard.
 * Interoperates with live Sanity CMS when configured, with seamless
 * persistent client & API synchronization.
 */

import { projectsList as initialProjectsList, Project } from "@/data/projects";
import { siteConfig } from "@/data/content";
import { isSanityConfigured, sanityFetch, sanityMutate } from "@/sanity/client";
import { ALL_PROJECTS_QUERY, HOMEPAGE_SECTIONS_QUERY, MEDIA_ASSETS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";

export interface FeaturedProjectItem {
  slug: string;
  displayOrder: number;
  isVisible: boolean;
  customImage?: string;
  customVideoUrl?: string;
  customTagline?: string;
}

export interface HomepageCMSData {
  heroHeadline: string;
  heroSubheadline: string;
  heroVideoUrl: string;
  heroPosterUrl: string;
  introStatement: string;
  introBioParagraphs: string[];
  featuredProjects: FeaturedProjectItem[];
  servicesTitle: string;
  aboutHeading: string;
  aboutButtonText: string;
  aboutStatement: string;
  contactHeadline: string;
  contactEmail: string;
  contactAvailability: string;
  contactLocation: string;
}

export interface CMSMediaAsset {
  id: string;
  name: string;
  url: string;
  type: "image" | "video";
  format?: string;
  width?: number;
  height?: number;
  size?: string;
  cloudinaryPublicId?: string;
  usedIn?: string[];
  createdAt: string;
}

export interface CMSGlobalSettings {
  brandName: string;
  wordmark: string;
  editionText: string;
  initials: string;
  navLinks: { id: string; label: string; url: string; order: number }[];
  ctaButtonText: string;
  ctaButtonUrl: string;
  accentColor: string;
  socials: { id: string; platform: string; url: string; handle: string }[];
  copyrightStatement: string;
  footerTagline: string;
  defaultTitle: string;
  defaultDescription: string;
  ogImageUrl: string;
  twitterHandle: string;
}

export interface CMSActivityLog {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  type: "project" | "homepage" | "media" | "settings";
}

const STORAGE_KEYS = {
  PROJECTS: "dilshan_cms_projects_v2",
  HOMEPAGE: "dilshan_cms_homepage_v2",
  MEDIA: "dilshan_cms_media_v2",
  SETTINGS: "dilshan_cms_settings_v2",
  ACTIVITY: "dilshan_cms_activity_v2",
};

// Default seed for media library
const DEFAULT_MEDIA_ASSETS: CMSMediaAsset[] = [
  {
    id: "media-1",
    name: "Skyline Banner Video",
    url: "/images/skyline_banner.mp4",
    type: "video",
    format: "MP4",
    width: 1920,
    height: 1080,
    size: "8.4 MB",
    usedIn: ["Homepage Hero"],
    createdAt: "2026-11-20T10:00:00Z",
  },
  {
    id: "media-2",
    name: "Skyline Twilight Poster",
    url: "/images/skyline_twilight.jpg",
    type: "image",
    format: "JPG",
    width: 1920,
    height: 1080,
    size: "420 KB",
    usedIn: ["Homepage Hero", "Observability Platform"],
    createdAt: "2026-11-20T10:05:00Z",
  },
  {
    id: "media-3",
    name: "Production RAG Architecture",
    url: "/images/project_collective.jpg",
    type: "image",
    format: "JPG",
    width: 1600,
    height: 900,
    size: "680 KB",
    usedIn: ["Production RAG Platform"],
    createdAt: "2026-11-19T14:30:00Z",
  },
  {
    id: "media-4",
    name: "Foodlence Microservices",
    url: "/images/project_brutalist.jpg",
    type: "image",
    format: "JPG",
    width: 1600,
    height: 900,
    size: "540 KB",
    usedIn: ["Foodlence Backend"],
    createdAt: "2026-11-19T15:10:00Z",
  },
  {
    id: "media-5",
    name: "Analytics & Telemetry Dashboard",
    url: "/images/project_analytics.jpg",
    type: "image",
    format: "JPG",
    width: 1600,
    height: 900,
    size: "710 KB",
    usedIn: ["CloudWatch Telemetry"],
    createdAt: "2026-11-18T09:20:00Z",
  },
  {
    id: "media-6",
    name: "WarpSpeed Protocol Desk",
    url: "/images/project_warpspeed_desk.jpg",
    type: "image",
    format: "JPG",
    width: 1600,
    height: 900,
    size: "820 KB",
    usedIn: ["WarpSpeed Protocol"],
    createdAt: "2026-11-18T11:45:00Z",
  },
  {
    id: "media-7",
    name: "Architectural Sunlit Journey",
    url: "/images/about/journey_architecture.jpg",
    type: "image",
    format: "JPG",
    width: 924,
    height: 735,
    size: "340 KB",
    usedIn: ["Engineering Journey Section"],
    createdAt: "2026-11-21T08:00:00Z",
  },
  {
    id: "media-8",
    name: "Keynote Stage Presentation",
    url: "/images/about/about_stage_1.jpg",
    type: "image",
    format: "JPG",
    width: 1200,
    height: 800,
    size: "480 KB",
    usedIn: ["About Me Page"],
    createdAt: "2026-11-20T11:15:00Z",
  },
];

// Initial Homepage CMS State
const DEFAULT_HOMEPAGE_DATA: HomepageCMSData = {
  heroHeadline: "Designing high-throughput systems, resilient platforms & modern digital software.",
  heroSubheadline: "Full-Stack Engineer & Systems Architect focusing on distributed systems, AI/ML inference runtimes, and sub-second web applications.",
  heroVideoUrl: "/images/skyline_banner.mp4",
  heroPosterUrl: "/images/skyline_twilight.jpg",
  introStatement: "I engineer high-throughput machine learning systems, low-latency model inference runtimes, and resilient cloud infrastructure built to perform deterministically under demanding production scale.",
  introBioParagraphs: [
    "I view computer science not merely as a modern trade, but as an intellectual craft that bridges mechanical discipline with editorial clarity. Over the past several years, I have worked across the stack—from designing event-driven distributed ingestion pipelines to architecting accessible, zero-bloat web clients.",
    "My engineering philosophy is shaped by durable principles: favor explicit architectures over magic abstractions, prioritize deterministic latency over brute computing power, and craft user experiences that respect human attention rather than exploit it.",
  ],
  featuredProjects: [
    {
      slug: "production-rag-platform",
      displayOrder: 1,
      isVisible: true,
      customTagline: "Enterprise hybrid RAG platform with semantic cache",
    },
    {
      slug: "foodlence-backend",
      displayOrder: 2,
      isVisible: true,
      customTagline: "High-throughput restaurant operating system in Go",
    },
    {
      slug: "distributed-llm-inference-platform",
      displayOrder: 3,
      isVisible: true,
      customTagline: "Low-latency vLLM & PagedAttention model serving",
    },
    {
      slug: "cloudwatch-telemetry",
      displayOrder: 4,
      isVisible: true,
      customTagline: "Real-time distributed telemetry with sub-second queries",
    },
  ],
  servicesTitle: "Technical Expertise",
  aboutHeading: "ABOUT ME",
  aboutButtonText: "ABOUT ME",
  aboutStatement: "I engineer high-throughput machine learning systems, low-latency model inference runtimes, and resilient cloud infrastructure built to perform deterministically under demanding production scale. My approach is simple — remove unnecessary complexity, optimize memory and latency boundaries, and build dependable systems with mathematical rigor.",
  contactHeadline: "Let's architect something dependable.",
  contactEmail: "dilshan.devxx@gmail.com",
  contactAvailability: "Available for engineering roles & technical advisory",
  contactLocation: "Colombo, Sri Lanka (Available Worldwide)",
};

const DEFAULT_GLOBAL_SETTINGS: CMSGlobalSettings = {
  brandName: "DILSHAN.",
  wordmark: "DILSHAN.",
  editionText: "First Folio — Vol. 2026",
  initials: "D",
  navLinks: [
    { id: "1", label: "EXPERTISE", url: "/#skills", order: 1 },
    { id: "2", label: "PROJECTS", url: "/projects", order: 2 },
    { id: "3", label: "ABOUT", url: "/about", order: 3 },
    { id: "4", label: "CONTACT", url: "/#contact", order: 4 },
  ],
  ctaButtonText: "Join 70K+ Readers",
  ctaButtonUrl: "/#contact",
  accentColor: "#6366F1",
  socials: [
    { id: "1", platform: "GitHub", url: "https://github.com", handle: "@dilshandevxx" },
    { id: "2", platform: "LinkedIn", url: "https://linkedin.com", handle: "in/dilshan" },
    { id: "3", platform: "Email", url: "mailto:dilshan.devxx@gmail.com", handle: "dilshan.devxx@gmail.com" },
    { id: "4", platform: "Twitter / X", url: "https://x.com", handle: "@dilshan" },
  ],
  copyrightStatement: "Dilshan. All Rights Reserved.",
  footerTagline: "Dilshan engineers high-throughput machine learning systems and distributed architectures.",
  defaultTitle: "Dilshan | Full-Stack Engineer & System Architect",
  defaultDescription: "Full-stack engineer and system architect focusing on distributed systems, modern web experiences & scalable architectures.",
  ogImageUrl: "/images/skyline_twilight.jpg",
  twitterHandle: "@dilshan",
};

const DEFAULT_ACTIVITY_LOGS: CMSActivityLog[] = [
  {
    id: "act-1",
    action: "Updated Homepage Hero Banner",
    target: "Skyline Banner Video URL",
    timestamp: "10 minutes ago",
    type: "homepage",
  },
  {
    id: "act-2",
    action: "Curated Featured Projects",
    target: "Added Production RAG Platform to showcase",
    timestamp: "1 hour ago",
    type: "project",
  },
  {
    id: "act-3",
    action: "Updated Global Navigation",
    target: "Centered desktop nav links with Join 70K+ Readers CTA",
    timestamp: "3 hours ago",
    type: "settings",
  },
  {
    id: "act-4",
    action: "Added Cloudinary Media Asset",
    target: "Architectural Sunlit Journey (JPG)",
    timestamp: "1 day ago",
    type: "media",
  },
];

class CMSDataStore {
  // -------------------------------------------------------------
  // PROJECTS
  // -------------------------------------------------------------
  public async getProjects(): Promise<Project[]> {
    if (typeof window === "undefined") {
      return initialProjectsList;
    }

    // Try Sanity if configured
    if (isSanityConfigured()) {
      const sanityProjects = await sanityFetch<Project[]>(ALL_PROJECTS_QUERY);
      if (sanityProjects && sanityProjects.length > 0) {
        return sanityProjects;
      }
    }

    // LocalStorage fallback
    const local = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse local projects", e);
      }
    }

    return initialProjectsList;
  }

  public async saveProject(project: Project): Promise<{ success: boolean; project: Project }> {
    const list = await this.getProjects();
    const existingIndex = list.findIndex((p) => p.slug === project.slug);

    let updatedList: Project[];
    if (existingIndex >= 0) {
      updatedList = [...list];
      updatedList[existingIndex] = { ...updatedList[existingIndex], ...project };
    } else {
      updatedList = [project, ...list];
    }

    // Persist to LocalStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedList));
      this.addActivityLog({
        action: existingIndex >= 0 ? "Edited Project" : "Created Project",
        target: project.title,
        type: "project",
      });
    }

    // Sync via Next.js internal API
    try {
      await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", project }),
      });
    } catch (e) {
      // Ignored if offline
    }

    // Sync to Sanity if configured
    if (isSanityConfigured()) {
      await sanityMutate([
        {
          createOrReplace: {
            _id: `project-${project.slug}`,
            _type: "project",
            title: project.title,
            slug: { current: project.slug },
            category: project.category,
            status: project.status,
            featured: project.featured,
            date: project.date,
            tagline: project.tagline,
            description: project.description,
            longDescription: project.longDescription,
            coverImage: project.image,
            videoUrl: project.videoDemo?.videoUrl,
            tags: project.tags,
            githubUrl: project.githubUrl,
            demoUrl: project.demoUrl,
            writeupUrl: project.writeupUrl,
            architecture: project.architecture,
            challenges: project.challenges,
          },
        },
      ]);
    }

    return { success: true, project };
  }

  public async deleteProject(slug: string): Promise<boolean> {
    const list = await this.getProjects();
    const project = list.find((p) => p.slug === slug);
    const updatedList = list.filter((p) => p.slug !== slug);

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedList));
      if (project) {
        this.addActivityLog({
          action: "Deleted Project",
          target: project.title,
          type: "project",
        });
      }
    }

    try {
      await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", slug }),
      });
    } catch (e) {}

    if (isSanityConfigured()) {
      await sanityMutate([{ delete: { id: `project-${slug}` } }]);
    }

    return true;
  }

  public async toggleFeatured(slug: string): Promise<boolean> {
    const list = await this.getProjects();
    const target = list.find((p) => p.slug === slug);
    if (!target) return false;

    target.featured = !target.featured;
    await this.saveProject(target);
    return Boolean(target.featured);
  }

  // -------------------------------------------------------------
  // HOMEPAGE SECTIONS
  // -------------------------------------------------------------
  public async getHomepageData(): Promise<HomepageCMSData> {
    if (typeof window === "undefined") {
      return DEFAULT_HOMEPAGE_DATA;
    }

    if (isSanityConfigured()) {
      const sanityData = await sanityFetch<HomepageCMSData>(HOMEPAGE_SECTIONS_QUERY);
      if (sanityData) {
        return sanityData;
      }
    }

    const local = localStorage.getItem(STORAGE_KEYS.HOMEPAGE);
    if (local) {
      try {
        return { ...DEFAULT_HOMEPAGE_DATA, ...JSON.parse(local) };
      } catch (e) {}
    }

    return DEFAULT_HOMEPAGE_DATA;
  }

  public async saveHomepageData(data: Partial<HomepageCMSData>): Promise<HomepageCMSData> {
    const current = await this.getHomepageData();
    const updated = { ...current, ...data };

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.HOMEPAGE, JSON.stringify(updated));
      this.addActivityLog({
        action: "Updated Homepage Content",
        target: "Hero & Showcase Sections",
        type: "homepage",
      });
    }

    if (isSanityConfigured()) {
      await sanityMutate([
        {
          createOrReplace: {
            _id: "homepage",
            _type: "homepage",
            heroHeadline: updated.heroHeadline,
            heroSubheadline: updated.heroSubheadline,
            heroVideoUrl: updated.heroVideoUrl,
            heroPosterUrl: updated.heroPosterUrl,
            introStatement: updated.introStatement,
            servicesTitle: updated.servicesTitle,
            aboutHeading: updated.aboutHeading,
            contactHeadline: updated.contactHeadline,
            contactEmail: updated.contactEmail,
            contactAvailability: updated.contactAvailability,
          },
        },
      ]);
    }

    return updated;
  }

  // -------------------------------------------------------------
  // MEDIA LIBRARY
  // -------------------------------------------------------------
  public async getMediaAssets(): Promise<CMSMediaAsset[]> {
    if (typeof window === "undefined") {
      return DEFAULT_MEDIA_ASSETS;
    }

    if (isSanityConfigured()) {
      const sanityMedia = await sanityFetch<CMSMediaAsset[]>(MEDIA_ASSETS_QUERY);
      if (sanityMedia && sanityMedia.length > 0) {
        return sanityMedia;
      }
    }

    const local = localStorage.getItem(STORAGE_KEYS.MEDIA);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }

    return DEFAULT_MEDIA_ASSETS;
  }

  public async addMediaAsset(asset: Omit<CMSMediaAsset, "id" | "createdAt">): Promise<CMSMediaAsset> {
    const list = await this.getMediaAssets();
    const newAsset: CMSMediaAsset = {
      ...asset,
      id: `media-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updated = [newAsset, ...list];
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(updated));
      this.addActivityLog({
        action: "Uploaded Media Asset",
        target: newAsset.name,
        type: "media",
      });
    }

    return newAsset;
  }

  public async deleteMediaAsset(id: string): Promise<boolean> {
    const list = await this.getMediaAssets();
    const target = list.find((m) => m.id === id);
    const updated = list.filter((m) => m.id !== id);

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(updated));
      if (target) {
        this.addActivityLog({
          action: "Removed Media Asset",
          target: target.name,
          type: "media",
        });
      }
    }

    return true;
  }

  // -------------------------------------------------------------
  // GLOBAL SETTINGS
  // -------------------------------------------------------------
  public async getGlobalSettings(): Promise<CMSGlobalSettings> {
    if (typeof window === "undefined") {
      return DEFAULT_GLOBAL_SETTINGS;
    }

    if (isSanityConfigured()) {
      const sanitySettings = await sanityFetch<CMSGlobalSettings>(SITE_SETTINGS_QUERY);
      if (sanitySettings) {
        return sanitySettings;
      }
    }

    const local = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (local) {
      try {
        return { ...DEFAULT_GLOBAL_SETTINGS, ...JSON.parse(local) };
      } catch (e) {}
    }

    return DEFAULT_GLOBAL_SETTINGS;
  }

  public async saveGlobalSettings(settings: Partial<CMSGlobalSettings>): Promise<CMSGlobalSettings> {
    const current = await this.getGlobalSettings();
    const updated = { ...current, ...settings };

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      this.addActivityLog({
        action: "Updated Global Settings",
        target: "Branding, Navigation & SEO",
        type: "settings",
      });
    }

    return updated;
  }

  // -------------------------------------------------------------
  // OVERVIEW METRICS & TELEMETRY
  // -------------------------------------------------------------
  public async getOverviewMetrics() {
    const projects = await this.getProjects();
    const media = await this.getMediaAssets();
    const activities = await this.getActivityLogs();

    const published = projects.filter((p) => p.status === "Existing" || (p as any).status === "Published").length;
    const drafts = projects.filter((p) => p.status === "Planned" || (p as any).status === "Draft").length;
    const featured = projects.filter((p) => p.featured || p.highlight).length;

    return {
      totalProjects: projects.length,
      publishedProjects: published,
      draftProjects: drafts,
      featuredProjects: featured,
      mediaCount: media.length,
      recentProjects: projects.slice(0, 5),
      activities: activities.slice(0, 6),
      isSanityReady: isSanityConfigured(),
      systemHealth: "Optimal",
      liveVersion: "Next.js 16.4 / React 19",
    };
  }

  public async getActivityLogs(): Promise<CMSActivityLog[]> {
    if (typeof window === "undefined") {
      return DEFAULT_ACTIVITY_LOGS;
    }

    const local = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }

    return DEFAULT_ACTIVITY_LOGS;
  }

  private addActivityLog(log: Omit<CMSActivityLog, "id" | "timestamp">) {
    if (typeof window === "undefined") return;

    try {
      const current = this.getActivityLogsSync();
      const newEntry: CMSActivityLog = {
        ...log,
        id: `act-${Date.now()}`,
        timestamp: "Just now",
      };
      const updated = [newEntry, ...current].slice(0, 20);
      localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(updated));
    } catch (e) {}
  }

  private getActivityLogsSync(): CMSActivityLog[] {
    try {
      const local = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
      return local ? JSON.parse(local) : DEFAULT_ACTIVITY_LOGS;
    } catch {
      return DEFAULT_ACTIVITY_LOGS;
    }
  }
}

export const cmsDataStore = new CMSDataStore();
