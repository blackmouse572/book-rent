import { ICategory } from "@/types/category";
import { IGenre, IReview } from ".";

export interface IBook {
    _id: string;
    name: string;
    category?: ICategory[];
    image: string;
    description: string;
    rental_price: number;
    isAvailable: boolean;
    deposit?: number;
    keywords?: string[];
    genres?: IGenre[];
    reviews?: IReview[];
    author?: string;
    creatAt?: Date;
    updaetAt?: Date;
    status?: "ENABLE" | "DISABLE";
}
