import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ProductCatalog {
  private __products: IProduct[] = [];
  private __currentProduct: IProduct | null = null;

  constructor(protected events: IEvents) {}

  set products(array: IProduct[]) {
    this.__products = array;
    this.emitChange();
  }
  set currentProduct(product: IProduct) {
    this.__currentProduct = product;
    this.emitChange();
  }
  get products(): IProduct[] {
    return this.__products;
  }
  get currentProduct(): IProduct | null {
    return this.__currentProduct;
  }
  getProductById(id: string): IProduct | null {
    return this.__products.find(product => product.id === id) || null;
  }
  private emitChange() {
    this.events.emit('catalog:changed', {
      products: this.products,
      currentProduct: this.currentProduct
    });
  }
}