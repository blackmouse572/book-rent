import { Outlet } from "react-router-dom";
import TailwindIndicator from "../components/Tailwind-Indicator";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { authAxiosClient } from "@/lib/axios";
import revokeRefreshToken from "@/apis/auth/apis/refresh.api";

function MainLayout() {
    const { user, logout, accessToken, setAccessToken } = useAuth();
    useEffect(() => {
        authAxiosClient.interceptors.request.use(
            (config) => {
                if (!config.headers.Authorization && accessToken) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`;
                }
                console.log("Get request with", config.headers.Authorization);

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        authAxiosClient.interceptors.response.use(
            (res) => {
                return res;
            },
            async (err) => {
                const originReq = err.config;
                if (err.response.status === 401 && !originReq._retry) {
                    originReq._retry = true;
                    try {
                        const refresh = await revokeRefreshToken();
                        const tokens = refresh.data.data;
                        const accessToken = tokens.accessToken;

                        setAccessToken(tokens.accessToken);

                        authAxiosClient.defaults.headers.common[
                            "Authorization"
                        ] = "Bearer " + accessToken;

                        return authAxiosClient(originReq);
                    } catch (error) {
                        logout();
                    }
                }
                return Promise.reject(err);
            }
        );
    }, [accessToken, logout, setAccessToken, user]);
    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <TailwindIndicator />
            <Outlet />
        </div>
    );
}

export default MainLayout;
