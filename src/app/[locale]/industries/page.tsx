import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
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
import { WebPageSchema, ServiceSchema, BreadcrumbSchema, ItemListSchema } from '@/components/StructuredData';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `${baseUrl}/${locale}/industries`;
  const ogImage = `${baseUrl}/1.png`;

  return {
    title: "Отрасли: автоматизация расчётов, КП и производственных процессов | H-Studio",
    description: "Решения для металлоконструкций, кабельной продукции, машиностроения и инженерных компаний. Автоматизация расчётов, себестоимости, КП, спецификаций и интеграций с 1С/ERP.",
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
      title: "Отрасли: автоматизация расчётов, КП и производственных процессов | H-Studio",
      description: "Решения для металлоконструкций, кабельной продукции, машиностроения и инженерных компаний. Автоматизация расчётов, себестоимости, КП, спецификаций и интеграций с 1С/ERP.",
      url: currentUrl,
      siteName: "H-Studio Business",
      locale: 'ru_RU',
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Отрасли автоматизации",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Отрасли: автоматизация расчётов, КП и производственных процессов | H-Studio",
      description: "Решения для металлоконструкций, кабельной продукции, машиностроения и инженерных компаний. Автоматизация расчётов, себестоимости, КП, спецификаций и интеграций с 1С/ERP.",
      images: [ogImage],
    },
  };
}

export default async function IndustriesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `/${locale}/industries`;

  const breadcrumbItems = [
    { name: 'Главная', url: `/${locale}` },
    { name: 'Отрасли', url: currentUrl }
  ];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <WebPageSchema 
        pageUrl={currentUrl}
        title="Отрасли: автоматизация расчётов, КП и производственных процессов | H-Studio"
        description="Решения для металлоконструкций, кабельной продукции, машиностроения и инженерных компаний. Автоматизация расчётов, себестоимости, КП, спецификаций и интеграций с 1С/ERP."
        locale={locale}
      />
      <BreadcrumbSchema 
        items={breadcrumbItems}
        pageUrl={currentUrl}
      />
      <ServiceSchema
        serviceName="Отраслевые решения для автоматизации производства"
        description="Решения для металлоконструкций, кабельной продукции, машиностроения и инженерных компаний. Автоматизация расчётов, себестоимости, КП, спецификаций и интеграций с 1С/ERP."
        serviceUrl={currentUrl}
        category="Industry Solutions"
      />
      <ItemListSchema
        listUrl={currentUrl}
        listName="Отрасли автоматизации"
        items={[
          {
            name: "Металлообработка и металлоконструкции",
            description: "Автоматизация расчётов параметров, себестоимости, КП и спецификаций для металлоконструкций, сварных изделий, профилей, несущих систем и изделий с большим количеством параметров.",
            url: `/${locale}/industries/metalloobrabotka-metallokonstrukcii`
          },
          {
            name: "Кабель, провода, профили",
            description: "Системы расчётов параметров кабелей и проводов, материалов, массы, длины, комплектации, себестоимости и автоматическое формирование спецификаций и КП.",
            url: `/${locale}/industries/kabel-provod-profil`
          },
          {
            name: "Оборудование и машиностроение",
            description: "Инженерные конфигураторы, расчёты характеристик, себестоимости, комплектации, техдокументов и документооборот для производителей оборудования и машиностроения.",
            url: `/${locale}/industries/oborudovanie-mashinostroenie`
          }
        ]}
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
              <h1 className="text-[36px] leading-[44px] sm:text-[48px] sm:leading-[56px] lg:text-[56px] lg:leading-[64px] font-semibold tracking-[-0.02em] text-text font-display mb-6">
                Отрасли
              </h1>
              
              <p className="text-xl text-text/80 leading-7 mb-6">
                Автоматизация расчётов, КП, спецификаций и производственных процессов для инженерных и производственных компаний
              </p>
              
              <p className="text-lg text-text/70 leading-7 mb-8">
                Мы создаём специализированные решения для разных сегментов производства, машиностроения, металлоконструкций и инженерии — от расчётов и себестоимости до документооборота, интеграций и согласований.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <CTAButton variant="primary" ariaLabel="Смотреть отрасли">
                  Смотреть отрасли
                </CTAButton>
                <CTAButton variant="secondary" ariaLabel="Получить разбор">
                  Получить разбор
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        {/* Intro-блок Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="bg-card border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
            <p className="text-lg text-text/80 leading-7 mb-6">
              <strong className="text-text">Каждая отрасль — уникальна:</strong> свои формулы, свои спецификации, свои процессы и ограничения.
            </p>
            <p className="text-base text-text/70 leading-7 mb-6">
              Мы создаём архитектуры, которые адаптируются под конкретные требования:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'расчёты параметров и себестоимости',
                'автоматическое формирование КП',
                'спецификации, ТУ и PDF-документы',
                'контроль цен и маржинальности',
                'маршруты согласований и статусы',
                'интеграции с 1С / ERP / CRM',
                'аналитика, отчёты и автоматизация процессов',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-brand flex-shrink-0 mt-0.5">
                    <HiCheckCircle size={16} />
                  </span>
                  <span className="text-sm text-text/80">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-base text-text/70 leading-7 mt-6 font-medium">
              Это не шаблоны — это инженерные системы, построенные под вашу деятельность.
            </p>
          </div>
        </section>

        {/* Grid отраслей Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Отрасли, с которыми мы работаем
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Металлообработка и металлоконструкции",
                url: "/industries/metalloobrabotka-metallokonstrukcii",
                description: "Автоматизация расчётов параметров, себестоимости, КП и спецификаций для металлоконструкций, сварных изделий, профилей, несущих систем и изделий с большим количеством параметров."
              },
              {
                title: "Кабель, провода, профили",
                url: "/industries/kabel-provod-profil",
                description: "Системы расчётов параметров кабелей и проводов, материалов, массы, длины, комплектации, себестоимости и автоматическое формирование спецификаций и КП."
              },
              {
                title: "Оборудование и машиностроение",
                url: "/industries/oborudovanie-mashinostroenie",
                description: "Инженерные конфигураторы, расчёты характеристик, себестоимости, комплектации, техдокументов и документооборот для производителей оборудования и машиностроения."
              },
            ].map((industry, index) => (
              <Link
                key={index}
                href={industry.url}
                className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)] group"
              >
                <h3 className="text-xl font-semibold text-text mb-3 group-hover:text-brand transition-colors">
                  {industry.title}
                </h3>
                <p className="text-sm text-muted leading-6 mb-4 line-clamp-4">
                  {industry.description}
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand/80 transition-colors font-medium">
                  Смотреть отрасль
                  <HiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Почему отраслевые решения работают лучше Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Почему отраслевые решения работают лучше
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'архитектура адаптирована под специфику отрасли',
              'учёт всех технических ограничений',
              'встроенная логика расчётов и параметров',
              'унификация КП и техдокументов',
              'уменьшение нагрузки на инженеров и производство',
              'исключение ошибок в спецификациях и себестоимости',
              'интеграции с вашей средой (1С, ERP, CRM)',
              'масштабирование без переработок',
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.2)]"
              >
                <div className="flex items-start gap-3">
                  <span className="text-brand flex-shrink-0 mt-0.5">
                    <HiCheckCircle size={20} />
                  </span>
                  <span className="text-sm text-text/80 leading-6">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Как мы работаем Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Как мы работаем
            </h2>
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-6 gap-8">
              {[
                { label: 'Анализ отрасли и инженерной логики', desc: 'Изучаем процессы, формулы, спецификации, внутренние правила.' },
                { label: 'Проектирование вычислительной модели', desc: 'Создаём структуру параметров, расчётов, формул, связей.' },
                { label: 'Разработка конфигураторов, КП и документооборота', desc: 'Автоматизация расчётов, PDF, спецификаций, маршрутов.' },
                { label: 'Интеграции 1С / ERP / CRM', desc: 'Связываем системы, исключаем ручные операции.' },
                { label: 'Пилотный запуск → внедрение в отделы', desc: 'Внедряем плавно, обучаем сотрудников.' },
                { label: 'Поддержка и улучшение', desc: 'Расширяем конфигураторы, добавляем логику, обновляем расчёты.' },
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
                  
                  <div className="max-w-[150px]">
                    <h3 className="text-base font-semibold text-text mb-3 leading-tight">{step.label}</h3>
                    <p className="text-sm text-muted leading-6">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:hidden space-y-8">
            {[
              { label: 'Анализ отрасли и инженерной логики', desc: 'Изучаем процессы, формулы, спецификации, внутренние правила.' },
              { label: 'Проектирование вычислительной модели', desc: 'Создаём структуру параметров, расчётов, формул, связей.' },
              { label: 'Разработка конфигураторов, КП и документооборота', desc: 'Автоматизация расчётов, PDF, спецификаций, маршрутов.' },
              { label: 'Интеграции 1С / ERP / CRM', desc: 'Связываем системы, исключаем ручные операции.' },
              { label: 'Пилотный запуск → внедрение в отделы', desc: 'Внедряем плавно, обучаем сотрудников.' },
              { label: 'Поддержка и улучшение', desc: 'Расширяем конфигураторы, добавляем логику, обновляем расчёты.' },
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

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="bg-card border border-white/10 rounded-3xl p-12 lg:p-16 text-center shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl sm:text-[40px] leading-[32px] sm:leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Хотите понять, как автоматизация работает в вашей отрасли?
            </h2>
            <p className="text-base text-text/70 mb-8 max-w-2xl mx-auto">
              Сделаем бесплатный разбор процессов и покажем размер экономии.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <CTAButton variant="primary" ariaLabel="Получить разбор">
                Получить разбор
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
