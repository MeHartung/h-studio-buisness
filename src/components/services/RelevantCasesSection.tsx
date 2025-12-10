"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from '@/i18n/routing';
import { HiArrowRight } from 'react-icons/hi';
import Image from 'next/image';
import EnterpriseCaseCard from '@/components/clients/EnterpriseCaseCard';

interface RelevantCasesSectionProps {
  relevantCaseSlugs?: string[];
}

const RelevantCasesSection = ({ relevantCaseSlugs = [] }: RelevantCasesSectionProps) => {
  const t = useTranslations('clients');
  const locale = useLocale();

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
      technologies: ["Java 17", "Spring", "Kafka", "PostgreSQL", "Docker", "Kubernetes"],
      duration: "9 месяцев",
      team: "5 инженеров",
      slug: `enterprise-cases/vtb-bank`
    },
    {
      title: casesData[1]?.title || "Société Générale",
      subtitle: casesData[1]?.subtitle || "Платформа персонализированной рекламы и кредитных услуг",
      coverImage: "/images/blog/SocieteGenerale/cover/cover.webp",
      excerpt: casesData[1]?.description || "Продвинутые финансовые сервисы с персонализацией в реальном времени для внутренней рекламы и кредитных услуг.",
      technologies: ["Java 11", "Spring", "Oracle", "Docker", "Kubernetes", "Jenkins"],
      duration: "12 месяцев",
      team: "5 инженеров",
      slug: `enterprise-cases/societe-generale`
    },
    {
      title: casesData[2]?.title || "Sber",
      subtitle: casesData[2]?.subtitle || "Корпоративная платформа аналитики данных",
      coverImage: "/images/blog/Sber/cover/cover.webp",
      excerpt: casesData[2]?.description || "Комплексное решение для обработки и анализа данных для крупнейшего банка России.",
      technologies: ["Java 17", "Spring", "Oracle", "Docker", "Kubernetes"],
      duration: "18 месяцев",
      team: "5 инженеров",
      slug: `enterprise-cases/sber`
    },
    {
      title: casesData[3]?.title || "EventStripe",
      subtitle: casesData[3]?.subtitle || "Высоконагруженная SaaS-платформа продажи билетов",
      coverImage: "/images/blog/EventStripe/cover/cover.webp",
      excerpt: casesData[3]?.description || "SaaS-платформа, обрабатывающая 10,000+ одновременных сессий с покупками в реальном времени и динамическим ценообразованием.",
      technologies: ["Java 20", "Spring", "Next.js", "Docker", "Kubernetes", "ELK", "Grafana"],
      duration: "12 месяцев",
      team: "3 инженера",
      slug: `enterprise-cases/eventstripe`
    }
  ];

  // Фильтруем кейсы по relevantCaseSlugs, если они указаны
  // Если не указаны, показываем все кейсы
  const relevantCases = relevantCaseSlugs.length > 0
    ? allEnterpriseCases.filter(caseItem => 
        relevantCaseSlugs.some(slug => caseItem.slug.includes(slug))
      )
    : allEnterpriseCases;

  // Если нет релевантных кейсов, не показываем секцию
  if (relevantCases.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="mb-16">
        <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
          Примеры внедрения
        </h2>
        <p className="text-base text-text/70 max-w-2xl">
          Реальные кейсы внедрения наших решений для производственных и инженерных компаний
        </p>
      </div>

      {/* Горизонтальный скролл */}
      <div 
        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide" 
        style={{ overscrollBehaviorX: 'contain', WebkitOverflowScrolling: 'touch' }}
      >
        {relevantCases.map((caseItem, index) => (
          <div key={index} className="flex-shrink-0 w-80 relative" style={{ minHeight: '100%' }}>
            <EnterpriseCaseCard case={caseItem} />
          </div>
        ))}
      </div>

      {/* Кнопка "Смотреть все кейсы" */}
      <div className="text-center mt-12">
        <Link
          href="/clients"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-xl hover:bg-brand/90 transition-colors font-medium shadow-[0_10px_30px_-12px_rgba(124,92,252,0.4)] min-h-[44px] min-w-[44px]"
          aria-label="Смотреть все кейсы"
        >
          Смотреть все кейсы
          <HiArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default RelevantCasesSection;

