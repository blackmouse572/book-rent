import BookPage from "@/pages/(book)/BookPage";
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

                element: <CartLayout />,
                children: [
                    {
                        element: <ShoppingCart />,
                    },
                    {
                        element: <CartForm />
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
                element: <CartLayout />,
                children: [
                    {
                        element: <ShoppingCart />,
                    },
                    {
                        element: <CartForm />
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
                path: "/admin",
                children: [
                    {
                        path: "/admin/user",
                        element: <UserManagerPage />,
                    },

                   

                    {
                        path: "/admin/category",
                        element: <CategoryManagerPage />,
                    },

                ],
                    
            },
            {
                path: "books",
                element: <BookPage />,
            },
            {
                path: "books/:id",
                element: <BookDetailPage />,
            },
        ],
    },
    {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/register',
            element: <RegisterPage />,
          },
          {
            path: '/sidebar',
            element: <Sidebar />,
          },
        ],
      },
    ],
  },
]);