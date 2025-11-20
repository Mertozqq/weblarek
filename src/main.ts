import './scss/styles.scss';

import { Buyer } from './components/models/Buyer';
import { Cart } from './components/models/Cart';
import { ProductCatalog } from './components/models/ProductCatalog';
import { CommunicationService } from './components/communication/CommunicationService';
import { Api } from './components/base/Api';
import { EventEmitter, IEvents } from './components/base/Events';
import { Gallery } from './components/view/Gallery';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IProduct, TPayment, IBuyer, IApiPostRequestObject } from './types';
import { CardFromCatalog } from './components/view/CardFromCatalog';
import { CardFullDescribtion } from './components/view/CardFullDescribtion';
import { IModal, Modal } from './components/view/Modal';
import { Header } from './components/view/Header';
import { CartView } from './components/view/CartView';
import { CardFromCart } from './components/view/CardFromCart';
import { Order } from './components/view/Order';
import { Form } from './components/view/Form';
import { Contacts } from './components/view/Contacts';
import { Success } from './components/view/Success';

const API = new Api("https://larek-api.nomoreparties.co/api/weblarek")
console.log(API)
const commServ = new CommunicationService(API);

const events = new EventEmitter();

const buyer = new Buyer(events);
const catalog = new ProductCatalog(events);
const cart = new Cart(events);

const galleryHTML = ensureElement<HTMLElement>('.gallery');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const CardFullDescribtionTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const CardFromCartTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const ModalTemplate = ensureElement<HTMLTemplateElement>('#modal-container')
const headerHTML = ensureElement<HTMLElement>('.header');
const cartTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const succsessTemplate = ensureElement<HTMLTemplateElement>('#success')

const header = new Header(events, headerHTML);
const gallery = new Gallery(events, galleryHTML);
const modalWindow = new Modal(events, ModalTemplate);

let cartView: CartView;
let selectedCard: CardFullDescribtion;
let order: Order;
let contacts: Contacts;

function rebuildCart() {
  const productList = cart.productsToBuy;
  let isValid;
  

  const itemCards = productList.map((item, i) => {
    console.log(cloneTemplate(CardFromCartTemplate))
    const card = new CardFromCart(cloneTemplate(CardFromCartTemplate), {
      onClick: () => events.emit(`card:delete`, item),
    });
    card.itemIndex = i + 1;
    
    return card.render(item);
  })
  cartView = new CartView(events, cloneTemplate(cartTemplate));
  if (cart.countCartItems() === 0) {
    isValid = false;
  }
  else {
    isValid = true;
  }
  cartView.price = cart.countFullPrice();
  modalWindow.modalContent = cartView.render({ productList: itemCards, buttonState: isValid });
}

events.on('modal:close', () => {
  console.log('modal:close')
  modalWindow.close();
})

events.on('catalog:changed', () => {
  console.log('catalog:changed')
  const itemCards = catalog.products.map((item) => {
    const card = new CardFromCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit(`card:select`, item),
    });
    return card.render(item);
  })
  gallery.galleryItems = itemCards;
  gallery.render( { galleryItems: itemCards })
})

// events.on('buyer:changed', (currentUser: {
//       buyer: IBuyer,
//       errors: { paymentType?: string; address?: string; email?: string; phone?: string },
//   }) => {
//     if (Object.keys(currentUser.errors).length === 0) {
//       if (order && !contacts) {
//         order.buttonState = true;
//       }
//       else {
//         contacts.buttonState = true;
//       }
//     }
// })

events.on('card:select', (item: IProduct) => {
  console.log('card:select')
  selectedCard = new CardFullDescribtion(cloneTemplate(CardFullDescribtionTemplate), events, {
    onClick: () => events.emit('card:addDelete', item)
  })
  
  catalog.currentProduct = selectedCard; // вызывается currentProduct:changed
  modalWindow.modalContent = selectedCard.render(item);
  modalWindow.render({modalContent: selectedCard.render(item)});
  selectedCard.buyButton = cart.isProductInCart(item.id);
  modalWindow.open();
})

events.on('currentProduct:changed', (item: IProduct) => {
  console.log('currentProduct:changed')
  selectedCard.buyButton = cart.isProductInCart(item.id);
  const a: HTMLElement = selectedCard.render(item);
  modalWindow.modalContent = selectedCard.render(item);
  modalWindow.render({ modalContent: a});
})

events.on('card:addDelete', (item: IProduct) => {
  console.log('card:addDelete')
  
  if (cart.isProductInCart(item.id)) {
    cart.deleteProductToBuy(item); 
  }
  else {
    cart.addProductToBuy(item);
  }
  selectedCard.buyButton = cart.isProductInCart(item.id);
  header.basketCounter = cart.countCartItems();
})


events.on('basket:open', () => {
  console.log('basket:open');
  rebuildCart()
  modalWindow.open();
})


events.on('card:delete', (item: IProduct) => {
  console.log('card:delete');
  cart.deleteProductToBuy(item);
  rebuildCart();
  header.basketCounter = cart.countCartItems();
})

events.on('purchase:open', () => {
  console.log('purchase:open');
  order = new Order(cloneTemplate(orderTemplate), events);
  buyer.paymentType = '';
  buyer.address = '';
  modalWindow.modalContent = order.render();
})

events.on('order:payment:clicked', (paymentType: {paymentType: TPayment}) => {
  console.log('order:payment:clicked');
  buyer.paymentType = paymentType.paymentType; // Чтобы сохранились данные
  order.paymentType = paymentType.paymentType; // Чтобы поменялась кнопка
  order.errors = buyer.errors.paymentType || buyer.errors.address || "";
  if (Object.keys(buyer.errors).length == 0) {
    order.buttonState = true;
  }
  else {
    order.buttonState = false;
  }
})

events.on('order:address:changed', (address: {address: string}) => {
  console.log('order:address:clicked');
  order.address = address.address;
  buyer.address = address.address;
  order.errors = buyer.errors.paymentType || buyer.errors.address || "";
  if (Object.keys(buyer.errors).length == 0) {
    order.buttonState = true;
  }
  else {
    order.buttonState = false;
  }
})
events.on('order:submit', () => {
  console.log('order:submit');
  contacts = new Contacts(events, cloneTemplate(contactsTemplate));
  buyer.phone = '';
  buyer.email = '';
  modalWindow.modalContent = contacts.render();
})
events.on('contacts:email:changed', (email: { email: string }) => {
  console.log('contacts:email:changed');
  contacts.email = email.email;
  buyer.email = email.email;
  contacts.errors = buyer.errors.email || buyer.errors.phone || "";
  if (Object.keys(buyer.errors).length == 0) {
    contacts.buttonState = true;
  }
  else {
    contacts.buttonState = false;
  }
})

events.on('contacts:phone:changed', (phone: { phone: string }) => {
  console.log('contacts:phone:changed');
  contacts.phone = phone.phone;
  buyer.phone = phone.phone;
  contacts.errors = buyer.errors.email || buyer.errors.phone || "";
  if (Object.keys(buyer.errors).length == 0) {
    contacts.buttonState = true;
  }
  else {
    contacts.buttonState = false;
  }
})

events.on('contacts:submit', () => {
  console.log('contacts:submit');
  const success = new Success(events, cloneTemplate(succsessTemplate));
  const itemsIDs: string[] = [];
  cart.productsToBuy.forEach(element => {
    itemsIDs.push(element.id);
  });
  const data: IApiPostRequestObject = {
  ...buyer.getAllUserData(),
  total: cart.countFullPrice(),
  items: itemsIDs,
  }
  console.log(data);
  commServ.makeOrder(data);
  modalWindow.modalContent = success.render();
  success.totalPrice = cart.countFullPrice();
})

events.on('success:order', () => {
  buyer.clearAllUserData();
  cart.clearCart();
  header.basketCounter = cart.countCartItems();
  modalWindow.close();
})

commServ.getProducts().then((prods) => {
  catalog.products = prods
})