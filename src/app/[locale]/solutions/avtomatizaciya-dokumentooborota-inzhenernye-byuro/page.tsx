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
  const currentUrl = `${baseUrl}/${locale}/solutions/avtomatizaciya-dokumentooborota-inzhenernye-byuro`;
  const ogImage = `${baseUrl}/1.png`;

  return {
    title: "Автоматизация документооборота инженерных бюро — Россия | H-Studio",
    description: "Системы документооборота и согласований для инженерных и проектных бюро. Ускорение согласований в 5–10 раз. Автоматизация маршрутов, версий и статусов.",
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
      title: "Автоматизация документооборота инженерных бюро — Россия | H-Studio",
      description: "Системы документооборота и согласований для инженерных и проектных бюро. Ускорение согласований в 5–10 раз. Автоматизация маршрутов, версий и статусов.",
      url: currentUrl,
      siteName: "H-Studio Business",
      locale: 'ru_RU',
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Автоматизация документооборота инженерных бюро",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Автоматизация документооборота инженерных бюро — Россия | H-Studio",
      description: "Системы документооборота и согласований для инженерных и проектных бюро. Ускорение согласований в 5–10 раз. Автоматизация маршрутов, версий и статусов.",
      images: [ogImage],
    },
  };
}

export default async function AvtomatizaciyaDokumentooborotaInzhenernyeByuroPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `/${locale}/solutions/avtomatizaciya-dokumentooborota-inzhenernye-byuro`;

  const breadcrumbItems = [
    { name: 'Главная', url: `/${locale}` },
    { name: 'Специализированные решения', url: `/${locale}/services` },
    { name: 'Автоматизация документооборота для инженерных бюро', url: currentUrl }
  ];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <WebPageSchema 
        pageUrl={currentUrl}
        title="Автоматизация документооборота инженерных бюро — Россия | H-Studio"
        description="Системы документооборота и согласований для инженерных и проектных бюро. Ускорение согласований в 5–10 раз. Автоматизация маршрутов, версий и статусов."
        locale={locale}
      />
      <BreadcrumbSchema 
        items={breadcrumbItems}
        pageUrl={currentUrl}
      />
      <ServiceSchema
        serviceName="Автоматизация документооборота и согласований для инженерных и проектных бюро"
        description="Системы документооборота и согласований для инженерных и проектных бюро. Ускорение согласований в 5–10 раз. Автоматизация маршрутов, версий и статусов."
        serviceUrl={currentUrl}
        category="Document Management"
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
                  Документооборот • Инженерные бюро • Согласования
                </span>
              </div>
              
              <h1 className="text-[36px] leading-[44px] sm:text-[48px] sm:leading-[56px] lg:text-[56px] lg:leading-[64px] font-semibold tracking-[-0.02em] text-text font-display mb-6">
                Системы, которые ускоряют согласования в 5–10 раз
              </h1>
              
              <p className="text-xl text-text/80 leading-7 mb-6">
                Документы, ТУ, спецификации, ТЗ, схемы, расчёты и заявки проходят через прозрачные маршруты согласований, статусы, версии и контроль сроков. <strong className="text-text">Никаких потерянных писем и хаоса в Excel.</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
                <CTAButton variant="primary" ariaLabel="Получить консультацию">
                  Получить консультацию
                </CTAButton>
                <CTAButton variant="secondary" ariaLabel="Посмотреть пример решения">
                  Посмотреть пример решения
                </CTAButton>
              </div>

              {/* До/После Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                    <HiXCircle className="text-red-500" size={20} />
                    До внедрения:
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>потерянные документы</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>разные версии файлов</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>задержки в согласованиях</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>ошибки из-за ручных правок</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>нет прозрачности статусов</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>зависимость от сотрудников</span>
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
                      <span>единая система документов</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>автоматические маршруты согласований</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>прозрачные статусы и сроки</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>все версии хранятся корректно</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>уведомления и контроль дедлайнов</span>
                    </li>
                    <li className="text-sm text-text/80 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>интеграции с 1С / ERP / CRM</span>
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
              Для кого подходит
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Системы документооборота для инженерии и производства
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HiPuzzle, label: 'Инженерные и проектные бюро', description: 'Проектные бюро, инженерные отделы' },
              { icon: HiCog, label: 'Заводы и производственные компании', description: 'Производственные предприятия' },
              { icon: HiPuzzle, label: 'Конструкторские отделы', description: 'Конструкторские бюро, отделы' },
              { icon: HiChartBar, label: 'Департаменты качества', description: 'ОТК, отделы качества' },
              { icon: HiPuzzle, label: 'Архитектурные бюро', description: 'Архитектурные проектные бюро' },
              { icon: HiDocumentText, label: 'Компании с ТУ / ТЗ / спецификациями', description: 'Работа с техническими условиями' },
              { icon: HiTrendingUp, label: 'Производственные подразделения B2B', description: 'B2B-производство' },
              { icon: HiClock, label: 'Команды, которые работают с документами ежедневно', description: 'Ежедневная работа с документами' },
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
              Проблемы, которые решаем
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              Типичные проблемы инженерных отделов
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              'долгие согласования',
              'потерянные письма и документы',
              'нет единого хранилища',
              'разные версии одного файла',
              'ошибки в спецификациях и ТУ',
              'нет контроля дедлайнов',
              'отсутствует журнал изменений',
              'нет интеграции между отделами',
              'процессы завязаны на отдельных сотрудников',
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
        </section>

        {/* Что мы автоматизируем Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Что мы автоматизируем
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
                    Что мы автоматизируем
                  </h3>
                </div>
                
                <p className="text-base text-muted leading-6">
                  Автоматизация документооборота охватывает все этапы работы с документами: от хранения и версионирования до согласований и интеграции с системами предприятия.
                </p>

                <div className="space-y-3 pt-4">
                  {[
                    'Документы и спецификации',
                    'Маршруты согласований',
                    'Управление версиями',
                    'Интеграция с 1С / ERP / CRM',
                    'Правила доступа',
                    'Контроль ошибок и автоматические проверки',
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
                  alt="Автоматизация документооборота для инженерных бюро - системы согласований и управления документами" 
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
              'документооборот',
              'согласования',
              'спецификации',
              'ТУ / ТЗ',
              'версии документов',
              'контроль дедлайнов',
              'маршрутизация процессов',
              'интеграция отделов',
              'интеграции с ERP / 1С',
              'workflow для инженерии',
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
              Примеры решений
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Согласования в 5–10 раз быстрее',
                description: 'Автоматизация маршрутов согласований для инженерных документов',
                result: 'Статусы, сроки, уведомления. Полная прозрачность.'
              },
              {
                title: 'Единый архив документов',
                description: 'Централизованное хранение всех инженерных документов',
                result: 'Порядок, версияция, отсутствие хаоса.'
              },
              {
                title: 'Автоматизация процессов инженерного отдела',
                description: 'Workflow для инженерных процессов и проектирования',
                result: 'Меньше ошибок, единые стандарты, ускорение проектирования.'
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
                { label: 'Анализ текущих документов и процессов', desc: 'Собираем все сценарии, выявляем узкие места.' },
                { label: 'Проектирование маршрутов согласований', desc: 'Схемы процессов + роли.' },
                { label: 'Разработка системы документооборота', desc: 'Интерфейсы, статусы, уведомления, архив.' },
                { label: 'Интеграция с 1С / ERP', desc: 'Статусы и документы синхронизируются автоматически.' },
                { label: 'Обучение и внедрение в команду', desc: 'Плавно запускаем систему.' },
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
              { label: 'Анализ текущих документов и процессов', desc: 'Собираем все сценарии, выявляем узкие места.' },
              { label: 'Проектирование маршрутов согласований', desc: 'Схемы процессов + роли.' },
              { label: 'Разработка системы документооборота', desc: 'Интерфейсы, статусы, уведомления, архив.' },
              { label: 'Интеграция с 1С / ERP', desc: 'Статусы и документы синхронизируются автоматически.' },
              { label: 'Обучение и внедрение в команду', desc: 'Плавно запускаем систему.' },
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
              'согласования ускоряются в 5–10 раз',
              'всегда актуальная версия документа',
              'нулевая потеря файлов',
              'уменьшение ошибок и переделок',
              'повышение прозрачности процессов',
              'стандартизация документооборота',
              'отсутствие зависимости от сотрудников',
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
              'глубокий опыт в инженерных процессах',
              'поддержка всех типов документов (ТУ, ТЗ, спецификации)',
              'правильная логика маршрутов согласований',
              'интеграции с 1С / ERP / CRM',
              'быстрые сроки внедрения (3–10 недель)',
              'разработка под реальные процессы компаний',
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
              Хотите ускорить согласования и исключить ошибки в инженерных документах?
            </h2>
            <p className="text-base text-text/70 mb-8 max-w-2xl mx-auto">
              Проведём бесплатный разбор процессов и покажем, что можно автоматизировать.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <CTAButton variant="primary" ariaLabel="Получить разбор">
                Получить разбор
              </CTAButton>
              <CTAButton variant="secondary" ariaLabel="Посмотреть пример системы">
                Посмотреть пример системы
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
