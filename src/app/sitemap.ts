import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { getServiceSlugById } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.h-studio-tech.ru';
  
  // Генерируем slug для всех сервисов
  const serviceSlugs = ['1', '2', '3', '4', '5', '6', '7', '8']
    .map(id => getServiceSlugById(id))
    .filter((slug): slug is string => slug !== null);
  
  const routes = [
    '',
    '/about',
    '/services',
    ...serviceSlugs.map(slug => `/services/${slug}`),
    '/legal-notice',
    '/blog',
    '/clients',
    '/enterprise-cases/vtb-bank',
    '/enterprise-cases/sber',
    '/enterprise-cases/societe-generale',
    '/enterprise-cases/eventstripe',
    // Специализированные решения
    '/solutions/cpq-proizvodstvo',
    '/solutions/integraciya-1c-proizvodstvo',
    '/solutions/avtomatizaciya-raschetov-kabel',
    '/solutions/avtomatizaciya-dokumentooborota-inzhenernye-byuro',
    '/solutions/vnedrenie-cpq-sistem',
    // Отрасли
    '/industries',
    '/industries/metalloobrabotka-metallokonstrukcii',
    '/industries/kabel-provod-profil',
    '/industries/oborudovanie-mashinostroenie',
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
    priority: route === '' ? 1 
      : route === '/services' ? 0.9 
      : route === '/about' ? 0.9 
      : route === '/clients' ? 0.9
      : route === '/industries' ? 0.85
      : route.startsWith('/solutions/') ? 0.85
      : route.startsWith('/industries/') ? 0.8
      : route.startsWith('/enterprise-cases/') ? 0.8
      : route === '/blog' ? 0.8 
      : 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}

