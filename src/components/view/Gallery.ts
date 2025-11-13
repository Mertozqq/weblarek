import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IGallery {
  galleryItems: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  _gallery: HTMLElement;
  _galleryItems: HTMLElement[] = [];
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this._gallery = ensureElement('.gallery', this.container);

  }
  set galleryItems(products: HTMLElement[]) {
    this._galleryItems = products;
  }
}