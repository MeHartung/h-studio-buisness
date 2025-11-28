#!/usr/bin/env node

/**
 * AI-powered blog post generator
 * Usage: node scripts/generate-with-ai.js --topic "автоматизация КП" --category "Автоматизация"
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

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
  const systemPrompt = `Ты — SEO-копирайтер, специализирующийся на мета-описаниях.`;

  const userPrompt = `Создай мета-описание (excerpt) для статьи "${title}" на тему "${topic}".

Требования:
- Длина: 150-160 символов
- Включает ключевые слова естественным образом
- Привлекательное и информативное
- Содержит призыв к действию или ценность для читателя
- Без кавычек

Верни только мета-описание, без дополнительного текста.`;

  try {
    const response = await callOpenAI(systemPrompt, userPrompt);
    return response.trim().replace(/^["']|["']$/g, '');
  } catch (error) {
    console.warn('Warning: Failed to generate excerpt, using default');
    return `Статья о ${topic.toLowerCase()} для производственных и инженерных компаний.`;
  }
}

/**
 * Generate tags using AI
 */
async function generateTags(topic, category) {
  const systemPrompt = `Ты — эксперт по SEO и тегированию контента.`;

  const userPrompt = `На основе темы "${topic}" и категории "${category}" предложи 5-7 релевантных тегов для статьи.

Требования:
- Теги должны быть релевантны теме
- Используй популярные теги из области автоматизации производства
- Включи как общие, так и специфические теги
- Теги на русском языке, в нижнем регистре

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
Ты — старший консультант по автоматизации для производственных и инженерных компаний и одновременно SEO-копирайтер H-Studio.

H-Studio делает:

- автоматизацию расчётов себестоимости, массы, материалов, сроков;

- конфигураторы коммерческих предложений (Wizard КП);

- автоматизацию документооборота и согласований;

- интеграции с 1С / ERP / CRM;

- AI-аналитику и операционный контроль.

Пиши от лица H-Studio, как практик, который реально внедряет такие системы на заводах и в инженерных компаниях.

Стиль:

- конкретный, деловой, без воды;

- минимум общих фраз вида "в современном мире", "в заключение", "подведём итог";

- больше реальных ситуаций: как у них сейчас, как можно сделать, что для этого требуется.

Обязательные принципы:

- Писать для директора, собственника, главного инженера, руководителя отдела продаж/производства.

- В каждом тексте должны быть:

  - реальные сценарии ("как это выглядит у типичной компании");

  - примеры с цифрами (время, проценты, деньги);

  - разбор рисков и типичных ошибок;

  - понятный следующий шаг: что делать компании, если она узнала себя в описании.

Категорически НЕ используй:

- заголовки "Заключение", "Введение";

- фразы "в современном мире", "на сегодняшний день", "как известно";

- шаблонные обороты корпоративного буллшита.

Используй нормальный живой деловой русский язык, как если бы ты объяснял всё в переписке или на созвоне с директором завода.
`.trim();

function buildArticleUserPrompt({
  topic,
  title,
  primaryKeyword,
  secondaryKeywords,
}) {
  return `
Напиши подробную SEO-статью на русском языке для блога H-Studio.

Тема: "${topic}"

Рабочий заголовок: "${title || topic}"

Основной поисковый запрос: "${primaryKeyword || topic}"

Дополнительные запросы: ${secondaryKeywords && secondaryKeywords.length ? secondaryKeywords.join(', ') : 'подбери по смыслу в рамках темы'}

Требования к статье:

1) Объём и структура

- Длина: 1800–2600 слов.

- Формат: Markdown.

- Структура:

  - H1 — продающий заголовок с основным ключом.

  - Короткое вступление 2–4 предложения: без общих фраз, сразу в реальность производителя ("как это обычно устроено" / "в чём боль").

  - Далее 4–7 разделов (H2), внутри — H3, где нужно.

  - Последний раздел НЕ должен называться "Заключение". Используй заголовки типа:

    - "Что делать компании, если узнали себя"

    - "С чего начать внедрение"

    - "Как подойти к выбору системы на практике".

2) Содержание (очень важно)

Обязательно включи в статью:

- Раздел про текущую реальность:

  - как компании обычно считают (Excel, головы инженеров, 1С с кучей ручных действий);

  - к чему это приводит: задержки, ошибки, продажи ниже себестоимости, конфликты между отделами.

- Раздел с критерием выбора / разбором вариантов:

  - "жить как есть", Excel/1С + ручные костыли,

  - типовое коробочное решение,

  - кастомная автоматизация (как у H-Studio);

  - когда какой вариант оправдан.

- Один или два конкретных мини-кейса:

  - отрасль (металлоконструкции, кабель, окна/двери, оборудование и т.п.);

  - как было (цифры: время на расчёт, количество КП, % ошибок, проблемы);

  - что внедрили (какие блоки: расчёт, КП, спецификации, интеграции);

  - что стало (цифры: время, ошибки, экономия, рост маржи или производительности).

- Раздел про риски и типичные ошибки:

  - какие решения выбирают "по привычке" и почему они не выстреливают;

  - что компании недооценивают (качество исходных данных, участие инженеров, интеграции с 1С/ERP, обучение людей).

- Раздел "как это выглядит по шагам":

  - анализ текущих процессов;

  - проектирование конфигуратора/системы;

  - разработка и интеграции;

  - пилот и обучение;

  - тиражирование и поддержка.

3) SEO-требования

- Основной ключевой запрос:

  - использовать в H1,

  - использовать 1–2 раза в H2/H3,

  - упоминать в тексте естественно (1–3% плотности, без навязчивого повторения).

- Дополнительные запросы вплетать в текст естественно:

  - отдельно не выделять жирным;

  - не делать "простыню ключевиков".

- Добавь небольшой маркированный список или таблицу с критериями выбора/сравнения, если уместно.

4) Стиль

- Никаких "водянистых" фраз ради объёма — лучше меньше, но конкретнее.

- Пиши так, чтобы директор, пробежав глазами, понимал:

  - "это про нас",

  - "вот наша боль",

  - "вот как это можно решить",

  - "здесь понимают производство, а не просто пишут статьи".

- Избегай излишне академических объяснений — это практическая статья, а не учебник.

5) Финальный блок (обязательно)

В конце статьи добавь отдельный раздел (H2 или H3) с заголовком вида:

"Что делать, если вы узнали свою компанию"

Внутри:

- 3–5 конкретных шагов, что можно сделать уже сейчас (собрать данные, описать текущие расчёты, выделить пилотный участок и т.п.);

- аккуратный, но понятный призыв к действию с привязкой к H-Studio, например:

"Если вы хотите оценить, что именно можно автоматизировать в ваших расчётах и КП, оставьте заявку на разбор процессов. Мы пройдёмся по вашим кейсам, покажем, где теряется время и маржа, и предложим несколько сценариев внедрения — без навязывания лишних модулей."

Выведи только Markdown-контент статьи, без frontmatter.
`.trim();
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
    
    const response = await callOpenAI(ARTICLE_SYSTEM_PROMPT, userPrompt, 4000);
    let content = response.trim();
    
    // Remove markdown code blocks if present
    content = content.replace(/^```markdown\n?/i, '');
    content = content.replace(/^```\n?/g, '');
    content = content.replace(/\n?```$/g, '');
    content = content.trim();
    
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
 * Generate slug from text
 */
function generateSlug(text) {
  if (!text) return 'blog-post';
  
  let slug = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars except word chars, spaces, hyphens
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '')  // Remove leading/trailing hyphens
    .trim();
  
  // If slug is empty or only hyphens, generate from first words
  if (!slug || slug === '-') {
    slug = text
      .toLowerCase()
      .split(/\s+/)
      .slice(0, 5)
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

    // Step 4: Generate article content with SEO keywords
    console.log('✍️  Generating SEO-optimized article content (this may take a minute)...');
    const content = await generateArticle(
      topic, 
      finalTitle, 
      category, 
      finalTags,
      primaryKeyword,
      secondaryKeywords
    );
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

