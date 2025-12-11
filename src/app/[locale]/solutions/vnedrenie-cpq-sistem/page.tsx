import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { 
  HiCheckCircle,
  HiCog,
  HiDocumentText,
  HiClock,
  HiPuzzle,
  HiChartBar,
  HiTrendingUp,
  HiSparkles,
  HiArrowRight,
  HiXCircle,
} from 'react-icons/hi';
import CookieBanner from '@/components/CookieBanner';
import Header from '@/components/Header';
import ScrollToTopButton from '@/components/home/ScrollToTopButton';
import CTAButton from '@/components/CTAButton';
import { WebPageSchema, ServiceSchema, BreadcrumbSchema } from '@/components/StructuredData';
import CasesSectionClient from '@/components/home/CasesSectionClient';
import ClientsSection from '@/components/clients/ClientsSection';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `${baseUrl}/${locale}/solutions/vnedrenie-cpq-sistem`;
  const ogImage = `${baseUrl}/1.png`;

  return {
    title: "Внедрение CPQ-систем для производства — Россия | H-Studio",
    description: "CPQ-системы формируют коммерческие предложения за 1–3 минуты. Автоматические конфигураторы для расчётов параметров, стоимости, сроков и формирования PDF-КП.",
    metadataBase: new URL(baseUrl),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        ru: currentUrl,
      },
    },
    openGraph: {
      title: "Внедрение CPQ-систем для производства — Россия | H-Studio",
      description: "CPQ-системы формируют коммерческие предложения за 1–3 минуты. Автоматические конфигураторы для расчётов параметров, стоимости, сроков и формирования PDF-КП.",
      url: currentUrl,
      siteName: "H-Studio Business",
      locale: 'ru_RU',
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Внедрение CPQ-систем для производства",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Внедрение CPQ-систем для производства — Россия | H-Studio",
      description: "CPQ-системы формируют коммерческие предложения за 1–3 минуты. Автоматические конфигураторы для расчётов параметров, стоимости, сроков и формирования PDF-КП.",
      images: [ogImage],
    },
  };
}

export default async function VnedrenieCPQSistemPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `/${locale}/solutions/vnedrenie-cpq-sistem`;

  const breadcrumbItems = [
    { name: 'Главная', url: `/${locale}` },
    { name: 'Специализированные решения', url: `/${locale}/services` },
    { name: 'Внедрение CPQ-систем', url: currentUrl }
  ];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <WebPageSchema 
        pageUrl={currentUrl}
        title="Внедрение CPQ-систем для производства — Россия | H-Studio"
        description="CPQ-системы формируют коммерческие предложения за 1–3 минуты. Автоматические конфигураторы для расчётов параметров, стоимости, сроков и формирования PDF-КП."
        locale={locale}
      />
      <BreadcrumbSchema 
        items={breadcrumbItems}
        pageUrl={currentUrl}
      />
      <ServiceSchema
        serviceName="Внедрение CPQ-систем для производственных и инженерных компаний"
        description="CPQ-системы формируют коммерческие предложения за 1–3 минуты. Автоматические конфигураторы для расчётов параметров, стоимости, сроков и формирования PDF-КП."
        serviceUrl={currentUrl}
        category="CPQ Implementation"
      />
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(1200px 600px at 20% -10%, rgba(124, 92, 252, 0.25), transparent), radial-gradient(800px 400px at 90% 10%, rgba(107, 230, 117, 0.15), transparent)'
            }}
          />
          
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
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1.5 text-xs text-text/80 font-medium">
                  CPQ • Конфигуратор КП • Автоматизация продаж
                </span>
              </div>
              
              <h1 className="text-[36px] leading-[44px] sm:text-[48px] sm:leading-[56px] lg:text-[56px] lg:leading-[64px] font-semibold tracking-[-0.02em] text-text font-display mb-6">
                CPQ-системы, которые формируют коммерческие предложения за 1–3 минуты
              </h1>
              
              <p className="text-xl text-text/80 leading-7 mb-6">
                Автоматические конфигураторы для расчётов параметров, стоимости, сроков, маржи и формирования PDF-КП. <strong className="text-text">Ускоряют продажи, исключают ошибки и обеспечивают полный контроль ценообразования.</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
                <CTAButton variant="primary" ariaLabel="Получить консультацию">
                  Получить консультацию
                </CTAButton>
                <CTAButton variant="secondary" ariaLabel="Посмотреть пример CPQ">
                  Посмотреть пример CPQ
                </CTAButton>
              </div>

              {/* До/После Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                    <HiXCircle className="text-red-500" size={20} />
                    До внедрения CPQ:
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>расчёты занимают 20–30 минут</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>ошибки в параметрах, массе, сроках</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>продажи ниже себестоимости</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Excel у каждого сотрудника свой</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>менеджеры перегружены</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>долгие КП → потеря заявок</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                    <HiCheckCircle className="text-green-500" size={20} />
                    После внедрения CPQ:
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>КП за 1–3 минуты</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>0 ошибок</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>автоматическая проверка маржинальности</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>единые правила расчётов</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>параметры, сроки и цена рассчитываются автоматически</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>продажа ускоряется в 3–5 раз</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Для кого подходит CPQ Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Для кого подходит CPQ
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto mb-4">
              CPQ-системы для производственных, инженерных и B2B-компаний
            </p>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              CPQ адаптируется под любые формулы, параметры, прайсы, нормы и ТУ.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: HiCog, label: 'Производственные предприятия', description: 'Заводы, цеха, производственные компании' },
              { icon: HiPuzzle, label: 'Инженерные компании', description: 'Проектные бюро, инженерные отделы' },
              { icon: HiCog, label: 'Металлоконструкции', description: 'Производство металлоконструкций' },
              { icon: HiDocumentText, label: 'Кабельная продукция', description: 'Кабельные заводы, производители проводов' },
              { icon: HiCog, label: 'Оборудование и комплектация', description: 'Производство оборудования, комплектующих' },
              { icon: HiTrendingUp, label: 'Торгово-производственные компании', description: 'Торговля и производство' },
              { icon: HiCog, label: 'OEM-производители', description: 'Производители оригинального оборудования' },
              { icon: HiTrendingUp, label: 'B2B-отделы продаж', description: 'B2B-продажи производственным компаниям' },
              { icon: HiChartBar, label: 'Предприятия с большим ассортиментом', description: 'Большой ассортимент продукции' },
              { icon: HiClock, label: 'Компании с частыми обновлениями прайсов', description: 'Частые изменения в прайс-листах' },
            ].map((item, index) => {
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

        {/* Какие проблемы решает CPQ Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-card/30 rounded-3xl mx-4 lg:mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Какие проблемы решает CPQ
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Главные боли, которые устраняет система
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              'долгие расчёты и подготовка КП',
              'ошибки в параметрах и расчетах',
              'продажа ниже себестоимости',
              'отсутствие контроля маржинальности',
              'хаос в Excel и разных версиях файла',
              'слабая прозрачность ценообразования',
              'перегруженные менеджеры',
              'невозможность масштабировать продажи',
              'нет стандартизированных КП',
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-bg border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all"
              >
                <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-sm text-text/80 leading-6">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-base text-text/70 font-medium max-w-3xl mx-auto">
              Автоматический конфигуратор мгновенно решает все эти проблемы.
            </p>
          </div>
        </section>

        {/* Возможности CPQ-системы Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Возможности CPQ-системы
            </h2>
          </div>
          <div className="bg-card border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center text-brand">
                    <HiSparkles size={24} />
                  </div>
                  <h3 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em]">
                    Возможности CPQ-системы
                  </h3>
                </div>
                
                <p className="text-base text-muted leading-6">
                  CPQ-система автоматизирует весь процесс от расчёта параметров до формирования коммерческого предложения, обеспечивая контроль качества и маржинальности.
                </p>

                <div className="space-y-3 pt-4">
                  {[
                    'Автоматические расчёты параметров',
                    'Генерация КП за 1–3 минуты',
                    'Контроль цен и маржинальности',
                    'Управление прайсами',
                    'Интеграция с 1С / ERP / CRM',
                    'Разные уровни доступа',
                    'Логирование и аналитика',
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

              <div className="relative">
                <Image 
                  src="/2.png" 
                  alt="Внедрение CPQ-систем для производственных компаний - конфигуратор коммерческих предложений" 
                  width={800} 
                  height={600}
                  className="w-full h-auto object-contain"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Категории задач Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Категории задач
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              CPQ решает задачи:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              'расчётов',
              'конфигурирования изделий',
              'подготовки КП',
              'спецификаций',
              'расчёта себестоимости',
              'контроля маржи',
              'работы с большими ассортименты',
              'интеграции с ERP / 1С',
              'автоматизации отдела продаж',
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-card border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all"
              >
                <span className="text-brand flex-shrink-0 mt-0.5">
                  <HiCheckCircle size={20} />
                </span>
                <span className="text-sm text-text/80 leading-6">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Примеры результатов Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Примеры результатов
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Wizard КП',
                description: 'Конфигуратор коммерческих предложений для производственных компаний',
                result: 'КП: 20–30 мин → 2–3 мин. 0 ошибок. −60% нагрузки на отдел продаж.'
              },
              {
                title: 'Контроль маржинальности',
                description: 'Автоматическая проверка маржинальности и защита от продаж ниже себестоимости',
                result: '+10–15% прибыли за счёт исключения «ухода в минус». Защита от ошибок менеджеров.'
              },
              {
                title: 'Автоматическая генерация спецификаций',
                description: 'Автоматическое формирование спецификаций и технических документов',
                result: 'Единый формат. Отсутствие ошибок. Интеграция с ERP.'
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]"
              >
                <h3 className="text-[20px] leading-[28px] font-semibold text-text mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-6 mb-4">
                  {item.description}
                </p>
                <p className="text-sm text-brand font-medium">
                  {item.result}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Процесс внедрения CPQ Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Процесс внедрения CPQ
            </h2>
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-5 gap-8">
              {[
                { label: 'Анализ логики расчётов и ассортимента', desc: 'Собираем формулы, материалы, нормы, прайсы, параметры.' },
                { label: 'Проектирование конфигуратора', desc: 'Сценарии выбора, UI, правила расчётов, логика ценообразования.' },
                { label: 'Разработка CPQ-системы', desc: 'Расчётный движок, интерфейсы, PDF-генерация.' },
                { label: 'Интеграции с системами предприятия', desc: '1С, ERP, CRM.' },
                { label: 'Обучение и запуск', desc: 'Помогаем внедрить без сопротивления.' },
              ].map((step, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center"
                  style={{
                    animation: `fadeInUp 0.6s ease-out forwards`,
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-brand to-brand/80 rounded-full flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(124,92,252,0.6)] hover:scale-110 transition-transform">
                  </div>
                  
                  <div className="max-w-[180px]">
                    <h3 className="text-base font-semibold text-text mb-3 leading-tight">{step.label}</h3>
                    <p className="text-sm text-muted leading-6">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:hidden space-y-8">
            {[
              { label: 'Анализ логики расчётов и ассортимента', desc: 'Собираем формулы, материалы, нормы, прайсы, параметры.' },
              { label: 'Проектирование конфигуратора', desc: 'Сценарии выбора, UI, правила расчётов, логика ценообразования.' },
              { label: 'Разработка CPQ-системы', desc: 'Расчётный движок, интерфейсы, PDF-генерация.' },
              { label: 'Интеграции с системами предприятия', desc: '1С, ERP, CRM.' },
              { label: 'Обучение и запуск', desc: 'Помогаем внедрить без сопротивления.' },
            ].map((step, index) => (
              <div 
                key={index} 
                className="flex gap-5 items-start"
                style={{
                  animation: `fadeInUp 0.6s ease-out forwards`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brand to-brand/80 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(124,92,252,0.5)]">
                </div>
                    
                <div className="flex-1 pt-2">
                  <h3 className="text-base font-semibold text-text mb-2">{step.label}</h3>
                  <p className="text-sm text-muted leading-6">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Почему CPQ нужен каждой производственной компании Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Почему CPQ нужен каждой производственной компании
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'продажи ускоряются в 3–5 раз',
              'ошибки полностью исключаются',
              'менеджеров нужно меньше',
              'клиенты получают КП быстрее конкурентов',
              'маржа защищена',
              'вся математика стандартизирована',
              'автоматизация снижает зависимость от сотрудников',
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.2)] text-center"
              >
                <div className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0 mt-0.5">
                    <HiCheckCircle size={20} />
                  </span>
                  <span className="text-base text-text/80 leading-relaxed">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Связанные решения Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Связанные решения
            </h2>
            <p className="text-base text-text/70 max-w-2xl">
              Другие специализированные решения, которые могут быть полезны для вашей компании
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "CPQ для производственных компаний",
                url: "/solutions/cpq-proizvodstvo",
                description: "Конфигураторы коммерческих предложений для производственных компаний в Москве и по России"
              },
              {
                title: "Интеграция 1С для производства",
                url: "/solutions/integraciya-1c-proizvodstvo",
                description: "Интеграция 1С с системами расчётов, КП и документооборота для производственных компаний"
              },
              {
                title: "Автоматизация расчётов для кабеля/металла",
                url: "/solutions/avtomatizaciya-raschetov-kabel",
                description: "Автоматизация расчётов параметров, себестоимости и спецификаций для кабельной продукции и металлообработки"
              },
            ].map((solution, index) => (
              <Link
                key={index}
                href={solution.url}
                className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)] group"
              >
                <h3 className="text-xl font-semibold text-text mb-3 group-hover:text-brand transition-colors">
                  {solution.title}
                </h3>
                <p className="text-sm text-muted leading-6 mb-4 line-clamp-3">
                  {solution.description}
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand/80 transition-colors font-medium">
                  Подробнее
                  <HiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="bg-card border border-white/10 rounded-3xl p-12 lg:p-16 text-center shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl sm:text-[40px] leading-[32px] sm:leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Хотите внедрить CPQ и сократить время подготовки КП до 1–3 минут?
            </h2>
            <p className="text-base text-text/70 mb-8 max-w-2xl mx-auto">
              Проведём бесплатный разбор процессов и покажем, какой конфигуратор подойдёт вашей компании.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <CTAButton variant="primary" ariaLabel="Получить разбор">
                Получить разбор
              </CTAButton>
              <CTAButton variant="secondary" ariaLabel="Посмотреть демо CPQ">
                Посмотреть демо CPQ
              </CTAButton>
            </div>
          </div>
        </section>

        {/* Scroll to Top Button */}
        <ScrollToTopButton />

        {/* Cookie Banner */}
        <CookieBanner />
      </main>
    </div>
  );
}
