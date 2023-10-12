import { faker } from "@faker-js/faker";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import UserManagerPage from "../pages/(admin)/UserManagerPage";
import LoginPage from "../pages/(auth)/login/SignInPage";
import RegisterPage from "../pages/(auth)/register/RegisterPage";
import AuthLayout from "../pages/AuthLayout";
import MainLayout from "../pages/MainLayout";
import { IBook } from "../types";
const HomePage = React.lazy(() => import("../pages/HomePage"));
const Profile = React.lazy(() => import("../pages/(profile)/Profile"));
const BookDetailPage = React.lazy(() => import("../pages/BookDetailPage"));
const ROUTES = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: "/login",
                        element: <LoginPage />,
                    },
                    {
                        path: "/register",
                        element: <RegisterPage />,
                    },
                ],
            },
            {
                path: "/admin",
                children: [
                    {
                        path: "/admin/user",
                        element: <UserManagerPage />,
                    },
                ],
            },
            {
                path: "books/:id",
                loader: () => {
                    const book_id = faker.database.mongodbObjectId();
                    const book: IBook = {
                        _id: book_id,
                        name: faker.animal.crocodilia(),
                        description: faker.lorem.paragraph(),
                        image: faker.image.url(),
                        isAvailable: faker.datatype.boolean(),
                        rental_price: faker.number.int(),
                        category_id: faker.database.mongodbObjectId(),
                        deposit: faker.number.int(),
                        genres: [
                            {
                                _id: faker.database.mongodbObjectId(),
                                name: faker.music.genre(),
                            },
                        ],
                        keywords: [faker.lorem.word()],
                        reviews: Array.from({ length: 10 }).map(() => ({
                            _id: faker.database.mongodbObjectId(),
                            book_id: book_id,
                            comment: faker.lorem.paragraph(),
                            rating: faker.number.int({
                                min: 1,
                                max: 5,
                            }),
                            createdAt: faker.date.past(),
                            updatedAt: faker.date.past(),
                            user_id: faker.database.mongodbObjectId(),
                        })),
                    };
                    return book;
                },
                element: <BookDetailPage />,
            },
        ],
    },
]);

export default ROUTES;
