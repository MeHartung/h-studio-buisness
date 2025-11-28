'use client';

import { useState, useEffect } from 'react';
import { useParams as useNextParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { 
  HiArrowRight, 
  HiCheckCircle,
  HiPhone,
  HiArrowUp,
  HiCalculator,
  HiArrowLeft
} from 'react-icons/hi';
import CookieBanner from '@/components/CookieBanner';
import Header from '@/components/Header';

export default function ServiceDetailPage() {
  const params = useNextParams();
  const serviceId = params.id as string;
  const t = useTranslations(`serviceDetail.service${serviceId}`);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const problems = t.raw('problems') as string[];
  const howItWorks = t.raw('howItWorks') as string[];
  const results = t.raw('results') as string[];
  const whyUs = t.raw('whyUs') as string[];

  // Безопасная функция для получения описания, если оно есть
  const getDescription = (solutionKey: string): string => {
    try {
      const solutionData = t.raw(solutionKey) as any;
      if (solutionData && typeof solutionData === 'object' && 'description' in solutionData) {
        return typeof solutionData.description === 'string' ? solutionData.description : '';
      }
      return '';
    } catch {
      // Если ключ не существует, возвращаем пустую строку
      return '';
    }
  };

  // Динамически собираем решения (может быть от 1 до 6)
  const solutions: Array<{ title: string; description: string; items: string[] }> = [];
  for (let i = 1; i <= 6; i++) {
    const solutionKey = `solution${i}`;
    try {
      const title = t(`${solutionKey}.title`);
      const items = t.raw(`${solutionKey}.items`) as string[];
      if (title && items) {
        solutions.push({
          title,
          description: getDescription(solutionKey),
          items
        });
      }
    } catch {
      // Если решения нет, прекращаем цикл
      break;
    }
  }

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Gradients */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(1200px 600px at 20% -10%, rgba(124, 92, 252, 0.25), transparent), radial-gradient(800px 400px at 90% 10%, rgba(107, 230, 117, 0.15), transparent)'
            }}
          />
          
          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <Header />
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 lg:pt-24 lg:pb-36 relative z-10">
            <div className="max-w-4xl">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-text/70 hover:text-text transition-colors mb-6"
              >
                <HiArrowLeft size={20} />
                <span>Назад к услугам</span>
              </Link>
              <h1 className="text-[56px] leading-[64px] font-semibold tracking-[-0.02em] text-text font-display mb-4">
                {t('title')}
              </h1>
              <p className="text-xl text-text/80 leading-7 mb-6">
                {t('subtitle')}
              </p>
              <p className="text-base text-text/70 leading-7 mb-4">
                {t('intro')}
              </p>
              <p className="text-base text-text/70 leading-7">
                {t('intro2')}
              </p>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="bg-card border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-8">
              {t('problemsTitle')}
            </h2>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-500 flex-shrink-0 mt-0.5">
                    <HiCheckCircle size={20} />
                  </span>
                  <span className="text-base text-text/80 leading-relaxed">{problem}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base text-text/70 font-medium">
              Автоматизация убирает эти риски полностью.
            </p>
          </div>
        </section>

        {/* Solution Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('solutionTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center mb-4 text-brand">
                  <HiCalculator size={24} />
                </div>
                <h3 className="text-[20px] leading-[28px] font-semibold text-text mb-2">
                  {solution.title}
                </h3>
                {solution.description && (
                  <p className="text-xs text-text/60 mb-4 italic">
                    {solution.description}
                  </p>
                )}
                <ul className="space-y-2">
                  {solution.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted">
                      <span className="text-brand flex-shrink-0 mt-0.5">
                        <HiCheckCircle size={16} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="bg-card border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-8">
              {t('howItWorksTitle')}
            </h2>
            <ol className="space-y-4 mb-6">
              {howItWorks.map((step, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-brand/20 rounded-full flex items-center justify-center text-brand font-semibold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-base text-text/80 leading-relaxed pt-1">{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-base text-text/70 font-medium">
              {t('howItWorksNote')}
            </p>
          </div>
        </section>

        {/* Results Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('resultsTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <div
                key={index}
                className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.2)]"
              >
                <div className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0 mt-0.5">
                    <HiCheckCircle size={20} />
                  </span>
                  <span className="text-base text-text/80 leading-relaxed">{result}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Examples Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('examplesTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]">
              <h3 className="text-[20px] leading-[28px] font-semibold text-text mb-3">
                {t('example1.title')}
              </h3>
              <p className="text-sm text-muted leading-6 mb-4">
                {t('example1.description')}
              </p>
              <p className="text-sm text-brand font-medium">
                {t('example1.result')}
              </p>
            </div>
            <div className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]">
              <h3 className="text-[20px] leading-[28px] font-semibold text-text mb-3">
                {t('example2.title')}
              </h3>
              <p className="text-sm text-muted leading-6 mb-4">
                {t('example2.description')}
              </p>
              <p className="text-sm text-brand font-medium">
                {t('example2.result')}
              </p>
            </div>
            <div className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]">
              <h3 className="text-[20px] leading-[28px] font-semibold text-text mb-3">
                {t('example3.title')}
              </h3>
              <p className="text-sm text-muted leading-6 mb-4">
                {t('example3.description')}
              </p>
              {t('example3.result') && (
                <p className="text-sm text-brand font-medium">
                  {t('example3.result')}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('whyUsTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, index) => (
              <div
                key={index}
                className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.2)]"
              >
                <div className="flex items-start gap-3">
                  <span className="text-brand flex-shrink-0 mt-0.5">
                    <HiCheckCircle size={20} />
                  </span>
                  <span className="text-base text-text/80 leading-relaxed">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="bg-card border border-white/10 rounded-3xl p-12 lg:p-16 text-center shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="text-base text-text/70 mb-8 max-w-2xl mx-auto">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link
                href="mailto:info@h-studio-tech.ru?subject=Получить разбор"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.5)] focus:outline-none focus:ring-2 focus:ring-brand/60"
              >
                <span>{t('ctaButton1')}</span>
                <HiArrowRight size={20} />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-text font-semibold rounded-xl hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand/60"
              >
                {t('ctaButton2')}
              </Link>
            </div>
          </div>
        </section>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-brand text-white rounded-full shadow-lg hover:bg-brand/90 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand/60"
            aria-label="Scroll to top"
          >
            <HiArrowUp size={24} />
          </button>
        )}

        {/* Cookie Banner */}
        <CookieBanner />
      </div>
    </div>
  );
}

