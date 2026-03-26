import { api } from '@/shared/lib';
import type {
    RefreshApiResponse,
    SelectStoreApiResponse,
    SignInApiResponse,
    StoreAccessApiResponse,
} from './auth.types';

const ENDPOINT = 'auth';

export const signinApi = async (username: string, password: string) => {
    const res = await api.post<SignInApiResponse>(`${ENDPOINT}/signin`, {
        username,
        password,
    });
    const data = res.data;
    return data;
};

export const selectStoreApi = async (storeId: string, userId: string) => {
    const res = await api.post<SelectStoreApiResponse>(
        `${ENDPOINT}/select-store`,
        {
            storeId,
            userId,
        },
    );
    const data = res.data;
    return data;
};

export const refreshApi = async () => {
    const res = await api.post<RefreshApiResponse>(`${ENDPOINT}/refresh`);
    const data = res.data;
    return data;
};

export const storeAccessApi = async () => {
    const res = await api.post<StoreAccessApiResponse>(
        `${ENDPOINT}/store-access`,
    );
    const data = res.data;
    return data;
};
