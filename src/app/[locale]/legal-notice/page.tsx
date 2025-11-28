import { Metadata, Viewport } from "next";
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';

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

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const metadata = messages.legalNotice.meta;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const currentUrl = `${baseUrl}/${locale}/legal-notice`;
  const ogImage = `${baseUrl}/1.png`;

  return {
    title: metadata.title,
    description: metadata.description,
    metadataBase: new URL(baseUrl),
    icons: {
      icon: '/favicon.svg',
      apple: '/favicon.svg',
    },
    robots: metadata.robots || {
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
        ru: `${baseUrl}/ru/legal-notice`,
        en: `${baseUrl}/en/legal-notice`,
        de: `${baseUrl}/de/legal-notice`,
      }
    },
    openGraph: {
      title: metadata.ogTitle || metadata.title,
      description: metadata.ogDescription || metadata.description,
      url: currentUrl,
      siteName: "H-Studio Business",
      locale: locale === 'ru' ? 'ru_RU' : locale === 'de' ? 'de_DE' : 'en_US',
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
      title: metadata.twitterTitle || metadata.title,
      description: metadata.twitterDescription || metadata.description,
      images: [ogImage],
    },
  };
}

export default async function LegalNotice({
  params
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'legalNotice' });
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-semibold text-text tracking-[-0.02em] mb-4">
            {t('title')}
          </h1>
          <div className="w-20 h-1 bg-brand rounded-full"></div>
        </div>

        <div className="space-y-8">
          {/* Company Info */}
          <div className="bg-card border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-text mb-6">
              {t('companyInfo.title')}
            </h2>
            
            <div className="space-y-4 text-sm text-text/80">
              <div>
                <strong className="text-text font-semibold">{t('companyInfo.companyName')}:</strong><br />
                <span className="text-text/70">{t('companyInfo.companyNameValue')}</span>
              </div>
              
              <div>
                <strong className="text-text font-semibold">{t('companyInfo.address')}:</strong><br />
                <span className="text-text/70 whitespace-pre-line">{t('companyInfo.addressValue')}</span>
              </div>
              
              <div>
                <strong className="text-text font-semibold">{t('companyInfo.phone')}:</strong><br />
                <a href="tel:+79826666680" className="text-brand hover:opacity-80 transition-colors">
                  {t('companyInfo.phoneValue')}
                </a>
              </div>
              
              <div>
                <strong className="text-text font-semibold">{t('companyInfo.email')}:</strong><br />
                <a href={`mailto:${t('companyInfo.emailValue')}`} className="text-brand hover:opacity-80 transition-colors">
                  {t('companyInfo.emailValue')}
                </a>
              </div>
              
              <div>
                <strong className="text-text font-semibold">{t('companyInfo.representedBy')}:</strong><br />
                <span className="text-text/70">{t('companyInfo.representedByValue')}</span>
              </div>
              
              <div>
                <strong className="text-text font-semibold">{t('companyInfo.businessRegistration')}:</strong><br />
                <span className="text-text/70">{t('companyInfo.businessRegistrationValue')}</span>
              </div>
              
              <div>
                <strong className="text-text font-semibold">{t('companyInfo.taxOffice')}:</strong><br />
                <span className="text-text/70">{t('companyInfo.taxOfficeValue')}</span>
              </div>
              
              {t('companyInfo.ustId') && (
                <div>
                  <strong className="text-text font-semibold">{t('companyInfo.ustId')}:</strong><br />
                  <span className="text-text/70">{t('companyInfo.ustIdValue')}</span>
                </div>
              )}
              
              <div>
                <strong className="text-text font-semibold">{t('companyInfo.businessActivity')}:</strong><br />
                <span className="text-text/70">{t('companyInfo.businessActivityValue')}</span>
              </div>
            </div>
          </div>

          {/* Additional Legal Information */}
          <div className="space-y-8">
            {t('vsbg.title') && (
              <div>
                <h2 className="text-2xl font-semibold text-text mb-4">
                  {t('vsbg.title')}
                </h2>
                <p className="text-text/70 leading-relaxed whitespace-pre-line">
                  {t('vsbg.content')}
                </p>
              </div>
            )}

            {t('disclaimer.title') && (
              <div>
                <h2 className="text-2xl font-semibold text-text mb-4">
                  {t('disclaimer.title')}
                </h2>
                <p className="text-text/70 leading-relaxed">
                  {t('disclaimer.content')}
                </p>
              </div>
            )}

            {t('limitationOfLiability.title') && (
              <div>
                <h2 className="text-2xl font-semibold text-text mb-4">
                  {t('limitationOfLiability.title')}
                </h2>
                <p className="text-text/70 leading-relaxed">
                  {t('limitationOfLiability.content')}
                </p>
              </div>
            )}

            {t('governingLaw.title') && (
              <div>
                <h2 className="text-2xl font-semibold text-text mb-4">
                  {t('governingLaw.title')}
                </h2>
                <p className="text-text/70 leading-relaxed">
                  {t('governingLaw.content')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

