import { CategoryKey, ICardActions, IProduct } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card, TCard } from "./Card";



type TCardFromCatalog = TCard & Pick<IProduct, 'image' | 'category'>

export class CardFromCatalog extends Card<TCardFromCatalog> {
  protected _cardImage: HTMLImageElement;
  protected _cardCategory: HTMLElement;
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this._cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
    this._cardCategory = ensureElement('.card__category', this.container);

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick)
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
}