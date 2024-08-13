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
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  selected: boolean;
}

export interface IOrder {
  items: string[]
  total: number|string;
  payment: string;
  address: string;
  email: string;
  phone: string;
}

export interface ApiResponse {
  items: IProductItem[];
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

export type IOrderForm = Pick<IOrder, 'payment'|'address'|'email'|'phone'>;

export type Category = 'другое'|'софт-скил'|'дополнительное'|'кнопка'|'хард-скил' ;

export type CategoryMapping = {
  [Key in Category]: string;
};

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;


