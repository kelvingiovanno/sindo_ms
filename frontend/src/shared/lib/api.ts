import axios, { AxiosError, type AxiosRequestConfig } from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, 
})

let accessToken: string|null = null;

export const setAccessToken = (token: string|null) => {
    accessToken = token;
}

api.interceptors.request.use((config) => {
    
    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

api.interceptors.response.use(
    res => res,
    async (error: AxiosError) => {
        const req = error.config as AxiosRequestConfig & { isRefreshed?: boolean };

        if (!req) return Promise.reject(error);

        if (req.url === "/auth/refresh") {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !req.isRefreshed) {
            req.isRefreshed = true;

            try {
                const res = await api.post("/auth/refresh", {}, { withCredentials: true });

                setAccessToken(res.data.accessToken);

                return api(req);
            } catch {
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);