import type { Auth, StoreAccessApiResponse } from '@/features/auth';
import { createContext } from 'react';

interface Context {
    auth: Auth | undefined;
    isLoading: boolean;
    login: (username: string, password: string) => void;
    selectStore: (storeId: string, userId: string) => void;
    storeAccess: () => Promise<StoreAccessApiResponse>;
    logout: () => void;
}

export const AuthContext = createContext<Context | undefined>(undefined);
