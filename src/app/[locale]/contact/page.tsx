import PageHeader from "@/components/Common/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { BreadcrumbSchema, WebPageSchema } from '@/components/StructuredData';
import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const { locale } = await params;
  
  // Загружаем переводы напрямую для корректной работы метаданных
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const metadata = messages.contact.meta;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.h-studio-tech.ru';
  const currentUrl = `${baseUrl}/${locale}/contact`;

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
        ru: `${baseUrl}/ru/contact`,
        en: `${baseUrl}/en/contact`,
        de: `${baseUrl}/de/contact`,
      },
    },
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      url: currentUrl,
      siteName: "H-Studio – Автоматизация расчётов и КП",
      images: [
        {
          url: `${baseUrl}/1.webp`,
          width: 1200,
          height: 630,
          alt: metadata.ogAlt,
        },
      ],
      locale: locale === 'ru' ? 'ru_RU' : locale === 'de' ? 'de_DE' : 'en_US',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.twitterTitle,
      description: metadata.twitterDescription,
      images: [`${baseUrl}/1.webp`],
    },
  };
}

export default async function ContactPage({
  params
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'contact' });
  const tNav = await getTranslations({ locale, namespace: 'navigation' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.h-studio-tech.ru';
  const currentUrl = `${baseUrl}/${locale}/contact`;

  // Breadcrumb Schema
  const breadcrumbItems = [
    { name: locale === 'ru' ? 'Главная' : locale === 'de' ? 'Startseite' : 'Home', url: `/${locale}` },
    { name: locale === 'ru' ? 'Контакты' : locale === 'de' ? 'Kontakt' : 'Contact', url: `/${locale}/contact` }
  ];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      {/* Structured Data */}
      <WebPageSchema 
        pageUrl={currentUrl}
        title={t('pageTitle')}
        description={t('meta.description')}
        locale={locale}
      />
      <BreadcrumbSchema items={breadcrumbItems} pageUrl={currentUrl} />
      
      <main className="relative z-10">
        <PageHeader 
          title={t('pageTitle')}
          highlightedWord={t('highlightedWord')}
          subtitle={t('subtitle')}
          highlightedSubtitle={t('highlightedSubtitle')}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
          <Breadcrumbs
            items={[
              { label: tNav('home') || (locale === 'ru' ? 'Главная' : locale === 'de' ? 'Startseite' : 'Home'), href: '/' },
              { label: tNav('contact'), href: '' }
            ]}
            className="mb-6"
          />
        </div>
        <ContactForm />
      </main>
    </div>
  );
}

