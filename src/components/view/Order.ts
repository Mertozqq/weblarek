import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

interface IOrder {
  paymentType: string;
  address: string;
}

export class Order extends Form<IOrder> {
    protected _paymentType: HTMLButtonElement[];
    protected _address: HTMLInputElement;
    constructor(container: HTMLFormElement, events: IEvents) {
      super(container, events);
      
      this._paymentType = ensureAllElements<HTMLButtonElement>('.button.button_alt', this.container);
      this._address = ensureElement<HTMLInputElement>('.form__input', this.container);

      this._paymentType.forEach((button) => {
      button.addEventListener('click', () => {
        this.events.emit('order:payment:clicked', {
          paymentType: button.name,
        });
      });
    });
      this.container.addEventListener('input', (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target === this._address) {
          this.events.emit('order:address:changed', { address: this._address.value });
        }
      })
    }
    set paymentType(method: string) {
    this._paymentType.forEach((btn) => {
      const isActive = btn.name === method;
      btn.classList.toggle('button_alt-active', isActive);
      btn.ariaPressed = String(isActive);
    });
  }
  set address(value: string) {
    this._address.value = value;
  }

}