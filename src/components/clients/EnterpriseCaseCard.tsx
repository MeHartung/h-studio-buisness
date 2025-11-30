"use client";

import Image from "next/image";
import { Link } from '@/i18n/routing';

interface EnterpriseCase {
  title: string;
  subtitle?: string;
  coverImage: string;
  excerpt: string;
  technologies: string[];
  duration?: string;
  team?: string;
  slug?: string;
}

const EnterpriseCaseCard = ({ case: enterpriseCase }: { case: EnterpriseCase }) => {
  const { title, subtitle, coverImage, excerpt, technologies, duration, team, slug } = enterpriseCase;

  return (
    <div className="group cursor-pointer h-full flex flex-col">
      {slug ? (
        <Link href={`/${slug}`} aria-label={`View ${title} enterprise case study`} className="block h-full flex flex-col">
          <div className="mb-8 overflow-hidden rounded-2xl h-48 relative transform transition-all duration-200 group-active:scale-[0.98] group-active:rotate-1 border border-white/10 flex-shrink-0">
            <Image
              src={coverImage}
              alt={`${title} enterprise case study cover image`}
              className="w-full h-full object-cover transition-all duration-300 group-hover:rotate-6 group-hover:scale-125 group-active:scale-110 group-active:rotate-3"
              width={320}
              height={192}
            />
            {/* Overlay для лучшей видимости hover эффекта */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 group-active:bg-black/30 transition-all duration-300 rounded-2xl"></div>
            {/* Индикатор клика */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-60 group-active:opacity-80 transition-all duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-sm transform transition-all duration-200 group-active:scale-110 border border-white/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </div>
          <div className="transform transition-all duration-200 group-active:scale-[0.98] flex-1 flex flex-col">
            {/* Технологии */}
            <div className="flex flex-wrap gap-2 mb-5 flex-shrink-0">
              {technologies.slice(0, 3).map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-card text-text/70 text-xs rounded-full border border-white/10 transition-all duration-200 group-hover:bg-white/5 group-hover:text-text group-active:bg-white/10 group-active:scale-95">
                  {tech}
                </span>
              ))}
              {technologies.length > 3 && (
                <span className="px-3 py-1 bg-white/5 text-text/60 text-xs rounded-full border border-white/10 transition-all duration-200 group-hover:bg-white/10 group-hover:text-text/80 group-active:bg-white/15 group-active:scale-95">
                  +{technologies.length - 3}
                </span>
              )}
            </div>
            <h3>
              <span className="mb-4 inline-block text-xl font-semibold text-text group-hover:text-brand transition-all duration-200 group-active:text-brand/80">
                {title}
              </span>
            </h3>
            {subtitle && (
              <p className="text-sm text-text/60 mb-3">{subtitle}</p>
            )}
            {/* Дата и команда */}
            {(duration || team) && (
              <div className="flex flex-wrap gap-2 mb-3">
                {duration && (
                  <span className="px-3 py-1 bg-white/5 text-text/70 text-xs rounded-full border border-white/10 transition-all duration-200 group-hover:bg-white/10 group-hover:text-text group-active:bg-white/15 group-active:scale-95">
                    {duration}
                  </span>
                )}
                {team && (
                  <span className="px-3 py-1 bg-white/5 text-text/70 text-xs rounded-full border border-white/10 transition-all duration-200 group-hover:bg-white/10 group-hover:text-text group-active:bg-white/15 group-active:scale-95">
                    {team}
                  </span>
                )}
              </div>
            )}
            <p className="text-base text-text/70 group-hover:text-text/90 transition-all duration-200 group-active:text-text/80">{excerpt}</p>
          </div>
        </Link>
      ) : (
        <div>
          <div className="mb-8 overflow-hidden rounded-2xl h-48 relative border border-white/10">
            <Image
              src={coverImage}
              alt={`${title} enterprise case study cover image`}
              className="w-full h-full object-cover"
              width={320}
              height={192}
            />
          </div>
          <div>
            {/* Технологии */}
            <div className="flex flex-wrap gap-2 mb-5">
              {technologies.slice(0, 3).map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-card text-text/70 text-xs rounded-full border border-white/10">
                  {tech}
                </span>
              ))}
              {technologies.length > 3 && (
                <span className="px-3 py-1 bg-white/5 text-text/60 text-xs rounded-full border border-white/10">
                  +{technologies.length - 3}
                </span>
              )}
            </div>
            <h3>
              <span className="mb-4 inline-block text-xl font-semibold text-text">
                {title}
              </span>
            </h3>
            {subtitle && (
              <p className="text-sm text-text/60 mb-3">{subtitle}</p>
            )}
            {(duration || team) && (
              <div className="flex flex-wrap gap-2 mb-3">
                {duration && (
                  <span className="px-3 py-1 bg-white/5 text-text/70 text-xs rounded-full border border-white/10">
                    {duration}
                  </span>
                )}
                {team && (
                  <span className="px-3 py-1 bg-white/5 text-text/70 text-xs rounded-full border border-white/10">
                    {team}
                  </span>
                )}
              </div>
            )}
            <p className="text-base text-text/70">{excerpt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnterpriseCaseCard;

