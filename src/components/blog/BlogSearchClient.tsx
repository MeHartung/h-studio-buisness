'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { HiSearch, HiX } from 'react-icons/hi';

interface BlogSearchClientProps {
  categories: string[];
  tags: string[];
  initialCategory?: string;
  initialTag?: string;
  initialSearch?: string;
}

export function BlogSearchClient({
  categories,
  tags,
  initialCategory,
  initialTag,
  initialSearch,
}: BlogSearchClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || '');
  const [selectedTag, setSelectedTag] = useState(initialTag || '');
  
  // Extract locale from pathname (e.g., /ru/blog -> ru)
  const locale = pathname.split('/')[1] || 'ru';

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams.toString());
    
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    
    if (selectedTag) {
      params.set('tag', selectedTag);
    }

    startTransition(() => {
      router.push(`/${locale}/blog?${params.toString()}`);
    });
  };

  const handleCategoryChange = (category: string) => {
    const newCategory = category === selectedCategory ? '' : category;
    setSelectedCategory(newCategory);
    const params = new URLSearchParams(searchParams.toString());
    
    if (newCategory) {
      params.set('category', newCategory);
    } else {
      params.delete('category');
    }
    
    if (selectedTag) {
      params.set('tag', selectedTag);
    }
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }

    startTransition(() => {
      router.push(`/${locale}/blog?${params.toString()}`);
    });
  };

  const handleTagChange = (tag: string) => {
    const newTag = tag === selectedTag ? '' : tag;
    setSelectedTag(newTag);
    const params = new URLSearchParams(searchParams.toString());
    
    if (newTag) {
      params.set('tag', newTag);
    } else {
      params.delete('tag');
    }
    
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }

    startTransition(() => {
      router.push(`/${locale}/blog?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTag('');
    startTransition(() => {
      router.push(`/${locale}/blog`);
    });
  };

  const hasActiveFilters = selectedCategory || selectedTag || searchQuery;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Поиск по статьям..."
          className="w-full pl-12 pr-12 py-3 bg-card border border-white/10 rounded-xl text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/50 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted hover:text-text transition-colors"
          >
            <HiX size={20} />
          </button>
        )}
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-text mb-3">Категории</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-brand text-black'
                    : 'bg-card border border-white/10 text-muted hover:border-brand/50 hover:text-text'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-text mb-3">Теги</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-brand text-black'
                    : 'bg-white/5 text-muted hover:bg-white/10 hover:text-text'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-sm text-muted hover:text-brand transition-colors flex items-center gap-2"
        >
          <HiX size={16} />
          Очистить фильтры
        </button>
      )}
    </div>
  );
}

