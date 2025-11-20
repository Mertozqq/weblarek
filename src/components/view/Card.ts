import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export type TCard = Pick<IProduct, "title" | "price" | "id">;

export class Card<T> extends Component<TCard & T> {
  protected _cardTitle: HTMLElement;
  protected _cardPrice: HTMLElement;
  constructor(container: HTMLElement, protected events?: IEvents) {
    super(container);

    this._cardTitle = ensureElement('.card__title', this.container);
    this._cardPrice = ensureElement('.card__price', this.container);


  }
  set title(value: string) {
    this._cardTitle.textContent = value;
  }
  set price(value: number | null) {
    if (value != null)
    this._cardPrice.textContent = `${value.toString()} синапсов`
    else {
      this._cardPrice.textContent = `Бесценно`;
    }
  }
}