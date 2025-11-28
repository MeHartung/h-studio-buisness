'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { HiCheckCircle, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default function CasesSectionClient() {
  const t = useTranslations('cases');
  const tClients = useTranslations('clients');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);
  
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
        <div className="flex-1 flex flex-col">
          {caseItem.subtitle && (
            <p className="text-sm text-muted leading-6 mb-6">
              {caseItem.subtitle}
            </p>
          )}
          <ul className="space-y-3 flex-1">
            {caseItem.companies?.map((company: string, idx: number) => (
              <li key={idx} className="text-sm text-text/80 font-medium">
                {company}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="space-y-6 flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-sm font-semibold text-text/80 uppercase tracking-wide">{t('problemLabel')}</span>
            </div>
            <p className="text-sm text-muted leading-6">
              {caseItem.problem}
            </p>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-brand"></div>
              <span className="text-sm font-semibold text-text/80 uppercase tracking-wide">{t('solutionLabel')}</span>
            </div>
            <p className="text-sm text-muted leading-6">
              {caseItem.solution}
            </p>
          </div>

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
    <>
      <div className="text-center mb-16">
        <p className="text-base text-text/70 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

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

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            aria-label="Previous slide"
          >
            <HiChevronLeft size={24} className="text-text" />
          </button>
          
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
    </>
  );
}

