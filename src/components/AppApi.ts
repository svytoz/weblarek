import { IApi, IProductsResponse, IOrderRequest, IOrderResponse } from '../types';

export class AppApi {
    constructor(private api: IApi) {}

    getProducts(): Promise<IProductsResponse> {
        return this.api.get<IProductsResponse>('/product/');
    }

    createOrder(data: IOrderRequest): Promise<IOrderResponse> {
        if (!data.payment) {
            return Promise.reject(new Error('Payment is required'));
        }

        return this.api.post<IOrderResponse>('/order/', data);
    }
}