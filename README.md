# Admin Dashboard. Backend application

This project implements the backend part of the application, which provides functionality for data management, user authentication, and frontend request processing.

## Main components and functionality

- **API Endpoints:** A set of API endpoints has been implemented for interaction with the frontend. It includes endpoints for:

  - User login.
  - Retrieving data (e.g., list of boards, columns, cards).
  - Saving and updating data (creating new boards, adding columns, editing cards, etc.).
  - Deleting data.

- **Authentication and Authorization:** Mechanisms have been implemented for secure user authentication and authorization of their actions based on their access rights.

- **Data Storage:** A database structure and corresponding models have been developed for efficient storage of information about boards, columns, and cards. CRUD (Create, Read, Update, Delete) operations are provided for this data.

- **Data Validation and Processing:** Input data from the frontend is validated to ensure its correctness and integrity before being saved. Error handling and appropriate messages are provided in response to incorrect input or other problems.

- **Frontend Request Processing:** The backend processes various requests coming from the frontend, executing the appropriate business logic.

- **Database Integration:** A connection to the database is configured and logic is implemented to execute queries to it to retrieve, store, and update data.

## Technologies

- Node.js
- Express.js
- MongoDB
- Swagger UI

## Installation and Startup

npm run install, npm run start

## API Documentation

https://admin-dashboard-backend-t6zq.onrender.com

---

Цей проєкт реалізує бекенд частину застосунку, що забезпечує функціональність для управління даними, аутентифікації користувачів та обробки запитів від фронтенду.

## Основні компоненти та функціональність

- **API Ендпоінти:** Реалізовано набір API ендпоінтів для взаємодії з фронтендом. Включає ендпоінти для:

  - Входу користувачів в систему.
  - Отримання даних (наприклад, списку дошок, колонок, карток).
  - Збереження та оновлення даних (створення нових дошок, додавання колонок, редагування карток тощо).
  - Видалення даних.

- **Аутентифікація та авторизація:** Впроваджено механізми для безпечної аутентифікації користувачів та авторизації їхніх дій на основі їхніх прав доступу.

- **Зберігання даних:** Розроблено структуру бази даних та відповідні моделі для ефективного зберігання інформації про дошки, колонки та картки. Забезпечено операції CRUD (Create, Read, Update, Delete) для цих даних.

- **Валідація та обробка даних:** Вхідні дані від фронтенду проходять валідацію для забезпечення їх коректності та цілісності перед збереженням. Реалізовано обробку помилок та надання відповідних повідомлень у відповідь на некоректний ввід або інші проблеми.

- **Обробка запитів фронтенду:** Бекенд обробляє різноманітні запити, що надходять з фронтенду, виконуючи відповідні бізнес-логіки.

- **Інтеграція з базою даних:** Налаштовано з'єднання з базою даних та реалізовано логіку для виконання запитів до неї з метою отримання, збереження та оновлення даних.

## Технології

- Node.js
- Express.js
- MongoDB
- Swagger UI

## Встановлення та запуск

npm run install, npm run start

## API Документація

https://admin-dashboard-backend-t6zq.onrender.com
