import type { User } from "@/types";
import { createContext } from "react";

interface Context {
    user: User|null,
    login: (username: string, password: string) => void,
    logout: () => void; 
    isAuthenticated: boolean,
    isAdmin: boolean,
    isLoading: boolean,
}

export const AuthContext = createContext<Context | undefined>(undefined);