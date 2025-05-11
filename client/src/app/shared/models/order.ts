import { IAddress } from './address';

export interface IOrderToCreate {
  basketId: string;
  shippingOptionId: number;
  shippingAddress: IAddress;
}

export interface IOrder {
  id: number;
  buyerEmail: string;
  orderDate: string;
  shippingAddress: IAddress;
  shippingOption: string;
  shippingPrice: number;
  orderItems: IOrderItem[];
  subtotal: number;
  total: number;
  status: string;
}

export interface IOrderItem {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}
