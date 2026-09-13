# Тестирование Cars CRUD API + UI
Тестирование веб-приложения «Автомобили — CRUD»


## API
| Метод  | Endpoint              | Описание                        |
|--------|-----------------------|---------------------------------|
| GET    | `/api/cars`           | Получить все автомобили         |
| GET    | `/api/cars/:id`       | Получить один автомобиль        |
| POST   | `/api/cars`           | Создать автомобиль (multipart)  |
| PUT    | `/api/cars/:id`       | Обновить автомобиль             |
| DELETE | `/api/cars/:id`       | Удалить автомобиль              |
| POST   | `/api/auth/register`  | Регистрация                     |
| POST   | `/api/auth/login`     | Логин                           |
| GET    | `/api/auth/all`       | Все пользователи                |
| GET    | `/api/auth/all-without-password` | Все пользователи без пароля |

## Модели данных

**Car**
```js
{
  id: INTEGER (PK, autoIncrement),
  year: INTEGER,
  price: DECIMAL,
  image: STRING
}
```
**User**
```js
{
  id: INTEGER (PK, autoIncrement),
  login: STRING,
  name: STRING (allowNull:false, min:2),
  password: STRING (allowNull:false, min:6),
  salary: DECIMAL (allowNull:false),
  role: ENUM('ADMIN','USER') (default: 'USER')
}
```