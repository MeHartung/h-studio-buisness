"use client";

import { useTranslations } from "next-intl";
import { Link } from '@/i18n/routing';
import { HiArrowRight } from 'react-icons/hi';
import { getServiceSlugById } from '@/lib/services';

interface RelevantServicesSectionProps {
  relevantServiceIds?: string[];
}

const RelevantServicesSection = ({ relevantServiceIds = [] }: RelevantServicesSectionProps) => {
  const t = useTranslations('services.servicesList');

  const allServices = [
    {
      id: '1',
      title: t('service1.title'),
      description: t('service1.description'),
      slug: getServiceSlugById('1')
    },
    {
      id: '2',
      title: t('service2.title'),
      description: t('service2.description'),
      slug: getServiceSlugById('2')
    },
    {
      id: '3',
      title: t('service3.title'),
      description: t('service3.description'),
      slug: getServiceSlugById('3')
    },
    {
      id: '4',
      title: t('service4.title'),
      description: t('service4.description'),
      slug: getServiceSlugById('4')
    },
    {
      id: '5',
      title: t('service5.title'),
      description: t('service5.description'),
      slug: getServiceSlugById('5')
    },
    {
      id: '6',
      title: t('service6.title'),
      description: t('service6.description'),
      slug: getServiceSlugById('6')
    },
    {
      id: '7',
      title: t('service7.title'),
      description: t('service7.description'),
      slug: getServiceSlugById('7')
    },
    {
      id: '8',
      title: t('service8.title'),
      description: t('service8.description'),
      slug: getServiceSlugById('8')
    }
  ];

  // Фильтруем услуги по relevantServiceIds, если они указаны
  // Если не указаны, показываем первые 4 услуги
  const relevantServices = relevantServiceIds.length > 0
    ? allServices.filter(service => relevantServiceIds.includes(service.id))
    : allServices.slice(0, 4);

  // Если нет релевантных услуг, не показываем секцию
  if (relevantServices.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="mb-16">
        <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
          Использованные решения
        </h2>
        <p className="text-base text-text/70 max-w-2xl">
          Услуги и решения, которые были применены в этом проекте
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relevantServices.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)] group"
          >
            <h3 className="text-xl font-semibold text-text mb-3 group-hover:text-brand transition-colors">
              {service.title}
            </h3>
            <p className="text-sm text-muted leading-6 mb-4 line-clamp-3">
              {service.description}
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand/80 transition-colors font-medium">
              Подробнее
              <HiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Кнопка "Посмотреть все услуги" */}
      <div className="text-center mt-12">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-xl hover:bg-brand/90 transition-colors font-medium shadow-[0_10px_30px_-12px_rgba(124,92,252,0.4)] min-h-[44px] min-w-[44px]"
          aria-label="Посмотреть все услуги"
        >
          Посмотреть все услуги
          <HiArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default RelevantServicesSection;

