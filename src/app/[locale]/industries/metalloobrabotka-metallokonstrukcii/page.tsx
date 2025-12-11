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

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `${baseUrl}/${locale}/industries/metalloobrabotka-metallokonstrukcii`;
  const ogImage = `${baseUrl}/1.png`;

  return {
    title: "Металлообработка и металлоконструкции — Автоматизация расчётов и КП | H-Studio",
    description: "Автоматизация расчётов массы, материалов, себестоимости, КП, спецификаций и документооборота для металлообработки и металлоконструкций. КП за 1–3 минуты, исключение ошибок, интеграции с 1С/ERP.",
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
      title: "Металлообработка и металлоконструкции — Автоматизация расчётов и КП | H-Studio",
      description: "Автоматизация расчётов массы, материалов, себестоимости, КП, спецификаций и документооборота для металлообработки и металлоконструкций. КП за 1–3 минуты, исключение ошибок, интеграции с 1С/ERP.",
      url: currentUrl,
      siteName: "H-Studio Business",
      locale: 'ru_RU',
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Металлообработка и металлоконструкции",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Металлообработка и металлоконструкции — Автоматизация расчётов и КП | H-Studio",
      description: "Автоматизация расчётов массы, материалов, себестоимости, КП, спецификаций и документооборота для металлообработки и металлоконструкций. КП за 1–3 минуты, исключение ошибок, интеграции с 1С/ERP.",
      images: [ogImage],
    },
  };
}

export default async function MetalloobrabotkaMetallokonstrukciiPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `/${locale}/industries/metalloobrabotka-metallokonstrukcii`;

  const breadcrumbItems = [
    { name: 'Главная', url: `/${locale}` },
    { name: 'Отрасли', url: `/${locale}/industries` },
    { name: 'Металлообработка и металлоконструкции', url: currentUrl }
  ];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <WebPageSchema 
        pageUrl={currentUrl}
        title="Металлообработка и металлоконструкции — Автоматизация расчётов и КП | H-Studio"
        description="Автоматизация расчётов массы, материалов, себестоимости, КП, спецификаций и документооборота для металлообработки и металлоконструкций. КП за 1–3 минуты, исключение ошибок, интеграции с 1С/ERP."
        locale={locale}
      />
      <BreadcrumbSchema 
        items={breadcrumbItems}
        pageUrl={currentUrl}
      />
      <ServiceSchema
        serviceName="Автоматизация для металлообработки и металлоконструкций"
        description="Автоматизация расчётов массы, материалов, себестоимости, КП, спецификаций и документооборота для металлообработки и металлоконструкций. КП за 1–3 минуты, исключение ошибок, интеграции с 1С/ERP."
        serviceUrl={currentUrl}
        category="Metalworking Automation"
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
                  Металлообработка • Металлоконструкции • Инженерия
                </span>
              </div>
              
              <h1 className="text-[36px] leading-[44px] sm:text-[48px] sm:leading-[56px] lg:text-[56px] lg:leading-[64px] font-semibold tracking-[-0.02em] text-text font-display mb-6">
                Автоматизация расчётов, КП и спецификаций для металлообработки
              </h1>
              
              <p className="text-xl text-text/80 leading-7 mb-6">
                Системы для расчётов параметров, массы, материалов, себестоимости, спецификаций, КП, документооборота и согласований — <strong className="text-text">быстрее, точнее, без ошибок.</strong>
              </p>
              
              <p className="text-lg text-text/70 leading-7 mb-8">
                Идеально для цехов, заводов, проектных бюро и компаний по производству металлоконструкций.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
                <CTAButton variant="primary" ariaLabel="Получить разбор">
                  Получить разбор
                </CTAButton>
                <CTAButton variant="secondary" ariaLabel="Посмотреть пример решения">
                  Посмотреть пример решения
                </CTAButton>
              </div>
            </div>

            {/* Value блок - вынесен за пределы max-w-4xl для большего пространства */}
            <div className="w-full mt-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-brand mb-2 whitespace-nowrap">20–30 мин → 2–3 мин</div>
                  <p className="text-xs md:text-sm text-text/70">на подготовку КП</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-brand mb-2 whitespace-nowrap">−100%</div>
                  <p className="text-xs md:text-sm text-text/70">ошибки в расчётах</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-brand mb-2 whitespace-nowrap">150 000–600 000 ₽</div>
                  <p className="text-xs md:text-sm text-text/70">экономия в месяц</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-brand mb-2 whitespace-nowrap">+180–300%</div>
                  <p className="text-xs md:text-sm text-text/70">рост производительности</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* О чём эта отрасль Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              О чём эта отрасль
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Автоматизация для металлообработки решает ключевые задачи:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              'расчёт массы, материалов, резки, гибки, сварки',
              'расчёт себестоимости и сроков изготовления',
              'автоматический контроль ошибок',
              'формирование КП и спецификаций',
              'генерация PDF, ведомостей, технических файлов',
              'управление документооборотом и согласованиями',
              'интеграции с 1С, ERP, CRM',
              'стандартизация инженерных расчётов',
              'снижение нагрузки на инженеров и отдел продаж',
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
          <div className="mt-8 text-center">
            <p className="text-base text-text/70 font-medium max-w-3xl mx-auto">
              Наши решения заменяют Excel, ручные формулы, разрозненные файлы и ошибки в расчётах — создавая единую стабильную систему.
            </p>
          </div>
        </section>

        {/* Проблемы Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-card/30 rounded-3xl mx-4 lg:mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Проблемы, которые мы решаем
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Типичные проблемы производственных компаний в металлообработке:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              'длительные ручные расчёты параметров',
              'ошибки в массе, материалах и себестоимости',
              'потерянные или разные версии КП',
              'отсутствие контроля маржинальности',
              'сложные согласования и задержки',
              'разрозненные Excel-файлы',
              'невозможность масштабирования процессов',
              'отсутствие интеграций между 1С/ERP/CRM',
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
              Мы устраняем эти проблемы системно — с архитектурой, рассчитанной на рост.
            </p>
          </div>
        </section>

        {/* Ключевые процессы Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Ключевые процессы, которые даёт максимальный эффект
            </h2>
          </div>
          <div className="space-y-8">
            {[
              {
                num: '1)',
                title: 'Автоматизация расчётов для металлообработки',
                items: [
                  'масса, объёмы, материалы',
                  'стойкость инструмента',
                  'операции резки, гибки, сварки',
                  'себестоимость',
                  'сроки производства',
                  'контроль ошибок в расчёте',
                ],
                result: 'Результат: расчёты единообразны, быстры и точны.'
              },
              {
                num: '2)',
                title: 'КП и спецификации в 1–3 минуты',
                items: [
                  'КП',
                  'спецификации',
                  'файлы для производства',
                  'ведомости материалов',
                  'PDF с единым макетом',
                ],
                result: 'Результат: менеджеры готовят больше КП, выигрывая конкуренцию за счёт скорости и точности.'
              },
              {
                num: '3)',
                title: 'Контроль цен и маржинальности',
                items: [
                  'минимальная маржа',
                  'корректность цен',
                  'ошибки в параметрах',
                  'предельные отклонения',
                ],
                result: 'Результат: исключены продажи ниже себестоимости.'
              },
              {
                num: '4)',
                title: 'Документооборот и согласования',
                items: [
                  'маршрутизация',
                  'статусы',
                  'напоминания',
                  'управление версиями',
                  'лог действий',
                ],
                result: 'Результат: согласования происходят в 5–10 раз быстрее.'
              },
              {
                num: '5)',
                title: 'Интеграции с 1С, ERP, CRM',
                items: [
                  '1С УПП / ERP / КА',
                  'SAP',
                  'Bitrix24 / amoCRM',
                  'внутренние системы',
                ],
                result: 'Результат: данные не теряются, КП и спецификации автоматически загружаются в вашу систему.'
              },
            ].map((process, index) => (
              <div
                key={index}
                className="bg-card border border-white/10 rounded-2xl p-6 lg:p-8 hover:border-white/20 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.2)]"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-2xl font-bold text-brand">{process.num}</span>
                  <h3 className="text-[28px] leading-[36px] font-semibold text-text">{process.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4 ml-8">
                  {process.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-2">
                      <span className="text-brand flex-shrink-0 mt-0.5">
                        <HiCheckCircle size={16} />
                      </span>
                      <span className="text-sm text-text/80">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-brand font-medium ml-8">{process.result}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Для кого Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Для кого
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Эти решения подходят для компаний, работающих с металлом:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              'металлообработка всех типов',
              'изготовление металлоконструкций',
              'производство сварных и сборных изделий',
              'лазерная/плазменная резка',
              'гибка металла',
              'трубогибы и профилегибы',
              'производственные цеха',
              'проектные бюро',
              'инженерные отделы',
              'компании с большими прайс-листами',
              'OEM-производители',
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

        {/* Примеры решений Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Примеры решений (кейсы)
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Wizard КП (производство)',
                description: 'Конфигуратор коммерческих предложений для производственных компаний',
                result: '20–30 мин → 2–3 мин. Ошибки исключены полностью. Прозрачный контроль маржи.'
              },
              {
                title: 'Системы расчётов и себестоимости',
                description: 'Автоматизация расчётов массы и материалов для металлообработки',
                result: 'Расчёт массы и материалов. Интеграция с ERP. Стандартизация расчётов.'
              },
              {
                title: 'Документооборот и согласования',
                description: 'Автоматизация документооборота и процессов согласования',
                result: 'Согласования в 5–10 раз быстрее. Устранены узкие места. Прозрачность статусов.'
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
              'Глубокая экспертиза в инженерии и производстве',
              'Архитектура без «заплаток», рассчитанная на рост',
              'Интеграции с 1С/ERP без риска сломать процессы',
              'Быстрый запуск: 3–10 недель',
              'Поддержка и развитие после внедрения',
              'Доказанные результаты: +180–300% производительности, исключение ошибок, рост прибыли за счёт контроля маржи',
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

        {/* Наш процесс Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Наш процесс
            </h2>
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-5 gap-8">
              {[
                { label: 'Анализ текущих процессов', desc: 'Сбор расчётов, формул, чертежей, Excel, спецификаций.' },
                { label: 'Проектирование решения', desc: 'Создаём архитектуру под ваши изделия, параметры, бизнес-логику.' },
                { label: 'Разработка и интеграция', desc: 'Алгоритмы расчётов, CPQ, спецификации, PDF, 1С/ERP.' },
                { label: 'Внедрение и обучение', desc: 'Обучение сотрудников, документация, сопровождение.' },
                { label: 'Поддержка и улучшение', desc: 'Обновления, новые параметры, новые прайсы, развитие системы.' },
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
              { label: 'Анализ текущих процессов', desc: 'Сбор расчётов, формул, чертежей, Excel, спецификаций.' },
              { label: 'Проектирование решения', desc: 'Создаём архитектуру под ваши изделия, параметры, бизнес-логику.' },
              { label: 'Разработка и интеграция', desc: 'Алгоритмы расчётов, CPQ, спецификации, PDF, 1С/ERP.' },
              { label: 'Внедрение и обучение', desc: 'Обучение сотрудников, документация, сопровождение.' },
              { label: 'Поддержка и улучшение', desc: 'Обновления, новые параметры, новые прайсы, развитие системы.' },
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

        {/* Связанные решения Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Связанные решения
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Специализированные решения для металлообработки и металлоконструкций
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "CPQ для производственных компаний",
                url: "/solutions/cpq-proizvodstvo",
                description: "Конфигураторы коммерческих предложений для производственных компаний"
              },
              {
                title: "Автоматизация расчётов для кабеля/металла",
                url: "/solutions/avtomatizaciya-raschetov-kabel",
                description: "Автоматизация расчётов параметров, себестоимости и спецификаций"
              },
              {
                title: "Интеграция 1С для производства",
                url: "/solutions/integraciya-1c-proizvodstvo",
                description: "Интеграция 1С с системами расчётов, КП и документооборота"
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
                <p className="text-sm text-muted leading-6 mb-4">
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
              Получить разбор
            </h2>
            <p className="text-base text-text/70 mb-4 max-w-2xl mx-auto">
              Мы проанализируем ваши процессы расчётов и покажем:
            </p>
            <ul className="text-base text-text/70 mb-8 max-w-2xl mx-auto text-left space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-brand mt-1">—</span>
                <span>где теряются деньги</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand mt-1">—</span>
                <span>где возникают ошибки</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand mt-1">—</span>
                <span>насколько можно ускорить подготовку КП</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand mt-1">—</span>
                <span>как стандартизировать расчёты без сопротивления команды</span>
              </li>
            </ul>
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
