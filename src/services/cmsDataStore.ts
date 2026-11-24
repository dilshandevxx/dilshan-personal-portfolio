/**
 * CMS Data Store Service
 * Centralizes content access for the CMS Dashboard.
 * Interoperates with live Sanity CMS when configured, with seamless
 * persistent client & API synchronization.
 */

import { projectsList as initialProjectsList, Project, getProjectThumbnail } from "@/data/projects";
import { PROJECTS_DATA } from "@/data/projectsData";
import { siteConfig } from "@/data/content";
import { isSanityConfigured, sanityFetch, sanityMutate } from "@/sanity/client";
import { ALL_PROJECTS_QUERY, HOMEPAGE_SECTIONS_QUERY, MEDIA_ASSETS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";

// Convert ProjectArticle items from /projects to full Project instances
const projectArticlesAsProjects: Project[] = PROJECTS_DATA.map((article, idx) => ({
  slug: article.slug,
  title: article.title,
  date: article.date || "2026",
  category: (article.category as any) || "Product",
  tagline: article.description,
  description: article.description,
  longDescription: article.description,
  highlights: [],
  architecture: "",
  challenges: "",
  tags: article.tags || article.techStack || [],
  stars: 0,
  githubUrl: "",
  status: "Existing",
  image: article.image || getProjectThumbnail(article.slug, undefined, idx),
  coverImage: article.image || getProjectThumbnail(article.slug, undefined, idx),
  metricsDetail: [],
  stackLayers: [],
}));

// Comprehensive seed projects: flagship projects + /projects articles with thumbnail images
const existingSeedSlugs = new Set(initialProjectsList.map((p) => p.slug));
const allSeedProjects: Project[] = [
  ...initialProjectsList.map((p, idx) => {
    const thumb = getProjectThumbnail(p.slug, p.image, idx, p.coverImage);
    return {
      ...p,
      image: thumb,
      coverImage: thumb,
    };
  }),
  ...projectArticlesAsProjects.filter((p) => !existingSeedSlugs.has(p.slug)),
];

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
  aboutBannerUrl?: string;
  aboutBannerAlt?: string;
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

export interface ProjectCardLayoutConfig {
  titleLines: number;
  descriptionLines: number;
  techStackLines: number;
  showCategory: boolean;
  showDate: boolean;
  showArticleLink?: boolean;
  showDemoLink?: boolean;
  showSourceLink?: boolean;
  showStackButton?: boolean;
  actionLinksColor?: string;
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
  projectCardConfig?: ProjectCardLayoutConfig;
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

// Default seed for media library: only pure site media assets (no mock project card titles)
const DEFAULT_MEDIA_ASSETS: CMSMediaAsset[] = [
  {
    id: "media-video-1",
    name: "Skyline Banner Video",
    url: "/images/skyline_banner.mp4",
    type: "video",
    format: "MP4",
    width: 1920,
    height: 1080,
    size: "8.4 MB",
    createdAt: "2026-11-20T10:00:00Z",
  },
  {
    id: "media-img-1",
    name: "Satellite Solar Array Banner",
    url: "/images/about-visual-banner.webp",
    type: "image",
    format: "WEBP",
    width: 1930,
    height: 904,
    size: "98 KB",
    createdAt: "2026-11-21T18:00:00Z",
  },
  {
    id: "media-img-2",
    name: "Skyline Twilight Poster",
    url: "/images/skyline_twilight.jpg",
    type: "image",
    format: "JPG",
    width: 1920,
    height: 1080,
    size: "420 KB",
    createdAt: "2026-11-20T10:05:00Z",
  },
  {
    id: "media-img-3",
    name: "Architectural Sunlit Journey",
    url: "/images/about/journey_architecture.jpg",
    type: "image",
    format: "JPG",
    width: 924,
    height: 735,
    size: "340 KB",
    createdAt: "2026-11-21T08:00:00Z",
  },
  {
    id: "media-img-4",
    name: "Keynote Stage Presentation",
    url: "/images/about/about_stage_1.jpg",
    type: "image",
    format: "JPG",
    width: 1200,
    height: 800,
    size: "480 KB",
    createdAt: "2026-11-20T11:15:00Z",
  },
];

// Initial Homepage CMS State
export const DEFAULT_HOMEPAGE_DATA: HomepageCMSData = {
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
  aboutBannerUrl: "/images/about-visual-banner.webp",
  aboutBannerAlt: "Deep-tech autonomous hardware and satellite telemetry engineering",
  contactHeadline: "Let's architect something dependable.",
  contactEmail: "dilshan.devxx@gmail.com",
  contactAvailability: "Available for engineering roles & technical advisory",
  contactLocation: "Colombo, Sri Lanka (Available Worldwide)",
};

export const DEFAULT_GLOBAL_SETTINGS: CMSGlobalSettings = {
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
  ctaButtonText: "Say Hello",
  ctaButtonUrl: "mailto:dilshan.devxx@gmail.com",
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
  projectCardConfig: {
    titleLines: 2,
    descriptionLines: 2,
    techStackLines: 2,
    showCategory: true,
    showDate: true,
    showArticleLink: true,
    showDemoLink: true,
    showSourceLink: true,
    showStackButton: true,
    actionLinksColor: "#38bdf8",
  },
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
    target: "Centered desktop nav links with Say Hello CTA",
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
      return allSeedProjects;
    }

    // Try Sanity if configured
    if (isSanityConfigured()) {
      const sanityProjects = await sanityFetch<Project[]>(ALL_PROJECTS_QUERY);
      if (sanityProjects && sanityProjects.length > 0) {
        return sanityProjects.map((p, idx) => {
          const base = allSeedProjects.find((b) => b.slug === p.slug);
          const img = (
            p.image ||
            (p as any).coverImage ||
            base?.image ||
            (base as any)?.coverImage ||
            getProjectThumbnail(p.slug, undefined, idx)
          ).trim();
          return {
            ...base,
            ...p,
            image: img,
            coverImage: img,
            gallery: p.gallery && p.gallery.length > 0 ? p.gallery : base?.gallery || [],
            videoDemo: p.videoDemo || base?.videoDemo,
          };
        });
      }
    }

    // LocalStorage fallback
    const local = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const parsedSlugs = new Set(parsed.map((item: Project) => item.slug));
          // Merge with initial seed data so rich gallery and thumbnail images are preserved
          const mergedList = parsed.map((item: Project, idx: number) => {
            const base = allSeedProjects.find((p) => p.slug === item.slug);
            const resolvedImg = (
              item.image ||
              (item as any).coverImage ||
              base?.image ||
              (base as any)?.coverImage ||
              getProjectThumbnail(item.slug, undefined, idx)
            ).trim();
            return {
              ...base,
              ...item,
              image: resolvedImg,
              coverImage: resolvedImg,
              gallery: item.gallery && item.gallery.length > 0 ? item.gallery : base?.gallery || [],
              videoDemo: item.videoDemo || base?.videoDemo,
            };
          });

          // Include any newly added seed projects (e.g. from /projects articles) not yet in localStorage
          const missingSeeds = allSeedProjects.filter((s) => !parsedSlugs.has(s.slug));
          return [...mergedList, ...missingSeeds];
        }
      } catch (e) {
        console.error("Failed to parse local projects", e);
      }
    }

    return allSeedProjects;
  }

  public async saveProject(project: Project): Promise<{ success: boolean; project: Project }> {
    const list = await this.getProjects();
    const existingIndex = list.findIndex((p) => p.slug === project.slug);

    const resolvedImage = (project.image || (project as any).coverImage || "").trim();
    const normalizedProject: Project = {
      ...project,
      image: resolvedImage,
      coverImage: resolvedImage,
    };

    let updatedList: Project[];
    if (existingIndex >= 0) {
      updatedList = [...list];
      updatedList[existingIndex] = { ...updatedList[existingIndex], ...normalizedProject };
    } else {
      updatedList = [normalizedProject, ...list];
    }

    // Persist to LocalStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedList));
      this.addActivityLog({
        action: existingIndex >= 0 ? "Edited Project" : "Created Project",
        target: normalizedProject.title,
        type: "project",
      });

      // Broadcast update across all open components/pages
      window.dispatchEvent(
        new CustomEvent("cms_projects_updated", { detail: normalizedProject })
      );
    }

    // Sync via Next.js internal API
    try {
      await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", project: normalizedProject }),
      });
    } catch (e) {
      // Ignored if offline
    }

    // Sync to Sanity if configured
    if (isSanityConfigured()) {
      try {
        await sanityMutate([
          {
            createOrReplace: {
              _id: `project-${normalizedProject.slug}`,
              _type: "project",
              title: normalizedProject.title,
              slug: { current: normalizedProject.slug },
              category: normalizedProject.category,
              status: normalizedProject.status,
              featured: normalizedProject.featured,
              date: normalizedProject.date,
              tagline: normalizedProject.tagline,
              description: normalizedProject.description,
              longDescription: normalizedProject.longDescription,
              coverImage: resolvedImage,
              image: resolvedImage,
              videoUrl: normalizedProject.videoDemo?.videoUrl,
              tags: normalizedProject.tags,
              githubUrl: normalizedProject.githubUrl,
              demoUrl: normalizedProject.demoUrl,
              writeupUrl: normalizedProject.writeupUrl,
              architecture: normalizedProject.architecture,
              challenges: normalizedProject.challenges,
            },
          },
        ]);
      } catch (sanityErr) {
        console.error("Sanity project sync error:", sanityErr);
      }
    }

    return { success: true, project: normalizedProject };
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
      try {
        const sanityData = await sanityFetch<any>(HOMEPAGE_SECTIONS_QUERY);
        if (sanityData && typeof sanityData === "object") {
          return {
            ...DEFAULT_HOMEPAGE_DATA,
            ...sanityData,
            introBioParagraphs:
              Array.isArray(sanityData.introBioParagraphs) && sanityData.introBioParagraphs.length > 0
                ? sanityData.introBioParagraphs
                : DEFAULT_HOMEPAGE_DATA.introBioParagraphs,
            featuredProjects:
              Array.isArray(sanityData.featuredProjects) && sanityData.featuredProjects.length > 0
                ? sanityData.featuredProjects.map((fp: any, idx: number) => ({
                    slug: fp.slug || fp.project?.slug || `project-${idx}`,
                    displayOrder: fp.displayOrder ?? idx + 1,
                    isVisible: fp.isVisible !== false,
                    customImage: fp.customImage || "",
                    customVideoUrl: fp.customVideoUrl || "",
                    customTagline: fp.customTagline || "",
                  }))
                : DEFAULT_HOMEPAGE_DATA.featuredProjects,
          };
        }
      } catch (err) {
        console.warn("[CMS] Failed to fetch homepage from Sanity:", err);
      }
    }

    const local = localStorage.getItem(STORAGE_KEYS.HOMEPAGE);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        return {
          ...DEFAULT_HOMEPAGE_DATA,
          ...parsed,
          introBioParagraphs:
            Array.isArray(parsed.introBioParagraphs) && parsed.introBioParagraphs.length > 0
              ? parsed.introBioParagraphs
              : DEFAULT_HOMEPAGE_DATA.introBioParagraphs,
          featuredProjects:
            Array.isArray(parsed.featuredProjects) && parsed.featuredProjects.length > 0
              ? parsed.featuredProjects
              : DEFAULT_HOMEPAGE_DATA.featuredProjects,
        };
      } catch (e) {}
    }

    return DEFAULT_HOMEPAGE_DATA;
  }

  public async saveHomepageData(data: Partial<HomepageCMSData>): Promise<HomepageCMSData> {
    const current = await this.getHomepageData();
    const updated: HomepageCMSData = {
      ...current,
      ...data,
      introBioParagraphs:
        Array.isArray(data.introBioParagraphs) && data.introBioParagraphs.length > 0
          ? data.introBioParagraphs
          : current.introBioParagraphs,
      featuredProjects:
        Array.isArray(data.featuredProjects) && data.featuredProjects.length > 0
          ? data.featuredProjects
          : current.featuredProjects,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.HOMEPAGE, JSON.stringify(updated));
      this.addActivityLog({
        action: "Updated Homepage Content",
        target: "Hero & Showcase Sections",
        type: "homepage",
      });
      window.dispatchEvent(new CustomEvent("cms_homepage_updated", { detail: updated }));
    }

    if (isSanityConfigured()) {
      try {
        await sanityMutate([
          {
            createOrReplace: {
              _id: "homepage",
              _type: "homepage",
              heroHeadline: updated.heroHeadline || "",
              heroSubheadline: updated.heroSubheadline || "",
              heroVideoUrl: updated.heroVideoUrl || "",
              heroPosterUrl: updated.heroPosterUrl || "",
              introStatement: updated.introStatement || "",
              introBioParagraphs: updated.introBioParagraphs || [],
              featuredProjects: (updated.featuredProjects || []).map((fp, idx) => ({
                _key: `fp-${idx}-${fp.slug}`,
                project: {
                  _type: "reference",
                  _ref: `project-${fp.slug}`,
                },
                displayOrder: fp.displayOrder ?? idx + 1,
                isVisible: fp.isVisible !== false,
                customImage: fp.customImage || "",
                customVideoUrl: fp.customVideoUrl || "",
                customTagline: fp.customTagline || "",
              })),
              servicesTitle: updated.servicesTitle || "",
              aboutHeading: updated.aboutHeading || "",
              aboutButtonText: updated.aboutButtonText || "",
              aboutStatement: updated.aboutStatement || "",
              aboutBannerUrl: updated.aboutBannerUrl || DEFAULT_HOMEPAGE_DATA.aboutBannerUrl,
              aboutBannerAlt: updated.aboutBannerAlt || DEFAULT_HOMEPAGE_DATA.aboutBannerAlt,
              contactHeadline: updated.contactHeadline || "",
              contactEmail: updated.contactEmail || "",
              contactAvailability: updated.contactAvailability || "",
              contactLocation: updated.contactLocation || "",
            },
          },
        ]);
      } catch (err) {
        console.warn("[CMS] Sanity homepage save error:", err);
      }
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
          // Filter out legacy mock project card items if present
          const cleaned = parsed.filter(
            (item: any) =>
              item.id !== "media-3" &&
              item.id !== "media-4" &&
              item.id !== "media-5" &&
              item.id !== "media-6" &&
              !item.name?.includes("Production RAG Architecture") &&
              !item.name?.includes("Foodlence Microservices") &&
              !item.name?.includes("WarpSpeed Protocol Desk")
          );
          return cleaned.length > 0 ? cleaned : DEFAULT_MEDIA_ASSETS;
        }
      } catch (e) {}
    }

    return DEFAULT_MEDIA_ASSETS;
  }

  public async addMediaAsset(asset: Omit<CMSMediaAsset, "id" | "createdAt">): Promise<CMSMediaAsset> {
    const list = await this.getMediaAssets();
    const newAsset: CMSMediaAsset = {
      ...asset,
      id: `media-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
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

  public async addMediaAssets(assets: Omit<CMSMediaAsset, "id" | "createdAt">[]): Promise<CMSMediaAsset[]> {
    if (!assets || assets.length === 0) return [];
    const list = await this.getMediaAssets();
    const now = Date.now();
    const newAssets: CMSMediaAsset[] = assets.map((asset, index) => ({
      ...asset,
      id: `media-${now}-${index}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
    }));

    const updated = [...newAssets, ...list];
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(updated));
      this.addActivityLog({
        action: `Uploaded ${newAssets.length} Media Assets`,
        target: newAssets.map((a) => a.name).join(", ").slice(0, 80),
        type: "media",
      });
    }

    return newAssets;
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
      try {
        const sanitySettings = await sanityFetch<any>(SITE_SETTINGS_QUERY);
        if (sanitySettings && typeof sanitySettings === "object") {
          return {
            ...DEFAULT_GLOBAL_SETTINGS,
            ...sanitySettings,
            navLinks:
              Array.isArray(sanitySettings.navLinks) && sanitySettings.navLinks.length > 0
                ? sanitySettings.navLinks
                : DEFAULT_GLOBAL_SETTINGS.navLinks,
            socials:
              Array.isArray(sanitySettings.socials) && sanitySettings.socials.length > 0
                ? sanitySettings.socials
                : DEFAULT_GLOBAL_SETTINGS.socials,
            projectCardConfig: {
              titleLines:
                sanitySettings.projectCardTitleLines ??
                sanitySettings.projectCardConfig?.titleLines ??
                DEFAULT_GLOBAL_SETTINGS.projectCardConfig!.titleLines,
              descriptionLines:
                sanitySettings.projectCardDescLines ??
                sanitySettings.projectCardConfig?.descriptionLines ??
                DEFAULT_GLOBAL_SETTINGS.projectCardConfig!.descriptionLines,
              techStackLines:
                sanitySettings.projectCardTechLines ??
                sanitySettings.projectCardConfig?.techStackLines ??
                DEFAULT_GLOBAL_SETTINGS.projectCardConfig!.techStackLines,
              showCategory:
                sanitySettings.projectCardShowCategory !== undefined
                  ? Boolean(sanitySettings.projectCardShowCategory)
                  : sanitySettings.projectCardConfig?.showCategory !== false,
              showDate:
                sanitySettings.projectCardShowDate !== undefined
                  ? Boolean(sanitySettings.projectCardShowDate)
                  : sanitySettings.projectCardConfig?.showDate !== false,
              showArticleLink:
                sanitySettings.projectCardConfig?.showArticleLink !== false,
              showDemoLink:
                sanitySettings.projectCardConfig?.showDemoLink !== false,
              showSourceLink:
                sanitySettings.projectCardConfig?.showSourceLink !== false,
              showStackButton:
                sanitySettings.projectCardConfig?.showStackButton !== false,
              actionLinksColor:
                sanitySettings.projectCardConfig?.actionLinksColor ||
                DEFAULT_GLOBAL_SETTINGS.projectCardConfig!.actionLinksColor,
            },
          };
        }
      } catch (err) {
        console.warn("[CMS] Failed to fetch settings from Sanity:", err);
      }
    }

    const local = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        return {
          ...DEFAULT_GLOBAL_SETTINGS,
          ...parsed,
          navLinks:
            Array.isArray(parsed.navLinks) && parsed.navLinks.length > 0
              ? parsed.navLinks
              : DEFAULT_GLOBAL_SETTINGS.navLinks,
          socials:
            Array.isArray(parsed.socials) && parsed.socials.length > 0
              ? parsed.socials
              : DEFAULT_GLOBAL_SETTINGS.socials,
          projectCardConfig: {
            ...DEFAULT_GLOBAL_SETTINGS.projectCardConfig!,
            ...(parsed.projectCardConfig || {}),
          },
        };
      } catch (e) {}
    }

    return DEFAULT_GLOBAL_SETTINGS;
  }

  public async saveGlobalSettings(settings: Partial<CMSGlobalSettings>): Promise<CMSGlobalSettings> {
    const current = await this.getGlobalSettings();
    const updated = {
      ...current,
      ...settings,
      projectCardConfig: {
        ...(current.projectCardConfig || DEFAULT_GLOBAL_SETTINGS.projectCardConfig!),
        ...(settings.projectCardConfig || {}),
      },
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      window.dispatchEvent(new Event("cms_card_config_updated"));
      window.dispatchEvent(new Event("cms_settings_updated"));
      this.addActivityLog({
        action: "Updated Global Settings & Card Layout",
        target: "Branding, Navigation, SEO & Card Line Limits",
        type: "settings",
      });
    }

    // Direct Sanity sync if configured
    if (isSanityConfigured()) {
      try {
        await sanityMutate([
          {
            patch: {
              id: "siteSettings",
              set: {
                projectCardTitleLines: updated.projectCardConfig.titleLines,
                projectCardDescLines: updated.projectCardConfig.descriptionLines,
                projectCardTechLines: updated.projectCardConfig.techStackLines,
                projectCardShowCategory: updated.projectCardConfig.showCategory,
                projectCardShowDate: updated.projectCardConfig.showDate,
              },
            },
          },
        ]);
      } catch (err) {
        console.warn("[CMS] Sanity siteSettings patch error:", err);
      }
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

  public async syncAllToSanity(): Promise<{ success: boolean; projectCount: number }> {
    const projects = await this.getProjects();
    const homepage = await this.getHomepageData();
    const settings = await this.getGlobalSettings();

    const mutations: any[] = [];

    // Projects
    for (let idx = 0; idx < projects.length; idx++) {
      const project = projects[idx];
      const img = (
        project.image ||
        (project as any).coverImage ||
        getProjectThumbnail(project.slug, undefined, idx)
      ).trim();

      mutations.push({
        createOrReplace: {
          _id: `project-${project.slug}`,
          _type: "project",
          title: project.title,
          slug: { current: project.slug },
          category: project.category || "Product",
          status: project.status || "Published",
          featured: Boolean(project.featured || project.highlight),
          date: project.date || "2026",
          tagline: project.tagline || project.description || "",
          description: project.description || "",
          longDescription: project.longDescription || project.description || "",
          coverImage: img,
          image: img,
          videoUrl: project.videoDemo?.videoUrl || "",
          tags: project.tags || [],
          githubUrl: project.githubUrl || "",
          demoUrl: project.demoUrl || "",
          writeupUrl: project.writeupUrl || "",
          architecture: project.architecture || "",
          challenges: project.challenges || "",
        },
      });
    }

    // Homepage
    mutations.push({
      createOrReplace: {
        _id: "homepage",
        _type: "homepage",
        heroHeadline: homepage.heroHeadline || "",
        heroSubheadline: homepage.heroSubheadline || "",
        heroVideoUrl: homepage.heroVideoUrl || "",
        heroPosterUrl: homepage.heroPosterUrl || "",
        introStatement: homepage.introStatement || "",
        introBioParagraphs: homepage.introBioParagraphs || [],
        featuredProjects: (homepage.featuredProjects || []).map((fp, idx) => ({
          _key: `fp-${idx}-${fp.slug}`,
          project: {
            _type: "reference",
            _ref: `project-${fp.slug}`,
          },
          displayOrder: fp.displayOrder ?? idx + 1,
          isVisible: fp.isVisible !== false,
          customImage: fp.customImage || "",
          customVideoUrl: fp.customVideoUrl || "",
          customTagline: fp.customTagline || "",
        })),
        servicesTitle: homepage.servicesTitle || "",
        aboutHeading: homepage.aboutHeading || "",
        aboutButtonText: homepage.aboutButtonText || "",
        aboutStatement: homepage.aboutStatement || "",
        aboutBannerUrl: homepage.aboutBannerUrl || DEFAULT_HOMEPAGE_DATA.aboutBannerUrl,
        aboutBannerAlt: homepage.aboutBannerAlt || DEFAULT_HOMEPAGE_DATA.aboutBannerAlt,
        contactHeadline: homepage.contactHeadline || "",
        contactEmail: homepage.contactEmail || "",
        contactAvailability: homepage.contactAvailability || "",
        contactLocation: homepage.contactLocation || "",
      },
    });

    // Site settings
    mutations.push({
      createOrReplace: {
        _id: "siteSettings",
        _type: "siteSettings",
        brandName: settings.brandName,
        wordmark: settings.wordmark,
        editionText: settings.editionText,
        initials: settings.initials,
        accentColor: settings.accentColor,
        ctaButtonText: settings.ctaButtonText,
        ctaButtonUrl: settings.ctaButtonUrl,
        copyrightStatement: settings.copyrightStatement,
        footerTagline: settings.footerTagline,
        defaultTitle: settings.defaultTitle,
        defaultDescription: settings.defaultDescription,
        ogImageUrl: settings.ogImageUrl,
        twitterHandle: settings.twitterHandle,
        projectCardTitleLines: settings.projectCardConfig?.titleLines ?? 2,
        projectCardDescLines: settings.projectCardConfig?.descriptionLines ?? 2,
        projectCardTechLines: settings.projectCardConfig?.techStackLines ?? 2,
        projectCardShowCategory: settings.projectCardConfig?.showCategory !== false,
        projectCardShowDate: settings.projectCardConfig?.showDate !== false,
      },
    });

    const res = await sanityMutate(mutations);
    this.addActivityLog({
      action: "Synced Entire Portfolio to Sanity Cloud",
      target: `${projects.length} projects & homepage sections`,
      type: "settings",
    });

    return { success: true, projectCount: projects.length };
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
