import { getBookById } from "@/apis/book";
import ChangePassword from "@/pages/(auth)/ChangePassword";
import BookPage from "@/pages/(book)/BookPage";
import AdminLayout from "@/pages/AdminLayout";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const MainLayout = React.lazy(() => import("@/pages/MainLayout"));
const AuthLayout = React.lazy(() => import("@/pages/AuthLayout"));
const InfoAccount = React.lazy(() => import("@/pages/(profile)/InfoAccount"));
const LoginPage = React.lazy(() => import("@/pages/(auth)/login/SignInPage"));
const RegisterPage = React.lazy(
    () => import("@/pages/(auth)/register/RegisterPage")
);
const Policy = React.lazy(
    () => import("@/pages/Policy.tsx")
);
const OrderDetailPage = React.lazy(
    () => import("@/components/historyOrder-table/orderDetail")
);
const OrderDetailPageAdmin = React.lazy(
    () => import("@/components/historyOrder(admin)/orderDetailAdmin")
);
const HomePage = React.lazy(() => import("@/pages/HomePage"));
const LandingPage = React.lazy(() => import("@/pages/LandingPage"));
const HistoryOrderPage = React.lazy(
    () => import("@/pages/historyOrder/HistoryOrderPage")
);
const HistoryOrderManagerPage = React.lazy(
    () => import("@/pages/(admin)/HistoryOrderManagerPage")
);
const ProfilePage = React.lazy(() => import("@/pages/(profile)/Profile"));
const DashboardPage = React.lazy(() => import("@/pages/(admin)/Dashboard"));
const UserManagerPage = React.lazy(
    () => import("@/pages/(admin)/UserManagerPage.tsx")
);
const CreateUser = React.lazy(
    () => import("@/components/user-table/manage-user/create-user.tsx")
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
const CheckoutResult = React.lazy(
    () => import("@/pages/(checkout)/checkout-result-page")
);
const PenaltyPayment = React.lazy(
    () => import("@/pages/(checkout)/penalty-payment-result")
);
const CheckoutFailed = React.lazy(
    () => import("@/pages/(checkout)/checkout-fail-page")
);

const AdminTransaction = React.lazy(
    () => import("@/pages/transaction/AdminTransaction")
);

const UserTransaction = React.lazy(
    () => import("@/pages/transaction/UserTransaction")
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
                path: "/policy",
                element: <Policy />,
            },
            {
                path: "/order/:orderId",
                element: <OrderDetailPage />,
            },
            {
                path: "/transaction",
                element: <UserTransaction />,
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
                        path: "/checkout-result",
                        element: <CheckoutResult />,
                    },
                    {
                        path: "/penalty-payment-result",
                        element: <PenaltyPayment />,
                    },
                    {
                        path: "/checkout-failed",
                        element: <CheckoutFailed />,
                    },
                ],
            },
            {
                path: "/profile/orders",
                element: <HistoryOrderPage />,
            },
            {
                path: "/admin",
                element: <AdminLayout />,
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
                        path: "/admin/user/create",
                        element: <CreateUser />,
                    },
                    {
                        path: "/admin/orders",
                        element: <HistoryOrderManagerPage />,
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
                    {
                        path: "/admin/transaction",
                        element: <AdminTransaction />,
                    },
                    {
                        path: "/admin/orders/:orderId",
                        element: <OrderDetailPageAdmin />,
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
