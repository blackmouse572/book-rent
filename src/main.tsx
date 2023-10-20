import { QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./components/auth-provider";
import PageLoader from "./components/page-loader";
import { Toaster } from "./components/ui/toaster";
import "./index.css";
import { queryClient } from "./lib/query";
import { ROUTES } from "./lib/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Suspense fallback={<PageLoader />}>
                    <RouterProvider router={ROUTES} />
                </Suspense>
            </AuthProvider>
            <Toaster />
        </QueryClientProvider>
    </React.StrictMode>
);
