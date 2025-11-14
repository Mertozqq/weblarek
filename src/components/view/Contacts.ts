  import { ensureElement } from "../../utils/utils";
  import { IEvents } from "../base/Events";
  import { Form } from "./Form";

  interface IContacts {
    email: string;
    phone: string;
  }

  export class Contacts extends Form<IContacts> {
      protected _email: HTMLInputElement;
      protected _phone: HTMLInputElement;
      constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        
        this._email = ensureElement<HTMLInputElement>('.form__input[name="email"]', this.container);
        this._phone = ensureElement<HTMLInputElement>('.form__input[name="phone"]', this.container);

        this.container.addEventListener('input', (event: Event) => {
          const target = event.target as HTMLInputElement;
          if (target === this._email) {
            this.events.emit('contacts:email:changed', { email: this._email.value });
          }
          if (target === this._phone) {
            this.events.emit('contacts:phone:changed', { phone: this._phone.value })
          }
        })
      }
      set email(value: string) {
        this._email.value = value;
    }
    set phone(value: string) {
      this._phone.value = value;
    }

  }