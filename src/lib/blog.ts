import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  image?: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Validate and format date
      let postDate = data.date || '';
      if (postDate) {
        try {
          const dateObj = new Date(postDate);
          if (isNaN(dateObj.getTime())) {
            // Invalid date, use current date as fallback
            postDate = new Date().toISOString().split('T')[0];
          } else {
            // Ensure date is in YYYY-MM-DD format
            postDate = dateObj.toISOString().split('T')[0];
          }
        } catch (error) {
          postDate = new Date().toISOString().split('T')[0];
        }
      } else {
        // No date provided, use current date
        postDate = new Date().toISOString().split('T')[0];
      }

      return {
        slug: data.slug || fileName.replace(/\.md$/, ''),
        title: data.title || '',
        date: postDate,
        author: data.author || 'H-Studio Team',
        category: data.category || '',
        tags: data.tags || [],
        excerpt: data.excerpt || '',
        image: data.image || undefined, // Optional, not used anymore but kept for backward compatibility
        content,
      } as BlogPost;
    });

  // Sort posts by date in descending order
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validate and format date
    let postDate = data.date || '';
    if (postDate) {
      try {
        const dateObj = new Date(postDate);
        if (isNaN(dateObj.getTime())) {
          postDate = new Date().toISOString().split('T')[0];
        } else {
          postDate = dateObj.toISOString().split('T')[0];
        }
      } catch (error) {
        postDate = new Date().toISOString().split('T')[0];
      }
    } else {
      postDate = new Date().toISOString().split('T')[0];
    }

    return {
      slug: data.slug || slug,
      title: data.title || '',
      date: postDate,
      author: data.author || 'H-Studio Team',
      category: data.category || '',
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      image: data.image,
      content,
    } as BlogPost;
  } catch (error) {
    return null;
  }
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

