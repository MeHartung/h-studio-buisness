import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { 
  HiArrowRight, 
  HiLightBulb,
  HiDocumentText,
  HiPuzzle,
  HiUser,
  HiCheckCircle,
  HiTrendingUp,
  HiSparkles,
  HiCalculator,
} from 'react-icons/hi';
import CookieBanner from '@/components/CookieBanner';
import Header from '@/components/Header';
import ScrollToTopButton from '@/components/home/ScrollToTopButton';
import { getServiceSlugById } from '@/lib/services';
import { ItemListSchema, BreadcrumbSchema } from '@/components/StructuredData';

export default async function ServicesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('services');

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
  const introParagraph = t('hero.introParagraph');
  const seoParagraph = t('seoParagraph');

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `/${locale}/services`;

  // Подготовка данных для ItemListSchema
  const serviceItems = services.map((service, index) => {
    const serviceSlug = getServiceSlugById(String(index + 1));
    return {
      name: service.title,
      description: service.description,
      url: serviceSlug ? `/${locale}/services/${serviceSlug}` : ''
    };
  }).filter(item => item.url);

  const breadcrumbItems = [
    { name: 'Главная', url: `/${locale}` },
    { name: 'Услуги', url: `/${locale}/services` }
  ];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <ItemListSchema 
        listUrl={currentUrl}
        items={serviceItems}
        listName={t('servicesList.title')}
      />
      <BreadcrumbSchema 
        items={breadcrumbItems}
        pageUrl={currentUrl}
      />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
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

          <Header />
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 lg:pt-24 lg:pb-36 relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-[32px] leading-[40px] sm:text-[40px] sm:leading-[48px] lg:text-[56px] lg:leading-[64px] font-semibold tracking-[-0.02em] text-text font-display mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-text/80 leading-relaxed max-w-3xl">
                {introParagraph}
              </p>
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
              const serviceSlug = getServiceSlugById(String(index + 1));
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
                  {serviceSlug && (
                    <Link
                      href={`/services/${serviceSlug}`}
                      className="text-xs text-brand hover:text-brand/80 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand/60 rounded mt-auto"
                      aria-label={t('readMore')}
                    >
                      {t('readMore')}
                      <HiArrowRight size={12} />
                    </Link>
                  )}
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

        {/* Specialized Solutions Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Специализированные решения
            </h2>
            <p className="text-base text-text/70 max-w-2xl">
              Лендинги под высокоинтентные запросы для производственных и инженерных компаний
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "CPQ для производственных компаний",
                url: "/solutions/cpq-proizvodstvo",
                description: "Конфигураторы коммерческих предложений для производственных компаний в Москве и по России",
                active: true
              },
              {
                title: "Интеграция 1С для производства",
                url: "/solutions/integraciya-1c-proizvodstvo",
                description: "Интеграция 1С с системами расчётов, КП и документооборота для производственных компаний",
                active: true
              },
              {
                title: "Автоматизация расчётов для кабеля/металла",
                url: "/solutions/avtomatizaciya-raschetov-kabel",
                description: "Автоматизация расчётов параметров, себестоимости и спецификаций для кабельной продукции и металлообработки",
                active: true
              },
              {
                title: "Автоматизация документооборота для инженерных бюро",
                url: "/solutions/avtomatizaciya-dokumentooborota-inzhenernye-byuro",
                description: "Системы документооборота и согласований для инженерных и проектных бюро",
                active: true
              },
              {
                title: "Внедрение CPQ-систем",
                url: "/solutions/vnedrenie-cpq-sistem",
                description: "Внедрение и обучение персонала работе с конфигураторами коммерческих предложений",
                active: true
              }
            ].map((solution, index) => (
              solution.active ? (
                <Link
                  key={index}
                  href={solution.url}
                  className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)] group"
                >
                  <h3 className="text-xl font-semibold text-text mb-3 group-hover:text-brand transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-muted leading-6 mb-4">
                    {solution.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand/80 transition-colors font-medium">
                    Подробнее
                    <HiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ) : (
                <div
                  key={index}
                  className="bg-card border border-white/10 rounded-2xl p-6 opacity-60 cursor-not-allowed relative"
                >
                  <div className="absolute top-4 right-4">
                    <span className="text-xs text-text/50 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                      Скоро будет
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-3 pr-16">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-muted leading-6 mb-4">
                    {solution.description}
                  </p>
                  <div className="text-xs text-text/40 italic">
                    URL: {solution.url}
                  </div>
                </div>
              )
            ))}
          </div>
        </section>

        {/* Industries Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Отрасли
            </h2>
            <p className="text-base text-text/70 max-w-2xl">
              Решения для конкретных отраслей производства и инженерии
            </p>
          </div>
          
          {/* Industries Hub Link */}
          <div className="mb-12">
            <Link
              href="/industries"
              className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)] group block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center text-brand">
                  <HiPuzzle size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-text mb-2 group-hover:text-brand transition-colors">
                    Хаб отраслей
                  </h3>
                  <p className="text-sm text-muted leading-6 mb-2">
                    Обзор всех отраслей, для которых мы создаём решения по автоматизации
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand/80 transition-colors font-medium">
                    Смотреть отрасли
                    <HiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* SEO Paragraph Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
          <div className="max-w-4xl mx-auto">
            <p className="text-base text-text/70 leading-relaxed">
              {seoParagraph}
            </p>
          </div>
        </section>

        {/* Scroll to Top Button */}
        <ScrollToTopButton />

        {/* Cookie Banner */}
        <CookieBanner />
      </div>
    </div>
  );
}
