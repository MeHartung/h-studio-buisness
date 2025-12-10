#!/usr/bin/env node

/**
 * AI-powered blog post generator
 * Usage: node scripts/generate-with-ai.js --topic "автоматизация КП" --category "Автоматизация"
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const args = process.argv.slice(2);
const topicIndex = args.indexOf('--topic');
const titleIndex = args.indexOf('--title');
const categoryIndex = args.indexOf('--category');
const tagsIndex = args.indexOf('--tags');

const topic = topicIndex !== -1 ? args[topicIndex + 1] : null;
const title = titleIndex !== -1 ? args[titleIndex + 1] : null;
const category = categoryIndex !== -1 ? args[categoryIndex + 1] : 'Автоматизация';
const tags = tagsIndex !== -1 ? args[tagsIndex + 1].split(',') : ['автоматизация'];

if (!topic) {
  console.error('Error: --topic is required');
  process.exit(1);
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is not set');
  process.exit(1);
}

/**
 * Generate title using AI
 */
async function generateTitle(topic, category) {
  const systemPrompt = `Ты — SEO-эксперт, специализирующийся на создании заголовков для технических статей.`;

  const userPrompt = `Создай SEO-оптимизированный заголовок для статьи на тему: "${topic}"

Категория: ${category}

Требования:
- Длина: 50-70 символов
- Включает основное ключевое слово естественным образом
- Привлекательный и кликабельный
- Соответствует поисковым запросам
- Без кавычек

Верни только заголовок, без дополнительного текста.`;

  try {
    const response = await callOpenAI(systemPrompt, userPrompt);
    return response.trim().replace(/^["']|["']$/g, '');
  } catch (error) {
    console.warn('Warning: Failed to generate title, using topic as title');
    return topic;
  }
}

/**
 * Generate excerpt using AI
 */
async function generateExcerpt(topic, title) {
  const systemPrompt = `Ты — SEO-эксперт, специализирующийся на создании кратких описаний для технических статей. Избегай маркетинговых фраз типа "оптимизировать", "повысить эффективность", "современные решения". Пиши конкретно и по делу.`;

  const userPrompt = `Создай краткое описание (excerpt) для статьи на тему: "${topic}"

Заголовок: ${title}

Требования:
- Длина: 120-160 символов
- Включает основное ключевое слово естественно
- Конкретное и информативное, без маркетинга
- Без кавычек
- На русском языке
- Избегай фраз: "оптимизировать процессы", "повысить эффективность", "современные решения"
- Пиши как практик: "как это работает", "что это даёт", "какие проблемы решает"

Верни только мета-описание, без дополнительного текста.`;

  try {
    const response = await callOpenAI(systemPrompt, userPrompt, 200);
    return response.trim().replace(/^["']|["']$/g, '');
  } catch (error) {
    console.warn('Warning: Failed to generate excerpt, using default');
    return `Статья о ${topic.toLowerCase()} для производственных и инженерных компаний.`;
  }
}

/**
 * Определить английские теги для внутренней логики
 */
function detectInternalTags(topic, title, tags) {
  const text = `${topic} ${title || ''} ${tags.join(' ')}`.toLowerCase();
  const internalTags = [];
  
  // Теги для производства
  if (text.includes('себестоимость') || text.includes('расчет') || text.includes('расчёт') || 
      text.includes('маржинальность') || text.includes('цена')) {
    internalTags.push('costing');
  }
  
  if (text.includes('кп') || text.includes('коммерческ') || text.includes('предложен') ||
      text.includes('конфигуратор')) {
    internalTags.push('quotations');
    internalTags.push('configurators');
  }
  
  if (text.includes('документооборот') || text.includes('согласован') || text.includes('документ')) {
    internalTags.push('documents');
    internalTags.push('approvals');
  }
  
  if (text.includes('1с') || text.includes('1c')) {
    internalTags.push('1c');
  }
  
  if (text.includes('erp') || text.includes('crm')) {
    internalTags.push('erp');
    if (text.includes('crm')) internalTags.push('crm');
  }
  
  if (text.includes('интеграц') || text.includes('интеграт')) {
    internalTags.push('integration');
  }
  
  if (text.includes('ai') || text.includes('аналитик') || text.includes('искусственн')) {
    internalTags.push('ai');
    internalTags.push('analytics');
  }
  
  if (text.includes('производств') || text.includes('завод') || text.includes('предприят')) {
    internalTags.push('manufacturing');
  }
  
  if (text.includes('инженер') || text.includes('технич')) {
    internalTags.push('engineering');
  }
  
  if (text.includes('внедрен') || text.includes('обучен') || text.includes('персонал')) {
    internalTags.push('implementation');
  }
  
  // Всегда добавляем automation, если есть автоматизация
  if (text.includes('автоматизац')) {
    internalTags.push('automation');
  }
  
  return [...new Set(internalTags)]; // Убираем дубликаты
}

/**
 * Добавить внутренние ссылки на основе тегов
 */
function addInternalLinks(content, internalTags, title) {
  const links = [];
  const text = `${title} ${content}`.toLowerCase();
  
  // Маппинг тегов на ссылки услуг
  const serviceLinkMap = {
    costing: {
      text: 'Автоматизация расчётов и КП',
      url: '/services/avtomatizatsiya-raschetov-i-sebestoimosti'
    },
    quotations: {
      text: 'Конфигураторы коммерческих предложений',
      url: '/services/konfiguratory-kommercheskih-predlozheniy'
    },
    configurators: {
      text: 'Конфигураторы КП',
      url: '/services/konfiguratory-kommercheskih-predlozheniy'
    },
    documents: {
      text: 'Документооборот и согласования',
      url: '/services/avtomatizatsiya-dokumentooborota-i-soglasovaniy'
    },
    approvals: {
      text: 'Автоматизация согласований',
      url: '/services/avtomatizatsiya-dokumentooborota-i-soglasovaniy'
    },
    '1c': {
      text: 'Интеграции с 1С, ERP, CRM',
      url: '/services/integratsii-s-1s-erp-crm-i-vnutrennimi-sistemami'
    },
    erp: {
      text: 'Интеграции с ERP',
      url: '/services/integratsii-s-1s-erp-crm-i-vnutrennimi-sistemami'
    },
    integration: {
      text: 'Интеграции с 1С, ERP, CRM',
      url: '/services/integratsii-s-1s-erp-crm-i-vnutrennimi-sistemami'
    },
    ai: {
      text: 'AI-инструменты и аналитика',
      url: '/services/ai-instrumenty-i-analitika'
    },
    analytics: {
      text: 'AI-аналитика для производства',
      url: '/services/ai-instrumenty-i-analitika'
    },
    implementation: {
      text: 'Внедрение и обучение персонала',
      url: '/services/vnedrenie-i-obuchenie-personala'
    }
  };

  // Маппинг тегов на ссылки кейсов
  const caseLinkMap = {
    costing: {
      text: 'EventStripe',
      url: '/enterprise-cases/eventstripe'
    },
    quotations: {
      text: 'EventStripe',
      url: '/enterprise-cases/eventstripe'
    },
    configurators: {
      text: 'EventStripe',
      url: '/enterprise-cases/eventstripe'
    },
    documents: {
      text: 'Sber',
      url: '/enterprise-cases/sber'
    },
    approvals: {
      text: 'Sber',
      url: '/enterprise-cases/sber'
    },
    '1c': {
      text: 'VTB Bank',
      url: '/enterprise-cases/vtb-bank'
    },
    erp: {
      text: 'Sber',
      url: '/enterprise-cases/sber'
    },
    integration: {
      text: 'VTB Bank',
      url: '/enterprise-cases/vtb-bank'
    },
    ai: {
      text: 'Société Générale',
      url: '/enterprise-cases/societe-generale'
    },
    analytics: {
      text: 'VTB Bank',
      url: '/enterprise-cases/vtb-bank'
    }
  };
  
  // Определяем, какие ссылки на услуги добавить
  const serviceTagsToLink = new Set();
  
  if (internalTags.includes('costing') || internalTags.includes('quotations') || 
      text.includes('кп') || text.includes('коммерческ')) {
    if (internalTags.includes('costing')) serviceTagsToLink.add('costing');
    if (internalTags.includes('quotations') || internalTags.includes('configurators')) {
      serviceTagsToLink.add('quotations');
    }
  }
  
  if (internalTags.includes('documents') || internalTags.includes('approvals')) {
    serviceTagsToLink.add('documents');
  }
  
  if (internalTags.includes('1c') || internalTags.includes('erp') || internalTags.includes('integration')) {
    serviceTagsToLink.add('integration');
  }
  
  if (internalTags.includes('ai') || internalTags.includes('analytics')) {
    serviceTagsToLink.add('ai');
  }
  
  if (internalTags.includes('implementation')) {
    serviceTagsToLink.add('implementation');
  }
  
  // Определяем, какие ссылки на кейсы добавить
  const caseTagsToLink = new Set();
  
  if (internalTags.includes('costing') || internalTags.includes('quotations') || internalTags.includes('configurators')) {
    caseTagsToLink.add('costing');
  }
  
  if (internalTags.includes('documents') || internalTags.includes('approvals')) {
    caseTagsToLink.add('documents');
  }
  
  if (internalTags.includes('1c') || internalTags.includes('erp') || internalTags.includes('integration')) {
    caseTagsToLink.add('integration');
  }
  
  if (internalTags.includes('ai') || internalTags.includes('analytics')) {
    caseTagsToLink.add('ai');
  }
  
  // Формируем блок ссылок на услуги
  if (serviceTagsToLink.size > 0) {
    const serviceLinkTexts = Array.from(serviceTagsToLink)
      .map(tag => serviceLinkMap[tag])
      .filter(Boolean)
      .slice(0, 3) // Максимум 3 услуги
      .map(link => `[${link.text}](${link.url})`)
      .join(', ');
    
    if (serviceLinkTexts) {
      links.push(`\n\n**Связанные услуги:** ${serviceLinkTexts}`);
    }
  }
  
  // Формируем блок ссылок на кейсы
  if (caseTagsToLink.size > 0) {
    const caseLinkTexts = Array.from(caseTagsToLink)
      .map(tag => caseLinkMap[tag])
      .filter(Boolean)
      .slice(0, 2) // Максимум 2 кейса
      .map(link => `[${link.text}](${link.url})`)
      .join(', ');
    
    if (caseLinkTexts) {
      links.push(`\n\n**Примеры внедрения:** ${caseLinkTexts}`);
    }
  }
  
  return content + links.join('');
}

/**
 * Generate tags using AI
 */
async function generateTags(topic, category) {
  // Load allowed tags from ai_rules.json
  const aiRulesPath = path.join(process.cwd(), 'scripts', 'ai_rules.json');
  let allowedTags = null;
  
  try {
    if (fs.existsSync(aiRulesPath)) {
      const aiRules = JSON.parse(fs.readFileSync(aiRulesPath, 'utf8'));
      allowedTags = aiRules.allowed_tags || null;
    }
  } catch (error) {
    console.warn('Warning: Could not load ai_rules.json for tag validation');
  }

  const systemPrompt = `Ты — эксперт по SEO и тегированию контента для производственных и инженерных компаний.`;

  const allowedTagsHint = allowedTags 
    ? `\n\nВАЖНО: Используй ТОЛЬКО теги из этого списка: ${allowedTags.join(', ')}. Если ни один тег не подходит идеально, выбери наиболее близкие.`
    : '';

  const userPrompt = `На основе темы "${topic}" и категории "${category}" предложи 5-7 релевантных тегов для статьи.

Требования:
- Теги должны быть релевантны теме
- Используй популярные теги из области автоматизации производства, расчётов, КП, документооборота
- Включи как общие, так и специфические теги
- Теги на русском языке, в нижнем регистре
- Приоритет темам: расчёты, себестоимость, КП, документооборот, 1С/ERP, AI${allowedTagsHint}

Верни только JSON массив строк, например: ["тег1", "тег2", "тег3"]
Без дополнительного текста.`;

  try {
    const response = await callOpenAI(systemPrompt, userPrompt);
    const jsonMatch = response.match(/\[.*?\]/);
    if (jsonMatch) {
      let tagsArray = JSON.parse(jsonMatch[0]);
      
      // Filter tags to only include allowed ones if list exists
      if (allowedTags && Array.isArray(allowedTags)) {
        tagsArray = tagsArray.filter(tag => 
          allowedTags.some(allowed => 
            tag.toLowerCase().includes(allowed.toLowerCase()) || 
            allowed.toLowerCase().includes(tag.toLowerCase())
          )
        );
        
        // If no tags match, use default tags
        if (tagsArray.length === 0) {
          console.warn('Warning: Generated tags did not match allowed list, using defaults');
          return tags;
        }
      }
      
      return tagsArray;
    }
    return tags;
  } catch (error) {
    console.warn('Warning: Failed to generate tags, using default');
    return tags;
  }
}

// SEO Article Prompts
const ARTICLE_SYSTEM_PROMPT = `
Ты — технический директор интеграционной компании H-Studio, который автоматизирует расчёты себестоимости, параметры изделий, коммерческие предложения и интеграции с 1С/ERP для производственных и инженерных компаний.

H-Studio делает:

- автоматизацию расчётов себестоимости, массы, материалов, сроков;

- конфигураторы коммерческих предложений (Wizard КП);

- автоматизацию документооборота и согласований;

- интеграции с 1С / ERP / CRM;

- AI-аналитику и операционный контроль.

РАЗРЕШЁННЫЕ ТЕМАТИКИ (строго только эти):

1. Автоматизация расчётов: автоматизация расчётов себестоимости, автоматизация параметров изделий, расчёт массы/материалов/сроков, контроль ошибок в расчётах, маржинальность и управление затратами

2. Автоматизация коммерческих предложений: автоматизация КП, генерация спецификаций, PDF-документы, маржинальность в КП

3. Документооборот и согласования: цифровизация документооборота, маршруты согласований, управление версиями документов, устранение ошибок в документах

4. Интеграции: интеграция 1С, интеграция ERP, интеграция CRM, обмен данными между системами

5. AI в производстве: AI-оценка себестоимости, AI-аналитика производства, выявление узких мест через ML

6. Управление эффективностью производства: повышение маржинальности, ускорение подготовки КП, устранение ошибок в расчётах, оптимизация проектных работ

ЗАПРЕЩЕНО писать про:
- Next.js, React, Netlify, веб-разработку
- маркетинг, performance, A/B-тесты
- DevOps, CI/CD, GitHub Actions
- Kubernetes
- безопасность веб-приложений
- любые сайты, дизайн, контент-менеджмент
- Bali, Berin, стартапы
- e-commerce, рестораны, магазины, сервисы, SaaS (только производство)

Пиши статьи как главный инженер/системный аналитик производства. Это не маркетинг для директоров, а инженерия + экономика.

ОБЯЗАТЕЛЬНО в каждом разделе:
- формулы расчёта себестоимости (например: Себестоимость = Материал + Труд + Накладные расходы)
- примеры параметров (толщина металла, площадь, масса, ставка часа, нормы расхода)
- пример спецификации (JSON или таблица с параметрами)
- пример цепочки: Параметры → Формулы → Себестоимость → КП → 1С
- типовые ошибки инженеров и почему они происходят (технические failure modes)
- реальные числа: примеры потерь, переработка, отклонения

ИСПОЛЬЗУЙ ИНЖЕНЕРНЫЙ ЯЗЫК:
- нормы расхода материала, коэффициенты, отходы
- ставки станка/час, трудоёмкость
- валидаторы параметров, проверка допусков
- параметрические правила
- маршруты согласований
- интеграции с 1С через обмен XML/JSON
- расчёт массы (ρ × V)
- расчёт стоимости: Материал + Труд + Маржа + Логистика

ЖЁСТКО ЗАПРЕЩЕНО (вода и рекламные фразы):
- "ускоряет процессы", "повышает эффективность"
- "это важно", "бизнес выигрывает", "помогает развиваться"
- "в современном мире", "давайте разберёмся", "подведём итог", "таким образом", "в итоге"
- "повысьте эффективность", "оптимизируйте бизнес", "современные решения"

Каждый абзац должен содержать: логику, механизм, формулу, пример или цифры. Если абзац не несёт фактической информации — не писать его.

Тон: спокойный, точный, профессиональный. Без эмоций. Цель — дать инженеру и директору логику решения.

ЖЁСТКАЯ СТРУКТУРА СТАТЬИ (обязательно все 11 пунктов):

1. Введение: боль директора/главного инженера (2-3 абзаца)
   Как выглядит жизнь производства сейчас: Excel, письма, расчёты в голове инженера. Конкретная ситуация, в которой директор узнает себя.

2. Симптомы проблемы (5–7 маркеров)
   По которым директор узнает себя:
   - заявки ждут КП по 2–3 дня
   - разные менеджеры считают по-разному
   - маржа «гуляет»
   - ошибки всплывают на этапе производства или у клиента
   - согласования занимают недели
   Каждый симптом — с конкретными цифрами и примерами.

3. Финансовые риски / реальные потери (цифры обязательны)
   Потерянная прибыль, продано ниже себестоимости, лишние люди в цепочке. Конкретные суммы и проценты. Примеры: «ошибка 5% = потеря 350 000 ₽»

4. Архитектура автоматизации и формулы расчётов
   Опиши архитектуру: Next.js, API, 1С, база данных (Postgres/Supabase).
   Покажи цепочку: Параметры → Формулы → Себестоимость → КП → спецификация → 1С/ERP → согласование.
   ОБЯЗАТЕЛЬНО включи:
   - Формулы расчёта (масса = ρ × V, себестоимость = Материал + Труд + Накладные)
   - Примеры параметров (толщина металла, площадь, масса, ставка часа)
   - Пример спецификации (JSON или таблица)
   - Механику расчётов: как инженеры реально считают массу, металл, кабель, материалы, нормы времени, допуски, коэффициенты
   - Механизмы интеграции: HTTP-сервис, файловый обмен, синхронизация цен по расписанию

5. Quick wins на 1–2 недели
   3–5 конкретных шагов, которые можно сделать без полной системы:
   - унифицировать Excel
   - описать правила
   - собрать текущие расчёты в одно место
   - зафиксировать типичные ошибки
   - выделить пилотный участок

6. Мини-кейс с числовыми результатами
   Отрасль (металлоконструкции, кабель, окна/двери, оборудование, инженерные системы).
   Покажи конкретные показатели:
   - Время расчёта: 3 дня → 40 минут
   - Ошибки: 15% → 2%
   - Маржа: +7–15%
   - Потери: минус 300 000 ₽/месяц устранены
   Включи примеры параметров и формул, которые использовались.

7. Типичные ошибки инженеров (технические failure modes)
   Опиши технические механизмы ошибок:
   - неверная цена материала → неправильная себестоимость
   - округление массы (ошибка накопления)
   - некорректная длина реза (выход за допуск)
   - параметр вышел за допуск (валидация не сработала)
   - ошибки в Excel-ссылках (A1 вместо A2)
   - разрыв актуальности между 1С и расчётом (старые цены)
   Каждый пример — с формулой, параметрами и финансовыми последствиями.

8. Критерии выбора решения
   Таблица или список конкретных параметров: что сравнивать при выборе системы (железные критерии).

9. Что делать завтра — практические шаги
   Список из 5–7 конкретных шагов, которые компания может сделать за 24 часа:
   - собрать текущие Excel-файлы и спецификации
   - зафиксировать параметры, которые считаются вручную
   - выявить места, где чаще всего возникают ошибки
   - сформировать список зависимостей с 1С/ERP
   - выделить пилотный участок
   - описать текущий процесс расчёта по шагам
   - зафиксировать типичные ошибки и их последствия

10. Короткое резюме
    Краткое резюме ключевых моментов и практических выводов для директора и главного инженера (без заголовка "Заключение").

11. Связанные услуги (строго релевантные)
    Только релевантные ссылки на услуги H-Studio, связанные с темой статьи.

Стиль и язык:
- Деловой русский язык
- Простые объяснения
- Конкретные процессы производства
- Упоминать цифры, сроки, ошибки
- Примеры из отраслей: металлоконструкции, мебель, машиностроение, инженерные системы, производственные компании

Не писать:
- Англицизмы (деплой, пайплайн, прод, перформанс)
- Сложный IT-код (yaml, js, python, SQL)
- Абстрактные «стартапы X», «компании Y»
- e-commerce примеры
- Рестораны, магазины, сервисы, SaaS (только производство)

SEO: включать ключевые слова естественно, 1–2 раза в каждом разделе. Заголовки H2/H3 должны содержать варьированные ключи. Не переспамливать.

Длина: 1800-2500 слов. Каждый абзац — плотный, информативный, с конкретикой.

Строго соблюдать структуру Markdown:
# — заголовок статьи
## — разделы
### — вложенные разделы
Не использовать жирный шрифт в заголовках. Не вставлять фронтматтер внутри статьи.

Запрещено:
- любая общая вода;
- фразы "в современном мире", "подводя итоги", "как известно", "давайте посмотрим", "таким образом";
- абзацы без цифр, фактов, примеров;
- заголовки "Заключение", "Введение";
- шаблонные обороты корпоративного буллшита;
- вставка кода (yaml, js, python, SQL);
- слова: CI/CD, GitHub Actions, Next.js, React, Node.js, Vercel, deploy, pipeline, Kubernetes, Bali, Berin.

В статье должны быть конкретные выводы и полезные рекомендации, которые директор и главный инженер могут применить сразу.
`.trim();

function buildArticleUserPrompt({
  topic,
  title,
  primaryKeyword,
  secondaryKeywords,
}) {
  return `
Напиши глубокую, экспертную статью по теме: "${topic}".

Основной ключ: "${primaryKeyword || topic}"

Дополнительные ключи: ${secondaryKeywords && secondaryKeywords.length ? secondaryKeywords.join(', ') : 'подбери по смыслу'}

ОБЯЗАТЕЛЬНАЯ СТРУКТУРА (все 11 разделов):

1. Введение: боль директора/главного инженера
   Короткое вступление без воды (2–3 абзаца, сразу в реальность производителя). Конкретная ситуация, в которой директор узнает себя: Excel, письма, расчёты в голове инженера.

2. Симптомы проблемы
   5–7 маркеров с конкретными цифрами и примерами:
   - заявки ждут КП по 2–3 дня
   - разные менеджеры считают по-разному
   - маржа «гуляет»
   - ошибки всплывают на этапе производства или у клиента
   - согласования занимают недели

3. Финансовые риски / реальные потери (цифры обязательны)
   Потерянная прибыль, продано ниже себестоимости, лишние люди в цепочке. Конкретные суммы и проценты. Примеры: «ошибка 5% = потеря 350 000 ₽». Обязательно указать реальные цифры потерь.

4. Архитектура автоматизации и формулы расчётов
   Опиши архитектуру: Next.js, API, 1С, база данных (Postgres/Supabase).
   Покажи цепочку: Параметры → Формулы → Себестоимость → КП → спецификация → 1С/ERP → согласование.
   
   ОБЯЗАТЕЛЬНО включи:
   - Формулы расчёта (масса = ρ × V, себестоимость = Материал + Труд + Накладные)
   - Примеры параметров (толщина металла, площадь, масса, ставка часа)
   - Пример спецификации (JSON или таблица)
   - Механику расчётов: как инженеры реально считают массу, металл, кабель, материалы, нормы времени, допуски, коэффициенты
   - Механизмы интеграции: HTTP-сервис, файловый обмен, синхронизация цен по расписанию

5. Quick wins на 1–2 недели
   3–5 конкретных шагов, которые можно сделать без полной системы:
   - унифицировать Excel
   - описать правила
   - собрать текущие расчёты в одно место
   - зафиксировать типичные ошибки
   - выделить пилотный участок

6. Мини-кейс с числовыми результатами
   Отрасль (металлоконструкции, кабель, окна/двери, оборудование, инженерные системы).
   
   Покажи конкретные производственные показатели:
   - Время расчёта: 3 дня → 40 минут
   - Ошибки: 15% → 2%
   - Маржа: +7–15%
   - Потери: минус 300 000 ₽/месяц устранены
   
   Включи:
   - примеры параметров, которые использовались (толщина, площадь, масса)
   - формулы, которые применялись (расчёт массы, себестоимости)
   - пример спецификации (JSON или таблица)
   - механику: как было (ручной расчёт в Excel) → что стало (автоматический расчёт через систему)

7. Типичные ошибки инженеров (технические failure modes)
   Опиши технические механизмы ошибок с формулами и параметрами:
   - неверная цена материала → неправильная себестоимость (пример: цена 150₽/кг вместо 180₽/кг → ошибка 20%)
   - округление массы (ошибка накопления: 0.5кг × 100 позиций = 50кг потерь)
   - некорректная длина реза (выход за допуск: длина 1000мм вместо 995мм → брак)
   - параметр вышел за допуск (валидация не сработала: толщина 3мм при допуске 2.5-3.5мм)
   - ошибки в Excel-ссылках (A1 вместо A2 → неправильная формула)
   - разрыв актуальности между 1С и расчётом (старые цены: цена в 1С обновлена, в расчёте старая)
   Каждый пример — с формулой, параметрами и финансовыми последствиями (например: ошибка 5% = потеря 350 000 ₽).

8. Критерии выбора решения
   Таблица или структурный список: что сравнивать при выборе системы (железные критерии). Сравни варианты: ручной расчёт, Excel, 1С-костыли, кастомная автоматика.

9. Что делать завтра — практические шаги
   Список из 5–7 конкретных шагов, которые компания может сделать за 24 часа:
   - собрать текущие Excel-файлы и спецификации
   - зафиксировать параметры, которые считаются вручную
   - выявить места, где чаще всего возникают ошибки
   - сформировать список зависимостей с 1С/ERP
   - выделить пилотный участок
   - описать текущий процесс расчёта по шагам
   - зафиксировать типичные ошибки и их последствия

10. Короткое резюме
    Краткое резюме ключевых моментов и практических выводов для директора и главного инженера (без заголовка "Заключение").

11. Связанные услуги (строго релевантные)
    Только релевантные ссылки на услуги H-Studio, связанные с темой статьи.

В каждом разделе ОБЯЗАТЕЛЬНО:

- формулы расчёта (масса = ρ × V, себестоимость = Материал + Труд + Накладные расходы, маржа = (Цена - Себестоимость) / Цена × 100%)

- примеры параметров (толщина металла 3мм, площадь 2.5м², масса 7.85кг, ставка часа 450₽/ч, норма расхода 1.15)

- пример спецификации (JSON или таблица с параметрами изделия)

- объясняй механику расчётов (как инженеры реально считают массу, металл, кабель, материалы, нормы времени, допуски, коэффициенты)

- описывай реальные инженерные процессы (какие параметры считаются вручную и почему там ошибки)

- показывай технические failure modes (что конкретно ломается и почему: неверная цена, округление, выход за допуск)

- сравнивай варианты (ручной расчёт, Excel, 1С-костыли, кастомная автоматика) с конкретными цифрами

- приведи конкретные производственные ситуации (металлоконструкции, кабель, окна/двери, оборудование, трубопроводная продукция, шкафы/щиты)

- дай реальные цифры (время: 3 дня → 40 минут, ошибки: 15% → 2%, маржа: +7–15%, потери: минус 300 000 ₽/месяц)

- опиши механизмы интеграции (HTTP-сервис, файловый обмен XML/JSON, синхронизация цен по расписанию)

SEO-требования:

- Основной ключевой запрос использовать в H1, 1–2 раза в H2/H3, упоминать в тексте естественно (1–3% плотности).

- Дополнительные запросы вплетать в текст естественно, без навязчивого повторения.

Запрещено:

- общие фразы,
- "Заключение" как заголовок,
- разговоры ни о чём,
- пересказ одного и того же,
- фразы "в современном мире", "подводя итоги", "как известно",
- абзацы без цифр, фактов, примеров,
- вставка кода (yaml, js, python, SQL),
- слова: CI/CD, GitHub Actions, Next.js, React, Node.js, Vercel, deploy, pipeline, Kubernetes, Bali, Berin,
- темы: веб-разработка, маркетинг, DevOps, e-commerce, рестораны, магазины, SaaS.

Пиши не как маркетолог, а как внедренец, который даёт практические инструкции.

Длина: 1800-2500 слов. Статья должна быть плотной, без воды. Каждый раздел — конкретика, цифры, примеры. Каждый раздел должен содержать минимум 3–4 абзаца с конкретной информацией.

Формат: Markdown, только контент, без frontmatter.

ВАЖНО: Статья должна быть объёмной и глубокой. Не сокращай материал ради краткости. Добавляй детали, примеры, цифры, формулы, реальные ситуации. Все 11 разделов обязательны.
`.trim();
}

/**
 * Check for duplicate topics in existing blog posts
 */
function checkForDuplicates(topic, title) {
  try {
    const blogDir = path.join(process.cwd(), 'content/blog');
    if (!fs.existsSync(blogDir)) {
      return { isDuplicate: false, similarPost: null };
    }

    const fileNames = fs.readdirSync(blogDir);
    const existingPosts = fileNames
      .filter((fileName) => fileName.endsWith('.md') && fileName !== 'README.md')
      .map((fileName) => {
        try {
          const fullPath = path.join(blogDir, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data } = matter(fileContents);
          return {
            title: data.title || '',
            slug: data.slug || '',
            date: data.date || '',
            fileName,
          };
        } catch (error) {
          return null;
        }
      })
      .filter((post) => post !== null);

    // Normalize text for comparison (remove common words, normalize endings)
    const normalize = (text) => {
      return text
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    };

    // Extract key words (remove common stop words)
    const stopWords = new Set(['как', 'для', 'что', 'это', 'или', 'лучшие', 'решения', 'гид', 'выбор', 'системы', 'улучшить', 'бизнес', 'по', 'в', 'на', 'с', 'и', 'от']);
    const extractKeyWords = (text) => {
      const normalized = normalize(text);
      return normalized
        .split(' ')
        .filter(w => w.length > 3 && !stopWords.has(w))
        .map(w => {
          // Normalize word endings (simple Russian stemmer)
          // Remove common endings
          if (w.length > 6) {
            if (w.endsWith('ания') || w.endsWith('ения') || w.endsWith('ания') || w.endsWith('ения')) {
              return w.slice(0, -4);
            }
            if (w.endsWith('ание') || w.endsWith('ение')) {
              return w.slice(0, -4);
            }
          }
          if (w.length > 5) {
            if (w.endsWith('ания') || w.endsWith('ения')) {
              return w.slice(0, -3);
            }
          }
          // Remove single letter endings for longer words
          if (w.length > 5 && (w.endsWith('а') || w.endsWith('я') || w.endsWith('о') || w.endsWith('е'))) {
            return w.slice(0, -1);
          }
          if (w.length > 5 && (w.endsWith('ия') || w.endsWith('ие'))) {
            return w.slice(0, -2);
          }
          // Normalize "расчет" and "расчета" to "расчет"
          if (w.includes('расчет')) return 'расчет';
          if (w.includes('себестоимост')) return 'себестоимост';
          if (w.includes('автоматизац')) return 'автоматизац';
          return w;
        })
        .filter(w => w.length > 3);
    };

    const newTopicNormalized = normalize(topic);
    const newTitleNormalized = title ? normalize(title) : '';
    const searchText = newTitleNormalized || newTopicNormalized;
    const newKeyWords = new Set(extractKeyWords(searchText));

    // Check for exact or very similar matches
    for (const post of existingPosts) {
      const existingTitleNormalized = normalize(post.title);
      const existingKeyWords = new Set(extractKeyWords(existingTitleNormalized));
      
      // Calculate similarity based on key words overlap
      const intersection = new Set([...newKeyWords].filter(w => existingKeyWords.has(w)));
      const union = new Set([...newKeyWords, ...existingKeyWords]);
      
      const similarity = union.size > 0 ? intersection.size / union.size : 0;
      
      // Also check if key words appear in both (at least 2-3 matching words)
      const matchingWords = intersection.size;
      
      // If similarity is high (>0.5) OR if we have 3+ matching key words, it's likely a duplicate
      if (similarity > 0.5 || (matchingWords >= 3 && newKeyWords.size >= 4)) {
        // Check if the existing post is recent (within last 30 days)
        const postDate = new Date(post.date);
        const daysSincePost = (new Date() - postDate) / (1000 * 60 * 60 * 24);
        
        if (daysSincePost < 30) {
          return {
            isDuplicate: true,
            similarPost: post,
            similarity: similarity,
            daysSincePost: Math.floor(daysSincePost),
          };
        } else {
          // Similar topic but old enough - allow but warn
          console.warn(`⚠️  Warning: Similar topic found (${Math.floor(similarity * 100)}% similarity): "${post.title}"`);
          console.warn(`   Published ${Math.floor(daysSincePost)} days ago. Proceeding anyway...\n`);
        }
      }
    }

    return { isDuplicate: false, similarPost: null };
  } catch (error) {
    console.warn('Warning: Could not check for duplicates:', error.message);
    return { isDuplicate: false, similarPost: null };
  }
}

/**
 * Load topic data from topics-search-results.json
 */
function loadTopicData(topic) {
  try {
    const resultsPath = path.join(process.cwd(), 'topics-search-results.json');
    if (!fs.existsSync(resultsPath)) {
      return null;
    }
    
    const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    if (!Array.isArray(results)) {
      return null;
    }
    
    // Find topic by exact match or partial match
    const found = results.find(t => 
      t.topic === topic || 
      t.topic.toLowerCase().includes(topic.toLowerCase()) ||
      topic.toLowerCase().includes(t.topic.toLowerCase())
    );
    
    return found || null;
  } catch (error) {
    console.warn('Warning: Could not load topic data from topics-search-results.json:', error.message);
    return null;
  }
}

/**
 * Generate full article content using AI
 */
async function generateArticle(topic, title, category, tags, primaryKeyword, secondaryKeywords) {

  try {
    const userPrompt = buildArticleUserPrompt({
      topic,
      title,
      primaryKeyword,
      secondaryKeywords,
    });
    
    const response = await callOpenAI(ARTICLE_SYSTEM_PROMPT, userPrompt, 4000); // Max tokens for gpt-4-turbo-preview
    let content = response.trim();
    
    // Remove markdown code blocks if present
    content = content.replace(/^```markdown\n?/i, '');
    content = content.replace(/^```\n?/g, '');
    content = content.replace(/\n?```$/g, '');
    content = content.trim();
    
    // Fix encoding artifacts (common issues with Russian text)
    content = content
      .replace(/необхоимого/g, 'необходимого')
      .replace(/техничский/g, 'технический')
      .replace(/исочником/g, 'источником')
      .replace(/[^\x00-\x7F\u0400-\u04FF\u0500-\u052F\s\.,;:!?\-\(\)\[\]{}]/g, ''); // Remove invalid Unicode chars
    
    return content;
  } catch (error) {
    throw new Error(`Failed to generate article: ${error.message}`);
  }
}

/**
 * Call OpenAI API
 */
function callOpenAI(systemPrompt, userPrompt, maxTokens = 2000) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: maxTokens
    });

    const dataBuffer = Buffer.from(data, 'utf8');
    
    const options = {
      hostname: 'api.openai.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Length': dataBuffer.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`OpenAI API error: ${res.statusCode} - ${responseData}`));
          return;
        }

        try {
          const json = JSON.parse(responseData);
          const content = json.choices[0].message.content.trim();
          resolve(content);
        } catch (error) {
          reject(new Error(`Failed to parse OpenAI response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(dataBuffer);
    req.end();
  });
}

/**
 * Transliterate Russian to Latin for slug
 */
function transliterate(text) {
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
    'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
    'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch',
    'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
  };
  
  return text.split('').map(char => map[char] || char).join('');
}

/**
 * Generate slug from text
 */
function generateSlug(text) {
  if (!text) return 'blog-post';
  
  // Transliterate Russian to Latin
  let transliterated = transliterate(text);
  
  let slug = transliterated
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars except word chars, spaces, hyphens
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '')  // Remove leading/trailing hyphens
    .trim();
  
  // If slug is empty or only hyphens, generate from first words
  if (!slug || slug === '-') {
    slug = transliterated
      .toLowerCase()
      .split(/\s+/)
      .slice(0, 6)
      .filter(w => w.length > 2)
      .join('-')
      .replace(/[^\w-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  // Fallback if still empty
  if (!slug || slug === '-') {
    slug = 'blog-post-' + Date.now();
  }
  
  return slug;
}

/**
 * Validate topic and category against allowed lists
 */
function validateTopicAndCategory(topic, category) {
  const aiRulesPath = path.join(process.cwd(), 'scripts', 'ai_rules.json');
  let aiRules = null;
  
  try {
    if (fs.existsSync(aiRulesPath)) {
      aiRules = JSON.parse(fs.readFileSync(aiRulesPath, 'utf8'));
    }
  } catch (error) {
    console.warn('Warning: Could not load ai_rules.json for validation');
    return { valid: true }; // Skip validation if file not found
  }
  
  if (!aiRules) {
    return { valid: true };
  }
  
  const errors = [];
  const warnings = [];
  
  // Check forbidden topics
  if (aiRules.forbidden_topics) {
    const topicLower = topic.toLowerCase();
    for (const forbidden of aiRules.forbidden_topics) {
      if (topicLower.includes(forbidden.toLowerCase())) {
        errors.push(`Тема содержит запрещённое слово: "${forbidden}"`);
      }
    }
  }
  
  // Check forbidden words in topic
  if (aiRules.forbidden_words) {
    const topicLower = topic.toLowerCase();
    for (const forbidden of aiRules.forbidden_words) {
      if (topicLower.includes(forbidden.toLowerCase())) {
        errors.push(`Тема содержит запрещённое слово: "${forbidden}"`);
      }
    }
  }
  
  // Check category
  if (aiRules.allowed_categories && category) {
    const categoryMatch = aiRules.allowed_categories.some(
      allowed => allowed.toLowerCase() === category.toLowerCase()
    );
    if (!categoryMatch) {
      warnings.push(`Категория "${category}" не в списке разрешённых. Рекомендуемые: ${aiRules.allowed_categories.join(', ')}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Main function
 */
async function main() {
  console.log('🤖 Starting AI-powered blog post generation...\n');
  console.log(`📝 Topic: ${topic}`);
  console.log(`📂 Category: ${category}`);
  console.log(`🏷️  Tags: ${tags.join(', ')}\n`);

  // Validate topic and category
  console.log('🔍 Validating topic and category...');
  const validation = validateTopicAndCategory(topic, category);
  
  if (!validation.valid) {
    console.error('\n❌ Validation failed:');
    validation.errors.forEach(error => console.error(`   - ${error}`));
    console.error('\n💡 Please use topics related to production automation, costing, KP, document workflow, integrations, or AI in manufacturing.\n');
    process.exit(1);
  }
  
  if (validation.warnings && validation.warnings.length > 0) {
    console.warn('\n⚠️  Warnings:');
    validation.warnings.forEach(warning => console.warn(`   - ${warning}`));
    console.log('');
  } else {
    console.log('✅ Topic and category validated\n');
  }

  // Check for duplicates before generating
  console.log('🔍 Checking for duplicate topics...');
  const duplicateCheck = checkForDuplicates(topic, title);
  
  if (duplicateCheck.isDuplicate) {
    console.error(`\n❌ Error: Duplicate topic detected!`);
    console.error(`   Similar article: "${duplicateCheck.similarPost.title}"`);
    console.error(`   Published: ${duplicateCheck.similarPost.date} (${duplicateCheck.daysSincePost} days ago)`);
    console.error(`   Similarity: ${Math.floor(duplicateCheck.similarity * 100)}%`);
    console.error(`\n💡 Tip: Wait at least 30 days before generating similar topics, or use a more specific/different topic.\n`);
    process.exit(1);
  }
  
  console.log('✅ No duplicates found\n');

  try {
    // Step 0: Try to load topic data from topics-search-results.json
    let primaryKeyword = null;
    let secondaryKeywords = null;
    const topicData = loadTopicData(topic);
    
    if (topicData) {
      console.log('📊 Found topic data in topics-search-results.json');
      primaryKeyword = topicData.primaryKeyword;
      secondaryKeywords = topicData.secondaryKeywords;
      console.log(`   🔑 Primary keyword: ${primaryKeyword}`);
      if (secondaryKeywords && secondaryKeywords.length > 0) {
        console.log(`   🔑 Secondary keywords: ${secondaryKeywords.join(', ')}`);
      }
      console.log('');
    } else {
      console.log('ℹ️  No topic data found in topics-search-results.json, using topic as primary keyword\n');
      primaryKeyword = topic;
    }

    // Step 1: Generate title if not provided
    let finalTitle = title;
    if (!finalTitle) {
      console.log('📌 Generating title...');
      finalTitle = await generateTitle(topic, category);
      console.log(`✅ Title: ${finalTitle}\n`);
    }

    // Step 2: Generate excerpt
    console.log('📄 Generating excerpt...');
    const excerpt = await generateExcerpt(topic, finalTitle);
    console.log(`✅ Excerpt: ${excerpt}\n`);

    // Step 3: Generate tags
    console.log('🏷️  Generating tags...');
    const finalTags = await generateTags(topic, category);
    console.log(`✅ Tags: ${finalTags.join(', ')}\n`);

    // Step 3.5: Detect internal tags for linking logic
    const internalTags = detectInternalTags(topic, finalTitle, finalTags);
    console.log(`🔗 Internal tags detected: ${internalTags.join(', ')}\n`);

    // Step 4: Generate article content with SEO keywords
    console.log('✍️  Generating SEO-optimized article content (this may take a minute)...');
    let content = await generateArticle(
      topic, 
      finalTitle, 
      category, 
      finalTags,
      primaryKeyword,
      secondaryKeywords
    );
    
    // Step 4.5: Add internal links based on tags
    content = addInternalLinks(content, internalTags, finalTitle);
    
    console.log(`✅ Content generated (${content.length} characters)\n`);

    // Step 5: Create file
    const slug = generateSlug(finalTitle);
    const blogDir = path.join(process.cwd(), 'content/blog');
    const filePath = path.join(blogDir, `${slug}.md`);

    if (fs.existsSync(filePath)) {
      console.error(`❌ Error: Blog post with slug "${slug}" already exists`);
      process.exit(1);
    }

    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    const frontmatter = `---
title: "${finalTitle}"
slug: "${slug}"
date: "${dateStr}"
author: "H-Studio Team"
category: "${category}"
tags: ${JSON.stringify(finalTags)}
excerpt: "${excerpt}"
---

`;

    const fullContent = frontmatter + content;

    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }

    fs.writeFileSync(filePath, fullContent, 'utf8');

    console.log(`✅ Blog post created: ${filePath}`);
    console.log(`📝 Slug: ${slug}`);
    console.log(`📅 Date: ${dateStr}`);
    console.log(`📊 Content length: ${content.length} characters`);
    console.log(`\n✨ Article is ready! Please review before publishing.`);

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();

