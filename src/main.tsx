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
import { CartProvider } from "@/hooks/useOrderCart";
import { OrderProvider } from "@/hooks/useOrder";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <OrderProvider>
                    <CartProvider>
                        <Suspense fallback={<PageLoader />}>
                            <RouterProvider router={ROUTES} />
                        </Suspense>
                    </CartProvider>
                </OrderProvider>
            </AuthProvider>
            <Toaster />
        </QueryClientProvider>
    </React.StrictMode>
);
