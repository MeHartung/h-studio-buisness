import { Metadata } from 'next';
import { ReactNode } from 'react';
import { ServiceSchema } from '@/components/StructuredData';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const metadata = messages.services.metadata;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `${baseUrl}/${locale}/services`;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: currentUrl,
      languages: {
        ru: `${baseUrl}/ru/services`,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: currentUrl,
      siteName: "H-Studio Business",
      locale: 'ru_RU',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
  };
}

export default async function ServicesLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const metadata = messages.services.metadata;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const serviceUrl = `${baseUrl}/${locale}/services`;

  return (
    <>
      <ServiceSchema 
        serviceName={metadata.title}
        description={metadata.description}
        serviceUrl={serviceUrl}
      />
      {children}
    </>
  );
}

