import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Simple config for landing page
  async redirects() {
    // Редиректы со старых URL с id на новые с slug
    const serviceIdToSlug = {
      '1': 'avtomatizatsiya-raschetov-i-sebestoimosti',
      '2': 'konfiguratory-kommercheskih-predlozheniy',
      '3': 'generatsiya-spetsifikatsiy-pdf-i-tehnicheskoy-dokumentatsii',
      '4': 'kontrol-tsen-marzhinalnosti-i-oshibok-v-raschetah',
      '5': 'avtomatizatsiya-dokumentooborota-i-soglasovaniy',
      '6': 'integratsii-s-1s-erp-crm-i-vnutrennimi-sistemami',
      '7': 'ai-instrumenty-i-analitika',
      '8': 'vnedrenie-i-obuchenie-personala',
    };

    const redirects = [];
    for (const [id, slug] of Object.entries(serviceIdToSlug)) {
      redirects.push({
        source: `/ru/services/${id}`,
        destination: `/ru/services/${slug}`,
        permanent: true,
      });
      redirects.push({
        source: `/services/${id}`,
        destination: `/services/${slug}`,
        permanent: true,
      });
    }
    return redirects;
  },
};

export default withNextIntl(nextConfig);

