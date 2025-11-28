# GitHub Actions Workflows

## Generate Blog Post

Этот workflow позволяет автоматически генерировать посты для блога через GitHub Actions.

### Настройка

1. **Добавьте секреты в GitHub:**
   - Перейдите в Settings → Secrets and variables → Actions
   - Добавьте секрет `OPENAI_API_KEY` (опционально, для AI-генерации контента)
   - Получите API ключ на https://platform.openai.com/api-keys

2. **Запуск workflow:**
   - Перейдите в Actions → Generate Blog Post
   - Нажмите "Run workflow"
   - Заполните параметры:
     - **topic** (обязательно): Тема статьи, например "автоматизация КП"
     - **title** (опционально): Заголовок статьи
     - **category** (опционально): Категория, по умолчанию "Автоматизация"

3. **Результат:**
   - Workflow создаст новый файл в `content/blog/`
   - Создаст Pull Request с новым постом
   - Вы сможете отредактировать контент перед мерджем

### Переменные окружения

Для локальной разработки создайте файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

Заполните необходимые переменные:
- `NEXT_PUBLIC_SITE_URL` - URL вашего сайта
- `OPENAI_API_KEY` - API ключ OpenAI (опционально)

### Использование скрипта локально

```bash
npm run blog:generate -- --topic "автоматизация КП" --category "Автоматизация" --tags "автоматизация,КП"
```

