import { IBook} from "@/types";

    export interface IOrder {
        _id: string;
        cart:IOrderCart;
        rentalDate: Date;
        returnDate: Date;
        pickupLocation: string;
        returnLocation: string;
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
      
export interface IOrderCart {
    _id: string;
    bookId: IBook[];
    quantity: number;
}
