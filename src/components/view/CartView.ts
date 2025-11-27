import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ICartView  {
  productList: HTMLElement[];
  buttonState: boolean;
}

export class CartView extends Component<ICartView> {
  protected _productsList: HTMLElement;
  protected _buyButton: HTMLButtonElement;
  protected _priceElement: HTMLElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this._buyButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this._productsList = ensureElement<HTMLElement>('.basket__list', this.container);
    this._priceElement = ensureElement('.basket__price', this.container);

    this._buyButton.addEventListener('click', () => {
      this.events.emit('purchase:open')
    })
  }
  set productList(elements: HTMLElement[]) {
    this._productsList.replaceChildren(...elements);
  }
  
  set buttonState(isValid: boolean) {
      if (isValid)
      this._buyButton.removeAttribute('disabled');
      else
        this._buyButton.disabled = true;
    }
  set price(currentPrice: number) {
    this._priceElement.textContent = `${currentPrice} синапсов`
  }
}