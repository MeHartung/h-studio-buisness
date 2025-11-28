import { StructuredData } from '@/components/StructuredData';
import { BlogPost } from '@/lib/blog';

interface BlogPostSchemaProps {
  post: BlogPost;
  baseUrl: string;
}

export function BlogPostSchema({ post, baseUrl }: BlogPostSchemaProps) {
  const postUrl = `${baseUrl}/ru/blog/${post.slug}`;
  // Use default image for schema (we don't use actual images, but schema needs an image)
  const imageUrl = `${baseUrl}/1.png`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": imageUrl,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": baseUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": "H-Studio Business",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo-white.svg`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl,
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "url": postUrl,
  };

  return <StructuredData data={articleSchema} />;
}

