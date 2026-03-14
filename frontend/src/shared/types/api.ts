export type LoginApiResponse = {
    userId: string,
    stores: {
        storeId: string,
        storeName: string,
    }[],
}

export type RefreshApiResponse = {
    accessToken: string,
}

export type SelecStoreApiResponse = {
    accessToken: string,
    refreshToken: string,
}