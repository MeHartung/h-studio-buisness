# H-Studio Business Landing Page

Легкий лендинг для H-Studio Business - автоматизация процессов и внутренние инструменты.

## Структура проекта

Этот проект содержит только файлы, необходимые для лендинга:
- `src/app/page.tsx` - главная страница лендинга
- `src/app/layout.tsx` - корневой layout
- `src/app/globals.css` - глобальные стили
- `src/components/CookieBanner.tsx` - компонент баннера с cookies
- `public/` - изображения и логотипы (1.png, 2.png, 3.png, logo-white.svg, logo.svg, favicon.svg)

## Установка и запуск

```bash
# Установить зависимости
npm install
# или
pnpm install
# или
yarn install

# Запустить dev сервер
npm run dev
# или
pnpm dev
# или
yarn dev

# Собрать для production
npm run build
npm run start
```

## Технологии

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- React Icons

## Особенности

- Полностью автономный лендинг без зависимостей от других систем
- Минимальный набор зависимостей
- Готов к деплою на Vercel, Netlify или любой другой платформе
- Адаптивный дизайн
- Cookie banner с настройками

## Деплой

Проект готов к деплою на:
- Vercel (рекомендуется для Next.js)
- Netlify
- Любой другой хостинг с поддержкой Node.js

Просто подключите репозиторий к платформе деплоя, и все настроится автоматически.

