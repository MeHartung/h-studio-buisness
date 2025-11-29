// Маппинг slug -> id для сервисов
export const serviceSlugToId: Record<string, string> = {
  'avtomatizatsiya-raschetov-i-sebestoimosti': '1',
  'konfiguratory-kommercheskih-predlozheniy': '2',
  'generatsiya-spetsifikatsiy-pdf-i-tehnicheskoy-dokumentatsii': '3',
  'kontrol-tsen-marzhinalnosti-i-oshibok-v-raschetah': '4',
  'avtomatizatsiya-dokumentooborota-i-soglasovaniy': '5',
  'integratsii-s-1s-erp-crm-i-vnutrennimi-sistemami': '6',
  'ai-instrumenty-i-analitika': '7',
  'vnedrenie-i-obuchenie-personala': '8',
};

// Обратный маппинг id -> slug
export const serviceIdToSlug: Record<string, string> = {
  '1': 'avtomatizatsiya-raschetov-i-sebestoimosti',
  '2': 'konfiguratory-kommercheskih-predlozheniy',
  '3': 'generatsiya-spetsifikatsiy-pdf-i-tehnicheskoy-dokumentatsii',
  '4': 'kontrol-tsen-marzhinalnosti-i-oshibok-v-raschetah',
  '5': 'avtomatizatsiya-dokumentooborota-i-soglasovaniy',
  '6': 'integratsii-s-1s-erp-crm-i-vnutrennimi-sistemami',
  '7': 'ai-instrumenty-i-analitika',
  '8': 'vnedrenie-i-obuchenie-personala',
};

/**
 * Получить id сервиса по slug
 */
export function getServiceIdBySlug(slug: string): string | null {
  return serviceSlugToId[slug] || null;
}

/**
 * Получить slug сервиса по id
 */
export function getServiceSlugById(id: string): string | null {
  return serviceIdToSlug[id] || null;
}

