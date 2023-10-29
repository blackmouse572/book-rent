import { IBook } from "@/types";

export interface IOrderCart {
    _id: string;
    book : IBook[];
    quantity: number;
}