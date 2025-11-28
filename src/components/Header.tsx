'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Header() {
  const tNav = useTranslations('navigation');
  const tFooter = useTranslations('footer');

  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 relative z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-white.svg"
              alt="H-Studio - Автоматизация расчётов и КП"
              width={120}
              height={20}
              className="h-5 w-auto"
              style={{ width: 'auto', height: '1.25rem' }}
              priority
            />
          </Link>
        </div>
        <nav className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1">
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-text font-semibold rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand/60"
            aria-label={tNav('services')}
          >
            {tNav('services')}
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-text font-semibold rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand/60"
            aria-label={tFooter('blog')}
          >
            {tFooter('blog')}
          </Link>
        </nav>
      </div>
    </header>
  );
}

