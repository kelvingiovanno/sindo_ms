import { api, setAccessToken } from '@/shared/lib/api';
import { AuthContext } from './AuthContext';
import React, { useEffect, useState } from 'react';
import type { Auth } from '@/features/auth/auth.entity';
import {
    refreshApi,
    selectStoreApi,
    signinApi,
    storeAccessApi,
} from '@/features/auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<Auth | undefined>(undefined);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const isPublicRoute = ['/signin', '/select-store'];

        const loadUser = async () => {
            try {
                const data = await refreshApi();
                setAccessToken(data.accessToken);
                setAuth(data.auth);
            } catch {
                setAuth(undefined);
            } finally {
                setLoading(false);
            }
        };

        if (!isPublicRoute.includes(window.location.pathname)) {
            loadUser();
        }
    }, [isLoading]);

    const login = async (username: string, password: string) => {
        const data = await signinApi(username, password);
        return data;
    };

    const selectStore = async (storeId: string, userId: string) => {
        const data = await selectStoreApi(storeId, userId);
        setAuth(data.auth);
        setAccessToken(data.accessToken);
        setLoading(false);
    };

    const storeAccess = async () => {
        const data = await storeAccessApi();
        return data;
    };

    const logout = async () => {
        await api.post('/auth/signout');
        setAccessToken(null);
        setAuth(undefined);
    };

    const value = {
        auth,
        isLoading,
        login,
        selectStore,
        storeAccess,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
