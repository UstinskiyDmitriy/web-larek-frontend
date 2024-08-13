import { IOrder, IProductItem, FormErrors, IOrderForm } from '../types';
import { Model } from './base/Model';
import { IAppState } from '../types';

export class Product extends Model<IProductItem> {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  selected: boolean;
}

export class AppState extends Model<IAppState> {
  // Корзина с товарами
  basket: Product[] = [];

  // Массив со всеми товарами
  store: Product[];

  // Объект заказа клиента
  order: IOrder = {
    items: [],
    payment: '',
    total: null,
    address: '',
    email: '',
    phone: '',
  };

  // Объект с ошибками форм
  formErrors: FormErrors = {};
  /**Добавить товар в корзину */
  addToBasket(value: Product) {
    this.basket.push(value);
  }
  /**Убрать из корзины */
  deleteFromBasket(id: string) {
    this.basket = this.basket.filter(item => item.id !== id)
  }
  /**Обнулить корзину */
  clearBasket() {
    this.basket.length = 0;
  }
  /**Получить кол-во товаров в корзине */
  getBasketAmount() {
    return this.basket.length;
  }
  /**Получить общую стоимость товаров в корзине */
  getTotalBasketPrice() {
    return this.basket.reduce((sum, next) => sum + next.price, 0);
  }
  /**Установить id каждому товару в корзине */
  setItems() {
    this.order.items = this.basket.map(item => item.id)
  }
  /**Обновление поля заказа */
  setOrderField(field: keyof IOrderForm, value: string) {
    this.order[field] = value;

    if (this.validateContacts()) {
      this.events.emit('contacts:ready', this.order)
    }
    if (this.validateOrder()) {
      this.events.emit('order:ready', this.order);
    }
  }
  /**Валидация контактов */
  validateContacts() {
    const errors: typeof this.formErrors = {};
    if (!this.order.email) {
      errors.email = 'Необходимо указать email';
    }
    if (!this.order.phone) {
      errors.phone = 'Необходимо указать телефон';
    }
    this.formErrors = errors;
    this.events.emit('contactsFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }
  /**Валидация формы с адресом и способом оплаты */
  validateOrder() {
    const errors: typeof this.formErrors = {};
    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес';
    }
    if (!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты';
    }
    this.formErrors = errors;
    this.events.emit('orderFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }
  /**сбросить заказ */
  refreshOrder() {
    this.order = {
      items: [],
      payment: '',
      total: null,
      address: '',
      email: '',
      phone: '',
    };
  }

 

  setStore(items: IProductItem[]) {
    this.store = items.map((item) => new Product({ ...item, selected: false }, this.events));
    this.emitChanges('items:changed', { store: this.store });
  }
  
  resetSelected() {
    this.store.forEach(item => item.selected = false)
  }
}