"use client";

import { useTranslations } from 'next-intl';

const Values = () => {
  const t = useTranslations('about.values');
  
  const values = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: t('value1.title'),
      description: t('value1.description')
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: t('value2.title'),
      description: t('value2.description')
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
      title: t('value3.title'),
      description: t('value3.description')
    },
    {
      id: 4,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      ),
      title: t('value4.title'),
      description: t('value4.description')
    }
  ];

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
          {/* Бейдж "Values" */}
          <div className="mb-6 inline-block">
            <div className="bg-brand/20 text-brand px-4 py-2 rounded-xl text-sm font-medium border border-brand/30">
              {t('badge')}
            </div>
          </div>

          {/* Заголовок */}
          <h2 className="mb-16 text-4xl lg:text-6xl font-semibold text-text leading-tight tracking-[-0.02em]">
            {t('mainTitle').split('\n').map((line, index) => (
              <span key={index}>
                {index === 1 ? (
                  <span className="text-text/80">{line}</span>
                ) : (
                  line
                )}
                {index < t('mainTitle').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        {/* Ценности */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={value.id}
              className="bg-card border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.2)]"
              style={{
                animation: `fadeInUp 0.6s ease-out forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              {/* Иконка */}
              <div className="w-16 h-16 bg-brand rounded-xl flex items-center justify-center text-white mb-6">
                {value.icon}
              </div>

              {/* Заголовок */}
              <h3 className="text-xl font-semibold text-text mb-4">
                {value.title}
              </h3>

              {/* Описание */}
              <p className="text-text/80 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;

