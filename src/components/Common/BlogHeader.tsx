"use client";

import Header from '@/components/Header';

interface BlogHeaderProps {
  title: string;
  subtitle: string;
}

const BlogHeader = ({ title, subtitle }: BlogHeaderProps) => {
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

        <div className="w-full max-w-4xl mx-auto text-center pt-24 lg:pt-32 pb-16 lg:pb-32 px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Заголовок */}
          <h1 
            className="mb-6 font-semibold leading-tight text-white tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(2rem, 8vw, 5rem)',
              lineHeight: 'clamp(1.1, 0.8, 0.8)'
            }}
          >
            {title}
          </h1>

          {/* Подзаголовок */}
          <p className="text-base font-medium text-white/80 sm:text-lg sm:leading-[1.44]">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHeader;

