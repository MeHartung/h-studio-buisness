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
  const currentUrl = `${baseUrl}/${locale}/solutions/cpq-proizvodstvo`;
  const ogImage = `${baseUrl}/1.png`;

  return {
    title: "CPQ для производственных компаний — Россия | H-Studio",
    description: "Автоматизация коммерческих предложений, расчётов себестоимости, параметров и спецификаций. КП за 1–3 минуты, контроль маржинальности, интеграции с 1С/ERP.",
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
      title: "CPQ для производственных компаний — Россия | H-Studio",
      description: "Автоматизация коммерческих предложений, расчётов себестоимости, параметров и спецификаций. КП за 1–3 минуты, контроль маржинальности, интеграции с 1С/ERP.",
      url: currentUrl,
      siteName: "H-Studio Business",
      locale: 'ru_RU',
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "CPQ для производственных компаний",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "CPQ для производственных компаний — Россия | H-Studio",
      description: "Автоматизация коммерческих предложений, расчётов себестоимости, параметров и спецификаций. КП за 1–3 минуты, контроль маржинальности, интеграции с 1С/ERP.",
      images: [ogImage],
    },
  };
}

export default async function CPQProizvodstvoPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `/${locale}/solutions/cpq-proizvodstvo`;
  const fullUrl = `${baseUrl}${currentUrl}`;

  const breadcrumbItems = [
    { name: 'Главная', url: `/${locale}` },
    { name: 'Специализированные решения', url: `/${locale}/services` },
    { name: 'CPQ для производственных компаний', url: currentUrl }
  ];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <WebPageSchema 
        pageUrl={currentUrl}
        title="CPQ для производственных компаний — Россия | H-Studio"
        description="Автоматизация коммерческих предложений, расчётов себестоимости, параметров и спецификаций. КП за 1–3 минуты, контроль маржинальности, интеграции с 1С/ERP."
        locale={locale}
      />
      <BreadcrumbSchema 
        items={breadcrumbItems}
        pageUrl={currentUrl}
      />
      <ServiceSchema
        serviceName="CPQ для производственных компаний"
        description="Автоматизация коммерческих предложений, расчётов себестоимости, параметров и спецификаций. КП за 1–3 минуты, контроль маржинальности, интеграции с 1С/ERP."
        serviceUrl={currentUrl}
        category="CPQ system implementation"
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
            <div className="max-w-4xl">
              <div className="flex justify-center lg:justify-start mb-6">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1.5 text-xs text-text/80 font-medium">
                  CPQ • Производство • Автоматизация
                </span>
              </div>
              
              <h1 className="text-[36px] leading-[44px] sm:text-[48px] sm:leading-[56px] lg:text-[56px] lg:leading-[64px] font-semibold tracking-[-0.02em] text-text font-display mb-6">
                CPQ-системы для производства и инженерных компаний
              </h1>
              
              <p className="text-xl text-text/80 leading-7 mb-6">
                Автоматизированный конфигуратор коммерческих предложений, расчётов параметров, себестоимости и PDF-документов для производственных предприятий.
              </p>
              
              <p className="text-lg text-text/70 leading-7 mb-8">
                <strong className="text-text">20–30 минут работы → 2–3 минуты.</strong> Ошибки исключены. Маржинальность под контролем.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <CTAButton variant="primary" ariaLabel="Начать проект">
                  Начать проект
                </CTAButton>
                <CTAButton variant="secondary" ariaLabel="Получить разбор">
                  Получить разбор
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        {/* Кому подходит Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Кому подходит
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto mb-4">
              CPQ для производственных компаний в Москве и по России
            </p>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Мы внедряем CPQ-системы, которые автоматизируют расчёты и формирование коммерческих предложений в производственных и инженерных компаниях.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HiCog, label: 'Производственные предприятия', description: 'Заводы, цеха, производственные компании' },
              { icon: HiPuzzle, label: 'Инженерные и проектные компании', description: 'Проектные бюро, инженерные отделы' },
              { icon: HiCog, label: 'Металлоконструкции и машиностроение', description: 'Производство металлоконструкций, машиностроение' },
              { icon: HiDocumentText, label: 'Кабельная, трубопроводная и комплектующая продукция', description: 'Кабельные заводы, трубопроводные системы' },
              { icon: HiClock, label: 'Оконные, дверные и фасадные системы', description: 'Производство окон, дверей, фасадов' },
              { icon: HiChartBar, label: 'Компании с большим ассортиментом и сложными ТУ', description: 'Сложные технические условия, большой ассортимент' },
              { icon: HiPuzzle, label: 'Производство с интеграцией 1С / ERP / CRM', description: 'Интеграция с существующими системами' },
              { icon: HiTrendingUp, label: 'B2B-продажи, где важна точность, скорость и маржинальность', description: 'B2B-продажи с высокими требованиями' },
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
          
          <div className="mt-12 text-center">
            <p className="text-base text-text/70 max-w-3xl mx-auto">
              CPQ упрощает расчёты, стандартизирует процессы и убирает ошибки, которые стоят компании денег.
            </p>
          </div>
        </section>

        {/* Проблемы Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-card/30 rounded-3xl mx-4 lg:mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Проблемы
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Типичные проблемы расчётов и КП в производстве
            </p>
            <p className="text-base text-text/70 max-w-2xl mx-auto mt-2">
              Большинство производственных компаний сталкиваются с одними и теми же трудностями:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              'расчёты занимают 20–40 минут',
              'ошибки в параметрах, КП и спецификациях',
              'хаос в Excel и разных версиях документов',
              'долгие согласования между отделами',
              'торговые ошибки: продажи ниже себестоимости',
              'отсутствие стандартизации расчётов',
              'неудобный процесс подготовки PDF',
              'нет связи с 1С / ERP / CRM',
              'зависимость от конкретных сотрудников',
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
              CPQ устраняет все эти узкие места за счёт стандартизированных расчётов, автоматизации логики и генерации документов.
            </p>
          </div>
        </section>

        {/* Мы решаем Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Мы решаем
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Что даёт CPQ для производства
            </p>
          </div>
          <div className="bg-card border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center text-brand">
                    <HiSparkles size={24} />
                  </div>
                  <h3 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em]">
                    Что даёт CPQ для производства
                  </h3>
                </div>
                
                <p className="text-base text-muted leading-6">
                  CPQ-системы автоматизируют весь процесс от расчётов до формирования коммерческих предложений, исключая ошибки и ускоряя работу в 10 раз.
                </p>

                <div className="space-y-3 pt-4">
                  {[
                    'Автоматические расчёты параметров и себестоимости',
                    'Мгновенное формирование КП (2–3 минуты)',
                    'Автоматическая генерация PDF и спецификаций',
                    'Контроль маржи и защитные правила',
                    'Согласования и маршруты документов',
                    'Интеграция с 1С, ERP и CRM',
                    'Аналитика: себестоимость, цены, логика расчётов',
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
                  alt="CPQ для производственных компаний - автоматизация расчётов и коммерческих предложений" 
                  width={800} 
                  height={600}
                  className="w-full h-auto object-contain"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CPQ-модули Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              CPQ-модули
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Какие модули включает CPQ для производства
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              'Конфигуратор параметров',
              'Модуль расчётов себестоимости',
              'Модуль расчёта сроков',
              'Контроль ошибок и допусков',
              'Модуль маржинальности и ценовых правил',
              'Генерация КП, PDF, спецификаций',
              'Согласования и статусы документов',
              'Интеграция с 1С / ERP / CRM',
              'Экспорт данных и аналитика',
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

        {/* Процесс внедрения Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Процесс внедрения
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Как мы внедряем CPQ в ваших отделах
            </p>
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-5 gap-8">
              {[
                { num: 1, label: 'Анализ ваших расчётов и текущих КП', desc: 'Разбор логики параметров, формул, спецификаций, прайс-листов.' },
                { num: 2, label: 'Проектирование CPQ-системы', desc: 'Структура параметров, расчётов, контролей, интерфейсов.' },
                { num: 3, label: 'Разработка и интеграция', desc: 'Создание конфигуратора, связка с 1С / ERP / CRM.' },
                { num: 4, label: 'Обучение сотрудников', desc: 'Обучающие материалы, онбординг инженеров и менеджеров.' },
                { num: 5, label: 'Оптимизация и поддержка', desc: 'Улучшаем систему на основе данных и обратной связи.' },
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
              { num: 1, label: 'Анализ ваших расчётов и текущих КП', desc: 'Разбор логики параметров, формул, спецификаций, прайс-листов.' },
              { num: 2, label: 'Проектирование CPQ-системы', desc: 'Структура параметров, расчётов, контролей, интерфейсов.' },
              { num: 3, label: 'Разработка и интеграция', desc: 'Создание конфигуратора, связка с 1С / ERP / CRM.' },
              { num: 4, label: 'Обучение сотрудников', desc: 'Обучающие материалы, онбординг инженеров и менеджеров.' },
              { num: 5, label: 'Оптимизация и поддержка', desc: 'Улучшаем систему на основе данных и обратной связи.' },
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

        {/* Результаты внедрения Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Результаты внедрения
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Что получают производственные компании
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'КП за 2–3 минуты', desc: '(вместо 20–30)' },
              { num: '02', title: 'Ошибки исключены', desc: '(−100%)' },
              { num: '03', title: 'Рост производительности', desc: '40–280%' },
              { num: '04', title: 'Уменьшение штата', desc: 'расчётчиков и менеджеров' },
              { num: '05', title: 'Контроль маржинальности', desc: 'и цены' },
              { num: '06', title: 'Быстрые продажи', desc: 'при сложных расчётах' },
              { num: '07', title: 'Чёткий документооборот', desc: 'без хаоса' },
              { num: '08', title: 'Масштабирование', desc: 'без увеличения штата' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.2)] text-center"
              >
                <div className="text-3xl font-bold text-brand mb-3">{item.num}</div>
                <h3 className="text-lg font-semibold text-text mb-2">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Кейсы Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Кейсы
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Реальные примеры
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Wizard КП',
                description: 'Система автоматизации коммерческих предложений для производственной компании',
                result: '20–30 мин → 2–3 мин. Ошибки исключены. Маржинальность под контролем.'
              },
              {
                title: 'Системы расчётов и себестоимости',
                description: 'Автоматизация расчётов параметров и себестоимости продукции',
                result: '1–2 минуты на расчёт. −40% нагрузки на инженеров.'
              },
              {
                title: 'Документооборот и согласования',
                description: 'Автоматизация документооборота и процессов согласования',
                result: 'Скорость роста: ×5–10. Прозрачность статусов.'
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

        {/* Почему выбирают нас Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Почему выбирают нас
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Экспертиза в производстве и инженерии',
              'Системы под ваши ТУ, формулы и спецификации',
              'Интеграции с 1С, ERP, CRM',
              'Быстрый запуск: 3–10 недель',
              'Экономия 150 000–600 000 ₽ в месяц',
              'Поддержка после внедрения',
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.2)]"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-brand/20 to-accent/20 rounded-xl flex items-center justify-center mb-4 text-brand">
                  <HiSparkles size={24} />
                </div>
                <h3 className="text-xl font-semibold text-text mb-3">{item}</h3>
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
                title: "Интеграция 1С для производства",
                url: "/solutions/integraciya-1c-proizvodstvo",
                description: "Интеграция 1С с системами расчётов, КП и документооборота для производственных компаний"
              },
              {
                title: "Автоматизация расчётов для кабеля/металла",
                url: "/solutions/avtomatizaciya-raschetov-kabel",
                description: "Автоматизация расчётов параметров, себестоимости и спецификаций для кабельной продукции и металлообработки"
              },
              {
                title: "Автоматизация документооборота для инженерных бюро",
                url: "/solutions/avtomatizaciya-dokumentooborota-inzhenernye-byuro",
                description: "Системы документооборота и согласований для инженерных и проектных бюро"
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
              Хотите увидеть, как CPQ сократит расходы и ускорит продажи?
            </h2>
            <p className="text-base text-text/70 mb-8 max-w-2xl mx-auto">
              Мы сделаем бесплатный разбор вашей схемы расчётов, КП и документооборота.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <CTAButton variant="primary" ariaLabel="Получить разбор">
                Получить разбор
              </CTAButton>
              <CTAButton variant="secondary" ariaLabel="Посмотреть пример решения">
                Посмотреть пример решения
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
