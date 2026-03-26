import { useAuth } from '@/app/providers/auth/useAuth';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select';
import { useEffect, useState } from 'react';

const StoreSwitcher = () => {
    const [storeList, setStoreList] = useState<
        { storeId: string; storeName: string }[]
    >([]);

    const [loading, setLoading] = useState<boolean>(true);

    const { auth, storeAccess, selectStore } = useAuth();

    useEffect(() => {
        const fetchStores = async () => {
            const res = await storeAccess();
            setStoreList(res);
            setLoading(false);
        };

        fetchStores();
    }, [storeAccess]);

    return (
        <div className="p-4 border-b border-slate-300">
            <p className="text-xs text-slate-500 mb-2">Switch Store</p>

            {loading ? (
                <div className="h-9 border border-slate-300 rounded-sm flex items-center px-4">
                    <div className="w-full h-4 bg-slate-300 rounded animate-pulse" />
                </div>
            ) : (
                <Select
                    defaultValue={
                        storeList.find((s) => s.storeId === auth?.storeId)
                            ?.storeId
                    }
                    onValueChange={async (value) => {
                        await selectStore(value, auth!.id);
                        window.location.reload();
                    }}
                >
                    <SelectTrigger className="w-full rounded-sm px-3 py-5 border border-slate-300 cursor-pointer mb-2">
                        <SelectValue placeholder="Select store" />
                    </SelectTrigger>

                    <SelectContent position="popper">
                        <SelectGroup>
                            {storeList.map((s) => (
                                <SelectItem
                                    key={s.storeId}
                                    value={s.storeId}
                                    className="rounded-sm px-3 py-2 cursor-pointer"
                                >
                                    {s.storeName}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
        </div>
    );
};

export default StoreSwitcher;
