import { ICategory } from "@/types/category";
import { User } from ".";

export interface IBook {
    _id: string;
    name: string;
    author: string;
    image: string;
    description: string;
    deposit?: number;
    rental_price: number;
    category?: ICategory[];
    reviews?: IReview[];
    createdAt?: Date;
    updatedAt?: Date; 
    keywords?: string[];
    genres?: string[];
    status?: "ENABLE" | "DISABLE";
}

export interface IReview {
    _id: string;
    author: Pick<User, "_id" | "email" | "avatar" | "fullName">;
    comment: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

export enum STATUS {
    ENABLE = 'ENABLE',
    DISABLE = 'DISABLE',
}