// AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../type";

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (user: User) => void;
    logout: () => void;
    setAccessToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    // Load user from localStorage on initial render
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (user: User) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const setAccessToken = (token: string) => {
        setToken(token);
    };

    const authContextValue: AuthContextType = {
        user,
        login,
        logout,
        setAccessToken,
        token,
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
