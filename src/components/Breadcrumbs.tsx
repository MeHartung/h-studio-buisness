'use client';

import { Link } from '@/i18n/routing';
import { HiChevronRight } from 'react-icons/hi';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex flex-wrap items-center gap-2 text-sm text-text/70 mb-6 ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <span key={index} className="flex items-center gap-2">
            {isLast ? (
              <span className="text-text font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                <Link
                  href={item.href}
                  className="hover:text-text transition-colors"
                >
                  {item.label}
                </Link>
                <HiChevronRight className="w-4 h-4 text-text/40 flex-shrink-0" aria-hidden="true" />
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
}

