import { User } from "@/types";

export interface ITransaction {
    _id: string;
    user: User;
    order: string;
    amount: number;
    createdAt: Date;
}
