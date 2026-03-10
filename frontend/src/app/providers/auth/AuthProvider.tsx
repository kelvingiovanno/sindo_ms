
import { api, setAccessToken } from "@/shared/lib/api";
import { AuthContext } from "./AuthContext";
import React, { useEffect, useState } from "react";
import { clearAllCookies } from "@/shared/lib";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await api.get('/me');
                setAccessToken(res.data.accessToken);
                setAuthenticated(true)
            } 
            catch {
                setAuthenticated(false);
            }
            finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (username: string, password: string) => {

        const response = await api.post('/auth/signin', {
            username: username,
            password: password,
        });

        setAccessToken(response.data.accessToken);

        setAuthenticated(true);
    }

    const logout = async () => {
        await api.post('/signout');
        setAccessToken(null);
        clearAllCookies();
    }

    const value = {
        isAuthenticated,
        isLoading, 
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};