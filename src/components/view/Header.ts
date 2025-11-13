import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface IHeader {
  counter: number;
}

export class Header extends Component<IHeader> {
  protected _headerBasket: HTMLButtonElement;
  protected _basketCounter: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this._headerBasket = ensureElement<HTMLButtonElement>('.header__basket', this.container);
    this._basketCounter = ensureElement('.header__basket-counter', this.container);

    this._headerBasket.addEventListener('click', () => {
      this.events.emit('basket:open')
    })
  }

  set basketCounter(value: number) {
    this._basketCounter.textContent = value.toString();
  }
}