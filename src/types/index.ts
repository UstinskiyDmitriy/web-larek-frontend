import { Product } from "../components/AppData";

export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  selected: boolean;
}

export interface ICard {
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IOrder {
  items: string[]
  total: number;
  payment: string;
  adress: string;
  email: string;
  phone: string;
}

export interface IAppState {
  basket: IProductItem[];
  page: IProductItem[];
  order: IOrder;
  formErrors: FormErrors;
  
  addToBasket(value:Product): void;
  deleteFromBasket(id:string): void;
  clearBasket(): void;
  getBasketCount(): number;
  getTotalBasket(): number;
  clearOrder(): boolean;
  setItems(): void;
  setStore(items: IProductItem[]): void;
  resetSelected(): void;
  validationContacts(): boolean;
  validationOrder(): boolean;
  setOrderField(field: keyof IOrderForm, value: string): void;
}

export type IOrderForm = Pick<IOrder, 'payment'|'adress'|'email'|'phone'>

export type Category = 'софт-скил'|'другое'|'доролнительное'|'кнопка'|'хард-скил' 

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;


