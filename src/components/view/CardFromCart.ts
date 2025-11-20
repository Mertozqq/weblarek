import { ICardActions, IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Card, TCard } from "./Card";

export type TCardFromCart = TCard & Pick<IProduct, 'id'>

export class CardFromCart extends Card<TCardFromCart> {
  protected _deleteButton: HTMLButtonElement;
  protected _itemIndex: HTMLElement;
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this._deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    this._itemIndex = ensureElement<HTMLButtonElement>('.basket__item-index', this.container);

    if (actions?.onClick) {
      this._deleteButton.addEventListener('click', actions?.onClick);
    }
  }

  set itemIndex(value: number) {
    this._itemIndex.textContent = value.toString();
  }
}