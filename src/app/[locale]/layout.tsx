import '../globals.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Metadata, Viewport } from 'next';
import { OrganizationSchema, WebsiteSchema } from '@/components/StructuredData';
import Footer from '@/components/Footer';
import { ContactFormProvider } from '@/contexts/ContactFormContext';

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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `${baseUrl}/${locale}`;

  const ogImage = `${baseUrl}/1.png`;

  return {
    title: metadata.title,
    description: metadata.description,
    metadataBase: new URL(baseUrl),
    icons: {
      icon: '/favicon.svg',
      apple: '/favicon.svg',
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'H-Studio Business',
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
    other: {
      'yandex-verification': 'ca2486b49c4d91ef',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [ogImage],
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
          <ContactFormProvider>
            {children}
            <Footer />
          </ContactFormProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

