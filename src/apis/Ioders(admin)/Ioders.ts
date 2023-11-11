// import { IResponse } from "@/types";
// import { IOrder } from "@/types/order";
// import { faker } from "@faker-js/faker";
// import _ from 'lodash';

// export function getOrderById(id: string) {
//     // TODO: Replace this with an actual API call
//     const product: IOrder = {
//         _id: id,
//         bookId: id,
//         userId:id,
//         rentalDate: faker.date.anytime,
//         image: faker.image.urlLoremFlickr({
//             height: 700,
//             width: 500,
//             category: "book",
//         }),
//         totalPrice: faker.number.int(),
//         quantity: faker.number.int()
//     };

//     return new Promise<IOrder>((resolve) => {
//         setTimeout(() => resolve(product), 1000);
//     });
//     // return authAxiosClient.get(/book/${id});
// }

// export function getManyOrders() {
//     // TODO: Replace this with an actual API call

//     const numProducts = 10; // Change this to the desired number of products

//     const products: IOrder[] = [];

//     for (let i = 0; i < numProducts; i++) {
//         const product: IOrder = {
//             _id: faker.datatype.uuid(),
//             bookId: faker.datatype.uuid(),
//             userId: faker.datatype.uuid(),
//             nameBook: faker.lorem.words(1), // Tạo tên sách giả
//             imageBook: faker.image.imageUrl(1200, 900, "book", true), // Tạo URL ảnh sách giả
//             rentalDate: faker.date.past(),
//             returnDate: faker.date.recent(),
//             pickupLocation: faker.address.cityName(),
//             returnLocation: faker.address.cityName(),
//             totalPrice: faker.datatype.number({ min: 1000, max: 100000 })+' VNĐ',
//             status: _.sample(["SHIPPING", "DONE", "EXPIRED"]) as "SHIPPING" | "DONE" | "EXPIRED",
//             quantity: faker.datatype.number({ min: 1, max: 10 }),
//             depositType: _.sample(["Online", "COD"]) as "Online" | "COD",
//             createdAt: faker.date.past(),
//             updatedAt: faker.date.recent()
//         };
    
//         products.push(product);
//     }

//     const response: IResponse<IOrder[]> = {
//         data: products,
//     };

//     return new Promise<IResponse<IOrder[]>>((resolve) => {
//         setTimeout(() => resolve(response), 1000);
//     });
// }

// export type { IOrder };
import { IOrder } from "@/types/order";
import { authAxiosClient } from "../../lib/axios";
import { IQueryPagination, IQuerySearch, IResponse } from "../../types";

export type IGetAllOrderResponse = IResponse<IOrder[]>;

export async function getAllOrderApi(
    params: Partial<IQueryPagination & IQuerySearch>
) {
    return await authAxiosClient
        .get("/orders/list", {
           params,
        })
        .then((res) => res.data);
}


async function getOrderApi(
    _id: string,
) {
    return await authAxiosClient
        .get(`/orders/${_id}`, { 
        })
        .then((response) => {
            return response.data;
        })
}

export { getOrderApi };    export type { IOrder };

