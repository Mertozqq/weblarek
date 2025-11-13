export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = "cash" | "online" | "";
export type CategoryKey = "софт-скил" | "хард-скил" | 'кнопка' | 'дополнительное' | 'другое'


export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export interface IApiGetResponseObject {
  total: number;
  items: IProduct[];
}

export interface IApiPostRequestObject extends IBuyer, IApiGetResponseObject {
}

export interface IApiPostResponseObject {
  id: string;
  total: number;
}


export interface ICardActions {
  onClick(): void;
}