import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.h-studio-tech.ru';
  
  const routes = [
    '',
    '/services',
    '/services/1',
    '/services/2',
    '/services/3',
    '/services/4',
    '/services/5',
    '/services/6',
    '/services/7',
    '/services/8',
    '/legal-notice',
    '/blog',
  ];

  // Add blog posts
  const blogPosts = getAllPosts();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/ru/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}/ru${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route === '/services' ? 0.9 : route === '/blog' ? 0.8 : 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}

