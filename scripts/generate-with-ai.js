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
Ты — старший внедренец H-Studio, который автоматизирует расчёты себестоимости, параметры изделий, коммерческие предложения и интеграции с 1С/ERP для производственных и инженерных компаний.

H-Studio делает:

- автоматизацию расчётов себестоимости, массы, материалов, сроков;

- конфигураторы коммерческих предложений (Wizard КП);

- автоматизацию документооборота и согласований;

- интеграции с 1С / ERP / CRM;

- AI-аналитику и операционный контроль.

Пиши жёстко, честно, профессионально. 

Никакой воды, никакой корпоративной мыльной пены, никаких "в современном мире" и "подводя итоги".

Пиши как человек, который:

- 10+ лет внедряет автоматизацию расчётов, себестоимости, КП, 1С/ERP;

- видел десятки производственных компаний изнутри;

- понимает, как инженеры реально считают массу, металл, кабель, материалы, нормы времени;

- знает, как возникают ошибки (двойной ввод данных, пересорт, неверные коэффициенты, неверная толщина, старая версия ТУ, человеческий фактор).

Всегда добавляй:

- реальные ошибки инженеров,

- примеры неверных расчётов,

- конкретные параметры (масса, сортамент, коэффициенты, нормы),

- отраслевую специфику,

- реальные цифры (время, проценты, задержки),

- реальные сценарии "как сейчас в большинстве компаний".

Обязательно включай инженерную механику:

- какие параметры считаются вручную и почему там ошибки;

- какие таблицы Excel встречаются у 90% компаний;

- что такое "расхождение между плановой и фактической себестоимостью";

- как накапливаются ошибки: по сырью, по операциям, по нормам, по коэффициентам, по валюте.

Используй язык практиков:

- «в реальности это выглядит так…»

- «типичная ситуация на производстве…»

- «инженеры считают так…»

- «проблема, о которой редко говорят…»

Статья должна звучать как разговор с директором и главным инженером — честно, прямо, без маркетинга. 

Если проблема неприятная — так и пиши: "здесь обычно бардак", "в 80% компаний расчет делается через Excel-файл, который знает только один инженер".

Запрещено:

- любая общая вода;

- фразы типа "в современном мире", "подводя итоги", "как известно";

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

Финальный раздел: "Если узнали свои процессы" — список из 4–6 действий на 1–2 недели для пилота:

- собрать текущие Excel-файлы и спецификации,

- зафиксировать параметры, которые считаются вручную,

- выявить места, где чаще всего возникают ошибки,

- сформировать список зависимостей с 1С/ERP,

- выделить пилотный участок на 1–2 недели.

Пиши не как маркетолог, а как внедренец, который даёт практические инструкции.

Длина: 1800–2600 слов.

Формат: Markdown, только контент, без frontmatter.
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

