import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IModal {
  modalContent: HTMLElement;
}

export class Modal extends Component<IModal> {
  _modalContent: HTMLElement;
  _modalCloseButton: HTMLButtonElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this._modalContent = ensureElement('.modal__content', this.container);
    this._modalCloseButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);

    this._modalCloseButton.addEventListener('click', () => {
      this.events.emit('modal:close')
    })
  }
  set modalContent(content: HTMLElement) {
    this._modalContent.innerHTML = '';
    this._modalContent.appendChild(content);
  }
  open() {
    this.container.classList.add('modal_active');
  }

  close() {
    this.container.classList.remove('modal_active');
  }
}