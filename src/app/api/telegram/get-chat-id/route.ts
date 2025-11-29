import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!botToken) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'TELEGRAM_BOT_TOKEN not configured',
          message: 'Добавьте TELEGRAM_BOT_TOKEN в .env.local'
        },
        { status: 400 }
      );
    }
    
    // Получаем информацию о боте
    const botInfoUrl = `https://api.telegram.org/bot${botToken}/getMe`;
    const botInfoResponse = await fetch(botInfoUrl);
    const botInfo = await botInfoResponse.json();
    
    if (!botInfo.ok) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'invalid_token',
          message: 'Неверный токен бота. Проверьте TELEGRAM_BOT_TOKEN',
          details: botInfo
        },
        { status: 400 }
      );
    }
    
    // Получаем последние обновления (сообщения)
    const updatesUrl = `https://api.telegram.org/bot${botToken}/getUpdates`;
    const updatesResponse = await fetch(updatesUrl);
    const updates = await updatesResponse.json();
    
    if (!updates.ok) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'failed_to_get_updates',
          message: 'Не удалось получить обновления',
          details: updates
        },
        { status: 500 }
      );
    }
    
    // Извлекаем chat_id из обновлений
    const chatIds: Array<{ chat_id: number | string; username?: string; first_name?: string; type: string }> = [];
    
    if (updates.result && updates.result.length > 0) {
      const seenChatIds = new Set<string | number>();
      
      updates.result.forEach((update: any) => {
        if (update.message) {
          const chat = update.message.chat;
          const chatId = chat.id.toString();
          
          if (!seenChatIds.has(chatId)) {
            seenChatIds.add(chatId);
            chatIds.push({
              chat_id: chat.id,
              username: chat.username,
              first_name: chat.first_name,
              type: chat.type
            });
          }
        }
      });
    }
    
    return NextResponse.json({
      ok: true,
      bot_info: {
        id: botInfo.result.id,
        username: botInfo.result.username,
        first_name: botInfo.result.first_name,
        can_join_groups: botInfo.result.can_join_groups,
        can_read_all_group_messages: botInfo.result.can_read_all_group_messages
      },
      chat_ids: chatIds,
      instructions: chatIds.length === 0 
        ? [
            '1. Напишите вашему боту любое сообщение в Telegram',
            '2. Обновите эту страницу',
            '3. Или отправьте команду /start боту и обновите страницу'
          ]
        : [
            'Найденные chat_id:',
            ...chatIds.map(chat => `  - ${chat.chat_id} (${chat.type}${chat.username ? ` @${chat.username}` : ''}${chat.first_name ? ` - ${chat.first_name}` : ''})`)
          ],
      note: 'Используйте первый chat_id из списка для TELEGRAM_CHAT_ID в .env.local'
    });
    
  } catch (error) {
    console.error('❌ Get chat ID error:', error);
    return NextResponse.json(
      { 
        ok: false, 
        error: 'server_error',
        message: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

