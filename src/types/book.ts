import { ICategory } from "@/types/category";
import { User } from ".";

export interface IBook {
    isAvailable?: boolean | undefined;
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
    keyword: string;
    genres?: string[];
    status: "NEW" | "LIKE_NEW" | "DAMAGED";
    statusDescription: string;
}

export enum BOOK_STATUS {
    NEW = "NEW",
    LIKE_NEW = "LIKE_NEW",
    DAMAGED = "DAMAGED",
}
export interface IReview {
    _id: string;
    author: Pick<User, "_id" | "email" | "avatar" | "fullName">;
    comment: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}
