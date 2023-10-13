import { useAuth } from "@/hooks/useAuth.1";
import { Navigate, Outlet } from "react-router-dom";

function AuthLayout() {
    const { user } = useAuth();
    if (user) return <Navigate to={"/"} replace={true} />;
    return <Outlet />;
}

export default AuthLayout;
