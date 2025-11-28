#!/usr/bin/env node

/**
 * Script to generate blog posts using AI
 * Usage: node scripts/generate-blog-post.js --topic "автоматизация КП" --category "Автоматизация" [--ai]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get command line arguments
const args = process.argv.slice(2);
const topicIndex = args.indexOf('--topic');
const titleIndex = args.indexOf('--title');
const categoryIndex = args.indexOf('--category');
const tagsIndex = args.indexOf('--tags');

const topic = topicIndex !== -1 ? args[topicIndex + 1] : null;
const title = titleIndex !== -1 ? args[titleIndex + 1] : null;
const category = categoryIndex !== -1 ? args[categoryIndex + 1] : 'Автоматизация';
const tags = tagsIndex !== -1 ? args[tagsIndex + 1].split(',') : ['автоматизация'];
const useAI = args.includes('--ai');

if (!topic) {
  console.error('Error: --topic is required');
  console.log('Usage: node scripts/generate-blog-post.js --topic "your topic" [--title "title"] [--category "category"] [--tags "tag1,tag2"] [--ai]');
  console.log('\nOptions:');
  console.log('  --ai    Use AI to generate full article content (requires OPENAI_API_KEY)');
  process.exit(1);
}

// If --ai flag is set, use AI generator
if (useAI) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY is required when using --ai flag');
    console.log('Set it in .env file or export it: export OPENAI_API_KEY=your_key');
    process.exit(1);
  }
  
  console.log('🤖 Using AI-powered generator...\n');
  try {
    execSync(`node scripts/generate-with-ai.js --topic "${topic}" --category "${category}" ${title ? `--title "${title}"` : ''} ${tags.length > 0 ? `--tags "${tags.join(',')}"` : ''}`, {
      stdio: 'inherit',
      env: { ...process.env, OPENAI_API_KEY }
    });
    process.exit(0);
  } catch (error) {
    console.error('Error running AI generator:', error.message);
    process.exit(1);
  }
}

// Generate slug from title or topic
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const slug = title ? generateSlug(title) : generateSlug(topic);
const blogDir = path.join(process.cwd(), 'content/blog');
const filePath = path.join(blogDir, `${slug}.md`);

// Check if file already exists
if (fs.existsSync(filePath)) {
  console.error(`Error: Blog post with slug "${slug}" already exists`);
  process.exit(1);
}

// Generate date
const today = new Date();
const dateStr = today.toISOString().split('T')[0];

// Generate frontmatter
const frontmatter = `---
title: "${title || topic}"
slug: "${slug}"
date: "${dateStr}"
author: "H-Studio Team"
category: "${category}"
tags: ${JSON.stringify(tags)}
excerpt: "Статья о ${topic.toLowerCase()} для производственных и инженерных компаний."
---

# ${title || topic}

> **Примечание:** Этот пост был автоматически сгенерирован. Пожалуйста, отредактируйте содержимое перед публикацией.

## Введение

В этой статье мы рассмотрим ${topic.toLowerCase()} и как это может помочь производственным и инженерным компаниям.

## Основные моменты

- Автоматизация процессов
- Повышение эффективности
- Сокращение ошибок

## Заключение

${topic} — это важный аспект современного производства. Внедрение автоматизации позволяет компаниям работать быстрее и эффективнее.

Хотите узнать больше? [Свяжитесь с нами](/contact) для консультации.
`;

// Ensure blog directory exists
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

// Write file
fs.writeFileSync(filePath, frontmatter, 'utf8');

console.log(`✅ Blog post created: ${filePath}`);
console.log(`📝 Slug: ${slug}`);
console.log(`📅 Date: ${dateStr}`);
console.log(`\n⚠️  Please edit the content before publishing!`);

