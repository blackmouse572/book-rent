import React from "react";
import { createBrowserRouter } from "react-router-dom";

const MainLayout = React.lazy(() => import("../pages/MainLayout"));
const AuthLayout = React.lazy(() => import("../pages/AuthLayout"));

const LoginPage = React.lazy(() => import("../pages/(auth)/login/SignInPage"));
const RegisterPage = React.lazy(
    () => import("../pages/(auth)/register/RegisterPage")
);

const HomePage = React.lazy(() => import("../pages/HomePage"));
const ProfilePage = React.lazy(() => import("../pages/(profile)/Profile"));
const UserManagerPage = React.lazy(
    () => import("../pages/(admin)/UserManagerPage")
);
const BookDetailPage = React.lazy(() => import("@/pages/"));

// eslint-disable-next-line react-refresh/only-export-components
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
        ],
    },
]);
