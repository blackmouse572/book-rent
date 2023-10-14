import { IGenre, IReview, User } from ".";

export interface IBook {
    _id: string;
    name: string;
    category_id?: string;
    image: string;
    description: string;
    rental_price: number;
    isAvailable: boolean;
    deposit?: number;
    keywords?: string[];
    genres?: IGenre[];
    reviews?: IReview[];
    author?: User;
}
