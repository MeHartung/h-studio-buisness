"use client";

import { useTranslations } from 'next-intl';

const OurApproach = () => {
  const t = useTranslations('about.ourApproach');
  
  const principles = t.raw('principles') as Array<{ title: string; description: string }>;

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
            <p className="text-lg text-text/80 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Принципы */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="bg-card border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.2)]"
                style={{
                  animation: `fadeInUp 0.6s ease-out forwards`,
                  animationDelay: `${0.3 + index * 0.1}s`,
                  opacity: 0,
                }}
              >
                {/* Номер */}
                <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white mb-6 text-xl font-semibold">
                  {index + 1}
                </div>

                {/* Заголовок */}
                <h3 className="text-xl font-semibold text-text mb-4">
                  {principle.title}
                </h3>

                {/* Описание */}
                <p className="text-text/80 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurApproach;

