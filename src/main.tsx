import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./hooks/useAuth";
import "./index.css";
import { queryClient } from "./lib/query";
import { ROUTES } from "./lib/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={ROUTES} />
            </AuthProvider>
            <Toaster />
        </QueryClientProvider>
    </React.StrictMode>
);
