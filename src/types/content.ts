export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: 'Distributed Systems' | 'Developer Tooling' | 'AI & Knowledge Systems' | 'UI & Architecture';
  year: string;
  stars?: string;
  stack: string[];
  role: string;
  githubUrl?: string;
  demoUrl?: string;
  articleUrl?: string;
  architectureHighlights: string[];
  challenges: string[];
  outcomes: string[];
  featured: boolean;
  status: 'Production' | 'Open Source' | 'Research Prototype';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  summary: string;
  content: string;
  featured?: boolean;
}

export interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  technologies?: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  honors?: string;
  focus: string[];
}

export interface ValueItem {
  title: string;
  quote: string;
  explanation: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  items: string[];
}

export interface BookRecommendation {
  title: string;
  author: string;
  category: 'Engineering & Systems' | 'Philosophy & Thought' | 'Literature & Essays' | 'Science';
  note: string;
  status: 'Finished' | 'Currently Reading' | 'Re-reading';
}

export interface HobbyInterest {
  category: string;
  title: string;
  description: string;
  details: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  initials: string;
  wordmark: string;
  edition: string;
  title: string;
  tagline: string;
  location: string;
  status: string;
  shortBio: string;
  extendedBio: string[];
  currentFocus: string;
  colophon: {
    typography: string;
    designSystem: string;
    builtWith: string;
    lastUpdated: string;
  };
  socials: SocialLink[];
  projects: Project[];
  blogPosts: BlogPost[];
  experience: TimelineEntry[];
  education: EducationEntry[];
  values: ValueItem[];
  skills: SkillCategory[];
  books: BookRecommendation[];
  hobbies: HobbyInterest[];
}
