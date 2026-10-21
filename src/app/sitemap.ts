import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dilshan.dev';

  const staticRoutes = [
    '',
    '/portfolio',
    '/portfolio/projects',
    '/portfolio/blog',
    '/portfolio/about',
    '/portfolio/skills',
    '/portfolio/life',
    '/portfolio/resume',
    '/portfolio/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogRoutes = siteConfig.blogPosts.map((post) => ({
    url: `${baseUrl}/portfolio/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
