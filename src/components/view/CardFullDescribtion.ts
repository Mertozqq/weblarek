import { CategoryKey, ICardActions, IProduct } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Card, TCard } from "./Card";



type TCardFullDescribtion = TCard & Pick<IProduct, 'image' | 'category' | 'description' | "id"> & {
  isInCart: boolean;
}


export class CardFullDescribtion extends Card<TCardFullDescribtion> {
  protected _cardImage: HTMLImageElement;
  protected _cardCategory: HTMLElement;
  protected _cardDescription: HTMLElement;
  protected _buyButton: HTMLButtonElement;
  public id = '';
  constructor(container: HTMLElement, protected events: IEvents, actions?: ICardActions) {
    super(container, events);
    this._cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
    this._cardCategory = ensureElement('.card__category', this.container);
    this._cardDescription = ensureElement('.card__text', this.container);
    this._buyButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

      if (actions?.onClick) {
      this._buyButton.addEventListener('click', actions.onClick);
      }
  }
  // Переопределяем, для того, чтобы еще обновлять image
  set title(value: string) {
    this._cardTitle.textContent = value;
    this._cardImage.alt = value;
  }

  set category(value: string) {
    this._cardCategory.textContent = value;
    for (const key in categoryMap) {
      this._cardCategory.classList.toggle(categoryMap[key as CategoryKey], key === value)
    }
  }
  set image(value: string) {
    value = value.replace("svg", "png");
    this.setImage(this._cardImage, `${CDN_URL}${value}`, this._cardTitle.textContent);
  }
  set description(value: string) {
    this._cardDescription.textContent = value;
  }
  set buyButton(isInCart: boolean) {
    
      if (isInCart)
        this._buyButton.textContent = "Удалить из корзины";
        else
          this._buyButton.textContent = "В корзину";
  }
  set buyButtonDisabled(isNull: boolean) {
    if (isNull) {
      this._buyButton.setAttribute('disabled', 'true')
      this._buyButton.textContent = "Недоступно";
    }
  }
}