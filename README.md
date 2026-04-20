# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TypeScript, Vite

## Установка и запуск

```
npm install
npm run dev
```

## Сборка

```
npm run build
```

---

# Интернет-магазин «Web-Larёk»

«Web-Larёk» — интернет-магазин товаров для веб-разработчиков. Пользователь может просматривать каталог, добавлять товары в корзину и оформлять заказ.

---

## Архитектура приложения

Приложение построено по паттерну MVP:

* Model — хранение и работа с данными
* View — отображение интерфейса
* Presenter — связывает данные и интерфейс

В текущей части проекта реализован слой **Model** и слой **коммуникации с API**.

---

## Базовый код

### Api

Класс для выполнения HTTP-запросов.

Методы:

* `get` — GET запрос
* `post` — POST/PUT/DELETE запрос

---

### Component

Базовый класс для UI-компонентов.

Метод:

* `render` — отрисовка компонента

---

### EventEmitter

Брокер событий для связи частей приложения.

---

## Данные

### IProduct

```ts
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

Описание товара.

---

### IBuyer

```ts
interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}
```

Данные покупателя.

---

### TPayment

```ts
type TPayment = 'card' | 'cash';
```

Тип оплаты.

---

### IProductsResponse

```ts
interface IProductsResponse {
  total: number;
  items: IProduct[];
}
```

Ответ сервера с товарами.

---

### IOrderRequest

```ts
interface IOrderRequest extends IBuyer {
  items: string[];
}
```

Данные для отправки заказа.

---

### IOrderResponse

```ts
interface IOrderResponse {
  id: string;
  total: number;
}
```

Ответ сервера после оформления заказа.

---

## Модели данных

### Products

Отвечает за каталог товаров.

Поля:

* `items: IProduct[]`
* `selected: IProduct | null`

Методы:

* `setItems`
* `getItems`
* `getById`
* `setSelected`
* `getSelected`

---

### Cart

Отвечает за корзину.

Поля:

* `items: IProduct[]`

Методы:

* `getItems`
* `add`
* `remove`
* `clear`
* `getTotal`
* `getCount`
* `has`

---

### Buyer

Отвечает за данные покупателя.

Поля:

* `data: Partial<IBuyer>`

Методы:

* `setData`
* `getData`
* `clear`
* `validate`

Метод `validate` возвращает объект ошибок:

```ts
{
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
}
```

---

## Слой коммуникации

### AppApi

Класс для работы с сервером.

Конструктор:

```ts
constructor(api: IApi)
```

Методы:

* `getProducts()` — получение товаров (`GET /product/`)
* `createOrder(data)` — отправка заказа (`POST /order/`)

---

## Результат

В проекте реализованы:

* модели данных (каталог, корзина, покупатель)
* взаимодействие с API
* типизация данных
* тестирование моделей через main.ts
