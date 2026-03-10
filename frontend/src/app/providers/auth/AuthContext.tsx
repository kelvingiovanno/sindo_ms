import { createContext } from "react";

interface Context {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<Context | undefined>(undefined);