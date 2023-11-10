import { ICategory } from "@/types/category";
import {  User } from ".";

export interface IBook {
    _id?: string;
    name: string;
    image: string ;
    description: string;
    category: ICategory[];
    rental_price: number;
    isAvailable: boolean;
    deposit?: number;
    keywords?: string[];
    genres?: string[];
    reviews?: IReview[];
    author?: string;
    creatAt?: Date;
    updaetAt?: Date;
    status?: "ENABLE" | "DISABLE";
}

export enum STATUS {
    ENABLE = 'ENABLE',
    DISABLE = 'DISABLE',
}
export interface IReview {
    _id: string;
    author: Pick<User, "_id" | "email" | "avatar" | "fullName">;
    comment: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}
