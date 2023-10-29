export interface IProduct {
    _id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}
// export interface IOrder {
//     _id: string;
//     bookId: string;
//     userId: string;
//     rentalDate: Date;
//     returnDate: Date;
//     pickupLocation: string;
//     returnLocation: string;
//     totalPrice: number;
//     status: "SHIPPING" | "DONE" | "EXPIRED";
//     quantity: number;
//     depositType: "Online" | "COD";
//     createdAt: Date;
//     updatedAt: Date;
// }
