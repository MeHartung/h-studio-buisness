import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { ServiceSchema, BreadcrumbSchema } from '@/components/StructuredData';
import { getServiceIdBySlug, getServiceSlugById } from '@/lib/services';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#7c5cfc' },
    { media: '(prefers-color-scheme: dark)', color: '#7c5cfc' },
  ],
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const serviceId = getServiceIdBySlug(slug);
  
  if (!serviceId) {
    return {
      title: 'Услуга | Автоматизация расчётов и КП | H-Studio',
      description: 'Автоматизация расчётов, КП, спецификаций, документооборота, интеграции с 1С/ERP/CRM.',
    };
  }

  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  
  const serviceKey = `service${serviceId}` as keyof typeof messages.serviceDetail;
  const service = messages.serviceDetail[serviceKey];
  
  if (!service) {
    return {
      title: 'Услуга | Автоматизация расчётов и КП | H-Studio',
      description: 'Автоматизация расчётов, КП, спецификаций, документооборота, интеграции с 1С/ERP/CRM.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `${baseUrl}/${locale}/services/${slug}`;
  const ogImage = `${baseUrl}/1.png`;
  
  // Fallback значения для метаданных
  const serviceTitle = service.title || 'Услуга';
  const serviceDescription = service.subtitle || service.intro || 'Автоматизация расчётов, КП, спецификаций, документооборота, интеграции с 1С/ERP/CRM.';
  const metaTitle = `${serviceTitle} | Автоматизация расчётов и КП | H-Studio`;
  const metaDescription = serviceDescription || 'Автоматизация расчётов, КП, спецификаций, документооборота, интеграции с 1С/ERP/CRM.';

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL(baseUrl),
    icons: {
      icon: '/favicon.svg',
      apple: '/favicon.svg',
    },
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
        ru: `${baseUrl}/ru/services/${slug}`,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: currentUrl,
      siteName: "H-Studio Business",
      locale: 'ru_RU',
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
}

export default async function ServiceDetailLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const serviceId = getServiceIdBySlug(slug);
  
  if (!serviceId) {
    return <>{children}</>;
  }

  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  
  const serviceKey = `service${serviceId}` as keyof typeof messages.serviceDetail;
  const service = messages.serviceDetail[serviceKey];
  
  if (!service) {
    return <>{children}</>;
  }

  const serviceUrl = `${baseUrl}/${locale}/services/${slug}`;
  const breadcrumbItems = [
    { name: 'Главная', url: `/${locale}` },
    { name: 'Услуги', url: `/${locale}/services` },
    { name: service.title, url: `/${locale}/services/${slug}` },
  ];

  return (
    <>
      <ServiceSchema 
        serviceName={service.title}
        description={service.subtitle || service.intro || ''}
        serviceUrl={serviceUrl}
        category="Автоматизация бизнес-процессов"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {children}
    </>
  );
}

