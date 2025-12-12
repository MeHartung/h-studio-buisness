// Серверный компонент для установки lang атрибута
// Использует скрипт для синхронной установки lang до гидратации (лучше для SEO)
export function LocaleHtml({ locale }: { locale: string }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.setAttribute('lang', '${locale}');`,
      }}
    />
  );
}

