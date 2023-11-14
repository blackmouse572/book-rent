import { User } from "@/types";

export interface ITransaction {
    _id: string;
    user: User;
    order: string;
    amount: number;
    type: TRANSACTION_TYPE_ENUM;
    createdAt: Date;
}

export enum TRANSACTION_TYPE_ENUM {
    CHECKOUT = "CHECKOUT",
    PENALTY = "PENALTY",
}
