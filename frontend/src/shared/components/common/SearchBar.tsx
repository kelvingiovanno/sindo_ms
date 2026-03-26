import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

type Props = {
    placeholder: string;
};

const SearchBar = ({ placeholder }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState<string>(
        searchParams.get('search') || '',
    );

    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (debouncedSearch) {
            params.set('search', debouncedSearch);
        } else {
            params.delete('search');
        }

        setSearchParams(params);
    }, [debouncedSearch, searchParams, setSearchParams]);

    return (
        <div className="relative w-full xl:w-sm">
            <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <Input
                type="text"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                placeholder={placeholder}
                className="w-full pl-9 pr-3 py-2 text-sm text-slate-700 border border-slate-300 rounded-sm placeholder:text-sm placeholder:text-slate-500"
            />
        </div>
    );
};

export default SearchBar;
