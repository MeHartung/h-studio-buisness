"use client";

import { useTranslations } from 'next-intl';

const WhatWeDo = () => {
  const t = useTranslations('about.whatWeDo');
  
  const categories = t.raw('categories') as {
    automation: { title: string; items: string[] };
    documentFlow: { title: string; items: string[] };
    integrations: { title: string; items: string[] };
    aiAnalytics: { title: string; items: string[] };
  };

  return (
    <section className="relative bg-bg pt-12 pb-12 lg:py-32">
      {/* Надписи для десктопа */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 px-2 py-4">
        <div className="flex justify-between items-center">
          <span className="text-text/60 text-lg font-bold">{t('mobileLabel1')}</span>
          <span className="text-text/60 text-lg font-bold">{t('mobileLabel2')}</span>
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
          <h2 className="mb-8 text-4xl lg:text-6xl font-semibold text-text leading-tight tracking-[-0.02em]">
            {t('mainTitle')}
          </h2>

          {/* Описание */}
          <div className="mb-12 max-w-4xl mx-auto text-left">
            <p className="text-lg text-text/80 leading-relaxed mb-8">
              {t('description')}
            </p>
          </div>

          {/* Категории услуг */}
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Автоматизация расчётов и КП */}
            <div
              className="text-left"
              style={{
                animation: `fadeInUp 0.6s ease-out forwards`,
                animationDelay: `0.2s`,
                opacity: 0,
              }}
            >
              <h3 className="text-2xl font-semibold text-text mb-4">
                {categories?.automation?.title}
              </h3>
              <ul className="space-y-2">
                {categories?.automation?.items?.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-base text-text/80">
                    <span className="text-brand font-bold mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Документооборот и согласования */}
            <div
              className="text-left"
              style={{
                animation: `fadeInUp 0.6s ease-out forwards`,
                animationDelay: `0.3s`,
                opacity: 0,
              }}
            >
              <h3 className="text-2xl font-semibold text-text mb-4">
                {categories?.documentFlow?.title}
              </h3>
              <ul className="space-y-2">
                {categories?.documentFlow?.items?.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-base text-text/80">
                    <span className="text-brand font-bold mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Интеграции с 1С, ERP и CRM */}
            <div
              className="text-left"
              style={{
                animation: `fadeInUp 0.6s ease-out forwards`,
                animationDelay: `0.4s`,
                opacity: 0,
              }}
            >
              <h3 className="text-2xl font-semibold text-text mb-4">
                {categories?.integrations?.title}
              </h3>
              <ul className="space-y-2">
                {categories?.integrations?.items?.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-base text-text/80">
                    <span className="text-brand font-bold mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI-аналитика и операционные ассистенты */}
            <div
              className="text-left"
              style={{
                animation: `fadeInUp 0.6s ease-out forwards`,
                animationDelay: `0.5s`,
                opacity: 0,
              }}
            >
              <h3 className="text-2xl font-semibold text-text mb-4">
                {categories?.aiAnalytics?.title}
              </h3>
              <ul className="space-y-2">
                {categories?.aiAnalytics?.items?.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-base text-text/80">
                    <span className="text-brand font-bold mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Футер */}
          <div className="mt-12 max-w-4xl mx-auto text-left">
            <p className="text-lg text-text/80 leading-relaxed">
              {t('footer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
