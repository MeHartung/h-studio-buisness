"use client";

import { useTranslations } from "next-intl";
import { Link } from '@/i18n/routing';
import { HiArrowRight } from 'react-icons/hi';
import Image from 'next/image';

interface RelevantCasesSectionProps {
  relevantCaseSlugs?: string[];
}

const RelevantCasesSection = ({ relevantCaseSlugs = [] }: RelevantCasesSectionProps) => {
  const t = useTranslations('clients');

  // Enterprise кейсы
  const casesData = t.raw('cases') as Array<{
    title: string;
    subtitle: string;
    description: string;
  }>;

  const allEnterpriseCases = [
    {
      title: casesData[0]?.title || "VTB Bank",
      subtitle: casesData[0]?.subtitle || "Платформа потоковой обработки данных в реальном времени",
      coverImage: "/images/blog/VTB/cover/cover.webp",
      excerpt: casesData[0]?.description || "Высокопроизводительная платформа потоковой обработки данных, способная обрабатывать миллионы финансовых сообщений в секунду.",
      slug: `enterprise-cases/vtb-bank`
    },
    {
      title: casesData[1]?.title || "Société Générale",
      subtitle: casesData[1]?.subtitle || "Платформа персонализированной рекламы и кредитных услуг",
      coverImage: "/images/blog/SocieteGenerale/cover/cover.webp",
      excerpt: casesData[1]?.description || "Продвинутые финансовые сервисы с персонализацией в реальном времени для внутренней рекламы и кредитных услуг.",
      slug: `enterprise-cases/societe-generale`
    },
    {
      title: casesData[2]?.title || "Sber",
      subtitle: casesData[2]?.subtitle || "Корпоративная платформа аналитики данных",
      coverImage: "/images/blog/Sber/cover/cover.webp",
      excerpt: casesData[2]?.description || "Комплексное решение для обработки и анализа данных для крупнейшего банка России.",
      slug: `enterprise-cases/sber`
    },
    {
      title: casesData[3]?.title || "EventStripe",
      subtitle: casesData[3]?.subtitle || "Высоконагруженная SaaS-платформа продажи билетов",
      coverImage: "/images/blog/EventStripe/cover/cover.webp",
      excerpt: casesData[3]?.description || "SaaS-платформа, обрабатывающая 10,000+ одновременных сессий с покупками в реальном времени и динамическим ценообразованием.",
      slug: `enterprise-cases/eventstripe`
    }
  ];

  // Фильтруем кейсы по relevantCaseSlugs, если они указаны
  // Если не указаны, показываем первые 2 кейса
  const relevantCases = relevantCaseSlugs.length > 0
    ? allEnterpriseCases.filter(caseItem => 
        relevantCaseSlugs.some(slug => caseItem.slug.includes(slug))
      ).slice(0, 2)
    : allEnterpriseCases.slice(0, 2);

  // Если нет релевантных кейсов, не показываем секцию
  if (relevantCases.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-white/10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-text mb-2">
          Примеры внедрения
        </h2>
        <p className="text-base text-text/70">
          Реальные кейсы внедрения наших решений для производственных и инженерных компаний
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relevantCases.map((caseItem) => (
          <Link
            key={caseItem.slug}
            href={`/${caseItem.slug}`}
            className="bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:-translate-y-0.5 transition-all group"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={caseItem.coverImage}
                alt={caseItem.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-text mb-2 group-hover:text-brand transition-colors">
                {caseItem.title}
              </h3>
              <p className="text-sm text-text/60 mb-2">
                {caseItem.subtitle}
              </p>
              <p className="text-sm text-muted leading-6 mb-4 line-clamp-2">
                {caseItem.excerpt}
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand/80 transition-colors font-medium">
                Читать кейс
                <HiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Кнопка "Смотреть все кейсы" */}
      <div className="text-center mt-8">
        <Link
          href="/clients"
          className="inline-flex items-center gap-2 text-brand hover:text-brand/80 transition-colors font-medium"
          aria-label="Смотреть все кейсы"
        >
          Смотреть все кейсы
          <HiArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default RelevantCasesSection;

