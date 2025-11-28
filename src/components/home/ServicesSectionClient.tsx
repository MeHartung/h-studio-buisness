'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { HiArrowRight, HiChevronDown } from 'react-icons/hi';

export default function ServicesSectionClient() {
  const t = useTranslations('ourServices');
  const [openDropdowns, setOpenDropdowns] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = [
    {
      title: t('category1.title'),
      services: t.raw('category1.services') as Array<{ title: string; description: string; link: string }>
    },
    {
      title: t('category2.title'),
      services: t.raw('category2.services') as Array<{ title: string; description: string; link: string }>
    },
    {
      title: t('category3.title'),
      services: t.raw('category3.services') as Array<{ title: string; description: string; link: string }>
    },
    {
      title: t('category4.title'),
      services: t.raw('category4.services') as Array<{ title: string; description: string; link: string }>
    }
  ];

  const handleDropdownToggle = (categoryIndex: number) => {
    const newOpenDropdowns = new Set(openDropdowns);
    
    if (newOpenDropdowns.has(categoryIndex)) {
      newOpenDropdowns.delete(categoryIndex);
      if (!isMobile) {
        const pairIndex = categoryIndex % 2 === 0 ? categoryIndex + 1 : categoryIndex - 1;
        newOpenDropdowns.delete(pairIndex);
      }
    } else {
      newOpenDropdowns.add(categoryIndex);
      if (!isMobile) {
        const pairIndex = categoryIndex % 2 === 0 ? categoryIndex + 1 : categoryIndex - 1;
        if (pairIndex < categories.length) {
          newOpenDropdowns.add(pairIndex);
        }
      }
    }
    
    setOpenDropdowns(newOpenDropdowns);
  };

  return (
    <>
      <div className="text-center mb-12">
        <div className="mb-6 inline-block">
          <div className="bg-brand/20 text-brand px-4 py-2 rounded-xl text-sm font-medium border border-brand/30">
            {t('badge')}
          </div>
        </div>

        <p className="text-base text-muted mb-8 leading-6 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border border-white/10 rounded-2xl p-6 bg-card">
            <button
              onClick={() => handleDropdownToggle(categoryIndex)}
              className="flex items-center justify-center w-full text-center group mb-4 relative"
            >
              <h3 className="text-lg lg:text-xl font-semibold text-text group-hover:text-brand transition-colors">
                {category.title}
              </h3>
              <div className={`absolute right-0 flex-shrink-0 transition-transform duration-300 ${openDropdowns.has(categoryIndex) ? 'rotate-180' : ''}`}>
                <HiChevronDown className="w-5 h-5 text-brand" />
              </div>
            </button>
            
            {openDropdowns.has(categoryIndex) && (
              <div className="mt-4 overflow-visible transition-all duration-300 ease-in-out">
                <div className="space-y-4">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="pl-4 border-l-2 border-brand/30">
                      <Link 
                        href={service.link}
                        className="block group/item"
                      >
                        <h4 className="text-base font-semibold text-text group-hover/item:text-brand transition-colors mb-2">
                          {service.title}
                        </h4>
                        <p className="text-sm text-text/80 leading-6 mb-3">
                          {service.description}
                        </p>
                        <span className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand/80 transition-colors font-medium">
                          Читать больше
                          <HiArrowRight size={16} />
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-xl hover:bg-brand/90 transition-colors font-medium shadow-[0_10px_30px_-12px_rgba(124,92,252,0.4)]"
        >
          {t('viewAll')}
          <HiArrowRight size={20} />
        </Link>
      </div>
    </>
  );
}

