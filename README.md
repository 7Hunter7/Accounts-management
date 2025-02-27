# Управление учетными записями

## Описание

Это проект, реализующий форму управления учетными записями с использованием Vue.js 3, TypeScript, Pinia и UI фреймворк Vuetify.

## Функциональность

- Добавление новых учетных записей.
- Удаление учетных записей.
- Редактирование учетных записей (Метка, Тип записи, Логин, Пароль).
- Валидация обязательных полей.
- Преобразование меток.
- Сохранение данных в Pinia и восстановление при перезагрузке страницы.

## Стек технологий

- Vue.js 3
- TypeScript
- Pinia
- UI фреймворк Vuetify

## Установка и запуск

1.  **Клонируйте репозиторий:**

```bash
git clone <ссылка на ваш репозиторий>
cd <название вашего проекта>
```

2.  **Установите зависимости:**

```bash
npm install
# или
 yarn install
```

3.  **Запустите приложение:**

```bash
npm run dev
# или
yarn dev
```

Приложение будет доступно по адресу `http://localhost:3000`

## Структура проекта

```bash
account_management/
├── public/ # Публичные ресурсы (favicon, и т.д.)
├── src/ # Исходный код
│ ├── components/ # Компоненты Vue
│ │ ├── AccountForm.vue
│ │ └── AccountItem.vue
│ ├── plugins/ # Plugins
│ │ ├── index.ts
│ │ └── vuetify.ts
│ ├── stores/ # Pinia store
│ │ ├── app.ts
│ │ └── index.ts
│ ├── types/ # Типы TypeScript
│ │ ├── account.ts
│ │ └── pinia-plugin-persist.d.ts
│ ├── App.vue # Главный компонент приложения
│ └── main.ts # Точка входа приложения
├── index.html # Главный файл
├── package.json # Файл зависимостей
├── tsconfig.json # Конфигурация TypeScript
├── README.md # Этот файл
└── vite.config.ts # Конфигурация Vite
```

## Использованные библиотеки и версии:

- vue: 3.4.31
- typescript: 5.6.3
- pinia: 2.3.1
- pinia-plugin-persist: 1.0.0
- vuetify: 3.6.14

## Тестирование

## Автор

Ivan Kalugin

Телеграмм: https://t.me/Ivan_Anatolievich_Kalugin

## Лицензия

MIT
