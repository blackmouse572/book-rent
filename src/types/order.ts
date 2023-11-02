import { IBook } from "@/types";

export interface IOrder {
    _id: string;
    bookId: string;
    userId: string;
    nameBook: string; 
    imageBook: string; 
    rentalDate: Date;
    returnDate: Date;
    pickupLocation: string;
    returnLocation: string;
    totalPrice: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IOrderCart{
    _id:string;
    book:IBook[];
    quantity:number;

}
export enum STATUS {
    SHIPPING = "SHIPPING",
    DONE = "DONE",
    EXPIRED = "EXPIRED",
}
export enum DEPOSITTYPE {
    ONLINE = "ONLINE",
    COD = "COD",
}

