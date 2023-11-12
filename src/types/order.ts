import { IOrderCart } from "@/types/order_cart";
import { User } from "@/types/user";

export interface IOrder {
    _id?: string;
    cart?: IOrderCart[];
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
    status?: ENUM_ORDER_STATUS;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum ENUM_ORDER_STATUS {
    REJECTED = "REJECTED",
    RETURNED = "RETURNED",
    CANCELLED = "CANCELLED",
    PENDING = "PENDING",
}

export enum ENUM_DEPOSIT_TYPE {
    COD = "COD",
    ONLINE = "ONLINE",
}
