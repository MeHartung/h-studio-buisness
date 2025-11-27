import { Metadata } from 'next';
import { ReactNode } from 'react';
import { ServiceSchema, BreadcrumbSchema } from '@/components/StructuredData';

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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://h-studio-tech.ru";
  const currentUrl = `${baseUrl}/${locale}/services/${id}`;

  return {
    title: `${service.title} | H-Studio Business`,
    description: service.subtitle || service.intro || 'Автоматизация процессов для производственных компаний',
    alternates: {
      canonical: currentUrl,
      languages: {
        ru: `${baseUrl}/ru/services/${id}`,
      },
    },
    openGraph: {
      title: `${service.title} | H-Studio Business`,
      description: service.subtitle || service.intro || 'Автоматизация процессов для производственных компаний',
      url: currentUrl,
      siteName: "H-Studio Business",
      locale: 'ru_RU',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | H-Studio Business`,
      description: service.subtitle || service.intro || 'Автоматизация процессов для производственных компаний',
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://h-studio-tech.ru";
  
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
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {children}
    </>
  );
}

