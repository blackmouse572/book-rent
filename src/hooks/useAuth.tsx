// AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types";
type LoginProps = {
    user: User;
    accessToken: string;
};
interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    login: (data: LoginProps) => void;
    logout: () => void;
    setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setToken] = useState<string | null>(null);
    // Load user from localStorage on initial render
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = ({ user, accessToken }: LoginProps) => {
        setUser(user);
        setAccessToken(accessToken);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("user");
    };

    const setAccessToken = (token: string | null) => {
        console.log("Access token changes: " + token);
        setToken(token);
    };

    const authContextValue: AuthContextType = {
        user,
        login,
        logout,
        setAccessToken,
        accessToken,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
