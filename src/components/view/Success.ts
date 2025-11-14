import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface TSuccess {
  totalPrice: number;
}

export class Success extends Component<TSuccess> {
  protected _orderSuccessDescription: HTMLElement;
  constructor(container: HTMLElement) {
    super(container);
    this._orderSuccessDescription = ensureElement('.order-success__description', this.container);
  }
  set totalPrice(value: number) {
    this._orderSuccessDescription.textContent = `Списано ${value.toString()} синапсов`;
  }
}