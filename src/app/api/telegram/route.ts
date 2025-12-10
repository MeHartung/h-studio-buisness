import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Валидация данных
    const { name, email, phone, company, message } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'missing_fields',
          details: 'Name, email, and message are required' 
        },
        { status: 400 }
      );
    }
    
    // Получаем настройки Telegram из переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
      console.error('❌ Telegram credentials not configured');
      return NextResponse.json(
        { 
          ok: false, 
          error: 'telegram_not_configured',
          details: 'Telegram bot is not configured' 
        },
        { status: 500 }
      );
    }
    
    // Домен сайта
    const domain = 'www.h-studio-tech.ru';
    
    // Формируем сообщение для Telegram
    const telegramMessage = `🎯 *Новая заявка с сайта*\n\n` +
      `🌐 *Домен:* ${escapeMarkdown(domain)}\n` +
      `👤 *Имя:* ${escapeMarkdown(name)}\n` +
      `📧 *Email:* ${escapeMarkdown(email)}\n` +
      (phone ? `📱 *Телефон:* ${escapeMarkdown(phone)}\n` : '') +
      (company ? `🏢 *Компания:* ${escapeMarkdown(company)}\n` : '') +
      `\n💬 *Сообщение:*\n${escapeMarkdown(message)}`;
    
    // Отправляем в Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });
    
    const telegramResult = await telegramResponse.json();
    
    if (!telegramResponse.ok) {
      console.error('❌ Telegram API error:', telegramResult);
      return NextResponse.json(
        { 
          ok: false, 
          error: 'telegram_send_failed',
          details: telegramResult.description || 'Failed to send message to Telegram' 
        },
        { status: 500 }
      );
    }
    
    console.log('✅ Message sent to Telegram successfully');
    
    return NextResponse.json({
      ok: true,
      message: 'Message sent successfully',
    });
    
  } catch (error) {
    console.error('❌ Telegram route error:', error);
    return NextResponse.json(
      { 
        ok: false, 
        error: 'server_error',
        details: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// Функция для экранирования специальных символов Markdown
function escapeMarkdown(text: string): string {
  return String(text || '')
    .replace(/\_/g, '\\_')
    .replace(/\*/g, '\\*')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\~/g, '\\~')
    .replace(/\`/g, '\\`')
    .replace(/\>/g, '\\>')
    .replace(/\#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/\-/g, '\\-')
    .replace(/\=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\./g, '\\.')
    .replace(/\!/g, '\\!');
}

