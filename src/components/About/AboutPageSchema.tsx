import Script from 'next/script';

interface AboutPageSchemaProps {
  baseUrl: string;
  currentUrl: string;
  title: string;
  description: string;
  teamMembers: Array<{
    name: string;
    position: string;
    description?: string;
  }>;
}

export function AboutPageSchema({ 
  baseUrl, 
  currentUrl, 
  title, 
  description,
  teamMembers 
}: AboutPageSchemaProps) {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": currentUrl,
    "name": title,
    "description": description,
    "url": currentUrl,
    "isPartOf": {
      "@id": `${baseUrl}#website`
    },
    "about": {
      "@id": `${baseUrl}#organization`
    },
    "publisher": {
      "@id": `${baseUrl}#organization`
    },
    "mainEntity": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      "name": "H-Studio Business",
      "url": baseUrl,
      "logo": `${baseUrl}/logo-white.svg`,
      "description": description,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+7-982-666-66-80",
        "contactType": "customer service",
        "email": "hello@h-studio.io",
        "availableLanguage": ["Russian"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "RU",
        "addressRegion": "Москва",
        "addressLocality": "Москва",
        "streetAddress": "ул. Октябрьская д. 80 стр. 6",
        "postalCode": "117593"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "55.7558",
        "longitude": "37.6173"
      },
      "foundingDate": "2020",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "4-10"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Russia"
      },
      "knowsAbout": [
        "Автоматизация расчётов себестоимости",
        "Конфигураторы коммерческих предложений",
        "Интеграция с 1С",
        "Документооборот",
        "AI-аналитика",
        "Производственная автоматизация",
        "Расчёты для производственных компаний",
        "Системы расчёта себестоимости",
        "Автоматизация КП",
        "Интеграции с ERP и CRM"
      ],
      "serviceType": [
        "Автоматизация расчётов",
        "Конфигураторы КП",
        "Документооборот",
        "Интеграции с 1С/ERP/CRM",
        "AI-аналитика"
      ],
        "member": teamMembers.map((member, index) => ({
        "@type": "Person",
        "@id": `${currentUrl}#person-${member.name.toLowerCase().replace(/\s+/g, '-')}`,
        "name": member.name,
        "jobTitle": member.position,
        "description": member.description,
        "worksFor": {
          "@id": `${baseUrl}#organization`
        }
      }))
    },
  };

  return (
    <Script
      id="about-page-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
    />
  );
}

