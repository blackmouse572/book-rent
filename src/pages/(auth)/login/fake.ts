import { faker } from "@faker-js/faker";
import { User } from "../../../types";

const FAKE_USER: User[] = Array.from({ length: 10 }, (_, i) => ({
    id: faker.internet.userName(),
    email: i === 0 ? "test@gmail.com" : faker.internet.email(),
    fullName: faker.person.fullName(),
    role: faker.helpers.arrayElement(["admin", "user"]),
    password: "12345678aA",
    avatar: faker.image.avatar(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
}));

export default FAKE_USER;
