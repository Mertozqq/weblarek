import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ICart  {
  productList: HTMLElement[];
  buttonState: boolean;
}

export class Cart extends Component<ICart> {
  protected _productsList: HTMLElement;
  protected _buyButton: HTMLButtonElement;
  protected _priceElement: HTMLElement;
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this._buyButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this._productsList = ensureElement<HTMLElement>('basket__list', this.container);
    this._priceElement = ensureElement('basket__price', this.container);

    this._buyButton.addEventListener('click', () => {
      this.events.emit('purchase:open')
    })
  }
  set productList(elements: HTMLElement[]) {
    elements.forEach(element => {
      this._productsList.append(element);
    });
  }
  set buttonState(isValid: boolean) {
      if (isValid)
      this._buyButton.removeAttribute('disabled');
      else
        this._buyButton.disabled = true;
    }
}