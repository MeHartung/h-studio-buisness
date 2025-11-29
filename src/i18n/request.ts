import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import { cookies, headers } from 'next/headers'

export default getRequestConfig(async () => {
  // Только русская локаль
  const availableLocales = ['ru'];
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

  // Приоритет: cookie > URL > default (только ru)
  let locale = cookieLocaleAlt || cookieLocale || localeFromUrl || routing.defaultLocale;

  // Всегда используем русскую локаль
  if (!availableLocales.includes(locale) || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Загружаем переводы (только ru)
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
})

