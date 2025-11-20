import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface TSuccess {
  totalPrice: number;
  button: string;
}

export class Success extends Component<TSuccess> {
  protected _orderSuccessDescription: HTMLElement;
  protected _orderSuccessButton: HTMLButtonElement;
  constructor(events: IEvents, container: HTMLElement) {
    super(container);
    this._orderSuccessDescription = ensureElement('.order-success__description', this.container);
    this._orderSuccessButton = ensureElement<HTMLButtonElement>('.button', this.container);
    this._orderSuccessButton.addEventListener('click', () => {
      events.emit('success:order');
    })
  }
  set totalPrice(value: number) {
    this._orderSuccessDescription.textContent = `Списано ${value.toString()} синапсов`;
  }
}