import { NextRequest, NextResponse } from 'next/server';

// Essential cookie для языка согласно TDDDG §25(2) - технически необходимый
const LOCALE_COOKIE = 'lang';
const DEFAULT_LOCALE = 'ru';
const VALID_LOCALES = ['ru'];
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 дней

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isGooglebot = request.headers.get('user-agent')?.toLowerCase().includes('googlebot');

  // ✅ Исключения для служебных и статических файлов
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/_static/') ||
    pathname.startsWith('/api/') ||
    pathname.match(/\.(png|jpe?g|svg|ico|webp|css|js|json|woff2?)$/)
  ) {
    return NextResponse.next();
  }

  const excludedPaths = [
    '/robots.txt',
    '/sitemap.xml',
    '/sitemap-0.xml',
    '/favicon.ico'
  ];
  if (excludedPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const hasLocalePrefix = VALID_LOCALES.some(locale => pathname.startsWith(`/${locale}`));
  const userLocaleCookie = request.cookies.get(LOCALE_COOKIE)?.value;

  // ✅ Если в URL уже указана локаль - сохраняем как essential cookie
  if (hasLocalePrefix) {
    const currentLocale = VALID_LOCALES.find(locale => pathname.startsWith(`/${locale}`));
    if (currentLocale) {
      const res = NextResponse.next();
      // Essential cookie для языка (TDDDG §25(2)) - технически необходимый
      res.cookies.set(LOCALE_COOKIE, currentLocale, {
        path: '/',
        maxAge: COOKIE_MAX_AGE,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
      return res;
    }
    return NextResponse.next();
  }

  // ✅ Автоопределение локали по заголовку
  if (!isGooglebot) {
    const acceptLanguage = request.headers.get('accept-language');
    let detectedLocale = DEFAULT_LOCALE;

    if (acceptLanguage) {
      const preferredLanguages = acceptLanguage
        .split(',')
        .map(lang => lang.trim().split(';')[0]);
      
      // Сначала проверяем полные коды (ru-RU, de-DE, en-US)
      const fullMatch = preferredLanguages.find(lang => {
        const base = lang.split('-')[0].toLowerCase();
        return VALID_LOCALES.includes(base);
      });
      
      if (fullMatch) {
        detectedLocale = fullMatch.split('-')[0].toLowerCase();
      } else {
        // Fallback: проверяем только базовые коды
        detectedLocale = preferredLanguages
          .map(lang => lang.split('-')[0].toLowerCase())
          .find(lang => VALID_LOCALES.includes(lang)) || DEFAULT_LOCALE;
      }
    }

    // Проверяем, что cookie содержит валидную локаль
    const validCookieLocale = userLocaleCookie && VALID_LOCALES.includes(userLocaleCookie) 
      ? userLocaleCookie 
      : null;
    const targetLocale = validCookieLocale || detectedLocale;

    if (pathname.startsWith(`/${targetLocale}`)) {
      return NextResponse.next();
    }

    const redirectUrl = new URL(`/${targetLocale}${pathname}${search}`, request.url);
    
    // ✅ SEO оптимизация: используем правильные статус коды
    let statusCode = 307; // Temporary redirect по умолчанию
    
    // Для корневого пути используем 301 Permanent Redirect для SEO
    if (pathname === '/') {
      statusCode = 301;
    }
    
    const res = NextResponse.redirect(redirectUrl, statusCode);
    // Essential cookie для языка (TDDDG §25(2)) - технически необходимый
    res.cookies.set(LOCALE_COOKIE, targetLocale, {
      path: '/',
      maxAge: COOKIE_MAX_AGE,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    res.headers.set('Cache-Control', 'no-store');

    return res;
  }

  // ✅ Для Googlebot всегда используем русский язык с 301 редиректом
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/ru', request.url), 301);
  }
  
  // Для остальных путей Googlebot перенаправляем на русскую версию
  const redirectUrl = new URL(`/ru${pathname}${search}`, request.url);
  return NextResponse.redirect(redirectUrl, 301);
}

export const config = {
  matcher: [
    // General locale redirector
    '/((?!api|_next|_static|_vercel|.*\\..*|favicon.ico|robots.txt|sitemap.xml|sitemap-0.xml).*)',
  ],
}

