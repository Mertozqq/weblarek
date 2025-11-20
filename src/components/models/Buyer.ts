import { TPayment, IBuyer } from "../../types";
import { IEvents } from "../base/Events";


export class Buyer {
  constructor(private events: IEvents) {}
  private __buyer: IBuyer = {payment: "", email: "", phone: "", address: ""};

  private __paymentType: TPayment = "";
  private __address: string = "";
  private __email: string = "";
  private __phone: string = "";

  private __errors: {
    paymentType?: string;
    address?: string;
    email?: string;
    phone?: string;
  } = {};

  get errors(): { paymentType?: string; address?: string; email?: string; phone?: string } {
    return this.__errors;
  }

  isPaymentValid(): boolean {
      return this.__paymentType != "";
  }
  set paymentType(paymentType: TPayment) {
    delete this.__errors['paymentType'];
    this.__paymentType = paymentType;
    if (!this.isPaymentValid()) {
      this.__errors['paymentType'] = "Неправильный способ оплаты";
    }
    this.emitChange();
  }
  
  isAddressValid(): boolean {
      return this.__address != "";
  }
  set address(address: string) {
    delete this.__errors['address'];
    this.__address = address;
    if (!this.isAddressValid()) {
      this.__errors['address'] = "Необходимо указать адрес";
    }
    this.emitChange();
  }
  
  isEmailValid(): boolean {
      return this.__email != "";
  }
  set email(email: string) {
    delete this.__errors['email'];
    this.__email = email;
    if (!this.isEmailValid()) {
      this.__errors['email'] = "Неправильный email";
    }
    this.emitChange();
  }
  
  isPhoneValid(): boolean {
      return this.__phone != "";
  }
  set phone(phone: string) {
    delete this.__errors['phone'];
    this.__phone = phone;
    if (!this.isPhoneValid()) {
      this.__errors['phone'] = "Неправильный номер телефона";
    }
    this.emitChange();
  }
  
  getAllUserData(): IBuyer {
    this.__buyer.address = this.__address;
    this.__buyer.phone = this.__phone;
    this.__buyer.email = this.__email;
    this.__buyer.payment = this.__paymentType;
    return this.__buyer;
  }
  clearAllUserData(): void {
    this.__paymentType = "";
    this.__address = "";
    this.__email = "";
    this.__phone = "";
    this.__errors = {};
    this.emitChange();
  }
  private emitChange() {
    this.events.emit('buyer:changed', {
      buyer: this.getAllUserData(),
      errors: this.errors
    });
  }
}