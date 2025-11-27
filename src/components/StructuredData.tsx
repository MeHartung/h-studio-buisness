import Script from 'next/script';

interface StructuredDataProps {
  data: object;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id={`structured-data-${Math.random().toString(36).substring(7)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema для главной страницы
export function OrganizationSchema({ locale }: { locale: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://h-studio-tech.ru";
  
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "H-Studio Business",
    "url": baseUrl,
    "logo": `${baseUrl}/logo-white.svg`,
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
      "addressRegion": "Свердловская область",
      "addressLocality": "Реж",
      "streetAddress": "ул. О. Кошевого, д. 16",
      "postalCode": "623751"
    },
    "sameAs": []
  };

  return <StructuredData data={organizationData} />;
}

// Service Schema для страниц услуг
export function ServiceSchema({ 
  serviceName, 
  description, 
  serviceUrl 
}: { 
  serviceName: string; 
  description: string; 
  serviceUrl: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://h-studio-tech.ru";
  
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "H-Studio Business",
      "url": baseUrl
    },
    "areaServed": {
      "@type": "Country",
      "name": "Russia"
    },
    "url": serviceUrl
  };

  return <StructuredData data={serviceData} />;
}

// BreadcrumbList Schema
export function BreadcrumbSchema({ 
  items 
}: { 
  items: Array<{ name: string; url: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://h-studio-tech.ru";
  
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  };

  return <StructuredData data={breadcrumbData} />;
}

// Website Schema
export function WebsiteSchema({ locale }: { locale: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://h-studio-tech.ru";
  
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "H-Studio Business",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/ru/services?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return <StructuredData data={websiteData} />;
}

