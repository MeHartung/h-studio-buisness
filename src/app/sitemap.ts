import { MetadataRoute } from 'next';

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
  ];

  return routes.map((route) => ({
    url: `${baseUrl}/ru${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route === '/services' ? 0.9 : 0.8,
  }));
}

