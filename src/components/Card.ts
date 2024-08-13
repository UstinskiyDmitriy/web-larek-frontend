import { Component } from './base/Component';
import { Category, CategoryMapping, ICard } from '../types';
import { ensureElement} from '../utils/utils';
import { CDN_URL } from '../utils/constants';


export const categoryMapping: CategoryMapping = {
  "другое": "card__category_other",
  "софт-скил":"card__category_soft",
  "хард-скил":"card__category_hard",
  "дополнительное":"card__category_additional",
  "кнопка": "card__category_button",
};

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICard> {
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _category: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(protected blockName: string,container: HTMLElement,actions?: ICardActions) {
    super(container);

    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`,container);
    this._button = container.querySelector(`.${blockName}__button`);
    this._category = container.querySelector(`.${blockName}__category`);
    this._price = container.querySelector(`.${blockName}__price`);

    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }

 
  set id(value: string) {
    this.container.dataset.id = value;
  }
  get id(): string {
    return this.container.dataset.id || '';
  }

  set title(value: string) {
    this.setText(this._title, value)
  }
  get title(): string {
    return this._title.textContent || '';
  }

  set image(value: string) {
   this.setImage(this._image, CDN_URL + value)
  }

  set selected(value: boolean) {
    if (!this._button.disabled) {
      this._button.disabled = value;
    }
  }

  set price(value: number | null) {
    this._price.textContent = value
      ? (value) + ' синапсов'
      : 'Бесценно';
    if (this._button && !value) {
      this._button.disabled = true;
    }
  }

  set category(value: Category) {
    this.setText(this._category, value)
    this._category.classList.add(categoryMapping[value]);
  }
}

export class StoreItem extends Card {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super('card', container, actions);
  }
}

export class StoreItemPreview extends Card {
  protected _description: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super('card', container, actions);

    this._description = container.querySelector(`.${this.blockName}__text`);
  }

  set description(value: string) {
    this._description.textContent = value;
  }

}