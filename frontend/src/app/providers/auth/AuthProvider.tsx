import { api, setAccessToken } from "@/shared/lib/api";
import { AuthContext } from "./AuthContext";
import React, { useEffect, useState } from "react";
import type { LoginApiResponse, RefreshApiResponse, SelecStoreApiResponse } from "@/shared/types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const isPublicRoute = ['/signin', '/selec-store'];

        const loadUser = async () => {
            try {
                const res = await api.post<RefreshApiResponse>('auth/refresh');
                setAccessToken(res.data.accessToken);
                setAuthenticated(true)
            } 
            catch {
                console.error('failded fetch user');
                setAuthenticated(false);
            }
            finally {
                setLoading(false);
            }
        };

        if (!isPublicRoute.includes(window.location.pathname)) {
            loadUser();
        }

    }, [isAuthenticated]);

    const login = async (username: string, password: string) => {

        const res = await api.post<LoginApiResponse>('/auth/signin', {
            username: username,
            password: password,
        });

        const data = res.data;
    
        return data;    
    }

    const selectStore = async (storeId: string, userId: string) => {
        const res = await api.post<SelecStoreApiResponse>('/auth/select-store', {
            userId,
            storeId,
        });
        
        const { accessToken } = res.data;
        
        setAccessToken(accessToken);
        setAuthenticated(true);
    }

    const logout = async () => {
        await api.post('/auth/signout');
        setAccessToken(null);
        setAuthenticated(false);
    }

    const value = {
        isAuthenticated,
        isLoading, 
        login,
        selectStore,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};