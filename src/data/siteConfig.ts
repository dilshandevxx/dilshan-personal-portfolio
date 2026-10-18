export interface SiteConfig {
  name: string;
  siteName: string;
  tagline: string;
  sidebarBio: string;
  social: {
    github: string;
    linkedin: string;
    facebook: string;
    x: string;
    email: string;
  };
  navigation: Array<{
    label: string;
    icon: string;
    path: string;
  }>;
}

export const siteConfig: SiteConfig = {
  name: "Dilshan",
  siteName: "dilshan.dev",
  tagline: "Full-stack developer and AI/ML engineer.",
  sidebarBio: "I'm Dilshan, full-stack developer and AI/ML engineer. This is my digital garden.",
  social: {
    github: "https://github.com/dilshandevxx",
    linkedin: "https://linkedin.com/in/heydilshan/",
    facebook: "https://www.facebook.com/dilshan.here",
    x: "https://x.com/dilshanverse",
    email: "dilshan.devxx@gmail.com",
  },
  navigation: [
    { label: "Blog", icon: "book", path: "/blog" },
    { label: "Shelves", icon: "compass", path: "/shelves" },
    { label: "Projects", icon: "folder", path: "/projects" },
    { label: "About me", icon: "user", path: "/about" },
  ],
};

