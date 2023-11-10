import { ICategory } from "@/types/category";
import { IGenre, IReview } from ".";

export interface IBook {
    _id?: string;
    name: string;
    author: string;
    image: File | null;
    description: string;
    deposit?: number;
    rental_price: number;
    status?: "ENABLE" | "DISABLE";
    category?: ICategory[];
    keyword?: string[];
    genres?: IGenre[] | undefined;
    reviews?: IReview[];
    createdAt?: Date;
    updatedAt?: Date; 
    
}

export enum STATUS {
    ENABLE = 'ENABLE',
    DISABLE = 'DISABLE',
}