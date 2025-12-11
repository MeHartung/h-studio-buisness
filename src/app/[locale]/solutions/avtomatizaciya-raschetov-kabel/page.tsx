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
  const currentUrl = `${baseUrl}/${locale}/solutions/avtomatizaciya-raschetov-kabel`;
  const ogImage = `${baseUrl}/1.png`;

  return {
    title: "Автоматизация расчётов кабеля и металла — Россия | H-Studio",
    description: "Автоматизация расчётов параметров, себестоимости и спецификаций для кабельной продукции и металлообработки. Расчёты за 1–2 минуты без ошибок.",
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
      title: "Автоматизация расчётов кабеля и металла — Россия | H-Studio",
      description: "Автоматизация расчётов параметров, себестоимости и спецификаций для кабельной продукции и металлообработки. Расчёты за 1–2 минуты без ошибок.",
      url: currentUrl,
      siteName: "H-Studio Business",
      locale: 'ru_RU',
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Автоматизация расчётов кабеля и металла",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Автоматизация расчётов кабеля и металла — Россия | H-Studio",
      description: "Автоматизация расчётов параметров, себестоимости и спецификаций для кабельной продукции и металлообработки. Расчёты за 1–2 минуты без ошибок.",
      images: [ogImage],
    },
  };
}

export default async function AvtomatizaciyaRaschetovKabelPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `/${locale}/solutions/avtomatizaciya-raschetov-kabel`;

  const breadcrumbItems = [
    { name: 'Главная', url: `/${locale}` },
    { name: 'Специализированные решения', url: `/${locale}/services` },
    { name: 'Автоматизация расчётов для кабеля и металла', url: currentUrl }
  ];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <WebPageSchema 
        pageUrl={currentUrl}
        title="Автоматизация расчётов кабеля и металла — Россия | H-Studio"
        description="Автоматизация расчётов параметров, себестоимости и спецификаций для кабельной продукции и металлообработки. Расчёты за 1–2 минуты без ошибок."
        locale={locale}
      />
      <BreadcrumbSchema 
        items={breadcrumbItems}
        pageUrl={currentUrl}
      />
      <ServiceSchema
        serviceName="Автоматизация расчётов для кабельной продукции и металлоконструкций"
        description="Автоматизация расчётов параметров, себестоимости и спецификаций для кабельной продукции и металлообработки. Расчёты за 1–2 минуты без ошибок."
        serviceUrl={currentUrl}
        category="Calculation Automation"
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
                  Автоматизация расчётов • Кабель • Металлоконструкции
                </span>
              </div>
              
              <h1 className="text-[36px] leading-[44px] sm:text-[48px] sm:leading-[56px] lg:text-[56px] lg:leading-[64px] font-semibold tracking-[-0.02em] text-text font-display mb-6">
                Автоматизация расчётов параметров, себестоимости и спецификаций
              </h1>
              
              <p className="text-xl text-text/80 leading-7 mb-6">
                Для кабельной продукции, металлоконструкций и инженерных изделий
              </p>
              
              <p className="text-lg text-text/70 leading-7 mb-8">
                Системы, которые считают массу, материалы, длину, толщину стенки, конфигурацию, стоимость, сроки и формируют спецификации — <strong className="text-text">автоматически и без ошибок.</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <CTAButton variant="primary" ariaLabel="Получить консультацию">
                  Получить консультацию
                </CTAButton>
                <CTAButton variant="secondary" ariaLabel="Посмотреть пример решения">
                  Посмотреть пример решения
                </CTAButton>
              </div>

              {/* До/После Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                    <HiXCircle className="text-red-500" size={20} />
                    До внедрения:
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>20–40 минут на один расчёт</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Ошибки в массе, длине, материалах</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Хаос в Excel — разные версии</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Задержки в КП и производстве</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                    <HiCheckCircle className="text-green-500" size={20} />
                    После внедрения:
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>1–2 минуты на расчёт</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>0% ошибок</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Единый источник данных</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>КП и спецификации формируются автоматически</span>
                    </li>
                  </ul>
                </div>
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
              Автоматизация расчётов для кабельной, металлургической и инженерной продукции
            </p>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Система адаптируется под любые формулы, параметры и ТУ.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: HiCog, label: 'Производители кабельной продукции', description: 'Кабельные заводы, производители проводов' },
              { icon: HiCog, label: 'Производители металлоконструкций', description: 'Производство металлоконструкций' },
              { icon: HiPuzzle, label: 'Механообработка и комплектация', description: 'Механообработка, комплектация изделий' },
              { icon: HiCog, label: 'Заводы и сборочные цеха', description: 'Производственные цеха, сборочные линии' },
              { icon: HiChartBar, label: 'Компании с нестандартными ТУ и индивидуальными параметрами', description: 'Индивидуальные технические условия' },
              { icon: HiCog, label: 'Производство оборудования и комплектующих', description: 'Оборудование, комплектующие' },
              { icon: HiTrendingUp, label: 'Производственные компании B2B', description: 'B2B-продажи производственным компаниям' },
              { icon: HiTrendingUp, label: 'Торгово-производственные компании', description: 'Торговля и производство' },
              { icon: HiPuzzle, label: 'Инженерно-технические отделы', description: 'Инженерные отделы, проектные бюро' },
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

        {/* Проблемы Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-card/30 rounded-3xl mx-4 lg:mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Проблемы, которые решает система
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Типичные проблемы на предприятиях кабельной и металлической продукции
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              'расчёты "вручную" → ошибки в массе, длине, материалах',
              'специалисты перегружены расчётами',
              'Excel-файлы ломаются и теряются',
              'нет единой версии документа',
              'долгие согласования КП',
              'низкая прозрачность себестоимости',
              'ошибки в спецификациях приводят к потерям',
              'параметры не совпадают с производством',
              'зависимость от отдельных сотрудников',
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
              Автоматизация убирает ошибки и ускоряет работу в 10–15 раз.
            </p>
          </div>
        </section>

        {/* Что автоматизируем Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Что автоматизируем
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
                    Что автоматизируем
                  </h3>
                </div>
                
                <p className="text-base text-muted leading-6">
                  Автоматизация расчётов охватывает все этапы: от параметров изделий до формирования спецификаций и интеграции с системами предприятия.
                </p>

                <div className="space-y-3 pt-4">
                  {[
                    'Машинные расчёты параметров изделий',
                    'Себестоимость и сроки производства',
                    'Генерация КП и PDF',
                    'Автоматическая генерация спецификаций',
                    'Контроль ошибок и маржинальности',
                    'Интеграция с 1С, ERP, CRM',
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
                  alt="Автоматизация расчётов для кабеля и металлоконструкций - системы расчёта параметров и себестоимости" 
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              'расчёты параметров кабеля',
              'расчёт металлоконструкций',
              'расчёты профильных труб и изделий',
              'спецификации, ТУ, технические документы',
              'конфигураторы номенклатуры',
              'КП для B2B заказчиков',
              'интеграция с 1С и ERP',
              'контроль себестоимости',
              'расчёт комплектующих',
              'аналитика и отчёты',
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

        {/* Кейсы автоматизации Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Кейсы автоматизации
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Системы расчёта себестоимости',
                description: 'Автоматизация расчётов себестоимости для кабельной и металлической продукции',
                result: '1–2 минуты на расчёт. Нагрузка на инженеров −40%. Исключены ошибки параметров.'
              },
              {
                title: 'Wizard КП',
                description: 'Конфигуратор коммерческих предложений для производственных компаний',
                result: '20–30 мин → 2–3 мин. 0 ошибок. −40–60% нагрузки на отдел продаж.'
              },
              {
                title: 'Спецификации и PDF-документы',
                description: 'Автоматическая генерация спецификаций и технических документов',
                result: 'Одинаковый формат. Генерация автоматически. Данные всегда актуальны.'
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

        {/* Процесс внедрения Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Процесс внедрения
            </h2>
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-5 gap-8">
              {[
                { label: 'Анализ формул, ТУ, параметров и текущих расчётов', desc: 'Собираем все расчётные модели.' },
                { label: 'Архитектура расчётной системы', desc: 'Проектируем формулы, интерфейсы, структуру спецификаций.' },
                { label: 'Разработка конфигуратора', desc: 'Логика расчётов + UI + интеграции.' },
                { label: 'Интеграция с 1С / ERP', desc: 'Автоэкспорт параметров, себестоимости, спецификаций.' },
                { label: 'Внедрение в команды', desc: 'Обучение, документация, поддержка.' },
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
              { label: 'Анализ формул, ТУ, параметров и текущих расчётов', desc: 'Собираем все расчётные модели.' },
              { label: 'Архитектура расчётной системы', desc: 'Проектируем формулы, интерфейсы, структуру спецификаций.' },
              { label: 'Разработка конфигуратора', desc: 'Логика расчётов + UI + интеграции.' },
              { label: 'Интеграция с 1С / ERP', desc: 'Автоэкспорт параметров, себестоимости, спецификаций.' },
              { label: 'Внедрение в команды', desc: 'Обучение, документация, поддержка.' },
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'ускорение расчётов в 10–15 раз',
              '0 ошибок в спецификациях',
              'стандартизация расчётов',
              'прозрачная себестоимость',
              'единый источник данных',
              'снижение нагрузки на инженеров',
              'меньше потерь и пересчётов',
              'быстрые КП, быстрые согласования',
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

        {/* Почему выбирают нас Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Почему выбирают нас
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'опыт в инженерии, расчётах и производстве',
              'глубокая работа с ТУ и параметрами',
              'интеграции с 1С и ERP',
              'правильные расчётные модели, без технических ошибок',
              'быстрая разработка: 3–10 недель',
              'масштабируемые системы под большие номенклатуры',
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
                title: "Внедрение CPQ-систем",
                url: "/solutions/vnedrenie-cpq-sistem",
                description: "Внедрение и обучение персонала работе с конфигураторами коммерческих предложений"
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
              Хотите увидеть, как автоматизация расчётов ускорит вашу компанию?
            </h2>
            <p className="text-base text-text/70 mb-8 max-w-2xl mx-auto">
              Сделаем бесплатный разбор процессов и покажем цифры экономии.
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
