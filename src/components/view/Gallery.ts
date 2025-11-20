import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IGallery {
  galleryItems: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  protected _galleryItems: HTMLElement[] = [];

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
  }

  set galleryItems(items: HTMLElement[]) {
    items.forEach(element => {
      this.container.appendChild(element);
    });
  }
}