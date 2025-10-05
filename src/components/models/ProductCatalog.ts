import { IProduct } from "../../types";

export class ProductCatalog {
  private __products: IProduct[] = [];
  private __currentProduct: IProduct | null = null;

  set products(array: IProduct[]) {
    this.__products = array;
  }
  set currentProduct(product: IProduct) {
    this.__currentProduct = product;
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
}