'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { HiChevronDown } from 'react-icons/hi';

export default function FAQSection() {
  const t = useTranslations('faq');
  const faqItems = t.raw('items') as Array<{ question: string; answer: string }>;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('faq-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [faqItems]);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center mb-16">
          <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
            {t('title')}
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-card border border-white/10 rounded-2xl overflow-hidden shadow-[0_10px_30px_-12px_rgba(124,92,252,0.2)] transition-all hover:border-white/20"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 lg:p-8 text-left focus:outline-none focus:ring-2 focus:ring-brand/60 rounded-2xl"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-xl lg:text-2xl font-semibold text-text pr-4">
                  {item.question}
                </h3>
                <div className={`flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'transform rotate-180' : ''}`}>
                  <HiChevronDown size={24} className="text-brand" />
                </div>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                  <p className="text-base text-text/80 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
  );
}

