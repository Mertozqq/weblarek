import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export type TCard = Pick<IProduct, "title" | "price">;

export class Card<T> extends Component<TCard & T> {
  protected _cardTitle: HTMLElement;
  protected _cardPrice: HTMLElement;
  constructor(container: HTMLElement, protected events?: IEvents) {
    super(container);

    this._cardTitle = ensureElement('.card__title', this.container);
    this._cardPrice = ensureElement('.card__price', this.container);


  }
  set cardTitle(value: string) {
    this._cardTitle.textContent = value;
  }
  set cardPrice(value: number) {
    this._cardPrice.textContent = `${value.toString()} синапсов`
  }
}