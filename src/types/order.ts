import { IOrderCart } from "@/types/order_cart";
import { User } from "@/types/user";

    export interface IOrder {
        _id?: string;
        cart: IOrderCart[];
        userId?: User;
        rentalDate: Date;
        returnDate: Date;
        pickupLocation: string;
        returnLocation: string;
        totalPrice?: number;
        deposit?: number;
        penalty?: number;
        penaltyReason?: string;
        depositType: "COD" | "ONLINE";
        status?: STATUS;
        createdAt?: Date;
        updatedAt?: Date;
      }

    export enum STATUS {
        REJECTED = 'REJECTED',
        RETURNED = 'RETURNED',
        CANCELLED = 'CANCELLED',
        PENDING = 'PENDING',
    }
    
    export enum DEPOSITTYPE {
        COD = "COD",
        ONLINE = "ONLINE",
    }