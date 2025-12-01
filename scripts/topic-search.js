#!/usr/bin/env node

/**
 * Script to search for relevant blog topics using AI
 * Usage: node scripts/topic-search.js --query "автоматизация КП" --count 10
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const queryIndex = args.indexOf('--query');
const countIndex = args.indexOf('--count');

const query = queryIndex !== -1 ? args[queryIndex + 1] : 'автоматизация расчётов и КП';
const count = countIndex !== -1 ? parseInt(args[countIndex + 1]) : 10;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is not set');
  console.log('Set it in .env file or export it: export OPENAI_API_KEY=your_key');
  process.exit(1);
}

// SEO Topic Pillars
const SEO_TOPIC_PILLARS = [
  // Основные направления
  'автоматизация расчётов себестоимости',
  'автоматизация коммерческих предложений (КП)',
  'конфигураторы КП и расчётов',
  'автоматизация документооборота и согласований',
  'интеграции с 1С, ERP и CRM в производстве',
  'AI-аналитика и операционный контроль в производственных компаниях',
  'оптимизация работы инженеров и техотдела',
  'цифровизация производственных компаний',
];

// Теги для фильтрации и классификации тем
const TAGS = [
  'manufacturing',     // производство
  'engineering',       // инженерные компании
  'costing',           // себестоимость
  'quotations',        // КП
  'configurators',     // конфигураторы
  'documents',         // документооборот
  'approvals',         // согласования
  '1c',                // 1С
  'erp',               // ERP
  'crm',               // CRM
  'ai',                // AI
  'analytics',         // аналитика
  'automation',        // автоматизация
  'integration'        // интеграции
];

const SYSTEM_PROMPT = `
Ты — SEO-стратег и редактор блога для сайта H-Studio.

H-Studio занимается:
- автоматизацией расчётов, себестоимости и КП,
- конфигураторами КП и расчётов,
- автоматизацией документооборота и согласований,
- интеграциями с 1С / ERP / CRM,
- AI-аналитикой для производственных и инженерных компаний.

РАЗРЕШЁННЫЕ ТЕМАТИКИ (строго только эти):

1. Автоматизация расчётов: автоматизация расчётов себестоимости, автоматизация параметров изделий, расчёт массы/материалов/сроков, контроль ошибок в расчётах, маржинальность и управление затратами

2. Автоматизация коммерческих предложений: автоматизация КП, генерация спецификаций, PDF-документы, маржинальность в КП

3. Документооборот и согласования: цифровизация документооборота, маршруты согласований, управление версиями документов, устранение ошибок в документах

4. Интеграции: интеграция 1С, интеграция ERP, интеграция CRM, обмен данными между системами

5. AI в производстве: AI-оценка себестоимости, AI-аналитика производства, выявление узких мест через ML

6. Управление эффективностью производства: повышение маржинальности, ускорение подготовки КП, устранение ошибок в расчётах, оптимизация проектных работ

ЗАПРЕЩЕНО предлагать темы про:
- Next.js, React, Netlify, веб-разработку
- маркетинг, performance, A/B-тесты
- DevOps, CI/CD, GitHub Actions
- Kubernetes
- безопасность веб-приложений
- любые сайты, дизайн, контент-менеджмент
- Bali, Berin, стартапы
- e-commerce, рестораны, магазины, сервисы, SaaS (только производство)

Цель — подобрать темы статей, которые:
- дают органический трафик из Яндекс и Google,
- отражают реальные боли производственных и инженерных компаний,
- имеют коммерческий потенциал (лиды на внедрение и проекты),
- логично продолжают и усиливают текущий лендинг H-Studio.

Логика отбора тем:

ДА темам, где:
- расчёт, себестоимость, маржа, цены
- коммерческие предложения, калькуляторы, конфигураторы
- документооборот, согласования, статусы, PDF
- интеграция с 1С / ERP / CRM
- аналитика по производству, AI для анализа операций
- внедрение IT/автоматизации в производстве

НЕТ темам, где:
- чисто технические туториалы для разработчиков
- DevOps чисто инфраструктурный без связи с производством
- маркетинг в B2C, e-com не для производства
- HR, рекрутинг, «цифровизация вообще» без привязки к расчётам/КП/документам
- веб-разработка, фронтенд, Next.js, React
- CI/CD, GitHub Actions, Kubernetes
`.trim();

function buildUserPrompt(query, count) {
  return `
Сгенерируй список из ${count} тем для блога на русском языке.

Основные требования:
- Темы должны быть связаны с запросом: "${query}" и с такими направлениями, как:
  ${SEO_TOPIC_PILLARS.map((p) => `- ${p}`).join('\n  ')}

- Для каждой темы сразу думай как SEO: под какие реальные поисковые запросы в Яндексе и Google её будут искать.

- Учитывай реальную аудиторию: директора, собственники, главные инженеры, руководители отделов продаж и производства.

- Нас интересуют и информационные запросы, и коммерческие (выбор подрядчика, внедрение, сравнение решений).

Верни ответ в JSON-массиве, без лишнего текста, формат элементов такой:

[
  {
    "topic": "Чёткий заголовок статьи",
    "primaryKeyword": "основной поисковый запрос",
    "secondaryKeywords": ["ключ 1", "ключ 2", "ключ 3"],
    "intent": "informational | commercial | mixed",
    "targetAudience": "директор завода | главный инженер | руководитель отдела продаж",
    "whyImportant": "кратко, почему тема важна и какие боли закрывает",
    "recommendedArticleType": "гайд | кейс | обзор | список | FAQ",
    "internalLinkIdea": "на какую секцию/услугу H-Studio логично вести из статьи",
    "tags": ["manufacturing", "costing", "quotations"]
  }
]

ВАЖНО: Поле "tags" ОБЯЗАТЕЛЬНО. Выбери 2-4 тега из списка: manufacturing, engineering, costing, quotations, configurators, documents, approvals, 1c, erp, crm, ai, analytics, automation, integration.

Выбор тегов:
- manufacturing - если тема про производство, заводы, предприятия
- engineering - если тема про инженерные компании, техотдел
- costing - если тема про себестоимость, расчёты, маржу
- quotations - если тема про КП, коммерческие предложения
- configurators - если тема про конфигураторы КП
- documents - если тема про документооборот
- approvals - если тема про согласования
- 1c - если тема про 1С
- erp - если тема про ERP системы
- crm - если тема про CRM
- ai - если тема про AI, искусственный интеллект
- analytics - если тема про аналитику, дашборды
- automation - если тема про автоматизацию
- integration - если тема про интеграции

Темы должны быть максимально прикладными, понятными людям из производства и инженерии, без абстрактного консалтингового буллшита.
`.trim();
}

/**
 * Search for topics using OpenAI
 */
async function searchTopics(query, count) {

  try {
    const userPrompt = buildUserPrompt(query, count);
    const response = await callOpenAI(SYSTEM_PROMPT, userPrompt);
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/```\n([\s\S]*?)\n```/);
    const jsonContent = jsonMatch ? jsonMatch[1] : response;
    
    const topics = JSON.parse(jsonContent);
    
    // Validate structure
    if (!Array.isArray(topics)) {
      throw new Error('Response is not an array');
    }
    
    // Validate each topic has required fields
    topics.forEach((topic, index) => {
      if (!topic.topic || !topic.primaryKeyword) {
        throw new Error(`Topic at index ${index} is missing required fields (topic, primaryKeyword)`);
      }
    });
    
    return topics;
  } catch (error) {
    console.error('Error searching topics:', error.message);
    throw error;
  }
}

/**
 * Call OpenAI API
 */
function callOpenAI(systemPrompt, userPrompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
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
          
          // Extract JSON from markdown code blocks if present
          const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
          const jsonContent = jsonMatch ? jsonMatch[1] : content;
          
          resolve(jsonContent);
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
 * Main function
 */
async function main() {
  console.log(`🔍 Searching topics for: "${query}"`);
  console.log(`📊 Requested count: ${count}\n`);

  try {
    const topics = await searchTopics(query, count);
    
    console.log(`✅ Found ${topics.length} topics:\n`);
    
    topics.forEach((topic, index) => {
      console.log(`${index + 1}. ${topic.topic}`);
      console.log(`   🔑 Основной ключ: ${topic.primaryKeyword}`);
      if (topic.secondaryKeywords && topic.secondaryKeywords.length > 0) {
        console.log(`   🔑 Доп. ключи: ${topic.secondaryKeywords.join(', ')}`);
      }
      console.log(`   🎯 Интент: ${topic.intent || 'mixed'}`);
      console.log(`   👥 Аудитория: ${topic.targetAudience || 'не указана'}`);
      console.log(`   📝 Важность: ${topic.whyImportant || 'не указано'}`);
      console.log(`   📄 Тип статьи: ${topic.recommendedArticleType || 'гайд'}`);
      console.log(`   🔗 Внутренняя ссылка: ${topic.internalLinkIdea || 'не указана'}`);
      console.log('');
    });

    // Save to file
    const fs = require('fs');
    const path = require('path');
    const outputPath = path.join(process.cwd(), 'topics-search-results.json');
    fs.writeFileSync(outputPath, JSON.stringify(topics, null, 2), 'utf8');
    console.log(`💾 Results saved to: ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();

