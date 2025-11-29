#!/usr/bin/env node

/**
 * Скрипт для получения chat_id из Telegram бота
 * 
 * Использование:
 *   node scripts/get-telegram-chat-id.js
 * 
 * Требуется:
 *   - TELEGRAM_BOT_TOKEN в .env.local или .env
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Читаем .env файлы
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  const env = {};
  
  envFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      content.split('\n').forEach(line => {
        const match = line.match(/^([^=:#]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim().replace(/^["']|["']$/g, '');
          if (!env[key]) {
            env[key] = value;
          }
        }
      });
    }
  });
  
  return env;
}

const env = loadEnv();

const botToken = env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;

if (!botToken) {
  console.error('❌ Ошибка: TELEGRAM_BOT_TOKEN не найден в .env.local или .env');
  console.log('\n📝 Добавьте в .env.local:');
  console.log('   TELEGRAM_BOT_TOKEN=ваш_токен_бота\n');
  process.exit(1);
}

async function getBotInfo() {
  return new Promise((resolve, reject) => {
    const url = `https://api.telegram.org/bot${botToken}/getMe`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

async function getUpdates(offset = 0) {
  return new Promise((resolve, reject) => {
    const url = `https://api.telegram.org/bot${botToken}/getUpdates?offset=${offset}&limit=100`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🔍 Проверяю токен бота...\n');
  
  try {
    // Проверяем токен
    const botInfo = await getBotInfo();
    
    if (!botInfo.ok) {
      console.error('❌ Ошибка: Неверный токен бота');
      console.error('   Проверьте TELEGRAM_BOT_TOKEN в .env.local\n');
      process.exit(1);
    }
    
    console.log('✅ Бот найден:');
    console.log(`   Имя: ${botInfo.result.first_name}`);
    console.log(`   Username: @${botInfo.result.username}`);
    console.log(`   ID: ${botInfo.result.id}\n`);
    
    // Получаем обновления (пробуем несколько раз с задержкой)
    console.log('🔍 Ищу chat_id...\n');
    let updates = await getUpdates();
    
    // Если нет обновлений, ждем немного и пробуем еще раз
    if (!updates.result || updates.result.length === 0) {
      console.log('⏳ Жду 2 секунды и проверяю снова...\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
      updates = await getUpdates();
    }
    
    if (!updates.ok) {
      console.error('❌ Ошибка при получении обновлений:', updates.description);
      process.exit(1);
    }
    
    if (!updates.result || updates.result.length === 0) {
      console.log('⚠️  Сообщений от бота пока нет.\n');
      console.log('📋 Инструкция:');
      console.log('   1. Откройте Telegram');
      console.log('   2. Найдите вашего бота: @' + botInfo.result.username);
      console.log('   3. Напишите ему любое сообщение (например: /start или "Привет")');
      console.log('   4. Запустите этот скрипт снова: node scripts/get-telegram-chat-id.js\n');
      process.exit(0);
    }
    
    // Извлекаем chat_id
    const chatIds = new Map();
    
    updates.result.forEach((update) => {
      if (update.message && update.message.chat) {
        const chat = update.message.chat;
        const chatId = chat.id.toString();
        
        if (!chatIds.has(chatId)) {
          chatIds.set(chatId, {
            id: chat.id,
            username: chat.username,
            first_name: chat.first_name,
            type: chat.type
          });
        }
      }
    });
    
    if (chatIds.size === 0) {
      console.log('⚠️  Chat ID не найден в обновлениях.\n');
      console.log('📋 Попробуйте:');
      console.log('   1. Написать боту сообщение');
      console.log('   2. Запустить скрипт снова\n');
      process.exit(0);
    }
    
    console.log('✅ Найденные chat_id:\n');
    
    chatIds.forEach((chat, chatId) => {
      console.log(`   Chat ID: ${chat.id}`);
      console.log(`   Тип: ${chat.type}`);
      if (chat.username) {
        console.log(`   Username: @${chat.username}`);
      }
      if (chat.first_name) {
        console.log(`   Имя: ${chat.first_name}`);
      }
      console.log('');
    });
    
    const firstChatId = Array.from(chatIds.values())[0].id;
    
    console.log('📝 Добавьте в .env.local:');
    console.log(`   TELEGRAM_CHAT_ID=${firstChatId}\n`);
    console.log('💡 Используйте первый chat_id из списка выше.\n');
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

main();

