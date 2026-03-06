
import { useAuthStore } from "@/store/auth";
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { Navigate } from "react-router";

interface AuthContextType {
    isLoggedin: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthProvider({ children }: AuthProviderProps): JSX.Element {

    const isAuthenticated = useAuthStore(s => s.isAuthenticated)

    const contextValues = {
        isLoggedin: isAuthenticated,
    }
    return <AuthContext.Provider value={contextValues}>
        {isAuthenticated ? children : <Navigate to={"/login"} replace/>}
    </AuthContext.Provider>
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}