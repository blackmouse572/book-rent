import { getBookById } from "@/apis/book";
import BookPage from "@/pages/(book)/BookPage";
import { IBook } from "@/types";
import { faker } from "@faker-js/faker";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const MainLayout = React.lazy(() => import("@/pages/MainLayout"));
const AuthLayout = React.lazy(() => import("@/pages/AuthLayout"));
const InfoAccount =React.lazy(() => import("@/pages/(profile)/InfoAccount"));
const LoginPage = React.lazy(() => import("@/pages/(auth)/login/SignInPage"));
const ChangePassword =React.lazy(() => import("@/pages/(auth)/ChangePassword"));
const RegisterPage = React.lazy(
    () => import("@/pages/(auth)/register/RegisterPage")
);

const HomePage = React.lazy(() => import("@/pages/HomePage"));
const LandingPage = React.lazy(() => import("@/pages/LandingPage"));
const HistoryOrderPage = React.lazy(() => import("@/pages/historyOrder/HistoryOrderPage"));
const ProfilePage = React.lazy(() => import("@/pages/(profile)/Profile"));
const UserManagerPage = React.lazy(
    () => import("@/pages/(admin)/UserManagerPage.tsx")
);



const CategoryManagerPage = React.lazy(
    () => import("@/pages/(admin)/CategoryManagerPage.tsx")
);

const BookDetailPage = React.lazy(
    () => import("@/pages/(book)/BookDetailPage.tsx")
);

export const ROUTES = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            },
            {
                path: "/infoaccount",
                element: <InfoAccount />,
            },
         
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/HistoryOrderPage",
                element: <HistoryOrderPage/>,
            },
            {
                path: "/admin",
                children: [
                    {
                        path: "/admin/user",
                        element: <UserManagerPage />,
                    },

                   

                    {
                        path: "/admin/category",
                        element: <CategoryManagerPage/>,
                    },

                ],
                    
            },
            {
                path: "books",
                loader: async () => {
                    const book_id = faker.database.mongodbObjectId();
                    const book: IBook = await getBookById(book_id);
                    return book;
                },
                element: <BookPage />,
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
            {
                path: "/forgot",
                element: <ChangePassword />,
            },
        ],
    },
]);