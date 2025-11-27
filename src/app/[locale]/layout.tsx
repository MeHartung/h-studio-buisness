import '../globals.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Metadata } from 'next';
import { OrganizationSchema, WebsiteSchema } from '@/components/StructuredData';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Мета-теги для главной страницы (по умолчанию)
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const metadata = messages.metadata;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://h-studio-tech.ru";
  const currentUrl = `${baseUrl}/${locale}`;

  return {
    title: metadata.title,
    description: metadata.description,
    other: {
      'yandex-verification': '2067b27d0443e897',
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        ru: `${baseUrl}/ru`,
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Set the locale for the request
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <OrganizationSchema locale={locale} />
        <WebsiteSchema locale={locale} />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

