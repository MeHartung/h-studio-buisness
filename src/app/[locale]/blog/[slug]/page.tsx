import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPostSchema } from '@/components/blog/BlogPostSchema';
import { formatDate, formatDateISO } from '@/lib/date-utils';
import { BlogCover } from '@/components/blog/BlogCover';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Пост не найден',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `${baseUrl}/${locale}/blog/${slug}`;
  const ogImage = post.image || `${baseUrl}/1.png`;

  return {
    title: `${post.title} | Блог H-Studio`,
    description: post.excerpt,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: currentUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: currentUrl,
      siteName: "H-Studio Business",
      locale: 'ru_RU',
      type: "article",
      publishedTime: formatDateISO(post.date),
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('blog');
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Find post index for cover color alternation
  const allPosts = getAllPosts();
  const postIndex = allPosts.findIndex(p => p.slug === slug);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted">
          <Link href={`/${locale}`} className="hover:text-brand transition-colors">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${locale}/blog`} className="hover:text-brand transition-colors">
            Блог
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text">{post.title}</span>
        </nav>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold text-brand bg-brand/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-muted">
                {formatDate(post.date)}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-text mb-4 font-display">
              {post.title}
            </h1>
            <p className="text-lg text-muted mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted">
              <span>{t('author')}: {post.author}</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted bg-white/5 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Featured Cover */}
          <div className="mb-8 rounded-2xl overflow-hidden">
            <BlogCover 
              index={postIndex >= 0 ? postIndex : 0}
              title={post.title}
              className="w-full h-64 lg:h-96"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-bold text-text mt-8 mb-4 font-display" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-semibold text-text mt-6 mb-3 font-display" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl font-semibold text-text mt-4 mb-2 font-display" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-muted mb-4 leading-relaxed" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a className="text-brand hover:underline" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside mb-4 text-muted space-y-2" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-inside mb-4 text-muted space-y-2" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-muted" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold text-text" {...props} />
                ),
                code: ({ node, ...props }) => (
                  <code className="bg-white/5 text-brand px-2 py-1 rounded text-sm" {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-brand hover:underline"
          >
            ← {t('backToBlog')}
          </Link>
        </div>

        {/* Schema.org */}
        <BlogPostSchema post={post} baseUrl={baseUrl} />
      </main>
    </div>
  );
}

