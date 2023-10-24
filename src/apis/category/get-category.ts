import { IResponse } from "@/types";
import { ICategory } from "@/types/category";
import { faker } from "@faker-js/faker";

export function getCategoryById(id: string) {
    // TODO: Replace this with an actual API call
    const category: ICategory = {
        _id: id,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(),
        isAvailable: faker.datatype.boolean(),
    };

    return new Promise<ICategory>((resolve) => {
        setTimeout(() => resolve(category), 1000);
    });
    // return authAxiosClient.get(`/category/${id}`);
}

export function getManyCategories({ perPage = 10 }) {
    // TODO: Replace this with an actual API call

    const categorys: ICategory[] = Array.from({ length: perPage }, () => ({
        _id: faker.string.uuid(),
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(),
        isAvailable: faker.datatype.boolean(),
    }));

    const reponse: IResponse<ICategory[]> = {
        data: categorys,
        _pagination: {
            total: 20,
            totalPage: Math.ceil(20 / perPage),
        },
    };
    return new Promise<IResponse<ICategory[]>>((resolve) => {
        setTimeout(() => resolve(reponse), 1000);
    });
}
