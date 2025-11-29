import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { 
  HiArrowRight, 
  HiCog, 
  HiSearch,
  HiLightBulb,
  HiChartBar,
  HiGlobeAlt,
  HiDocumentText,
  HiClock,
  HiPuzzle,
  HiUser,
  HiCheckCircle,
  HiTrendingUp,
  HiSparkles,
} from 'react-icons/hi';
import CookieBanner from '@/components/CookieBanner';
import ServicesSectionClient from '@/components/home/ServicesSectionClient';
import CasesSectionClient from '@/components/home/CasesSectionClient';
import ScrollToTopButton from '@/components/home/ScrollToTopButton';
import FAQSection from '@/components/home/FAQSection';
import Header from '@/components/Header';

// Server Component для LinkedIn Section
async function LinkedInSection() {
  const t = await getTranslations('collaboration');
  
  return (
    <div className="bg-card border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center text-brand">
              <HiUser size={24} />
            </div>
            <h3 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em]">
              {t('title')}
            </h3>
          </div>
          
          {(t('subtitle') || t('subtitleText')) && (
            <p className="text-lg text-text/80 leading-7">
              <strong className="text-text">{t('subtitle')}</strong> {t('subtitleText')}
            </p>
          )}
          
          <p className="text-base text-muted leading-6">
            {t('description')}
          </p>

          <div className="space-y-3 pt-4">
            {[
              t('checklist.item1'),
              t('checklist.item2'),
              t('checklist.item3'),
              t('checklist.item4')
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
            alt="Внедрение без сопротивления - автоматизация процессов в производственных компаниях" 
            width={800} 
            height={600}
            className="w-full h-auto object-contain"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}

// Server Component для Process Section
async function ProcessSection() {
  const t = await getTranslations('process');
  
  const steps = [
    { num: 1, label: t('step1.label'), desc: t('step1.desc') },
    { num: 2, label: t('step2.label'), desc: t('step2.desc') },
    { num: 3, label: t('step3.label'), desc: t('step3.desc') },
    { num: 4, label: t('step4.label'), desc: t('step4.desc') },
    { num: 5, label: t('step5.label'), desc: t('step5.desc') }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="text-center mb-16">
        <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
          Как мы работаем (Наш процесс)
        </h2>
        <p className="text-base text-text/70 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      <div className="hidden lg:block">
        <div className="grid grid-cols-5 gap-8">
          {steps.map((step, index) => (
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
        {steps.map((step, index) => (
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
  );
}

// Server Component для Results Section
async function ResultsSection() {
  const t = await getTranslations('results');
  
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      {t('title') && (
        <div className="text-center mb-16">
          <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
            {t('title')}
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
        <div className="text-center">
          <div className="text-[56px] lg:text-[80px] font-bold tracking-[-0.02em] text-brand mb-4 leading-none">
            40–70%
          </div>
          <p className="text-base lg:text-lg text-text/70 leading-relaxed">
            {t('reduction')}
          </p>
        </div>
        
        <div className="text-center">
          <div className="text-[48px] lg:text-[72px] font-bold tracking-[-0.02em] text-brand mb-4 leading-none">
            2–3 мин
          </div>
          <p className="text-base lg:text-lg text-text/70 leading-relaxed">
            {t('faster')}
          </p>
        </div>
        
        <div className="text-center">
          <div className="text-[48px] lg:text-[72px] font-bold tracking-[-0.02em] text-brand mb-4 leading-none">
            {t('amount')}
          </div>
          <p className="text-base lg:text-lg text-text/70 leading-relaxed">
            {t('savings')}
          </p>
        </div>
      </div>
    </section>
  );
}

// Main Server Component
export default async function Home() {
  const t = await getTranslations();
  const tHero = await getTranslations('hero');

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
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
            <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-center">
              <div className="col-span-12 lg:col-span-6 space-y-6">
                <div className="flex justify-center lg:justify-start">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1.5 text-xs text-text/80 font-medium">
                    {tHero('badge')}
                  </span>
                </div>
                
                <h1 className="text-[56px] leading-[64px] font-semibold tracking-[-0.02em] text-text font-display">
                  {tHero('title')}
                  <span className="sr-only"> {tHero('titleSeo')}</span>
                </h1>
                
                <p className="text-text/70 max-w-xl text-base leading-7 font-medium">
                  {tHero('description')}
                </p>
                
                {tHero('subtitle') && (
                  <p className="text-text/70 max-w-xl text-base leading-7">
                    {tHero('subtitle')}
                  </p>
                )}
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.5)] focus:outline-none focus:ring-2 focus:ring-brand/60"
                    aria-label={tHero('requestDemo')}
                  >
                    <span>{tHero('requestDemo')}</span>
                    <HiArrowRight size={20} />
                  </Link>
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-text font-semibold rounded-xl hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand/60"
                    aria-label={tHero('seeExamples')}
                  >
                    {tHero('seeExamples')}
                  </Link>
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-2 sm:gap-6 text-[10px] sm:text-xs text-text/60">
                  <div className="whitespace-nowrap">{tHero('trust1')}</div>
                  <div className="hidden sm:block h-4 w-px bg-white/20 flex-shrink-0" />
                  <div className="whitespace-nowrap">{tHero('trust2')}</div>
                  <div className="hidden sm:block h-4 w-px bg-white/20 flex-shrink-0" />
                  <div className="whitespace-nowrap">{tHero('trust3')}</div>
                  <div className="hidden sm:block h-4 w-px bg-white/20 flex-shrink-0" />
                  <div className="whitespace-nowrap">{tHero('trust4')}</div>
                </div>
              </div>

              <div className="hidden lg:block lg:col-span-6 mt-12 lg:mt-0">
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand/20 rounded-lg flex items-center justify-center text-brand">
                          <HiSparkles size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-text">{tHero('aiAgentTitle')}</div>
                          <div className="text-xs text-text/60">{tHero('aiAgentStatus')}</div>
                        </div>
                      </div>
                      <div className="text-xs text-text/60 bg-white/5 px-3 py-1 rounded-full">
                        {tHero('aiAgentInbox')}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <div className="text-xs text-text/60 mb-2">{tHero('aiAgentAnalyzing')}</div>
                        <div className="text-sm text-text">{tHero('aiAgentMessage')}</div>
                      </div>
                      <div className="bg-brand/10 rounded-2xl p-4 border border-brand/20">
                        <div className="text-xs text-text/60 mb-2">{tHero('aiAgentTracking')}</div>
                        <div className="text-sm text-text">{tHero('aiAgentStats')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Автоматизация расчётов и коммерческих предложений
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center mb-4 text-brand">
                <HiSearch size={20} />
              </div>
              <h3 className="text-[28px] leading-[36px] font-semibold text-text mb-3">Автоматические расчёты параметров</h3>
              <p className="text-sm text-muted leading-6 mb-4">
                {t('features.calculationAutomation.desc1')}
              </p>
              {t('features.calculationAutomation.desc2') && (
                <p className="text-sm text-muted leading-6 mb-4">
                  {t('features.calculationAutomation.desc2')}
                </p>
              )}
              <Link href="#contact" className="text-xs text-brand hover:text-brand/80 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand/60 rounded" aria-label={t('features.calculationAutomation.learnMore')}>
                {t('features.calculationAutomation.learnMore')}
                <HiArrowRight size={12} />
              </Link>
            </div>

            <div className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center mb-4 text-brand">
                <HiLightBulb size={20} />
              </div>
              <h3 className="text-[28px] leading-[36px] font-semibold text-text mb-3">Wizard КП</h3>
              <p className="text-sm text-muted leading-6 mb-4">
                {t('features.kpConfigurator.desc1')}
              </p>
              {t('features.kpConfigurator.desc2') && (
                <p className="text-sm text-muted leading-6 mb-4">
                  {t('features.kpConfigurator.desc2')}
                </p>
              )}
              <Link href="#contact" className="text-xs text-brand hover:text-brand/80 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand/60 rounded" aria-label={t('features.kpConfigurator.learnMore')}>
                {t('features.kpConfigurator.learnMore')}
                <HiArrowRight size={12} />
              </Link>
            </div>

            <div className="bg-card border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.3)]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center mb-4 text-brand">
                <HiDocumentText size={20} />
              </div>
              <h3 className="text-[28px] leading-[36px] font-semibold text-text mb-3">Автоматизация согласований и документооборота</h3>
              <p className="text-sm text-muted leading-6 mb-4">
                {t('features.documentAutomation.desc1')}
              </p>
              {t('features.documentAutomation.desc2') && (
                <p className="text-sm text-muted leading-6 mb-4">
                  {t('features.documentAutomation.desc2')}
                </p>
              )}
              <Link href="#contact" className="text-xs text-brand hover:text-brand/80 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand/60 rounded" aria-label={t('features.documentAutomation.learnMore')}>
                {t('features.documentAutomation.learnMore')}
                <HiArrowRight size={12} />
              </Link>
            </div>
          </div>
        </section>

        {/* Collaboration & Change Management Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Внедрение и обучение команд
            </h2>
          </div>
          <LinkedInSection />
        </section>

        {/* ICP / Who It's For Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('whoItsFor.title')}
            </h2>
            <p className="text-base text-text/70 max-w-2xl mx-auto">
              {t('whoItsFor.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: HiCog, 
                label: t('whoItsFor.manufacturing.label'),
                description: t('whoItsFor.manufacturing.description')
              },
              { 
                icon: HiPuzzle, 
                label: t('whoItsFor.metalwork.label'),
                description: t('whoItsFor.metalwork.description')
              },
              { 
                icon: HiCog, 
                label: t('whoItsFor.equipment.label'),
                description: t('whoItsFor.equipment.description')
              },
              { 
                icon: HiClock, 
                label: t('whoItsFor.cables.label'),
                description: t('whoItsFor.cables.description')
              },
              { 
                icon: HiGlobeAlt, 
                label: t('whoItsFor.windows.label'),
                description: t('whoItsFor.windows.description')
              },
              { 
                icon: HiPuzzle, 
                label: t('whoItsFor.pipes.label'),
                description: t('whoItsFor.pipes.description')
              },
              { 
                icon: HiDocumentText, 
                label: t('whoItsFor.custom.label'),
                description: t('whoItsFor.custom.description')
              }
            ].filter(item => item.label && item.description).map((item, index) => {
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

        {/* Cases Section - Client Component */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Кейсы
            </h2>
          </div>
          <CasesSectionClient />
        </section>

        {/* Services Section - Client Component */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Наши услуги
            </h2>
          </div>
          <ServicesSectionClient />
        </section>

        {/* Process Section */}
        <ProcessSection />

        {/* Results Section */}
        <ResultsSection />

        {/* AI Process Assistant CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative flex items-center justify-center">
              <Image 
                src="/3.png" 
                alt="AI помощник для расчётов себестоимости и автоматизации производственных процессов" 
                width={800} 
                height={600}
                className="max-h-[600px] max-w-full w-auto object-contain"
                priority={false}
              />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
                  AI-Process Assistant (AI помощник для производства)
                </h2>
                <p className="text-base text-text/80 leading-7 mb-2">
                  {t('processAssistant.subtitle')}
                </p>
                <p className="text-base text-text/80 leading-7">
                  {t('processAssistant.description')}
                </p>
              </div>

              <div className="space-y-4">
                {[
                  t('processAssistant.feature1'),
                  t('processAssistant.feature2'),
                  t('processAssistant.feature3'),
                  t('processAssistant.feature4'),
                  t('processAssistant.feature5')
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-brand flex-shrink-0 mt-0.5">
                      <HiCheckCircle size={20} />
                    </span>
                    <span className="text-base text-text/80">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.5)] focus:outline-none focus:ring-2 focus:ring-brand/60"
                >
                  <span>{t('processAssistant.buildButton')}</span>
                  <HiArrowRight size={20} />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-text font-semibold rounded-xl hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand/60"
                >
                  {t('processAssistant.demoButton')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* Final CTA Section */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="bg-card border border-white/10 rounded-3xl p-12 lg:p-16 text-center shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl sm:text-[40px] leading-[32px] sm:leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-base text-text/70 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link
                href="mailto:info@h-studio-tech.ru?subject=Получить разбор"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.5)] focus:outline-none focus:ring-2 focus:ring-brand/60"
              >
                <span>{t('cta.button1')}</span>
                <HiArrowRight size={20} />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-text font-semibold rounded-xl hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand/60"
              >
                {t('cta.button2')}
              </Link>
            </div>
          </div>
        </section>

        {/* Scroll to Top Button - Client Component */}
        <ScrollToTopButton />

        {/* Cookie Banner */}
        <CookieBanner />
      </main>
    </div>
  );
}

