import { IResponse } from "@/types";
import { IProduct } from "@/types/order";
import { faker } from "@faker-js/faker";

export function getOrderById(id: string) {
    // TODO: Replace this with an actual API call
    const product: IProduct = {
        _id: id,
        name: faker.lorem.sentence(10),
        image: faker.image.urlLoremFlickr({
            height: 700,
            width: 500,
            category: "book",
        }),
        price: faker.number.int(),
        quantity: faker.number.int(),
    };

    return new Promise<IProduct>((resolve) => {
        setTimeout(() => resolve(product), 1000);
    });
    // return authAxiosClient.get(`/book/${id}`);
}

export function getManyOrders() {
    // TODO: Replace this with an actual API call

    const numProducts = 1; // Change this to the desired number of products

    const products: IProduct[] = [];

    for (let i = 0; i < numProducts; i++) {
        const product: IProduct = {
            _id: faker.string.uuid(),
            name: faker.lorem.sentence({min: 5, max: 10}),
            image: faker.image.urlLoremFlickr({
                height: 700,
                width: 500,
                category: "book",
            }),
            price: faker.number.int({ min: 1, max: 1000 }),
            quantity: faker.number.int({ min: 1, max: 1000 }),
        };

        products.push(product);
    }

    const response: IResponse<IProduct[]> = {
        data: products,
    };

    return new Promise<IResponse<IProduct[]>>((resolve) => {
        setTimeout(() => resolve(response), 1000);
    });
}
