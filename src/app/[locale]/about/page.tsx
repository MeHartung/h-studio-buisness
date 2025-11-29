import Team from "@/components/About/Team";
import Values from "@/components/About/Values";
import PageHeader from "@/components/Common/PageHeader";
import WhatWeDo from "@/components/About/WhatWeDo";
import OurApproach from "@/components/About/OurApproach";
import WhatMakesUsDifferent from "@/components/About/WhatMakesUsDifferent";
import ServicesSectionClient from '@/components/home/ServicesSectionClient';
import { AboutPageSchema } from '@/components/About/AboutPageSchema';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import CookieBanner from '@/components/CookieBanner';
import ScrollToTopButton from '@/components/home/ScrollToTopButton';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const { locale } = await params;
  
  // Загружаем переводы напрямую для корректной работы метаданных
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const metadata = messages.about.meta;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.h-studio-tech.ru';
  const currentUrl = `${baseUrl}/${locale}/about`;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
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
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      url: currentUrl,
      siteName: "H-Studio Business",
      images: [
        {
          url: `${baseUrl}/1.png`,
          width: 1200,
          height: 630,
          alt: metadata.ogAlt,
        },
      ],
      locale: 'ru_RU',
      type: "website",
      countryName: 'Russia',
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.twitterTitle,
      description: metadata.twitterDescription,
      images: [`${baseUrl}/1.png`],
    },
    other: {
      'author': 'H-Studio Business',
      'article:author': 'H-Studio Business',
      'geo.region': 'RU-MOW',
      'geo.placename': 'Москва',
      'geo.position': '55.7558;37.6173',
      'ICBM': '55.7558, 37.6173',
    },
  };
}

export default async function AboutPage({
  params
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'about' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.h-studio-tech.ru';
  const currentUrl = `${baseUrl}/${locale}/about`;

  // Получаем данные команды для схемы
  const teamMembers = [
    {
      name: t('team.members.anna.name'),
      position: t('team.members.anna.position'),
      description: t('team.members.anna.description'),
    },
    {
      name: t('team.members.alex.name'),
      position: t('team.members.alex.position'),
      description: t('team.members.alex.description'),
    },
    {
      name: t('team.members.alexander.name'),
      position: t('team.members.alexander.position'),
      description: t('team.members.alexander.description'),
    },
    {
      name: t('team.members.george.name'),
      position: t('team.members.george.position'),
      description: t('team.members.george.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      {/* Structured Data */}
      <AboutPageSchema
        baseUrl={baseUrl}
        currentUrl={currentUrl}
        title={t('pageTitle')}
        description={t('seoDescription')}
        teamMembers={teamMembers}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Главная', url: `${baseUrl}/${locale}` },
          { name: 'О нас', url: currentUrl },
        ]}
      />
      
      <main className="relative z-10">
        <PageHeader 
          title={t('pageTitle')}
          highlightedWord={t('highlightedWord')}
          subtitle={t('subtitle')}
          highlightedSubtitle={t('highlightedSubtitle')}
          seoDescription={t('seoDescription')}
        />
        <WhatWeDo />
        <Team />
        <OurApproach />
        <Values />
        <WhatMakesUsDifferent />
        
        {/* Services Section - Client Component */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h2 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              {t('services.mainTitle')}
            </h2>
          </div>
          <ServicesSectionClient />
        </section>

        {/* Scroll to Top Button - Client Component */}
        <ScrollToTopButton />

        {/* Cookie Banner */}
        <CookieBanner />
      </main>
    </div>
  );
}
