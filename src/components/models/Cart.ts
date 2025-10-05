import { IProduct } from "../../types";

export class Cart {
  private __productsToBuy: IProduct[] = [];
  

  get productsToBuy(): IProduct[] {
    return this.__productsToBuy;
  }

  addProductToBuy(product: IProduct): void {
    if (!this.isProductInCart(product.id)) { // Так как один продукт нельзя добавлять несколько раз
      this.__productsToBuy.push(product);
    }
  }

  deleteProductToBuy(product: IProduct): void {
    const index = this.__productsToBuy.indexOf(product);
    if (index > -1) {
        this.__productsToBuy.splice(index, 1);
    }
  }

  clearCart(): void {
    this.__productsToBuy = [];
  }

  countFullPrice(): Number {
    let res: number = 0;
    this.__productsToBuy.forEach((el) => {
      if (el.price != null) {
        res += el.price;
      }
    })
    return res;
  }

  countCartItems(): Number {
    return this.__productsToBuy.length;
  }

  isProductInCart(id: string): boolean {
    return this.__productsToBuy.some(product => product.id === id);
  }

}