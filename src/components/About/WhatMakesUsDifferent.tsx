"use client";

import { useTranslations } from 'next-intl';

const WhatMakesUsDifferent = () => {
  const t = useTranslations('about.whatMakesUsDifferent');
  
  const items = t.raw('items') as string[];

  return (
    <section className="relative bg-bg pt-12 pb-12 lg:py-32">
      {/* Надписи для десктопа */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 px-2 py-4">
        <div className="flex justify-between items-center">
          <span className="text-text/70 text-lg font-bold">{t('mobileLabel1')}</span>
          <span className="text-text/70 text-lg font-bold">{t('mobileLabel2')}</span>
        </div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-fit mx-auto">
          {/* Бейдж */}
          <div className="mb-6 inline-block">
            <div className="bg-brand/20 text-brand px-4 py-2 rounded-xl text-sm font-medium border border-brand/30">
              {t('badge')}
            </div>
          </div>

          {/* Заголовок */}
          <h2 className="mb-12 text-4xl lg:text-6xl font-semibold text-text leading-tight tracking-[-0.02em]">
            {t('mainTitle')}
          </h2>

          {/* Список отличий */}
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-6">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-lg text-text/80"
                  style={{
                    animation: `fadeInUp 0.6s ease-out forwards`,
                    animationDelay: `${0.2 + index * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  <span className="text-brand font-bold mt-1 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatMakesUsDifferent;

