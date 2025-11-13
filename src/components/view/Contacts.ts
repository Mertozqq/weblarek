import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

?

interface IContacts {

}

export class Contacts extends Form<IContacts> {
  protected _emailInput: HTMLInputElement;
  protected _phoneInput: HTMLInputElement;
  constructor(container: HTMLFormElement,  events: IEvents) {
    super(container, events);
    this._emailInput = ensureElement<HTMLInputElement>('.email', this.container);
    this._phoneInput = ensureElement<HTMLInputElement>('.phone', this.container);
  }

  set email(value: string) {
    this._emailInput.value
  }
}