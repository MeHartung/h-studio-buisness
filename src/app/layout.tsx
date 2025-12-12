// Root layout - middleware will handle locale routing to [locale] layout
// The [locale]/layout.tsx will provide the html/body structure
// Note: lang="ru" is set as default since site is Russian-only
// LocaleHtml component will ensure lang is properly set for SEO
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

