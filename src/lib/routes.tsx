import { getBookById } from "@/apis/book";
import ChangePassword from "@/pages/(auth)/ChangePassword";
import BookPage from "@/pages/(book)/BookPage";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const MainLayout = React.lazy(() => import("@/pages/MainLayout"));
const AuthLayout = React.lazy(() => import("@/pages/AuthLayout"));
const InfoAccount = React.lazy(() => import("@/pages/(profile)/InfoAccount"));
const LoginPage = React.lazy(() => import("@/pages/(auth)/login/SignInPage"));
const RegisterPage = React.lazy(
    () => import("@/pages/(auth)/register/RegisterPage")
);

const HomePage = React.lazy(() => import("@/pages/HomePage"));
const LandingPage = React.lazy(() => import("@/pages/LandingPage"));
const HistoryOrderPage = React.lazy(
    () => import("@/pages/historyOrder/HistoryOrderPage")
);
const ProfilePage = React.lazy(() => import("@/pages/(profile)/Profile"));
const DashboardPage = React.lazy(() => import("@/pages/(admin)/Dashboard"));
const UserManagerPage = React.lazy(
    () => import("@/pages/(admin)/UserManagerPage.tsx")
);
const BookManagerPage = React.lazy(
    () => import("@/pages/(admin)/BookManagerPage.tsx")
);
const CategoryManagerPage = React.lazy(
    () => import("@/pages/(admin)/CategoryManagerPage.tsx")
);

const BookDetailPage = React.lazy(
    () => import("@/pages/(book)/BookDetailPage.tsx")
);
const BookDetailAdminPage = React.lazy(
    () => import("@/components/book-table/manage-book/book-detail")
);

const CartLayout = React.lazy(() => import("@/pages/CartLayout"));
const ShoppingCart = React.lazy(() => import("@/components/cart/cart"));
const CartForm = React.lazy(() => import("@/components/cart/cart-form"));
const ViewCart = React.lazy(() => import("@/pages/(cart)/view-cart"));
const ViewCheckout = React.lazy(
    () => import("@/pages/(checkout)/view-checkout")
);
const CheckoutSuccess = React.lazy(
    () => import("@/pages/(checkout)/checkout-success-page")
);
const CheckoutFailed = React.lazy(
    () => import("@/pages/(checkout)/checkout-fail-page")
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
                path: "/profile/orders",
                element: <HistoryOrderPage />,
            },
            {
                element: <CartLayout />,
                children: [
                    {
                        element: <ShoppingCart />,
                    },
                    {
                        element: <CartForm />,
                    },
                    {
                        path: "/viewcart",
                        element: <ViewCart />,
                    },
                    {
                        path: "/view-checkout/:id",
                        element: <ViewCheckout />,
                    },
                    {
                        path: "/checkout-success",
                        element: <CheckoutSuccess />,
                    },
                    {
                        path: "/checkout-failed",
                        element: <CheckoutFailed />,
                    },
                ],
            },
            {
                path: "/infoaccount",
                element: <InfoAccount />,
            },

            {
                element: <CartLayout />,
                children: [
                    {
                        element: <ShoppingCart />,
                    },
                    {
                        element: <CartForm />,
                    },
                    {
                        path: "/viewcart",
                        element: <ViewCart />,
                    },
                    {
                        path: "/view-checkout/:id",
                        element: <ViewCheckout />,
                    },
                    {
                        path: "/checkout-success",
                        element: <CheckoutSuccess />,
                    },
                    {
                        path: "/checkout-failed",
                        element: <CheckoutFailed />,
                    },
                ],
            },

            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/admin",

                children: [
                    {
                        index: true,
                        element: <DashboardPage />,
                    },
                    {
                        path: "/admin/user",
                        element: <UserManagerPage />,
                    },
                    {
                        path: "/admin/category",
                        element: <CategoryManagerPage />,
                    },
                    {
                        path: "/admin/book",
                        element: <BookManagerPage />,

                    }, 
                    {
                        path: "/admin/book/:id",
                        element: <BookDetailAdminPage />,
                    },               
                ],
            },
            {
                path: "books",
                element: <BookPage />,
            },
            {
                path: "books/:id",
                loader: async ({ params }) => {
                    const book = await getBookById(params.id as string);
                    return {
                        book,
                    };
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
