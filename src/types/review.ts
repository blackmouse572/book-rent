export interface IReview {
    _id: string;
    user_id: string;
    book_id: string;
    comment: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}
