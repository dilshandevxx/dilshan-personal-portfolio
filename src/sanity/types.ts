/**
 * Sanity CMS Document Types & Schema Definitions
 */

export interface SanityReference {
  _type: "reference";
  _ref: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
    url?: string;
  };
  alt?: string;
  caption?: string;
}

export interface SanityProject {
  _id: string;
  _type: "project";
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug: { current: string };
  category: string;
  date: string;
  status: "Published" | "Draft" | "Archived";
  featured?: boolean;
  orderRank?: number;
  tagline: string;
  description: string;
  longDescription?: string;
  coverImage?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  highlights?: string[];
  tags?: string[];
  metricsDetail?: { label: string; value: string }[];
  stackLayers?: { layer: string; technologies: string[] }[];
  gallery?: { url: string; caption?: string; title?: string }[];
  githubUrl?: string;
  demoUrl?: string;
  writeupUrl?: string;
  architecture?: string;
  challenges?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface SanityFeaturedProjectRef {
  _key: string;
  project: SanityReference;
  customImage?: string;
  customVideoUrl?: string;
  customTagline?: string;
  displayOrder: number;
  isVisible: boolean;
}

export interface SanityHomepage {
  _id: "homepage";
  _type: "homepage";
  hero: {
    title: string;
    headline: string;
    subheadline: string;
    videoUrl?: string;
    posterImageUrl?: string;
    ctaLabel?: string;
    ctaUrl?: string;
  };
  introduction: {
    statement: string;
    extendedBio: string[];
    missionPunchline: string;
  };
  featuredProjects: SanityFeaturedProjectRef[];
  services: {
    title: string;
    domains: {
      id: string;
      title: string;
      description: string;
      image: string;
      tags: string[];
    }[];
  };
  aboutPreview: {
    headline: string;
    statement: string;
    buttonLabel: string;
    buttonUrl: string;
  };
  contact: {
    heading: string;
    subheading: string;
    email: string;
    location: string;
    availabilityStatus: string;
  };
}

export interface SanityMediaAsset {
  _id: string;
  _type: "mediaAsset";
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

export interface SanitySiteSettings {
  _id: "siteSettings";
  _type: "siteSettings";
  branding: {
    brandName: string;
    wordmark: string;
    editionText: string;
    initials: string;
    faviconUrl?: string;
  };
  navigation: {
    links: { label: string; url: string; order: number }[];
    ctaButton: {
      text: string;
      url: string;
      color: string;
    };
  };
  socials: {
    platform: string;
    url: string;
    handle: string;
  }[];
  footer: {
    copyrightName: string;
    tagline: string;
    rightsReserved: string;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    ogImageUrl?: string;
    twitterHandle?: string;
  };
}
