import { IBook } from "@/types";

export interface IOrderCart {
    bookId : IBook["_id"];
    quantity: number;
}