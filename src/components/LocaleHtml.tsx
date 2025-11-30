"use client";

import { useEffect } from 'react';

export function LocaleHtml({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.setAttribute('lang', locale);
  }, [locale]);

  return null;
}

