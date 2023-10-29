import { User } from "@/types";
import { IOrderCart } from "@/types/order_cart";

export interface IOrder {
    _id: string;
    userId: User;
    cart: IOrderCart;
    rentalDate: Date;
    returnDate: Date;
    pickupLocation: string;
    returnLocation: string;
    totalPrice: number;
    status: STATUS;
    depositType: DEPOSITTYPE;
}

export enum STATUS {
    SHIPPING = "SHIPPING",
    DONE = "DONE",
    EXPIRED = "EXPIRED",
    PENDING = "PENDING",
}

export enum DEPOSITTYPE {
    COD = "COD",
    ONLINE = "ONLINE",
}
