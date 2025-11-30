import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import ClientsSection from '@/components/clients/ClientsSection';
import CasesSectionClient from '@/components/home/CasesSectionClient';
import { BreadcrumbSchema } from '@/components/StructuredData';
import CookieBanner from '@/components/CookieBanner';
import ScrollToTopButton from '@/components/home/ScrollToTopButton';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = messages.clients;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.h-studio-tech.ru';
  const currentUrl = `${baseUrl}/${locale}/clients`;

  return {
    title: `${t?.title || 'Наши клиенты'} | H-Studio`,
    description: t?.description || 'Enterprise-кейсы и проекты, которые демонстрируют нашу экспертизу в автоматизации производственных и инженерных процессов.',
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
      title: `${t?.title || 'Наши клиенты'} | H-Studio`,
      description: t?.description || 'Enterprise-кейсы и проекты, которые демонстрируют нашу экспертизу в автоматизации производственных и инженерных процессов.',
      url: currentUrl,
      siteName: "H-Studio Business",
      locale: 'ru_RU',
      type: "website",
    },
  };
}

export default async function ClientsPage({
  params
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.h-studio-tech.ru';
  const breadcrumbItems = [
    { name: locale === 'ru' ? 'Главная' : 'Home', url: `${baseUrl}/${locale}` },
    { name: locale === 'ru' ? 'Клиенты' : 'Clients', url: `${baseUrl}/${locale}/clients` },
  ];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <main className="relative z-10">
        {/* Cases Section - Client Component */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-12">
            <h1 className="text-[40px] leading-[48px] font-semibold text-text tracking-[-0.02em] mb-4">
              Кейсы
            </h1>
          </div>
          <CasesSectionClient />
        </section>

        {/* Clients Section - Enterprise Cases */}
        <ClientsSection showViewAllButton={false} />

        <ScrollToTopButton />
        <CookieBanner />
      </main>
    </div>
  );
}

