import { User } from "@/types";

export interface IReview {
    _id: string;
    author: Pick<User, "_id" | "email" | "avatar" | "fullName">;
    comment: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}
