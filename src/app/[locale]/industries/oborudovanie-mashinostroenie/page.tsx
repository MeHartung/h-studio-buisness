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
  const currentUrl = `${baseUrl}/${locale}/industries/oborudovanie-mashinostroenie`;
  const ogImage = `${baseUrl}/1.png`;

  return {
    title: "Автоматизация расчётов и документооборота для оборудования и машиностроения | H-Studio",
    description: "Системы расчётов, КП, спецификаций, себестоимости и документооборота для машиностроительных компаний. КП за 2–5 минут. Интеграции 1С и ERP. Исключение ошибок.",
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
      title: "Автоматизация расчётов и документооборота для оборудования и машиностроения | H-Studio",
      description: "Системы расчётов, КП, спецификаций, себестоимости и документооборота для машиностроительных компаний. КП за 2–5 минут. Интеграции 1С и ERP. Исключение ошибок.",
      url: currentUrl,
      siteName: "H-Studio Business",
      locale: 'ru_RU',
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Оборудование и машиностроение",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Автоматизация расчётов и документооборота для оборудования и машиностроения | H-Studio",
      description: "Системы расчётов, КП, спецификаций, себестоимости и документооборота для машиностроительных компаний. КП за 2–5 минут. Интеграции 1С и ERP. Исключение ошибок.",
      images: [ogImage],
    },
  };
}

export default async function OborudovanieMashinostroeniePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `/${locale}/industries/oborudovanie-mashinostroenie`;

  const breadcrumbItems = [
    { name: 'Главная', url: `/${locale}` },
    { name: 'Отрасли', url: `/${locale}/industries` },
    { name: 'Оборудование и машиностроение', url: currentUrl }
  ];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <WebPageSchema 
        pageUrl={currentUrl}
        title="Автоматизация расчётов и документооборота для оборудования и машиностроения | H-Studio"
        description="Системы расчётов, КП, спецификаций, себестоимости и документооборота для машиностроительных компаний. КП за 2–5 минут. Интеграции 1С и ERP. Исключение ошибок."
        locale={locale}
      />
      <BreadcrumbSchema 
        items={breadcrumbItems}
        pageUrl={currentUrl}
      />
      <ServiceSchema
        serviceName="Автоматизация для оборудования и машиностроения"
        description="Системы расчётов, КП, спецификаций, себестоимости и документооборота для машиностроительных компаний. КП за 2–5 минут. Интеграции 1С и ERP. Исключение ошибок."
        serviceUrl={currentUrl}
        category="Equipment and Machinery Automation"
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
                  Оборудование • Машиностроение • Инженерия
                </span>
              </div>
              
              <h1 className="text-[36px] leading-[44px] sm:text-[48px] sm:leading-[56px] lg:text-[56px] lg:leading-[64px] font-semibold tracking-[-0.02em] text-text font-display mb-6">
                Автоматизация расчётов, спецификаций и документооборота для машиностроительных компаний
              </h1>
              
              <p className="text-xl text-text/80 leading-7 mb-6">
                Системы для расчёта параметров оборудования, себестоимости, комплектации, КП, спецификаций, ТЗ, PDF и согласований. <strong className="text-text">Быстро. Точно. Без ошибок.</strong>
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
                  <div className="text-2xl md:text-3xl font-bold text-brand mb-2 whitespace-nowrap">20–30 мин → 2–5 мин</div>
                  <p className="text-xs md:text-sm text-text/70">КП и расчёты</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-brand mb-2 whitespace-nowrap">−100%</div>
                  <p className="text-xs md:text-sm text-text/70">ошибки</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-brand mb-2 whitespace-nowrap">200 000–900 000 ₽</div>
                  <p className="text-xs md:text-sm text-text/70">экономия в месяц</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-brand mb-2 whitespace-nowrap">+200–350%</div>
                  <p className="text-xs md:text-sm text-text/70">рост скорости процессов</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Описание отрасли Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Описание отрасли
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto mb-6">
              Производители оборудования и машиностроительные компании сталкиваются с большим количеством параметров, сложными инженерными расчётами, спецификациями и сложным документооборотом. Мы создаём системы, которые автоматизируют:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              'инженерные расчёты и параметры оборудования',
              'себестоимость, материалы, комплектацию',
              'конфигураторы коммерческих предложений',
              'генерацию спецификаций, ведомостей, PDF',
              'расчёт сроков производства',
              'автоматический контроль ошибок',
              'многовариантные сборки',
              'интеграцию с 1С/ERP/CRM',
              'документопотоки, согласования, статусы',
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
              Такая система полностью заменяет Excel, исключает ошибки и ускоряет работу отделов продаж, производства и инженерии.
            </p>
          </div>
        </section>

        {/* Проблемы отрасли Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-card/30 rounded-3xl mx-4 lg:mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Проблемы отрасли, которые мы решаем
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              'долгие расчёты параметров и себестоимости',
              'несогласованность данных между отделами',
              'частые ошибки в комплектациях и спецификациях',
              'отсутствие единого стандарта расчётов',
              'менеджеры тратят часы на подготовку КП',
              'сложные технические документы формируются вручную',
              'потери в документации и разных версиях файлов',
              'производственные задержки из-за отсутствия контроля',
              'нет интеграций 1С → ERP → CRM',
              'невозможность масштабировать процессы',
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
              Мы создаём систему, где расчёты и документы формируются автоматически.
            </p>
          </div>
        </section>

        {/* Ключевые процессы Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Ключевые процессы, которые дают максимальный эффект
            </h2>
          </div>
          <div className="space-y-8">
            {[
              {
                num: '1)',
                title: 'Инженерные расчёты параметров оборудования',
                items: [
                  'мощности',
                  'производительности',
                  'нагрузки',
                  'материалов и комплектующих',
                  'себестоимости',
                  'сроков',
                  'вариантов конфигурации',
                ],
                result: 'Результат: расчёт занимает минуты, а ошибки исключены.'
              },
              {
                num: '2)',
                title: 'Автоматическое формирование КП и спецификаций',
                items: [
                  'КП',
                  'спецификации',
                  'ведомости материалов',
                  'технические паспорта',
                  'инструкционные файлы',
                  'PDF в фирменном стиле',
                ],
                result: 'Результат: единый формат и отсутствие разных версий.'
              },
              {
                num: '3)',
                title: 'Контроль маржинальности и ценообразования',
                items: [
                  'проверка маржи',
                  'контроль продаж ниже себестоимости',
                  'отслеживание изменения цен материалов',
                  'анализ маржинальности по моделям',
                ],
                result: 'Результат: полностью исключаем убыточные КП.'
              },
              {
                num: '4)',
                title: 'Документооборот и согласования',
                items: [
                  'маршруты согласований',
                  'статусы документов',
                  'контроль версий',
                  'напоминания',
                  'разграничения прав',
                ],
                result: 'Результат: согласования в 5–10 раз быстрее.'
              },
              {
                num: '5)',
                title: 'Интеграции с 1С, ERP, CRM',
                items: [
                  '1С: КА / ERP / УПП',
                  'производственные ERP',
                  'CRM (Bitrix24, amoCRM, HubSpot)',
                  'автоматическая передача спецификаций',
                  'загрузка параметров и КП в ERP',
                ],
                result: 'Результат: процессы связаны, данные не теряются.'
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
              Подходит компаниям:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              'машиностроение',
              'производство оборудования',
              'производство станков',
              'производственные цеха',
              'OEM-производители',
              'компании с большими прайсами',
              'компании с большим количеством спецификаций',
              'проектные и инженерные бюро',
              'компании с нестандартными конфигурациями',
              'предприятия с 1С/ERP',
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Wizard КП / Конфигураторы оборудования',
                description: 'Конфигуратор коммерческих предложений для машиностроительных компаний',
                result: 'Параметры → расчёт → цена → PDF. 20–30 мин → 2–3 мин.'
              },
              {
                title: 'Документооборот и согласования',
                description: 'Автоматизация документооборота и процессов согласования',
                result: 'Статусы, маршруты, версии, напоминания.'
              },
              {
                title: 'Инженерные расчёты и себестоимость',
                description: 'Автоматизация расчётов параметров и себестоимости оборудования',
                result: 'Интеграция с ERP. Снижение нагрузки на инженеров на 30–40%.'
              },
              {
                title: 'Enterprise-кейсы (надёжность, интеграции)',
                description: 'Сложные интеграции для крупных предприятий',
                result: 'VTB (Kafka, high-load). Sber (данные и анализ). Société Générale (сложные интеграции). EventStripe (нагрузки + Next.js).'
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
              'Глубокая экспертиза в инженерных расчётах',
              'Полная кастомизация под ваше оборудование',
              'Интеграции с 1С/ERP без «костылей»',
              'Быстрый запуск (3–10 недель)',
              'Производительность выше на 200–350%',
              'Уменьшение ручной работы и ошибок',
              'Прозрачные процессы согласований',
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
            <div className="grid grid-cols-6 gap-8">
              {[
                { label: 'Анализ формул и инженерных расчётов', desc: '' },
                { label: 'Проектирование конфигуратора и моделей данных', desc: '' },
                { label: 'Разработка и интеграции 1С/ERP', desc: '' },
                { label: 'Пилотный запуск в отделах', desc: '' },
                { label: 'Полное внедрение + обучение команды', desc: '' },
                { label: 'Поддержка и развитие системы', desc: '' },
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
                    {step.desc && <p className="text-sm text-muted leading-6">{step.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:hidden space-y-8">
            {[
              { label: 'Анализ формул и инженерных расчётов', desc: '' },
              { label: 'Проектирование конфигуратора и моделей данных', desc: '' },
              { label: 'Разработка и интеграции 1С/ERP', desc: '' },
              { label: 'Пилотный запуск в отделах', desc: '' },
              { label: 'Полное внедрение + обучение команды', desc: '' },
              { label: 'Поддержка и развитие системы', desc: '' },
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
                  {step.desc && <p className="text-sm text-muted leading-6">{step.desc}</p>}
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
              Специализированные решения для машиностроения и производителей оборудования
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
                title: "Автоматизация документооборота для инженерных бюро",
                url: "/solutions/avtomatizaciya-dokumentooborota-inzhenernye-byuro",
                description: "Системы документооборота и согласований для инженерных и проектных бюро"
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
            <p className="text-base text-text/70 mb-8 max-w-2xl mx-auto">
              Покажем, сколько времени, денег и ресурсов можно сэкономить вашей компании.
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
