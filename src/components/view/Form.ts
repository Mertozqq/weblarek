import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IForm {
  errors: string;
  buttonState: boolean;
}

export class Form<T> extends Component<IForm & T> {
    protected _submitButton: HTMLButtonElement;
    protected _errors: HTMLElement;
    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);
        
        this._submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
        this._errors = ensureElement('.form__errors', this.container);

        this.container.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            const formName = this.container.getAttribute("name") || "form";
            this.events.emit(`${formName}:submit`);
        });
    }
    
    set errors(value: string) {
        this._errors.textContent = value;
    }

    set buttonState(isValid: boolean) {
      if (isValid)
      this._submitButton.removeAttribute('disabled');
      else
        this._submitButton.disabled = true;
    }
    
}