import { IProductItem } from '../types';
import { Component } from './base/Component';
import { IEvents } from './base/events';


export interface IBasket {
  list: HTMLElement[];
  price: number;
}

export class Basket extends Component<IBasket> {

  protected _list: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  /*Конструктор принимает имя блока, родительский элемент и обработчик событий */
  constructor(protected blockName: string,container: HTMLElement,protected events: IEvents) {
    super(container);

    this._button = container.querySelector(`.${blockName}__button`);
    this._price = container.querySelector(`.${blockName}__price`);
    this._list = container.querySelector(`.${blockName}__list`);

    if (this._button) {
      this._button.addEventListener('click', () => this.events.emit('basket:order'))
    }
  }

  /**Сеттер для общей цены */
  set price(total: number) {
    this.setText(this._price, `${total} синапсов`)
  }

  /**Сеттер для списка товаров */
  set list(items: HTMLElement[]) {
    this._list.replaceChildren(...items);
    this._button.disabled = items.length ? false : true;
  }

  /**Метод отключающий кнопку "Оформить" */
  disableButton() {
    this._button.disabled = true
  }

  /** Метод для обновления индексов таблички при удалении товара из корзины */
  refreshIndices() {
    Array.from(this._list.children).forEach(
      (item, index) =>
      (item.querySelector(`.basket__item-index`)!.textContent = (
        index + 1
      ).toString())
    );
  }
}

export interface IProductBasket extends IProductItem {
  id: string;
  index: number;
}

export interface IStoreItemBasketActions {
  onClick: (event: MouseEvent) => void;
}

export class StoreItemBasket extends Component<IProductBasket> {
  protected _index: HTMLElement;
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(
    protected blockName: string,
    container: HTMLElement,
    actions?: IStoreItemBasketActions
  ) {
    super(container);

    this._title = container.querySelector(`.${blockName}__title`);
    this._index = container.querySelector(`.basket__item-index`);
    this._price = container.querySelector(`.${blockName}__price`);
    this._button = container.querySelector(`.${blockName}__button`);

    if (this._button) {
      this._button.addEventListener('click', (evt) => {
        this.container.remove();
        actions?.onClick(evt);
      });
    }
  }

  set title(value: string) {
    this._title.textContent = value;
  }

  set index(value: number) {
    this._index.textContent = value.toString();
  }

  set price(total: number) {
    this.setText(this._price, `${total} синапсов`)
  }
}


