import { getBookById } from "@/apis/book";
import { IBook } from "@/types";
import { faker } from "@faker-js/faker";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const MainLayout = React.lazy(() => import("@/pages/MainLayout"));
const AuthLayout = React.lazy(() => import("@/pages/AuthLayout"));

const LoginPage = React.lazy(() => import("@/pages/(auth)/login/SignInPage"));
const RegisterPage = React.lazy(
    () => import("@/pages/(auth)/register/RegisterPage")
);

const HomePage = React.lazy(() => import("@/pages/HomePage"));
const LandingPage = React.lazy(() => import("@/pages/Landing"));

const ProfilePage = React.lazy(() => import("@/pages/(profile)/Profile"));
const UserManagerPage = React.lazy(
    () => import("@/pages/(admin)/UserManagerPage.tsx")
);
const BookDetailPage = React.lazy(
    () => import("@/pages/(book)/BookDetailPage.tsx")
);

export const ROUTES = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            },
            {
                path: "/landing",
                element: <LandingPage />,
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
                path: ":genre/:id",
                loader: async () => {
                    const book_id = faker.database.mongodbObjectId();
                    const book: IBook = await getBookById(book_id);
                    return book;
                },
                element: <BookDetailPage />,
            },
        ],
    },
]);
