import { IApi, IApiPostRequestObject, IApiGetResponseObject, IProduct } from "../../types";

export class CommunicationService {
  private api: IApi;

  constructor(apiObj: IApi) {
    this.api = apiObj;
  }

  async getProducts(): Promise<IProduct[]> {
    const prodObj: IApiGetResponseObject = await this.api.get("/product");
    return prodObj.items;
  }
  makeOrder(data: IApiPostRequestObject) {
    this.api.post("/order", data);
  }
}