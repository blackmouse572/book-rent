import { IDefaultQuery, IResponse, ROLE } from "@/types";
import { IBook } from "@/types/book";
import { faker } from "@faker-js/faker";

export function getBookById(id: string) {
    // TODO: Replace this with an actual API call
    const book: IBook = {
        _id: id,
        description: faker.lorem.paragraphs(),
        name: faker.lorem.sentence(),
        image: faker.image.urlLoremFlickr({
            height: 700,
            width: 500,
            category: "book",
        }),
        isAvailable: faker.datatype.boolean(),
        genres: Array.from(
            { length: faker.number.int({ min: 1, max: 5 }) },
            () => ({
                _id: faker.string.uuid(),
                name: faker.music.genre(),
            })
        ),
        rental_price: faker.number.int(),
        category_id: faker.string.uuid(),
        deposit: faker.number.int(),
        keywords: Array.from(
            { length: faker.number.int({ min: 1, max: 10 }) },
            () => faker.lorem.word()
        ),
        reviews: Array.from(
            { length: faker.number.int({ min: 1, max: 20 }) },
            () => ({
                _id: faker.string.uuid(),
                user_id: faker.string.uuid(),
                comment: faker.lorem.paragraph(),
                rating: faker.number.int({ min: 1, max: 5 }),
                book_id: id,
                createdAt: faker.date.past(),
                updatedAt: faker.date.past(),
            })
        ),
        author: {
            _id: faker.string.uuid(),
            email: faker.internet.email(),
            fullName: faker.person.fullName(),
            avatar: faker.image.avatar(),
            blocked: false,
            role: ROLE.USER,
            username: faker.internet.userName(),
            address: faker.location.streetAddress(),
            password: faker.internet.password(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.past(),
        },
    };

    return new Promise<IBook>((resolve) => {
        setTimeout(() => resolve(book), 1000);
    });
    // return authAxiosClient.get(`/book/${id}`);
}

export type GetManyBooksParams = {
    genres?: string[];
    authors?: string[];
    reviews?: number;
} & Partial<IDefaultQuery>;

export function getManyBooks({ perPage = 40 }: GetManyBooksParams) {
    // TODO: Replace this with an actual API call

    const books: IBook[] = Array.from({ length: perPage }, () => ({
        _id: faker.string.uuid(),
        description: faker.lorem.paragraphs(),
        name: faker.lorem.sentence(),
        image: faker.image.urlLoremFlickr({
            height: 700,
            width: 500,
            category: "book",
        }),
        isAvailable: faker.datatype.boolean(),
        genres: Array.from(
            { length: faker.number.int({ min: 1, max: 5 }) },
            () => ({
                _id: faker.string.uuid(),
                name: faker.music.genre(),
            })
        ),
        rental_price: faker.number.int(),
        category_id: faker.string.uuid(),
        deposit: faker.number.int(),
        keywords: Array.from(
            { length: faker.number.int({ min: 1, max: 10 }) },
            () => faker.lorem.word()
        ),
        reviews: [],
        author: {
            _id: faker.string.uuid(),
            email: faker.internet.email(),
            fullName: faker.person.fullName(),
            avatar: faker.image.avatar(),
            blocked: false,
            role: ROLE.USER,
            username: faker.internet.userName(),
            address: faker.location.streetAddress(),
            password: faker.internet.password(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.past(),
        },
    }));

    const reponse: IResponse<IBook[]> = {
        data: books,
        _pagination: {
            total: 100,
            totalPage: Math.ceil(100 / perPage),
        },
    };
    return new Promise<IResponse<IBook[]>>((resolve) => {
        setTimeout(() => resolve(reponse), 1000);
    });
}
