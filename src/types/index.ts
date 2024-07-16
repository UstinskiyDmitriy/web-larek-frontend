export type Category = 'софт' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил'

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export type IOrderCard = Pick<IProductItem, 'title'| 'price'>

export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IOrder {
  item: string[];
  payment: string;
  adress: string;
  email: string;
  phone: string;
  total: number;
}

export interface ICard extends IProductItem {
  selected: boolean;
}

export interface ICardData {
  items: IProductItem[];
  preview: string | null;
}

export interface IPage {
  store: HTMLElement[];
  counter: number;
}

export interface AppState {
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

export interface IOrderItems{
  id: string;
  total: number;
}

export interface ICardList {
  list: IOrderCard[];
}

export interface ICardAPI {
  getCards: () =>Promise<IProductItem[]>
  orderItems: () =>Promise<IOrderItems[]>
}


