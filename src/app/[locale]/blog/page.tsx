import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog';
import { Link } from '@/i18n/routing';
import { Metadata } from 'next';
import { BlogSearchClient } from '@/components/blog/BlogSearchClient';
import { formatDate } from '@/lib/date-utils';
import { BlogCover } from '@/components/blog/BlogCover';
import Header from '@/components/Header';
import { WebPageSchema, BreadcrumbSchema } from '@/components/StructuredData';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `${baseUrl}/${locale}/blog`;
  const ogImage = `${baseUrl}/1.png`;

  return {
    title: "Блог | Автоматизация расчётов и КП для производства – H-Studio",
    description: "Статьи об автоматизации расчётов, коммерческих предложений, себестоимости и спецификаций для производственных и инженерных компаний.",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: currentUrl,
    },
    openGraph: {
      title: "Блог | Автоматизация расчётов и КП для производства – H-Studio",
      description: "Статьи об автоматизации расчётов, коммерческих предложений, себестоимости и спецификаций для производственных и инженерных компаний.",
      url: currentUrl,
      siteName: "H-Studio Business",
      locale: 'ru_RU',
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "H-Studio Business Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Блог | Автоматизация расчётов и КП для производства – H-Studio",
      description: "Статьи об автоматизации расчётов, коммерческих предложений, себестоимости и спецификаций для производственных и инженерных компаний.",
      images: [ogImage],
    },
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; tag?: string; search?: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations('blog');
  const allPosts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  // Filter posts based on search params
  let filteredPosts = allPosts;
  
  if (resolvedSearchParams.category) {
    filteredPosts = filteredPosts.filter((post) => post.category === resolvedSearchParams.category);
  }
  
  if (resolvedSearchParams.tag) {
    filteredPosts = filteredPosts.filter((post) => post.tags.includes(resolvedSearchParams.tag!));
  }
  
  if (resolvedSearchParams.search) {
    const searchLower = resolvedSearchParams.search.toLowerCase();
    filteredPosts = filteredPosts.filter((post) => 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `/${locale}/blog`;

  const breadcrumbItems = [
    { name: 'Главная', url: `/${locale}` },
    { name: 'Блог', url: currentUrl }
  ];

  return (
    <div className="min-h-screen bg-background">
      <WebPageSchema 
        pageUrl={currentUrl}
        title={t('title')}
        description={t('description')}
        locale={locale}
      />
      <BreadcrumbSchema 
        items={breadcrumbItems}
        pageUrl={currentUrl}
      />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-text mb-4 font-display">
            {t('title')}
          </h1>
          <p className="text-lg text-muted max-w-3xl">
            {t('description')}
          </p>
        </div>

        {/* Search and Filters */}
        <BlogSearchClient 
          categories={categories}
          tags={tags}
          initialCategory={resolvedSearchParams.category}
          initialTag={resolvedSearchParams.tag}
          initialSearch={resolvedSearchParams.search}
        />

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-brand/50 transition-all duration-300 hover:shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]"
              >
                <BlogCover 
                  index={index} 
                  title={post.title}
                  className="w-full h-48"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-brand bg-brand/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-text mb-2 group-hover:text-brand transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-muted bg-white/5 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-brand font-medium group-hover:underline">
                    {t('readMore')} →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted">{t('noPosts')}</p>
          </div>
        )}
      </main>
    </div>
  );
}

