import { CategoryKey, ICardActions, IProduct } from "../../types";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Card, TCard } from "./Card";



type TCardFullDescribtion = TCard & Pick<IProduct, 'image' | 'category' | 'description'> & {
  isInCart: boolean;
}


export class CardFullDescribtion extends Card<TCardFullDescribtion> {
  protected _cardImage: HTMLImageElement;
  protected _cardCategory: HTMLElement;
  protected _cardDescription: HTMLElement;
  protected _buyButton: HTMLButtonElement;
  constructor(container: HTMLElement, protected events: IEvents, actions?: ICardActions) {
    super(container, events);
    this._cardImage = ensureElement<HTMLImageElement>('card__image', this.container);
    this._cardCategory = ensureElement('card__category', this.container);
    this._cardDescription = ensureElement('card__text', this.container);
    this._buyButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

      if (actions?.onClick) {
      this._buyButton.addEventListener('click', actions.onClick);
      }
  }

  set category(value: string) {
    this._cardCategory.textContent = value;
    for (const key in categoryMap) {
      this._cardCategory.classList.toggle(categoryMap[key as CategoryKey], key === value)
    }
  }
  set image(value: string) {
    this.setImage(this._cardImage, value, this.cardTitle);
  }
  set description(value: string) {
    this._cardDescription.textContent = value;
  }
  set buyButton(isInCart: boolean) {
    if (isInCart)
      this._buyButton.textContent = "Удалить из корзины";
      else
        this._buyButton.textContent = "Купить";
  }
}