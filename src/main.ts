import './scss/styles.scss';

import { Buyer } from './components/models/Buyer';
import { Cart } from './components/models/Cart';
import { ProductCatalog } from './components/models/ProductCatalog';
import { CommunicationService } from './components/communication/CommunicationService';
import { Api } from './components/base/Api';

const api = new Api("https://larek-api.nomoreparties.co/api/weblarek")
const buyer1 = new Buyer();
const cart1 = new Cart();
const productCatalog1 = new ProductCatalog();
const commServ = new CommunicationService(api);

commServ.getProducts().then(prods => {
  console.log(prods);
  productCatalog1.products = prods;

  productCatalog1.currentProduct = prods[0];
  console.log(productCatalog1.products);
  console.log(productCatalog1.currentProduct)
  console.log(productCatalog1.getProductById("1"));


  cart1.addProductToBuy(productCatalog1.currentProduct);
  cart1.addProductToBuy(productCatalog1.products[3])
  console.log(cart1.productsToBuy);
  cart1.deleteProductToBuy(productCatalog1.currentProduct)
  console.log(cart1.productsToBuy)
  cart1.addProductToBuy(productCatalog1.currentProduct);
  console.log(cart1.countCartItems())
  console.log(cart1.countFullPrice())
  cart1.clearCart();
  console.log(cart1.productsToBuy)

  buyer1.address = "abc";
  console.log(buyer1.getAllUserData())
});

