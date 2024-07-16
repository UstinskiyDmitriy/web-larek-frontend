# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Типы данных 

Тип данных для описания категории товаров
```
type Category = 'софт' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил'
```
Тип для описания ошибок валидации
```
type FormErrors = Partial<Record<keyof IOrder, string>>;
```
Тип для описания товара в корзине 
```
type IOrderCard = Pick<IProductItem, 'title'| 'price'>
```
Интерфейс, описывающий карточку товара
```
interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```
Интерфейс для описания окна заказа 
```
interface IOrder {
  item: string[];
  payment: string;
  adress: string;
  email: string;
  phone: string;
  total: number;
}
```
Интерфейс, описывающий карточку товара в магазине
```
interface ICard extends IProductItem {
  selected: boolean;
}
```
Интерфей для выбора карточки для предпросмотра
```
interface ICardData {
  items: IProductItem[];
  preview: string | null;
}
```
Интерфейс для описания страницы 
```
interface IPage {
  store: HTMLElement[];
  counter: number;
}
```

Интерфейс для описания состояния приложения
```
interface IAppState {
  basketList: IOrderCard[];
  basketTotal: string;
  order: IOrder;
  total: string | number;
  isOrderReady: boolean;
  formErrors: FormErrors;
  contacts: Partial<IOrder>;
  
  loadCards(): Promise<void>;
  selectCard(id: string): void;
  openModal(modal: IProductItem): void;
  addToBasket(value: IOrderCard): void;
  deleteFromBasket(id: string): void;
  clearBasket(): void;
  getBasketCount(): number;
  getBasketPrice(): number;
  validationContacts(): boolean;
  validationOrder(): boolean;
  fillContacts(contacts: Partial<IOrder>): void;
  orderItems(): Promise<IOrder[]>;
}
```
Интерфейс заказанного товара
```
interface IOrderItems{
  id: string;
  total: number;
}
```
Интерфейс, описывающий список товаров в корзине
```
interface ICardList {
  list: IOrderCard[]
}
```
Интерфейс, формирующий API
```
interface ICardAPI {
  getCards: () =>Promise<IProductItem[]>
  orderItems: () =>Promise<IOrderItems[]>
}
```
## Архитектура приложения

### Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы: 
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие   

