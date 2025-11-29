"use client";

import Header from '@/components/Header';

interface PageHeaderProps {
  title: string;
  highlightedWord: string;
  subtitle: string;
  highlightedSubtitle?: string;
  titleSize?: 'default' | 'small';
  seoDescription?: string;
}

const PageHeader = ({ title, highlightedWord, subtitle, highlightedSubtitle, titleSize = 'default', seoDescription }: PageHeaderProps) => {
  return (
    <section className="relative overflow-hidden bg-bg flex flex-col p-2">
      <div className="w-full flex-1 bg-gradient-to-br from-brand to-brand/80 rounded-[20px] lg:rounded-[40px] flex items-start justify-center px-4 relative">
        {/* Background Gradients */}
        <div
          className="absolute inset-0 rounded-[20px] lg:rounded-[40px]"
          style={{
            background: 'radial-gradient(1200px 600px at 20% -10%, rgba(124, 92, 252, 0.25), transparent), radial-gradient(800px 400px at 90% 10%, rgba(107, 230, 117, 0.15), transparent)'
          }}
        />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-10 rounded-[20px] lg:rounded-[40px]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <Header />
        </div>

        <div className="w-full max-w-7xl mx-auto text-center pt-24 lg:pt-32 pb-16 lg:pb-32 px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Рейтинг со звездами */}
          <div className="mb-6 flex items-center justify-center gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white text-xs sm:text-sm font-medium">
              Rated 4.97/5 <span className="text-white/70 font-normal">from over 50 reviews</span>
            </span>
          </div>

          {/* Заголовок */}
          <h1 
            className="mb-6 font-semibold leading-tight text-white tracking-[-0.02em]"
            style={{
              fontSize: titleSize === 'small' 
                ? 'clamp(1.8rem, 7vw, 4.5rem)' 
                : 'clamp(2.5rem, 10vw, 7rem)',
              lineHeight: 'clamp(1.1, 0.8, 0.8)'
            }}
          >
            {title.split('\n').map((line, lineIndex) => (
              <span key={lineIndex}>
                {line.split(' ').map((word, index, array) => (
                  <span key={index}>
                    {word === highlightedWord ? (
                      <span className="relative inline-block bg-white px-3 py-1 rounded-lg mx-2 text-brand">
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                    {index < array.length - 1 && ' '}
                  </span>
                ))}
                {lineIndex < title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Подзаголовок */}
          <p className="mx-auto mb-9 max-w-[600px] text-base font-medium text-white sm:text-lg sm:leading-[1.44]">
            {highlightedSubtitle ? (
              subtitle.split(highlightedSubtitle).map((part, index, array) => (
                <span key={index}>
                  {index > 0 && (
                    <span className="text-white font-medium">{highlightedSubtitle}</span>
                  )}
                  <span className="text-white/80 font-normal">{part}</span>
                </span>
              ))
            ) : (
              <span className="text-white/80 font-normal">{subtitle}</span>
            )}
          </p>

        </div>
      </div>
      
      {/* SEO-контент (sr-only) */}
      {seoDescription && (
        <div className="sr-only">
          <p>{seoDescription}</p>
        </div>
      )}
    </section>
  );
};

export default PageHeader;

