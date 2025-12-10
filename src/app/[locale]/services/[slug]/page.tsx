import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { 
  HiCheckCircle,
  HiCalculator,
  HiArrowLeft,
  HiArrowRight
} from 'react-icons/hi';
import CookieBanner from '@/components/CookieBanner';
import Header from '@/components/Header';
import ScrollToTopButton from '@/components/home/ScrollToTopButton';
import { getServiceIdBySlug, serviceSlugToId, getServiceSlugById } from '@/lib/services';
import CTAButton from '@/components/CTAButton';
import RelevantCasesSection from '@/components/services/RelevantCasesSection';

export async function generateStaticParams() {
  const slugs = Object.keys(serviceSlugToId);
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const serviceId = getServiceIdBySlug(slug);
  
  if (!serviceId) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-text mb-4">Сервис не найден</h1>
          <Link href="/services" className="text-brand hover:text-brand/80">
            Вернуться к услугам
          </Link>
        </div>
      </div>
    );
  }

  let t, tServices;
  try {
    t = await getTranslations(`serviceDetail.service${serviceId}`);
    tServices = await getTranslations('services');
  } catch (error) {
    // If translation data is missing, return 404
    notFound();
  }

  // Safely get arrays with fallback to empty arrays
  let problems: string[] = [];
  let howItWorks: string[] = [];
  let results: string[] = [];
  let whyUs: string[] = [];

  try {
    const problemsData = t.raw('problems');
    problems = Array.isArray(problemsData) ? problemsData : [];
  } catch {
    problems = [];
  }

  try {
    const howItWorksData = t.raw('howItWorks');
    howItWorks = Array.isArray(howItWorksData) ? howItWorksData : [];
  } catch {
    howItWorks = [];
  }

  try {
    const resultsData = t.raw('results');
    results = Array.isArray(resultsData) ? resultsData : [];
  } catch {
    results = [];
  }

  try {
    const whyUsData = t.raw('whyUs');
    whyUs = Array.isArray(whyUsData) ? whyUsData : [];
  } catch {
    whyUs = [];
  }

  // Безопасная функция для получения описания, если оно есть
  const getDescription = (solutionKey: string): string => {
    try {
      const solutionData = t.raw(solutionKey) as any;
      if (solutionData && typeof solutionData === 'object' && 'description' in solutionData) {
        return typeof solutionData.description === 'string' ? solutionData.description : '';
      }
      return '';
    } catch {
      // Если ключ не существует, возвращаем пустую строку
      return '';
    }
  };

  // Динамически собираем решения (может быть от 1 до 6)
  const solutions: Array<{ title: string; description: string; items: string[] }> = [];
  for (let i = 1; i <= 6; i++) {
    const solutionKey = `solution${i}`;
    try {
      // Сначала проверяем существование ключа через raw
      const solutionData = t.raw(solutionKey);
      if (!solutionData || typeof solutionData !== 'object') {
        // Если решения нет, прекращаем цикл
        break;
      }
      
      const title = solutionData.title;
      const itemsData = solutionData.items;
      const items = Array.isArray(itemsData) ? itemsData : [];
      
      if (title && items.length > 0) {
        solutions.push({
          title,
          description: getDescription(solutionKey),
          items
        });
      } else {
        // Если нет title или items, прекращаем цикл
        break;
      }
    } catch {
      // Если решения нет, прекращаем цикл
      break;
    }
  }

  // SEO тексты
  const introSeoParagraph = tServices('detailPage.introSeoParagraph');
  const footerSeoParagraph = tServices('detailPage.footerSeoParagraph');
  const backToServices = tServices('detailPage.backToServices');

  // Получаем связанные услуги
  const relatedServicesMapping: Record<string, string[]> = {
    '1': ['2', '4'], // расчёты → CPQ, контроль цен
    '2': ['1', '4'], // CPQ → расчёты, контроль цен
    '4': ['1', '2'], // контроль цен → расчёты, CPQ
    '3': ['5'], // спецификации → документооборот
    '5': ['3'], // документооборот → спецификации
    '6': ['7'], // интеграции → AI
    '7': ['6'], // AI → интеграции
    '8': ['1', '2'], // внедрение → расчёты, CPQ
  };
  
  const relatedServiceIds = relatedServicesMapping[serviceId] || [];
  
  // Загружаем данные связанных услуг
  let relatedServices: Array<{ id: string; title: string; description: string; slug: string }> = [];
  if (relatedServiceIds.length > 0) {
    const messages = (await import(`../../../../messages/${locale}.json`)).default;
    relatedServices = relatedServiceIds
      .map(id => {
        const serviceKey = `service${id}` as keyof typeof messages.serviceDetail;
        const service = messages.serviceDetail[serviceKey];
        if (!service) return null;
        const serviceSlug = getServiceSlugById(id);
        if (!serviceSlug) return null;
        return {
          id,
          title: service.title,
          description: service.subtitle || service.intro || '',
          slug: serviceSlug
        };
      })
      .filter(Boolean) as Array<{ id: string; title: string; description: string; slug: string }>;
  }

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
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
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-text/70 hover:text-text transition-colors mb-6"
              >
                <HiArrowLeft size={20} />
                <span>{backToServices}</span>
              </Link>
              <h1 className="text-[56px] leading-[64px] font-semibold tracking-[-0.02em] text-text font-display mb-6">
                {t('title')}
              </h1>
              {/* Вводный SEO-абзац (общий для всех услуг) */}
              <p className="text-lg text-text/80 leading-relaxed mb-6 max-w-3xl">
                {introSeoParagraph}
              </p>
              <p className="text-xl text-text/80 leading-7 mb-6">
                {t('subtitle')}
              </p>
              <p className="text-base text-text/70 leading-7 mb-4">
                {t('intro')}
              </p>
              <p className="text-base text-text/70 leading-7">
                {t('intro2')}
              </p>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="bg-card border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-8">
              {t('problemsTitle')}
            </h2>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-500 flex-shrink-0 mt-0.5">
                    <HiCheckCircle size={20} />
                  </span>
                  <span className="text-base text-text/80 leading-relaxed">{problem}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base text-text/70 font-medium">
              {tServices('detailPage.problemsNote')}
            </p>
          </div>
        </section>

        {/* Solution Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('solutionTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center mb-4 text-brand">
                  <HiCalculator size={24} />
                </div>
                <h3 className="text-[20px] leading-[28px] font-semibold text-text mb-2">
                  {solution.title}
                </h3>
                {solution.description && (
                  <p className="text-xs text-text/60 mb-4 italic">
                    {solution.description}
                  </p>
                )}
                <ul className="space-y-2">
                  {solution.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="bg-card border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-8">
              {t('howItWorksTitle')}
            </h2>
            <ol className="space-y-4 mb-6">
              {howItWorks.map((step, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-brand/20 rounded-full flex items-center justify-center text-brand font-semibold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-base text-text/80 leading-relaxed pt-1">{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-base text-text/70 font-medium">
              {t('howItWorksNote')}
            </p>
          </div>
        </section>

        {/* Results Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('resultsTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <div
                key={index}
                className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.2)]"
              >
                <div className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0 mt-0.5">
                    <HiCheckCircle size={20} />
                  </span>
                  <span className="text-base text-text/80 leading-relaxed">{result}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Examples Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('examplesTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]">
              <h3 className="text-[20px] leading-[28px] font-semibold text-text mb-3">
                {t('example1.title')}
              </h3>
              <p className="text-sm text-muted leading-6 mb-4">
                {t('example1.description')}
              </p>
              <p className="text-sm text-brand font-medium">
                {t('example1.result')}
              </p>
            </div>
            <div className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]">
              <h3 className="text-[20px] leading-[28px] font-semibold text-text mb-3">
                {t('example2.title')}
              </h3>
              <p className="text-sm text-muted leading-6 mb-4">
                {t('example2.description')}
              </p>
              <p className="text-sm text-brand font-medium">
                {t('example2.result')}
              </p>
            </div>
            <div className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]">
              <h3 className="text-[20px] leading-[28px] font-semibold text-text mb-3">
                {t('example3.title')}
              </h3>
              <p className="text-sm text-muted leading-6 mb-4">
                {t('example3.description')}
              </p>
              {t('example3.result') && (
                <p className="text-sm text-brand font-medium">
                  {t('example3.result')}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('whyUsTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, index) => (
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

        {/* Related Services Section */}
        {relatedServices.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="mb-16">
              <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
                Связанные услуги
              </h2>
              <p className="text-base text-text/70 max-w-2xl">
                Другие услуги из этой группы, которые могут быть полезны для вашей компании
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((service) => (
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
          </section>
        )}

        {/* Relevant Cases Section */}
        {(() => {
          // Определяем релевантные кейсы для каждой услуги
          const caseMapping: Record<string, string[]> = {
            '1': ['eventstripe', 'sber'], // расчёты
            '2': ['eventstripe'], // CPQ
            '3': ['eventstripe', 'sber'], // спецификации
            '4': ['eventstripe'], // контроль цен
            '5': ['sber', 'societe-generale'], // документооборот
            '6': ['vtb-bank', 'sber', 'societe-generale'], // интеграции
            '7': ['vtb-bank', 'societe-generale'], // AI
            '8': ['vtb-bank', 'sber', 'societe-generale', 'eventstripe'], // внедрение
          };
          
          const relevantCases = caseMapping[serviceId] || [];
          return relevantCases.length > 0 ? (
            <RelevantCasesSection relevantCaseSlugs={relevantCases} />
          ) : null;
        })()}

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="bg-card border border-white/10 rounded-3xl p-12 lg:p-16 text-center shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="text-base text-text/70 mb-8 max-w-2xl mx-auto">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <CTAButton variant="primary" ariaLabel={t('ctaButton1')}>
                {t('ctaButton1')}
              </CTAButton>
              <CTAButton variant="secondary" ariaLabel={t('ctaButton2')}>
                {t('ctaButton2')}
              </CTAButton>
            </div>
          </div>
        </section>

        {/* SEO Paragraph Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
          <div className="max-w-4xl mx-auto">
            <p className="text-base text-text/70 leading-relaxed">
              <Link 
                href="/"
                className="text-brand hover:text-brand/80 underline"
              >
                {tServices('detailPage.companyName')}
              </Link>
              {' '}
              {tServices('detailPage.footerSeoParagraph')}{' '}
              <Link 
                href="/services"
                className="text-brand hover:text-brand/80 underline"
              >
                {tServices('detailPage.allServicesLink')}
              </Link>
              {' '}доступны для производственных и инженерных компаний.
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
