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
Ты — SEO-копирайтер и технический автор для H-Studio.

H-Studio делает:
- автоматизацию расчётов себестоимости, массы, материалов, сроков;
- конфигураторы коммерческих предложений (Wizard КП);
- автоматизацию документооборота и согласований;
- интеграции с 1С / ERP / CRM;
- AI-аналитику для производственных и инженерных компаний.

Целевая аудитория:
- собственники и директора производственных компаний,
- главные инженеры и руководители техотделов,
- руководители отделов продаж в B2B-производстве.

Тон:
- профессиональный и экспертный,
- без воды, ближе к реальным процессам и боли бизнеса,
- с примерами, цифрами, понятными сценариями.
`.trim();

function buildArticleUserPrompt({
  topic,
  title,
  primaryKeyword,
  secondaryKeywords,
}) {
  return `
Напиши SEO-оптимизированную статью на русском языке для блога H-Studio.

Тема: "${topic}"
Заголовок (ориентир): "${title || topic}"
Основной ключевой запрос: "${primaryKeyword || topic}"
Дополнительные ключи: ${secondaryKeywords && secondaryKeywords.length ? secondaryKeywords.join(', ') : 'подбери сам по смыслу'}

Требования:
- Длина: 1500–2500 слов.
- Структура: H1, вступление, 3–6 разделов (H2/H3), вывод.
- Обязательно использовать основной ключевой запрос в:
  - H1,
  - 1–2 подзаголовках,
  - тексте, но без переспама (1–3% плотность).
- Дополнительные ключи — естественно, по смыслу, без явной "портянки".
- Обязательно показать:
  - конкретные боли производственных и инженерных компаний,
  - чем плохи "ручные" процессы (Excel, Word, расчёты в голове/на листке),
  - как выглядит жизнь "после" автоматизации (цифры, примеры, сценарии),
  - где в таких задачах помогает H-Studio (автоматизация расчётов, КП, документооборот, интеграции с 1С/ERP/CRM, AI-аналитика).

Структура статьи:
1. Вступление: кратко описать проблему и контекст (производство, инженерия).
2. Раздел 1: Разбор текущей реальности (как сейчас делают, в чём хаос и ошибки).
3. Раздел 2: Чётко объяснить, что такое автоматизация/конфигуратор/система в контексте темы.
4. Раздел 3: Практические примеры (кейсы/сценарии), желательно с цифрами.
5. Раздел 4: Этапы внедрения: что нужно сделать компании, чтобы прийти к результату.
6. Раздел 5: Риски, ошибки и как их избежать.
7. Заключение: резюме пользы, акцент на экономию времени/денег и снижение ошибок.

Обязательно:
- Писать в Markdown с корректной иерархией заголовков (H2, H3).
- Не использовать канцелярит и абстрактный "цифровой трансформационный" буллшит.
- Делать акцент на измеримых результатах (минуты/часы, проценты ошибок, количество КП, нагрузка на инженеров).
- В конце добавить явный призыв к действию вида:

"Хотите понять, сколько времени и денег можно сэкономить в вашей компании? Оставьте заявку на бесплатный разбор процессов — мы покажем цифры по вашим данным."

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
    return response.trim();
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
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
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

