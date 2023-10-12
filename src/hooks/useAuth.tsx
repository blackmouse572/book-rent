import * as datefns from "date-fns";
import React, { createContext, useContext, useEffect, useState } from "react";
import { IToken } from "../apis/auth/types/token";
import { User } from "../types";
type LoginProps = {
    user: User;
    token: Pick<IToken, "expiresIn" | "accessToken">;
};
interface AuthContextType {
    user: User | null;
    login: (data: LoginProps) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = ({ user, token }: LoginProps) => {
        setUser(user);

        const expiresAt = datefns.addSeconds(Date.now(), token.expiresIn);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", token.accessToken);
        localStorage.setItem("expiresIn", JSON.stringify(expiresAt));
    };

    const logout = () => {
        setUser(null);

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("expiresIn");
    };

    const authContextValue: AuthContextType = {
        user,
        login,
        logout,
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
