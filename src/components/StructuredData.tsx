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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  
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
      "addressRegion": "Москва",
      "addressLocality": "Москва",
      "streetAddress": "ул. Октябрьская д. 80 стр. 6",
      "postalCode": "117593"
    },
    "sameAs": []
  };

  return <StructuredData data={organizationData} />;
}

// Service Schema для страниц услуг
export function ServiceSchema({ 
  serviceName, 
  description, 
  serviceUrl,
  category,
  offers
}: { 
  serviceName: string; 
  description: string; 
  serviceUrl: string;
  category?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  
  const serviceData: any = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
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
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Russia"
    },
    "url": serviceUrl,
    "serviceType": category || "Business Automation Service",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": serviceName,
      "itemListElement": {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": serviceName
        }
      }
    }
  };

  if (offers) {
    serviceData.offers = {
      "@type": "Offer",
      "price": offers.price || "0",
      "priceCurrency": offers.priceCurrency || "RUB",
      "availability": offers.availability || "https://schema.org/InStock",
      "url": serviceUrl
    };
  }

  return <StructuredData data={serviceData} />;
}

// BreadcrumbList Schema
export function BreadcrumbSchema({ 
  items 
}: { 
  items: Array<{ name: string; url: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  
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

