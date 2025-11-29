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
  
  // Маппинг тегов на ссылки
  const linkMap = {
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
  
  // Определяем, какие ссылки добавить
  const tagsToLink = new Set();
  
  if (internalTags.includes('costing') || internalTags.includes('quotations') || 
      text.includes('кп') || text.includes('коммерческ')) {
    if (internalTags.includes('costing')) tagsToLink.add('costing');
    if (internalTags.includes('quotations') || internalTags.includes('configurators')) {
      tagsToLink.add('quotations');
    }
  }
  
  if (internalTags.includes('documents') || internalTags.includes('approvals')) {
    tagsToLink.add('documents');
  }
  
  if (internalTags.includes('1c') || internalTags.includes('erp') || internalTags.includes('integration')) {
    tagsToLink.add('integration');
  }
  
  if (internalTags.includes('ai') || internalTags.includes('analytics')) {
    tagsToLink.add('ai');
  }
  
  if (internalTags.includes('implementation')) {
    tagsToLink.add('implementation');
  }
  
  // Формируем блок ссылок
  if (tagsToLink.size > 0) {
    const linkTexts = Array.from(tagsToLink)
      .map(tag => linkMap[tag])
      .filter(Boolean)
      .map(link => `[${link.text}](${link.url})`)
      .join(', ');
    
    if (linkTexts) {
      links.push(`\n\n**Связанные услуги:** ${linkTexts}`);
    }
  }
  
  return content + links.join('');
}

/**
 * Generate tags using AI
 */
async function generateTags(topic, category) {
  const systemPrompt = `Ты — эксперт по SEO и тегированию контента для производственных и инженерных компаний.`;

  const userPrompt = `На основе темы "${topic}" и категории "${category}" предложи 5-7 релевантных тегов для статьи.

Требования:
- Теги должны быть релевантны теме
- Используй популярные теги из области автоматизации производства, расчётов, КП, документооборота
- Включи как общие, так и специфические теги
- Теги на русском языке, в нижнем регистре
- Приоритет темам: расчёты, себестоимость, КП, документооборот, 1С/ERP, AI

Верни только JSON массив строк, например: ["тег1", "тег2", "тег3"]
Без дополнительного текста.`;

  try {
    const response = await callOpenAI(systemPrompt, userPrompt);
    const jsonMatch = response.match(/\[.*?\]/);
    if (jsonMatch) {
      const tagsArray = JSON.parse(jsonMatch[0]);
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

Пиши статьи как технический директор интеграционной компании. Избегай маркетинговых фраз и слабых обобщений. Все статьи должны быть конкретными, с инженерной глубиной, механикой процессов, ошибками, примерами, формулами и реальными производственными ситуациями.

Тон: прямой, экспертный, инженерный. Как консультант, внедрявший десятки систем на производстве. Никаких "в современном мире", "давайте разберёмся", "подведём итог", "таким образом", "в итоге", "разберёмся".

Статья должна содержать *конкретные инженерные детали*: формулы, параметры, типовые ошибки, реальные производственные сценарии. Не писать обобщений вроде "в современном мире". Каждое утверждение — через практический пример.

Каждый пример должен быть конкретным: отрасль, процесс, тип оборудования, тип расчёта, тип ошибки и финансовые последствия. Не писать абстрактные кейсы.

Избегай маркетинговых фраз типа "повысьте эффективность", "оптимизируйте бизнес", "современные решения". Пиши как консультант, который 10 лет внедряет системы на производствах.

Если абзац не несёт фактической информации, не содержит примера, формулы или конкретного шага — не писать его.

Структура статьи (режим ICP_PLAY, 900-1200 слов):

1) Крюк / контекст (2-3 абзаца)
   Как выглядит жизнь производства сейчас: Excel, письма, расчёты в голове инженера. Конкретная ситуация, в которой директор узнает себя.

2) Симптомы (5–7 маркеров)
   По которым директор узнает себя:
   - заявки ждут КП по 2–3 дня
   - разные менеджеры считают по-разному
   - маржа «гуляет»
   - ошибки всплывают на этапе производства или у клиента
   - согласования занимают недели
   Каждый симптом — с конкретными цифрами и примерами.

3) Риски и деньги
   Потерянная прибыль, продано ниже себестоимости, лишние люди в цепочке. Конкретные суммы и проценты.

4) Как работает автоматизированная схема
   Без кода, бизнес-языком: параметры → расчёт → КП → спецификация → 1С/ERP → согласование. Простая схема процесса.

5) Quick wins (7–14 дней)
   3–5 конкретных шагов, которые можно сделать без полной системы:
   - унифицировать Excel
   - описать правила
   - собрать текущие расчёты в одно место
   - зафиксировать типичные ошибки
   - выделить пилотный участок

6) Mini-case / пример
   1–2 абзаца с цифрами: было / стало. Отрасль, процесс, результаты.

7) KPI и как измерить успех
   Показатели до и после: время, ошибки, маржа, загрузка команды. Конкретные метрики.

8) Мягкий CTA
   Не «закажите у нас», а что-то вроде:
   «Если хотите, можем посмотреть ваши текущие расчёты и показать, что можно автоматизировать за 2–3 недели.»

SEO: включать ключевые слова естественно, 1–2 раза в каждом разделе. Заголовки H2/H3 должны содержать варьированные ключи. Не переспамливать.

Минимум: 1800 слов, 12–18 абзацев. Каждый абзац — плотный, информативный, с конкретикой.

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
- шаблонные обороты корпоративного буллшита.

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

Структура:

- короткое вступление без воды (2–4 предложения, сразу в реальность производителя),

- 4–7 разделов (H2), внутри H3 по необходимости,

- минимум один кейс с цифрами,

- минимум один пример реального просчёта,

- таблица критериев выбора или список конкретных параметров.

В каждом разделе:

- объясняй механику расчётов (как инженеры реально считают массу, металл, кабель, материалы, нормы времени, допуски, коэффициенты),

- описывай реальные инженерные процессы (какие параметры считаются вручную и почему там ошибки),

- показывай, что конкретно ломается и почему (перепутанный сортамент, старая цена металла, забытый коэффициент расхода, неверный радиус гиба, старая версия ТУ, ручное округление),

- сравнивай варианты (ручной расчёт, Excel, 1С-костыли, кастомная автоматика),

- приведи конкретные производственные ситуации (металлоконструкции, кабель, окна/двери, оборудование, трубопроводная продукция, шкафы/щиты),

- дай реальные цифры (время, ошибки в %, повторные перерасчёты, задержки, потери маржи).

ОБЯЗАТЕЛЬНО включи:

- один мини-кейс по отрасли с конкретными параметрами и расчётами:

  - отрасль (металлоконструкции, кабель, окна/двери, оборудование и т.п.);

  - как было (цифры: время на расчёт, количество КП, % ошибок, проблемы);

  - что внедрили (какие блоки: расчёт, КП, спецификации, интеграции);

  - что стало (цифры: время, ошибки, экономия, рост маржи или производительности);

- один пример ошибки (как инженер посчитал неправильно, что пошло не так, какие последствия);

- таблица или структурный список: что сравнивать при выборе системы (железные критерии).

SEO-требования:

- Основной ключевой запрос использовать в H1, 1–2 раза в H2/H3, упоминать в тексте естественно (1–3% плотности).

- Дополнительные запросы вплетать в текст естественно, без навязчивого повторения.

Запрещено:

- общие фразы,

- "Заключение",

- разговоры ни о чём,

- пересказ одного и того же,

- фразы "в современном мире", "подводя итоги", "как известно",

- абзацы без цифр, фактов, примеров.

Финальный раздел: "Что делать завтра" — список из 5–7 конкретных шагов, которые компания может сделать за 24 часа:

- собрать текущие Excel-файлы и спецификации,

- зафиксировать параметры, которые считаются вручную,

- выявить места, где чаще всего возникают ошибки,

- сформировать список зависимостей с 1С/ERP,

- выделить пилотный участок,

- описать текущий процесс расчёта по шагам,

- зафиксировать типичные ошибки и их последствия.

Пиши не как маркетолог, а как внедренец, который даёт практические инструкции.

Перед финалом обязательно вставь блок "Что делать завтра" — список из 5–7 конкретных шагов, которые компания может сделать за 24 часа, чтобы улучшить ситуацию.

Длина: 900-1200 слов (режим ICP_PLAY). Статья должна быть плотной, без воды. Каждый раздел — конкретика, цифры, примеры. Если получается короче — расширь разделы примерами и деталями.

Формат: Markdown, только контент, без frontmatter.

ВАЖНО: Статья должна быть объёмной и глубокой. Каждый раздел должен содержать минимум 3–4 абзаца с конкретной информацией. Не сокращай материал ради краткости. Добавляй детали, примеры, цифры, формулы, реальные ситуации.

Обязательно включи заключительный раздел (без заголовка "Заключение") — краткое резюме ключевых моментов и практических выводов для директора и главного инженера.
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
 * Main function
 */
async function main() {
  console.log('🤖 Starting AI-powered blog post generation...\n');
  console.log(`📝 Topic: ${topic}`);
  console.log(`📂 Category: ${category}`);
  console.log(`🏷️  Tags: ${tags.join(', ')}\n`);

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

