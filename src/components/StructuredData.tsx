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
    "@id": `${baseUrl}#organization`,
    "name": "H-Studio Business",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo-white.svg`,
    },
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
  offers,
  serviceId
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
  serviceId?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const fullUrl = serviceUrl.startsWith('http') ? serviceUrl : `${baseUrl}${serviceUrl}`;
  const id = `${fullUrl}#service`;
  
  const serviceData: any = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": id,
    "name": serviceName,
    "description": description,
    "provider": {
      "@id": `${baseUrl}#organization`
    },
    "areaServed": {
      "@type": "Country",
      "name": "Russia"
    },
    "url": fullUrl,
    "serviceType": category || "Business Automation Service",
  };

  if (offers) {
    serviceData.offers = {
      "@type": "Offer",
      "price": offers.price || "0",
      "priceCurrency": offers.priceCurrency || "RUB",
      "availability": offers.availability || "https://schema.org/InStock",
      "url": fullUrl
    };
  }

  return <StructuredData data={serviceData} />;
}

// BreadcrumbList Schema
export function BreadcrumbSchema({ 
  items,
  pageUrl
}: { 
  items: Array<{ name: string; url: string }>;
  pageUrl?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  
  const breadcrumbData: any = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  };

  if (pageUrl) {
    breadcrumbData.mainEntity = {
      "@type": "WebPage",
      "@id": pageUrl.startsWith('http') ? pageUrl : `${baseUrl}${pageUrl}`
    };
  }

  return <StructuredData data={breadcrumbData} />;
}

// Website Schema
export function WebsiteSchema({ locale }: { locale: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    "name": "H-Studio Business",
    "url": baseUrl,
    "publisher": {
      "@id": `${baseUrl}#organization`
    },
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

// Product Schema для главной страницы
export function ProductSchema({ locale }: { locale: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  
  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Автоматизация расчётов, КП, себестоимости и производственных процессов",
    "description": "Автоматизация расчётов, коммерческих предложений, себестоимости и спецификаций для производственных и инженерных компаний. Конфигураторы КП, интеграции с 1С/ERP/CRM, документооборот, AI-аналитика.",
    "brand": {
      "@id": `${baseUrl}#organization`
    },
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/${locale}`,
      "priceCurrency": "RUB",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "priceCurrency": "RUB"
      }
    },
    "category": "Business Automation Service",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.97",
      "reviewCount": "50"
    }
  };

  return <StructuredData data={productData} />;
}

// WebPage Schema для всех страниц
export function WebPageSchema({
  pageUrl,
  title,
  description,
  locale = 'ru'
}: {
  pageUrl: string;
  title?: string;
  description?: string;
  locale?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const fullUrl = pageUrl.startsWith('http') ? pageUrl : `${baseUrl}${pageUrl}`;
  
  const webPageData: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": fullUrl,
    "url": fullUrl,
    "isPartOf": {
      "@id": `${baseUrl}#website`
    },
    "about": {
      "@id": `${baseUrl}#organization`
    },
    "publisher": {
      "@id": `${baseUrl}#organization`
    },
    "inLanguage": locale === 'ru' ? 'ru-RU' : locale === 'en' ? 'en-US' : 'de-DE'
  };

  if (title) {
    webPageData.name = title;
  }

  if (description) {
    webPageData.description = description;
  }

  return <StructuredData data={webPageData} />;
}

// ItemList Schema для страницы списка сервисов
export function ItemListSchema({
  listUrl,
  items,
  listName
}: {
  listUrl: string;
  items: Array<{ name: string; description?: string; url: string }>;
  listName: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const fullUrl = listUrl.startsWith('http') ? listUrl : `${baseUrl}${listUrl}`;
  
  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${fullUrl}#services-list`,
    "name": listName,
    "url": fullUrl,
    "about": {
      "@id": `${baseUrl}#organization`
    },
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": item.name,
        "description": item.description || "",
        "url": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
        "provider": {
          "@id": `${baseUrl}#organization`
        }
      }
    }))
  };

  return <StructuredData data={itemListData} />;
}

// FAQPage Schema для страниц сервисов (серверный компонент)
export function FAQPageSchema({
  faqUrl,
  questions
}: {
  faqUrl: string;
  questions: Array<{ question: string; answer: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.h-studio-tech.ru";
  const fullUrl = faqUrl.startsWith('http') ? faqUrl : `${baseUrl}${faqUrl}`;
  
  const faqPageData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${fullUrl}#faq`,
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    })),
    "about": {
      "@id": `${baseUrl}#organization`
    }
  };

  return <StructuredData data={faqPageData} />;
}

