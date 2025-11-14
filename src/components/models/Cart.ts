import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
  private __productsToBuy: IProduct[] = [];
  
  constructor(protected events: IEvents) {}

  get productsToBuy(): IProduct[] {
    return this.__productsToBuy;
  }

  addProductToBuy(product: IProduct): void {
    if (!this.isProductInCart(product.id)) { // Так как один продукт нельзя добавлять несколько раз
      this.__productsToBuy.push(product);
      this.emitChange()
    }
  }

  deleteProductToBuy(product: IProduct): void {
    const index = this.__productsToBuy.indexOf(product);
    if (index > -1) {
        this.__productsToBuy.splice(index, 1);
        this.emitChange()
    }
  }

  clearCart(): void {
    this.__productsToBuy = [];
    this.emitChange();
  }

  countFullPrice(): number {
    let res: number = 0;
    this.__productsToBuy.forEach((el) => {
      if (el.price != null) {
        res += el.price;
      }
    })
    return res;
  }

  countCartItems(): number {
    return this.__productsToBuy.length;
  }

  isProductInCart(id: string): boolean {
    return this.__productsToBuy.some(product => product.id === id);
  }
  private emitChange() {
    this.events.emit('cart:changed', {
      products: this.productsToBuy,
      countOfElements: this.countCartItems(),
      price: this.countFullPrice(),
    });
  }
}