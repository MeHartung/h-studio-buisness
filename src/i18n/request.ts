import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import { cookies, headers } from 'next/headers'

export default getRequestConfig(async () => {
  const availableLocales = ['en', 'de', 'ru'];
  const headerStore = await headers();
  const pathname = headerStore.get('next-url') || '/';
  const segments = pathname.split('/').filter(Boolean);

  let localeFromUrl = segments.length > 0 ? segments[0] : null;
  if (!routing.locales.includes(localeFromUrl as any)) {
    localeFromUrl = null;
  }

  const cookieStore = await cookies();
  // Essential cookie для языка (TDDDG §25(2)) - технически необходимый
  const cookieLocale = cookieStore.get('lang')?.value;

  const cookieHeader = headerStore.get('cookie') || '';
  const parsedCookies = Object.fromEntries(
    cookieHeader.split('; ').map((c) => c.split('='))
  );
  const cookieLocaleAlt = parsedCookies['lang'];

  const acceptLanguage = headerStore
    .get('accept-language')
    ?.split(',')[0]
    ?.split('-')[0];

  // Приоритет: cookie > URL > Accept-Language > default
  let locale = cookieLocaleAlt || cookieLocale || localeFromUrl || acceptLanguage || routing.defaultLocale;

  if (!availableLocales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  // Загружаем переводы
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
})

