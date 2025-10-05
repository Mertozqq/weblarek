import { TPayment, IBuyer } from "../../types";


export class Buyer {
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

  isPaymentValid(): boolean {
    if (this.__paymentType != "") {
      return true;
    }
    return false;
  }
  set paymentType(paymentType: TPayment) {
    this.__paymentType = paymentType;
    if (!this.isPaymentValid()) {
      this.__errors['paymentType'] = "Неправильный способ оплаты";
    }
  }
  
  isAddressValid(): boolean {
    if (this.__address != "") {
      return true;
    }
    return false;
  }
  set address(address: string) {
    this.__address = address;
    if (!this.isAddressValid()) {
      this.__errors['address'] = "Неправильный адрес";
    }
  }
  
  isEmailValid(): boolean {
    if (this.__email != "") {
      return true;
    }
    return false;
  }
  set email(email: string) {
    this.__email = email;
    if (!this.isEmailValid()) {
      this.__errors['email'] = "Неправильный email";
    }
  }
  
  isPhoneValid(): boolean {
    if (this.__phone != "") {
      return true;
    }
    return false;
  }
  set phone(phone: string) {
    this.__phone = phone;
    if (!this.isPhoneValid()) {
      this.__errors['phone'] = "Неправильный номер телефона";
    }
  }
  
  
  getAllUserData(): IBuyer {
    this.__buyer.address = this.__address;
    this.__buyer.phone = this.__phone;
    this.__buyer.email = this.__email;
    this.__buyer.payment = this.__paymentType;
    return this.__buyer;
  }
  clearAllUserData(): void {
    this.__buyer.address = "";
    this.__buyer.phone = "";
    this.__buyer.email = "";
    this.__buyer.payment = "";
  }

}