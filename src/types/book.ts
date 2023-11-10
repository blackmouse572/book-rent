import { ICategory } from "@/types/category";
import { IGenre, IReview, User } from ".";

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
    author?: User;
    creatAt?:Date;
    updatedAt?: Date;
    status?: "ENABLE" | "DISABLE"
}
