#!/usr/bin/env node

/**
 * Script to automatically generate blog posts from topics-search-results.json
 * Usage: node scripts/auto-generate-from-topics.js [--count 1]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const countIndex = args.indexOf('--count');
const count = countIndex !== -1 ? parseInt(args[countIndex + 1]) : 1;

const topicsFile = path.join(process.cwd(), 'topics-search-results.json');

if (!fs.existsSync(topicsFile)) {
  console.error('❌ Error: topics-search-results.json not found');
  console.log('💡 Run topic search first: npm run blog:search-topics');
  process.exit(1);
}

try {
  const topicsData = JSON.parse(fs.readFileSync(topicsFile, 'utf8'));
  
  if (!Array.isArray(topicsData) || topicsData.length === 0) {
    console.error('❌ Error: No topics found in topics-search-results.json');
    process.exit(1);
  }
  
  // Map tags to categories
  const tagToCategory = {
    'costing': 'Себестоимость',
    'quotations': 'Автоматизация',
    'configurators': 'Автоматизация',
    'documents': 'Документооборот',
    'approvals': 'Документооборот',
    '1c': 'Интеграции',
    'erp': 'Интеграции',
    'crm': 'Интеграции',
    'integration': 'Интеграции',
    'ai': 'AI-аналитика',
    'analytics': 'AI-аналитика',
    'automation': 'Автоматизация',
    'manufacturing': 'Производство',
    'engineering': 'Производство'
  };
  
  // Determine category from topic tags
  function determineCategory(topic) {
    if (topic.category) {
      return topic.category;
    }
    
    if (topic.tags && Array.isArray(topic.tags)) {
      for (const tag of topic.tags) {
        if (tagToCategory[tag]) {
          return tagToCategory[tag];
        }
      }
    }
    
    // Default category based on topic content
    const topicLower = (topic.topic || '').toLowerCase();
    if (topicLower.includes('1с') || topicLower.includes('erp') || topicLower.includes('crm') || topicLower.includes('интеграц')) {
      return 'Интеграции';
    }
    if (topicLower.includes('документооборот') || topicLower.includes('согласован')) {
      return 'Документооборот';
    }
    if (topicLower.includes('ai') || topicLower.includes('аналитик') || topicLower.includes('искусственн')) {
      return 'AI-аналитика';
    }
    if (topicLower.includes('себестоимость') || topicLower.includes('расчёт') || topicLower.includes('маржинальность')) {
      return 'Себестоимость';
    }
    
    return 'Автоматизация'; // Default
  }
  
  const selectedTopics = topicsData.slice(0, count);
  
  console.log(`📝 Generating ${selectedTopics.length} blog post(s) from topics-search-results.json...\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < selectedTopics.length; i++) {
    const topic = selectedTopics[i];
    const topicTitle = topic.topic;
    const category = determineCategory(topic);
    
    if (!topicTitle) {
      console.warn(`⚠️  Skipping topic at index ${i}: missing topic title`);
      failCount++;
      continue;
    }
    
    console.log(`\n📄 [${i + 1}/${selectedTopics.length}] Generating: ${topicTitle}`);
    console.log(`📂 Category: ${category}`);
    
    try {
      execSync(
        `npm run blog:generate:ai -- --topic "${topicTitle}" --category "${category}"`,
        { stdio: 'inherit', env: process.env }
      );
      successCount++;
      console.log(`✅ Successfully generated: ${topicTitle}`);
    } catch (error) {
      failCount++;
      console.error(`❌ Failed to generate post for: ${topicTitle}`);
      console.error(`   Error: ${error.message}`);
    }
  }
  
  console.log(`\n\n📊 Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📝 Total: ${selectedTopics.length}`);
  
  if (failCount > 0) {
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

