'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { 
  HiArrowRight, 
  HiCog, 
  HiSearch,
  HiLightBulb,
  HiDocumentText,
  HiPuzzle,
  HiUser,
  HiCheckCircle,
  HiTrendingUp,
  HiSparkles,
  HiPhone,
  HiLocationMarker,
  HiArrowUp,
  HiChartBar,
  HiCalculator,
  HiMail
} from 'react-icons/hi';
import { FaLinkedin, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import CookieBanner from '@/components/CookieBanner';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function ServicesPage() {
  const t = useTranslations('services');
  const tNav = useTranslations('navigation');
  const tFooter = useTranslations('footer');
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

  const services = [
    {
      icon: HiCalculator,
      title: t('servicesList.service1.title'),
      description: t('servicesList.service1.description')
    },
    {
      icon: HiLightBulb,
      title: t('servicesList.service2.title'),
      description: t('servicesList.service2.description')
    },
    {
      icon: HiDocumentText,
      title: t('servicesList.service3.title'),
      description: t('servicesList.service3.description')
    },
    {
      icon: HiTrendingUp,
      title: t('servicesList.service4.title'),
      description: t('servicesList.service4.description')
    },
    {
      icon: HiDocumentText,
      title: t('servicesList.service5.title'),
      description: t('servicesList.service5.description')
    },
    {
      icon: HiPuzzle,
      title: t('servicesList.service6.title'),
      description: t('servicesList.service6.description')
    },
    {
      icon: HiSparkles,
      title: t('servicesList.service7.title'),
      description: t('servicesList.service7.description')
    },
    {
      icon: HiUser,
      title: t('servicesList.service8.title'),
      description: t('servicesList.service8.description')
    }
  ];

  const forWhomItems = t.raw('forWhom.items') as string[];
  const whyUsItems = t.raw('whyUs.items') as string[];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Header inside Hero */}
          <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 relative z-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo-white.svg"
                    alt="H-Studio"
                    width={120}
                    height={20}
                    className="h-5 w-auto"
                    style={{ width: 'auto', height: '1.25rem' }}
                    priority
                  />
                </Link>
              </div>
              <div className="flex items-center gap-3">
                {/* <LanguageSwitcher /> */}
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-text font-semibold rounded-xl hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand/60"
                  aria-label={tNav('services')}
                >
                  {tNav('services')}
                </Link>
              </div>
            </div>
          </header>

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

          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 lg:pt-24 lg:pb-36 relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-[32px] leading-[40px] sm:text-[40px] sm:leading-[48px] lg:text-[56px] lg:leading-[64px] font-semibold tracking-[-0.02em] text-text font-display">
                {t('hero.title')}
              </h1>
            </div>
          </div>
        </section>

        {/* Services List Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('servicesList.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)] flex flex-col"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center mb-4 text-brand">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-[20px] leading-[28px] font-semibold text-text mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-6 mb-4 flex-1">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${index + 1}`}
                    className="text-xs text-brand hover:text-brand/80 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand/60 rounded mt-auto"
                    aria-label={t('readMore')}
                  >
                    {t('readMore')}
                    <HiArrowRight size={12} />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* For Whom Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="bg-card border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-6">
              {t('forWhom.title')}
            </h2>
            <p className="text-base text-text/70 mb-8">
              {t('forWhom.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {forWhomItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-brand flex-shrink-0 mt-0.5">
                    <HiCheckCircle size={20} />
                  </span>
                  <span className="text-base text-text/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('whyUs.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUsItems.map((item, index) => (
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

        {/* Footer */}
        <footer className="border-t border-white/10 bg-panel mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/logo-white.svg"
                      alt="H-Studio"
                      width={120}
                      height={20}
                      className="h-5 w-auto"
                    />
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-text mb-4">{tFooter('addressTitle')}</h3>
                <div className="space-y-2 text-sm text-muted">
                  <div className="flex items-start gap-2">
                    <span className="text-brand mt-0.5 flex-shrink-0">
                      <HiLocationMarker size={20} />
                    </span>
                    <span className="whitespace-pre-line">{tFooter('legalDetails.legalAddress')}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-text mb-4">{tFooter('contactTitle')}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-brand">
                      <HiPhone size={20} />
                    </span>
                    <a href="tel:+79826666680" className="text-muted hover:text-brand transition-colors">
                      {tFooter('legalDetails.phone')}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand">
                      <HiMail size={20} />
                    </span>
                    <a href={`mailto:${tFooter('legalDetails.email')}`} className="text-muted hover:text-brand transition-colors">
                      {tFooter('legalDetails.email')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                  <a href={`mailto:${tFooter('legalDetails.email')}?subject=Privacy Policy Request`} className="hover:text-text transition-colors">{tFooter('privacy')}</a>
                  <span>•</span>
                  <Link href="/legal-notice" className="hover:text-text transition-colors">{tFooter('legalNotice')}</Link>
                  <span>•</span>
                  <a href={`mailto:${tFooter('legalDetails.email')}?subject=Terms Request`} className="hover:text-text transition-colors">{tFooter('terms')}</a>
                  <span>•</span>
                  <button
                    onClick={() => {
                      const event = new CustomEvent('openCookieManager');
                      window.dispatchEvent(event);
                    }}
                    className="hover:text-text transition-colors"
                  >
                    {tFooter('cookieSettings')}
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted mt-4 text-center md:text-left">
                {tFooter('copyright')}
              </p>
            </div>
          </div>
        </footer>

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

