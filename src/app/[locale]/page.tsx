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
  HiMail,
  HiChartBar,
  HiGlobeAlt,
  HiDocumentText,
  HiClock,
  HiPuzzle,
  HiUser,
  HiCheckCircle,
  HiTrendingUp,
  HiSparkles,
  HiPhone,
  HiLocationMarker,
  HiArrowUp,
  HiChevronLeft,
  HiChevronRight,
  HiChevronDown,
  HiCalculator
} from 'react-icons/hi';
import { FaLinkedin, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import CookieBanner from '@/components/CookieBanner';
import LanguageSwitcher from '@/components/LanguageSwitcher';

function LinkedInSection() {
  const t = useTranslations('collaboration');
  
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="bg-card border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Copy */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center text-brand">
                <HiUser size={24} />
              </div>
              <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em]">
                {t('title')}
              </h2>
            </div>
            
            {(t('subtitle') || t('subtitleText')) && (
              <p className="text-lg text-text/80 leading-7">
                <strong className="text-text">{t('subtitle')}</strong> {t('subtitleText')}
              </p>
            )}
            
            <p className="text-base text-muted leading-6">
              {t('description')}
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-4">
              {[
                t('checklist.item1'),
                t('checklist.item2'),
                t('checklist.item3'),
                t('checklist.item4')
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-brand flex-shrink-0 mt-0.5">
                    <HiCheckCircle size={20} />
                  </span>
                  <span className="text-sm text-text/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <img src="/2.png" alt={t('title')} className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const t = useTranslations('ourServices');
  const [openDropdowns, setOpenDropdowns] = useState<Set<number>>(new Set()); // Все дропдауны закрыты по умолчанию
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
      // Если закрываем
      newOpenDropdowns.delete(categoryIndex);
      // На десктопе закрываем оба в паре, на мобильных только текущий
      if (!isMobile) {
        const pairIndex = categoryIndex % 2 === 0 ? categoryIndex + 1 : categoryIndex - 1;
        newOpenDropdowns.delete(pairIndex);
      }
    } else {
      // Если открываем
      newOpenDropdowns.add(categoryIndex);
      // На десктопе открываем оба в паре, на мобильных только текущий
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      {/* Заголовок и описание по центру */}
      <div className="text-center mb-12">
        {/* Бейдж */}
        <div className="mb-6 inline-block">
          <div className="bg-brand/20 text-brand px-4 py-2 rounded-xl text-sm font-medium border border-brand/30">
            {t('badge')}
          </div>
        </div>

        {/* Заголовок */}
        <h2 className="mb-6 text-4xl lg:text-5xl font-semibold text-text leading-tight">
          {t('title')}
        </h2>

        {/* Описание */}
        <p className="text-base text-muted mb-8 leading-6 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      {/* Дропдауны в две колонки */}
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

      {/* Кнопка "Все услуги" по центру */}
      <div className="mt-12 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-xl hover:bg-brand/90 transition-colors font-medium shadow-[0_10px_30px_-12px_rgba(124,92,252,0.4)]"
        >
          {t('viewAll')}
          <HiArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}

function CasesSection() {
  const t = useTranslations('cases');
  const tClients = useTranslations('clients');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3); // lg: 3 slides
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2); // md: 2 slides
      } else {
        setSlidesToShow(1); // mobile: 1 slide
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);
  
  // Функция для разделения "ООО" и названия компании
  const formatCompanyName = (company: string) => {
    const match = company.match(/^ООО\s+(.+)$/);
    if (match) {
      return {
        prefix: 'ООО',
        name: match[1].trim()
      };
    }
    return {
      prefix: '',
      name: company
    };
  };
  
  const companies = tClients.raw('companies') as string[];
  
  const cases = [
    {
      title: t('case1.title'),
      problem: t('case1.problem'),
      solution: t('case1.solution'),
      results: [
        t('case1.result1'),
        t('case1.result2'),
        t('case1.result3'),
        t('case1.result4')
      ],
      isClients: false
    },
    {
      title: t('case2.title'),
      problem: t('case2.problem'),
      solution: t('case2.solution'),
      results: [
        t('case2.result1'),
        t('case2.result2'),
        t('case2.result3'),
        t('case2.result4')
      ],
      isClients: false
    },
    {
      title: t('case3.title'),
      problem: t('case3.problem'),
      solution: t('case3.solution'),
      results: [
        t('case3.result1'),
        t('case3.result2'),
        t('case3.result3'),
        t('case3.result4')
      ],
      isClients: false
    },
    {
      title: t('case4.title'),
      problem: t('case4.problem'),
      solution: t('case4.solution'),
      results: [
        t('case4.result1'),
        t('case4.result2'),
        t('case4.result3'),
        t('case4.result4')
      ],
      isClients: false
    },
    {
      title: t('case5.title'),
      problem: t('case5.problem'),
      solution: t('case5.solution'),
      results: [
        t('case5.result1'),
        t('case5.result2'),
        t('case5.result3'),
        t('case5.result4')
      ],
      isClients: false
    },
    {
      title: t('clientsCase.title'),
      subtitle: t('clientsCase.subtitle'),
      companies: companies,
      isClients: true
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = Math.max(0, cases.length - slidesToShow);
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = Math.max(0, cases.length - slidesToShow);
      return prev <= 0 ? maxSlide : prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  const renderCaseCard = (caseItem: any, index: number) => (
    <div
      key={index}
      className="bg-card border border-white/10 rounded-3xl p-6 lg:p-8 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] flex flex-col h-full w-full max-w-[380px]"
    >
      <h3 className="text-[24px] leading-[32px] font-semibold text-text mb-6">
        {caseItem.title}
      </h3>
      
      {caseItem.isClients ? (
        // Карточка клиентов
        <div className="flex-1 flex flex-col">
          {caseItem.subtitle && (
            <p className="text-sm text-muted leading-6 mb-6">
              {caseItem.subtitle}
            </p>
          )}
          <ul className="space-y-3 flex-1">
            {caseItem.companies?.map((company: string, idx: number) => {
              return (
                <li key={idx} className="text-sm text-text/80 font-medium">
                  {company}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        // Обычная карточка кейса
        <div className="space-y-6 flex-1 flex flex-col">
          {/* Проблема */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-sm font-semibold text-text/80 uppercase tracking-wide">{t('problemLabel')}</span>
            </div>
            <p className="text-sm text-muted leading-6">
              {caseItem.problem}
            </p>
          </div>

          {/* Решение */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-brand"></div>
              <span className="text-sm font-semibold text-text/80 uppercase tracking-wide">{t('solutionLabel')}</span>
            </div>
            <p className="text-sm text-muted leading-6">
              {caseItem.solution}
            </p>
          </div>

          {/* Результат */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-semibold text-text/80 uppercase tracking-wide">{t('resultLabel')}</span>
            </div>
            <ul className="space-y-2">
                  {caseItem.results?.filter((r: string) => r && r.trim()).map((result: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted">
                  <span className="text-brand flex-shrink-0 mt-0.5">
                    <HiCheckCircle size={16} />
                  </span>
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="text-center mb-16">
        <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
          {t('title')}
        </h2>
        <p className="text-base text-text/70 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      {/* Carousel - All Devices */}
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out gap-6"
            style={{ 
              transform: slidesToShow === 1 
                ? `translateX(calc(-${currentSlide} * (100% + 1.5rem)))`
                : `translateX(calc(-${currentSlide} * (380px + 1.5rem)))`
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {cases.map((caseItem, index) => (
              <div 
                key={index} 
                className="min-w-full md:min-w-[380px] flex-shrink-0"
              >
                {renderCaseCard(caseItem, index)}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            aria-label="Previous slide"
          >
            <HiChevronLeft size={24} className="text-text" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex gap-2">
            {cases.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-brand w-8' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            aria-label="Next slide"
          >
            <HiChevronRight size={24} className="text-text" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const t = useTranslations('process');
  
  const steps = [
    { num: 1, label: t('step1.label'), desc: t('step1.desc') },
    { num: 2, label: t('step2.label'), desc: t('step2.desc') },
    { num: 3, label: t('step3.label'), desc: t('step3.desc') },
    { num: 4, label: t('step4.label'), desc: t('step4.desc') },
    { num: 5, label: t('step5.label'), desc: t('step5.desc') }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="text-center mb-16">
        <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
          {t('title')}
        </h2>
        <p className="text-base text-text/70 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      {/* Desktop: Horizontal Grid */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-5 gap-8">
          {steps.map((step, index) => (
                <div 
                  key={index} 
              className="flex flex-col items-center text-center"
                  style={{
                    animation: `fadeInUp 0.6s ease-out forwards`,
                animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                  }}
                >
              {/* Number Circle */}
              <div className="w-20 h-20 bg-gradient-to-br from-brand to-brand/80 rounded-full flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(124,92,252,0.6)] hover:scale-110 transition-transform">
                  </div>
                  
              {/* Content */}
              <div className="max-w-[180px]">
                <h3 className="text-base font-semibold text-text mb-3 leading-tight">{step.label}</h3>
                <p className="text-sm text-muted leading-6">{step.desc}</p>
                  </div>
                </div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertical List */}
      <div className="lg:hidden space-y-8">
        {steps.map((step, index) => (
            <div 
              key={index} 
            className="flex gap-5 items-start"
              style={{
                animation: `fadeInUp 0.6s ease-out forwards`,
              animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
            {/* Number Circle */}
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brand to-brand/80 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(124,92,252,0.5)]">
                </div>
                
            {/* Content */}
            <div className="flex-1 pt-2">
                  <h3 className="text-base font-semibold text-text mb-2">{step.label}</h3>
                  <p className="text-sm text-muted leading-6">{step.desc}</p>
                </div>
              </div>
        ))}
      </div>
    </section>
  );
}

function ResultsSection() {
  const t = useTranslations('results');
  
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      {t('title') && (
        <div className="text-center mb-16">
          <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
            {t('title')}
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
        <div className="text-center">
          <div className="text-[56px] lg:text-[80px] font-bold tracking-[-0.02em] text-brand mb-4 leading-none">
            40–70%
          </div>
          <p className="text-base lg:text-lg text-text/70 leading-relaxed">
            {t('reduction')}
          </p>
        </div>
        
        <div className="text-center">
          <div className="text-[48px] lg:text-[72px] font-bold tracking-[-0.02em] text-brand mb-4 leading-none">
            2–3 мин
          </div>
          <p className="text-base lg:text-lg text-text/70 leading-relaxed">
            {t('faster')}
          </p>
        </div>
        
        <div className="text-center">
          <div className="text-[48px] lg:text-[72px] font-bold tracking-[-0.02em] text-brand mb-4 leading-none">
            {t('amount')}
          </div>
          <p className="text-base lg:text-lg text-text/70 leading-relaxed">
            {t('savings')}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const t = useTranslations();
  const tHero = useTranslations('hero');
  const tNav = useTranslations('navigation');
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
            <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-center">
              {/* Left Column - Text */}
              <div className="col-span-12 lg:col-span-6 space-y-6">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1.5 text-xs text-text/80 font-medium">
                  {tHero('badge')}
                </span>
                
                <h1 className="text-[56px] leading-[64px] font-semibold tracking-[-0.02em] text-text font-display">
                  {tHero('title')}
                </h1>
                
                <p className="text-text/70 max-w-xl text-base leading-7 font-medium">
                  {tHero('description')}
                </p>
                
                {tHero('subtitle') && (
                  <p className="text-text/70 max-w-xl text-base leading-7">
                    {tHero('subtitle')}
                  </p>
                )}
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.5)] focus:outline-none focus:ring-2 focus:ring-brand/60"
                    aria-label={tHero('requestDemo')}
                  >
                    <span>{tHero('requestDemo')}</span>
                    <HiArrowRight size={20} />
                  </Link>
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-text font-semibold rounded-xl hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand/60"
                    aria-label={tHero('seeExamples')}
                  >
                    {tHero('seeExamples')}
                  </Link>
                </div>
                
                {/* Trust Row */}
                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-2 sm:gap-6 text-[10px] sm:text-xs text-text/60">
                  <div className="whitespace-nowrap">{tHero('trust1')}</div>
                  <div className="hidden sm:block h-4 w-px bg-white/20 flex-shrink-0" />
                  <div className="whitespace-nowrap">{tHero('trust2')}</div>
                  <div className="hidden sm:block h-4 w-px bg-white/20 flex-shrink-0" />
                  <div className="whitespace-nowrap">{tHero('trust3')}</div>
                  <div className="hidden sm:block h-4 w-px bg-white/20 flex-shrink-0" />
                  <div className="whitespace-nowrap">{tHero('trust4')}</div>
                </div>
              </div>

              {/* Right Column - Agent Mock */}
              <div className="hidden lg:block lg:col-span-6 mt-12 lg:mt-0">
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
                  {/* Chat Interface Mock */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand/20 rounded-lg flex items-center justify-center text-brand">
                          <HiSparkles size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-text">{tHero('aiAgentTitle')}</div>
                          <div className="text-xs text-text/60">{tHero('aiAgentStatus')}</div>
                        </div>
                      </div>
                      <div className="text-xs text-text/60 bg-white/5 px-3 py-1 rounded-full">
                        {tHero('aiAgentInbox')}
                      </div>
                    </div>
                    
                    {/* Chat Bubbles */}
                    <div className="space-y-3">
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <div className="text-xs text-text/60 mb-2">{tHero('aiAgentAnalyzing')}</div>
                        <div className="text-sm text-text">{tHero('aiAgentMessage')}</div>
                      </div>
                      <div className="bg-brand/10 rounded-2xl p-4 border border-brand/20">
                        <div className="text-xs text-text/60 mb-2">{tHero('aiAgentTracking')}</div>
                        <div className="text-sm text-text">{tHero('aiAgentStats')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Wizard расчёта и КП */}
            <div className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center mb-4 text-brand">
                <HiSearch size={20} />
              </div>
              <h3 className="text-[28px] leading-[36px] font-semibold text-text mb-3">{t('features.calculationAutomation.title')}</h3>
              <p className="text-sm text-muted leading-6 mb-4">
                {t('features.calculationAutomation.desc1')}
              </p>
              {t('features.calculationAutomation.desc2') && (
                <p className="text-sm text-muted leading-6 mb-4">
                  {t('features.calculationAutomation.desc2')}
                </p>
              )}
              <Link href="#contact" className="text-xs text-brand hover:text-brand/80 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand/60 rounded" aria-label={t('features.calculationAutomation.learnMore')}>
                {t('features.calculationAutomation.learnMore')}
                <HiArrowRight size={12} />
              </Link>
            </div>

            {/* Автоматические расчёты параметров */}
            <div className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center mb-4 text-brand">
                <HiLightBulb size={20} />
              </div>
              <h3 className="text-[28px] leading-[36px] font-semibold text-text mb-3">{t('features.kpConfigurator.title')}</h3>
              <p className="text-sm text-muted leading-6 mb-4">
                {t('features.kpConfigurator.desc1')}
              </p>
              {t('features.kpConfigurator.desc2') && (
                <p className="text-sm text-muted leading-6 mb-4">
                  {t('features.kpConfigurator.desc2')}
                </p>
              )}
              <Link href="#contact" className="text-xs text-brand hover:text-brand/80 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand/60 rounded" aria-label={t('features.kpConfigurator.learnMore')}>
                {t('features.kpConfigurator.learnMore')}
                <HiArrowRight size={12} />
              </Link>
            </div>

            {/* Документооборот и спецификации */}
            <div className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center mb-4 text-brand">
                <HiDocumentText size={20} />
              </div>
              <h3 className="text-[28px] leading-[36px] font-semibold text-text mb-3">{t('features.documentAutomation.title')}</h3>
              <p className="text-sm text-muted leading-6 mb-4">
                {t('features.documentAutomation.desc1')}
              </p>
              {t('features.documentAutomation.desc2') && (
                <p className="text-sm text-muted leading-6 mb-4">
                  {t('features.documentAutomation.desc2')}
                </p>
              )}
              <Link href="#contact" className="text-xs text-brand hover:text-brand/80 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand/60 rounded" aria-label={t('features.documentAutomation.learnMore')}>
                {t('features.documentAutomation.learnMore')}
                <HiArrowRight size={12} />
              </Link>
            </div>
          </div>
        </section>

        {/* Collaboration & Change Management Section */}
        <LinkedInSection />

        {/* ICP / Who It's For Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('whoItsFor.title')}
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              {t('whoItsFor.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: HiCog, 
                label: t('whoItsFor.manufacturing.label'),
                description: t('whoItsFor.manufacturing.description')
              },
              { 
                icon: HiPuzzle, 
                label: t('whoItsFor.metalwork.label'),
                description: t('whoItsFor.metalwork.description')
              },
              { 
                icon: HiCog, 
                label: t('whoItsFor.equipment.label'),
                description: t('whoItsFor.equipment.description')
              },
              { 
                icon: HiClock, 
                label: t('whoItsFor.cables.label'),
                description: t('whoItsFor.cables.description')
              },
              { 
                icon: HiGlobeAlt, 
                label: t('whoItsFor.windows.label'),
                description: t('whoItsFor.windows.description')
              },
              { 
                icon: HiPuzzle, 
                label: t('whoItsFor.pipes.label'),
                description: t('whoItsFor.pipes.description')
              },
              { 
                icon: HiDocumentText, 
                label: t('whoItsFor.custom.label'),
                description: t('whoItsFor.custom.description')
              }
            ].filter(item => item.label && item.description).map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-1 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.2)] group"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand/20 to-brand/10 rounded-xl flex items-center justify-center border border-brand/20 group-hover:scale-110 transition-transform text-brand">
                      <Icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text mb-2">{item.label}</h3>
                      <p className="text-sm text-muted leading-5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cases Section */}
        <CasesSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Process Section */}
        <ProcessSection />

        {/* Results Section */}
        <ResultsSection />

        {/* AI Process Assistant CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Image */}
            <div className="relative flex items-center justify-center">
              <img src="/3.png" alt="AI Process Assistant" className="max-h-[600px] max-w-full w-auto object-contain" />
            </div>

            {/* Right: Capabilities + CTA */}
            <div className="space-y-6">
              <div>
                <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
                  {t('processAssistant.title')}
                </h2>
                <p className="text-base text-text/80 leading-7 mb-2">
                  {t('processAssistant.subtitle')}
                </p>
                <p className="text-base text-text/80 leading-7">
                  {t('processAssistant.description')}
                </p>
              </div>

              <div className="space-y-4">
                {[
                  t('processAssistant.feature1'),
                  t('processAssistant.feature2'),
                  t('processAssistant.feature3'),
                  t('processAssistant.feature4'),
                  t('processAssistant.feature5')
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-brand flex-shrink-0 mt-0.5">
                    <HiCheckCircle size={20} />
                  </span>
                    <span className="text-base text-text/80">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.5)] focus:outline-none focus:ring-2 focus:ring-brand/60"
                >
                  <span>{t('processAssistant.buildButton')}</span>
                  <HiArrowRight size={20} />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-text font-semibold rounded-xl hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand/60"
                >
                  {t('processAssistant.demoButton')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - Hidden by default, can be shown */}
        {/* Uncomment to show pricing
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter Pilot',
                features: [
                  'Up to 500 leads/month',
                  'Basic personalization',
                  'Email tracking',
                  'CRM integration',
                  'Email support'
                ],
                cta: 'Start Pilot',
                highlighted: true
              },
              {
                name: 'Growth',
                features: [
                  'Up to 5,000 leads/month',
                  'Advanced AI personalization',
                  'Full analytics dashboard',
                  'Multi-channel outreach',
                  'Priority support'
                ],
                cta: 'Get Started',
                highlighted: false
              },
              {
                name: 'Custom',
                features: [
                  'Unlimited leads',
                  'Dedicated AI agent',
                  'Custom integrations',
                  'White-label options',
                  'Dedicated account manager'
                ],
                cta: 'Contact Sales',
                highlighted: false
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all ${plan.highlighted ? 'ring-1 ring-brand/50' : ''}`}
              >
                <h3 className="text-xl font-semibold text-text mb-4">{plan.name}</h3>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brand flex-shrink-0 mt-0.5">
                    <HiCheckCircle size={20} />
                  </span>
                      <span className="text-sm text-text/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#contact"
                  className="block w-full text-center px-4 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-all"
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>
        */}

        {/* Final CTA Section */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="bg-card border border-white/10 rounded-3xl p-12 lg:p-16 text-center shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl sm:text-[40px] leading-[32px] sm:leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-base text-text/70 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link
                href={`mailto:${t('footer.legalDetails.email')}?subject=Получить разбор`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.5)] focus:outline-none focus:ring-2 focus:ring-brand/60"
              >
                <span>{t('cta.button1')}</span>
                <HiArrowRight size={20} />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-text font-semibold rounded-xl hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand/60"
              >
                {t('cta.button2')}
              </Link>
            </div>
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
                <h3 className="font-semibold text-text mb-4">{t('footer.addressTitle')}</h3>
                <div className="space-y-2 text-sm text-muted">
                  <div className="flex items-start gap-2">
                    <span className="text-brand mt-0.5 flex-shrink-0">
                      <HiLocationMarker size={20} />
                    </span>
                    <span className="whitespace-pre-line">{t('footer.legalDetails.legalAddress')}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-text mb-4">{t('footer.contactTitle')}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <a 
                      href="https://wa.me/79826666680" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand hover:opacity-80 transition-opacity"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp size={24} />
                    </a>
                    <a 
                      href="https://t.me/+79826666680" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand hover:opacity-80 transition-opacity"
                      aria-label="Telegram"
                    >
                      <FaTelegram size={24} />
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand">
                      <HiMail size={20} />
                    </span>
                    <a href={`mailto:${t('footer.legalDetails.email')}`} className="text-muted hover:text-brand transition-colors">
                      {t('footer.legalDetails.email')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                  <a href={`mailto:${t('footer.legalDetails.email')}?subject=Privacy Policy Request`} className="hover:text-text transition-colors">{t('footer.privacy')}</a>
                  <span>•</span>
                  <Link href="/legal-notice" className="hover:text-text transition-colors">{t('footer.legalNotice')}</Link>
                  <span>•</span>
                  <a href={`mailto:${t('footer.legalDetails.email')}?subject=Terms Request`} className="hover:text-text transition-colors">{t('footer.terms')}</a>
                  <span>•</span>
                  <button
                    onClick={() => {
                      const event = new CustomEvent('openCookieManager');
                      window.dispatchEvent(event);
                    }}
                    className="hover:text-text transition-colors"
                  >
                    {t('footer.cookieSettings')}
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted mt-4 text-center md:text-left">
                {t('footer.copyright')}
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

