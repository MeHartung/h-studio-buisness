import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { ServiceSchema, BreadcrumbSchema } from '@/components/StructuredData';

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
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  
  const serviceKey = `service${id}` as keyof typeof messages.serviceDetail;
  const service = messages.serviceDetail[serviceKey];
  
  if (!service) {
    return {
      title: 'Услуга',
      description: 'Описание услуги',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `${baseUrl}/${locale}/services/${id}`;
  const ogImage = `${baseUrl}/1.png`;
  const serviceDescription = service.subtitle || service.intro || 'Автоматизация процессов для производственных компаний';

  return {
    title: `${service.title} | H-Studio Business`,
    description: serviceDescription,
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
        ru: `${baseUrl}/ru/services/${id}`,
      },
    },
    openGraph: {
      title: `${service.title} | H-Studio Business`,
      description: serviceDescription,
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
      title: `${service.title} | H-Studio Business`,
      description: serviceDescription,
      images: [ogImage],
    },
  };
}

export default async function ServiceDetailLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  
  const serviceKey = `service${id}` as keyof typeof messages.serviceDetail;
  const service = messages.serviceDetail[serviceKey];
  
  if (!service) {
    return <>{children}</>;
  }

  const serviceUrl = `${baseUrl}/${locale}/services/${id}`;
  const breadcrumbItems = [
    { name: 'Главная', url: `/${locale}` },
    { name: 'Услуги', url: `/${locale}/services` },
    { name: service.title, url: `/${locale}/services/${id}` },
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

