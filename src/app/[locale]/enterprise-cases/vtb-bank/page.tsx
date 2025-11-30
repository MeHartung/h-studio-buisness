import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Image from "next/image";
import { BreadcrumbSchema } from '@/components/StructuredData';
import BlogHeader from '@/components/Common/BlogHeader';
import CookieBanner from '@/components/CookieBanner';
import ScrollToTopButton from '@/components/home/ScrollToTopButton';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const metadata = messages.enterpriseCases?.vtbBank?.meta || {
    title: `VTB Bank - Enterprise Case Study | H-Studio`,
    description: "Платформа потоковой передачи данных в реальном времени"
  };
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.h-studio-tech.ru';
  const currentUrl = `${baseUrl}/${locale}/enterprise-cases/vtb-bank`;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: currentUrl,
      languages: {
        ru: `${baseUrl}/ru/enterprise-cases/vtb-bank`,
        en: `${baseUrl}/en/enterprise-cases/vtb-bank`,
        de: `${baseUrl}/de/enterprise-cases/vtb-bank`,
      },
    },
    openGraph: {
      title: "VTB Bank - Enterprise Case Study",
      description: "Платформа потоковой передачи данных в реальном времени",
      url: currentUrl,
      siteName: "H-Studio",
      images: [
        {
          url: `${baseUrl}/images/blog/VTB/cover/cover.webp`,
          width: 1200,
          height: 630,
          alt: "VTB Bank Case Study",
        },
      ],
      locale: locale === 'ru' ? 'ru_RU' : locale === 'de' ? 'de_DE' : 'en_US',
      type: "article",
    },
  };
}

export default async function VTBBankCase({
  params
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('enterpriseCases.vtbBank');
  const tc = await getTranslations('enterpriseCases.vtbBank.content');
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.h-studio-tech.ru';
  const breadcrumbItems = [
    { name: locale === 'ru' ? 'Главная' : locale === 'de' ? 'Startseite' : 'Home', url: `${baseUrl}/${locale}` },
    { name: locale === 'ru' ? 'Клиенты' : locale === 'de' ? 'Kunden' : 'Clients', url: `${baseUrl}/${locale}/clients` },
    { name: t('title'), url: `${baseUrl}/${locale}/enterprise-cases/vtb-bank` },
  ];

  const resultsList = Array.isArray(tc.raw?.('resultsList')) ? (tc.raw('resultsList') as string[]) : [];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <BreadcrumbSchema items={breadcrumbItems} />
      <BlogHeader 
        title={t('title')}
        subtitle={t('subtitle')}
      />
      
      <main className="relative z-10">
        <section className="pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex justify-center">
              <div className="w-full max-w-5xl">
                <div className="prose prose-invert max-w-none">
                  <div className="relative">
                    <Image
                      src="/images/blog/VTB/cover/cover.webp"
                      alt={t('coverImageAlt')}
                      width={300}
                      height={225}
                      className="mx-auto mb-6 lg:float-right lg:ml-6 lg:mb-4 lg:mx-0 rounded-lg border border-white/10"
                    />
                    <p className="text-lg mb-6 text-left text-text/80 leading-relaxed">
                      {tc('intro')}
                    </p>
                  </div>

                  <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mt-10 mb-6 text-left">
                    {tc('challengeTitle')}
                  </h2>
                  <p className="mb-6 text-left text-text/70 leading-relaxed">
                    {tc('challengeText')}
                  </p>

                  <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mt-10 mb-6 text-left">
                    {tc('approachTitle')}
                  </h2>
                  <p className="mb-6 text-left text-text/70 leading-relaxed">
                    {tc('approachText')}
                  </p>

                  <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mt-10 mb-6 text-left">
                    {tc('resultsTitle')}
                  </h2>
                  <ul className="list-disc list-inside mb-8 space-y-2 text-text/70">
                    {resultsList.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mt-12 mb-6 text-left">
                    {tc('techStackTitle')}
                  </h2>
                  <div className="mb-8 space-y-3">
                    {tc.has('techStack.backend') && (
                      <p className="text-base text-text/70"><strong className="text-text">Backend:</strong> {tc('techStack.backend')}</p>
                    )}
                    {tc.has('techStack.streaming') && (
                      <p className="text-base text-text/70"><strong className="text-text">Streaming:</strong> {tc('techStack.streaming')}</p>
                    )}
                    {tc.has('techStack.database') && (
                      <p className="text-base text-text/70"><strong className="text-text">Database:</strong> {tc('techStack.database')}</p>
                    )}
                    {tc.has('techStack.infrastructure') && (
                      <p className="text-base text-text/70"><strong className="text-text">Infrastructure:</strong> {tc('techStack.infrastructure')}</p>
                    )}
                    {tc.has('techStack.duration') && (
                      <p className="text-base text-text/70"><strong className="text-text">Duration:</strong> {tc('techStack.duration')}</p>
                    )}
                    {tc.has('techStack.team') && (
                      <p className="text-base text-text/70"><strong className="text-text">Team:</strong> {tc('techStack.team')}</p>
                    )}
                  </div>

                  {tc.has('whyItMattersTitle') && (
                    <>
                      <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mt-12 mb-6 text-left">
                        {tc('whyItMattersTitle')}
                      </h2>
                      <p className="mb-6 text-left text-text/70 leading-relaxed">
                        {tc('whyItMattersText')}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ScrollToTopButton />
        <CookieBanner />
      </main>
    </div>
  );
}

