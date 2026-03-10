
import api from "@/api/apit";
import { AuthContext } from "./AuthContext";
import type { User } from "@/shared/types";
import React, { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [user, setUser] = useState<User|null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await api.get<User>('/me');
                setUser(response.data);
            } 
            catch {
                setUser(null);
            }
            finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (username: string, password: string) => {

        const response = await api.post<User>('/auth/signin', {
            username: username,
            password: password,
        });

        

        setUser(response.data);
    }

    const logout = async () => {
        await api.post('/signout');
        setUser(null);
    }

    const value = {
        user, 
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        isLoading,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};